import React from "react";
import aboutImage from "./assets/aboutMe.jpg"; // Ensure the image is in the assets folder
import bannerImage from "./assets/banner.jpg"; // Ensure the image is in the assets folder

const AboutMe: React.FC = () => {
  return (
    <section className="w-screen">
      {/* Full-width Banner Image (Bottom 75% Visible) */}
      <div className="w-full">
        <img
          src={bannerImage}
          alt="About Me Banner"
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* Content Section with Image on the Right */}
      <div className="flex flex-col md:flex-row w-full px-6 md:px-12 lg:px-24 py-8 items-center">
        {/* Text Content (Left) */}
        <div className="md:w-2/3 text-left text-lg text-gray-900 leading-relaxed">
          <h1 className="text-4xl font-bold mb-6">About Me</h1>

          <h2 className="font-semibold">Hello :)</h2>
          <p className="mt-2">
            I'm <a href="https://youtu.be/RPrXxYBZO9c?si=4Llpl_TbwSKgxX-X&t=14" className="text-amber-500">Ayush</a>.<br />
            I'm a third-year Computer Science major at UBC. I'm originally from Bangalore, India.
          </p>

          <h2 className="font-semibold mt-4">What I love</h2>
          <p className="mt-2">
            I love solving puzzles. I love the feeling of accomplishment when I solve a problem that I've been stuck on for a while.
            I also deeply enjoy playing the guitar and riding motorcycles. <br />
            I make videos from time to time. You can check them out <a href="https://www.youtube.com/@gracetownland" className="text-blue-500">here</a>.
          </p>
        </div>

        {/* Image (Right) */}
        <div className="md:w-1/3 flex justify-center">
          <img
            src={aboutImage}
            alt="Ayush"
            className="w-128 h-128 object-cover rounded-lg shadow-lg transition-transform duration-400 ease-in-out hover:scale-103 animate-float"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;