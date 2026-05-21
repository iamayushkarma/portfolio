import { useEffect, lazy, Suspense } from "react";
import HeroSection from "../sections/HeroSection";

const AboutSection = lazy(() => import("../sections/AboutSection"));
const SkillsSection = lazy(() => import("../sections/SkillsSection"));
const CodingStats = lazy(() => import("../components/ui/coding-stats"));
const Experience = lazy(() => import("../sections/Experience"));
const ProjectsSection = lazy(() => import("../sections/ProjectSection"));
const ContactSection = lazy(() => import("../sections/ContactSection"));

const HomePage = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <HeroSection />
      <Suspense fallback={null}>
        <AboutSection />
        <SkillsSection />
        <CodingStats />
        <Experience />
        <ProjectsSection />
        <ContactSection />
      </Suspense>
    </>
  );
};

export default HomePage;
