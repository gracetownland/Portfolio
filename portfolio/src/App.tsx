import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AboutMe from "./AboutMe";
import SkillPage from "./SkillPage";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectSection";
import ContactMe from "./ContactMe";
import MotorcycleCursor from "./MotorcycleCursor";

const App: React.FC = () => {
  return (
    <div className="min-h-screen scroll-smooth text-ink">
      <MotorcycleCursor />
      <Navbar />
      <HeroSection />

      <div id="experience" className="scroll-mt-20">
        <ExperienceSection />
      </div>

      <div id="projects" className="scroll-mt-20">
        <ProjectsSection />
      </div>

      <div id="skills" className="scroll-mt-20">
        <SkillPage />
      </div>

      <div id="about" className="scroll-mt-20">
        <AboutMe />
      </div>

      <div id="contact" className="scroll-mt-20">
        <ContactMe />
      </div>
    </div>
  );
};

export default App;
