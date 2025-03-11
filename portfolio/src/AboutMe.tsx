import React from "react";

const AboutMe: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto p-8">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">About Me</h1>
      
      {/* Content */}
      <div className="text-left text-lg text-gray-900 leading-relaxed">
        <h2 className="font-semibold">Hello :)</h2>
        <p className="mt-2">
         I'm <a href="https://youtu.be/RPrXxYBZO9c?si=4Llpl_TbwSKgxX-X&t=14"  class = "text-amber-500">Ayush</a>.<br />
         I'm a third-year Computer Science major at UBC. I'm originally from Bangalore, India.
        </p>

        <h2 className="font-semibold mt-4">What I love</h2>
        <p className="mt-2">
         I love solving puzzles. I love the feeling of accomplishment when I solve a problem that I've been stuck on for a while. 
         I also deeply enjoy playing the guitar and riding motorcycles. <br/>
         I make videos from time to time. You can check them out <a href="https://www.youtube.com/@gracetownland" class = "text-blue-500">here</a>.
        </p>

        
      </div>
    </section>
  );
};

export default AboutMe;