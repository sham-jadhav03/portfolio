# Ghansham Jadhav — Portfolio

Personal portfolio of **Ghansham Jadhav**, full-stack developer focused on backend
systems, AI-powered applications, and practical system design.

Live: **https://shyam.pages.dev/**

## Stack

- React 19 + TypeScript
- Vite (build + dev server)
- Hand-rolled CSS (no UI framework)
- Deployed on Cloudflare Pages

## What's inside

Single-page editorial layout with fixed rail navigation and scrollspy:

- **Hero** — kinetic headings, particle-sketch canvas, resume/social actions
- **About** — background, education, current focus
- **What I build** — areas of work
- **Selected work** — featured + other projects with visible impact metrics
  and hover terminal snippets
- **Toolkit** — skills grouped by domain
- **Beyond code** — leadership & certifications
- **Contact** — email + socials

Details: scroll progress indicator, dark mode via `prefers-color-scheme`,
optional sound toggle, `prefers-reduced-motion` support, keyboard-accessible
project cards, SEO/OG/JSON-LD metadata.

## Development

```bash
# install (bun.lock is the lockfile; npm works too)
bun install

# dev server
bun run dev

# lint
bun run lint

# production build (tsc + vite)
bun run build

# preview the production build
bun run preview
```

## Deployment

Static build output in `dist/`, deployed to Cloudflare Pages at
`https://shyam.pages.dev/`. CI (lint + build) runs via GitHub Actions.
