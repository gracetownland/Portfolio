import React from "react";
import heroImage1 from "./assets/hero_section1.jpeg";
import heroImage2 from "./assets/hero_section2.jpeg";

const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="grid grid-cols-3 gap-6 items-center w-full max-w-6xl">
        {/* Left Image */}
        <div className="flex justify-center">
          <img
            src={heroImage2}
            alt="Left Image"
            className="w-56 h-56 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Name & Location */}
        <div className="text-center">
          <h1 className="text-8xl font-extrabold text-[#0A0A0A] leading-none">AYUSH</h1>
          <p className="text-sm font-bold mt-4 text-[#0A0A0A] uppercase tracking-wide">
            VANCOUVER, CANADA <br /> 49.2820° N, 123.1171° W
          </p>
          <h1 className="text-8xl font-extrabold text-[#0A0A0A] leading-none mt-4">
            SRIHARI
          </h1>
         <h2 className=" text-[#0A0A0A]">🏗️ site under construction  🚧</h2>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src={heroImage1}
            alt="Right Image"
            className="w-56 h-56 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;