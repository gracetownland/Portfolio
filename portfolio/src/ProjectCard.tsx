import React from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  bgColor: string;
  link: string; // New prop for project link
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, bgColor, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col space-y-2 group cursor-pointer transition-all duration-300"
    >
      <div
        className={`w-full h-64 ${bgColor} rounded-lg transition-transform duration-300 transform group-hover:scale-105 group-hover:shadow-lg`}
      ></div>
      <p className="text-xs font-semibold uppercase opacity-80 transition-opacity duration-300 group-hover:opacity-100">
        {description}
      </p>
      <h3 className="text-lg font-bold transition-colors duration-300 group-hover:text-blue-500">
        {title}
      </h3>
    </a>
  );
};

export default ProjectCard;