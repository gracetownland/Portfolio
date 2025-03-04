import React, { useState } from "react";
import heroImage1 from "./assets/hero_section1.jpeg";
import heroImage2 from "./assets/hero_section2.jpeg";
const HoverText: React.FC<{ text: string }> = ({ text }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <span className="inline-block">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-300 ${
            hoverIndex === index ? "text-orange-500 scale-125" : "text-[#0A0A0A]"
          }`}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 space-y-12">
      <div className="grid grid-cols-3 items-center w-full max-w-6xl">
        <div className="text-left col-span-2">
          <h1 className="text-[180px] font-extrabold text-[#0A0A0A] leading-none">
              <HoverText text="AYUSH" />
          </h1>
        </div>
        <div className="flex justify-end">
          <img
            src={heroImage1}
            alt="Right Image"
            className="w-64 h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="flex justify-center w-full max-w-6xl">
        <p className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wide text-center">
          VANCOUVER, CANADA <br /> 49.2820° N, 123.1171° W
        </p>
      </div>
      <div className="grid grid-cols-3 items-center w-full max-w-6xl">
        <div className="flex justify-start">
          <img
            src={heroImage2}
            alt="Left Image"
            className="w-64 h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="text-right col-span-2">
          <h1 className="text-[180px] font-extrabold text-[#0A0A0A] leading-none">
              <HoverText text="SRIHARI" />
          </h1>
          <h2 className="text-[#0A0A0A] mt-4">🏗️ site under construction 🚧</h2>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;