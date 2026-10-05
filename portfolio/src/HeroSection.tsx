import React from "react";
import bannerImg from "./assets/banner.jpg";

const HeroSection: React.FC = () => {
  return (
    <section className="w-full bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="max-w-3xl space-y-6">
          {/* Name */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#0A0A0A] text-balance">
            Ayush Srihari
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl font-medium text-gray-700">
            Software Engineering Intern @ Rivian
          </p>

          {/* Brief pitch */}
          <p className="text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
            I build production-grade full-stack and serverless systems.
            Previously a Software Developer Intern at the{" "}
            <span className="text-[#0A0A0A] font-semibold">AWS Cloud Innovation Centre @ UBC</span>,
            where I shipped open-source tools for education.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
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
      </div>

      {/* Full-bleed ground line: the bikes anchor the hero and lead the eye into About */}
      <img
        src={bannerImg}
        alt="Two motorcycles parked side by side on a hillside road: a cruiser and an adventure tourer"
        className="block w-full h-44 md:h-64 lg:h-80 object-cover object-[50%_65%]"
      />
    </section>
  );
};

export default HeroSection;
