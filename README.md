# Dr. Prachi Parkhi — Neuro Physiotherapist website

A one-page, mobile-friendly website for Dr. Prachi Parkhi (BPT, MPT — Neuroscience Physiotherapy):
about & qualifications, twelve services (neuro-focused), patient reviews with before/after photos,
an enquiry form, WhatsApp contact, a patient review link and a review-approval admin panel.

Plain HTML, CSS and JavaScript — no build step, no framework, **no sub-folders**.

## Files (all at the top level)

```
.
├── index.html          # the website
├── style.css           # all styles (light + dark mode)
├── main.js             # tabs, reviews, forms, admin, WhatsApp links
├── prachi-parkhi.jpg   # profile photo (replace with the original, ~400×400)
├── favicon.svg         # browser-tab icon
├── 404.html            # "page not found" page
├── robots.txt          # search-engine rules
├── sitemap.xml         # page list for Google
├── site.webmanifest    # "add to home screen" details
├── CNAME.example       # rename to CNAME for a custom domain on GitHub Pages
├── .env.example        # sample settings for a future backend (no secrets)
├── .editorconfig
└── .gitignore
```

## Upload to GitHub (web)

Open the repository → **Add file → Upload files** → select **all files** from this zip → **Commit changes** to `main`.
All files sit at the top level, so the file picker is enough — no folders to create.

> Files starting with a dot (`.gitignore`, `.env.example`, `.editorconfig`) may be hidden in Windows.
> They are optional for the website to work.

## Useful links on the page

| Link | What it shows |
|---|---|
| `/` | Full website |
| `/#review` | Review form only — share this with patients on WhatsApp |
| `/#admin` | Review approvals (demo PIN `1234`) |

## Before going live — checklist

- [ ] **WhatsApp number** — `main.js` → `WA_NUMBER` (format `91XXXXXXXXXX`)
- [ ] **Phone shown on page** — `index.html`, contact section (`+91 98000 00000`)
- [ ] **Website address** — replace `https://www.example.com` in `index.html`, `robots.txt`, `sitemap.xml`, and `SITE_URL` in `main.js`
- [ ] **Profile photo** — replace `prachi-parkhi.jpg` with the original photo (same file name)
- [ ] **Sample reviews** — remove the `RAW` sample list in `main.js` once real reviews exist
- [ ] **Demo banner** — remove the `<div class="demo">` line near the top of `index.html`
- [ ] **Reviews & enquiries backend** — see below
- [ ] **Admin login** — replace the demo PIN with a real login (the PIN in `main.js` is visible to anyone)

## Important: reviews need a backend

In this version, submitted reviews and photos are saved only in the **browser they were submitted from**
(`localStorage`). A patient's review on their phone will not reach the doctor's admin panel.
For the live site, connect the forms to a small backend (Firebase / Supabase, or PHP + MySQL).

## Deploy

**Vercel:** import the GitHub repository → Framework preset **Other** → no build command → output directory blank (root). Every commit to `main` redeploys.

**GitHub Pages:** *Settings → Pages* → Source: `main` branch, `/ (root)`.

## Run locally

Double-click `index.html`, or serve the folder: `npx serve .`

---
© 2026 Dr. Prachi Parkhi. All rights reserved.
