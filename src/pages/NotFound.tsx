import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="relative mb-2">
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
      </div>

      {/* subtitle */}
      <div className="border-2 border-ink bg-ink text-cream px-5 py-2 font-mono text-sm font-bold uppercase tracking-widest shadow-brutal mb-4 mt-6">
        Page Not Found
      </div>

      {/* message */}
      <p className="font-mono text-sm text-ink/60 text-center max-w-xs leading-relaxed mb-10">
        You wandered somewhere that doesn't exist.
        <br />
        <span className="text-ink font-bold">
          Head back before you get lost.
        </span>
      </p>

      {/* CTA */}
      <button
        onClick={() => navigate("/")}
        className="border-2 border-ink bg-ink text-cream font-mono font-bold text-sm uppercase tracking-widest px-8 py-3 shadow-brutal hover:bg-accent-blue hover:border-accent-blue transition-colors cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      >
        ← Back to Home
      </button>
    </div>
  );
}
