import React from "react";
import awsCicImg from "./assets/awscic.jpg";

interface ExperienceItem {
    company: string;
    role: string;
    duration: string;
    imageUrl: string;
    highlights: string[];
    technologies: string[];
}

const experiences: ExperienceItem[] = [
    {
        company: "AWS Cloud Innovation Centre, UBC",
        role: "Full Stack Developer",
        duration: "Sept 2025 – Present",
        imageUrl: awsCicImg,
        highlights: [
            "Legal Aid Platform: Enhanced security by implementing frontend validation, upgrading PostgreSQL RDS, and migrating Lambda functions to Node.js 22, reducing vulnerabilities by 85%.",
            "OER-AI Platform: Architected RAG-based generative AI educational system with 50+ RESTful API endpoints, Lambda handlers for WebSocket streaming, and PostgreSQL with pgvector extension across 25+ tables.",
            "Built Dockerized Lambda integrating Amazon Bedrock (Llama 3 70B) to generate practice materials using RAG-based embeddings, reducing content creation time by 90%.",
            "Performance Optimization: Reduced loading times from 2+ minutes to sub-second responses via multi-stage deployments and lazy loading.",
            "Engineered DynamoDB-backed caching and migrated REST APIs to WebSocket-based implementation for real-time streaming."
        ],
        technologies: ["AWS Lambda", "PostgreSQL", "Bedrock", "WebSocket", "Docker", "DynamoDB", "Node.js"]
    }
];

const ExperienceSection: React.FC = () => {
    return (
        <section className="w-full px-6 md:px-12 lg:px-24 py-12">
            <h2 className="text-2xl font-bold mb-8">Technical Experience</h2>
            <div className="space-y-8">
                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                    >
                        <div className="flex flex-col md:flex-row">
                            {/* Image/Logo Section */}
                            <div className="md:w-1/3 bg-gradient-to-br from-orange-50 to-blue-50 p-8 flex items-center justify-center">
                                <div className="relative w-full max-w-[280px]">
                                    <img
                                        src={exp.imageUrl}
                                        alt={exp.company}
                                        className="w-full h-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="md:w-2/3 p-6 md:p-8">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {exp.role}
                                        </h3>
                                        <p className="text-lg text-gray-600 font-medium">{exp.company}</p>
                                    </div>
                                    <span className="mt-2 md:mt-0 inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                                        {exp.duration}
                                    </span>
                                </div>

                                {/* Highlights */}
                                <ul className="space-y-3 mb-6">
                                    {exp.highlights.map((highlight, hIndex) => (
                                        <li key={hIndex} className="flex items-start text-sm text-gray-700">
                                            <span className="inline-block w-2 h-2 bg-orange-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech, tIndex) => (
                                        <span
                                            key={tIndex}
                                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-full transition-colors"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ExperienceSection;
