---
name: Ayush Srihari Portfolio
description: A calm white single-page portfolio where orange is only ever a highlight.
colors:
  ink: "#171717"
  accent: "#f97316"
  accent-deep: "#c2410c"
  accent-soft: "#ffedd5"
  paper: "#ffffff"
  paper-warm: "#fffaf4"
  paper-glow: "#ffefdc"
  hairline: "#fed7aa"
  tag-fill: "#ffedd5"
  text-body: "#374151"
  text-muted: "#4b5563"
  bullet-gray: "#9ca3af"
  field-border: "#d1d5db"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(3.75rem, 8vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Bricolage Grotesque, system-ui, -apple-system, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.33
  body:
    fontFamily: "Bricolage Grotesque, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Bricolage Grotesque, system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.33
rounded:
  tag: "6px"
  field: "8px"
  image: "12px"
  portrait: "16px"
  hero-card: "24px"
  pill: "9999px"
spacing:
  gutter: "24px"
  gutter-md: "48px"
  gutter-lg: "96px"
  section: "112px"
  stack: "12px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  tag-skill:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.field}"
    padding: "6px 12px"
  tag-project:
    backgroundColor: "{colors.tag-fill}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tag}"
    padding: "4px 10px"
  input-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "10px 16px"
  hero-card:
    backgroundColor: "{colors.ink}"
    rounded: "{rounded.hero-card}"
---

# Design System: Ayush Srihari Portfolio

## Overview

**Creative North Star: "The Highlighter on White Paper"**

A white page with near-black ink, and orange used the way a highlighter is used: a short rule under a section title, a dot beside the role, a marker stripe behind a key number, one primary button. Everything else is ink, white and gray. Headings are large and tightly set in Bricolage Grotesque; structure comes from hairlines and whitespace, not boxes. The page is a single scroll, so one gradient (white at the top, faint orange warmth by the bottom) is the only atmosphere.

The earlier all-orange fields direction was rejected by the owner as ugly; orange stays a minority mark. The motorcycle identity shows through the bikes photo in the hero card and the cursor, not through ornament. Dense project and experience copy is made skimmable by the highlighted numbers.

**Key Characteristics:**
- White ground, ink text, orange only as a small mark.
- Big, tight, extra-bold Bricolage headings; plain body copy in gray-700/800.
- Hairline dividers (orange-200) between rows; no card boxes around content.
- Pill buttons; rounded image cards; small rounded tags.
- Flat: no shadows; depth is a blurred sticky nav and one rounded dark hero card.
- Thumbnails grayscale until hover.

## Colors

Near-black ink and white do the work; a single orange family appears in small, deliberate doses.

### Primary
- **Highlighter Orange** (accent, #f97316): section-title rule, role dot, primary pill buttons, hover underlines, focus ring on inputs. Always carries ink text (about 6.5:1), never white text, never small orange text on white.
- **Burnt Orange** (accent-deep, #c2410c): the only orange safe for small text on white (about 5.2:1). Used for project subtitles, validation errors, nav and footer link hover, and the global focus outline.
- **Marker Peach** (accent-soft, #ffedd5): the marker stripe behind bolded key numbers and the hover wash on underlined links. Also the fill of project tags (tag-fill).

### Neutral
- **Ink** (#171717): all headings, nav, outline buttons, the hero card backing, the hover state of every pill.
- **Paper** (#ffffff, gradient stops #fffaf4 at 40% and #ffefdc at 100%): page ground and the single body gradient; tags, fields and the sticky nav (80% white) sit on it as white.
- **Hairline Peach** (#fed7aa, Tailwind orange-200): the divider and tag/skill chip border. Warm, but a line, not a fill.
- **Body Gray** (#374151 / #4b5563 and gray-700/800 for copy and captions): secondary text. Bullets are gray (#9ca3af), never orange.
- **Field Gray** (#d1d5db): input borders at rest.

### Named Rules
**The Highlighter Rule.** Orange is a mark, not a field. It may be a rule, a dot, a stripe behind a number, a primary button, or a deep-orange subtitle. It never fills a section, a card, or a bullet.
**The Ink-on-Orange Rule.** Text on #f97316 is ink. Orange text on white is #c2410c only.

## Typography

**Display / Body Font:** Bricolage Grotesque (variable, opsz 12..96, wght 400..800, Google Fonts) with system-ui, -apple-system, sans-serif. Optical sizing is automatic.

**Character:** One family at contrasting weights. Extra-bold, tight headings against regular copy give personality without a second face.

### Hierarchy
- **Display** (800, 3.75rem mobile / 6rem desktop, 0.92, -0.025em): the hero name only.
- **Headline** (800, 2.25rem / 3.75rem, 1, -0.025em): section titles via the shared SectionTitle, always followed by the orange rule.
- **Title** (800, 1.5rem to 1.875rem): role and project names; 1.125rem to 1.25rem for card and sub-section titles.
- **Body** (400, 1rem to 1.25rem, relaxed 1.625): paragraphs and bullets; copy blocks capped around max-w-2xl/3xl.
- **Label** (500 to 600, 0.75rem to 0.875rem): tags, dates, nav links, form labels.

### Named Rules
**The One Family Rule.** No second typeface. Hierarchy comes from weight (800 vs 400/500/600) and size.
**The Skim Rule.** Key numbers in bulleted copy are bolded (600, ink) on the Marker Peach stripe; nothing else is highlighted this way.

## Layout

Single page with anchor sections in order Hero, About, Experience, Projects, Skills, Contact, Footer. Content sits in a max-w-6xl column with gutters of 24px, 48px (md) and 96px (lg); sections breathe with 80px (mobile) to 112px (md) vertical padding and 48px between header and content. The hero text column is max-w-3xl; the hero photo is the one element wider than the column (max-w-[88rem]) and is shown at its natural proportion, uncropped. Rows use a 12rem label column plus content (Experience, Skills), a 2/5 + 3/5 split (Projects), and an image + text split (About). Anchored sections use scroll-mt-20 under the sticky nav. Collapse to a single column below md/lg.

## Elevation & Depth

Flat. There are no box-shadows anywhere. Depth is conveyed by the sticky nav (white at 80% with a backdrop blur), the dark rounded hero card against the white page, and hover colour inversion.

### Named Rules
**The Flat Rule.** Surfaces are flat; state is shown by colour inversion, underline colour, or grayscale removal, not by shadow.

## Shapes

Soft and round, in a clear size order: pill (9999px) for buttons and the nav monogram; 24px for the hero card; 16px for the portrait; 12px for project thumbnails; 8px for fields and skill chips; 6px for project tags. Rules are 1px hairlines; the section-title rule is a square-ended 4px by 56px bar. List bullets are 6px gray squares. Fixed focus is a 2px #c2410c outline with 3px offset.

## Components

### Buttons
- **Shape:** full pill (9999px), 12px 24px, bold.
- **Primary:** Highlighter Orange fill, ink text (Get in Touch, Send). The only orange-filled controls.
- **Outline:** 2px ink border, ink text (GitHub, LinkedIn).
- **Hover / Focus:** both invert to ink fill with white text over 200ms; keyboard focus shows the 2px burnt-orange outline. Disabled drops to 50% opacity.

### Navigation
Sticky, translucent white with backdrop blur. An ink circular "AS" monogram (turns orange with ink text on hover) at left, semibold 14px links at right; hover is burnt-orange text with a 2px orange underline offset 8px. Below md, a hamburger opens a white list with a gray top border.

### Section Title
Headline in ink plus a 56px orange bar beneath. The only orange mark in each section header.

### Rows and Dividers
Experience, Projects and Skills are lists divided by hairline peach rules (top, bottom and between), not cards. Experience rows pair a date/location column with the role; the current role carries a 12px orange dot.

### Tags / Chips
Skill chips: white fill, hairline border, 8px radius, 14px gray-800 text. Experience tech tags: same fill and border at 6px radius, 12px text. Project tags: Marker Peach fill, ink text, 6px radius.

### Project Thumbnails
Image cards in a three-column grid: a 176px-tall 12px-radius frame, pale orange backing, image contained and grayscale until hover (300ms filter transition); title underline turns orange on hover.

### Inputs / Fields
White, 1px gray border, 8px radius, 10px 16px padding, gray-500 placeholders. Focus: 2px orange ring and ink border. Error: burnt-orange border and burnt-orange semibold message beneath.

### Links
Inline links are semibold ink with a 2px orange underline (offset 4px) that gains a Marker Peach wash on hover; the Contact links are larger (1.5 to 1.875rem, extra-bold, 4px underline).

### Signature: MotorcycleCursor (protected)
On fine-pointer hover devices the native cursor is hidden and replaced by a 40px motorcycle image that faces its direction of travel and leans up to 30 degrees. It only appears after the first mouse move, so touch devices never show it. Protected delight feature; do not remove or tone down.


## Do's and Don'ts

### Do:
- **Do** keep orange to a rule, a dot, a marker stripe on key numbers, primary buttons, and burnt-orange subtitles.
- **Do** set text on #f97316 in ink, and small orange text on white in #c2410c.
- **Do** separate content with hairline peach rules and whitespace rather than boxes.
- **Do** keep bullets gray and thumbnails grayscale until hover.
- **Do** keep the hero photo at its natural wide proportion in the rounded card.
- **Do** respect prefers-reduced-motion for any new animation, and keep touch and keyboard paths for every control since the native cursor is hidden.

### Don't:
- **Don't** fill sections, cards or bullets with orange, or revive the all-orange papercut direction.
- **Don't** add shadows.
- **Don't** introduce a second typeface.
- **Don't** reintroduce the growing-vines canvas or Konami mode; both were removed deliberately.
- **Don't** use white text on #f97316 or #f97316 for small text on white.
- **Don't** invent metrics or proof in copy (see PRODUCT.md).

Not canonized (defects the build carries): the Tailwind default orange-100/200 and gray-700/800 are used for tag fills, hairlines and copy rather than named tokens in index.css. Future surfaces should use inline SVG for any icons and the named colours above.
