import React from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl, link }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="group block">
      {/* Image */}
      <div className="w-full h-44 overflow-hidden rounded-xl bg-orange-50">
        <div
          aria-hidden="true"
          className="w-full h-full bg-center bg-no-repeat bg-contain grayscale group-hover:grayscale-0 transition-[filter] duration-300"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </div>

      {/* Caption */}
      <div className="pt-4 space-y-2">
        <h4 className="text-lg font-extrabold text-ink underline decoration-transparent decoration-2 underline-offset-4 group-hover:decoration-accent transition-colors">
          {title}
        </h4>
        <p className="text-sm leading-relaxed text-gray-700">{description}</p>
      </div>
    </a>
  );
};

export default ProjectCard;
