interface Skill {
  label: string;
  r: number;
  col: string;
}

interface Bubble extends Skill {
  x: number;
  y: number;
  vx: number;
  vy: number;
  pinned: boolean;
  _lvx: number;
  _lvy: number;
  el: HTMLDivElement | null;
  scaledR: number;
}
export type { Skill, Bubble };
