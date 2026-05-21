import { useNavigate } from "react-router-dom";
import { motion, type Transition } from "motion/react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut", delay } as Transition,
});

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* 404 */}
      <motion.div {...fadeUp(0.05)} className="relative mb-2">
        <div
          className="absolute inset-0 bg-accent-blue border-2 border-ink"
          style={{ transform: "translate(8px, 8px)" }}
        />
        <h1
          className="relative font-sans font-bold leading-none tracking-tighter text-ink border-2 border-ink bg-cream px-6"
          style={{ fontSize: "clamp(100px, 22vw, 200px)" }}
        >
          404
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        {...fadeUp(0.15)}
        className="border-2 border-ink bg-ink text-cream px-5 py-2 font-mono text-sm font-bold uppercase tracking-widest shadow-brutal mb-4 mt-6"
      >
        Page Not Found
      </motion.div>

      {/* Message */}
      <motion.p
        {...fadeUp(0.25)}
        className="font-mono text-sm text-ink/60 text-center max-w-xs leading-relaxed mb-10"
      >
        You wandered somewhere that doesn't exist.
        <br />
        <span className="text-ink font-bold">
          Head back before you get lost.
        </span>
      </motion.p>

      {/* CTA */}
      <motion.button
        {...fadeUp(0.35)}
        onClick={() => navigate("/")}
        className="border-2 border-ink bg-ink text-cream font-mono font-bold text-sm uppercase tracking-widest px-8 py-3 shadow-brutal hover:bg-accent-blue hover:border-accent-blue transition-colors cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      >
        ← Back to Home
      </motion.button>
    </div>
  );
}
