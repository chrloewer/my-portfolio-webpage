# Chris — Personal Portfolio

A polished, single-page personal portfolio built as a plain static site. No build tools, no bundlers, no dependencies — just HTML, CSS, and a sprinkle of vanilla JavaScript.

## Features

- Mobile-first, fully responsive layout
- Dark & light theme with OS-preference detection and persistence
- Smooth scroll and subtle scroll-reveal animations (respect `prefers-reduced-motion`)
- Accessible: semantic HTML, keyboard-navigable, visible focus states, skip link, ARIA where it matters
- Hero with animated rotating word and parallax glow
- Projects, skills, timeline/experience, and contact-form (mailto fallback) sections
- Google Fonts (Inter + Space Grotesk + JetBrains Mono)

## File layout

```
.
├── index.html       # Markup
├── styles.css       # Styles (theme variables, layout, components)
├── script.js        # Theme toggle, nav, scroll reveal, contact mailto
├── assets/
│   └── favicon.svg  # Site icon
└── README.md
```

## Preview locally

Any static file server works. The simplest, with Python 3:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

Alternatives:

```sh
# Node (one-liner, no install)
npx serve .

# PHP
php -S localhost:8000
```

You can also just double-click `index.html` to open it with `file://` — everything works offline except Google Fonts (which require network).

## Run with Docker

```sh
docker compose up -d
```

Then open <http://localhost:8080>.

## Customizing

- **Name, copy, links** — edit `index.html` directly; all content is inline.
- **Colors & theme** — tweak the CSS variables under `:root` and `html[data-theme='…']` in `styles.css`.
- **Fonts** — swap the Google Fonts `<link>` tag in `index.html` and update `--font-sans` / `--font-display` in `styles.css`.
- **Projects** — duplicate a `.project-card` block in `index.html`. The decorative shape is a `<div class="pv-shape pv-shape-N">` — add new variants in `styles.css` as needed.
- **Social links / email** — update the `<nav class="social">` block in the footer and the `mailto:` href in `script.js`.

## Deploy

Any static host will do:

- **GitHub Pages** — push the folder, enable Pages on the branch.
- **Netlify / Vercel** — drag-and-drop deploy or connect the repo; no build command needed.
- **Cloudflare Pages** — same story.

## License

Do whatever you like with it. Attribution appreciated but not required.
