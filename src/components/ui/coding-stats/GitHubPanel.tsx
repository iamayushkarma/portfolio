import { ContributionGraph } from "./ContributionGraph";
import { SectionLabel, StatCard, CmdBar } from "./shared";
import type { GitHubData } from "../../../types/coding-stats.types";
import { GH_USERNAME, GH_COLORS } from "../../../data/coding-stats.data";

const GH_ICON_PATH =
  "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z";

export function GitHubPanel({ data }: { data: GitHubData }) {
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
          <div className="w-9 h-9 rounded-full bg-[#0d2b18] border-2 border-accent-green flex items-center justify-center shrink-0">
            <svg viewBox="0 0 16 16" width="18" height="18" fill="#33ff57">
              <path d={GH_ICON_PATH} />
            </svg>
          </div>
          <div>
            <p className="font-mono font-bold text-[15px] text-white m-0">
              {GH_USERNAME}
            </p>
            <p className="font-mono text-[9px] text-accent-green tracking-[1px] m-0 uppercase">
              MIDNIGHT CODER
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="font-mono font-bold text-[22px] text-accent-green m-0 leading-none">
            {data.totalCommits}+
          </p>
          <p className="font-mono text-[8px] text-[#4a9a5a] tracking-[1px] m-0 uppercase">
            COMMITS
          </p>
        </div>
      </div>

      {/* Trophy room */}
      <div className="border border-[#1e3a28] rounded-md px-[14px] py-[10px] mb-[14px]">
        <SectionLabel left="TROPHY_ROOM" right="LOADED" />
        <div className="flex items-start gap-4 flex-wrap">
          <div className="text-center min-w-[70px]">
            <p className="font-mono text-[7px] text-[#4a9a5a] tracking-[1px] uppercase mb-[6px]">
              HIGHEST RANK
            </p>
            <div className="w-11 h-11 rounded-full border-2 border-accent-green bg-[#0d2b18] flex items-center justify-center mx-auto mb-1 text-[20px]">
              ⭐
            </div>
            <p className="font-mono text-[8px] text-muted m-0">
              Star Developer
            </p>
          </div>
          <div className="w-px bg-[#1e3a28] self-stretch" />
          <div className="flex-1 min-w-[160px]">
            <p className="font-mono text-[7px] text-[#4a9a5a] tracking-[1px] uppercase mb-2">
              ACHIEVEMENTS
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: "📁", label: `${data.repos} Repos` },
                { icon: "👥", label: `${data.followers} Followers` },
                { icon: "💻", label: `${data.totalCommits}+ Commits` },
                { icon: "📅", label: `Since ${data.joinedYear}` },
              ].map((t, i) => (
                <div key={i} className="text-center">
                  <div className="w-9 h-9 rounded-full border border-[#1e3a28] bg-[#0d2b18] flex items-center justify-center mx-auto mb-1 text-base">
                    {t.icon}
                  </div>
                  <p className="font-mono text-[7px] text-muted m-0">
                    {t.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <StatCard label="REPOSITORIES" value={String(data.repos)} />
        <StatCard label="FOLLOWERS" value={String(data.followers)} />
        <StatCard
          label="COMMITS"
          value={`${data.totalCommits}+`}
          accent="green"
        />
        <StatCard label="JOINED" value={data.joinedYear} />
      </div>

      {/* Contribution graph */}
      <div className="border border-[#1e3a28] rounded-md px-[14px] py-[10px] mb-[14px]">
        <SectionLabel left="MATRIX_OUTPUT" right="LOADED" />
        <ContributionGraph
          weeks={data.weeks}
          palette={GH_COLORS}
          startLabel={fmt(yearAgo)}
          endLabel={fmt(now)}
        />
      </div>

      <CmdBar
        cmd="gh --stats"
        label="VIEW_GH →"
        href={`https://github.com/${GH_USERNAME}`}
      />
    </div>
  );
}
