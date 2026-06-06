import { motion, type Transition } from "motion/react";
import { navLinks, socials } from "../../data/footer.data";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, ease: "easeOut", delay } as Transition,
});

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-dark border-t-4 md:border-t-[6px] border-accent-blue text-cream font-sans">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-x-16 gap-y-10 px-6 md:px-12 pt-14 pb-8">
        {/* Brand */}
        <motion.div {...fadeUp(0.06)}>
          <h2 className="font-sans text-3xl font-bold tracking-tight mb-4 flex items-end gap-[2px]">
            AYUSH KARMA
          </h2>
          <p className="text-sm text-muted leading-[1.85] max-w-xs font-light">
            Full Stack Developer passionate about
            <br />
            building scalable products and
            <br />
            growing through every line of code.
          </p>
          <div className="mt-5 space-y-[5px]">
            <p className="text-xs text-muted/60 font-light">
              ayushkarma.dev@gmail.com
            </p>
            <p className="text-xs text-muted/60 font-light">
              +91 74688 19111 · Indore, MP
            </p>
          </div>
        </motion.div>

        {/* Routes */}
        <motion.div {...fadeUp(0.15)} className="min-w-[160px]">
          <p className="text-xs font-medium text-accent-blue uppercase tracking-[0.12em] mb-5">
            Routes
          </p>
          <hr className="border-cream/10 mb-5" />
          <ul className="space-y-[10px]">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`text-sm font-light transition-colors duration-200 hover:text-cream underline-offset-4 decoration-accent-blue hover:underline ${
                    link.active ? "text-cream" : "text-muted"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Socials */}
        <motion.div {...fadeUp(0.25)} className="min-w-[180px]">
          <p className="text-xs font-medium text-accent-blue uppercase tracking-[0.12em] mb-5">
            Socials
          </p>
          <hr className="border-cream/10 mb-5" />
          <div className="flex items-center gap-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-muted hover:text-cream transition-colors duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div {...fadeUp(0.3)} className="px-6 md:px-12 pb-8">
        <hr className="border-cream/[0.06] mb-5" />
        <p className="text-center text-xs text-muted/50 tracking-[0.1em] font-light">
          © 2026 AYUSH.exe <span className="text-muted/30">//</span> SYSTEM_END
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
