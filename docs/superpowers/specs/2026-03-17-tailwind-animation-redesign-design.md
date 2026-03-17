# Tailwind Migration and CSS Animation Redesign (OpenClaw Awareness Landing)

## 1. Objective

Migrate the current Next.js landing page from CSS Modules to a Tailwind-first architecture, then add simple but high-impact CSS animation effects using Tailwind utilities + animation plugin patterns.

Primary goals:
- Full project styling direction becomes Tailwind-first.
- Existing landing structure remains recognizable (hero + mode switch + integration card).
- Visual style keeps 360 security color direction and Awareness branding.
- Animations are expressive but controlled: lightweight, responsive, and accessible.

## 2. Scope

In scope:
- Tailwind installation and project-wide configuration.
- Animation plugin setup (`tailwindcss-animate`).
- Install animation assistance skill: `onewave-ai/claude-skills@css-animation-creator`.
- Home page rewrite to Tailwind class-based styling.
- Add targeted CSS animation effects and reduced-motion fallback.

Out of scope:
- Additional page creation beyond current landing module.
- Backend/API integration changes.
- Replacing business copy or flow semantics unless required by migration.

## 3. Current Baseline

Current project status:
- Next.js 16 App Router project with TypeScript.
- Homepage implemented with `page.tsx` + `page.module.css`.
- Awareness logo already stored at `public/awareness-logo.svg`.
- Repository is public and active on `main`.

## 4. Architecture and Components

### 4.1 Styling Platform Component

Responsibility:
- Establish Tailwind as the primary styling system for the project.

Interface:
- Tailwind config defines design tokens and animation utilities.
- Global stylesheet provides Tailwind layer directives and minimal base rules.

Dependencies:
- Tailwind CSS
- PostCSS integration
- `tailwindcss-animate` plugin

### 4.2 Page Composition Component

Responsibility:
- Convert homepage layout from CSS Module classes to Tailwind utility classes.

Units:
- Hero heading unit
- Mode switch unit
- Recovery card header unit
- Connection strip unit
- Prompt + copy controls unit

Boundary rule:
- Structure in `page.tsx`; style behavior via Tailwind classes and config tokens.

### 4.3 Motion Behavior Component

Responsibility:
- Provide a constrained motion system with reusable animation names.

Animations planned:
- Hero intro fade-up
- Card enter-up
- Connection pulse/glow
- CTA hover glow
- Toggle active-state transition

Accessibility contract:
- Respect `prefers-reduced-motion` by reducing or disabling non-essential effects.

## 5. Data and Interaction Flow

1. Initial render
- Hero appears with subtle fade-up.
- Integration card appears with short delayed enter animation.

2. Mode switching
- User toggles Human/Agent mode.
- Active pill transitions smoothly without layout jump.

3. Copy interactions
- User clicks copy controls.
- Button label updates to success/failure state and auto-resets.

4. Visual status
- Connection line keeps low-frequency pulse to emphasize linked state.

No server-side state changes are introduced in this redesign.

## 6. Error Handling and Risk Controls

Migration risks and mitigations:
- Risk: Tailwind misconfiguration (styles not generated)
  - Mitigation: Verify `content` globs include app sources and run build.
- Risk: Animation overuse degrades readability
  - Mitigation: Keep short durations and low amplitudes; no constant high-frequency motion.
- Risk: Mobile layout regressions
  - Mitigation: Validate at common breakpoints and simplify decorative effects on small screens.
- Risk: Accessibility motion sensitivity
  - Mitigation: Add reduced-motion fallback behavior.

## 7. Testing and Verification Plan

Required checks:
1. `npm run lint` passes.
2. `npm run build` passes.
3. Home page visually renders on desktop and mobile widths.
4. Copy interactions still function and reset labels correctly.
5. Reduced-motion behavior confirmed (decorative animations reduced).

Acceptance criteria:
- No CSS Module dependency is required for homepage styling.
- Tailwind tokens cover the selected 360-safe green palette direction.
- At least 3 visible but restrained animation effects are active.

## 8. Deliverables

- Tailwind-enabled project configuration files.
- Updated global style entry for Tailwind layers.
- Rewritten `src/app/page.tsx` using Tailwind classes.
- Optional small retained CSS only for keyframes/base overrides if needed.
- Animation skill installed and documented in implementation notes.

## 9. Implementation Order

1. Install and configure Tailwind stack.
2. Install `tailwindcss-animate`.
3. Install `onewave-ai/claude-skills@css-animation-creator` skill.
4. Port page structure to Tailwind classes.
5. Add animation utilities and reduced-motion handling.
6. Run lint/build verification.

## 10. Non-Functional Constraints

- Keep animation performant (no heavy perpetual blur/filter stacks).
- Keep style system maintainable (tokenized colors, reusable utility composition).
- Keep UX aligned with reference intent while preserving Awareness brand identity.
