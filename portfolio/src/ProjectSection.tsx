import React from "react";
import ProjectCard from "./ProjectCard";

const projects = [
  { title: "meet.point", description: "HACKATHON WINNER, WEBDEV, PORTFOLIO DEVELOPMENT", bgColor: "bg-red-300", link: "https://devpost.com/software/meet-point" },
  { title: "Voice Buddy", description: "HACKATHON WINNER, WEBDEV, PORTFOLIO DEVELOPMENT", bgColor: "bg-blue-300", link: "https://devpost.com/software/voice-buddy" },
  { title: "Insight UBC", description: "HACKATHON WINNER, WEBDEV, PORTFOLIO DEVELOPMENT", bgColor: "bg-green-300", link: "https://www.youtube.com/watch?v=G9npJh7CKtE" },
  { title: "Full-Stack Notes App", description: "HACKATHON WINNER, WEBDEV, PORTFOLIO DEVELOPMENT", bgColor: "bg-yellow-300", link: "https://github.com/gracetownland/Note-App" }
];

const ProjectsSection: React.FC = () => {
  return (
    <section className="px-6 py-12">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;