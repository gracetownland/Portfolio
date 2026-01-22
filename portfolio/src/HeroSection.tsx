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
          className={`inline-block transition-all duration-300 ${hoverIndex === index ? "text-orange-500 scale-125" : "text-[#0A0A0A]"
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

interface HeroFlipCardProps {
  image: string;
  alt: string;
  backContent: string;
}

const HeroFlipCard: React.FC<HeroFlipCardProps> = ({ image, alt, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`hero-flip-card w-128 h-128 ${isFlipped ? "flipped" : ""}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="hero-flip-card-inner w-full h-full">
        <div className="hero-flip-card-front">
          <img
            src={image}
            alt={alt}
            className="w-full h-full object-cover shadow-lg"
          />
        </div>
        <div className="hero-flip-card-back shadow-lg">
          <div className="flex flex-col items-center justify-center gap-3">
            <span className="text-4xl">✨</span>
            <p className="text-lg font-semibold leading-relaxed">{backContent}</p>
            <span className="text-xs opacity-75 mt-2">Click to flip back</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSection: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center w-screen h-screen bg-gray-100 p-6 space-y-12 ">

      {/* First Row: AYUSH + Image */}
      <div className="flex w-full max-w-full items-center overflow-hidden m-0">
        {/* AYUSH (Left - 2/3 of the space) */}
        <div className="flex-[2] text-left">
          <h1
            className="font-extrabold text-[#0A0A0A] leading-none whitespace-nowrap tracking-[20px]"
            style={{ fontSize: "clamp(140px, 16vw, 240px)" }} // Slightly increased size
          >
            <HoverText text="AYUSH" />
          </h1>
        </div>
        {/* Right Image (1/3 of the space) */}
        <div className="flex-[1] flex justify-end">
          <HeroFlipCard
            image={heroImage1}
            alt="Right Image"
            backContent="Coffee enthusiast ☕ and code craftsman by day"
          />
        </div>
      </div>

      {/* Middle Section: Vancouver, Canada */}
      <div className="flex justify-center w-full m-0">
        <p className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wide text-center">
          VANCOUVER, CANADA <br /> 49.2820° N, 123.1171° W
        </p>
      </div>

      {/* Second Row: Image + SRIHARI */}
      <div className="flex w-full max-w-full items-center overflow-hidden">
        {/* Left Image (1/3 of the space) */}
        <div className="flex-[1] flex justify-start">
          <HeroFlipCard
            image={heroImage2}
            alt="Left Image"
            backContent="Adventure seeker 🏔️ and creative problem solver"
          />
        </div>
        {/* SRIHARI (Right - 2/3 of the space) */}
        <div className="flex-[2] text-right">
          <h1
            className="font-extrabold text-[#0A0A0A] leading-none whitespace-nowrap tracking-[20px]"
            style={{ fontSize: "clamp(140px, 16vw, 240px)" }}
          >
            <HoverText text="SRIHARI" />
          </h1>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center scroll-indicator">
        <span className="text-xs text-gray-500 mb-2">Scroll to explore</span>
        <svg
          className="w-6 h-6 text-gray-400"
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