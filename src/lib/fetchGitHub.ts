import type { ContribDay, GitHubData } from "../types/coding-stats.types";
import { GH_USERNAME } from "../data/coding-stats.data";

export async function fetchGitHub(): Promise<GitHubData> {
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

  const totalCommits = flat.reduce((s, d) => s + d.count, 0);
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

export function ghFallback(): GitHubData {
  return {
    repos: 27,
    followers: 37,
    totalCommits: 725,
    joinedYear: "JUL 2025",
    weeks: Array.from({ length: 52 }, () =>
      Array.from({ length: 7 }, () => {
        const r = Math.random();
        const level =
          r < 0.25 ? 0 : r < 0.5 ? 1 : r < 0.72 ? 2 : r < 0.88 ? 3 : 4;
        return { date: "", count: level, level: level as 0 | 1 | 2 | 3 | 4 };
      }),
    ),
  };
}
