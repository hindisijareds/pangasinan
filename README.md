# Pangasinan Heritage Digital Showcase

An accessible, mobile-first heritage website built with React, TypeScript, and Next.js 14 App Router.

**Live website:** https://hindisijareds.github.io/pangasinan/

## Website pages

- `/` - editorial introduction and destination carousel
- `/heritage` - searchable and filterable heritage archive
- `/heritage/[slug]` - statically generated detail pages for 41 heritage records
- `/about` - information about Pangasinan and the digital showcase

## Local development

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality and production build

```bash
npm run lint
npm run typecheck
npm run build
```

`npm run build` creates the static website in `out/`.

## Project structure

```text
src/                    Next.js pages, components, data, styles, and types
public/images/          Local optimized heritage photographs
.github/workflows/      GitHub Pages deployment workflow
```

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` installs dependencies, checks the project, builds the static export, and deploys `out/` to GitHub Pages. `next.config.mjs` automatically applies the repository subpath during GitHub Actions builds.

## Accessibility and performance

- Semantic landmarks, headings, links, labels, and buttons
- Visible keyboard focus and a skip link
- Keyboard-accessible navigation, search, filters, and carousel
- Reduced-motion support
- Responsive local images with useful alternative text
- Static routes with limited client-side JavaScript

Image sources and licenses are recorded in [IMAGE-CREDITS.md](./IMAGE-CREDITS.md). Dependency limitations for the course-required Next.js version are recorded in [SECURITY-NOTES.md](./SECURITY-NOTES.md).
