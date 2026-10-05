import React from "react";
import SectionTitle from "./SectionTitle";

interface ExperienceItem {
  company: string;
  role: string;
  duration?: string;
  location?: string;
  highlights?: string[];
  technologies?: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: "Rivian",
    role: "Software Engineering Intern",
  },
  {
    company: "AWS Cloud Innovation Centre @ UBC",
    role: "Software Developer Intern",
    duration: "Sept 2025 – Aug 2026",
    location: "Vancouver, BC",
    highlights: [
      "Led end-to-end development of open-source GenAI applications for **3+ sponsor teams**, facilitating stakeholder meetings and mentoring juniors on clean code.",
      "Engineered a pre-warming strategy with Provisioned Concurrency and connection pooling, reducing Lambda cold starts **from 2 mins to sub-second** and cutting database costs by **60%**.",
      "Automated deployments via a standardized AWS CI/CD pipeline (CodeBuild, CodePipeline, ECR) with multi-stage Docker builds, reducing deployment latency by **90%**.",
      "Optimized serverless environments by lazy loading heavy Python dependencies and decoupling core logic, minimizing container image sizes and initialization overhead.",
      "Represented the CIC at BCNET Connect 2026, delivering technical workshops and project showcases to **800+ EdTech professionals**.",
    ],
    technologies: ["AWS CDK", "Lambda", "ECS", "Bedrock", "Docker", "PostgreSQL", "CI/CD", "WebSocket"],
  },
  {
    company: "Coast Capital Savings",
    role: "Project Manager & Developer",
    duration: "Jan 2025 – May 2025",
    location: "Vancouver, BC",
    highlights: [
      "Led a team of **8 developers** to deliver a full-stack document management platform for mortgage applications, managing sprint planning, code reviews, and stakeholder communication.",
      "Architected a serverless OCR pipeline using AWS Textract and OpenCV to extract structured fields and barcodes from multi-format documents (PDF, Image, DOCX).",
      "Built a React + TypeScript frontend with JWT-based session management via AWS Cognito and role-based access control to secure sensitive financial data.",
      "Deployed **10+ AWS Lambda functions** behind API Gateway, storing metadata in Aurora Serverless RDS and raw files across dedicated S3 buckets.",
    ],
    technologies: ["React", "TypeScript", "AWS Textract", "Cognito", "Lambda", "Aurora RDS", "S3", "OpenCV"],
  },
];

// `**text**` marks the numbers a skimmer should catch.
const renderHighlight = (text: string): React.ReactNode[] =>
  text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-ink bg-accent-soft px-0.5">
        {part}
      </strong>
    ) : (
      part
    )
  );

const ExperienceSection: React.FC = () => {
  return (
    <section className="w-full text-ink px-6 md:px-12 lg:px-24 py-20 md:py-28">
      <div className="max-w-6xl mx-auto space-y-12">
        <SectionTitle>Experience</SectionTitle>

        <div className="divide-y divide-orange-200 border-y border-orange-200">
          {experiences.map((exp, index) => (
            <div key={index} className="grid md:grid-cols-[12rem_1fr] gap-x-10 gap-y-3 py-8">
              {/* When and where */}
              <div className="text-sm text-gray-600 md:pt-1.5">
                {exp.duration && <p className="font-semibold text-ink">{exp.duration}</p>}
                {exp.location && <p>{exp.location}</p>}
              </div>

              <div className="space-y-4">
                {/* Role */}
                <div>
                  <h3 className="flex items-center gap-3 text-2xl font-extrabold">
                    {index === 0 && (
                      <span aria-hidden="true" className="inline-block w-3 h-3 rounded-full bg-accent flex-shrink-0" />
                    )}
                    {exp.role}
                  </h3>
                  <p className="text-lg font-medium text-gray-700">{exp.company}</p>
                </div>

                {/* Highlights */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-3 max-w-3xl">
                    {exp.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="flex items-start text-base leading-relaxed text-gray-800">
                        <span aria-hidden="true" className="inline-block w-1.5 h-1.5 bg-gray-400 mt-2.5 mr-3 flex-shrink-0" />
                        <span>{renderHighlight(highlight)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Technologies */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {exp.technologies.map((tech, tIndex) => (
                      <span key={tIndex} className="px-2.5 py-1 bg-white border border-orange-200 text-gray-800 text-xs font-medium rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
