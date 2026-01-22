import React, { useState } from "react";

interface SkillProps {
  icon: string;
  name: string;
  borderColor: string;
}

// Fun messages that appear randomly when you click skills
const funMessages = [
  "Nice choice! 🎯",
  "I love this one! ❤️",
  "Great taste! 👌",
  "This one's fun! 🎉",
  "A personal favorite! ⭐",
  "Good eye! 👁️",
  "Excellent pick! 🏆",
  "You know good tech! 🧠",
];

const Skill: React.FC<SkillProps> = ({ icon, name, borderColor }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [message, setMessage] = useState("");
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    // Easter egg: special message on 5th click
    if (newCount >= 5) {
      setMessage("Wow, you really like " + name + "! 🤯");
    } else {
      const randomMessage = funMessages[Math.floor(Math.random() * funMessages.length)];
      setMessage(randomMessage);
    }

    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 1500);
  };

  return (
    <div className="relative">
      <div
        onClick={handleClick}
        className={`flex items-center space-x-2 px-4 py-2 border-2 rounded-lg shadow-sm cursor-pointer
          transition-all duration-300 transform hover:scale-110 hover:shadow-xl hover:-rotate-2
          ${borderColor} ${isClicked ? "animate-bounce bg-gradient-to-r from-yellow-100 to-orange-100" : "bg-white"}`}
      >
        <img
          src={icon}
          alt={name}
          className={`w-6 h-6 transition-transform duration-300 ${isClicked ? "animate-spin" : "hover:rotate-12"}`}
        />
        <span className="font-bold transition-colors duration-300 hover:text-orange-500">
          {name}
        </span>
      </div>

      {/* Pop-up message */}
      {isClicked && (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap animate-fade-in z-10 shadow-lg">
          {message}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default Skill;