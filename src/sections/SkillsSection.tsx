import { useEffect, useRef, useCallback } from "react";
import type { Bubble } from "../types/skill.type";
import { SKILLS, ICON_MAP, COL_STYLES } from "../data/skill-section.data";
import { motion, type Transition } from "motion/react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, ease: "easeOut", delay } as Transition,
});
const MINIMAL_CSS = `
  .skills-arena {
    background-image: radial-gradient(circle at 1px 1px, rgba(150,150,150,0.18) 1px, transparent 0);
    background-size: 26px 26px;
  }
  .sk-bubble {
    left: 0;
    top: 0;
    transform-origin: center center;
    will-change: transform;
    gap: 3px;
    touch-action: none;
  }
  .sk-bubble i { pointer-events: none; }
  .sk-bubble span { pointer-events: none; }
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

      // Tailwind classes for layout/interaction; color applied via inline style
      el.className =
        "sk-bubble absolute rounded-full flex flex-col items-center justify-center cursor-grab select-none p-1.5 pointer-events-auto shadow-[3px_3px_0_#111] hover:shadow-[5px_5px_0_#111] transition-shadow duration-[120ms] ease-in-out";
      el.style.cssText = `width:${d}px;height:${d}px;${COL_STYLES[b.col] ?? COL_STYLES.gray}`;

      const icon = document.createElement("i");
      icon.className = `${ICON_MAP[b.label] ?? "devicon-github-original"} block leading-none flex-shrink-0`;
      icon.style.cssText = `font-size:${iconSize}px;color:currentColor;`;
      el.appendChild(icon);

      const lbl = document.createElement("span");
      lbl.textContent = b.label;
      lbl.style.cssText = `font-family:'JetBrains Mono',monospace;font-weight:500;font-size:${labelSize}px;letter-spacing:-0.02em;line-height:1;text-align:center;opacity:0.9;padding:0 2px;`;
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
        // swap grab → grabbing, reduce shadow
        el.classList.remove("cursor-grab", "shadow-[3px_3px_0_#111]");
        el.classList.add(
          "cursor-grabbing",
          "shadow-[2px_2px_0_#111]",
          "z-[999]",
        );

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
        el.classList.remove(
          "cursor-grabbing",
          "shadow-[2px_2px_0_#111]",
          "z-[999]",
        );
        el.classList.add("cursor-grab", "shadow-[3px_3px_0_#111]");
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
    style.textContent = MINIMAL_CSS;
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
    <section id="skills" className="w-full px-4 py-8 md:mt-20 mt-10">
      {/* Header */}
      <motion.div
        {...fadeUp(0.05)}
        className="flex items-end md:justify-center justify-start gap-4 mb-6"
      >
        <h2 className="font-sans! text-left md:text-center font-black text-[2.8rem] md:text-5xl lg:text-7xl uppercase tracking-tighter md:mb-8 pb-1">
          Skills
        </h2>
      </motion.div>

      {/* Physics arena */}
      <motion.div
        {...fadeUp(0.15)}
        ref={arenaRef}
        className="skills-arena w-full h-110 sm:h-123 relative overflow-hidden rounded-2xl bg-transparent select-none touch-none"
      />

      {/* Hint */}
      <motion.p
        {...fadeUp(0.25)}
        className="text-[0.7rem] opacity-40 text-right mt-2.5"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        drag to move
      </motion.p>
    </section>
  );
}
