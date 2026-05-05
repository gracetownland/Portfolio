import React, { useState } from "react";
import emailjs from "@emailjs/browser";

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

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: formData.name.trim() === "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      message: formData.message.trim() === "",
    };

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email && !newErrors.message) {
      setSending(true);
      emailjs
        .send(
          "service_847fqhn",
          "template_uotq7cj",
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
          "WlyfmaU-3df4UeAfb"
        )
        .then(
          () => {
            setSent(true);
            setSending(false);
            setFormData({ name: "", email: "", message: "" });
            setTimeout(() => setSent(false), 4000);
          },
          (error) => {
            console.error("Email send failed:", error);
            setSending(false);
            alert("Failed to send message. Please try again.");
          }
        );
    }
  };

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-16">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
        <p className="text-gray-500 mb-8">
          Have a project in mind or want to chat? Drop me a message.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.name ? "border-red-400" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent transition`}
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">Name is required</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.email ? "border-red-400" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent transition`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">Enter a valid email</p>}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.message ? "border-red-400" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent transition resize-none`}
              placeholder="What's on your mind?"
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">Message is required</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={sending}
            className="w-full py-3 text-base font-semibold text-white bg-[#0A0A0A] rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors duration-200"
          >
            {sending ? "Sending..." : sent ? "Sent! ✓" : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactMe;
