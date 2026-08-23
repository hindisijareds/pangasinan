# Architecture Plan

## Pages

- `/`: statically generated editorial home page with one small client-side cinematic controller and an accessible carousel.
- `/heritage`: statically generated page shell with a focused client-side search/filter island.

## Data flow

`src/data/heritageSites.ts` is the single content source. Page and component code receives typed records as props. A later API can replace the module without changing card or grid presentation.

## Atomic Design

- Atoms: Button, Typography, Icon, ResponsiveImage, and semantic color tokens.
- Molecules: HeritageCard, SearchForm, NavigationItem.
- Organisms: HeritageGrid, HeaderNavigation.
- Sections: CinematicHero, HeritageCarousel, SiteFooter.

## Client boundaries

Only interaction controllers use `"use client"`: HeaderNavigation, CinematicHero, HeritageCarousel, HeritageGrid, and SearchForm. Layout, pages, content, cards, typography, imagery, and footer remain statically rendered.

## Responsive and accessibility strategy

Styles begin with the 320px single-column experience, enhance at 768px, and add a three-column grid at 1100px. Semantic elements remain present without JavaScript. The header has real links and a real menu button; the carousel supports native horizontal scrolling and arrow keys; search has a visible label and live result count; motion collapses to readable static sections under reduced-motion preferences.

## Deployment

Next.js static export writes to `out/`. The production configuration derives a repository subpath from GitHub Actions environment variables, so routes and assets work at `USERNAME.github.io/REPOSITORY/` while local builds remain rooted at `/`.
