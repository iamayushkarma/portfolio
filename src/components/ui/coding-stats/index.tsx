import { useEffect, useState } from "react";
import { motion, type Transition } from "motion/react";
import { GitHubPanel } from "./GitHubPanel";
import { LeetCodePanel } from "./LeetCodePanel";
import { fetchGitHub, ghFallback } from "../../../lib/fetchGitHub";
import { fetchLeetCode, mockLeetCode } from "../../../lib/fetchLeetCode";
import type {
  GitHubData,
  LeetCodeData,
} from "../../../types/coding-stats.types";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, ease: "easeOut", delay } as Transition,
});

export default function CodingStats() {
  const [gh, setGh] = useState<GitHubData | null>(null);
  const [lc, setLc] = useState<LeetCodeData | null>(null);
  const [lcError, setLcError] = useState(false);

  useEffect(() => {
    fetchGitHub()
      .then(setGh)
      .catch(() => setGh(ghFallback()));

    fetchLeetCode()
      .then((data) => {
        setLcError(false);
        setLc(data);
      })
      .catch(() => setLcError(true));
  }, []);

  return (
    <section
      id="stats"
      className="px-3 py-6 md:px-6 md:py-10 bg-[#0a0f0b] scroll-mt-14 md:scroll-mt-16"
    >
      {/* Header */}
      <motion.div
        {...fadeUp(0.05)}
        className="flex items-center justify-between mb-1 pb-4 md:pb-6 border-b border-[#1e3a28]"
      >
        <h2 className="font-sans md:mx-auto font-bold text-4xl md:text-5xl text-white tracking-tighter">
          CODING_<span className="text-accent-green">STATS</span>
        </h2>
      </motion.div>
      // AFTER
      {!gh ? (
        <motion.div
          {...fadeUp(0.15)}
          className="flex items-center justify-center py-20"
        >
          <p className="font-mono text-[13px] text-[#4a9a5a]">
            $ loading --stats _
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
          {/* GitHub */}
          <motion.div {...fadeUp(0.15)}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-[4px] bg-accent-green flex items-center justify-center shrink-0">
                <FaGithub size={14} color="#0a0f0b" />
              </div>
              <span className="font-mono font-bold tracking-widest text-[13px] text-white">
                GITHUB
              </span>
            </div>
            <GitHubPanel data={gh} />
          </motion.div>

          {/* LeetCode */}
          <motion.div {...fadeUp(0.25)}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-[4px] bg-accent-yellow flex items-center justify-center shrink-0">
                <SiLeetcode size={14} color="#0a0f0b" />
              </div>
              <span className="font-mono font-bold tracking-widest text-[13px] text-white">
                LEETCODE
              </span>
            </div>
            {lcError ? (
              <div className="bg-[#111613] border border-[#1e3a28] rounded-lg p-5 flex flex-col items-center justify-center gap-3 min-h-[200px]">
                <p className="font-mono text-[11px] text-[#4a9a5a] tracking-widest uppercase">
                  API_UNAVAILABLE
                </p>
                <p className="font-mono text-[10px] text-muted text-center">
                  LeetCode API is a free-tier Render instance — cold starting or
                  down.
                </p>
                <button
                  onClick={() => {
                    setLcError(false);
                    setLc(null);
                    fetchLeetCode()
                      .then((data) => {
                        setLcError(false);
                        setLc(data);
                      })
                      .catch(() => setLcError(true));
                  }}
                  className="font-mono text-[11px] text-accent-yellow border border-accent-yellow/40 px-3 py-1.5 rounded hover:bg-accent-yellow/10 transition-colors cursor-pointer"
                >
                  RETRY →
                </button>
              </div>
            ) : !lc ? (
              <div className="bg-[#111613] border border-[#1e3a28] rounded-lg p-5 animate-pulse">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-full bg-[#1e3a28]" />
                  <div className="flex flex-col gap-2">
                    <div className="h-3 w-28 bg-[#1e3a28] rounded" />
                    <div className="h-2 w-20 bg-[#1e3a28] rounded" />
                  </div>
                </div>
                <div className="h-24 bg-[#1e3a28] rounded-md mb-3" />
                <div className="h-32 bg-[#1e3a28] rounded-md mb-3" />
                <div className="h-8 bg-[#1e3a28] rounded-md" />
              </div>
            ) : (
              <LeetCodePanel data={lc} />
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}
