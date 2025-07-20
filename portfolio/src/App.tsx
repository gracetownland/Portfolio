import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AboutMe from "./AboutMe";
import SkillPage from "./SkillPage"; 
import ProjectsSection from "./ProjectSection";
import ContactMe from "./ContactMe";
import MotorcycleCursor from "./MotorcycleCursor";
import "./index.css";

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen text-[#0A0A0A] scroll-smooth">
      <MotorcycleCursor />
      <Navbar />
      <HeroSection />

      <div id="about" className="scroll-mt-20">
        <AboutMe />
      </div>


      <div id="skills" className="scroll-mt-20">
        <SkillPage />
      </div>


      <div id="projects" className="scroll-mt-20">
        <ProjectsSection />
      </div>

      <div id="contact" className="scroll-mt-20">
        <ContactMe />
      </div>
    </div>
  );
};

export default App;