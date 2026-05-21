import AboutSection from "../sections/AboutSection";
import CodingStats from "../components/ui/coding-stats";
import ContactSection from "../sections/ContactSection";
import Experience from "../sections/Experience";
import HeroSection from "../sections/HeroSection";
import ProjectsSection from "../sections/ProjectSection";
import SkillsSection from "../sections/SkillsSection";

const HomePage = () => {
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
