import type { ContribDay } from "../../../types/coding-stats.types";
import { MONTH_LABELS, DAY_LABELS } from "../../../data/coding-stats.data";

export function ContributionGraph({
  weeks,
  palette,
  startLabel,
  endLabel,
}: {
  weeks: (ContribDay | number)[][];
  palette: string[];
  startLabel: string;
  endLabel: string;
}) {
  const getLevel = (cell: ContribDay | number) =>
    typeof cell === "number" ? cell : cell.level;
  const getTooltip = (cell: ContribDay | number) =>
    typeof cell === "number"
      ? `Level ${cell}`
      : `${cell.date}: ${cell.count} contribution${cell.count !== 1 ? "s" : ""}`;

  return (
    <div className="w-full min-w-0">
      {/* Month labels */}
      <div className="flex mb-1 pl-[26px]">
        {MONTH_LABELS.map((m, i) => (
          <div
            key={i}
            className="flex-1 text-left font-mono text-[7px] text-[#4a9a5a] tracking-[0.5px]"
          >
            {m}
          </div>
        ))}
      </div>

      <div className="flex gap-1 min-w-0">
        {/* Day labels */}
        <div className="flex flex-col pt-[1px] shrink-0" style={{ width: 22 }}>
          {DAY_LABELS.map((d, i) => (
            <div
              key={i}
              className="font-mono text-[7px] text-[#4a9a5a] flex items-center"
              style={{ height: 10, lineHeight: "10px" }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="flex gap-[2px] flex-1 min-w-0 overflow-hidden">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[2px] flex-1">
              {week.map((cell, di) => (
                <div
                  key={di}
                  title={getTooltip(cell)}
                  className="w-full transition-transform duration-100 rounded-[.5px] md:rounded-[2px] hover:scale-[1.2] cursor-default"
                  style={{
                    aspectRatio: "1",
                    background: palette[getLevel(cell)],
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Date range */}
      <div className="flex justify-between mt-1 font-mono text-[8px] text-[#4a7a5a] pl-[26px]">
        <span>{startLabel}</span>
        <span>{endLabel}</span>
      </div>
    </div>
  );
}
