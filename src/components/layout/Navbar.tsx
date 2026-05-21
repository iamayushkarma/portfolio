import { useEffect, useState } from "react";
import NavLogo from "../../assets/logo/nav_logo_256.png";
import { NavLinkData } from "../../data/navbar.data";
import Button from "../ui/Button";

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
    <header className="w-full bg-white">
      {/* Main nav row */}
      <div className="px-6 h-14 md:h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/">
          <div className="w-8.5 md:w-12 cursor-pointer">
            <img src={NavLogo} alt="nav-bar-logo" />
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-4 bg-white border-2 border-black p-2 shadow-brutal">
          <ul className="flex flex-row items-center">
            {NavLinkData.map((link) => (
              <li
                key={link.href}
                className="list-none flex items-center px-3 h-6 font-mono font-bold text-sm hover:bg-black hover:text-white transition-colors cursor-pointer"
              >
                <a href={link.href}>/{link.label}</a>
              </li>
            ))}
            <button className="px-3 ml-3 py-1 font-mono font-bold text-sm border border-black transition-colors cursor-pointer hover:bg-accent-blue">
              <a href="#contact">contact</a>
            </button>
          </ul>
        </div>

        {/* Hamburger only on mobile */}
        <div className="flex md:hidden">
          <Button
            onClick={() => setMenuOpen((prev) => !prev)}
            label={menuOpen ? "CLOSE" : "MENU"}
          />
        </div>
      </div>

      {/* Mobile menu — fixed so it escapes the sticky wrapper's stacking context */}
      {menuOpen && (
        <div className="md:hidden fixed top-14 left-0 w-full z-[999999] border-t-2 border-ink bg-cream">
          <ul className="flex flex-col">
            {NavLinkData.map((link) => (
              <li key={link.href} className="border-b-2 border-ink">
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block px-6 py-4 font-mono font-bold text-sm hover:bg-accent-yellow transition-colors"
                >
                  /{link.label}
                </a>
              </li>
            ))}
            <li className="border-b-black border-b-2">
              <a
                href="#contact"
                onClick={closeMenu}
                className="block px-6 py-4 font-mono font-bold text-sm bg-accent-yellow hover:opacity-90 transition-opacity"
              >
                HIRE ME →
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;
