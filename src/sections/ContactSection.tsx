import { useState } from "react";
import { motion, type Transition } from "motion/react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, ease: "easeOut", delay } as Transition,
});

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/xpqnpoqb", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full border-2 border-ink rounded-[2px] px-[11px] py-[9px] font-sans text-[11px] tracking-[0.04em] text-ink bg-cream outline-none placeholder:text-muted focus:shadow-brutal transition-shadow";

  return (
    <section id="contact" className="w-full py-12 px-6 mt-6">
      <div className="mx-auto max-w-[860px]">
        {/* Card */}
        <motion.div
          {...fadeUp(0.05)}
          className="grid grid-cols-1 md:grid-cols-2 rounded-[3px] border-[3px] border-ink bg-cream shadow-[8px_8px_0_var(--color-ink)]"
        >
          {/* LEFT */}
          <motion.div
            {...fadeUp(0.1)}
            className="flex flex-col justify-between p-6 md:p-11 border-b-2 md:border-b-0 md:border-r-2 border-ink"
          >
            <div>
              <h2 className="font-sans font-black uppercase leading-none tracking-[-0.03em] text-ink mb-5 text-[2.7rem] md:text-5xl lg:text-6xl">
                Build
                <br />
                With
                <br />
                Me.
              </h2>
              <p className="font-sans text-[13px] leading-[1.8] text-charcoal">
                I write clean, production ready code and actually care about
                what ships. React · TypeScript · Node.js - full stack, zero
                hand-holding needed.
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-[14px]">
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-[42px] h-[42px] shrink-0 bg-ink rounded-[2px] flex items-center justify-center shadow-brutal">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-cream)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <a
                  href="mailto:ayushkarma.dev@gmail.com"
                  className="font-sans text-[13px] font-semibold text-ink no-underline hover:underline underline-offset-4"
                >
                  ayushkarma.dev@gmail.com
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="w-[42px] h-[42px] shrink-0 bg-ink rounded-[2px] flex items-center justify-center shadow-brutal">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-cream)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className="font-sans text-[13px] font-semibold text-ink">
                  Indore, India
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div {...fadeUp(0.2)} className="flex items-center p-3 md:p-7">
            <div className="w-full border-2 border-ink rounded-[2px] bg-blue-50 p-3 md:p-5 shadow-brutal-b">
              <form onSubmit={handleSubmit} className="flex flex-col gap-0">
                <div className="mb-[13px]">
                  <label className="block font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-muted mb-[5px]">
                    Identity
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="YOUR NAME"
                    className={inputCls}
                  />
                </div>

                <div className="mb-[13px]">
                  <label className="block font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-muted mb-[5px]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="EMAIL ADDRESS"
                    className={inputCls}
                  />
                </div>

                <div className="mb-[13px]">
                  <label className="block font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-muted mb-[5px]">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="ROLE, TEAM, OR JUST HELLO..."
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  className={`w-full rounded-[2px] py-[15px] font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-cream border-2 border-ink cursor-pointer transition-all shadow-brutal hover:shadow-brutal-b active:translate-x-[1px] active:translate-y-[1px] disabled:opacity-60 disabled:cursor-not-allowed mt-[2px] ${
                    status === "sent"
                      ? "bg-accent-green !text-ink"
                      : "bg-accent-blue"
                  }`}
                >
                  {status === "sending"
                    ? "Sending..."
                    : status === "sent"
                      ? "Sent ✓"
                      : "Send Message"}
                </button>

                {status === "error" && (
                  <p className="mt-[9px] font-sans text-[11px] text-red-500">
                    Something went wrong. Email me directly instead.
                  </p>
                )}
                {status === "sent" && (
                  <p className="mt-[9px] font-sans text-[11px] text-ink">
                    Got it. I'll get back to you soon.
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
