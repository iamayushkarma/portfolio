"use client";

import { useEffect, useRef, useCallback } from "react";

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

const SKILLS: Skill[] = [
  { label: "JavaScript", r: 54, col: "amber" },
  { label: "TypeScript", r: 50, col: "blue" },
  { label: "React.js", r: 54, col: "blue" },
  { label: "Node.js", r: 48, col: "green" },
  { label: "Tailwind CSS", r: 46, col: "teal" },
  { label: "Express.js", r: 44, col: "green" },
  { label: "REST APIs", r: 40, col: "indigo" },
  { label: "JWT Auth", r: 36, col: "coral" },
  { label: "Google OAuth", r: 38, col: "blue" },
  { label: "MongoDB", r: 42, col: "green" },
  { label: "MySQL", r: 38, col: "amber" },
  { label: "Firebase", r: 38, col: "coral" },
  { label: "Redux Toolkit", r: 42, col: "purple" },
  { label: "React Context", r: 38, col: "blue" },
  { label: "Java", r: 50, col: "amber" },
  { label: "DSA", r: 42, col: "purple" },
  { label: "HTML5", r: 36, col: "coral" },
  { label: "CSS3", r: 34, col: "blue" },
  { label: "Git", r: 34, col: "gray" },
  { label: "GitHub", r: 34, col: "gray" },
  { label: "Postman", r: 32, col: "amber" },
  { label: "Vercel", r: 32, col: "teal" },
  { label: "Chrome APIs", r: 34, col: "indigo" },
];

const ICON_MAP: Record<string, string> = {
  JavaScript: "devicon-javascript-plain",
  TypeScript: "devicon-typescript-plain",
  "React.js": "devicon-react-original",
  "Node.js": "devicon-nodejs-plain",
  "Tailwind CSS": "devicon-tailwindcss-plain",
  "Express.js": "devicon-express-original",
  "REST APIs": "devicon-fastapi-plain",
  "JWT Auth": "devicon-jsonwebtokens-plain",
  "Google OAuth": "devicon-google-plain",
  MongoDB: "devicon-mongodb-plain",
  MySQL: "devicon-mysql-plain",
  Firebase: "devicon-firebase-plain",
  "Redux Toolkit": "devicon-redux-original",
  "React Context": "devicon-react-original",
  Java: "devicon-java-plain",
  DSA: "devicon-java-plain",
  HTML5: "devicon-html5-plain",
  CSS3: "devicon-css3-plain",
  Git: "devicon-git-plain",
  GitHub: "devicon-github-original",
  Postman: "devicon-postman-plain",
  Vercel: "devicon-vercel-original",
  "Chrome APIs": "devicon-chrome-plain",
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  .skills-arena {
    width: 100%;
    height: 520px;
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    background-color: transparent;
    background-image: radial-gradient(circle at 1px 1px, rgba(150,150,150,0.18) 1px, transparent 0);
    background-size: 26px 26px;
    -webkit-user-select: none;
    user-select: none;
    touch-action: none;
  }
  @media (max-width: 640px) {
    .skills-arena { height: 420px; }
  }

  .sk-blue   { background: rgb(59 130 246); color: #fffdf5; border: 2px solid #111111; }
  .sk-teal   { background: #e8f429; color: #111111; border: 2px solid #111111; }
  .sk-purple { background: #111111; color: #fffdf5; border: 2px solid #111111; }
  .sk-coral  { background: #33ff57; color: #111111; border: 2px solid #111111; }
  .sk-green  { background: #333333; color: #fffdf5; border: 2px solid #111111; }
  .sk-amber  { background: #e8f429; color: #111111; border: 2px solid #111111; }
  .sk-pink   { background: #fffdf5; color: #111111; border: 2px solid #111111; }
  .sk-gray   { background: #888888; color: #fffdf5; border: 2px solid #111111; }
  .sk-indigo { background: #fffdf5; color: #111111; border: 2px solid #111111; }

  .sk-bubble {
    position: absolute;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
    will-change: transform;
    transition: box-shadow 0.12s ease;
    gap: 3px;
    padding: 6px;
    touch-action: none;
    pointer-events: auto;
    left: 0;
    top: 0;
    transform-origin: center center;
    box-shadow: 3px 3px 0 #111111;
  }
  .sk-bubble:hover { box-shadow: 5px 5px 0 #111111; }
  .sk-bubble.active {
    cursor: grabbing;
    box-shadow: 2px 2px 0 #111111;
    z-index: 999;
  }
  .sk-bubble i { display: block; line-height: 1; flex-shrink: 0; pointer-events: none; }
  .sk-bubble span {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: 1;
    text-align: center;
    opacity: 0.9;
    padding: 0 2px;
    pointer-events: none;
  }

  .skills-section {
    width: 100%;
    padding: 4rem 1.5rem;
    background: transparent !important;
    background-color: transparent !important;
  }
  .skills-section *:not(.skills-arena):not(.sk-bubble):not([class^="sk-"]) {
    background: transparent;
  }
  .skills-header {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  .skills-heading {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 800;
    font-size: clamp(2rem, 4vw, 3rem);
    letter-spacing: -0.04em;
    line-height: 1;
    color: inherit;
  }
  .skills-badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 999px;
    border: 1.5px solid currentColor;
    opacity: 0.55;
    margin-bottom: 3px;
  }
  .skills-hint {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    opacity: 0.4;
    text-align: right;
    margin-top: 10px;
  }
`;

export default function SkillsBubbles() {
  const arenaRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const rafRef = useRef<number>(0);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const linkRef = useRef<HTMLLinkElement | null>(null);
  const dragRef = useRef<{
    bubble: Bubble;
    lastX: number;
    lastY: number;
    lastT: number;
  } | null>(null);

  const initBubbles = useCallback(() => {
    const arena = arenaRef.current;
    if (!arena) return;
    const W = arena.offsetWidth;
    const H = arena.offsetHeight;
    const scale = Math.min(1, W / 420);

    bubblesRef.current = SKILLS.map((s, i) => {
      const scaledR = Math.round(s.r * scale);
      const angle = (i / SKILLS.length) * Math.PI * 2;
      const spread = 30 + Math.random() * 60;
      return {
        ...s,
        scaledR,
        x: W / 2 + Math.cos(angle) * spread,
        y: H / 2 + Math.sin(angle) * spread,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        pinned: false,
        _lvx: 0,
        _lvy: 0,
        el: null,
      };
    });
  }, []);

  const mountBubbles = useCallback(() => {
    const arena = arenaRef.current;
    if (!arena) return;
    arena.innerHTML = "";

    bubblesRef.current.forEach((b) => {
      const el = document.createElement("div");
      const d = b.scaledR * 2;
      const iconSize = Math.max(16, Math.round(b.scaledR * 0.55));
      const labelSize = Math.max(7, Math.round(b.scaledR * 0.17));

      el.className = `sk-bubble sk-${b.col}`;
      el.style.width = `${d}px`;
      el.style.height = `${d}px`;

      const icon = document.createElement("i");
      icon.className = ICON_MAP[b.label] ?? "devicon-github-original";
      icon.style.fontSize = `${iconSize}px`;
      icon.style.color = "currentColor";
      el.appendChild(icon);

      const lbl = document.createElement("span");
      lbl.textContent = b.label;
      lbl.style.fontSize = `${labelSize}px`;
      el.appendChild(lbl);

      arena.appendChild(el);
      b.el = el;

      el.addEventListener("pointerdown", (e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        e.stopPropagation();

        el.setPointerCapture(e.pointerId);

        const rect = arena.getBoundingClientRect();
        const ex = e.clientX - rect.left;
        const ey = e.clientY - rect.top;

        b.x = ex;
        b.y = ey;
        b.pinned = true;
        b.vx = 0;
        b.vy = 0;
        b._lvx = 0;
        b._lvy = 0;
        el.classList.add("active");

        dragRef.current = {
          bubble: b,
          lastX: ex,
          lastY: ey,
          lastT: performance.now(),
        };
      });

      el.addEventListener("pointermove", (e) => {
        const d = dragRef.current;
        if (!d || d.bubble !== b) return;

        const rect = arena.getBoundingClientRect();
        const ex = e.clientX - rect.left;
        const ey = e.clientY - rect.top;
        const now = performance.now();
        const dt = Math.max(1, now - d.lastT);

        d.bubble._lvx = ((ex - d.lastX) / dt) * 14;
        d.bubble._lvy = ((ey - d.lastY) / dt) * 14;
        d.bubble.x = ex;
        d.bubble.y = ey;
        d.lastX = ex;
        d.lastY = ey;
        d.lastT = now;
      });

      const onRelease = () => {
        const d = dragRef.current;
        if (!d || d.bubble !== b) return;
        d.bubble.pinned = false;
        d.bubble.vx = Math.max(-6, Math.min(6, d.bubble._lvx));
        d.bubble.vy = Math.max(-6, Math.min(6, d.bubble._lvy));
        el.classList.remove("active");
        dragRef.current = null;
      };

      el.addEventListener("pointerup", onRelease);
      el.addEventListener("pointercancel", onRelease);
    });
  }, []);

  const resolveCollisions = useCallback(() => {
    const bs = bubblesRef.current;
    for (let iter = 0; iter < 5; iter++) {
      for (let i = 0; i < bs.length; i++) {
        for (let j = i + 1; j < bs.length; j++) {
          const a = bs[i],
            b = bs[j];
          const dx = b.x - a.x,
            dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
          const minD = a.scaledR + b.scaledR + 1.5;
          if (dist < minD) {
            const nx = dx / dist,
              ny = dy / dist;
            const push = (minD - dist) / 2;
            if (!a.pinned) {
              a.x -= nx * push;
              a.y -= ny * push;
            }
            if (!b.pinned) {
              b.x += nx * push;
              b.y += ny * push;
            }
            if (!a.pinned && !b.pinned) {
              const dot = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
              if (dot > 0) {
                a.vx -= dot * nx * 0.4;
                a.vy -= dot * ny * 0.4;
                b.vx += dot * nx * 0.4;
                b.vy += dot * ny * 0.4;
              }
            }
          }
        }
      }
    }
  }, []);

  const startLoop = useCallback(() => {
    const arena = arenaRef.current;
    if (!arena) return;
    const GRAVITY = 0.022;
    const DAMPING = 0.8;

    const tick = () => {
      const W = arena.offsetWidth;
      const H = arena.offsetHeight;
      const CX = W / 2,
        CY = H / 2;

      bubblesRef.current.forEach((b) => {
        if (b.pinned) return;
        const dx = CX - b.x,
          dy = CY - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const pull = GRAVITY * Math.min(dist, 120) * 0.12;
        b.vx += (dx / dist) * pull;
        b.vy += (dy / dist) * pull;
        b.vx *= DAMPING;
        b.vy *= DAMPING;
        b.x += b.vx;
        b.y += b.vy;
        const pad = 2,
          r = b.scaledR;
        if (b.x - r < pad) {
          b.x = r + pad;
          b.vx = Math.abs(b.vx) * 0.35;
        }
        if (b.x + r > W - pad) {
          b.x = W - r - pad;
          b.vx = -Math.abs(b.vx) * 0.35;
        }
        if (b.y - r < pad) {
          b.y = r + pad;
          b.vy = Math.abs(b.vy) * 0.35;
        }
        if (b.y + r > H - pad) {
          b.y = H - r - pad;
          b.vy = -Math.abs(b.vy) * 0.35;
        }
      });

      resolveCollisions();

      bubblesRef.current.forEach((b) => {
        if (b.el) {
          b.el.style.transform = `translate(${b.x - b.scaledR}px, ${b.y - b.scaledR}px)`;
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [resolveCollisions]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
    styleRef.current = style;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css";
    document.head.appendChild(link);
    linkRef.current = link;

    initBubbles();
    mountBubbles();
    startLoop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (styleRef.current) document.head.removeChild(styleRef.current);
      if (linkRef.current) document.head.removeChild(linkRef.current);
    };
  }, [initBubbles, mountBubbles, startLoop]);

  return (
    <section id="skills" className="skills-section">
      <div className="skills-header">
        <h2 className="skills-heading">Skills</h2>
        <span className="skills-badge">{SKILLS.length} technologies</span>
      </div>
      <div ref={arenaRef} className="skills-arena" />
    </section>
  );
}
