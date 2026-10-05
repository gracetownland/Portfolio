import React from "react";
import aboutImage from "./assets/aboutMe.jpg";

const AboutMe: React.FC = () => {
  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Image */}
        <div className="md:w-1/3 flex justify-center">
          <img
            src={aboutImage}
            alt="Ayush Srihari"
            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Text */}
        <div className="md:w-2/3 space-y-4">
          <h2 className="text-3xl font-bold">About Me</h2>

          <p className="text-gray-700 leading-relaxed">
            I'm a third-year Computer Science student at UBC, originally from Bangalore, India.
            I build full-stack and cloud-native applications, from serverless backends on AWS to
            systems that serve thousands of users. I'm currently a Software Engineering Intern at Rivian.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Previously, at the AWS Cloud Innovation Centre, I led end-to-end development of open-source tools for
            sponsor teams, and before that I managed a team of 8 developers at Coast Capital
            Savings to deliver an OCR-powered document management platform.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Outside of code, I play guitar, ride motorcycles, and make{" "}
            <a
              href="https://www.youtube.com/@gracetownland"
              className="text-blue-700 underline underline-offset-4 hover:text-blue-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              videos
            </a>
            .
          </p>

          <div className="pt-2">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-700">Education:</span> B.Sc. Computer Science, UBC — Expected May 2027
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-700">Coursework:</span> Machine Learning, Intro to AI, Networks, Architecture, Software Engineering, Databases
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
