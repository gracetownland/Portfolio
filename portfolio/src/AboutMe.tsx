import React from "react";
import aboutImage from "./assets/aboutMe.jpg";
import SectionTitle from "./SectionTitle";

const AboutMe: React.FC = () => {
  return (
    <section className="w-full text-ink px-6 md:px-12 lg:px-24 py-20 md:py-28">
      <div className="max-w-6xl mx-auto space-y-12">
        <SectionTitle>About</SectionTitle>

        <div className="grid md:grid-cols-[18rem_1fr] lg:grid-cols-[22rem_1fr] gap-10 md:gap-16 items-start">
          <img
            src={aboutImage}
            alt="Ayush Srihari"
            className="w-64 md:w-full aspect-[4/5] object-cover rounded-2xl"
          />

          <div className="space-y-5 max-w-2xl">
            <p className="text-lg md:text-xl leading-relaxed">
              I'm a third-year Computer Science student at UBC, originally from Bangalore, India.
              I build full-stack and cloud-native applications, from serverless backends on AWS to
              systems that serve thousands of users. I'm currently a Software Engineering Intern at Rivian.
            </p>

            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              Previously, at the AWS Cloud Innovation Centre, I led end-to-end development of open-source tools for
              sponsor teams, and before that I managed a team of 8 developers at Coast Capital
              Savings to deliver an OCR-powered document management platform.
            </p>

            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              Outside of code, I play guitar, ride motorcycles, and make{" "}
              <a
                href="https://www.youtube.com/@gracetownland"
                className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:bg-accent-soft"
                target="_blank"
                rel="noopener noreferrer"
              >
                videos
              </a>
              .
            </p>

            <dl className="pt-3 space-y-1 text-sm md:text-base text-gray-700">
              <div>
                <dt className="inline font-semibold text-ink">Education: </dt>
                <dd className="inline">B.Sc. Computer Science, UBC — Expected May 2027</dd>
              </div>
              <div>
                <dt className="inline font-semibold text-ink">Coursework: </dt>
                <dd className="inline">Machine Learning, Intro to AI, Networks, Architecture, Software Engineering, Databases</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
