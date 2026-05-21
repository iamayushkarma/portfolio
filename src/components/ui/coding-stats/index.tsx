import { useEffect, useState } from "react";
import { GitHubPanel } from "./GitHubPanel";
import { LeetCodePanel } from "./LeetCodePanel";
import { fetchGitHub, ghFallback } from "../../../lib/fetchGitHub";
import { fetchLeetCode, mockLeetCode } from "../../../lib/fetchLeetCode";
import type {
  GitHubData,
  LeetCodeData,
} from "../../../types/coding-stats.types";

const GH_ICON =
  "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z";
const LC_ICON =
  "M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.396c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.396a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.274 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z";

export default function CodingStats() {
  const [gh, setGh] = useState<GitHubData | null>(null);
  const [lc, setLc] = useState<LeetCodeData | null>(null);

  useEffect(() => {
    fetchGitHub()
      .then(setGh)
      .catch(() => setGh(ghFallback()));
    fetchLeetCode()
      .then(setLc)
      .catch(() => setLc(mockLeetCode()));
  }, []);

  return (
    <section id="stats" className="px-3 py-6 md:px-6 md:py-10 bg-[#0a0f0b]">
      {/* Header */}
      <div className="flex items-center justify-between mb-1 pb-3 border-b border-[#1e3a28]">
        <h2 className="font-extrabold text-4xl md:text-5xl text-white tracking-tighter [font-family:var(--font-family-sans)]">
          CODING_<span className="text-accent-green">STATS</span>
        </h2>
      </div>

      {/* Platform labels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-3 mt-4">
        {[
          {
            label: "GITHUB",
            bg: "bg-accent-green",
            fill: "#0a0f0b",
            path: GH_ICON,
            vb: "0 0 16 16",
          },
          {
            label: "LEETCODE",
            bg: "bg-accent-yellow",
            fill: "#0a0f0b",
            path: LC_ICON,
            vb: "0 0 24 24",
          },
        ].map(({ label, bg, fill, path, vb }) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-[4px] ${bg} flex items-center justify-center shrink-0`}
            >
              <svg viewBox={vb} width="14" height="14" fill={fill}>
                <path d={path} />
              </svg>
            </div>
            <span className="font-mono font-bold tracking-widest text-[13px] text-white">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Panels or loader */}
      {gh && lc ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <GitHubPanel data={gh} />
          <LeetCodePanel data={lc} />
        </div>
      ) : (
        <div className="flex items-center justify-center py-20">
          <p className="font-mono text-[13px] text-[#4a9a5a]">
            $ loading --stats _
          </p>
        </div>
      )}
    </section>
  );
}
