import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import "./index.css"; // Add styling

const App: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default App;