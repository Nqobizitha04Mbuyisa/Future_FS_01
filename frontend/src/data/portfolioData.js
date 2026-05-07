// Portfolio data sourced from CV. Update freely as your career grows.
// IMAGE PATHS: Replace any /images/... path with your real image URLs when launching.

export const profile = {
  name: "Nqobizitha Mbuyisa",
  shortName: "Nqobizitha",
  title: "Junior Software Engineer",
  tagline: "Java backend developer building clean, scalable, database-driven systems.",
  location: "South Africa",
  email: "mbuyisanqobizitha04@gmail.com",
  phone: "064 051 2572",
  github: "https://github.com/Nqobizitha04Mbuyisa",
  githubHandle: "Nqobizitha04Mbuyisa",
  legacyPortfolio: "https://nqobizitha04mbuyisa.github.io/My-Portfolio/",
  avatarImage: "/NqobizithaImage.jpeg",
  resumeUrl: "/NQOBIZITHAMBUYISA_CV.pdf",
  available: true,
};

export const summary = `Junior Software Engineer specializing in Java backend development, with a strong foundation in computer science and Information Technology. Hands-on experience building database-driven applications and designing RESTful systems using Java, SQL, and modern development tools. Passionate about writing clean, maintainable code and building scalable solutions to real-world problems.`;

export const aboutLong = [
  "I'm a Junior Software Engineer with a Bachelor of Science in Computer Science & IT from the University of KwaZulu-Natal. My focus is backend development the parts of an application most users never see, but absolutely depend on every second.",
  "I love turning fuzzy real-world problems into structured systems: a clear database schema, a clean REST contract, predictable error handling, and code that the next developer (often future me) can read without flinching.",
  "Outside of building, I obsess over fundamentals data structures, algorithms, OOP, and system design \u2014 because shortcuts there cost you later. I'm currently looking for a junior backend role where I can ship real software and grow fast.",
];

// Languages section: this is the "highlights all the languages and logic" section requested.
export const languages = [
  {
    name: "Java",
    level: 90,
    category: "Primary",
    summary: "My main backend language. JVM-based, statically typed, OOP-first.",
    why: "Strong typing catches bugs at compile time; mature ecosystem (Spring, JDBC, JUnit) makes building enterprise APIs straightforward.",
    usedFor: ["REST APIs", "Database-driven apps", "Final year project", "Console tools"],
  },
  {
    name: "C#",
    level: 75,
    category: "Backend",
    summary: "Microsoft's flagship language for the .NET runtime \u2014 close cousin to Java.",
    why: "Excellent for desktop GUIs (WinForms/WPF) and ASP.NET web APIs. Used it for event-driven desktop applications.",
    usedFor: ["Desktop apps (event-driven)", ".NET REST endpoints", "OOP modeling"],
  },
  {
    name: "Python",
    level: 70,
    category: "Scripting",
    summary: "Dynamic, readable language ideal for rapid prototyping and data work.",
    why: "When I need to test an idea fast, parse a file, or automate a task, Python gets me from zero to working in minutes.",
    usedFor: ["Scripting", "Console apps", "Algorithm practice"],
  },
  {
    name: "C++",
    level: 60,
    category: "Systems",
    summary: "Low-level, high-performance language with manual memory control.",
    why: "Taught me what really happens under the hood \u2014 pointers, references, memory layout. Makes me a better high-level programmer.",
    usedFor: ["Data structures coursework", "Performance-sensitive console apps"],
  },
  {
    name: "SQL",
    level: 85,
    category: "Data",
    summary: "The lingua franca of relational databases.",
    why: "Almost every backend touches a database. Optimized queries and well-designed schemas (ERDs) are a non-negotiable for me.",
    usedFor: ["MySQL queries", "Schema design (ERD)", "CRUD operations"],
  },
  {
    name: "JavaScript",
    level: 65,
    category: "Web",
    summary: "The language of the browser. Dynamic, flexible, ubiquitous.",
    why: "Even backend devs need it \u2014 to wire up frontends, build admin panels, and ship full-stack projects like this site.",
    usedFor: ["Frontend interactivity", "Portfolio websites"],
  },
  {
    name: "HTML & CSS",
    level: 75,
    category: "Web",
    summary: "The structure and skin of the web.",
    why: "Semantic HTML + responsive CSS turn ideas into real, accessible pages. Foundation for any web work.",
    usedFor: ["Responsive layouts", "Portfolio website design"],
  },
];

export const skillGroups = [
  {
    title: "Backend & Frameworks",
    items: [".NET", "REST APIs", "JDBC", "OOP Patterns"],
  },
  {
    title: "Databases",
    items: ["SQL", "MySQL", "MongoDB", "Schema Design (ERD)"],
  },
  {
    title: "Tools & Workflow",
    items: ["Git", "GitHub", "Visual Studio", "VS Code", "Draw.io"],
  },
  {
    title: "Core Concepts",
    items: ["Data Structures & Algorithms", "SDLC", "System Design (UML, ERD)", "Agile"],
  },
];

export const projects = [
  {
    id: "ims",
    title: "Information Management System",
    label: "Final Year Project",
    year: "2024",
    role: "Full-stack Developer",
    stack: ["c#", "SQL", "Visual Basic", "SDLC" , "PowerBI"],
    summary:
      "A full-stack, database-driven system with authentication, role-based access control, and CRUD over a normalized schema.",
    description:
      "Designed system architecture (UML) and database schema (ERD), implemented authentication, and built CRUD endpoints with optimized SQL queries. The kind of unsexy backend that quietly keeps an organization running.",
    highlights: [
      "Authentication & role-based access control",
      "Optimized SQL queries with indexing strategy",
      "UML system architecture + ERD database design",
      "Modular, testable Java codebase",
    ],
    // PROJECT IMAGE: replace with /images/projects/ims.jpg or hosted url
    projectUrl: "/StyleCutz-Barbershop-Booking-System-Project.zip",
    repo: "https://github.com/Nqobizitha04Mbuyisa",
    //demo: "",
  },
  {
    id: "desktop-app",
    title: "Event-Driven Desktop Application",
    label: "Desktop GUI",
    year: "2024",
    role: "Developer",
    stack: ["C#", ".NET", "OOP"],
    summary:
      "GUI desktop application with strong input validation, structured error handling, and a modular OOP architecture.",
    description:
      "Built using event-driven programming. Focus was on robustness \u2014 every user interaction is validated, every failure path is handled, and the codebase is split into cohesive modules.",
    highlights: [
      "Event-driven UI logic",
      "Input validation + error handling",
      "Clean OOP separation of concerns",
      "Maintainable, modular codebase",
    ],
    image: "",
    repo: "https://github.com/Nqobizitha04Mbuyisa",
    demo: "",
  },
  {
    id: "portfolio",
    title: "Personal Developer Portfolio",
    label: "Web",
    year: "2024",
    role: "Designer & Developer",
    stack: ["HTML", "CSS", "JavaScript", "Git"],
    summary:
      "A responsive portfolio site showcasing projects and live GitHub repositories, deployed via GitHub Pages.",
    description:
      "Designed, built and deployed a clean, responsive portfolio. Used Git/GitHub for version control \u2014 commit history, branches, and a real deployment pipeline.",
    highlights: [
      "Responsive layout (mobile-first)",
      "Live GitHub Pages deployment",
      "Clean version control history",
    ],
    image: "",
    repo: "https://github.com/Nqobizitha04Mbuyisa",
    demo: "https://nqobizitha04mbuyisa.github.io/My-Portfolio/",
  },
  {
    id: "console-suite",
    title: "Multi-Language Console Suite",
    label: "Coursework",
    year: "2023 \u2013 2024",
    role: "Developer",
    stack: ["Java", "Python", "C#", "C++"],
    summary:
      "A collection of console applications written across four languages, focused on data structures and algorithms.",
    description:
      "Practical algorithm and data-structure work \u2014 sorting, searching, recursion, custom data structures \u2014 implemented in four languages to compare paradigms and performance.",
    highlights: [
      "Sorting & searching algorithms",
      "Custom data structures",
      "Side-by-side language comparison",
      "Group projects via Git + Agile",
    ],
    image: "",
    repo: "https://github.com/Nqobizitha04Mbuyisa",
    demo: "",
  },
];

export const experience = [
  {
    role: "Full-stack Developer",
    org: "Final Year Project \u2014 Information Management System",
    period: "2024",
    type: "Academic",
    bullets: [
      "Designed and developed a full-stack, database-driven system end-to-end.",
      "Implemented authentication and role-based access control.",
      "Built CRUD functionality backed by optimized SQL queries.",
      "Modeled architecture in UML and database schema as an ERD.",
    ],
  },
  {
    role: "Desktop Application Developer",
    org: "Coursework Project \u2014 Event-Driven GUI App",
    period: "2024",
    type: "Project",
    bullets: [
      "Developed a GUI desktop application using event-driven programming.",
      "Implemented input validation, data processing and error handling.",
      "Applied OOP principles for a modular, maintainable codebase.",
    ],
  },
  {
    role: "Web Developer (Personal Project)",
    org: "Personal Developer Portfolio",
    period: "2024",
    type: "Self-driven",
    bullets: [
      "Designed and deployed a responsive portfolio website.",
      "Showcased real projects and linked GitHub repositories.",
      "Managed version control using Git and GitHub.",
    ],
  },
  {
    role: "Contributor & Systems Designer",
    org: "University Group Projects",
    period: "2022 \u2013 2024",
    type: "Collaboration",
    bullets: [
      "Built console applications in Java, Python, C# and C++.",
      "Collaborated using Git and Agile (sprints, stand-ups, code reviews).",
      "Designed system workflows and architecture diagrams in Draw.io.",
    ],
  },
];

export const education = [
  {
    degree: "Bachelor of Science in Computer Science & IT",
    school: "University of KwaZulu-Natal",
    period: "Graduated",
    detail: "Focus on software engineering, data structures, databases and system design.",
  },
];

export const certifications = [
  {
    name: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services",
    year: "2024",
  },
];

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/contact", label: "Contact" },
];
