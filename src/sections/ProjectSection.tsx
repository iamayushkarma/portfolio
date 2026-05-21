import { useState } from "react";
import type { Project } from "../types/project.type";
import { motion, type Transition } from "motion/react";
import { col1, col2, col3 } from "../data/project-section.data";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.5, ease: "easeOut", delay } as Transition,
});
const tagStyles = {
  dark: "bg-ink text-cream border-ink",
  yellow: "bg-accent-yellow text-ink border-ink",
  green: "bg-accent-green text-ink border-ink",
  blue: "bg-accent-blue text-cream border-ink",
  cream: "bg-cream text-ink border-ink",
  building: "bg-accent-yellow text-ink border-ink",
};

const statColors = {
  blue: "text-accent-blue",
  yellow: "text-accent-yellow",
  green: "text-accent-green",
  dark: "text-ink",
};

const btnStyles = {
  dark: "bg-ink text-cream border-ink shadow-[3px_3px_0_#555] hover:shadow-[4px_4px_0_#555]",
  yellow:
    "bg-accent-yellow text-ink border-ink shadow-[3px_3px_0_#a89800] hover:shadow-[4px_4px_0_#a89800]",
  green:
    "bg-accent-green text-ink border-ink shadow-[3px_3px_0_#1a9933] hover:shadow-[4px_4px_0_#1a9933]",
  blue: "bg-accent-blue text-cream border-ink shadow-[3px_3px_0_#1d4ed8] hover:shadow-[4px_4px_0_#1d4ed8]",
};

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col gap-3.5 rounded-[4px] border-2 border-ink bg-cream p-5 font-sans transition-all duration-150"
      style={{
        boxShadow: hovered
          ? "6px 6px 0 var(--color-ink)"
          : "var(--shadow-brutal-b)",
        transform: hovered ? "translate(-2px,-2px)" : "translate(0,0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Number */}
      <span className="absolute right-4 top-4 font-mono text-[9px] font-semibold tracking-widest text-muted/40">
        {project.num}
      </span>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2">
        {project.tags.map((t) => (
          <span
            key={t.label}
            className={`rounded-[2px] border-2 px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-wider ${tagStyles[t.variant]}`}
            style={
              t.variant === "building"
                ? {
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                  }
                : undefined
            }
          >
            {t.label}
          </span>
        ))}
      </div>

      {/* Title + subtitle */}
      <div>
        <h3 className="text-[20px] font-bold leading-tight tracking-[-0.03em] text-ink">
          {project.title}
        </h3>
        <p className="mt-1 font-mono text-[10px] text-muted">
          {project.subtitle}
        </p>
      </div>

      {/* Description */}
      {project.desc && (
        <p className="text-[12px] leading-[1.7] text-charcoal">
          {project.desc}
        </p>
      )}

      {/* Stats */}
      {project.stats && project.stats.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.stats.map((s) => (
            <div
              key={s.label}
              className="flex-1 min-w-[55px] rounded-[3px] border-2 border-ink bg-cream p-2.5 shadow-brutal"
            >
              <div
                className={`font-sans text-[16px] font-bold leading-none ${statColors[s.color]}`}
              >
                {s.value}
              </div>
              <div className="mt-1 font-mono text-[9px] text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="h-0.5 bg-ink" />

      {/* Pills */}
      <div className="flex flex-wrap gap-1.5">
        {project.pills.map((p) => (
          <span
            key={p}
            className="rounded-[2px] border-[1.5px] border-ink bg-transparent px-2 py-1 font-mono text-[9.5px] text-ink"
          >
            {p}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="mt-1 flex flex-wrap gap-2">
        {project.links.map((link) =>
          link.ghost ? (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[2px] border-2 border-ink bg-transparent px-3.5 py-2 font-sans text-[11px] font-semibold text-ink transition-all hover:bg-ink hover:text-cream"
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
    <section id="work" className="w-full bg-accent-blue">
      <div className="mx-auto max-w-270 px-5 py-16">
        {/* Header */}
        <motion.div {...fadeUp(0.05)} className="mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-sans! text-left text-white md:text-center font-black text-[2.8rem] md:text-5xl lg:text-7xl md:mx-auto uppercase tracking-tighter md:mb-8 pb-1">
              Projects
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
          {/* Col 1 */}
          <motion.div
            {...fadeUp(0.1)}
            className="flex flex-col gap-3.5 lg:pt-14"
          >
            {col1.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </motion.div>

          {/* Col 2 */}
          <motion.div {...fadeUp(0.2)} className="flex flex-col gap-3.5">
            {col2.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </motion.div>

          {/* Col 3 */}
          <motion.div
            {...fadeUp(0.3)}
            className="flex flex-col gap-3.5 sm:col-span-2 sm:flex-row sm:flex-wrap lg:col-span-1 lg:flex-col lg:pt-14"
          >
            {col3.map((p) => (
              <div
                key={p.id}
                className="flex-1 sm:min-w-[calc(50%-7px)] lg:min-w-0"
              >
                <ProjectCard project={p} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
