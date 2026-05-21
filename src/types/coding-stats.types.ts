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

export type { ContribDay, GitHubData, LeetCodeData };
