import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const navLinks = [
  { label: "Home", href: "#", active: true },
  { label: "Works", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    label: "LeetCode",
    href: "https://leetcode.com/iamayushkarma",
    icon: <SiLeetcode size={22} />,
  },
  {
    label: "GitHub",
    href: "https://github.com/iamayushkarma",
    icon: <FaGithub size={22} />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/iamayushkarma",
    icon: <FaLinkedin size={22} />,
  },
  {
    label: "Email",
    href: "mailto:ayushkarma.dev@gmail.com",
    icon: <FaEnvelope size={22} />,
  },
];

export { navLinks, socials };
