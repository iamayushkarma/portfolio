import AboutSection from "../sections/AboutSection";
import CodingStats from "../sections/CodingStats";
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
    </>
  );
};

export default HomePage;
