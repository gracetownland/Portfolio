import React from "react";

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  location: string;
  highlights: string[];
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: "AWS Cloud Innovation Centre @ UBC",
    role: "Software Developer Intern",
    duration: "Sept 2025 – Present",
    location: "Vancouver, BC",
    highlights: [
      "Led end-to-end development of open-source GenAI applications for 3+ sponsor teams, facilitating stakeholder meetings and mentoring juniors on clean code.",
      "Engineered a pre-warming strategy with Provisioned Concurrency and connection pooling, reducing Lambda cold starts from 2 mins to sub-second and cutting database costs by 60%.",
      "Automated deployments via a standardized AWS CI/CD pipeline (CodeBuild, CodePipeline, ECR) with multi-stage Docker builds, reducing deployment latency by 90%.",
      "Optimized serverless environments by lazy loading heavy Python dependencies and decoupling core logic, minimizing container image sizes and initialization overhead.",
      "Represented the CIC at BCNET Connect 2026, delivering technical workshops and project showcases to 800+ EdTech professionals.",
    ],
    technologies: ["AWS CDK", "Lambda", "ECS", "Bedrock", "Docker", "PostgreSQL", "CI/CD", "WebSocket"],
  },
  {
    company: "Coast Capital Savings",
    role: "Project Manager & Developer",
    duration: "Jan 2025 – May 2025",
    location: "Vancouver, BC",
    highlights: [
      "Led a team of 8 developers to deliver a full-stack document management platform for mortgage applications, managing sprint planning, code reviews, and stakeholder communication.",
      "Architected a serverless OCR pipeline using AWS Textract and OpenCV to extract structured fields and barcodes from multi-format documents (PDF, Image, DOCX).",
      "Built a React + TypeScript frontend with JWT-based session management via AWS Cognito and role-based access control to secure sensitive financial data.",
      "Deployed 10+ AWS Lambda functions behind API Gateway, storing metadata in Aurora Serverless RDS and raw files across dedicated S3 buckets.",
    ],
    technologies: ["React", "TypeScript", "AWS Textract", "Cognito", "Lambda", "Aurora RDS", "S3", "OpenCV"],
  },
];

const ExperienceSection: React.FC = () => {
  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Experience</h2>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative pl-6 border-l-2 border-gray-200 hover:border-[#0A0A0A] transition-colors duration-300"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#0A0A0A] border-2 border-white" />

              <div className="space-y-3">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
                  <div>
                    <h3 className="text-xl font-bold text-[#0A0A0A]">{exp.role}</h3>
                    <p className="text-base text-gray-600 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {exp.duration} · {exp.location}
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, hIndex) => (
                    <li key={hIndex} className="flex items-start text-sm text-gray-700 leading-relaxed">
                      <span className="inline-block w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.technologies.map((tech, tIndex) => (
                    <span
                      key={tIndex}
                      className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
