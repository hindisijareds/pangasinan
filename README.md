# Pangasinan Heritage Digital Showcase
# Jared R. Estabillo

An accessible heritage website built with React, TypeScript, and Next.js 14 App Router.

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
