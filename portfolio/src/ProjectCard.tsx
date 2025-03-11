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
      className="flex flex-col space-y-2 group cursor-pointer transition-all duration-300"
    >
      <div
        className="w-full h-100 rounded-lg transition-transform duration-300 transform group-hover:scale-105 group-hover:shadow-lg bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "contain", // Ensures the image doesn't stretch but stays centered
        }}
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