import React from "react";

const AboutMe: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto p-8">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">About Me</h1>
      
      {/* Content */}
      <div className="text-left text-lg text-gray-900 leading-relaxed">
        <h2 className="font-semibold">What is Lorem Ipsum?</h2>
        <p className="mt-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop publishing software
          like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        
        <h2 className="font-semibold mt-4">Why do we use it?</h2>
        <p className="mt-2">
          It is a long established fact that a reader will be distracted by the readable content
          of a page when looking at its layout. The point of using Lorem Ipsum is that it has
          a more-or-less normal distribution of letters, as opposed to using 'Content here, content here',
          making it look like readable English.
        </p>
        
        <p className="mt-2">
          Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,
          and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved
          over the years, sometimes by accident, sometimes on purpose bruh momentum why are you still reading this.
        </p>
      </div>
    </section>
  );
};

export default AboutMe;
