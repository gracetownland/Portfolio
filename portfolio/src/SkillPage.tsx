import React from "react";
import Skill from "./Skill";
import githubIcon from "./assets/github.png";
import davinciIcon from "./assets/davinci.png";
import jsIcon from "./assets/javascript.png";
import reactIcon from "./assets/react.png";
import swiftIcon from "./assets/swift.png";

const SkillPage: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 space-y-12">
      <h1 className="text-3xl font-bold text-left w-full max-w-6xl">Skills</h1>

      <div className="grid grid-cols-6 gap-4 w-full max-w-6xl">
        {/* First Column (GitHub) */}
        <Skill icon={githubIcon} name="GitHub" borderColor="border-gray-300" />
        <Skill icon={jsIcon} name="JavaScript" borderColor="border-yellow-400" />
       <Skill icon={githubIcon} name="TypeScript" borderColor="border-gray-300" />
       <Skill icon={githubIcon} name="C++" borderColor="border-gray-300" />
       <Skill icon={githubIcon} name="C" borderColor="border-gray-300" />
       <Skill icon={githubIcon} name="Java" borderColor="border-gray-300" />
        {/* Second Column (DaVinci Resolve) */}
        <Skill icon={davinciIcon} name="DaVinci Resolve" borderColor="border-blue-400" />




        {/* Third Column (JavaScript) */}


        {/* Fourth Column (React) */}
        <Skill icon={reactIcon} name="React" borderColor="border-blue-300" />


        {/* Fifth Column (Swift) */}
        <Skill icon={swiftIcon} name="Swift" borderColor="border-red-500" />

      </div>
    </section>
  );
};

export default SkillPage;