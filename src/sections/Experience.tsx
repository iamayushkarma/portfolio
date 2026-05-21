import { experiences } from "../data/experiences.data";

export default function ExperienceLog() {
  return (
    <section id="log" className="min-h-screen px-3 md:px-6 py-16 box-border">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="font-sans! text-left md:text-center font-black text-[2.8rem] md:text-5xl lg:text-7xl uppercase tracking-tighter">
          EXPERIENCE
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div className="absolute top-0 bottom-0 left-3 md:left-5 w-[2px] bg-ink z-0" />

        <div className="flex flex-col gap-8">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="flex gap-3 md:gap-7 items-start relative z-10"
            >
              {/* Timeline dot */}
              <div className="w-[24px] md:w-[42px] shrink-0 flex justify-center pt-5">
                <div className="w-[10px] h-[10px] md:w-[14px] md:h-[14px] shrink-0 border-2 border-ink bg-accent-yellow shadow-brutal" />
              </div>

              {/* Card */}
              <div className="flex-1 min-w-0 bg-cream border-2 border-ink p-4 md:p-6 shadow-brutal-b transition-transform duration-150">
                {/* Title + badge */}
                <div className="flex flex-wrap items-start justify-between gap-2 md:gap-3 mb-3">
                  <h2 className="m-0 font-sans font-bold text-sm md:text-base leading-snug tracking-wide text-ink">
                    {exp.title}
                  </h2>
                  <span className="font-sans bg-ink text-cream text-[10px] md:text-[11px] font-semibold px-2 md:px-3 py-[4px] md:py-[5px] shrink-0 tracking-wide whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                {/* Dashed divider */}
                <div className="border-t border-dashed border-muted/50 mb-3" />

                {/* Company */}
                <p className="font-sans m-0 mb-4 text-[12px] md:text-[13px] font-bold tracking-widest text-accent-blue">
                  @ {exp.company}
                </p>

                {/* Bullet points */}
                <ul className="m-0 p-0 list-none flex flex-col gap-2">
                  {exp.points.map((point, j) => (
                    <li
                      key={j}
                      className="font-sans flex gap-2 items-start text-[12px] md:text-[13px] leading-relaxed text-charcoal"
                    >
                      <span className="text-ink shrink-0 mt-[2px]">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* End of timeline */}
          <div className="flex gap-3 md:gap-7 items-center relative z-10">
            <div className="w-[24px] md:w-[42px] shrink-0 flex justify-center">
              <div className="w-[10px] h-[10px] md:w-[14px] md:h-[14px] bg-ink border-2 border-ink" />
            </div>
            <span className="font-sans text-[11px] text-muted tracking-[3px] uppercase">
              - END OF LOG -
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
