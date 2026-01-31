import React from "react";
import Skill from "./Skill";
import githubIcon from "./assets/github.png";
import davinciIcon from "./assets/davinci.png";
import jsIcon from "./assets/javascript.png";
import reactIcon from "./assets/react.png";
import swiftIcon from "./assets/swift.png";
import tsIcon from "./assets/typescript.png";
import cppIcon from "./assets/cpp.png";
import cIcon from "./assets/c.png";
import javaIcon from "./assets/java.png";
import pythonIcon from "./assets/python.png";
import htmlIcon from "./assets/html.png";
import cssIcon from "./assets/css.png";
import sqlIcon from "./assets/sql.png";
import nodeIcon from "./assets/nodejs.png";
import expressIcon from "./assets/express.png";
import mongoIcon from "./assets/mongodb.png";
import awsIcon from "./assets/aws.png";
import figmaIcon from "./assets/figma.png";
import linuxIcon from "./assets/linux.png";
import postmanIcon from "./assets/postman.png";
import bashIcon from "./assets/bash.png";
import bootstrapIcon from "./assets/bootstrap.png";
import tailwindIcon from "./assets/tailwind.png";
import vscodeIcon from "./assets/vscode.png";

const SkillPage: React.FC = () => {
  return (
    <section className="flex flex-col items-start justify-center min-h-screen bg-gray-100 px-6 md:px-12 lg:px-24 py-12 space-y-12">
      <h1 className="text-3xl font-bold text-left w-full">Skills</h1>

      <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-4 w-full">
        {/* Programming Languages */}
        <Skill icon={jsIcon} name="JavaScript" borderColor="border-yellow-400" />
        <Skill icon={tsIcon} name="TypeScript" borderColor="border-blue-400" />
        <Skill icon={pythonIcon} name="Python" borderColor="border-yellow-200" />
        <Skill icon={cppIcon} name="C++" borderColor="border-gray-300" />
        <Skill icon={cIcon} name="C" borderColor="border-gray-300" />
        <Skill icon={javaIcon} name="Java" borderColor="border-orange-600" />
        <Skill icon={swiftIcon} name="Swift" borderColor="border-red-500" />
        <Skill icon={htmlIcon} name="HTML" borderColor="border-pink-400" />
        <Skill icon={cssIcon} name="CSS" borderColor="border-blue-300" />
        <Skill icon={sqlIcon} name="SQL" borderColor="border-green-500" />
        <Skill icon={bashIcon} name="Bash" borderColor="border-gray-500" />

        {/* Frameworks and Libraries */}
        <Skill icon={reactIcon} name="React" borderColor="border-blue-300" />
        <Skill icon={nodeIcon} name="Node.js" borderColor="border-green-500" />
        <Skill icon={expressIcon} name="Express.js" borderColor="border-gray-500" />
        <Skill icon={bootstrapIcon} name="Bootstrap" borderColor="border-purple-500" />
        <Skill icon={tailwindIcon} name="Tailwind" borderColor="border-cyan-400" />
        <Skill icon={githubIcon} name="GitHub" borderColor="border-gray-300" />

        {/* Databases */}
        <Skill icon={mongoIcon} name="MongoDB" borderColor="border-green-600" />
        <Skill icon={awsIcon} name="Amazon RDS" borderColor="border-yellow-500" />
        <Skill icon={awsIcon} name="Aurora" borderColor="border-yellow-500" />

        {/* Cloud & DevOps */}
        <Skill icon={awsIcon} name="AWS Lambda" borderColor="border-yellow-500" />
        <Skill icon={awsIcon} name="S3" borderColor="border-yellow-500" />
        <Skill icon={awsIcon} name="Textract" borderColor="border-yellow-500" />
        <Skill icon={awsIcon} name="Cognito" borderColor="border-yellow-500" />
        <Skill icon={linuxIcon} name="Linux" borderColor="border-gray-700" />

        {/* Tools */}
        <Skill icon={figmaIcon} name="Figma" borderColor="border-pink-300" />
        <Skill icon={postmanIcon} name="Postman" borderColor="border-orange-300" />
        <Skill icon={vscodeIcon} name="VS Code" borderColor="border-blue-500" />
        <Skill icon={davinciIcon} name="DaVinci Resolve" borderColor="border-blue-400" />
      </div>
    </section>
  );
};

export default SkillPage;