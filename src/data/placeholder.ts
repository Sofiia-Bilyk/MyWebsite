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
    category: "Technical Product Manager",
    position: "Technical Product Manager",
    company: "NTT East Japan",
    location: "Tokyo, Japan",
    description:
      "Led development of an internal workplace wellness app, managing a diverse team of 7 from research to launch.",
    fullDescription:
      "Tech + Psychology = I got obsessed with Product Development 🚀\n\nOver the past few months, I've been working with NTTEast Corporation to build Shiawase🍃 (幸せ, \"happiness\"), a mental health app designed to help prevent workplace burnout. Because one of the best investments a company can make:\n1️⃣ Building a strong team.\n2️⃣ Caring about the wellness of each member, as supported teams think better, build better, and go further together.\n\nHonestly, it was a truly incredible Tech PM experience because, in addition to building a technically sophisticated solution, we faced a cultural challenge:\n🤔 How to avoid social stigma regarding mental health in Japan?\n🧐 How to make people feel safe in vulnerable topics?\n\nWe ran the project using Lean methodology, starting with VoC research that gave us our first key insights:\n➡️ Confidentiality comes first as users fear being exposed\n➡️ Frame the app as self-improvement to avoid mental health stigma\n➡️ Interactions should be short and seamless, with the option to expand\n\nBased on these findings, my tech sis Aidana Mustafina and I built the MVP using React, Flask, etc., designed the database architecture, and implemented security principles. It was then used for a second round of feedback with executives from large companies and NTT's Wellness Lounge Team, leading to further iterations.\n\nWe are currently finishing deployment. In just 2 weeks, I'm excited to present our working app and research poster at the Symposium in Tokyo.\n\nA special thanks to Katsuki Hatakeyama and Koushirou Sugiura from NTTEast for the warm welcome and support on each phase!",
    bullets: [
      "Managed a diverse team of 7 from research to launch",
      "Analyzed ~15 employee interviews for human-centered requirements",
      "Built full-stack prototype (React, Flask, DB, Security Principles)",
      "Presented to NTT East stakeholders for production consideration",
    ],
    period: "Jan 2026 – Apr 2026",
    tags: ["React", "Flask", "Databases", "SWE", "UI / UX", "VoC Research", "Leadership", "Tech PM"],
    filter: ["tpm", "uiux"],
    featured: true,
    chips: ["Technical Project Management", "Full-Stack Development", "Cross-Functional Leadership"],
  },
  {
    id: "2",
    category: "Technical Project Manager",
    position: "Technical Project Manager",
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
    position: "RPA Engineer",
    company: "Hound Line",
    location: "Barcelona, Spain",
    description:
      "Developed RPA systems for businesses and government organizations, achieving ~85–90% automation success rate.",
    fullDescription:
      "Designed and deployed Robotic Process Automation systems for businesses and government organizations using Python and UiPath. Built database architecture and data pipelines with SQL, SSMS, and Qlik, achieving consistently high automation success rates across diverse client environments.",
    bullets: [
      "Developed Robotic Process Automation systems using Python and UiPath",
      "Achieved ~85–90% automation success rate",
      "Designed database architecture with SQL and SSMS",
      "Built data pipelines and dashboards with Qlik",
    ],
    period: "Jun 2022 – Aug 2024",
    tags: ["Python", "UiPath", "SQL", "Data Pipelines", "Automation"],
    filter: ["engineering", "automation"],
    chips: ["Robotic Process Automation", "Python & SQL", "Full-Stack Development"],
  },
  {
    id: "5",
    category: "Education",
    position: "CS Teaching Assistant",
    company: "Minerva University",
    location: "San Francisco, CA",
    description:
      "Leading weekly Python programming sessions for 15–20 undergraduates.",
    fullDescription:
      "Serving as a Computer Science Teaching Assistant, leading weekly Python programming sessions for classes of 15–20 undergraduates. Responsible for preparing and updating curriculum based on data analysis and student feedback, holding office hours, and reporting on session effectiveness to faculty.",
    bullets: [
      "Leading weekly Python sessions for 15–20 students",
      "Preparing and updating curriculum based on feedback",
      "Holding office hours and tracking session effectiveness",
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
  {
    id: "5",
    tag: "Teaching",
    title: "Teaching Python: Lessons from Leading 20-Student Sessions",
    date: "[coming soon]",
    emoji: "🐍",
    color: "hsl(18 30% 18% / 0.08)",
    fullStory: "Coming soon — what I learned about pedagogy, patience, and the art of making complex topics click.",
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
