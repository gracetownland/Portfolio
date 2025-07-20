import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 flex justify-center space-x-10 py-4 text-black font-bold bg-gray-100 shadow">
      <a href="#about" className="hover:underline">about</a>
      <a href="#projects" className="hover:underline">projects</a>
      <a href="#contact" className="hover:underline">contact</a>
    </nav>
  );
};

export default Navbar;