import React, { useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  funFact?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl, link, funFact }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (funFact) {
      e.preventDefault();
      setIsFlipped(!isFlipped);
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* Flip Card Container */}
      <div
        className="relative w-full h-64 cursor-pointer group"
        style={{ perspective: "1000px" }}
        onClick={handleClick}
      >
        <div
          className="relative w-full h-full transition-transform duration-700 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front Side - Image */}
          <div
            className="absolute w-full h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div
              className="w-full h-full bg-center bg-no-repeat bg-contain bg-gray-50 group-hover:scale-105 transition-transform duration-300"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            {/* Hover hint */}
            {funFact && (
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click to flip! 🔄
              </div>
            )}
          </div>

          {/* Back Side - Fun Fact */}
          <div
            className="absolute w-full h-full rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 flex flex-col justify-center items-center text-white"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="text-4xl mb-4">💡</div>
            <p className="text-center text-sm md:text-base font-medium leading-relaxed">
              {funFact || "No fun fact yet!"}
            </p>
            <div className="mt-4 text-xs opacity-75">Click to flip back</div>
          </div>
        </div>
      </div>

      {/* Title and Description (always visible) */}
      <p className="text-xs font-semibold uppercase opacity-80">
        {description}
      </p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleLinkClick}
        className="text-lg font-bold hover:text-blue-500 transition-colors duration-300"
      >
        {title} →
      </a>
    </div>
  );
};

export default ProjectCard;