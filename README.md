# Nqobizitha Mbuyisa — Portfolio

A modern, multi-page portfolio for **Nqobizitha Mbuyisa**, Junior Software Engineer specializing in Java backend development. Built with React + FastAPI + MongoDB, plus EmailJS for direct contact-form delivery.

> http://future-fs-01-lilac.vercel.app/

---

## Features

- **Multi-page** React app with React Router (Home, About, Skills, Projects, Experience, Contact)
- **Interactive Skills page** that explains the *logic* behind every language used (Java, C#, Python, C++, SQL, JavaScript, HTML/CSS)
- **Projects** with tag-filtering and case-study dialogs
- **Contact form** that sends real emails via EmailJS *and* logs every submission to MongoDB as a backup
- Fully **responsive** — mobile, tablet, desktop
- Dark monochrome design with royal-blue accent

---

## Tech Stack

| Layer | Tools |
|---|---|
| Frontend | React 19, React Router, Tailwind CSS, shadcn/ui, lucide-react |
| Backend | FastAPI, Pydantic v2, Motor (async Mongo) |
| Database | MongoDB (Atlas free tier) |
| Email | EmailJS (browser-based) |
| Hosting | Vercel (frontend) + Render (backend) + MongoDB Atlas |

---

## Project structure

```
.
├── frontend/                # React app (deploy to Vercel)
│   ├── src/
│   │   ├── components/      # Header, Footer, Avatar, etc.
│   │   ├── pages/           # Home, About, Skills, Projects, Experience, Contact
│   │   ├── data/portfolioData.js   # SINGLE source of truth — edit this to update content
│   │   └── mock/mock.js     # localStorage fallback for the contact form
│   └── .env.example
├── backend/                 # FastAPI app (deploy to Render)
│   ├── server.py            # All routes
│   ├── requirements.txt
│   ├── runtime.txt          # Pins Python 3.11 for Render
│   └── .env.example
└── README.md
```

## How to update the content

**Everything portfolio-related lives in one file:** `frontend/src/data/portfolioData.js`.

| Edit | Field |
|---|---|
| Profile photo | `profile.avatarImage` |
| Downloadable CV | `profile.resumeUrl` |
| Tagline / about text | `summary`, `aboutLong` |
| Add/remove a language | `languages[]` |
| Add a project | `projects[]` |
| Add a job | `experience[]` |
| Education / certifications | `education[]`, `certifications[]` |

Images can be hosted anywhere (Cloudinary, Imgur) or dropped in `frontend/public/images/` and referenced as `/images/profile.jpg`.

---

## Local development

### Prerequisites
- Node 18+, Yarn
- Python 3.11+
- MongoDB running locally OR an Atlas connection string

### Backend
```bash
cd backend
cp .env.example .env
# edit .env with your MONGO_URL and DB_NAME
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Frontend
```bash
cd frontend
cp .env.example .env
# edit .env with your EmailJS keys and REACT_APP_BACKEND_URL=http://localhost:8001
yarn install
yarn start
```

## Production deployment

### 1. MongoDB Atlas (free)
1. Create or reuse an M0 cluster.
2. Create a database user + add `0.0.0.0/0` to Network Access.
3. Copy the connection string for `MONGO_URL`.

### 2. Backend → Render (free)
1. New Web Service → connect this repo.
2. **Root Directory:** `backend`
3. **Build Command:** `pip install -r requirements.txt`
4. **Start Command:** `uvicorn server:app --host 0.0.0.0 --port $PORT`
5. Env vars: `MONGO_URL`, `DB_NAME`, `ALLOWED_ORIGINS=https://your-frontend.vercel.app`

### 3. Frontend → Vercel (free)
1. Import this repo.
2. **Framework:** Create React App, **Root Directory:** `frontend`
3. Env vars:
   - `REACT_APP_BACKEND_URL=https://your-api.onrender.com`
   - `REACT_APP_EMAILJS_SERVICE_ID=...`
   - `REACT_APP_EMAILJS_TEMPLATE_ID=...`
   - `REACT_APP_EMAILJS_PUBLIC_KEY=...`
4. Deploy.

### 4. Lock down EmailJS
emailjs.com → Account → Security → restrict by domain to your Vercel URL.

---

##  Contact API

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/api/contact` | Store a contact submission (called by the frontend after EmailJS) |
| `GET` | `/api/contact/messages?limit=50` | List recent submissions |
| `GET` | `/api/contact/stats` | `{ total, last_24h, last_7d }` |


All content (CV, project descriptions, photos) © Nqobizitha Mbuyisa.
