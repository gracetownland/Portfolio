import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-2.5 rounded-lg border ${
    hasError ? "border-red-700" : "border-gray-300"
  } focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent transition`;

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
  const [sendFailed, setSendFailed] = useState(false);

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
    setSendFailed(false);

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
            setSendFailed(true);
          }
        );
    }
  };

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-20 md:py-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[12rem_1fr] gap-x-12 gap-y-8">
        <h2 className="text-3xl font-bold self-start lg:sticky lg:top-24">Get in Touch</h2>

        <div className="max-w-xl">
          <p className="text-gray-600 mb-8">
            Have a project in mind or want to chat? Drop me a message.
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={errors.name}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                className={inputClass(errors.name)}
                placeholder="Your name"
              />
              {errors.name && (
                <p id="contact-name-error" className="text-red-700 text-sm mt-1">
                  Name is required
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={errors.email}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                className={inputClass(errors.email)}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p id="contact-email-error" className="text-red-700 text-sm mt-1">
                  Enter a valid email
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                aria-invalid={errors.message}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className={`${inputClass(errors.message)} resize-none`}
                placeholder="What's on your mind?"
              />
              {errors.message && (
                <p id="contact-message-error" className="text-red-700 text-sm mt-1">
                  Message is required
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 text-base font-semibold text-white bg-[#0A0A0A] rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors duration-200"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>

            {/* Live status: announced to screen readers, no blocking dialog */}
            <div aria-live="polite" className="min-h-6 text-sm">
              {sent && <p className="text-gray-700">Message sent. Thanks, I'll get back to you soon.</p>}
              {sendFailed && (
                <p role="alert" className="text-red-700">
                  Couldn't send your message. Please try again, or email{" "}
                  <a
                    href="mailto:speak2ayushsrihari@gmail.com"
                    className="underline underline-offset-4"
                  >
                    speak2ayushsrihari@gmail.com
                  </a>
                  .
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
