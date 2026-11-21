# SaaSQube Solutions — Website

Marketing website for **SaaSQube Solutions**, a website design & development company based in Tamil Nadu, serving businesses across India.

It's a static site: plain HTML, CSS and JavaScript with no build step and no dependencies apart from Google Fonts.

## Structure

```
index.html        Single-page site: hero, services, work, why us, process, pricing, about, FAQ, contact
404.html          Not-found page
css/style.css     All styles (light + automatic dark mode, responsive down to small phones)
js/main.js        Contact details, mobile menu, scroll effects, work filters, contact form
assets/favicon.svg
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Before going live: things to update

1. **Contact details.** Edit the `CONTACT` object at the top of `js/main.js` (phone, WhatsApp number, email, address). Every phone, email and WhatsApp link on the page is filled from there. Also replace the placeholder values in `index.html` (search for `0000000000` and `saasqube.example`) so the links work even with JavaScript off.
2. **Pricing.** The packages in the `#pricing` section are starting points; adjust them to your real rates.
3. **Our Work.** The six cards in `#work` show the *kinds* of projects you build. Swap in real client projects with screenshots when you have them (replace the gradient `.work-thumb` with an `<img>`).
4. **SEO.** Update the `<title>`, `<meta name="description">` and the JSON-LD block in `index.html` with your exact city/address, and add a `<link rel="canonical">` once you have a domain.

## How the contact form works

There's no server. When a visitor submits the form it builds a message from their answers and opens either **WhatsApp** (`wa.me`) or their **email app** (`mailto:`), addressed to you. To collect submissions in an inbox or a database instead, point the form at a service such as Formspree, Netlify Forms or your own backend.

## Deploy

Any static host works: GitHub Pages, Netlify, Vercel, Cloudflare Pages, Render static sites, or ordinary shared hosting (upload the files to `public_html`).

For **GitHub Pages**: repository *Settings → Pages → Deploy from a branch*, choose the branch and `/ (root)`.
