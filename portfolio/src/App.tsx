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

      <div id="about" className="scroll-mt-20">
        <AboutMe />
      </div>

      <div id="experience" className="scroll-mt-20">
        <ExperienceSection />
      </div>

      <div id="projects" className="scroll-mt-20">
        <ProjectsSection />
      </div>

      <div id="skills" className="scroll-mt-20">
        <SkillPage />
      </div>

      <div id="contact" className="scroll-mt-20">
        <ContactMe />
      </div>

      {/* Footer */}
      <footer className="w-full text-ink px-6 md:px-12 lg:px-24 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm">
          <p className="font-bold">Ayush Srihari</p>
          <div className="flex gap-8">
            <a
              href="mailto:speak2ayushsrihari@gmail.com"
              className="font-semibold text-gray-700 hover:text-accent-deep underline decoration-transparent hover:decoration-accent decoration-2 underline-offset-4 transition-colors"
            >
              Mail
            </a>
            <a
              href="https://github.com/gracetownland"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gray-700 hover:text-accent-deep underline decoration-transparent hover:decoration-accent decoration-2 underline-offset-4 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/ayush-s-7b500b1a1"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gray-700 hover:text-accent-deep underline decoration-transparent hover:decoration-accent decoration-2 underline-offset-4 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
