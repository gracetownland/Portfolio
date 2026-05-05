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
    <section className="w-full px-6 md:px-12 lg:px-24 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIndex) => (
                  <span
                    key={sIndex}
                    className="px-3 py-1.5 bg-gray-100 text-gray-800 text-sm font-medium rounded-lg hover:bg-[#0A0A0A] hover:text-white transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillPage;
