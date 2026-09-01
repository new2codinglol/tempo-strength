# Tempo — landing page

Landing page for **Tempo**, a fictional 20-minute strength app. Built as a design-engineering
portfolio piece: the app does not exist, but the interval clock on the page really runs.

- **Style family:** Memphis — hard 4px keylines, flat offset colour shadows, zero radius,
  clashing primaries (cyan, lemon, rose) on warm paper. Loud on purpose.
- **Type:** Bricolage Grotesque (display) + Karla (body).
- **Motion:** [Motion](https://github.com/motiondivision/motion) for scroll reveals; CSS for the
  ticker so constant motion stays off the main thread. Press feedback is a 3px block offset
  rather than a scale, because the shadow is the affordance. `prefers-reduced-motion` stops the
  ticker and the hover lifts.
- **Interactive:** a working 45/15 × 3 interval timer, and a monthly/yearly price toggle.

## Stack

Next.js 16 · React 19 · Tailwind CSS v4 · Motion. No backend — nothing on the page has user
state worth persisting.

## Imagery

Unsplash: Michael DeMoya, Subtle Cinematics, Tejj, Samuel Girven, Delaney Van, Ramy Mamdouh.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```
