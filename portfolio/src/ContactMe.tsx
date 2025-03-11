import React, { useState } from "react";

const ContactMe: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors = {
      name: formData.name.trim() === "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      message: formData.message.trim() === "",
    };

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email && !newErrors.message) {
      alert("Message Sent Successfully! 🚀"); // Placeholder action
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <section className="max-w-2xl mx-auto p-8">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-center hover:text-amber-500 transition duration-300">
        Contact Me
      </h1>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <label className="block text-lg font-semibold text-gray-900">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full mt-1 px-4 py-2 rounded-lg border-2 ${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:ring focus:ring-blue-300 transition`}
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-lg font-semibold text-gray-900">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full mt-1 px-4 py-2 rounded-lg border-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:ring focus:ring-blue-300 transition`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">Enter a valid email</p>}
        </div>

        {/* Message Input */}
        <div>
          <label className="block text-lg font-semibold text-gray-900">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`w-full mt-1 px-4 py-2 rounded-lg border-2 ${
              errors.message ? "border-red-500" : "border-gray-300"
            } focus:ring focus:ring-blue-300 transition`}
            placeholder="Write your message..."
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">Message is required</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-amber-600 transition-transform transform hover:scale-105 shadow-md"
        >
          Send Message
        </button>
      </form>

      {/* Social Links */}
      <div className="mt-8 text-center">
        <p className="text-gray-700 font-semibold">Or reach out via:</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="mailto:speak2ayushsrihari@gmail.com" className="hover:text-amber-500 transition">
            📧 Email
          </a>
          <a href="https://github.com/gracetownland" className="hover:text-amber-800 transition">
            🖥 GitHub
          </a>
          <a href="https://www.linkedin.com/in/ayush-s-7b500b1a1/" className="hover:text-amber-700 transition">
            💼 LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;