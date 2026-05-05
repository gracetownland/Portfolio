import React from "react";
import GrowingVines from "./GrowingVines";

const HeroSection: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-[85vh] bg-gray-100 px-6 py-24 overflow-hidden">
      <GrowingVines />

      <div className="relative z-10 max-w-3xl text-center space-y-6">
        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#0A0A0A]">
          Ayush Srihari
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl font-medium text-gray-600">
          Cloud &amp; AI Engineer · Full-Stack Developer
        </p>

        {/* Brief pitch */}
        <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          I build production-grade serverless systems and GenAI applications on AWS.
          Currently a Software Developer Intern at the{" "}
          <span className="text-[#0A0A0A] font-semibold">AWS Cloud Innovation Centre @ UBC</span>,
          shipping open-source AI tools for education.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <a
            href="#contact"
            className="px-6 py-3 bg-[#0A0A0A] text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            Get in Touch
          </a>
          <a
            href="https://github.com/gracetownland"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border-2 border-[#0A0A0A] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#0A0A0A] hover:text-white transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/ayush-s-7b500b1a1"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border-2 border-[#0A0A0A] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#0A0A0A] hover:text-white transition-colors duration-200"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center scroll-indicator">
        <span className="text-xs text-gray-400 mb-2">Scroll to explore</span>
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
