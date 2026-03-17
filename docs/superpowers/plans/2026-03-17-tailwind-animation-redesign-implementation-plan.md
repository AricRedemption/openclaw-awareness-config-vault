# Tailwind Animation Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the project to Tailwind CSS and deliver a CSS-animated homepage section that preserves the current Awareness recovery flow.

**Architecture:** Replace homepage CSS Module styling with Tailwind utility classes and a small shared animation layer from Tailwind config and `tailwindcss-animate`. Keep interaction logic in `src/app/page.tsx`, keep global styles minimal in `src/app/globals.css`, and centralize brand/animation tokens in `tailwind.config.ts`.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, PostCSS, `tailwindcss-animate`, npm scripts (`lint`, `build`).

---

## File Structure Map

- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `src/app/animations.css`
- Modify: `package.json`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Delete: `src/app/page.module.css` (after page migration is complete)
- Keep: `public/awareness-logo.svg`
- Spec reference: `docs/superpowers/specs/2026-03-17-tailwind-animation-redesign-design.md`

## Chunk 1: Tooling and Tailwind Foundation

### Task 1: Install animation skill and Tailwind dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install CSS animation skill globally**

Run:
```bash
npx skills add onewave-ai/claude-skills@css-animation-creator -g -y
```
Expected: success message indicating skill installed.

- [ ] **Step 2: Add Tailwind and plugin dependencies**

Run:
```bash
npm install -D tailwindcss @tailwindcss/postcss postcss tailwindcss-animate
```
Expected: lockfile and `package.json` devDependencies updated.

- [ ] **Step 3: Commit dependency setup**

Run:
```bash
git add package.json package-lock.json
git commit -m "chore: add tailwind and animation tooling dependencies"
```

### Task 2: Configure Tailwind and PostCSS

**Files:**
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`

- [ ] **Step 1: Create Tailwind config with brand tokens and animations**

Add `tailwind.config.ts`:
```ts
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        safe: {
          700: "#0f8f3f",
          600: "#18a64b",
          500: "#24c25a",
          300: "#8de7ab",
        },
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-link": {
          "0%,100%": { opacity: "0.55", boxShadow: "0 0 0 rgba(36,194,90,0)" },
          "50%": { opacity: "1", boxShadow: "0 0 16px rgba(36,194,90,0.55)" },
        },
      },
      animation: {
        "fade-up": "fade-up 520ms ease-out both",
        "card-in": "fade-up 620ms ease-out 120ms both",
        "pulse-link": "pulse-link 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
```

- [ ] **Step 2: Create PostCSS config for Tailwind pipeline**

Add `postcss.config.mjs`:
```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 3: Run lint for config syntax check**

Run:
```bash
npm run lint
```
Expected: `eslint` exits successfully.

- [ ] **Step 4: Commit config files**

Run:
```bash
git add tailwind.config.ts postcss.config.mjs
git commit -m "chore: configure tailwind and postcss pipeline"
```

## Chunk 2: Global Styles and Layout Base

### Task 3: Replace global CSS entry with Tailwind layers

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Create: `src/app/animations.css`

- [ ] **Step 1: Update global style entry to Tailwind directives**

Replace `src/app/globals.css` with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: light;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

* {
  box-sizing: border-box;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Add focused custom animation utilities**

Create `src/app/animations.css`:
```css
@layer utilities {
  .hero-glow {
    box-shadow: 0 0 0 rgba(36, 194, 90, 0);
    transition: box-shadow 240ms ease, transform 240ms ease;
  }

  .hero-glow:hover {
    box-shadow: 0 14px 34px rgba(24, 166, 75, 0.28);
    transform: translateY(-1px);
  }
}
```

- [ ] **Step 3: Load animation utilities from root layout**

Modify `src/app/layout.tsx` imports:
```ts
import "./globals.css";
import "./animations.css";
```

- [ ] **Step 4: Run build for Tailwind integration sanity check**

Run:
```bash
npm run build
```
Expected: Next.js production build succeeds.

- [ ] **Step 5: Commit global styling base**

Run:
```bash
git add src/app/globals.css src/app/layout.tsx src/app/animations.css
git commit -m "refactor: switch global styles to tailwind base and animation utilities"
```

## Chunk 3: Homepage Migration to Tailwind + CSS Animations

### Task 4: Port homepage structure from CSS Module to Tailwind

**Files:**
- Modify: `src/app/page.tsx`
- Delete: `src/app/page.module.css`

- [ ] **Step 1: Preserve interaction logic before styling migration**

Ensure existing state remains:
- `mode` switch state
- `copyHint` and `copyAllHint`
- clipboard copy helper

- [ ] **Step 2: Replace wrapper structure with Tailwind classes**

Implement Tailwind classes for:
- full-page gradient background
- centered max-width container
- hero section with heading and switcher
- recovery card and connection strip
- prompt box and CTA button

- [ ] **Step 3: Apply planned motion classes**

Use classes such as:
- `motion-safe:animate-fade-up` on hero text block
- `motion-safe:animate-card-in` on integration card
- `motion-safe:animate-pulse-link` on connector element
- `hero-glow` utility on primary CTA

- [ ] **Step 4: Remove CSS Module import and delete module file**

In `src/app/page.tsx`, remove:
```ts
import styles from "./page.module.css";
```
Then remove file:
```bash
rm src/app/page.module.css
```

- [ ] **Step 5: Run lint and build after migration**

Run:
```bash
npm run lint && npm run build
```
Expected: both commands pass.

- [ ] **Step 6: Commit homepage migration**

Run:
```bash
git add src/app/page.tsx src/app/page.module.css
git commit -m "feat: migrate awareness landing hero to tailwind with css animations"
```

## Chunk 4: Verification, QA, and Finalization

### Task 5: Validate behavior and accessibility outcomes

**Files:**
- Modify (if needed): `src/app/page.tsx`
- Modify (if needed): `tailwind.config.ts`

- [ ] **Step 1: Manual desktop QA**

Run:
```bash
npm run dev
```
Verify:
- hero enters smoothly
- switcher interaction stays stable
- connection pulse is visible but subtle
- copy buttons update labels then reset

- [ ] **Step 2: Manual mobile QA**

In browser responsive mode verify at 390px and 768px:
- no overflow clipping
- card content stays readable
- CTA remains tappable

- [ ] **Step 3: Reduced-motion QA**

Enable reduced-motion in system/browser and verify animations are minimized.

- [ ] **Step 4: Final verification commands**

Run:
```bash
npm run lint
npm run build
```
Expected: both pass.

- [ ] **Step 5: Final commit and push**

Run:
```bash
git add -A
git commit -m "chore: finalize tailwind migration and motion polish"
git push
```

## Notes for Execution

- Follow DRY/YAGNI: do not add extra sections beyond current requested single-module landing.
- Keep all visual changes aligned with the existing Awareness + 360-safe-green direction.
- If any step introduces regressions, fix before moving to next chunk.
- Use `@clean-code`, `@test-driven-development`, and `@verification-before-completion` principles during execution.
