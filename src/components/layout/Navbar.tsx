import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import NavLogo from "../../assets/logo/nav_logo_256.png";
import { NavLinkData } from "../../data/navbar.data";
import Button from "../ui/Button";

interface NavLink {
  href: string;
  label: string;
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.header
      className="w-full bg-white border-b-2 border-ink fixed top-0 left-0 z-[99999]"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="px-6 h-14 md:h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="w-8 md:w-9 cursor-pointer">
            <img src={NavLogo} alt="nav-bar-logo" />
          </div>
        </motion.a>

        {/* Desktop Nav */}
        <motion.div
          className="hidden md:flex gap-4 bg-white border-2 border-black p-2 shadow-brutal"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <ul className="flex flex-row items-center">
            {NavLinkData.map((link: NavLink, index: number) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.07, duration: 0.3 }}
                className="list-none flex items-center px-3 h-6 font-mono font-bold text-sm hover:bg-black hover:text-white transition-colors cursor-pointer"
              >
                <a href={link.href}>/{link.label}</a>
              </motion.li>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.3 }}
              className="px-3 ml-3 py-1 font-mono hover:text-white font-bold text-sm border border-black transition-colors cursor-pointer hover:bg-accent-blue"
            >
              contact
            </motion.a>
          </ul>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.div
          className="flex md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Button
            onClick={() => setMenuOpen((prev) => !prev)}
            label={menuOpen ? "CLOSE" : "MENU"}
          />
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden fixed top-14 left-0 w-full z-[999999] border-t-2 border-ink bg-cream"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ul className="flex flex-col">
              {NavLinkData.map((link: NavLink, index: number) => (
                <motion.li
                  key={link.href}
                  className="border-b-2 border-ink"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.25 }}
                >
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block px-6 py-4 font-mono font-bold text-sm hover:bg-accent-yellow transition-colors"
                  >
                    /{link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                className="border-b-2 border-ink"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: NavLinkData.length * 0.06,
                  duration: 0.25,
                }}
              >
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="block px-6 py-4 font-mono font-bold text-sm bg-accent-blue text-white hover:opacity-90 transition-opacity"
                >
                  CONTACT →
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
