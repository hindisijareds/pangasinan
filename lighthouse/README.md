# Lighthouse Evidence

## Final local production audit

Audit date: 29 August 2026
Lighthouse: 13.4.1
Target: the final Next.js static export served locally with compression from `out/`
Mode: Lighthouse mobile defaults, headless Chrome

| Route | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home `/` | **95** | **100** | **100** | **100** | **2.75s** | **0** | **69ms** |
| Heritage `/heritage/` | **97** | **100** | **100** | **100** | **2.56s** | **0** | **23ms** |

Evidence files:

- `home-local-final.report.html`
- `home-local-final.report.json`
- `heritage-local-final.report.html`
- `heritage-local-final.report.json`

These scores meet the cinematic motion targets of at least 82 Performance and 100 for Accessibility, Best Practices, and SEO. They are valid local production measurements, not deployed GitHub Pages measurements. Re-run the same audit against the public URL after deployment and retain the new evidence beside these files.

## Reproduction

```bash
npm run build
npx --yes serve@14.2.4 out -l 4173 --no-clipboard
npx lighthouse http://127.0.0.1:4173/ --output=json --output=html \
  --output-path=./lighthouse/home-local-final \
  --only-categories=performance,accessibility,best-practices,seo
```
