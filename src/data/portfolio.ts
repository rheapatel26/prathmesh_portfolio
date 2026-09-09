// ============================================================
// PORTFOLIO DATA — Edit this file to update all content
// ============================================================

export const portfolio = {
  // ── Identity ──────────────────────────────────────────────
  name: {
    first: "PRATHAMESH",
    last: "Revankar",
    display: "PRATHAMESH\nRevankar",
  },
  title: "Full Stack Developer",
  tagline: "I build products — end to end.",
  location: "Mumbai, India",
  timezone: "GMT + 5.30",
  version: "V1.0",
  birthdate: "DD.MM.YYYY", // e.g. "15.03.2001"
  availability: "Available for work",
  availabilityStatus: true,

  // ── Bio ───────────────────────────────────────────────────
  bio: {
    short: "I'm a full-stack developer who bridges the gap between design and engineering — building products that look great and work flawlessly.",
    long: [
      "I'm a full-stack developer based in Mumbai, passionate about crafting digital experiences that are both beautiful and technically robust.",
      "I specialize in React, Node.js, and modern web technologies — working across the entire stack to ship products that matter.",
      "Currently open to freelance projects, full-time roles, and interesting collaborations.",
    ],
  },

  // ── Contact ───────────────────────────────────────────────
  email: "prathamesh@example.com",
  resumeUrl: "/resume.pdf",

  // ── Social ────────────────────────────────────────────────
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    instagram: "https://instagram.com/yourusername",
  },

  // ── Experience ────────────────────────────────────────────
  experience: [
    {
      id: "exp-1",
      company: "TechCorp Solutions",
      logo: "/images/companies/techcorp.png",
      role: "Senior Frontend Developer",
      duration: "2023 — Present",
      type: "Full-time",
      description:
        "Led the redesign of the core product dashboard, reducing user drop-off by 40%. Built a design system from scratch used across 5 product teams.",
      technologies: ["React", "TypeScript", "GraphQL", "Figma"],
    },
    {
      id: "exp-2",
      company: "StartupXYZ",
      logo: "/images/companies/startupxyz.png",
      role: "Full Stack Developer",
      duration: "2022 — 2023",
      type: "Full-time",
      description:
        "Built the entire frontend infrastructure for a B2B SaaS platform from 0 to 1. Integrated real-time features using WebSockets and Node.js.",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
    },
    {
      id: "exp-3",
      company: "Freelance",
      logo: null,
      role: "Web Developer & Designer",
      duration: "2020 — 2022",
      type: "Freelance",
      description:
        "Worked with 12+ clients across fintech, e-commerce, and healthcare to build custom web solutions. Delivered end-to-end — from wireframes to deployment.",
      technologies: ["React", "Next.js", "Tailwind", "Figma"],
    },
  ],

  // ── Projects ──────────────────────────────────────────────
  projects: [
    {
      id: "proj-1",
      number: "01",
      title: "NEXUS DASHBOARD",
      category: "Web App",
      year: "2024",
      image: "/images/projects/project-1.jpg",
      description:
        "A real-time analytics dashboard for e-commerce businesses. Features live data visualization, predictive insights, and multi-store management.",
      technologies: ["React", "D3.js", "Node.js", "PostgreSQL"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/yourusername/nexus",
      featured: true,
      color: "#c5a882",
    },
    {
      id: "proj-2",
      number: "02",
      title: "FORMA STUDIO",
      category: "Design Tool",
      year: "2024",
      image: "/images/projects/project-2.jpg",
      description:
        "A collaborative design tool for rapid prototyping. Built for teams that need speed without sacrificing fidelity.",
      technologies: ["React", "Canvas API", "WebSockets", "Redis"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/yourusername/forma",
      featured: true,
      color: "#7a8fa6",
    },
    {
      id: "proj-3",
      number: "03",
      title: "PULSE HEALTH",
      category: "Mobile App",
      year: "2023",
      image: "/images/projects/project-3.jpg",
      description:
        "A health monitoring app that aggregates wearable data and generates AI-powered wellness recommendations.",
      technologies: ["React Native", "Python", "FastAPI", "TensorFlow"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/yourusername/pulse",
      featured: false,
      color: "#8fa67a",
    },
    {
      id: "proj-4",
      number: "04",
      title: "DRIFT COMMERCE",
      category: "E-Commerce",
      year: "2023",
      image: "/images/projects/project-4.jpg",
      description:
        "A headless e-commerce platform with blazing-fast performance, custom animations, and a rich merchant dashboard.",
      technologies: ["Next.js", "Shopify API", "Stripe", "Vercel"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/yourusername/drift",
      featured: false,
      color: "#a67a8f",
    },
  ],

  // ── Lab (experiments) ─────────────────────────────────────
  labs: [
    { id: "lab-1", number: "01", title: "~~ FIFA PROMOTIONAL VIDEO ~~" },
    { id: "lab-2", number: "02", title: "~~ AAKASHVAANI ~~" },
    { id: "lab-3", number: "03", title: "~~ KARACHI BAKERY REBRANDING ~~" },
    { id: "lab-4", number: "04", title: "~~ MARD KO DARD ~~" },
    { id: "lab-5", number: "05", title: "~~ KEIBULLMAJAO ~~" },
  ],

  // ── Skills ────────────────────────────────────────────────
  skills: {
    Frontend: ["React", "Next.js", "TypeScript", "Framer Motion", "CSS/SCSS", "Tailwind CSS", "Three.js"],
    Backend: ["Node.js", "Express", "FastAPI", "GraphQL", "REST APIs", "PostgreSQL", "MongoDB"],
    "AI / ML": ["TensorFlow", "PyTorch", "Hugging Face", "LangChain", "OpenAI API", "RAG"],
    Tools: ["Git", "Docker", "AWS", "Vercel", "Figma", "Vite", "Webpack"],
    Design: ["Figma", "UI/UX", "Design Systems", "Prototyping", "Motion Design"],
    Languages: ["JavaScript", "TypeScript", "Python", "SQL", "Rust (learning)"],
  },
};

export type Project = typeof portfolio.projects[0];
export type Experience = typeof portfolio.experience[0];
