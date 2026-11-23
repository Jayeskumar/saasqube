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
templates/        Industry demo websites to show clients (see below)
```

## Website templates (client demos)

`templates/index.html` is a gallery page with live previews of nine demo websites, each for a fictional business with its own look:

| Folder | Industry | Highlights |
|---|---|---|
| `pharmacy/` | Pharmacy / medical shop | Prescription upload, categories, offers, store locator |
| `restaurant/` | Restaurant / café | Tabbed menu with ₹ prices, veg/non-veg marks, gallery, reservations |
| `hospital/` | Hospital / clinic | Appointment booking, departments, doctors, health packages |
| `labs-scans/` | Diagnostic lab & scan centre | Test search, health packages, home sample collection, X-ray/CT/MRI prices, report download |
| `bakery/` | Bakery / cake shop | Bestsellers, custom cake order form, eggless tags |
| `salon/` | Salon & spa | Service price list, bridal packages, team, booking |
| `school/` | School / college | Admissions, academics, facilities, notice board |
| `gym/` | Gym & fitness | Plans, class schedule, BMI calculator, free trial |
| `real-estate/` | Builders & realty | Property filters, amenities, EMI calculator, site visits |

### Premium 3D templates

Three cinematic, scroll-animated templates with real photography and 3D effects:

| Folder | Industry | 3D / motion highlights |
|---|---|---|
| `silk-saree/` | Silk saree boutique | WebGL silk that ripples under the mouse (Three.js shader), 3D colour carousel while you scroll, sticky craft story, tilt cards, bridal unveil |
| `barber/` | Barbershop | Spinning 3D barber pole (Three.js), crossing tickers, live open/closed clock (IST), tap-to-build price ticket with stamp, 3D barber carousel |
| `villas/` | Luxury villas / residences | Hero photo shrinks into an arch, villa floors lift apart in CSS 3D, sideways-scrolling gallery, self-drawing location route |

They load GSAP + ScrollTrigger, Lenis (smooth scroll) and Three.js from public CDNs, plus `templates/premium.js` / `premium.css` for shared motion helpers. If a library fails to load, or the visitor has "reduce motion" turned on, all content still shows, just without the motion. Photos are from Unsplash; see `templates/CREDITS.md`.

### Cinematic scroll-story templates

Inspired by the "scroll-driven, cinematic" style of template libraries such as ScrollTide, but every design, illustration, name and line of copy here is original. Each page is a pinned scene that plays like a short film as you scroll:

| Folder | Industry | Story told by the scroll |
|---|---|---|
| `solar/` | Rooftop solar | A full day passes: the sky shifts from dawn to night, the sun arcs overhead, panels track it, kWh and ₹ saved count up, the battery fills and house lights switch on |
| `tech/` | IT / software company | A WebGL field of thousands of particles morphs from globe to grid to knot to wave, one shape per service chapter |
| `travel/` | Travel & tours | Six parallax layers of misty hills part, a mountain train climbs a curved track, altitude counts to 2,240 m, and an elevation route draws itself |
| `jewellery/` | Jewellery showroom | A braided 3D gold bangle with gems (Three.js, metallic reflections) moves between poses beside a 916 hallmark counter |
| `coffee/` | Coffee house / roastery | Zoom-through scenes from estate to cherries to roast to brass filter, with the distance to your cup counting down |
| `wedding/` | Wedding photography | Photos "develop" from blurry sepia film to full colour, then roll by on a 35 mm film strip |

When shown as a gallery preview, each scene plays on a loop on its own.

### Techniques & open-source references

The motion layer is plain JavaScript in `templates/premium.js` (split-text reveals, parallax, clip-path unveils, scrubbed word highlights, count-ups, self-drawing SVG lines, horizontal reels) on top of these open-source libraries loaded from CDNs:

- [GSAP + ScrollTrigger](https://github.com/greensock/GSAP): pinned sections, scrubbed timelines, horizontal reels
- [Lenis](https://github.com/darkroomengineering/lenis) (MIT): smooth scrolling
- [Three.js](https://github.com/mrdoob/three.js) (MIT): WebGL silk, barber pole, particle field and gold bangle

Patterns were studied from open-source projects including [Scrollama](https://github.com/russellsamora/scrollama) (scrollytelling steps), [Locomotive Scroll](https://github.com/locomotivemtl/locomotive-scroll) and [Rellax](https://github.com/dixonandmoe/rellax) (parallax), [vanilla-tilt.js](https://github.com/micku7zu/vanilla-tilt.js) (3D tilt), [SplitType](https://github.com/lukePeavey/SplitType) (text splitting), the [Fireship Three.js scroll demo](https://github.com/fireship-io/threejs-scroll-animation-demo) and [Codrops scroll experiments](https://github.com/codrops/TileScroll). No code was copied from them. The ideas were reimplemented in small vanilla functions.

All templates share `templates/shared.css` and `templates/shared.js` (header, mobile menu, forms, tabs, footer). Each sets its own colours and fonts in a `<style>` block at the top. Every template has a dark bar at the top linking back to the gallery, plus a **Get this website** button. That button opens the main site's contact form with the template already filled in (`index.html?template=Name#contact`). The bar is hidden automatically when a template is shown as a preview in the gallery.

Forms in the templates are demo-only: they show a thank-you message and don't send anything. To turn a template into a client's real site, copy its folder, replace the names, contact details and content, swap the emoji/gradient visuals for real photos, and remove the demo bar.

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
