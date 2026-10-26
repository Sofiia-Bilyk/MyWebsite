export const OWNER = {
  firstName: "Sofiia",
  lastName: "Bilyk",
  fullName: "Sofiia Bilyk",
  headline: "Building solutions that",
  headlineHighlight: "people choose.",
  tagline:
    "I've studied and lived in the US, Japan, Spain, and Ukraine — which taught me how differently people think, work, and expect technology to behave. I build with that in mind: efficient, human-centered, and designed for real audiences.",
  availability: "Open to opportunities",
  roleTypes: "TPM · Engineering · Data Science",
  location: "San Francisco, CA",
};

export const CHIPS = [
  "Technical Project Management",
  "Full-Stack Development",
  "Data Science & ML",
  "Python & SQL",
  "Cross-Functional Leadership",
  "Robotic Process Automation",
  "Satellite & Geospatial Data",
  "Curriculum Design",
];

export const CHIP_DESCRIPTIONS: Record<string, string> = {
  "Technical Project Management":
    "End-to-end ownership of cross-functional projects — from scoping and stakeholder alignment to delivery. Experienced leading distributed teams across cultures and time zones.",
  "Full-Stack Development":
    "Building production-ready apps with React, Flask, and modern web stacks. Comfortable owning frontend, backend, and deployment.",
  "Data Science & ML":
    "Training and evaluating ML models (PyTorch, scikit-learn), working with satellite imagery, and turning messy data into actionable insights.",
  "Python & SQL":
    "Core tools for data pipelines, automation scripts, analysis workflows, and backend logic. Deep experience with pandas, NumPy, SQL Server, and PostgreSQL.",
  "Cross-Functional Leadership":
    "Bridging engineering, design, and business stakeholders. Skilled at translating technical complexity into clear plans and decisions.",
  "Robotic Process Automation":
    "Designing and deploying RPA systems with Python and UiPath for businesses and government organizations, achieving high automation success rates.",
  "Satellite & Geospatial Data":
    "Processing satellite imagery for environmental analysis — land surface temperature, urban heat islands, elevation models. Experienced with QGIS and remote sensing pipelines.",
  "Curriculum Design":
    "Creating and iterating on educational content for programming courses. Data-driven approach to session planning and student outcome improvement.",
};

export interface Project {
  id: string;
  category: string;
  position: string;
  company: string;
  location: string;
  description: string;
  fullDescription: string;
  bullets: string[];
  period: string;
  tags: string[];
  filter: string | string[];
  featured?: boolean;
  chips?: string[];
  links?: { kind: "github" | "website"; label: string; href: string }[];
  /**
   * Optional path to an image shown at the bottom of the experience detail dialog.
   * Defaults to a city photo when not provided. To swap to a project-specific image,
   * import a new asset in Work.tsx and pass its module URL here.
   */
  endImage?: string;
  endImageAlt?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "1",
    category: "SWE & TPM",
    position: "SWE & TPM",
    company: "NTT East Japan",
    links: [
      { kind: "github", label: "NTT wellness app on GitHub", href: "https://github.com/Sofiia-Bilyk/Mental-Health-App" },
    ],
    location: "Tokyo, Japan",
    description:
      "Led development of an internal workplace wellness app, managing a diverse team of 7 from research to launch.",
    fullDescription:
      "Tech + Psychology = I got obsessed with Product Development 🚀\n\nDuring my study abroad in Tokyo, I worked at NTT East Japan as a Technical Product Manager for a seven-person team, where we shipped a full-stack workplace wellness application end-to-end. Shiawase (幸せ, \"happiness\") is designed to help prevent burnout in Japanese corporate culture. I led the product from idea to launch, also being a part of the developers team.\n\nFollowing the Lean methodology, we started with customer discovery through VoC research and user interviews, which revealed a core challenge. Beyond building a sophisticated system, we encountered a cultural obstacle: a deep social stigma around the topic of mental health in Japan. I translated those findings into prioritized product requirements that led to specifications for a React 19 + Vite frontend backed by Supabase and Postgres triggers. After shipping the first MVP, we conducted feedback sessions with executives from major Japanese companies and NTT's Wellness Lounge Team, which gave us a different perspective and drove further iteration before launch.\n\nThe creation process was both challenging and fascinating because this is not a personal-use app. It is a corporate application with multiple stakeholders and needs to feel engaging and reliable for employees while also providing meaningful insights to team managers on how to improve overall team efficiency. Our product already serves as an internal corporate resource for over 300,000 users.\n\nYou can check out one of the early prototypes here: https://github.com/Sofiia-Bilyk/Mental-Health-App\n\nA special thanks to Katsuki Hatakeyama and Koushirou Sugiura from NTTEast for the warm welcome and support on each phase!",
    bullets: [
      "Led a cross-functional team of 7 to develop a corporate wellness platform now used by ~300K users at Japanese corporations, collaborating with stakeholders to prioritize features and translate requirements into tech specifications.",
      "Conducted user interviews with 15 employees to identify pain points and define human-centered product requirements, driving iterative product improvements through agile development cycles.",
      "Contributed to a full-stack development using React, PostgreSQL, and Supabase for user auth and data management.",
    ],
    period: "Jan 2026 – Apr 2026",
    tags: ["React", "Flask", "Databases", "SWE", "UI / UX", "VoC Research", "Leadership", "Tech PM"],
    filter: ["tpm", "uiux"],
    featured: true,
    chips: ["Technical Project Management", "Full-Stack Development", "Cross-Functional Leadership"],
  },
  {
    id: "2",
    category: "SWE & TPM",
    position: "SWE & TPM",
    company: "NASA Space Apps",
    location: "San Francisco, CA",
    description:
      "Leading a cross-functional team of 8 to develop a data-driven approach for sustainable urbanization using satellite data.",
    fullDescription:
      "Leading a cross-functional team of 8 to build a platform that simulates environmental metrics — including Land Surface Temperature and Urban Heat Island effects — for urban planning decisions. The project uses satellite data and ML models to help city planners make evidence-based sustainability decisions.",
    bullets: [
      "Leading cross-functional team of 8 engineers and data scientists",
      "Simulating environmental metrics (LST, UHI) for urban planning",
      "Integrating satellite data pipelines with visualization tools",
      "Presenting at NASA Space Apps Challenge events",
    ],
    period: "Oct 2024 – Apr 2025",
    tags: ["Data Analysis", "Tech PM", "API", "Satellite Data", "Urban Planning"],
    filter: "tpm",
    featured: true,
    chips: ["Technical Project Management", "Satellite & Geospatial Data", "Data Science & ML"],
  },
  {
    "id": "fuego",
    "category": "Project",
    "position": "Co-founder",
    "company": "Fuego.Earth",
    "links": [{ "kind": "website", "label": "Visit Fuego.Earth", "href": "https://www.fuego.earth/" }],
    "location": "San Francisco, CA",
    "description": "We built a browser-based fire spread simulator that lets users choose an ignition point, a day, and a model to explore simulated fire perimeters, with no installation or GIS data preparation. Built on open-source fire science models, this first iteration supports exploration and learning rather than operational decisions, and we welcome feedback from fire behavior analysts and researchers.",
    "fullDescription": "We built a browser-based fire spread simulator that lets users choose an ignition point, a day, and a model to explore simulated fire perimeters, with no installation or GIS data preparation. Built on open-source fire science models, this first iteration supports exploration and learning rather than operational decisions, and we welcome feedback from fire behavior analysts and researchers.",
    "bullets": [],
    "period": "Dec 2025 – present",
    "tags": [
        "Wildfire Simulation",
        "Web Development",
        "Climate Tech"
    ],
    "filter": "tpm"
},
  {
    id: "3",
    category: "Data & ML",
    position: "Data Science Intern",
    company: "Development Monitors",
    location: "Washington D.C.",
    description:
      "Trained elevation and resolution AI models using satellite imagery, improving model outcome by 2.5×.",
    fullDescription:
      "Worked on super-resolution AI models for satellite imagery processing. Trained and evaluated elevation and resolution models using Python and PyTorch, achieving a 2.5× improvement in model performance. Created 2D and 3D maps in QGIS for integration with landscape and risk analysis layers.",
    bullets: [
      "Trained elevation & resolution AI models (Python, PyTorch)",
      "Improved model outcome by 2.5×",
      "Created QGIS 2D/3D maps for landscape and risk layers",
      "Processed satellite imagery for environmental analysis",
    ],
    period: "Aug 2023 – Dec 2023",
    tags: ["Python", "PyTorch", "QGIS", "Satellite Imagery"],
    filter: "data",
    chips: ["Data Science & ML", "Satellite & Geospatial Data", "Python & SQL"],
  },
  {
    id: "4",
    category: "Engineering",
    position: "Junior Data Engineer",
    company: "Hound Line",
    location: "Barcelona, Spain",
    description:
      "Developed RPA systems for businesses and government organizations, achieving ~85–90% automation success rate.",
    fullDescription:
      "I spent two years as a Junior RPA/Data Engineer at Hound Line in Barcelona, where I worked with private and government organizations to automate the parts of their workflows that consumed the most time. After mapping the client's existing workflows and shaping a plan based on expected KPI gains vs time constraints, I built the systems using Python, UiPath, and SQL, with Qlik dashboards for visibility, achieving a ~85–90% process outcome success rate.\n\nMany clients operated in highly regulated industries, including healthcare, legal services, and banking, so rather than replacing entire workflows in one shot, we implemented automation in layers, maintaining strict security protocols along the way. For example, we started with repetitive tasks and then expanded into more complex, time-sensitive, multi-layered processes, which allowed clients to continue operations without interruption and gave us the flexibility to incorporate feedback before moving to the next stage.",
    bullets: [
      "Developed Robotic Process Automation (RPA) systems for private businesses and governmental organizations using mostly Python and UiPath, achieving a process outcome success rate of ~85-90% by testing and troubleshooting.",
      "Designed and maintained the architecture for databases, pipelines, and data warehouses using SQL, SSMS, and Qlik for reports and dashboards, ensuring efficient data collection, storage, and optimizing performance (by 10-15%).",
      "Assisted in daily team and weekly client meetings to improve task management and client relationships.",
    ],
    period: "Jun 2022 – Aug 2024",
    tags: ["Python", "UiPath", "SQL", "Data Pipelines", "Automation"],
    filter: ["engineering", "automation"],
    chips: ["Robotic Process Automation", "Python & SQL", "Full-Stack Development"],
  },
  {
    "id": "eve-calls",
    "category": "Work Experience",
    "position": "Product Manager and Customer Success",
    "company": "EVE.Calls",
    "location": "Boston, USA",
    "description": "Designed and improved conversational AI systems for automated client outreach.",
    "fullDescription": "Designed a system that combines multiple LLMs (OpenAI, Groq, Mistral) in production, ensembling probability distributions across conversational AI response categories to select the most reliable output, maximizing success rate.\n\nPartnered with a top-5 Ukrainian state-owned bank operations team to translate compliance requirements and internal communication workflows into conversational AI agent logic for an automated client outreach system.\n\nAnalyzed usage logs and product data to diagnose failure patterns and iterate system design, achieving a 95%+ automated resolution rate without human handoff.",
    "bullets": [
        "Designed a system that combines multiple LLMs (OpenAI, Groq, Mistral) in production, ensembling probability distributions across conversational AI response categories to select the most reliable output, maximizing success rate.",
        "Partnered with a top-5 Ukrainian state-owned bank operations team to translate compliance requirements and internal communication workflows into conversational AI agent logic for an automated client outreach system.",
        "Analyzed usage logs and product data to diagnose failure patterns and iterate system design, achieving a 95%+ automated resolution rate without human handoff."
    ],
    "period": "May 2025 – Dec 2025 & May 2026 – Aug 2026",
    "tags": [
        "Product Management",
        "Conversational AI",
        "LLMs",
        "Customer Success"
    ],
    "filter": "tpm"
},
  {
    id: "5",
    category: "Education",
    position: "Lead Teaching Assistant in Computer Science",
    company: "Minerva University",
    links: [
      { kind: "website", label: "Minerva University website", href: "https://www.minerva.edu/" },
    ],
    location: "San Francisco, CA",
    description:
      "Leading weekly Python programming sessions for 15–20 undergraduates.",
    fullDescription:
      "Serving as a Computer Science Teaching Assistant, leading weekly Python programming sessions for classes of 15–20 undergraduates. Responsible for preparing and updating curriculum based on data analysis and student feedback, holding office hours, and reporting on session effectiveness to faculty.",
    bullets: [
      "Lead and oversee weekly coding sessions for 20 students, coordinating TAs to ensure smooth instructional delivery.",
      "Design & iteratively improve curriculum based on student performance data and feedback, optimizing outcomes.",
      "Hold office hours and prepare weekly effectiveness reports for academic team review and documentation.",
    ],
    period: "Aug 2024 – Present",
    tags: ["Python", "Teaching", "Curriculum Design"],
    filter: "education",
    chips: ["Curriculum Design", "Python & SQL"],
  },
  {
    id: "6",
    category: "Education",
    position: "Founder & Math Instructor",
    company: "BrainOn",
    location: "Kyiv, Ukraine",
    description:
      "Founded an online math school raising students' grades by 1–3 points yearly.",
    fullDescription:
      "Founded and ran an online math school that consistently raised students' grades by 1–3 points per year. Achieved an 85% university admission success rate on national exams through personalized curriculum design and data-driven teaching methods.",
    bullets: [
      "Founded online math school from scratch",
      "Raised students' grades by 1–3 points yearly",
      "85% university admission success on national exams",
    ],
    period: "Sep 2021 – Jun 2022",
    tags: ["Entrepreneurship", "Education", "Impact"],
    filter: "education",
    chips: ["Curriculum Design", "Cross-Functional Leadership"],
  },
];

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location?: string;
  details?: string[];
}

export const EDUCATION: Education[] = [
  {
    id: "edu-1",
    institution: "Minerva University",
    degree: "B.Sc. Computational and Social Sciences",
    period: "2024 – 2028",
    location: "San Francisco, CA",
    details: [
      "Concentrations in AI & ML within Computer Science",
      "Concentrations in Cognition & Behavior within Social Sciences",
      "Ranked the #1 Most Innovative University in the World (WURI 2022–2025)||https://www.wuri.world/wuri-ranking",
    ],
  },
];

export interface Post {
  id: string;
  tag: string;
  title: string;
  date: string;
  emoji: string;
  color: string;
  fullStory?: string;
}

export const POSTS: Post[] = [
  {
    id: "1",
    tag: "Culture",
    title: "What Living in Tokyo Taught Me About Communication",
    date: "[coming soon]",
    emoji: "🗼",
    color: "hsl(145 27% 39% / 0.12)",
    fullStory: "Coming soon — a reflection on how Japanese communication culture reshaped the way I approach teamwork, feedback, and product design.",
  },
  {
    id: "2",
    tag: "Engineering",
    title: "Building Full-Stack Prototypes That Actually Get Used",
    date: "[coming soon]",
    emoji: "🛠️",
    color: "hsl(30 24% 91%)",
    fullStory: "Coming soon — lessons learned from shipping prototypes that survived contact with real users and stakeholders.",
  },
  {
    id: "4",
    tag: "Education",
    title: "Why I Switched from Pure CS to CS and Social Sciences",
    date: "[coming soon]",
    emoji: "🧠",
    color: "hsl(145 30% 93%)",
    fullStory: "Coming soon — the story behind combining computation with cognition, and why understanding people is as important as understanding code.",
  },
];

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  type: "link" | "download";
}

export const CONTACTS: ContactLink[] = [
  { label: "Email", value: "sofbil@uni.minerva.edu", href: "mailto:sofbil@uni.minerva.edu", type: "link" },
  { label: "Phone", value: "+1 (628) 306-1498", href: "tel:+16283061498", type: "link" },
  { label: "LinkedIn", value: "Sofiia Bilyk", href: "https://www.linkedin.com/in/sofia-bilyk", type: "link" },
  { label: "GitHub", value: "Sofiia-Bilyk", href: "https://github.com/Sofiia-Bilyk", type: "link" },
  { label: "Resume", value: "Download CV", href: "/Sofiia_Bilyk_CV.pdf", type: "download" },
];
