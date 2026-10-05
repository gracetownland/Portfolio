import React from "react";
import SectionTitle from "./SectionTitle";

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "Java", "C/C++", "SQL", "Swift", "Bash"],
  },
  {
    title: "Cloud & Infrastructure",
    skills: ["AWS CDK", "Lambda", "ECS Fargate", "Bedrock", "Glue", "RDS/Aurora", "S3", "Cognito", "Textract", "Docker", "CI/CD (CodePipeline)", "Linux"],
  },
  {
    title: "Frameworks & Libraries",
    skills: ["React", "Node.js", "Express", "FastAPI", "LangChain", "Tailwind CSS", "Bootstrap"],
  },
  {
    title: "Data & AI",
    skills: ["PostgreSQL", "pgvector", "MongoDB", "RAG Pipelines", "Cohere Embeddings", "OpenAI Whisper"],
  },
  {
    title: "Tools",
    skills: ["Git/GitHub", "Postman", "Figma", "VS Code", "DaVinci Resolve", "OpenAPI"],
  },
];

const SkillPage: React.FC = () => {
  return (
    <section className="w-full text-ink px-6 md:px-12 lg:px-24 py-20 md:py-28">
      <div className="max-w-6xl mx-auto space-y-12">
        <SectionTitle>Skills</SectionTitle>

        <dl className="divide-y divide-orange-200 border-y border-orange-200">
          {skillCategories.map((category, index) => (
            <div key={index} className="grid md:grid-cols-[12rem_1fr] gap-x-8 gap-y-3 py-5">
              <dt className="text-sm font-bold text-ink">{category.title}</dt>
              <dd className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIndex) => (
                  <span key={sIndex} className="px-3 py-1.5 bg-white border border-orange-200 text-gray-800 text-sm font-medium rounded-lg">
                    {skill}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default SkillPage;
