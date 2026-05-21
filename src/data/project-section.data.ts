import type { Project } from "../types/project.type";
const col1: Project[] = [
  // HookLens (was col3[0])
  {
    id: 5,
    num: "01",
    title: "HookLens",
    subtitle: "Webhook Inspector & Debugger",
    tags: [
      { label: "Building", variant: "building" },
      { label: "SaaS", variant: "dark" },
    ],
    desc: "Multi tenant webhook inspector with live request capture, replay engine, and AI-powered payload explanations via Groq. Real time updates via Socket.io zero page refresh.",
    stats: [
      { label: "Real-time", value: "Socket.io", color: "dark" },
      { label: "AI", value: "Groq", color: "dark" },
    ],
    pills: [
      "React",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Socket.io",
      "Groq API",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/iamayushkarma/hooklens",
        variant: "dark",
      },
    ],
  },
  // Stash (was col2[1])
  {
    id: 4,
    num: "02",
    title: "Stash",
    subtitle: "Snippet Manager + Chrome Extension",
    tags: [
      { label: "Dev Tool", variant: "dark" },
      { label: "Extension", variant: "blue" },
    ],
    desc: "JWT + Google OAuth across web app and Chrome extension. Tag-based filtering reduces manual lookup time by ~40%.",
    stats: [
      { label: "Retrieval", value: "-30%", color: "blue" },
      { label: "Lookup", value: "-40%", color: "blue" },
    ],
    pills: ["React", "TypeScript", "Groq API", "JWT", "Google OAuth"],
    links: [
      {
        label: "Live Demo",
        href: "https://trystash.vercel.app/",
        variant: "blue",
      },
      {
        label: "GitHub",
        href: "https://github.com/iamayushkarma/stash",
        variant: "dark",
        ghost: true,
      },
    ],
  },
];

const col2: Project[] = [
  // Tero (was col2[0])
  {
    id: 3,
    num: "03",
    title: "Tero",
    subtitle: "AI-Powered Resume Scoring",
    tags: [
      { label: "AI · ATS", variant: "yellow" },
      { label: "Live", variant: "dark" },
    ],
    desc: "Custom section detection, PDF/DOCX extraction. Keyword matching, formatting checks, and Groq API evaluation.",
    stats: [
      { label: "Accuracy", value: "~95%", color: "yellow" },
      { label: "Relevance", value: "+30%", color: "yellow" },
      { label: "API Speed", value: "+40%", color: "yellow" },
    ],
    pills: ["React", "TypeScript", "Groq API", "Context API"],
    links: [
      {
        label: "Live Demo",
        href: "https://trytero.vercel.app/",
        variant: "yellow",
      },
      {
        label: "GitHub",
        href: "https://github.com/iamayushkarma/Tero",
        variant: "dark",
        ghost: true,
      },
    ],
  },
  // Tero Engine (was col3[1])
  {
    id: 6,
    num: "04",
    title: "Tero - Engine",
    subtitle: "ATS scoring deep-dive",
    tags: [
      { label: "PDF · DOCX", variant: "green" },
      { label: "Scoring", variant: "cream" },
    ],
    desc: "Rule-based normalization for inconsistent resume formats with keyword matching and custom section detection.",
    stats: [{ label: "Accuracy", value: "~95%", color: "green" }],
    pills: ["PDF extraction", "DOCX parsing", "Groq API"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/iamayushkarma/Tero",
        variant: "green",
      },
      {
        label: "Live Demo",
        href: "https://trytero.vercel.app/",
        variant: "dark",
        ghost: true,
      },
    ],
  },
];

const col3: Project[] = [
  // MAP Aviation (was col1[0])
  {
    id: 1,
    num: "05",
    title: "MAP Aviation",
    subtitle: "Aviation Career Platform",
    tags: [
      { label: "Freelance", variant: "blue" },
      { label: "Live", variant: "yellow" },
    ],
    desc: "Full-stack platform with courses, job listings, news & video for pilots across India. Firebase, Google OAuth, Paytm payment gateway.",
    stats: [
      { label: "Stack", value: "Full", color: "blue" },
      { label: "Payments", value: "Paytm", color: "blue" },
    ],
    pills: ["React", "TypeScript", "Redux Toolkit", "Firebase", "Tailwind"],
    links: [
      {
        label: "Live Demo",
        href: "https://mapaviationcareer.com/",
        variant: "blue",
      },
    ],
  },
  // Gau Raksha (was col1[1])
  {
    id: 2,
    num: "06",
    title: "Gau Raksha Seva Sansthan",
    subtitle: "Donation Management Platform",
    tags: [
      { label: "NGO", variant: "green" },
      { label: "Donation", variant: "cream" },
    ],
    desc: "Full-stack donation platform with a public-facing website for online donations & inquiries, and a secure admin dashboard for managing donors, sevas, videos, and site content.",
    stats: [
      { label: "Admin Panel", value: "CMS", color: "green" },
      { label: "Stack", value: "Full", color: "green" },
    ],
    pills: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Context API",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/iamayushkarma/gau-raksha-seva-sansthan",
        variant: "green",
      },
    ],
  },
];

export { col1, col2, col3 };
