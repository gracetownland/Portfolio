import React, { useState } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AboutMe from "./AboutMe";
import SkillPage from "./SkillPage";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectSection";
import ContactMe from "./ContactMe";
import MotorcycleCursor from "./MotorcycleCursor";
import ScrollToTop from "./ScrollToTop";
import KonamiMode from "./KonamiMode";

const App: React.FC = () => {
  const [konamiActive, setKonamiActive] = useState(false);

  return (
    <div
      className={`min-h-screen scroll-smooth ${
        konamiActive
          ? "konami-shell text-[#d6f1ff]"
          : "bg-gray-50 text-[#0A0A0A]"
      }`}
    >
      <MotorcycleCursor pixelate={konamiActive} />
      <KonamiMode active={konamiActive} onActiveChange={setKonamiActive} />
      <ScrollToTop />
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
      <footer className="w-full py-8 border-t border-gray-200">
        <div className="flex justify-center gap-8 text-sm">
          <a
            href="mailto:speak2ayushsrihari@gmail.com"
            className="text-gray-600 hover:text-[#0A0A0A] transition-colors"
          >
            Mail
          </a>
          <a
            href="https://github.com/gracetownland"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#0A0A0A] transition-colors"
          >
            Github
          </a>
          <a
            href="https://linkedin.com/in/ayush-s-7b500b1a1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#0A0A0A] transition-colors"
          >
            Linkedin
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
