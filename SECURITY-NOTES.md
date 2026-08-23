# Security and Dependency Note

`npm audit --omit=dev` reports advisories against the required Next.js 14 dependency line. The automated fix would upgrade to Next.js 16, which would violate the activity's explicit Next.js 14 requirement and turn the update into a framework migration.

Risk is reduced for this submission because the deployed artifact is a static export:

- there is no Next.js production server;
- there are no Server Actions, rewrites, middleware, API routes, authentication, or user-controlled server input;
- the Next.js image optimizer is disabled and only local pre-optimized files are shipped;
- GitHub Pages serves generated HTML, CSS, JavaScript, and images.

Before evolving the project into a hosted Next.js server, upgrade to a supported Next.js release and repeat the compatibility, lint, build, and accessibility tests. Do not use `npm audit fix --force` blindly on this academic branch.
