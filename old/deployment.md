# Deployment Guide — Cloudflare Pages

Deploy this static portfolio to **Cloudflare Pages** with the custom domain **shyam.page.dev**.

---

## 1. Prerequisites

- A [Cloudflare](https://dash.cloudflare.com) account
- This repository pushed to GitHub:
  `https://github.com/sham-jadhav03/portfolio`
- The domain **shyam.page.dev** registered and added to your Cloudflare account

---

## 2. Create the Pages project

### Option A — Git integration (recommended, auto-deploys on every push)

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select the `portfolio` repository.
4. Set up the build:
   - **Framework preset:** `None` (or "Static Site")
   - **Build command:** *leave empty* (no build step required)
   - **Build output directory:** `/`  (or leave `/` empty so the project root is served)
5. Click **Save and Deploy**.

### Option B — Wrangler CLI

```sh
npx wrangler pages deploy . --project-name portfolio
```

---

## 3. Add the custom domain

1. Open the project → **Custom domains** → **Set up a custom domain**.
2. Enter `shyam.page.dev` and follow Cloudflare's DNS instructions.
3. Wait for SSL certificate provisioning (usually a few minutes).
4. Once active, `https://shyam.page.dev` serves the site.

>The automatic `*.pages.dev` address stays available as a fallback (e.g. `portfolio.pages.dev`).

---

## 4. Required edits before/after deploy

This repo uses `DOMAIN` as a placeholder. Replace it everywhere before going live:

| File | Replace | With |
|------|---------|------|
| `index.html` (5 spots: canonical, og:url, og:image, JSON-LD url) | `https://DOMAIN/` | `https://shyam.page.dev/` |
| `robots.txt` (`Sitemap:` line) | `https://DOMAIN/` | `https://shyam.page.dev/` |
| `sitemap.xml` (`<loc>`) | `https://DOMAIN/` | `https://shyam.page.dev/` |

After editing, commit and push — the Git integration auto-redeploys.

---

## 5. Static files already handled by Cloudflare Pages

| File | Purpose |
|------|---------|
| `404.html` | Custom 404 page (Cloudflare Pages serves it automatically) |
| `robots.txt` | Crawler allow rules + sitemap reference |
| `sitemap.xml` | Sitemap for search engines |
| `favicon.svg` | Site icon |
| `og-image.png` | Social share preview image |

All of these are in the project root and need no extra configuration.

---

## 6. Verify after deploy

1. Open `https://shyam.page.dev` — confirm layout, mobile nav, and fonts load.
2. Click **View Resume** — confirm `resume.pdf` exists in the repo root (not tracked in this repo yet — **add your real PDF first**).
3. Test a broken URL (e.g. `https://shyam.page.dev/nope`) — expect the custom `404.html`.
4. Check `https://shyam.page.dev/robots.txt` and `sitemap.xml` resolve.
5. Paste the URL into a chat/social share to confirm the OG image (`og-image.png`) preview renders.
6. Check the console for errors: `https://shyam.page.dev` → DevTools.

---

## 7. Ongoing updates

- Every push to `main` triggers an automatic Cloudflare Pages rebuild.
- No build command or Node.js runtime is required — this is a pure static site.

---

## Quick reference

- **Live URL:** `https://shyam.page.dev`
- **Repo:** `https://github.com/sham-jadhav03/portfolio`
- **Deploy method:** Cloudflare Pages Git integration (no build step)
- **Domain DNS:** managed via Cloudflare custom domains