import React from "react";
import ProjectCard from "./ProjectCard";
import urlScannerImg from "./assets/urlScannerImg.png";
import meetPointImg from "./assets/meetpoint.png";
import voiceBuddyImg from "./assets/voicebuddy.png";
import insightUBCImg from "./assets/insightubc.png";
import recipeAppImg from "./assets/recipeapp.png";
import notesAppImg from "./assets/notesapp.png";
import coastCapitalImg from "./assets/coastcapital.png";

const projects = [
  {
    title: "SafeSite",
    description: "Real-time security platform with 10+ concurrent threat checks. nwHacks 2026 - Honourable Mention by 1Password.",
    imageUrl: urlScannerImg,
    link: "https://devpost.com/software/safesite-jldptu?",
    funFact: "🕵️ We scanned over 500 suspicious URLs during the hackathon demo alone! The judges were scared to click their own bookmarks after our presentation."
  },
  {
    title: "Meet.Point",
    description: "Gamified check-in platform using geofencing and real-time streaming. NwHacks 2025 Stream.place Prize Winner.",
    imageUrl: meetPointImg,
    link: "https://devpost.com/software/meet-point",
    funFact: "📍 We almost missed our own demo because we were too busy testing the geofencing feature across campus at 3 AM!"
  },
  {
    title: "Voice Buddy",
    description: "Fluency tool using OpenAI Whisper API to sync and highlight YouTube transcripts. HackCamp 2024 Best Hack for Social Good.",
    imageUrl: voiceBuddyImg,
    link: "https://devpost.com/software/voice-buddy",
    funFact: "🎤 The idea came from trying to learn song lyrics on YouTube and failing miserably at karaoke night. Now I'm slightly less embarrassing!"
  },
  {
    title: "UBC Classroom and Course Finder",
    description: "Web app for locating UBC courses and rooms with Google Maps integration. Built in CPSC 310.",
    imageUrl: insightUBCImg,
    link: "https://www.youtube.com/watch?v=G9npJh7CKtE",
    funFact: "🏫 This project helped me finally stop getting lost to my own classes. Over 200+ test cases later, I can confidently find any room on campus!"
  },
  {
    title: "Recipe Finder App",
    description: "Full-stack recipe logger with Oracle SQL, Express, and dynamic JS frontend.",
    imageUrl: recipeAppImg,
    link: "https://github.com/gracetownland/project_o8i5n_p1o1s_u1k2m",
    funFact: "🍳 Built this after burning my third attempt at making pasta. The app doesn't cook for you, but at least you'll have good recipes!"
  },
  {
    title: "Full-Stack Notes App",
    description: "Apple Notes clone built in Swift/SwiftUI and Node.js with real-time sync and MongoDB.",
    imageUrl: notesAppImg,
    link: "https://github.com/gracetownland/Note-App",
    funFact: "📝 I coded this entire app using the notes I stored in... the app itself. Very meta. Very confusing when I had bugs."
  },
  {
    title: "OCR-powered Document Processor",
    description: "Automated mortgage document parsing using AWS Textract, Lambda, and RDS. Delivered for Coast Capital via CPSC 319.",
    imageUrl: coastCapitalImg,
    link: "https://github.com/gracetownland",
    funFact: "📄 Our team processed over 1000 test documents. I can now read mortgage papers in my sleep (I don't recommend it)."
  }
];

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="w-full px-6 md:px-12 lg:px-24 py-12">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        <span className="text-sm text-gray-500 animate-pulse">Click any image to reveal a fun fact!</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;