import React from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="w-full h-44 overflow-hidden bg-gray-50">
        <div
          className="w-full h-full bg-center bg-no-repeat bg-contain group-hover:scale-105 transition-transform duration-300"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h4 className="text-base font-bold text-[#0A0A0A] group-hover:text-orange-500 transition-colors">
          {title} <span className="text-gray-400 group-hover:text-orange-400">→</span>
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </a>
  );
};

export default ProjectCard;
