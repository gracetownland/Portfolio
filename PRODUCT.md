# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Two equal audiences: recruiters/hiring managers, who skim for about a minute, and fellow developers/collaborators, who dig into projects and the GitHub. The site has to serve a quick skim and a deeper dive. Visitors should understand who Ayush Srihari is and what they've built within a minute of scrolling, and the next step for either audience is to get in touch or explore the work.

## Product Purpose
A personal portfolio for Ayush Srihari (GitHub: `gracetownland`) that showcases skills, experience, projects, and journey. It is a hobby project built in free time ("to just showcase my skills and my journey"), so personality matters as much as polish. Success is a visitor who remembers Ayush and reaches out or explores further.

## Positioning
Motorcycles plus code. The motorcycle identity is a real part of who Ayush is and anchors the site's personality (custom MotorcycleCursor, motorcycle imagery), alongside hand-built delight and concrete, metric-driven project copy.

## Operating Context
Single-page site with anchor navigation, in order: Hero, Experience, Projects, Skills, About, Contact (the last section; it also holds the Mail / GitHub / LinkedIn links). Contact form sends email through EmailJS; there is no backend.

## Capabilities and Constraints
- Static, client-rendered React + Vite + Tailwind site. No backend, auth, CMS, or database. No router, state library, or test framework unless asked (from existing project docs).
- Existing delight features: MotorcycleCursor. Dropped by Ayush: the growing-vines hero canvas, Konami mode and the ScrollToTop rocket. The visual direction is white with orange used only as highlights, with the bikes photo in a wide hero card.
- Current role: Software Engineering Intern at Rivian. Only the title is public for now; do not add details, team, or tech beyond that. The site must not describe Ayush as an "AI Engineer" or "Cloud Engineer".
- Featured projects get detailed cards; other projects use image cards with an external link.

## Brand Commitments
- The delight features above are core to the brand and must not be removed or toned down without asking (stated in the project's CLAUDE.md, written by Ayush; not re-confirmed in this interview).
- Project and experience copy stays concrete and metric-driven (latency, scale, user counts).

## Evidence on Hand
Real project and experience content and the images in `portfolio/src/assets/` (project screenshots, tech logos, hero/about/banner images, motorcycle photo). Not available, and not to be assumed: a resume PDF, new photography, or any other asset beyond what's in the repo. Never fabricate metrics, testimonials, clients, or project claims; use only real content already in the repo or supplied by Ayush.

## Product Principles
- Personality is a feature: it matters as much as polish.
- Show real work with concrete numbers; never invent proof.
- Serve the one-minute skim and the deeper dive equally.
- Keep it simple and static: no backend, no heavy dependencies.

## Accessibility & Inclusion
The custom cursor hides the native one globally, so interactive elements must stay usable by touch and keyboard. New animation must respect `prefers-reduced-motion`.
