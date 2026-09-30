# AGENTS.md — mar-portfolio

## Source of truth
- docs/PRD.md is the single source of truth. If code and PRD disagree, follow the PRD and flag it.
- Verified project facts come only from docs/PRD.md Section 9 and docs/source/projects.md (if present).

## Non-negotiable content rules
- NEVER invent projects, features, metrics, awards, rankings, links, dates or skills.
- Missing data = null in src/data/*.ts. Follow PRD Section 2.1 rendering rules.
- Materna must always show its safety framing (PRD 9.3) on the project view.
- Only whales and jellyfish as marine animals. No audio.

## Aesthetic & Design Rules (Realism Mandate & No Clay)
- Claymorphism is REMOVED everywhere. No clay tokens, components, or styles. Hero is open cinematic typography over the ocean with the navy scrim gradient.
- Realism mandate: The entire ocean world must be photorealistic. Nothing stylised, cartoon, toy-like or low-poly-as-a-look. HDRI afternoon sky, shadowed sun, Fresnel water with foam and sun glitter, underwater absorption fog, caustics, god rays, filmic tone mapping, realistic whales, realistic translucent jellyfish, realistic icebergs with submerged turquoise glow and waterline foam.
- Cyberpunk exists ONLY as a holographic overlay layer on the icebergs, the hover panels, and the project-view UI.
- Asset licensing: Source only CC0 / public-domain / permissive commercial-use assets. Record every asset in public/models/LICENSES.md. Never use non-commercial or unclear licences.

## Engineering rules
- Next.js (latest stable, App Router) + React + TypeScript (strict) + Tailwind CSS.
- 3D: three + @react-three/fiber (use the R3F major compatible with the installed React major) + @react-three/drei.
- Content lives in src/data/, never hard-coded inside 3D or UI components.
- Small reusable components (max ~250 lines each). No god components.
- No `any`. No unused code. ESLint + Prettier clean before every commit.
- Add a dependency only if PRD Section 4.2 lists it or you justify it in the plan artifact.
- Commit at the end of every phase: "phase-N: <summary>".

## Quality gates (every phase)
- `npm run lint`, `npm run typecheck`, `npm run build` must pass.
- Verify in the browser at 1440x900 and 390x844; attach screenshots to the walkthrough.
- No console errors or warnings in the browser.
- Respect prefers-reduced-motion and the quality tiers in PRD Section 11.

## Workflow
- Post an Implementation Plan artifact before coding each phase; a Walkthrough artifact after.
- Automated continuous execution without stopping between phases.
- Ask the owner only for content that cannot be placeholdered. Otherwise use PRD defaults.
