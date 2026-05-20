"use client";

const experiences = [
  {
    title: "FRONTEND INTERN",
    company: "CONNEX_AI",
    period: "May 2026 - PRESENT",
    points: [
      "Building and maintaining frontend features using React and TypeScript for a US-based healthcare AI platform",
      "Collaborating with cross functional teams across time zones to deliver production-ready UI components",
      "Working remotely with a US team Casper, Wyoming",
    ],
  },
  {
    title: "OPEN SOURCE CONTRIBUTOR",
    company: "GITHUB_COMMUNITY",
    period: "Nov 2025 - PRESENT",
    points: [
      "Just getting started with open source exploring codebases and understanding contribution workflows",
      "Made first pull requests fixing small bugs and improving documentation",
      "Actively learning how collaborative development works in real-world projects",
    ],
  },
];

export default function ExperienceLog() {
  return (
    <section className="min-h-screen px-6 py-16 box-border">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap');
        .exp-card:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 #0d0d0d !important; }
      `}</style>

      {/* Header */}
      <div className="text-center mb-14">
        <h1
          className="m-0 leading-none uppercase"
          style={{
            fontFamily: "'Arial Black', Impact, sans-serif",
            fontSize: "clamp(48px, 8vw, 88px)",
            fontWeight: 900,
            letterSpacing: "-2px",
            color: "#0d0d0d",
          }}
        >
          EXPERIENCE
        </h1>
      </div>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-[#0d0d0d] z-0"
          style={{ left: 20 }}
        />

        <div className="flex flex-col gap-8">
          {experiences.map((exp, i) => (
            <div key={i} className="flex gap-7 items-start relative z-10">
              {/* Timeline dot */}
              <div
                className="shrink-0 flex justify-center pt-5"
                style={{ width: 42 }}
              >
                <div
                  className="w-[14px] h-[14px] shrink-0 border-2 border-[#0d0d0d]"
                  style={{
                    background: "#e8c900",
                    boxShadow: "2px 2px 0 #0d0d0d",
                  }}
                />
              </div>

              {/* Card */}
              <div
                className="exp-card flex-1 min-w-0 bg-white border-2 border-[#0d0d0d] p-6 transition-transform duration-150"
                style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
              >
                {/* Title + badge */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <h2
                    className="m-0 text-[#0d0d0d] font-bold text-base leading-snug tracking-wide"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {exp.title}
                  </h2>
                  <span
                    className="bg-[#0d0d0d] text-white text-[11px] font-semibold px-3 py-[5px] shrink-0 tracking-wide whitespace-nowrap"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {exp.period}
                  </span>
                </div>

                {/* Dashed divider */}
                <div className="border-t border-dashed border-[#b0b0a0] mb-3" />

                {/* Company */}
                <p
                  className="m-0 mb-4 text-[13px] font-bold tracking-widest"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "#c8b400",
                  }}
                >
                  @ {exp.company}
                </p>

                {/* Bullet points */}
                <ul className="m-0 p-0 list-none flex flex-col gap-2">
                  {exp.points.map((point, j) => (
                    <li
                      key={j}
                      className="flex gap-2 items-start text-[13px] leading-relaxed text-[#2a2a2a]"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      <span className="text-[#0d0d0d] shrink-0 mt-[2px]">
                        •
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* End of timeline */}
          <div className="flex gap-7 items-center relative z-10">
            <div className="shrink-0 flex justify-center" style={{ width: 42 }}>
              <div className="w-[14px] h-[14px] bg-[#0d0d0d] border-2 border-[#0d0d0d]" />
            </div>
            <span
              className="text-[11px] text-[#888] tracking-[3px] uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              — END OF LOG —
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
