function SectionLabel({ left, right }: { left: string; right?: string }) {
  return (
    <div className="flex justify-between items-center mb-2 font-mono text-[8px] tracking-[2px] uppercase text-[#4a9a5a]">
      <span>{left}</span>
      {right && <span className="text-accent-green font-bold">{right}</span>}
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "green";
}) {
  const isLong = value.length > 6;
  return (
    <div className="p-3 border border-[#1e3a28] bg-[#0d1a11]">
      <p className="font-mono text-[8px] tracking-[1.5px] uppercase text-[#4a9a5a] mb-1">
        {label}
      </p>
      <p
        className={`font-mono font-bold leading-none m-0 ${isLong ? "text-sm pt-1" : "text-[22px]"} ${
          accent === "green" ? "text-accent-green" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function LCBar({
  label,
  solved,
  total,
  type,
}: {
  label: string;
  solved: number;
  total: number;
  type: "easy" | "medium" | "hard";
}) {
  const barColor = {
    easy: "bg-accent-green",
    medium: "bg-accent-yellow",
    hard: "bg-red-500",
  }[type];
  const pct = Math.round((solved / total) * 100);

  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="font-mono font-semibold text-[11px] text-white w-12 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-[4px] rounded-full bg-[#1e3a28]">
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-mono text-[10px] text-muted w-16 text-right shrink-0">
        {solved} / {total}
      </span>
    </div>
  );
}

function CmdBar({
  cmd,
  label,
  href,
  accentColor = "#33ff57",
}: {
  cmd: string;
  label: string;
  href: string;
  accentColor?: string;
}) {
  return (
    <div
      className="flex items-center justify-between mt-4 pt-3 font-mono text-[11px] text-[#4a9a5a]"
      style={{ borderTop: "1px solid #1e3a28" }}
    >
      <span>$ {cmd} _</span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono font-bold text-[10px] tracking-[1px] px-[14px] py-[5px] no-underline transition-colors duration-100"
        style={{ border: `1.5px solid ${accentColor}`, color: accentColor }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.background =
            accentColor + "22")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.background = "transparent")
        }
      >
        {label}
      </a>
    </div>
  );
}
export { SectionLabel, StatCard, LCBar, CmdBar };
