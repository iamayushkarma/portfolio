import type { LeetCodeData } from "../types/coding-stats.types";
import { LC_USERNAME } from "../data/coding-stats.data";

function mockLeetCode(): LeetCodeData {
  const submissions: number[][] = Array.from({ length: 52 }, () =>
    Array.from({ length: 7 }, () => {
      const r = Math.random();
      return r < 0.45 ? 0 : r < 0.65 ? 1 : r < 0.8 ? 2 : r < 0.92 ? 3 : 4;
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
    countMap[new Date(Number(ts) * 1000).toISOString().slice(0, 10)] = count;
  }
  const maxCount = Math.max(1, ...Object.values(countMap));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - startDate.getDay() - 51 * 7);

  return Array.from({ length: 52 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const cur = new Date(startDate);
      cur.setDate(startDate.getDate() + w * 7 + d);
      const count = countMap[cur.toISOString().slice(0, 10)] ?? 0;
      return count === 0 ? 0 : Math.min(4, Math.ceil((count / maxCount) * 4));
    }),
  );
}

export async function fetchLeetCode(): Promise<LeetCodeData> {
  const [solvedRes, profileRes, calendarRes] = await Promise.all([
    fetch(`https://alfa-leetcode-api.onrender.com/${LC_USERNAME}/solved`),
    fetch(`https://alfa-leetcode-api.onrender.com/${LC_USERNAME}`),
    fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${LC_USERNAME}`),
  ]);

  const solved = await solvedRes.json();
  const profile = await profileRes.json();
  const calendarData = await calendarRes.json();

  let submissions = mockLeetCode().submissions;
  try {
    const raw = calendarData.submissionCalendar;
    const calendar: Record<string, number> =
      typeof raw === "string" ? JSON.parse(raw) : (raw ?? {});
    if (Object.keys(calendar).length > 0)
      submissions = calendarToGrid(calendar);
  } catch {
    /* fall through */
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

export { mockLeetCode };
