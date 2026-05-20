import AboutSection from "../sections/AboutSection";
import CodingStats from "../sections/CodingStats";
import Experience from "../sections/Experience";
import HeroSection from "../sections/HeroSection";
import SkillsSection from "../sections/SkillsSection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <CodingStats />
      <Experience />
    </>
  );
};

export default HomePage;
