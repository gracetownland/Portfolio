import React from "react";
import bannerImg from "./assets/banner.jpg";

const HeroSection: React.FC = () => {
  return (
    <section className="w-full pt-10 md:pt-14 pb-14 md:pb-20">
      {/* Intro: type on white, aligned with the sections below */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.92] text-ink text-balance">
            Ayush
            <br />
            Srihari
          </h1>

          <p className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-ink">
            <span aria-hidden="true" className="inline-block w-3 h-3 rounded-full bg-accent" />
            Software Engineering Intern @ Rivian
          </p>

          <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-gray-700">
            I build production-grade full-stack and serverless systems. Previously a Software Developer Intern at the{" "}
            <span className="font-semibold text-ink">AWS Cloud Innovation Centre @ UBC</span>,
            where I shipped open-source tools for education.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-accent text-ink font-bold hover:bg-ink hover:text-white transition-colors duration-200"
            >
              Get in Touch
            </a>
            <a
              href="https://github.com/gracetownland"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border-2 border-ink text-ink font-bold hover:bg-ink hover:text-white transition-colors duration-200"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/ayush-s-7b500b1a1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border-2 border-ink text-ink font-bold hover:bg-ink hover:text-white transition-colors duration-200"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Hero card: the bikes, wide and barely cropped, wider than the text column */}
      <div className="max-w-[88rem] mx-auto px-3 md:px-6 mt-10 md:mt-12">
        <div className="overflow-hidden rounded-3xl bg-ink">
          <img
            src={bannerImg}
            alt="Two motorcycles parked side by side on a hillside road: a cruiser and an adventure tourer"
            className="block w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
