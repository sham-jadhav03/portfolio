You are working on my personal developer portfolio.

IMPORTANT:
Do NOT redesign the portfolio from scratch.
Do NOT replace the existing visual identity.
Do NOT turn it into a generic modern developer portfolio.
Preserve the current editorial / premium aesthetic:
- dark near-black background
- cream typography
- burnt-orange accent
- Instrument Serif / Newsreader style typography
- fixed left vertical navigation on desktop
- large "Ghansham Jadhav" hero typography
- subtle grain/noise texture
- minimal borders
- restrained animations
- lots of whitespace
- sophisticated, typography-first design

Your job is to AUDIT the existing implementation and then FIX the issues below directly in the codebase.

==================================================
1. FIRST: INSPECT THE EXISTING PROJECT
==================================================

Before changing anything:

1. Inspect the complete project structure.
2. Read the current index.html and all relevant CSS/JS/assets.
3. Check existing project links.
4. Check whether resume.pdf actually exists.
5. Check whether project screenshots/assets already exist.
6. Check deployment-related files if present.
7. Do NOT assume URLs or assets.
8. Do NOT invent metrics, project results, testimonials, or live demo URLs.

Make changes based on the actual repository.

==================================================
2. CRITICAL FIXES
==================================================

### A. Resume

The portfolio has a "View Resume" CTA.

Ensure the actual resume PDF exists at:

./resume.pdf

If the current resume file exists under another filename/location, copy or rename it appropriately so the CTA works.

Verify:
- Hero resume link works.
- Contact resume link works.
- No broken resume links remain.

Do NOT create fake resume content.

==================================================
3. REMOVE ALL PLACEHOLDER URLs
==================================================

Search the entire project for:

- your-domain.com
- your-rag-demo-url.com
- example.com
- placeholder URLs
- fake demo URLs
- TODO URLs

Remove or replace them with real URLs only if the repository contains the real URL.

For the RAG project:
- If a real deployed demo URL exists, use it.
- If no real deployed demo exists, REMOVE the "Live Demo" CTA entirely.
- Never leave a fake URL.

Do not invent deployment URLs.

If the actual portfolio domain is discoverable from existing configuration, use it.
Otherwise leave canonical/OG URL configuration ready but clearly structured for the real domain rather than inserting a fake domain.

==================================================
4. FAVICON
==================================================

Add a simple favicon using the initials:

GJ

Keep it consistent with the existing visual design.

Prefer a lightweight SVG favicon if appropriate.

Do not add a generic emoji favicon.

==================================================
5. MOBILE NAVIGATION
==================================================

Current desktop navigation uses the vertical left rail.

Preserve that desktop navigation.

On screens below 900px, the navigation must NOT simply disappear.

Add a minimal mobile navigation solution.

Requirements:
- clean
- fast
- accessible
- consistent with current aesthetic
- no huge animated hamburger menu
- no excessive animation
- keyboard accessible
- obvious way to navigate to:
  ABOUT
  BUILD
  WORK
  TOOLKIT
  CONTACT

A simple compact top navigation / menu is preferred.

Make sure it does not cover or overlap hero content.

==================================================
6. PROJECT VISUALS
==================================================

Improve the Selected Work section visually.

Do NOT add random stock images or AI-generated decorative images.

Use actual project screenshots/assets if they already exist in the repository.

Featured projects should be:

1. Enterprise RAG Knowledge Base
2. ReSearch AI
3. Codex
4. Multi-Tenant SaaS Backend

Use screenshots where real screenshots exist.

For backend-only projects like SaaS Backend, an actual architecture diagram or relevant technical visual is acceptable.

If no appropriate project image exists:
- do NOT fabricate one
- create a clean visual placeholder area only if necessary
- keep the design intentional and minimal

The visual treatment must fit the existing editorial design.

Do not turn projects into generic card grids.

==================================================
7. PROJECT HIERARCHY
==================================================

Make the project hierarchy clearer.

Structure:

SELECTED WORK

01 — Enterprise RAG Knowledge Base
02 — ReSearch AI
03 — Codex
04 — Multi-Tenant SaaS Backend

Then:

OTHER WORK

- Claude Token Reducers
- Canvas Image Editor

The first four projects should receive more visual emphasis.

The RAG project should feel like the flagship project.

Do NOT add unnecessary projects just to increase the count.

==================================================
8. PROJECT CONTENT
==================================================

Rewrite project descriptions only where necessary to make them:

- concise
- technical
- recruiter-friendly
- factual
- easy to scan

Use the actual project implementation and README as the source of truth.

Do NOT invent:
- users
- revenue
- performance numbers
- uptime
- scale
- document counts
- latency
- production usage
- business impact

For the RAG project, accurately reflect its real architecture, including relevant technologies such as:
- Next.js
- Node.js
- Python
- Redis
- LangGraph
- ChromaDB
- MongoDB
- JWT/RBAC
- PDF ingestion
- citations

Only mention features actually present in the project.

==================================================
9. REAL METRICS ONLY
==================================================

Add measurable facts only when they are verified by the existing resume/project/repository.

Examples of verified facts may include:
- 100+ hackathon participants
- 15-member HackSlash Coding Club
- 4 REST endpoints
- 5 real-time web results

But ONLY use a metric if it is actually supported by the repository/resume.

Never fabricate metrics such as:
- "10K+ documents"
- "200ms response time"
- "99.9% uptime"
- "1M users"

unless they are actually measured/documented.

==================================================
10. HERO SECTION
==================================================

Preserve the current hero design.

Current positioning:

FULL-STACK DEVELOPER · BACKEND & AI SYSTEMS

Ghansham
Jadhav

Keep the typography and visual composition.

Improve only the copy if needed.

Preferred positioning:

"I build full-stack applications, backend systems, and AI-powered products — from RAG pipelines and agent workflows to real-time web platforms."

Keep:

OPEN TO OPPORTUNITIES · INDIA

Keep the primary CTAs:

VIEW RESUME
GITHUB
LINKEDIN

Do not add excessive buttons.

==================================================
11. ABOUT SECTION
==================================================

Keep About concise.

It should communicate:
- full-stack development
- backend systems
- AI/RAG/agent systems
- practical system design
- current engineering focus
- education

Do NOT make the section a long biography.

Education should remain lightweight:

Government College of Engineering, Chhatrapati Sambhajinagar
B.E. Information Technology · 2023–2027

Do not prominently display CGPA in the hero.

==================================================
12. "WHAT I BUILD" SECTION
==================================================

Keep/create three concise categories:

AI Applications
Backend Systems
Full-stack Products

Each should explain what I build in one or two short lines.

Do not turn them into skill-rating cards.

==================================================
13. TOOLKIT
==================================================

Keep skills grouped rather than adding proficiency bars.

Use categories such as:

Languages
Frontend
Backend
Data & Infrastructure
AI Engineering

Do NOT add:
- Expert / Proficient / Beginner labels
- percentage bars
- years of experience
- fake skill scores

The portfolio should communicate technologies, not subjective skill ratings.

==================================================
14. BEYOND CODE
==================================================

Keep this section concise.

Include verified information such as:

HackSlash Coding Club
Co-Head
Led a 15-member club and organized a national-level hackathon with 100+ participants.

Oracle Certified Generative AI Professional
Oracle University

Do not add fake testimonials.

Do NOT create a testimonials section.

==================================================
15. DO NOT ADD A BLOG
==================================================

Do not create a blog section unless actual articles/content already exist.

Do not create placeholder blog cards.

==================================================
16. SEO
==================================================

Improve the technical SEO.

Add if missing:

- canonical link
- og:title
- og:description
- og:type
- og:url
- og:image
- og:locale = en_IN
- twitter:card
- appropriate Twitter metadata if a real handle exists

IMPORTANT:
Never use fake URLs.

If the real deployed domain is not known, structure the code so it is easy to replace later.

==================================================
17. OPEN GRAPH IMAGE
==================================================

If an actual OG image already exists, use it.

If not, create a minimal OG image asset consistent with the portfolio:

GHANSHAM JADHAV
FULL-STACK DEVELOPER
BACKEND & AI SYSTEMS

Do not create a flashy marketing banner.

Recommended dimensions:
1200 × 630

==================================================
18. JSON-LD
==================================================

Add a clean Person JSON-LD schema.

Use only verified information.

Possible structure:

@type: Person
name: Ghansham Jadhav
jobTitle: Full-stack Developer
url: actual portfolio URL when known
sameAs:
- GitHub
- LinkedIn

Do not invent additional credentials.

==================================================
19. ACCESSIBILITY
==================================================

Audit accessibility.

Ensure:
- proper heading hierarchy
- semantic HTML
- descriptive link labels where needed
- keyboard navigation
- visible :focus-visible states
- sufficient text contrast
- decorative elements use aria-hidden where appropriate
- mobile navigation is keyboard accessible
- images have meaningful alt text
- decorative images have empty alt="" where appropriate

Do not add unnecessary ARIA.

==================================================
20. CONTACT
==================================================

Keep the contact section minimal.

Ensure:
- email works
- GitHub works
- LinkedIn works
- LeetCode works if already present
- resume works

External links should consistently use:

target="_blank"
rel="noopener noreferrer"

where appropriate.

==================================================
21. 404 / ROBOTS / SITEMAP
==================================================

If this is a static deployment such as GitHub Pages:

Add:
- 404.html
- robots.txt
- sitemap.xml

Keep them minimal and valid.

Do not add unnecessary SEO content.

==================================================
22. PERFORMANCE
==================================================

Keep the portfolio lightweight.

Do NOT add:
- React
- Next.js migration
- animation libraries
- large UI libraries
- unnecessary JavaScript
- heavy image libraries

Preserve the existing static HTML/CSS/JS architecture.

Keep the existing IntersectionObserver reveal behavior if it is already working.

Respect:

prefers-reduced-motion

==================================================
23. DESIGN RULES
==================================================

VERY IMPORTANT:

Do NOT destroy the current aesthetic.

No:
- skill bars
- 3D objects
- particle backgrounds
- excessive gradients
- glassmorphism
- huge rounded cards
- neon colors
- animated cursors
- visitor counters
- unnecessary badges
- generic SaaS dashboard aesthetic
- generic Tailwind portfolio template
- excessive icons
- stock photos

The current visual identity should remain:

EDITORIAL
MINIMAL
DARK
TYPOGRAPHY-FIRST
TECHNICAL
PREMIUM
QUIET

==================================================
24. RESPONSIVE QA
==================================================

Test the page at:

1440px
1280px
1024px
900px
768px
480px
375px

Check:
- no horizontal overflow
- hero typography doesn't break
- mobile navigation works
- buttons don't overflow
- project images scale correctly
- sections have reasonable spacing
- footer/contact remains usable

==================================================
25. LINK VALIDATION
==================================================

Before finishing, search the entire project for broken/placeholder links.

Specifically verify:

resume.pdf
GitHub
LinkedIn
LeetCode
project GitHub links
project live demo links
canonical URL
OG URL
OG image path

Do not claim a URL works unless you actually verified it from the repository/deployment configuration.

==================================================
26. FINAL QUALITY CHECK
==================================================

After implementing everything:

1. Run the project/build if a build system exists.
2. Fix all HTML/CSS/JS errors.
3. Check browser console errors if possible.
4. Check broken local asset paths.
5. Check mobile navigation.
6. Check resume link.
7. Check all project links.
8. Check accessibility basics.
9. Check responsive layout.
10. Search again for placeholder URLs.

Then provide a concise summary:

- Files changed
- Critical issues fixed
- New assets added
- Any URLs/assets that still require my manual input
- Any issues you could not verify

IMPORTANT FINAL RULE:

Do not merely tell me what should be changed.
Actually MODIFY THE EXISTING CODEBASE and implement the fixes.

Do not rewrite the whole project unnecessarily.
Make the smallest set of high-quality changes that produces a polished recruiter-ready portfolio while preserving the existing design.