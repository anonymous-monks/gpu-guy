# GPU Guy

An anonymous GPU performance engineering portfolio built with Astro. The pages describe technical focus areas and investigation plans; they do not claim completed benchmark results or client work.

## Work locally

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Run `npm run build` before publishing. The finished site appears in `dist/`.

## Publish

This project is configured for `https://anonymous-monks.github.io/gpu-guy/`. In the GitHub repository, open **Settings → Pages** and set **Source** to **GitHub Actions**. The workflow in `.github/workflows/deploy.yml` builds and publishes the site after each push to `main`.

## Privacy and benchmark content

The public contact address is in `src/data/site.ts`. Keep personal names, addresses, account URLs, and old images out of this repository. Add benchmark plots only with real measured data, or label illustrative data plainly. `src/components/CaseStudies.astro` is the section to extend when adding a new benchmark case study.
