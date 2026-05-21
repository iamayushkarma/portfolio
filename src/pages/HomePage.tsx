import AboutSection from "../sections/AboutSection";
import CodingStats from "../components/ui/coding-stats";
import ContactSection from "../sections/ContactSection";
import Experience from "../sections/Experience";
import HeroSection from "../sections/HeroSection";
import ProjectsSection from "../sections/ProjectSection";
import SkillsSection from "../sections/SkillsSection";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <CodingStats />
      <Experience />
      <ProjectsSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
