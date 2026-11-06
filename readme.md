# sharon-mizrachi — landing page

Single-page, static landing page (Hebrew, RTL) for Sharon Mizrachi — CBT, EMR, Biofeedback and trauma-focused therapy.
No build step: plain `index.html`, `styles.css`, `main.js`.

## Run locally

```sh
python -m http.server 8000
# open http://localhost:8000
```

## Deploy (Vercel, free)

```sh
npx vercel        # preview
npx vercel --prod # production
```

Or import the GitHub repo in the Vercel dashboard (framework preset: "Other", no build command).
Custom domain: Vercel → Project → Settings → Domains.

After the domain is live, set absolute URLs in `index.html` for `og:image` and add a `<link rel="canonical">`.

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

- The contact form has no backend: it opens WhatsApp with a prefilled message.
- WhatsApp number lives in `main.js` (`WA_NUMBER`) and in the `wa.me` links in `index.html`.

## Image credits

Nature photos from Unsplash (Unsplash License — free for commercial use):
green valley (Vlw4DzpUkKg).
Portrait and hero image were provided by Sharon.
