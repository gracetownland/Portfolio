---
target: the whole portfolio site
total_score: 19
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:/Users/ayushsrihari/Desktop/Portfolio/portfolio/src/App.tsx"
target_fingerprint: "sha256:ac5d30e93b49a189c28f9f9df37db60b8121b9ac5da6c480ff88fe44bb6bcb00"
target_path: /Users/ayushsrihari/Desktop/Portfolio/portfolio/src/App.tsx
timestamp: 2026-10-05T02-37-59Z
slug: portfolio-src-app-tsx
closed: true
---
Method: dual-agent. Score 19/32 (n/a: 7, 10). Acceptable.

Design specificity: mostly template-grade; personality lives in overlays (cursor, Konami, rocket), not composition. Detector: 5 slop findings (Inter x2 = one issue, bounce easing x2, grid background advisory).

Priority issues:
- [P0] GrowingVines never imported; hero vines don't render. -> polish
- [P1] Flagship projects (GenRx, OpenED) have no links; Other Work drops technologies; OCR link is profile root. -> clarify
- [P1] Accessibility: global cursor:none, cursor stuck at 0,0 on touch, jpg cursor with no alpha, no label htmlFor, contrast (orange-500/blue-500/gray-400), no prefers-reduced-motion, hamburger aria-expanded, card images lack alt. -> harden
- [P2] Konami: filter on .konami-shell breaks position:fixed children (unverified in browser); audio no mute; key buffer reads form typing; no touch trigger. -> harden
- [P2] Template rhythm; headline metrics buried; Skills 39-chip cloud redundant. -> layout

Minor: empty favicon, no meta/OG, unused ThemeContext and keyframes, blocking font @import, footer capitalization, About typo at AboutMe.tsx:28-29.
