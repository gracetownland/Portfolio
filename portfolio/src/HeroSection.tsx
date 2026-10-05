import React from "react";
import bannerImg from "./assets/banner.jpg";

// Everything in the statement comes from the experience, project and skills copy elsewhere on the page.
const stack = ["TypeScript", "Python", "Java", "React", "AWS"];

const HeroSection: React.FC = () => {
  return (
    <section className="w-full pt-10 md:pt-14 pb-14 md:pb-20">
      {/* Intro: the name and role on the left, the facts as one confident sentence on the right */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-x-14 gap-y-10 items-start">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.92] text-ink text-balance">
              Ayush
              <br />
              Srihari
            </h1>

            <p className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-ink lg:whitespace-nowrap">
              <span aria-hidden="true" className="inline-block w-3 h-3 rounded-full bg-accent" />
              Software Engineering Intern @ Rivian
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="mailto:speak2ayushsrihari@gmail.com"
                className="px-6 py-3 rounded-full bg-accent text-ink font-bold hover:bg-ink hover:text-white transition-colors duration-200"
              >
                Email me
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

          {/* The facts, set as one sentence: ink for what matters, gray for the glue */}
          <div className="lg:pt-3 space-y-6">
            <p className="text-2xl lg:text-[1.65rem] font-semibold leading-snug text-gray-600 text-pretty">
              Fifth-year <span className="text-ink">Computer Science</span> at{" "}
              <span className="text-ink">UBC</span>. Previously at the{" "}
              <span className="text-ink">AWS Cloud Innovation Centre</span> and{" "}
              <span className="text-ink">Coast Capital Savings</span>. Built an AI study companion for{" "}
              <span className="text-ink bg-accent-soft px-1">100,000+ users</span>.
            </p>

            <ul className="flex flex-wrap gap-2" aria-label="Main technologies">
              {stack.map((tech) => (
                <li key={tech} className="px-3 py-1 rounded-md bg-orange-100 text-ink text-sm font-semibold">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Hero card: the bikes, wide and barely cropped, wider than the text column */}
      <div className="max-w-[88rem] mx-auto px-3 md:px-6 mt-12 md:mt-16">
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
