import { Check, ArrowRight } from "lucide-react";
import { stack, certs } from "../data/about-section.data";

function AboutSection() {
  const cardBase =
    "rounded-2xl border-2 border-ink p-5 flex flex-col transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5";

  return (
    <section id="about" className="px-4 md:px-8">
      <h2 className="font-sans! text-left md:text-center font-black text-5xl md:text-5xl lg:text-7xl uppercase tracking-tighter mb-8 pb-4">
        About Me
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 max-w-5xl mx-auto">
        {/* Name Status */}
        <div
          className={`${cardBase} md:col-span-8 bg-accent-yellow justify-between min-h-44 hover:shadow-brutal-b`}
        >
          <p className="font-sans font-bold text-xs uppercase tracking-widest opacity-60">
            Full-Stack Developer
          </p>
          <div>
            <h3 className="font-sans font-black text-6xl md:text-7xl leading-none tracking-tighter">
              AYUSH
            </h3>
            <h3 className="font-sans font-black text-6xl md:text-7xl leading-none tracking-tighter">
              KARMA
            </h3>
          </div>
          <p className="font-sans text-sm mt-2 opacity-70">
            Indore, MP · BCA '26 · ayushkarma.dev@gmail.com
          </p>
        </div>

        <div
          className={`${cardBase} md:col-span-4 bg-ink text-white justify-between hover:shadow-brutal-w`}
        >
          <p className="font-sans font-bold text-xs uppercase tracking-widest opacity-40">
            Status
          </p>
          <div>
            <p className="font-sans font-bold text-base flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-green border border-white inline-block animate-pulse" />
              Open for Work
            </p>
            <p className="font-sans text-sm text-white/60 mt-1">
              Internships · Freelance · Full-time
            </p>
          </div>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-1.5 font-sans font-bold text-sm text-accent-green uppercase tracking-widest cursor-pointer group w-fit bg-transparent border-none p-0"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

        {/* Bio */}
        <div
          className={`${cardBase} md:col-span-5 bg-white hover:shadow-brutal justify-between`}
        >
          <p className="font-sans font-bold text-xs uppercase tracking-widest opacity-60 mb-3">
            Who I Am
          </p>
          <p className="font-sans text-base md:text-sm leading-relaxed opacity-80 flex-1">
            Full-stack dev who ships things that actually work - AI resume
            scorers, aviation platforms with real payment flows. I write clean
            React + TypeScript on the frontend and wire it to Node.js backends.
            Strong DSA fundamentals, bias for shipping, habit of making every
            project better than the brief asked for.
          </p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {["React", "TypeScript", "Node.js", "MongoDB", "DSA"].map((t) => (
              <span
                key={t}
                className="font-sans font-bold text-xs px-2.5 py-1 rounded-lg border-2 border-ink"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div
          className={`${cardBase} md:col-span-3 bg-white hover:shadow-brutal`}
        >
          <p className="font-sans font-bold text-xs uppercase tracking-widest opacity-60 mb-3">
            Daily Stack
          </p>
          <div className="grid grid-cols-3 gap-2 flex-1">
            {stack.map((s) => (
              <div
                key={s.abbr}
                title={s.label}
                className="aspect-square rounded-xl border-2 border-ink overflow-hidden hover:bg-ink transition-colors cursor-default group flex items-center justify-center"
              >
                <img
                  src={s.icon}
                  alt={s.label}
                  className="size-12 md:w-7 md:h-7 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div
          className={`${cardBase} md:col-span-4 bg-ink text-white hover:shadow-brutal-w`}
        >
          <p className="font-sans font-bold text-xs uppercase tracking-widest opacity-40 mb-3">
            Certifications
          </p>
          <ul className="space-y-3 flex-1">
            {certs.map((c) => (
              <li key={c.title} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent-green/20 border border-accent-green/40 flex items-center justify-center flex-shrink-0">
                  <Check
                    className="text-accent-green w-4 h-4"
                    strokeWidth={3}
                  />
                </div>
                <div>
                  <p className="font-sans text-sm font-bold leading-tight">
                    {c.title}
                  </p>
                  <p className="font-sans text-xs text-white/40 mt-0.5">
                    {c.sub}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured Project, Education */}
        <div
          className={`${cardBase} md:col-span-8 bg-accent-blue text-white justify-between hover:shadow-brutal-b`}
        >
          <p className="font-sans font-bold text-xs uppercase tracking-widest opacity-60 mb-2">
            Featured Project
          </p>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <span className="font-sans font-black text-2xl text-white">
                T
              </span>
            </div>
            <div>
              <p className="font-sans font-black text-2xl leading-tight">
                Tero - AI Resume Scorer
              </p>
              <p className="font-sans text-sm md:text-xs text-white/70 mt-2 leading-relaxed">
                ~95% parsing accuracy · Groq API · React + TypeScript. Boosted
                scoring relevance by ~25 - 30%. Optimized API efficiency ~40%
                via rate limited processing with rule based normalization.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {["React", "TypeScript", "Groq API", "Context API"].map((t) => (
              <span
                key={t}
                className="font-sans font-bold text-xs px-2.5 py-1 rounded-lg border border-white/40 text-white/90 bg-white/10"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div
          className={`${cardBase} md:col-span-4 bg-accent-yellow justify-between hover:shadow-brutal`}
        >
          <p className="font-sans font-bold text-xs uppercase tracking-widest opacity-60 mb-2">
            Education
          </p>
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAA21BMVEVHcEwAewBrJVl0H2AGYidKPkYeSSxgL1NmKFZXM00+Pz4AmwCLAW7///+DAGehTozN0M+wcKC1eaaHA1e+irHm6OqmWZLFxsfHytL49/icRIjDlLipYZe4u8Z5FGLv7/P17s/7+/u5gqv9+t///+7u4MKSI3f46eZAjVJUek+taJvw19WussHZ2uBslWTj4uKTKFGyvK6WMYDS1d5viGEAcAfd4Oaeq4qJD27IoYLb3eOYmGYHYQHhzLDQq8YubCeYcku6hnDClXl2ooaYNV7Vt5GaPVAAPAAATwDaqcjAAAAADHRSTlMAD8b3G1Qxi6VvQAmknxsMAAACkUlEQVQ4jW1TiXKiQBQ0iQokb94w3HLfCgLet0Zz7v7/F+1osllT2S4KKLqhm543rdYVupIgioLUbf0XXdFHoCUAuCi2f9DtW4RSsZ1HmitujHh7852XEFxN0YzYse1SUWIX/M41L4KhaCWbgqpSFaiiaWWOwjUP+SOD8SZL0jTMnl9tlzkAXwrJYAiovhGimzPLWpJ0o9J8SvHTpY3UYfQ9IbNq5nmVt/QsEo7hUQP/4SK4BebY72ntWaYcERJZZu3pydhgMYiX/0eXaWpIAlkmn5Dl7TI0FMXA9iVhHMNbsLVGhOyaplntCBnJlr6ZMs04f8K3NXecmjOZ9JrFgGOx6hFLr9IxU5jPHWCqTTekMrn7fDHYzQeLOXepquiJsbOHBIadZ96WC+rdYnAqBotJTYi5DA65E0OnJQDSPJlZOon0ggvmg/2KpxnVemaUMUg8o6Oo6dKKSE2Ox5dT8bLf9bha9hJwGW9TBNdWU6uK+NPDsTmdmn0/iEhP9sI81rhAQF5ZWNUjeb+aZLv9ftWfTAp9u5yFa/dsIYFSYtazJpPm93GuZzzJ8VexMvX6MNUYD9nF0qHPgWwRsnwp5kUzL154peaWPNnupUrfYMY4DWrv3HFTzFc6v/GCKlER4e5cNWqMbog3M8kXzO2MPDsOvYxElyqPTA17VjCJPuhoEkS9TKWU4s3Hcts4HSc97mBaoxE/cVH4qinlx3K3bnxAxR1nhAz7w9FwOOwTcn7fWfufI9dB19Goukn7nOzzI3lWaVzG9v3foRTQcNY5qk+HMEnCw5OKOSpTlP6NtYBgBwiAF/BrYMM1z114DrgCgn/f+oYHcX0t8MWfm7ct3H1q1nfCzU/+oulIgiB1vm3tP5XoVikHo1BXAAAAAElFTkSuQmCC"
                alt="collage-logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className="font-sans font-bold text-xl md:text-lg leading-tight">
                BCA · DAVV
              </p>
              <p className="font-sans text-sm md:text-xs mt-1 opacity-70 leading-relaxed">
                Govt. Holkar Science College
                <br />
                Indore · CGPA 7.5 · 2023–2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
