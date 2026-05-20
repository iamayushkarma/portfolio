import { useState } from "react";

interface Project {
  id: number;
  num: string;
  title: string;
  subtitle: string;
  tags: {
    label: string;
    variant: "dark" | "yellow" | "green" | "blue" | "cream";
  }[];
  stats?: {
    label: string;
    value: string;
    color: "blue" | "yellow" | "green" | "dark";
  }[];
  pills: string[];
  desc?: string;
  links: {
    label: string;
    href: string;
    variant: "dark" | "yellow" | "green" | "blue";
    ghost?: boolean;
  }[];
}

const col1: Project[] = [
  {
    id: 1,
    num: "01",
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
  {
    id: 2,
    num: "02",
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

const col2: Project[] = [
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
  {
    id: 4,
    num: "04",
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

const col3: Project[] = [
  {
    id: 5,
    num: "05",
    title: "MAP - Stack",
    subtitle: "Feature architecture breakdown",
    tags: [
      { label: "Redux", variant: "dark" },
      { label: "Firebase", variant: "yellow" },
    ],
    stats: [
      { label: "Deployed", value: "cPanel", color: "dark" },
      { label: "Auth", value: "OAuth", color: "dark" },
    ],
    pills: ["Redux Toolkit", "Paytm Gateway", "Google OAuth"],
    links: [
      {
        label: "View Details",
        href: "https://mapaviationcareer.com/",
        variant: "dark",
      },
    ],
  },
  {
    id: 6,
    num: "06",
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

const tagStyles = {
  dark: "bg-[#111] text-[#fffdf5] border-[#111]",
  yellow: "bg-[#e8f429] text-[#111] border-[#111]",
  green: "bg-[#33ff57] text-[#111] border-[#111]",
  blue: "bg-blue-500 text-white border-[#111]",
  cream: "bg-[#fffdf5] text-[#111] border-[#111]",
};

const statColors = {
  blue: "text-blue-500",
  yellow: "text-yellow-600",
  green: "text-green-600",
  dark: "text-[#111]",
};

const btnStyles = {
  dark: "bg-[#111] text-[#fffdf5] border-[#111] shadow-[3px_3px_0_#555] hover:shadow-[4px_4px_0_#555]",
  yellow:
    "bg-[#e8f429] text-[#111] border-[#111] shadow-[3px_3px_0_#a89800] hover:shadow-[4px_4px_0_#a89800]",
  green:
    "bg-[#33ff57] text-[#111] border-[#111] shadow-[3px_3px_0_#1a9933] hover:shadow-[4px_4px_0_#1a9933]",
  blue: "bg-blue-500 text-white border-[#111] shadow-[3px_3px_0_#1d4ed8] hover:shadow-[4px_4px_0_#1d4ed8]",
};

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative flex flex-col gap-3.5 rounded-[4px] border-2 border-[#111] bg-[#fffdf5] p-5 transition-all duration-150"
      style={{
        boxShadow: hovered ? "6px 6px 0 #111" : "4px 4px 0 #111",
        transform: hovered ? "translate(-2px,-2px)" : "translate(0,0)",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="absolute right-4 top-4 font-mono text-[9px] font-semibold tracking-widest text-neutral-300">
        {project.num}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {project.tags.map((t) => (
          <span
            key={t.label}
            className={`rounded-[2px] border-[1.5px] px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-wider ${tagStyles[t.variant]}`}
          >
            {t.label}
          </span>
        ))}
      </div>
      <div>
        <h3 className="text-[20px] font-bold leading-tight tracking-[-0.03em] text-[#111]">
          {project.title}
        </h3>
        <p className="mt-1 font-mono text-[10px] text-[#888]">
          {project.subtitle}
        </p>
      </div>
      {project.desc && (
        <p className="text-[12px] leading-[1.7] text-[#555]">{project.desc}</p>
      )}
      {project.stats && project.stats.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.stats.map((s) => (
            <div
              key={s.label}
              className="flex-1 rounded-[3px] border-2 border-[#111] bg-white p-2.5 shadow-[2px_2px_0_#111]"
              style={{ minWidth: "55px" }}
            >
              <div
                className={`font-sans text-[16px] font-bold leading-none ${statColors[s.color]}`}
              >
                {s.value}
              </div>
              <div className="mt-1 font-mono text-[9px] text-[#888]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="h-0.5 bg-[#111]" />
      <div className="flex flex-wrap gap-1.5">
        {project.pills.map((p) => (
          <span
            key={p}
            className="rounded-[2px] border-[1.5px] border-[#111] bg-transparent px-2 py-1 font-mono text-[9.5px] text-[#111]"
          >
            {p}
          </span>
        ))}
      </div>
      <div className="mt-1 flex flex-wrap gap-2">
        {project.links.map((link) =>
          link.ghost ? (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[2px] border-2 border-[#111] bg-transparent px-3.5 py-2 font-sans text-[11px] font-semibold text-[#111] transition-all hover:bg-[#111] hover:text-[#fffdf5]"
            >
              {link.label}
            </a>
          ) : (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-[2px] border-2 px-3.5 py-2 font-sans text-[11px] font-bold transition-all active:translate-x-0.5 active:translate-y-0.5 ${btnStyles[link.variant]}`}
            >
              {link.label}
            </a>
          ),
        )}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section className="w-full bg-accent-blue">
      <div className="mx-auto max-w-[1080px] px-5 py-16">
        <div className="mb-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-sans text-[clamp(36px,6vw,60px)] font-bold leading-none tracking-[-0.04em] text-[#fffdf5]">
              Projects<span className="text-[#e8f429]">.</span>
            </h2>
            {/* <button className="rounded-[2px] border-2 border-[#111] bg-[#fffdf5] px-4 py-2 font-mono text-[11px] font-bold text-[#111] shadow-[3px_3px_0_#111] transition-all hover:shadow-[4px_4px_0_#111]">
              View all
            </button> */}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
          <div className="flex flex-col gap-3.5 lg:pt-14">
            {col1.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
          <div className="flex flex-col gap-3.5">
            {col2.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
          <div className="flex flex-col gap-3.5 sm:col-span-2 sm:flex-row sm:flex-wrap lg:col-span-1 lg:flex-col lg:pt-14">
            {col3.map((p) => (
              <div
                key={p.id}
                className="flex-1 sm:min-w-[calc(50%-7px)] lg:min-w-0"
              >
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
