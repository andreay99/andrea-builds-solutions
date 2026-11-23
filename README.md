# andreasoto.dev

My portfolio. The home page is a galaxy: every project, role and skill is a star, and the lines between them are the connections. Projects open out of their star.

Live at [andreasoto.dev](https://andreasoto.dev).

## What's in here

- `src/components/Galaxy.tsx`: the home page. A Canvas 2D star map with a WebGL black hole in the middle. The black hole is a raymarched Schwarzschild lens with a blackbody accretion disk and Doppler beaming.
- `src/components/*Sim.tsx`: the interactive figures inside the project pages:
  - the satellite swarm for OSEHS
  - HBM traffic for Flash Attention
  - the embedding space for Recall
  - `time_bucket()` for Tellavision
- `src/components/ArchDiagram.tsx` and `src/data/architectures.ts`: the architecture diagrams, drawn as metro maps from plain data.
- `src/data/`: all the content (projects, the galaxy graph and the diagrams), kept apart from the layout.

## Stack

React 18, TypeScript, Vite, Framer Motion for page transitions, and hand-written canvas and WebGL for everything that moves. Hosted on Vercel, and the contact form goes through Formspree.

## Running it

```bash
npm install
npm run dev
```

`npm run build` writes the static site to `dist/`. Security headers and the content security policy live in `vercel.json`.
