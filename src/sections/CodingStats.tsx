"use client";

import { useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContribDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubData {
  repos: number;
  followers: number;
  totalCommits: number;
  joinedYear: string;
  weeks: ContribDay[][];
}

interface LeetCodeData {
  ranking: number;
  totalSolved: number;
  easy: { solved: number; total: number };
  medium: { solved: number; total: number };
  hard: { solved: number; total: number };
  streak: number;
  submissions: number[][];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GH_USERNAME = "iamayushkarma";
const LC_USERNAME = "iamayushkarma";

const GH_COLORS = ["#1a1f16", "#1e4d2b", "#276b38", "#33a152", "#33ff57"];
const LC_COLORS = ["#1a1a12", "#3d3300", "#7a6400", "#c8aa00", "#e8f429"];

const MONTH_LABELS = [
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
];
const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", ""];

// ─── GitHub Fetch ─────────────────────────────────────────────────────────────

async function fetchGitHub(): Promise<GitHubData> {
  const [profileRes, contribRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GH_USERNAME}`),
    fetch(
      `https://github-contributions-api.jogruber.de/v4/${GH_USERNAME}?y=last`,
    ),
  ]);

  const profile = await profileRes.json();
  const contribData = await contribRes.json();

  const flat: ContribDay[] = contribData.contributions ?? [];
  const weeks: ContribDay[][] = [];
  for (let i = 0; i < flat.length; i += 7) weeks.push(flat.slice(i, i + 7));

  const totalCommits = flat.reduce(
    (s: number, d: ContribDay) => s + d.count,
    0,
  );
  const joined = new Date(profile.created_at);
  const joinedYear = `${joined.toLocaleString("en", { month: "short" }).toUpperCase()} ${joined.getFullYear()}`;

  return {
    repos: profile.public_repos,
    followers: profile.followers,
    totalCommits,
    joinedYear,
    weeks,
  };
}

// ─── LeetCode Fetch ───────────────────────────────────────────────────────────

function mockLeetCode(): LeetCodeData {
  const submissions: number[][] = Array.from({ length: 52 }, () =>
    Array.from({ length: 7 }, () => {
      const r = Math.random();
      if (r < 0.45) return 0;
      if (r < 0.65) return 1;
      if (r < 0.8) return 2;
      if (r < 0.92) return 3;
      return 4;
    }),
  );
  return {
    ranking: 824307,
    totalSolved: 190,
    easy: { solved: 63, total: 944 },
    medium: { solved: 90, total: 2057 },
    hard: { solved: 37, total: 934 },
    streak: 50,
    submissions,
  };
}

function calendarToGrid(calendar: Record<string, number>): number[][] {
  const countMap: Record<string, number> = {};
  for (const [ts, count] of Object.entries(calendar)) {
    const key = new Date(Number(ts) * 1000).toISOString().slice(0, 10);
    countMap[key] = count;
  }

  const maxCount = Math.max(1, ...Object.values(countMap));
  const grid: number[][] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - startDate.getDay());
  startDate.setDate(startDate.getDate() - 51 * 7);

  for (let w = 0; w < 52; w++) {
    const week: number[] = [];
    for (let d = 0; d < 7; d++) {
      const cur = new Date(startDate);
      cur.setDate(startDate.getDate() + w * 7 + d);
      const key = cur.toISOString().slice(0, 10);
      const count = countMap[key] ?? 0;
      const level =
        count === 0
          ? 0
          : (Math.ceil((count / maxCount) * 4) as 0 | 1 | 2 | 3 | 4);
      week.push(Math.min(4, level));
    }
    grid.push(week);
  }

  return grid;
}

async function fetchLeetCode(): Promise<LeetCodeData> {
  const [solvedRes, profileRes, calendarRes] = await Promise.all([
    fetch(`https://alfa-leetcode-api.onrender.com/${LC_USERNAME}/solved`),
    fetch(`https://alfa-leetcode-api.onrender.com/${LC_USERNAME}`),
    fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${LC_USERNAME}`),
  ]);

  const solved = await solvedRes.json();
  const profile = await profileRes.json();
  const calendarData = await calendarRes.json();

  let submissions: number[][] = mockLeetCode().submissions;
  try {
    const raw = calendarData.submissionCalendar;
    const calendar: Record<string, number> =
      typeof raw === "string" ? JSON.parse(raw) : (raw ?? {});
    if (Object.keys(calendar).length > 0)
      submissions = calendarToGrid(calendar);
  } catch {
    // fall through to mock
  }

  return {
    ranking: profile.ranking ?? 0,
    totalSolved: solved.solvedProblem ?? 0,
    easy: { solved: solved.easySolved ?? 0, total: solved.totalEasy ?? 944 },
    medium: {
      solved: solved.mediumSolved ?? 0,
      total: solved.totalMedium ?? 2057,
    },
    hard: { solved: solved.hardSolved ?? 0, total: solved.totalHard ?? 934 },
    streak: 0,
    submissions,
  };
}

// ─── Shared Components ────────────────────────────────────────────────────────

function ContributionGraph({
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
    <div className="w-full" style={{ minWidth: 0 }}>
      <div className="flex mb-1" style={{ paddingLeft: 26 }}>
        {MONTH_LABELS.map((m, i) => (
          <div
            key={i}
            className="flex-1 text-left"
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 7,
              color: "#4a9a5a",
              letterSpacing: 0.5,
            }}
          >
            {m}
          </div>
        ))}
      </div>

      <div className="flex gap-1" style={{ minWidth: 0 }}>
        <div
          className="flex flex-col"
          style={{ width: 22, paddingTop: 1, flexShrink: 0 }}
        >
          {DAY_LABELS.map((d, i) => (
            <div
              key={i}
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 7,
                color: "#4a9a5a",
                height: 10,
                lineHeight: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {d}
            </div>
          ))}
        </div>

        <div
          className="flex gap-[2px] flex-1"
          style={{ minWidth: 0, overflow: "hidden" }}
        >
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[2px] flex-1">
              {week.map((cell, di) => (
                <div
                  key={di}
                  title={getTooltip(cell)}
                  className="w-full transition-transform duration-100 hover:scale-150 cursor-default"
                  style={{
                    aspectRatio: "1",
                    background: palette[getLevel(cell)],
                    borderRadius: 2,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div
        className="flex justify-between mt-1"
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 8,
          color: "#4a7a5a",
          paddingLeft: 26,
        }}
      >
        <span>{startLabel}</span>
        <span>{endLabel}</span>
      </div>
    </div>
  );
}

function SectionLabel({ left, right }: { left: string; right?: string }) {
  return (
    <div
      className="flex justify-between items-center mb-2"
      style={{
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: 8,
        letterSpacing: "2px",
        color: "#4a9a5a",
        textTransform: "uppercase",
      }}
    >
      <span>{left}</span>
      {right && (
        <span style={{ color: "#33ff57", fontWeight: 700 }}>{right}</span>
      )}
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
  return (
    <div
      className="p-3"
      style={{ border: "1px solid #1e3a28", background: "#0d1a11" }}
    >
      <p
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 8,
          color: "#4a9a5a",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          margin: "0 0 4px",
        }}
      >
        {label}
      </p>
      <p
        className="font-bold leading-none"
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: value.length > 6 ? 14 : 22,
          color: accent === "green" ? "#33ff57" : "#ffffff",
          paddingTop: value.length > 6 ? 4 : 0,
          margin: 0,
        }}
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
  const barColor = { easy: "#33ff57", medium: "#e8f429", hard: "#ff4444" }[
    type
  ];
  const pct = Math.round((solved / total) * 100);

  return (
    <div className="flex items-center gap-2 mb-3">
      <span
        className="font-semibold shrink-0"
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 11,
          color: "#ffffff",
          width: 48,
        }}
      >
        {label}
      </span>
      <div
        className="flex-1 h-[4px] rounded-full"
        style={{ background: "#1e3a28" }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: barColor,
            borderRadius: 9999,
          }}
        />
      </div>
      <span
        className="shrink-0 text-right"
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 10,
          color: "#888",
          width: 64,
        }}
      >
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
      className="flex items-center justify-between mt-4 pt-3"
      style={{
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: 11,
        color: "#4a9a5a",
        borderTop: "1px solid #1e3a28",
      }}
    >
      <span>$ {cmd} _</span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold tracking-widest transition-all duration-100"
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 10,
          padding: "5px 14px",
          border: `1.5px solid ${accentColor}`,
          color: accentColor,
          textDecoration: "none",
          display: "inline-block",
          letterSpacing: "1px",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background =
            accentColor + "22";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "transparent";
        }}
      >
        {label}
      </a>
    </div>
  );
}

// ─── GitHub Panel ─────────────────────────────────────────────────────────────

function GitHubPanel({ data }: { data: GitHubData }) {
  const now = new Date();
  const yearAgo = new Date(now);
  yearAgo.setFullYear(now.getFullYear() - 1);
  const fmt = (d: Date) =>
    `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;

  return (
    <div
      style={{
        background: "#111613",
        border: "1px solid #1e3a28",
        borderRadius: 8,
        padding: 20,
      }}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#0d2b18",
              border: "2px solid #33ff57",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg viewBox="0 0 16 16" width="18" height="18" fill="#33ff57">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </div>
          <div>
            <p
              className="font-bold"
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 15,
                color: "#ffffff",
                margin: 0,
              }}
            >
              {GH_USERNAME}
            </p>
            <p
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 9,
                color: "#33ff57",
                letterSpacing: "1px",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              MIDNIGHT CODER
            </p>
          </div>
        </div>
        <div className="text-right" style={{ flexShrink: 0 }}>
          <p
            className="font-bold"
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 22,
              color: "#33ff57",
              margin: 0,
              lineHeight: 1,
            }}
          >
            {data.totalCommits}+
          </p>
          <p
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 8,
              color: "#4a9a5a",
              letterSpacing: "1px",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            COMMITS
          </p>
        </div>
      </div>

      <div
        style={{
          border: "1px solid #1e3a28",
          borderRadius: 6,
          padding: "10px 14px",
          marginBottom: 14,
        }}
      >
        <SectionLabel left="TROPHY_ROOM" right="LOADED" />
        <div className="flex items-start gap-4" style={{ flexWrap: "wrap" }}>
          <div className="text-center" style={{ minWidth: 70 }}>
            <p
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 7,
                color: "#4a9a5a",
                letterSpacing: "1px",
                textTransform: "uppercase",
                margin: "0 0 6px",
              }}
            >
              HIGHEST RANK
            </p>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "2px solid #33ff57",
                background: "#0d2b18",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 4px",
              }}
            >
              <span style={{ fontSize: 20 }}>⭐</span>
            </div>
            <p
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 8,
                color: "#aaa",
                margin: 0,
              }}
            >
              Star Developer
            </p>
          </div>
          <div
            style={{ width: 1, background: "#1e3a28", alignSelf: "stretch" }}
          />
          <div className="flex-1" style={{ minWidth: 160 }}>
            <p
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 7,
                color: "#4a9a5a",
                letterSpacing: "1px",
                textTransform: "uppercase",
                margin: "0 0 8px",
              }}
            >
              ACHIEVEMENTS
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {[
                { icon: "📁", label: "10+ Repos" },
                { icon: "⭐", label: "Popular" },
                { icon: "📦", label: "10+ Repos" },
                { icon: "👤", label: "Popular" },
              ].map((t, i) => (
                <div key={i} className="text-center">
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      border: "1.5px solid #1e3a28",
                      background: "#0d2b18",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 4px",
                      fontSize: 16,
                    }}
                  >
                    {t.icon}
                  </div>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 7,
                      color: "#888",
                      margin: 0,
                    }}
                  >
                    {t.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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

      <div
        style={{
          border: "1px solid #1e3a28",
          borderRadius: 6,
          padding: "10px 14px",
          marginBottom: 14,
        }}
      >
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

// ─── LeetCode Panel ───────────────────────────────────────────────────────────

function LeetCodePanel({ data }: { data: LeetCodeData }) {
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
    <div
      style={{
        background: "#111613",
        border: "1px solid #1e3a28",
        borderRadius: 8,
        padding: 20,
      }}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#2b2200",
              border: "2px solid #e8f429",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#e8f429">
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.396c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.396a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.274 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
            </svg>
          </div>
          <div>
            <p
              className="font-bold"
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 15,
                color: "#ffffff",
                margin: 0,
              }}
            >
              {LC_USERNAME}
            </p>
            <p
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 9,
                color: "#e8f429",
                letterSpacing: "1px",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              PROBLEM SOLVER
            </p>
          </div>
        </div>
        <div className="text-right" style={{ flexShrink: 0 }}>
          <p
            className="font-bold"
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 20,
              color: "#e8f429",
              margin: 0,
              lineHeight: 1,
            }}
          >
            #Top
          </p>
          <p
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 8,
              color: "#888",
              letterSpacing: "1px",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            RANKING
          </p>
        </div>
      </div>

      <div
        style={{
          border: "1px solid #1e3a28",
          borderRadius: 6,
          padding: "10px 14px",
          marginBottom: 14,
        }}
      >
        <SectionLabel left="PERFORMANCE_BADGES" right="LOADED" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          <div style={{ minWidth: 90 }}>
            <p
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 7,
                color: "#4a9a5a",
                letterSpacing: "1px",
                textTransform: "uppercase",
                margin: "0 0 8px",
              }}
            >
              ACTIVE BADGE
            </p>
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "#2b2200",
                  border: "2px solid #e8f429",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  flexShrink: 0,
                }}
              >
                🏅
              </div>
              <p
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 8,
                  color: "#aaa",
                  margin: 0,
                }}
              >
                50 Days Badge
              </p>
            </div>
          </div>
          <div
            style={{ width: 1, background: "#1e3a28", alignSelf: "stretch" }}
          />
          <div className="flex-1" style={{ minWidth: 140 }}>
            <p
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 7,
                color: "#4a9a5a",
                letterSpacing: "1px",
                textTransform: "uppercase",
                margin: "0 0 8px",
              }}
            >
              HISTORY AWARDS
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
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
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "#1a1a2e",
                      border: "1.5px solid #333",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 4px",
                      fontSize: 18,
                    }}
                  >
                    {b.icon}
                  </div>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 7,
                      color: "#888",
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {b.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 7,
                      color: "#e8a800",
                      margin: 0,
                    }}
                  >
                    {b.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          border: "1px solid #1e3a28",
          borderRadius: 6,
          padding: "16px 18px",
          marginBottom: 14,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#2b2200",
                border: "2px solid #e8f429",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="#e8f429">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.396c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.396a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.274 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
              </svg>
            </div>
            <span
              className="font-bold"
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 14,
                color: "#ffffff",
              }}
            >
              {LC_USERNAME}
            </span>
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 12,
              color: "#888",
            }}
          >
            #{data.ranking.toLocaleString()}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              border: "4px solid #e8f429",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              background: "#0d1208",
            }}
          >
            <span
              className="font-bold"
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 22,
                color: "#ffffff",
              }}
            >
              {data.totalSolved}
            </span>
          </div>
          <div className="flex-1" style={{ minWidth: 160 }}>
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
          <p
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 11,
              color: "#aaa",
              margin: "0 0 8px",
            }}
          >
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

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function CodingStats() {
  const [gh, setGh] = useState<GitHubData | null>(null);
  const [lc, setLc] = useState<LeetCodeData | null>(null);
  const [_ghError, setGhError] = useState(false);

  useEffect(() => {
    fetchGitHub()
      .then(setGh)
      .catch(() => {
        setGhError(true);
        setGh({
          repos: 27,
          followers: 37,
          totalCommits: 725,
          joinedYear: "JUL 2025",
          weeks: Array.from({ length: 52 }, () =>
            Array.from({ length: 7 }, () => {
              const r = Math.random();
              const level =
                r < 0.25 ? 0 : r < 0.5 ? 1 : r < 0.72 ? 2 : r < 0.88 ? 3 : 4;
              return {
                date: "",
                count: level,
                level: level as 0 | 1 | 2 | 3 | 4,
              };
            }),
          ),
        });
      });

    fetchLeetCode()
      .then(setLc)
      .catch(() => setLc(mockLeetCode()));
  }, []);

  return (
    <section
      id="stats"
      className="px-3 py-6 md:px-6 md:py-10"
      style={{ background: "#0a0f0b" }}
    >
      <div
        className="flex items-center justify-between mb-1 pb-3"
        style={{ borderBottom: "1px solid #1e3a28" }}
      >
        <h2
          className="font-bold m-0"
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: "clamp(18px, 5vw, 26px)",
            letterSpacing: "-0.5px",
            color: "#ffffff",
          }}
        >
          CODING_<span style={{ color: "#33ff57" }}>STATS</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-3 mt-4">
        {[
          {
            label: "GITHUB",
            bg: "#33ff57",
            fill: "#0a0f0b",
            path: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z",
            vb: "0 0 16 16",
          },
          {
            label: "LEETCODE",
            bg: "#e8f429",
            fill: "#0a0f0b",
            path: "M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.396c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.396a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.274 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z",
            vb: "0 0 24 24",
          },
        ].map(({ label, bg, fill, path, vb }) => (
          <div key={label} className="flex items-center gap-2">
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 4,
                background: bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg viewBox={vb} width="14" height="14" fill={fill}>
                <path d={path} />
              </svg>
            </div>
            <span
              className="font-bold tracking-widest"
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 13,
                color: "#ffffff",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {gh && lc ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <GitHubPanel data={gh} />
          <LeetCodePanel data={lc} />
        </div>
      ) : (
        <div className="flex items-center justify-center py-20">
          <p
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 13,
              color: "#4a9a5a",
            }}
          >
            $ loading --stats _
          </p>
        </div>
      )}

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.15} }
        * { box-sizing: border-box; }
      `}</style>
    </section>
  );
}
