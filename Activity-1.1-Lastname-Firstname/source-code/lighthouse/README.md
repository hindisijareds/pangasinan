# Lighthouse Evidence

## Final local production audit

Audit date: 23 August 2026  
Lighthouse: 13.4.1  
Target: the final Next.js static export served locally from `out/`  
Mode: Lighthouse mobile defaults, headless Chrome

| Route | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Home `/` | **87** | **100** | **100** | **100** |
| Heritage `/heritage/` | **86** | **100** | **100** | **100** |

Evidence files:

- `home-local-final.report.html`
- `home-local-final.report.json`
- `heritage-local-final.report.html`
- `heritage-local-final.report.json`

These scores exceed the activity minimums of 80 Performance, 85 Accessibility, 85 Best Practices, and 90 SEO. They are valid local production measurements, not deployed GitHub Pages measurements. The activity's final deployed audit remains external until a public repository and Pages URL exist. Re-run the same audit against the public URL after deployment and retain the new evidence beside these files.

## Reproduction

```bash
npm run build
python -m http.server 4173 --directory out
npx lighthouse http://127.0.0.1:4173/ --output=json --output=html \
  --output-path=./lighthouse/home-local-final \
  --only-categories=performance,accessibility,best-practices,seo
```
