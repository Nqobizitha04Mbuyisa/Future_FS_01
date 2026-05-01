from fastapi import FastAPI, APIRouter, HTTPException, Request, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, constr
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timedelta, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="Nqobizitha Portfolio API")
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# =============================================================================
# Models
# =============================================================================

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactMessageCreate(BaseModel):
    name: constr(strip_whitespace=True, min_length=1, max_length=120)
    email: EmailStr
    subject: constr(strip_whitespace=True, min_length=1, max_length=200)
    message: constr(strip_whitespace=True, min_length=12, max_length=5000)
    email_dispatched: bool = False


class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    user_agent: Optional[str] = None
    ip: Optional[str] = None
    email_dispatched: bool = False
    status: Literal["received", "delivered", "error"] = "received"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactCreateResponse(BaseModel):
    ok: bool
    id: str
    status: str


class ContactStats(BaseModel):
    total: int
    last_24h: int
    last_7d: int


# =============================================================================
# Helpers
# =============================================================================

def _client_ip(request: Request) -> Optional[str]:
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    if request.client:
        return request.client.host
    return None


def _serialize(doc: dict) -> dict:
    """Strip Mongo _id so we never leak it to the API consumer."""
    doc.pop("_id", None)
    return doc


# =============================================================================
# Routes — health & legacy status
# =============================================================================

@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    await db.status_checks.insert_one(status_obj.model_dump())
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**_serialize(r)) for r in rows]


# =============================================================================
# Routes — contact
# =============================================================================

@api_router.post(
    "/contact",
    response_model=ContactCreateResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_contact_message(payload: ContactMessageCreate, request: Request):
    try:
        record = ContactMessage(
            name=payload.name,
            email=payload.email,
            subject=payload.subject,
            message=payload.message,
            email_dispatched=payload.email_dispatched,
            status="delivered" if payload.email_dispatched else "received",
            user_agent=request.headers.get("user-agent"),
            ip=_client_ip(request),
        )
        await db.contact_messages.insert_one(record.model_dump())
        logger.info(
            f"Contact message stored id={record.id} from={record.email} "
            f"dispatched={record.email_dispatched}"
        )
        return ContactCreateResponse(ok=True, id=record.id, status=record.status)
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Failed to store contact message")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to store contact message: {str(e)}",
        )


@api_router.get("/contact/messages", response_model=List[ContactMessage])
async def list_contact_messages(limit: int = 50):
    limit = max(1, min(limit, 200))
    rows = (
        await db.contact_messages.find()
        .sort("created_at", -1)
        .to_list(limit)
    )
    return [ContactMessage(**_serialize(r)) for r in rows]


@api_router.get("/contact/stats", response_model=ContactStats)
async def contact_stats():
    now = datetime.now(timezone.utc)
    day = now - timedelta(days=1)
    week = now - timedelta(days=7)

    total = await db.contact_messages.count_documents({})
    last_24h = await db.contact_messages.count_documents({"created_at": {"$gte": day}})
    last_7d = await db.contact_messages.count_documents({"created_at": {"$gte": week}})
    return ContactStats(total=total, last_24h=last_24h, last_7d=last_7d)


# =============================================================================
# Wire & middleware
# =============================================================================

app.include_router(api_router)

# CORS — allow specific origins in production, fall back to "*" for local dev.
_origins_env = os.environ.get("ALLOWED_ORIGINS", "*")
_allowed_origins = (
    ["*"]
    if _origins_env.strip() == "*"
    else [o.strip() for o in _origins_env.split(",") if o.strip()]
)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=_allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
