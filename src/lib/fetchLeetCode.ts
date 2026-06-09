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

async function lcGraphQL(query: string, variables: Record<string, unknown>) {
  const res = await fetch("/lc-api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`GraphQL ${res.status}`);
  return res.json();
}

export async function fetchLeetCode(): Promise<LeetCodeData> {
  const statsQuery = `
    query getUserStats($username: String!) {
      matchedUser(username: $username) {
        profile { ranking }
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
      allQuestionsCount {
        difficulty
        count
      }
    }
  `;

  const calendarQuery = `
    query getUserCalendar($username: String!) {
      matchedUser(username: $username) {
        userCalendar {
          submissionCalendar
        }
      }
    }
  `;

  const [statsData, calendarData] = await Promise.all([
    lcGraphQL(statsQuery, { username: LC_USERNAME }),
    lcGraphQL(calendarQuery, { username: LC_USERNAME }),
  ]);

  const user = statsData?.data?.matchedUser;
  const allQ = statsData?.data?.allQuestionsCount ?? [];

  const getCount = (diff: string) =>
    user?.submitStats?.acSubmissionNum?.find(
      (d: { difficulty: string; count: number }) => d.difficulty === diff,
    )?.count ?? 0;

  const getTotal = (diff: string) =>
    allQ.find(
      (d: { difficulty: string; count: number }) => d.difficulty === diff,
    )?.count ?? 0;

  let submissions = mockLeetCode().submissions;
  try {
    const raw =
      calendarData?.data?.matchedUser?.userCalendar?.submissionCalendar;
    const calendar: Record<string, number> =
      typeof raw === "string" ? JSON.parse(raw) : (raw ?? {});
    if (Object.keys(calendar).length > 0)
      submissions = calendarToGrid(calendar);
  } catch {
    /* fall through */
  }

  return {
    ranking: user?.profile?.ranking ?? 0,
    totalSolved: getCount("All"),
    easy: { solved: getCount("Easy"), total: getTotal("Easy") },
    medium: { solved: getCount("Medium"), total: getTotal("Medium") },
    hard: { solved: getCount("Hard"), total: getTotal("Hard") },
    streak: 0,
    submissions,
  };
}

export { mockLeetCode };
