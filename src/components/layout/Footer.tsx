import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const navLinks = [
  { label: "Home", href: "#", active: true },
  { label: "Works", href: "#works" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    label: "LeetCode",
    href: "https://leetcode.com/iamayushkarma",
    icon: <SiLeetcode size={20} />,
  },
  {
    label: "GitHub",
    href: "https://github.com/iamayushkarma",
    icon: <FaGithub size={20} />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/iamayushkarma",
    icon: <FaLinkedin size={20} />,
  },
  {
    label: "Email",
    href: "mailto:ayushkarma.dev@gmail.com",
    icon: <FaEnvelope size={20} />,
  },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#121212] font-mono border-t-[3px] border-accent-blue text-[#fffdf5]">
      {/* ── Main 3-col grid ── */}
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-16 px-12 pt-14 pb-8">
        {/* Brand */}
        <div>
          <h2 className="font-sans text-2xl font-bold tracking-tight mb-4 flex items-end gap-[2px]">
            AYUSH KARMA
            <span className="text-accent-blue text-[2rem] leading-none">.</span>
          </h2>

          <p className="text-xs text-[#888] leading-[1.85] max-w-xs font-light">
            Full-stack developer building
            <br />
            production-ready web apps with React,
            <br />
            TypeScript &amp; Node.js. No cookies, no
            <br />
            trackers, just code.
          </p>

          <div className="mt-5 space-y-[5px]">
            <p className="text-[11px] text-[#555] font-light">
              ayushkarma.dev@gmail.com
            </p>
            <p className="text-[11px] text-[#555] font-light">
              +91 74688 19111 · Indore, MP
            </p>
          </div>
        </div>

        {/* Sitemap */}
        <div className="min-w-[160px]">
          <p className="text-[11px] font-medium text-accent-blue uppercase tracking-[0.12em] mb-5">
            Sitemap
          </p>
          <hr className="border-white/10 mb-5" />
          <ul className="space-y-[10px]">
            {navLinks.map((link) => (
              <li key={link.label} className="flex items-center gap-3">
                {link.active && (
                  <span className="size-[10px] rounded-full bg-[#fffdf5] shrink-0" />
                )}
                <a
                  href={link.href}
                  className={`text-sm font-light transition-colors duration-200 hover:text-[#fffdf5] ${
                    link.active ? "text-[#fffdf5]" : "text-[#888]"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div className="min-w-[180px]">
          <p className="text-[11px] font-medium text-accent-blue uppercase tracking-[0.12em] mb-5">
            Socials
          </p>
          <hr className="border-white/10 mb-5" />
          <div className="flex items-center gap-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-[#888] hover:text-[#fffdf5] transition-colors duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="px-12 pb-8">
        <hr className="border-white/[0.06] mb-5" />
        <p className="text-center text-[11px] text-[#555] tracking-[0.1em] font-light">
          © 2025 AYUSH.exe <span className="text-[#444]">//</span> SYSTEM_END
        </p>
      </div>
    </footer>
  );
};

export default Footer;
