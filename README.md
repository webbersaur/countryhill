# Country Hill Landscaping

One-page static site for **Country Hill Landscaping** — a family-owned landscaper in Guilford, CT run by Eric and Ben Werle.

- **Phone:** (203) 457-0483
- **Service area:** Guilford and the Connecticut Shoreline
- **Contact form:** none — all CTAs are phone-only (`tel:` links)

## Local development

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/>.

## Deployment (GitHub Pages)

Matches the `ctmed` project's setup.

```sh
git init
git add .
git commit -m "Initial Country Hill Landscaping site"
git branch -M main
gh repo create countryhill --public --source=. --push
# In GitHub → Settings → Pages → Source: main / root
```

When a custom domain is provisioned, add a single-line `CNAME` file (no protocol) and configure DNS at the registrar.

## Pre-launch TODO list

Search the codebase for `TODO` to find every spot. Quick summary:

- [x] **Hero photo** — Tudor home shot wired into `images/hero.jpg` (1920px) and `hero-mobile.jpg` (1280px). Swap any time.
- [ ] **Team photo** of Eric & Ben — replaces the placeholder block in About
- [ ] **Service photos** — service cards are icon-only for now
- [ ] **Email address** — none shown anywhere; add a `mailto:` link when available
- [ ] **Street address** — JSON-LD has locality + ZIP only; add `streetAddress` when ready
- [ ] **Insurance / licensing language** — don't claim "Fully Insured" until confirmed
- [ ] **Areas Served radius** — confirm towns + radius
- [ ] **Business hours** — confirm Mon–Sat 7am–6pm in JSON-LD
- [ ] **Custom domain** — update `og:url` and JSON-LD `url`; add `CNAME` file
- [ ] **Social profiles** — add `sameAs` to JSON-LD once Facebook / Google Business URLs exist

## Files

- `index.html` — the entire one-pager
- `css/styles.css` — design tokens + component styles (earthy green + cream palette)
- `js/main.js` — hamburger nav, sticky header, scroll-reveal, smooth-scroll
- `images/logo.png` — Country Hill logo
- `images/_reference/` — original screenshots from intake (gitignored)
