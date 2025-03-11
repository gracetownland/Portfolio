import React from "react";
import ProjectCard from "./ProjectCard";
import meetPointImg from "./assets/meetpoint.png";
import voiceBuddyImg from "./assets/voicebuddy.png";
import insightUBCImg from "./assets/insightubc.png";
import notesAppImg from "./assets/notesapp.png";

const projects = [
  { title: "meet.point", description: "HACKATHON WINNER, WEBDEV, PORTFOLIO DEVELOPMENT", imageUrl: meetPointImg, link: "https://devpost.com/software/meet-point" },
  { title: "Voice Buddy", description: "HACKATHON WINNER, WEBDEV, PORTFOLIO DEVELOPMENT", imageUrl: voiceBuddyImg, link: "https://devpost.com/software/voice-buddy" },
  { title: "Insight UBC", description: "HACKATHON WINNER, WEBDEV, PORTFOLIO DEVELOPMENT", imageUrl: insightUBCImg, link: "https://www.youtube.com/watch?v=G9npJh7CKtE" },
  { title: "Full-Stack Notes App", description: "HACKATHON WINNER, WEBDEV, PORTFOLIO DEVELOPMENT", imageUrl: notesAppImg, link: "https://github.com/gracetownland/Note-App" }
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