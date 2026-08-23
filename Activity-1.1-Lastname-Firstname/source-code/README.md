# Pangasinan Heritage Digital Showcase

## Required submission details

| Field | Value |
| --- | --- |
| Project Title | Pangasinan Heritage Digital Showcase |
| Student Name | **[STUDENT NAME - replace before submission]** |
| Selected Framework | React + Next.js 14 App Router |
| Live Website | **[GITHUB PAGES URL - available after repository deployment]** |

An accessible, mobile-first tourism showcase created for Elective 4 - Special Topics in IT. The experience pairs a cinematic Discover page with a searchable heritage collection while remaining suitable for static hosting on GitHub Pages.

## Pages

- `/` - cinematic introduction, Hundred Islands and Bolinao stories, and a keyboard/touch-friendly destination carousel.
- `/heritage` - accessible client-side search and a responsive destination grid.
- `/design-system` - unlisted component-rendering surface used to produce authentic Activity 1 documentation previews.

## Local setup

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification commands

```bash
npm run lint
npm run typecheck
npm run build
```

`npm run build` creates the static export in `out/`. No separate `next export` command is required with `output: "export"`.

## Project structure

```text
src/
  app/                  App Router pages and global styling
  components/
    atoms/              Button, Typography, Icon, Image
    molecules/          Heritage Card, Search Form, Navigation Item
    organisms/          Heritage Grid, Header Navigation
    sections/           Cinematic Hero, carousel, footer
  data/                 Typed local tourism content
  styles/               Semantic color and layout tokens
  types/                Shared TypeScript models
public/images/          Local, optimized WebP photographs
report/                 Framework Selection Report source and PDF
documentation/          Atomic Design System Manual source, PDF, and previews
lighthouse/             Measured audit evidence
```

## Atomic Design

The component library follows Brad Frost's hierarchy. Atoms establish interface primitives; molecules compose destination and navigation patterns; organisms assemble search, browsing, and global navigation. Interactive client components are kept small, while page content and cards remain statically rendered.

## Static export and GitHub Pages

`next.config.mjs` derives the repository subpath from `GITHUB_REPOSITORY` during GitHub Actions. That value is applied as `basePath`, `assetPrefix`, and the public image prefix. Local builds continue to use `/`.

The workflow in `.github/workflows/deploy-pages.yml` lints, builds, uploads `out/`, and deploys it through the official GitHub Pages actions.

After creating a public repository:

1. Replace the student-name placeholder above.
2. Push this project to the repository's `main` branch.
3. In GitHub, open **Settings > Pages** and select **GitHub Actions** as the source if it is not selected automatically.
4. Wait for the workflow to complete, then replace the Live Website placeholder with the emitted Pages URL.
5. Run Lighthouse against that deployed URL and save the final evidence in `lighthouse/`.

## Accessibility and performance

- semantic headings, landmarks, labels, links, and buttons;
- visible keyboard focus and a skip link;
- accessible mobile navigation, search status, empty state, and carousel controls;
- reduced-motion layouts that keep every story readable;
- local WebP media with responsive sizing and lazy loading below the fold;
- no animation library, component framework, database, or backend;
- fully static routes and limited client-side JavaScript.

## Content and image responsibility

Descriptions are intentionally concise and avoid unverified visitor statistics, fees, schedules, and historical claims. Photograph licenses and source links are recorded in [IMAGE-CREDITS.md](./IMAGE-CREDITS.md). Balungao Hot Spring uses a labeled placeholder until a verified photograph is available.

## Academic deliverables

- `report/Framework-Selection-Report.pdf`
- `documentation/Atomic-Design-System-Manual.pdf`
- `Activity-1.1-Lastname-Firstname/`
- `PROJECT-CHECKLIST.md`

Dependency audit context is documented in [SECURITY-NOTES.md](./SECURITY-NOTES.md).
