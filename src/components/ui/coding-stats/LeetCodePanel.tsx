import { ContributionGraph } from "./ContributionGraph";
import { SectionLabel, LCBar, CmdBar } from "./shared";
import type { LeetCodeData } from "../../../types/coding-stats.types";
import { LC_USERNAME, LC_COLORS } from "../../../data/coding-stats.data";

const LC_ICON_PATH =
  "M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.396c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.396a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.274 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z";

export function LeetCodePanel({ data }: { data: LeetCodeData }) {
  const lcWeeks = data.submissions.map((week) =>
    week.map((level) => ({
      date: "",
      count: level,
      level: level as 0 | 1 | 2 | 3 | 4,
    })),
  );
  const now = new Date();
  const yearAgo = new Date(now);
  yearAgo.setFullYear(now.getFullYear() - 1);
  const fmt = (d: Date) =>
    `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;

  return (
    <div className="bg-[#111613] border border-[#1e3a28] rounded-lg p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#2b2200] border-2 border-accent-yellow flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#e8f429">
              <path d={LC_ICON_PATH} />
            </svg>
          </div>
          <div>
            <p className="font-mono font-bold text-[15px] text-white m-0">
              {LC_USERNAME}
            </p>
            <p className="font-mono text-[9px] text-accent-yellow tracking-[1px] m-0 uppercase">
              PROBLEM SOLVER
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="font-mono font-bold text-[20px] text-accent-yellow m-0 leading-none">
            #{data.ranking > 0 ? data.ranking.toLocaleString() : "-"}
          </p>
          <p className="font-mono text-[8px] text-muted tracking-[1px] m-0 uppercase">
            RANKING
          </p>
        </div>
      </div>

      {/* Performance badges */}
      <div className="border border-[#1e3a28] rounded-md px-[14px] py-[10px] mb-[14px]">
        <SectionLabel left="PERFORMANCE_BADGES" right="LOADED" />
        <div className="flex flex-wrap gap-4">
          <div className="min-w-[90px]">
            <p className="font-mono text-[7px] text-[#4a9a5a] tracking-[1px] uppercase mb-2">
              ACTIVE BADGE
            </p>
            <div className="flex items-center gap-2">
              <div className="w-11 h-11 rounded-full bg-[#2b2200] border-2 border-accent-yellow flex items-center justify-center text-[22px] shrink-0">
                🏅
              </div>
              <p className="font-mono text-[8px] text-muted m-0">
                50 Days Badge
              </p>
            </div>
          </div>
          <div className="w-px bg-[#1e3a28] self-stretch" />
          <div className="flex-1 min-w-[140px]">
            <p className="font-mono text-[7px] text-[#4a9a5a] tracking-[1px] uppercase mb-2">
              HISTORY AWARDS
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                {
                  icon: "🏗️",
                  name: "Architecture Builder Badge",
                  date: "2025-12-19",
                },
                {
                  icon: "🧭",
                  name: "Data Navigator Badge",
                  date: "2025-12-15",
                },
              ].map((b) => (
                <div key={b.name} className="text-center">
                  <div className="w-9 h-9 rounded-full bg-[#1a1a2e] border border-[#333] flex items-center justify-center mx-auto mb-1 text-lg">
                    {b.icon}
                  </div>
                  <p className="font-mono text-[7px] text-muted m-0 leading-snug">
                    {b.name}
                  </p>
                  <p className="font-mono text-[7px] text-[#e8a800] m-0">
                    {b.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats + bars */}
      <div className="border border-[#1e3a28] rounded-md px-[18px] py-4 mb-[14px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#2b2200] border-2 border-accent-yellow flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="#e8f429">
                <path d={LC_ICON_PATH} />
              </svg>
            </div>
            <span className="font-mono font-bold text-[14px] text-white">
              {LC_USERNAME}
            </span>
          </div>
          <span className="font-mono text-[12px] text-muted">
            #{data.ranking.toLocaleString()}
          </span>
        </div>

        <div className="flex flex-wrap gap-5 items-center">
          <div className="w-[72px] h-[72px] rounded-full border-4 border-accent-yellow flex items-center justify-center shrink-0 bg-[#0d1208]">
            <span className="font-mono font-bold text-[22px] text-white">
              {data.totalSolved}
            </span>
          </div>
          <div className="flex-1 min-w-[160px]">
            <LCBar
              label="Easy"
              solved={data.easy.solved}
              total={data.easy.total}
              type="easy"
            />
            <LCBar
              label="Medium"
              solved={data.medium.solved}
              total={data.medium.total}
              type="medium"
            />
            <LCBar
              label="Hard"
              solved={data.hard.solved}
              total={data.hard.total}
              type="hard"
            />
          </div>
        </div>

        <div className="mt-4">
          <p className="font-mono text-[11px] text-muted mb-2">
            Heatmap (Last 52 Weeks)
          </p>
          <ContributionGraph
            weeks={lcWeeks}
            palette={LC_COLORS}
            startLabel={fmt(yearAgo)}
            endLabel={fmt(now)}
          />
        </div>
      </div>

      <CmdBar
        cmd="leetcode --u"
        label="VIEW_LC →"
        href={`https://leetcode.com/u/${LC_USERNAME}`}
        accentColor="#e8a800"
      />
    </div>
  );
}
