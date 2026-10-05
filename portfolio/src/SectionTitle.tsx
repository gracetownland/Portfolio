import React from "react";

// A plain, large title with a short orange rule: the one orange mark in each section's header.
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>
    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none text-ink">{children}</h2>
    <div aria-hidden="true" className="mt-4 h-1 w-14 bg-accent" />
  </div>
);

export default SectionTitle;
