export function calcStreaks(counts: number[]) {
  // counts: one number per day, oldest -> newest, already trimmed to today
  let longest = 0;
  let run = 0;
  for (const c of counts) {
    run = c > 0 ? run + 1 : 0;
    if (run > longest) longest = run;
  }

  // Current streak: walk back from today. If today has no activity yet,
  // don't break the streak, start counting from yesterday.
  let current = 0;
  let i = counts.length - 1;
  if (i >= 0 && counts[i] === 0) i--;
  for (; i >= 0 && counts[i] > 0; i--) current++;

  return { current, longest };
}

// Weeks are padded to 7 days, so drop the future days in the last week.
export function trimToToday<T>(days: T[], now = new Date()): T[] {
  const futureDays = 6 - now.getDay(); // Sunday-start weeks
  return futureDays > 0 ? days.slice(0, days.length - futureDays) : days;
}
