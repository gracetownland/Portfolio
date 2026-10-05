import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import SectionTitle from "./SectionTitle";

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-2.5 bg-white text-ink rounded-lg border ${
    hasError ? "border-accent-deep" : "border-gray-300"
  } placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-ink`;

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
    <section className="w-full text-ink px-6 md:px-12 lg:px-24 py-20 md:py-28">
      <div className="max-w-6xl mx-auto space-y-12">
        <SectionTitle>Get in Touch</SectionTitle>

        <div className="grid lg:grid-cols-[minmax(0,36rem)_1fr] gap-x-20 gap-y-12">
        <div>
          <p className="text-gray-700 mb-8">
            Have a project in mind or want to chat? Drop me a message.
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="contact-name" className="block text-sm font-semibold text-ink mb-1">
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
                <p id="contact-name-error" className="text-accent-deep font-semibold text-sm mt-1">
                  Name is required
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" className="block text-sm font-semibold text-ink mb-1">
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
                <p id="contact-email-error" className="text-accent-deep font-semibold text-sm mt-1">
                  Enter a valid email
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className="block text-sm font-semibold text-ink mb-1">
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
                <p id="contact-message-error" className="text-accent-deep font-semibold text-sm mt-1">
                  Message is required
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={sending}
              className="px-8 py-3 text-base font-bold text-ink bg-accent rounded-full hover:bg-ink hover:text-white disabled:opacity-50 transition-colors duration-200"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>

            {/* Live status: announced to screen readers, no blocking dialog */}
            <div aria-live="polite" className="min-h-6 text-sm">
              {sent && <p className="font-semibold text-ink">Message sent. Thanks, I'll get back to you soon.</p>}
              {sendFailed && (
                <p role="alert" className="text-accent-deep font-semibold">
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

        {/* Direct links, given room to breathe */}
        <ul className="space-y-4 lg:pt-9 text-2xl md:text-3xl font-extrabold">
          {[
            { label: "Mail", href: "mailto:speak2ayushsrihari@gmail.com" },
            { label: "GitHub", href: "https://github.com/gracetownland" },
            { label: "LinkedIn", href: "https://linkedin.com/in/ayush-s-7b500b1a1" },
          ].map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="underline decoration-accent decoration-4 underline-offset-8 hover:bg-accent-soft"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
