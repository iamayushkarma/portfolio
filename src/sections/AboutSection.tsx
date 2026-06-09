import { Check, ArrowRight } from "lucide-react";
import { motion, type Transition } from "motion/react";
import { stack, certs } from "../data/about-section.data";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, ease: "easeOut", delay } as Transition,
});

const cardBase =
  "rounded-2xl border-2 border-ink p-5 flex flex-col overflow-hidden min-h-[140px] lg:min-h-0 transition-all duration-200 hover:[box-shadow:var(--shadow-brutal-b)] hover:-translate-y-0.5 hover:-translate-x-0.5";

export default function AboutSection() {
  return (
    <section id="about" className="py-12 scroll-mt-14 md:scroll-mt-20">
      <motion.h2
        {...fadeUp(0.0)}
        className="font-sans! text-left md:text-center font-black text-[2.8rem] md:text-5xl lg:text-7xl uppercase tracking-tighter mb-6 md:mb-10 px-4 md:px-8"
      >
        About Me
      </motion.h2>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:auto-rows-[110px] gap-3">
          {/* A — Name */}
          <motion.div
            {...fadeUp(0.1)}
            className={`
              ${cardBase}
              lg:col-start-1 lg:col-span-3
              lg:row-start-1 lg:row-span-3
              bg-accent-yellow
              justify-between
              min-h-[220px] lg:min-h-0
            `}
          >
            <p className="font-sans font-bold text-xs uppercase tracking-widest opacity-60">
              Full-Stack Developer
            </p>
            <div>
              <h3 className="font-sans font-black text-[2.8rem] md:text-5xl leading-none tracking-tighter">
                AYUSH
              </h3>
              <h3 className="font-sans font-black text-[2.8rem] md:text-5xl leading-none tracking-tighter">
                KARMA
              </h3>
            </div>
            <p className="font-sans text-xs mt-2 opacity-70 leading-relaxed">
              Indore, MP · BCA '26
              <br />
              ayushkarma.dev@gmail.com
            </p>
          </motion.div>

          {/* B - Open to Work */}
          <motion.div
            {...fadeUp(0.15)}
            className={`
              ${cardBase}
              lg:col-start-4 lg:col-span-3
              lg:row-start-1 lg:row-span-2
              bg-accent-blue text-white
              justify-between
            `}
          >
            <p className="font-sans font-bold text-xs uppercase tracking-widest opacity-40">
              Status
            </p>
            <div>
              <p className="font-sans font-bold text-base flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-green border border-white/30 inline-block animate-pulse" />
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
              className="flex items-center gap-1.5 font-sans font-bold text-sm text-white uppercase tracking-widest cursor-pointer group w-fit bg-transparent border-none p-0"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </motion.div>

          {/* C - Daily Stack */}
          <motion.div
            {...fadeUp(0.2)}
            className={`
              ${cardBase}
              lg:col-start-7 lg:col-span-3
              lg:row-start-1 lg:row-span-2
              bg-cream
              min-h-[260px] lg:min-h-0
            `}
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
                    className="size-7 object-contain"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* D - Certificates */}
          <motion.div
            {...fadeUp(0.25)}
            className={`
              ${cardBase}
              lg:col-start-10 lg:col-span-3
              lg:row-start-1 lg:row-span-3
              bg-ink text-white
              justify-between
              min-h-[240px] lg:min-h-0
            `}
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
          </motion.div>

          {/* E - About Myself */}
          <motion.div
            {...fadeUp(0.3)}
            className={`
              ${cardBase}
              lg:col-start-4 lg:col-span-6
              lg:row-start-3 lg:row-span-2
              bg-accent-blue text-white
              justify-between
              min-h-[220px] lg:min-h-0
            `}
          >
            <p className="font-sans font-bold text-xs uppercase tracking-widest opacity-40 mb-3">
              About Myself
            </p>
            <p className="font-sans text-sm md:text-base leading-relaxed text-white/80 flex-1">
              Full-stack dev who ships things that work — AI resume scorers,
              aviation platforms with real payment flows. Clean React +
              TypeScript on the frontend, wired to Node.js backends. Strong DSA
              fundamentals, ships fast and always leaves the project better than
              found.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {["React", "TypeScript", "Node.js", "MongoDB", "DSA"].map((t) => (
                <span
                  key={t}
                  className="font-sans font-bold text-xs px-2.5 py-1 rounded-lg border border-white/30 text-white/80 bg-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* F - HookLens */}
          <motion.div
            {...fadeUp(0.35)}
            className={`
              ${cardBase}
              lg:col-start-1 lg:col-span-3
              lg:row-start-4 lg:row-span-3
              bg-accent-blue text-white
              justify-between
              min-h-[280px] lg:min-h-0
            `}
          >
            <p className="font-sans font-bold text-xs uppercase tracking-widest opacity-60 mb-2">
              Featured Project
            </p>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <span className="font-sans font-black text-xl text-white">
                  H
                </span>
              </div>
              <div>
                <p className="font-sans font-black text-xl leading-tight">
                  HookLens
                </p>
                <p className="font-sans text-xs text-white/70 mt-1">
                  Webhook Inspector
                </p>
              </div>
            </div>
            <p className="font-sans text-xs text-white/70 leading-relaxed mt-2 flex-1">
              Multi-tenant SaaS platform for webhook inspection and debugging
              with real-time request streaming via Socket.io, request replay
              engine, RBAC-based workspaces, and AI-powered payload explanations
              using Groq.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {["React", "TypeScript", "Node.js", "Socket.io", "Groq API"].map(
                (t) => (
                  <span
                    key={t}
                    className="font-sans font-bold text-xs px-2.5 py-1 rounded-lg border border-white/40 text-white/90 bg-white/10"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </motion.div>

          {/* I - Education */}
          <motion.div
            {...fadeUp(0.4)}
            className={`
              ${cardBase}
              lg:col-start-10 lg:col-span-3
              lg:row-start-4 lg:row-span-1
              bg-ink text-white
              justify-between
            `}
          >
            <p className="font-sans font-bold text-xs uppercase tracking-widest opacity-40 mb-2">
              Education
            </p>
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 overflow-hidden">
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
                <p className="font-sans text-sm md:text-xs mt-1 opacity-50 leading-relaxed">
                  Govt. Holkar Science College
                </p>
              </div>
            </div>
          </motion.div>

          {/* G - Location */}
          <motion.div
            {...fadeUp(0.45)}
            className={`
              ${cardBase}
              lg:col-start-4 lg:col-span-3
              lg:row-start-5 lg:row-span-2
              bg-cream
              justify-between
            `}
          >
            <p className="font-sans font-bold text-xs uppercase tracking-widest opacity-60">
              Location
            </p>
            <div>
              <p className="font-sans font-black text-3xl leading-none tracking-tighter">
                Indore
              </p>
              <p className="font-sans text-sm opacity-60 mt-1">
                Madhya Pradesh, India
              </p>
              <p className="font-sans text-xs opacity-40 mt-1">
                Available Remote 🌍
              </p>
            </div>
          </motion.div>

          {/* H - Connect */}
          <motion.div
            {...fadeUp(0.5)}
            className={`
              ${cardBase}
              lg:col-start-7 lg:col-span-6
              lg:row-start-5 lg:row-span-2
              bg-accent-yellow
              justify-between
              min-h-[200px] lg:min-h-0
            `}
          >
            <p className="font-sans font-bold text-xs uppercase tracking-widest opacity-60">
              Connect with Me
            </p>
            <div>
              <p className="font-sans font-black text-3xl md:text-4xl leading-none tracking-tighter">
                Let's work
                <br />
                together.
              </p>
              <p className="font-sans text-sm opacity-60 mt-2">
                Open to internships, freelance & collabs
              </p>
            </div>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-2 font-sans font-bold text-sm uppercase tracking-widest cursor-pointer group w-fit bg-transparent border-none p-0"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
