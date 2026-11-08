# sharon-mizrachi — landing page

Single-page, static landing page (Hebrew, RTL) for Sharon Mizrachi — CBT, EMR, Biofeedback and trauma-focused therapy.
No build step: plain `index.html`, `styles.css`, `main.js`.

## Run locally

```sh
python -m http.server 8000
# open http://localhost:8000
```

## Deploy (Cloudflare)

Live at https://sharonmizrachi.com/ — Cloudflare builds from `main` on every push (no build command, output directory `/`).

- `_headers` — Cloudflare response headers (asset caching, `noindex` on `*.pages.dev` copies).
- `robots.txt` / `sitemap.xml` — for search engines. Update `<lastmod>` in `sitemap.xml` after meaningful content changes.
- SEO tags (canonical, Open Graph, schema.org JSON-LD) are in the `<head>` of `index.html` and use the full domain.
- After changing `styles.css` or `main.js`, bump the `?v=` number on their links in `index.html` so returning visitors get the new file.

## Structure

| Section        | Anchor          |
| -------------- | --------------- |
| Hero           | top             |
| About          | `#about`        |
| Approach cards | `#approach`     |
| CBT            | `#cbt`          |
| EMR            | `#emr`          |
| Biofeedback    | `#biofeedback`  |
| Trauma         | `#trauma`       |
| Testimonials   | `#testimonials` |
| Contact        | `#contact`      |

- Contact is by WhatsApp (prefilled message) or phone; there is no form or backend.
- WhatsApp number lives in `main.js` (`WA_NUMBER`) and in the `wa.me` links in `index.html`.

## Image credits

Nature photos from Unsplash (Unsplash License — free for commercial use):
green valley (Vlw4DzpUkKg).
Portrait and hero image were provided by Sharon.
