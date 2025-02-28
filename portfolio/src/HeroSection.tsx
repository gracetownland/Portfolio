import React from "react";
import heroImage1 from "./assets/hero_section1.jpeg";
import heroImage2 from "./assets/hero_section2.jpeg";

const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 space-y-12">
      {/* First Row: "AYUSH" (2/3) + Right Image (1/3) */}
      <div className="grid grid-cols-3 items-center w-full max-w-6xl">
        {/* AYUSH (Takes 2/3 of the parent div) */}
        <div className="col-span-2 text-left">
          <h1 className="text-8xl font-extrabold text-[#0A0A0A] leading-none">
            AYUSH
          </h1>
          <p className="text-sm font-bold mt-4 text-[#0A0A0A] uppercase tracking-wide">
            VANCOUVER, CANADA <br /> 49.2820° N, 123.1171° W
          </p>
        </div>

        {/* Right Image (Takes 1/3 of the parent div) */}
        <div className="flex justify-end">
          <img
            src={heroImage1}
            alt="Right Image"
            className="w-64 h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Second Row: Left Image (1/3) + "SRIHARI" (2/3) */}
      <div className="grid grid-cols-3 items-center w-full max-w-6xl">
        {/* Left Image (Takes 1/3 of the parent div) */}
        <div className="flex justify-start">
          <img
            src={heroImage2}
            alt="Left Image"
            className="w-64 h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* SRIHARI (Takes 2/3 of the parent div) */}
        <div className="col-span-2 text-right">
          <h1 className="text-8xl font-extrabold text-[#0A0A0A] leading-none">
            SRIHARI
          </h1>
          <h2 className="text-[#0A0A0A] mt-4">🏗️ site under construction 🚧</h2>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;