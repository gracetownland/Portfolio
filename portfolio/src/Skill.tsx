import React from "react";

interface SkillProps {
  icon: string;
  name: string;
  borderColor: string;
}

const Skill: React.FC<SkillProps> = ({ icon, name, borderColor }) => {
  return (
    <div
      className={`flex items-center space-x-2 px-4 py-2 border-2 rounded-lg shadow-sm ${borderColor}`}
    >
      <img src={icon} alt={name} className="w-6 h-6" />
      <span className="font-bold">{name}</span>
    </div>
  );
};

export default Skill;