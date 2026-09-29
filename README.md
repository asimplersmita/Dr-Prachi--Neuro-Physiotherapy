# Dr. Prachi Parkhi — Neuro Physiotherapist website

A one-page, mobile-friendly website for Dr. Prachi Parkhi (BPT, MPT — Neuroscience Physiotherapy):
about & qualifications, twelve services (neuro-focused), patient reviews with before/after photos,
an enquiry form, WhatsApp contact, a patient review link and a review-approval admin panel.

Plain HTML, CSS and JavaScript — no build step, no framework.

## Folder structure

```
.
├── index.html            # the website
├── css/style.css         # all styles (light + dark mode)
├── js/main.js            # tabs, reviews, forms, admin, WhatsApp links
├── images/
│   ├── prachi-parkhi.jpg # profile photo (replace with the original, ~400×400)
│   └── favicon.svg       # browser-tab icon
├── 404.html              # "page not found" page
├── robots.txt            # search-engine rules
├── sitemap.xml           # page list for Google
├── site.webmanifest      # "add to home screen" details
├── CNAME.example         # rename to CNAME for a custom domain on GitHub Pages
├── .env.example          # sample settings for a future backend (no secrets)
├── .editorconfig
└── .gitignore
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .          # or: python -m http.server 8000
```

## Useful links on the page

| Link | What it shows |
|---|---|
| `/` | Full website |
| `/#review` | Review form only — share this with patients on WhatsApp |
| `/#admin` | Review approvals (demo PIN `1234`) |

## Before going live — checklist

- [ ] **WhatsApp number** — `js/main.js` → `WA_NUMBER` (format `91XXXXXXXXXX`)
- [ ] **Phone shown on page** — `index.html`, contact section (`+91 98000 00000`)
- [ ] **Website address** — replace `https://www.example.com` in `index.html`, `robots.txt`, `sitemap.xml`, and `SITE_URL` in `js/main.js`
- [ ] **Profile photo** — replace `images/prachi-parkhi.jpg` with the original photo
- [ ] **Sample reviews** — remove the `RAW` sample list in `js/main.js` once real reviews exist
- [ ] **Demo banner** — remove the `<div class="demo">` line at the top of `index.html`
- [ ] **Reviews & enquiries backend** — see below
- [ ] **Admin login** — replace the demo PIN with a real login (the PIN in `main.js` is visible to anyone)

## Important: reviews need a backend

In this version, submitted reviews and photos are saved only in the **browser they were submitted from**
(`localStorage`). A patient's review on their phone will not reach the doctor's admin panel.

For the live site, connect the review form, admin panel and enquiry form to a small backend, e.g.:

- **Firebase** (Firestore + Storage + Auth) or **Supabase** — free tiers are enough to start, or
- **PHP + MySQL** on regular web hosting.

Store photos in cloud storage (not in the page), and keep keys in `.env` (never commit it).

## Deploy

**GitHub Pages:** push to GitHub → *Settings → Pages* → Source: `main` branch, `/ (root)`.
For a custom domain, rename `CNAME.example` to `CNAME` and put your domain in it.

**Netlify / Vercel:** import the repository; no build command, publish directory `/`.

## First push

```bash
git init
git add .
git commit -m "Initial website for Dr. Prachi Parkhi"
git branch -M main
git remote add origin https://github.com/<your-account>/prachi-parkhi-website.git
git push -u origin main
```

---
© 2026 Dr. Prachi Parkhi. All rights reserved.
