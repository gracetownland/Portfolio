import React from "react";
import ProjectCard from "./ProjectCard";
import meetPointImg from "./assets/meetpoint.png";
import voiceBuddyImg from "./assets/voicebuddy.png";
import insightUBCImg from "./assets/insightubc.png"; // placeholder for UBC Finder
import recipeAppImg from "./assets/recipeapp.png";   // placeholder for Recipe Finder
import notesAppImg from "./assets/notesapp.png";
import coastCapitalImg from "./assets/coastcapital.png"; // placeholder image for Coast Capital project

const projects = [
  {
    title: "Meet.Point",
    description: "Gamified check-in platform using geofencing and real-time streaming. NwHacks 2025 Stream.place Prize Winner.",
    imageUrl: meetPointImg,
    link: "https://devpost.com/software/meet-point"
  },
  {
    title: "Voice Buddy",
    description: "Fluency tool using OpenAI Whisper API to sync and highlight YouTube transcripts. HackCamp 2024 Best Hack for Social Good.",
    imageUrl: voiceBuddyImg,
    link: "https://devpost.com/software/voice-buddy"
  },
  {
    title: "UBC Classroom and Course Finder",
    description: "Web app for locating UBC courses and rooms with Google Maps integration. Built in CPSC 310.",
    imageUrl: insightUBCImg,
    link: "https://www.youtube.com/watch?v=G9npJh7CKtE"
  },
  {
    title: "Recipe Finder App",
    description: "Full-stack recipe logger with Oracle SQL, Express, and dynamic JS frontend.",
    imageUrl: recipeAppImg,
    link: "https://github.com/gracetownland/project_o8i5n_p1o1s_u1k2m"
  },
  {
    title: "Full-Stack Notes App",
    description: "Apple Notes clone built in Swift/SwiftUI and Node.js with real-time sync and MongoDB.",
    imageUrl: notesAppImg,
    link: "https://github.com/gracetownland/Note-App"
  },
  {
    title: "OCR-powered Document Processor",
    description: "Automated mortgage document parsing using AWS Textract, Lambda, and RDS. Delivered for Coast Capital via CPSC 319.",
    imageUrl: coastCapitalImg,
    link: "https://github.com/gracetownland" 
  }
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