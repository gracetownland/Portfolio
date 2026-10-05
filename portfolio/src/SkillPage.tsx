import React from "react";

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
    <section className="w-full px-6 md:px-12 lg:px-24 py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[12rem_1fr] gap-x-12 gap-y-8">
        <h2 className="text-3xl font-bold self-start lg:sticky lg:top-24">Skills</h2>

        <dl className="divide-y divide-gray-200 border-y border-gray-200">
          {skillCategories.map((category, index) => (
            <div key={index} className="grid md:grid-cols-[11rem_1fr] gap-x-8 gap-y-3 py-5">
              <dt className="text-sm font-semibold text-gray-700">{category.title}</dt>
              <dd className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIndex) => (
                  <span
                    key={sIndex}
                    className="px-3 py-1.5 bg-gray-100 text-gray-800 text-sm font-medium rounded-lg"
                  >
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
