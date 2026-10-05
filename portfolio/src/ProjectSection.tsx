import React from "react";
import ProjectCard from "./ProjectCard";
import SectionTitle from "./SectionTitle";
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

// Featured work: rows on hairlines, the pitch beside the evidence.
const FeaturedProjectRow: React.FC<{ project: FeaturedProject }> = ({ project }) => (
  <article className="grid lg:grid-cols-5 gap-x-10 gap-y-6 py-10 first:pt-0">
    <div className="lg:col-span-2 space-y-3">
      <div>
        <h3 className="text-3xl font-extrabold">{project.title}</h3>
        <p className="text-base font-semibold text-accent-deep mt-1">{project.subtitle}</p>
      </div>

      <p className="leading-relaxed text-gray-700">{project.description}</p>

      <div className="flex flex-wrap gap-2 pt-1">
        {project.technologies.map((tech, i) => (
          <span key={i} className="px-2.5 py-1 bg-orange-100 text-ink text-xs font-medium rounded-md">
            {tech}
          </span>
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-semibold underline decoration-accent decoration-2 underline-offset-4 hover:bg-accent-soft"
        >
          View Project
        </a>
      )}
    </div>

    <ul className="lg:col-span-3 space-y-3">
      {project.highlights.map((h, i) => (
        <li key={i} className="flex items-start text-base leading-relaxed text-gray-800">
          <span aria-hidden="true" className="inline-block w-1.5 h-1.5 bg-gray-400 mt-2.5 mr-3 flex-shrink-0" />
          <span>{h}</span>
        </li>
      ))}
    </ul>
  </article>
);

const ProjectsSection: React.FC = () => {
  return (
    <section className="w-full text-ink px-6 md:px-12 lg:px-24 py-20 md:py-28">
      <div className="max-w-6xl mx-auto space-y-12">
        <SectionTitle>Projects</SectionTitle>

        <div className="space-y-16">
          <div>
            <p className="text-lg text-gray-700 mb-8 max-w-xl">Production-grade systems I've architected and shipped.</p>
            <div className="divide-y divide-orange-200 border-y border-orange-200 pt-10">
              {featuredProjects.map((project, index) => (
                <FeaturedProjectRow key={index} project={project} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-extrabold mb-6">Hackathons &amp; Other Work</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
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
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
