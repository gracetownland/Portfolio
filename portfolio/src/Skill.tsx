import React from "react";

interface SkillProps {
  icon: string;
  name: string;
  borderColor: string;
}

const Skill: React.FC<SkillProps> = ({ icon, name, borderColor }) => {
  return (
    <div
      className={`flex items-center space-x-2 px-4 py-2 border-2 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${borderColor}`}
    >
      <img src={icon} alt={name} className="w-6 h-6 transition-transform duration-300 hover:rotate-12" />
      <span className="font-bold transition-colors duration-300 hover:text-orange-500">
        {name}
      </span>
    </div>
  );
};

export default Skill;