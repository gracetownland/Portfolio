import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AboutMe from "./AboutMe";
import SkillPage from "./SkillPage";
import "./index.css"; // Add styling

const App: React.FC = () => {
  return (
    <div className=" bg-gray-100 min-h-screen text-[#0A0A0A]">
      <Navbar />
      <HeroSection />
    <AboutMe />
    <SkillPage />
    </div>
  );
};

export default App;