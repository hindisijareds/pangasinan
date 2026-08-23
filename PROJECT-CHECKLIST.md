# Pangasinan Heritage Digital Showcase - Completion Checklist

Status legend: `[x]` locally complete and verified, `[ ]` incomplete or externally blocked.

## Repository and architecture

- [x] Current repository, configuration, assets, and Git state audited
- [x] Requirements translated into a tracked checklist
- [x] React with Next.js 14 App Router selected
- [x] App Router architecture planned around static Server Components and small client islands
- [x] Structured tourism data separated from presentation
- [x] Centralized design tokens and mobile-first CSS architecture
- [x] No unnecessary backend, authentication, database, or motion library

## Activity 1 - Website

- [x] Complete `/` Home / Discover Pangasinan page
- [x] Complete `/heritage` Explore Heritage Sites page
- [x] Premium cinematic tourism direction adapted to Pangasinan
- [x] Hundred Islands featured story
- [x] Bolinao Lighthouse featured story
- [x] Destination carousel with previous, next, keyboard, and touch scrolling
- [x] Accessible client-side search across name, place, category, and keywords
- [x] Accessible empty search state
- [x] Shared footer
- [x] Mobile-first layouts tested at phone, tablet, laptop, and desktop widths
- [x] WCAG 2.1 AA-oriented semantics, contrast, keyboard focus, targets, and navigation
- [x] `prefers-reduced-motion` support preserves all content
- [x] Local optimized imagery with dimensions, alt text, lazy loading, and attribution
- [x] Metadata, page titles, descriptions, headings, and descriptive links
- [x] Lightweight implementation suitable for limited mobile data

## Activity 1 - Atomic Design

- [x] Button atom created and used
- [x] Typography atom created and used
- [x] Color Tokens atom created and used
- [x] Icon atom created and used
- [x] Image atom created and used
- [x] Heritage Card molecule created and used
- [x] Search Form molecule created and used
- [x] Navigation Item molecule created and used
- [x] Heritage Grid organism created and used
- [x] Header Navigation organism created and used
- [x] Required hierarchy retained in source folders

## Activity 1 - Documentation

- [x] Framework Selection Report editable source
- [x] Next.js vs Nuxt comparison covers all seven required criteria
- [x] Transparent weighted decision matrix with score rationales
- [x] Facts, project scoring, assumptions, and local measurements clearly distinguished
- [x] Framework Selection Report PDF generated and visually verified
- [x] Atomic Design System Manual editable source
- [x] Actual visual preview for every required component
- [x] Usage context for every required component
- [x] Responsive logic for every required component
- [x] Reusable code reference for every required component
- [x] Atomic Design System Manual PDF generated and visually verified

## Activity 1 - Testing and submission

- [x] Development server smoke-tested
- [x] Lint passes
- [x] TypeScript check passes
- [x] Production build passes
- [x] Static export output exists
- [x] Search tested for empty, matching, case-insensitive, and no-result input
- [x] Mobile navigation open, close, keyboard, focus, and resize behavior checked
- [x] Cinematic initial state, scroll progression, carousel, and reduced motion checked
- [x] Activity 1 submission folder prepared
- [x] Complete runnable source copied into `source-code`
- [x] Required report and manual PDFs copied into submission folder
- [x] `node_modules`, `.next`, `out`, and caches excluded from submission

## Activity 2 - Static export and repository

- [x] Activity 1 implementation reused without rewrite
- [x] `output: "export"` configured
- [x] GitHub repository-aware `basePath` and `assetPrefix` configured
- [x] Static image handling and trailing slash configured for GitHub Pages
- [x] Atomic Design and mobile-first behavior preserved
- [x] `.gitignore` excludes dependencies, builds, secrets, and caches
- [x] README includes project title
- [x] README includes clearly marked student-name placeholder
- [x] README includes selected framework
- [x] README includes clearly marked live-site placeholder
- [x] Current GitHub Pages Actions workflow created
- [x] Production build and exported routes tested locally
- [x] Local Lighthouse evidence saved without fabricated scores
- [x] Local Home audit: Performance 87, Accessibility 100, Best Practices 100, SEO 100
- [x] Local Heritage audit: Performance 86, Accessibility 100, Best Practices 100, SEO 100
- [ ] Student's exact name added (requires user information)
- [ ] Public GitHub repository created (GitHub CLI/authentication unavailable)
- [ ] Complete project committed and pushed (GitHub CLI/authentication unavailable)
- [ ] GitHub repository URL added to README (requires created repository)
- [ ] GitHub Pages deployed (requires public repository push)
- [ ] Live URL added to README (requires deployment)
- [ ] Deployed homepage, `/heritage`, assets, navigation, and refresh verified
- [ ] Lighthouse run against deployed GitHub Pages URL
- [ ] Deployed Performance score >= 80
- [ ] Deployed Accessibility score >= 85
- [ ] Deployed Best Practices score >= 85
- [ ] Deployed SEO score >= 90
- [ ] Final deployed Lighthouse evidence saved

## External submission items

- [ ] Public GitHub repository URL ready
- [ ] GitHub Pages live URL ready
- [ ] Final deployed Lighthouse result ready
