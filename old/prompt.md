Refine the hero and check consistency across the rest of the portfolio (index.html, style.css, script.js):

Integrate the hero particle sketch (.hero-sketch) — currently sits in its own bordered box, disconnected from the name. Remove the border/container styling and let the canvas bleed as a full-bleed or loosely-positioned background layer behind/around the "Ghansham Jadhav" heading, at lower opacity (~0.4–0.6), so it reads as atmosphere, not a separate widget. Keep it behind the text in z-index, non-interactive layout-wise but still tracking pointermove.
Audit Work and Beyond sections for energy drop-off. Confirm the .proj reveal, kinetic headings, and terminal-hover effect are visually as considered as the hero — not just plain opacity fades. If .beyond-item or any section lost the asymmetric/grid-break treatment, restore it consistently.
Strengthen the GitHub/LinkedIn button hover states in the hero actions — currently flatter than the accent-outlined "View Resume" button. Give them a hover treatment with real presence (border color shift to --accent, subtle background fill, or lift/shadow) so all three action buttons feel like a consistent set, not one styled and two default.

Keep all existing accessibility (aria-labels, reduced-motion, sr-only terminal text) and the 6 signature features intact. No new dependencies.
