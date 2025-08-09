# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).


---

## Theme Implementation Task List (Black Background, White Text)

Goal: Apply a site-wide dark theme with black background (#000) and white text (#fff), using a bold serif font for headings and an easy-to-read sans-serif font for body text.

1. Choose and add fonts
   - Select fonts:
     - Headings (bold serif): e.g., "Playfair Display", "Merriweather", or "Libre Baskerville" (700 weight). 
     - Body (sans-serif): e.g., "Inter", "Source Sans 3", or "Roboto" (400/500 weights).
   - Add via Google Fonts or self-host:
     - If using Google Fonts, include <link> in src/layouts/Layout.astro <head> or import via @import in a global CSS.
     - If self-hosting, place font files under public/fonts and define @font-face in a global stylesheet.

2. Define theme variables (CSS custom properties)
   - Create/update a global stylesheet (e.g., src/styles/global.css).
   - Add root variables:
     - --color-bg: #000; --color-text: #fff; --color-muted: #cccccc; --color-link: #9bd1ff; --color-link-hover: #c7e3ff.
     - --font-header: "Playfair Display", Georgia, "Times New Roman", serif.
     - --font-body: "Inter", system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", sans-serif.

3. Apply global styles
   - In global.css, set:
     - html, body { background: var(--color-bg); color: var(--color-text); font-family: var(--font-body); line-height: 1.6; }
     - Heading styles: h1–h6 { font-family: var(--font-header); font-weight: 700; line-height: 1.25; }
     - Links: a { color: var(--color-link); text-decoration: underline; } a:hover { color: var(--color-link-hover); }
     - Ensure focus-visible outlines are clear (e.g., outline: 2px solid #fff; outline-offset: 2px;).

4. Wire global styles into Astro layout
   - Import the global stylesheet in src/layouts/Layout.astro:
     - <link rel="stylesheet" href="/src/styles/global.css"> (Vite will handle it) or use <style is:global>…</style>.
   - Ensure the font <link> tags (if using Google Fonts) are placed in the <head> with appropriate preconnects.

5. Adjust components/pages for contrast and readability
   - Update any component styles (e.g., src/components/Welcome.astro) to remove hard-coded light backgrounds or dark text.
   - Ensure buttons, cards, and code blocks have sufficient contrast (WCAG AA 4.5:1 for body text).
   - Provide muted separators/borders using rgba(255,255,255,0.15) or var(--color-muted).

6. Syntax highlighting and code blocks
   - If using a code highlighter (Prism/Shiki), select a dark theme (e.g., GitHub Dark, Nord) and apply site-wide.

7. Images and media
   - Add a subtle background for images with transparent areas to avoid disappearing on black (e.g., checker or a dark gray).
   - Ensure SVGs/icons adapt to dark backgrounds (prefer currentColor or provide inverse variants as needed).

8. Meta and theming polish
   - Set theme-color meta for mobile browsers in Layout.astro: <meta name="theme-color" content="#000000">.
   - Verify favicon and logo are visible on dark background; provide light/inverted variants if necessary.

9. Accessibility checks
   - Verify color contrast for links, buttons, and muted text using a contrast checker.
   - Ensure focus states are visible against black background.
   - Test with prefers-reduced-motion and keyboard navigation.

10. Cross-browser and device testing
    - Run npm run dev and test in Chrome, Firefox, Safari, and mobile.
    - Check heading hierarchy, spacing, and readability on small screens (16–18px base body size).

11. Optional: Light mode toggle (future enhancement)
    - Implement a theme toggle using data-theme="dark|light" on <html> and a small script to persist preference in localStorage.

12. Deployment checklist
    - Build: npm run build and preview: npm run preview.
    - Confirm fonts load correctly in production and no CLS issues (use font-display: swap).
