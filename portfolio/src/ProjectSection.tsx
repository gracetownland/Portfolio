import React from "react";
import ProjectCard from "./ProjectCard";
import urlScannerImg from "./assets/urlScannerImg.png";
import meetPointImg from "./assets/meetpoint.png";
import voiceBuddyImg from "./assets/voicebuddy.png";
import insightUBCImg from "./assets/insightubc.png";
import coastCapitalImg from "./assets/coastcapital.png";

interface FeaturedProject {
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  highlights: string[];
  link?: string;
}

const featuredProjects: FeaturedProject[] = [
  {
    title: "GenRx",
    subtitle: "AI Simulation Platform",
    description:
      "Multi-tenant AI platform for clinical departments, enabling voice-to-voice patient simulations with automated pedagogical debriefing.",
    technologies: ["AWS CDK", "Bedrock", "LangChain", "ECS Fargate", "pgvector", "WebSocket"],
    highlights: [
      "5,000+ vector embeddings with sub-100ms retrieval latency via LangChain RAG pipelines",
      "Voice-to-voice interface on ECS Fargate using Amazon Nova Sonic 2 with sub-200ms round-trip latency",
      "Automated debriefing module that assesses interactions against clinical rubrics with instant LLM grading",
    ],
  },
  {
    title: "OpenED",
    subtitle: "AI Study Companion",
    description:
      "Cloud-native AI companion sponsored by BCcampus, enabling 100,000+ users to streamline learning with RAG-powered content retrieval.",
    technologies: ["AWS CDK", "Bedrock", "Glue", "Lambda", "LangChain", "Docker", "pgvector"],
    highlights: [
      "ETL pipelines processing 200+ textbooks, generating embeddings via Cohere Embed v4 for sub-second retrieval across 100,000+ chunks",
      "WebSocket progress streaming with semantic caching to minimize LLM API overhead",
      "Deployed with Amplify frontend serving 100,000+ users",
    ],
  },
];

interface OtherProject {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  technologies: string[];
}

const otherProjects: OtherProject[] = [
  {
    title: "SafeSite",
    description: "Real-time security platform with 10+ concurrent threat checks. nwHacks 2026 — Honourable Mention by 1Password.",
    imageUrl: urlScannerImg,
    link: "https://devpost.com/software/safesite-jldptu",
    technologies: ["React", "Node.js", "Security APIs"],
  },
  {
    title: "Meet.Point",
    description: "Gamified check-in platform using geofencing and real-time streaming. nwHacks 2025 — Stream.place Prize Winner.",
    imageUrl: meetPointImg,
    link: "https://devpost.com/software/meet-point",
    technologies: ["React", "Geolocation", "WebSocket"],
  },
  {
    title: "Voice Buddy",
    description: "Fluency tool using OpenAI Whisper API to sync and highlight YouTube transcripts. HackCamp 2024 — Best Hack for Social Good.",
    imageUrl: voiceBuddyImg,
    link: "https://devpost.com/software/voice-buddy",
    technologies: ["OpenAI Whisper", "React", "YouTube API"],
  },
  {
    title: "UBC Classroom Finder",
    description: "Web app for locating UBC courses and rooms with Google Maps integration. Built in CPSC 310.",
    imageUrl: insightUBCImg,
    link: "https://www.youtube.com/watch?v=G9npJh7CKtE",
    technologies: ["TypeScript", "Express", "REST API"],
  },
  {
    title: "OCR Document Processor",
    description: "Automated mortgage document parsing using AWS Textract, Lambda, and RDS. Delivered for Coast Capital via CPSC 319.",
    imageUrl: coastCapitalImg,
    link: "https://github.com/gracetownland",
    technologies: ["AWS Textract", "Lambda", "Aurora RDS"],
  },
];

const FeaturedProjectCard: React.FC<{ project: FeaturedProject; index: number }> = ({ project, index }) => (
  <div className={`p-6 md:p-8 rounded-2xl border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300 ${index === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}>
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-orange-500 uppercase tracking-wide">{project.subtitle}</p>
        <h3 className="text-2xl font-bold text-[#0A0A0A] mt-1">{project.title}</h3>
      </div>

      <p className="text-gray-600 leading-relaxed">{project.description}</p>

      <ul className="space-y-2">
        {project.highlights.map((h, i) => (
          <li key={i} className="flex items-start text-sm text-gray-700">
            <span className="inline-block w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 mr-2.5 flex-shrink-0" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 pt-2">
        {project.technologies.map((tech, i) => (
          <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
            {tech}
          </span>
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm font-medium text-blue-500 hover:underline mt-2"
        >
          View Project →
        </a>
      )}
    </div>
  </div>
);

const ProjectsSection: React.FC = () => {
  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Projects</h2>

        {/* Featured Projects */}
        <p className="text-gray-500 mb-8">Production-grade systems I've architected and shipped.</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* Other Projects */}
        <h3 className="text-xl font-bold mb-6 text-gray-700">Hackathons & Other Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              link={project.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
