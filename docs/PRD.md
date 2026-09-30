# PRD v2.0 — Mohammed Abdul Rahim · Interactive Ocean Portfolio

**Target builder:** Google Antigravity (agent-driven build)
**Owner:** Mohammed Abdul Rahim
**Status:** Ready to build. Content gaps are handled by explicit placeholders (Section 2).
**Language of all UI copy:** English

---

## 0. HOW TO USE THIS FILE IN ANTIGRAVITY

1. Create an empty folder `mar-portfolio/` and open it as the Antigravity workspace.
2. Save this file as `docs/PRD.md`.
3. If you have the original project source document (Nova Class, Materna/MaternaGuard, hackathons), save it as `docs/source/projects.md`. The agent must treat it as the only source of verified project facts.
4. Open the Agent Manager and paste the **Kickoff Prompt** below.
5. Review at each phase gate (Section 14). The agent must post an Implementation Plan before coding each phase and a Walkthrough with screenshots after it.

### Kickoff Prompt (paste this)

```text
You are building a premium interactive portfolio for Mohammed Abdul Rahim.
Read docs/PRD.md completely before doing anything. It is the single source of truth.

Step 1: Create /AGENTS.md using the exact content in PRD Section 3.
Step 2: Execute the build phases in PRD Section 14 strictly in order, starting at Phase 0.
Step 3: Before each phase, produce an Implementation Plan artifact. After each phase,
        produce a Walkthrough artifact with screenshots at 1440x900 (desktop) and
        390x844 (mobile), then STOP and wait for my approval before the next phase.

Hard rules: never invent project details, links, metrics, awards or skills.
Use the placeholder system in PRD Section 2. Follow the acceptance criteria in each phase.
```

---

## 1. PRODUCT SUMMARY

### 1.1 What we are building
A single-page immersive portfolio where the page itself is a cinematic **afternoon ocean**. The visitor scrolls from the sunlit surface down into deeper water. Each major project is a **cyberpunk iceberg**; clicking one "enters" it and opens a dedicated cyberpunk project view.

### 1.2 Owner profile
| Field | Value (use verbatim) |
|---|---|
| Name | MOHAMMED ABDUL RAHIM |
| Current identity | IT STUDENT · DATA SCIENCE ENGINEER |
| Future positioning | GEN AI ENGINEER |
| Personal statement | I BUILD THOUGHTS IN REAL WORLD |
| Concept statement | THE EARTH REVOLVES AROUND SUN PERFECTLY AND YOUR PROJECTS WILL RUN UNDER ME |
| Goals | Freelance client work, client acquisition, research opportunities, entrepreneurship |

### 1.3 Audience
- **Primary:** potential clients (businesses/individuals needing an idea turned into a working product); research collaborators (AI, data science, GenAI).
- **Secondary:** recruiters, startup founders, hackathon collaborators, students/developers.

### 1.4 Core UX principle
**WOW → UNDERSTAND → EXPLORE → CONTACT.** Visual ambition must never reduce usability. A visitor must be able to answer, within one short visit: *What does Mohammed build? What can he build for me? How do I contact him?*

### 1.5 Personality
Creative · Experimental · Cinematic · Intelligent. Tone: confident, technically credible, entrepreneurial, builder-like. Avoid corporate clichés, motivational filler, exaggerated claims, generic AI-sounding copy.

### 1.6 Non-goals (do NOT build)
- No CMS, database, auth, or backend. No contact form (mailto + links only).
- No blog, no case-study CMS, no admin panel.
- No audio of any kind (no autoplay, no ambient sound).
- No marine animals other than whales and jellyfish (no fish, sharks, dolphins, turtles, etc.).
- No sunset/night scene. The scene is bright-to-warm afternoon.
- No fabricated content of any kind.

---

## 2. LOCKED DECISIONS, PLACEHOLDERS & CONTENT STATUS

### 2.1 Placeholder system (critical)
Missing data is stored as `null` (or `[]`) in `src/data/*.ts`. **Never** write "TODO", "Lorem ipsum", `#`, or fake URLs into rendered UI.

Rendering rules:
- `null` link → the button is **not rendered** (or rendered `aria-disabled` with label "Coming soon" for GitHub / Live Demo only).
- `null` project detail section (problem, solution, role, results…) → that section is **omitted**.
- Project with `contentStatus: "placeholder"` → show a banner in the project view: **"Full case study in progress."**
- A script `npm run check:content` must list every `null`/empty field that is still open. With env `STRICT_CONTENT=1` it exits non-zero (used before final production deploy).

### 2.2 Content inventory

| Item | Status | Value / Rule |
|---|---|---|
| Hero copy, statements, CTAs | ✅ Final | Section 8.2 |
| Nova Class summary, features, tech | ✅ Verified from owner source | Section 9.3 |
| Materna (MaternaGuard) summary, features, safety framing | ✅ Verified from owner source | Section 9.3 |
| Cyber Lens details | ⛔ Not provided | All detail fields `null` |
| Nova Class GitHub / live demo | ⛔ Not provided | `null` |
| Cyber Lens GitHub / live demo | ⛔ Not provided | `null` |
| Materna links, tech stack, screenshots | ⛔ Not provided | `null` |
| Email / LinkedIn / GitHub URLs | ⛔ Not provided | `null` in `site.ts` |
| Resume PDF | ⛔ Not provided | `public/resume/Mohammed_Abdul_Rahim_Resume.pdf` expected; UI hides resume buttons until `resume.available = true` |
| Profile photo | Optional | Not required; design must work without it |
| Project screenshots | ⛔ Not provided | Use generated abstract cyberpunk hero visuals (CSS/SVG), clearly not screenshots |
| Skill proficiency per skill | ⚠️ Default | Owner said "intermediate overall": default every skill to level 2 |
| Hackathon dates | ⛔ Not provided | `null`; do not show dates |
| Degree label | ⚠️ Ambiguous | Source says "B.Tech / B.E." — render as "Bachelor of Engineering — Information Technology" **only after owner confirms**; until then render "Information Technology (Undergraduate)" |

### 2.3 Copy-approval flags
These lines were written by the PRD author to close gaps. They are allowed in the build but must be listed in the final report for owner approval:
- "WHAT I BUILD" strip (Section 8.2).
- SEO title/description (Section 12).
- Contact supporting copy (Section 8.7).

---

## 3. AGENT OPERATING RULES → save verbatim as `/AGENTS.md` in Phase 0

```markdown
# AGENTS.md — mar-portfolio

## Source of truth
- docs/PRD.md is the single source of truth. If code and PRD disagree, follow the PRD and flag it.
- Verified project facts come only from docs/PRD.md Section 9 and docs/source/projects.md (if present).

## Non-negotiable content rules
- NEVER invent projects, features, metrics, awards, rankings, links, dates or skills.
- Missing data = null in src/data/*.ts. Follow PRD Section 2.1 rendering rules.
- Materna must always show its safety framing (PRD 9.3) on the project view.
- Only whales and jellyfish as marine animals. No audio.

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
- After each phase STOP and wait for owner approval.
- Ask the owner only for content that cannot be placeholdered. Otherwise use PRD defaults.
```

---

## 4. TECH STACK & REPOSITORY

### 4.1 Stack (locked)
| Layer | Choice |
|---|---|
| Framework | Next.js (latest stable), App Router, TypeScript strict |
| Styling | Tailwind CSS + CSS variables for tokens |
| 3D | three, @react-three/fiber, @react-three/drei |
| Post-FX | @react-three/postprocessing (**high tier only**, lazy) |
| UI motion | motion (Framer Motion) for DOM transitions only |
| State | zustand (scroll progress, quality tier, motion preference, transition state) |
| GPU tiering | detect-gpu + drei `PerformanceMonitor` |
| Fonts | `next/font/google`: **Sora** (display), **Manrope** (body), **JetBrains Mono** (micro labels) — each with system fallbacks |
| Testing | Playwright, @axe-core/playwright, Lighthouse CI (@lhci/cli) |
| Hosting | Vercel (static generation; no server runtime required) |

Pin exact versions in `package.json` after install. Do not add other dependencies without justification.

### 4.2 Scripts required in `package.json`
`dev`, `build`, `start`, `lint`, `typecheck`, `test:e2e`, `test:a11y`, `lhci`, `check:content`.

### 4.3 Folder structure
```text
mar-portfolio/
├─ AGENTS.md
├─ docs/
│  ├─ PRD.md
│  └─ source/projects.md            (owner-supplied, optional)
├─ public/
│  ├─ resume/                       (Mohammed_Abdul_Rahim_Resume.pdf when supplied)
│  └─ og/                           (og-image.png)
├─ scripts/check-content.ts
├─ tests/                           (playwright specs)
└─ src/
   ├─ app/
   │  ├─ layout.tsx                 (fonts, persistent OceanStage, nav, metadata)
   │  ├─ page.tsx                   (single-page sections)
   │  ├─ projects/[slug]/page.tsx   (project view, generateStaticParams)
   │  ├─ sitemap.ts  robots.ts  not-found.tsx
   ├─ components/
   │  ├─ navigation/   DesktopNav, MobileBottomNav, ActiveSectionObserver
   │  ├─ hero/         Hero, ClayPanel, OfferStrip, ResumeActions
   │  ├─ ocean/        OceanStage, OceanSurface, Underwater, Particles, Sun, Rays, CameraRig, RippleLayer
   │  ├─ whales/       Whale, useWhalePath
   │  ├─ jellyfish/    Jellyfish, JellyfishSwarm
   │  ├─ icebergs/     Iceberg, IcebergHologram, IcebergField, MobileIcebergRail
   │  ├─ projects/     ProjectView, ProjectSection, TechChips, EnterTransition
   │  ├─ skills/       SkillsDepthMap
   │  ├─ journey/      JourneyDive, Waypoint
   │  ├─ contact/      ContactFooter
   │  └─ ui/           GlassSurface, ClaySurface, Button, MotionToggle, SkipLink
   ├─ data/            site.ts  projects.ts  skills.ts  journey.ts
   ├─ lib/             quality.ts  scroll.ts  env.ts
   ├─ store/           useWorld.ts
   └─ styles/          tokens.css  globals.css
```

---

## 5. INFORMATION ARCHITECTURE

### 5.1 Routes
| Route | Purpose |
|---|---|
| `/` | Single immersive page: Hero → Work → Skills → Journey → Contact/Footer |
| `/projects/[slug]` | Cyberpunk project view (statically generated from `projects.ts`) |
| `/not-found` | On-brand 404 with "Return to ocean" |

Section anchors: `#home`, `#work`, `#skills`, `#journey`, `#contact`.

### 5.2 Scroll depth zones
The fixed WebGL canvas sits behind the scrolling DOM. `scrollProgress` (0→1 across the page) drives camera depth, fog, light and particle density.

| Zone | Section | Approx. section height | Camera | Fog / water colour | Mood |
|---|---|---|---|---|---|
| Z1 Surface | Hero `#home` | 100svh | Above waterline, slight tilt toward sun | `#BFE6FF` → `#2E9BD6` | Bright, warm sun glints |
| Z2 Iceberg zone | Work `#work` | 200–250svh | At waterline (icebergs half above, half below) | `#1F7FBF` | Clear blue, whales pass behind icebergs |
| Z3 Deeper | Skills `#skills` | ~120svh | Fully underwater, descending | `#0E4A7A` | Softer light, more jellyfish glow |
| Z4 Deep ocean | Journey `#journey` | ~160svh | Deeper still | `#072A4F` | Dim, bioluminescent |
| Z5 Calm final | Contact `#contact` | 100svh | Gentle hold, slight rise | `#0A3A63` + soft cyan haze | Calm, still |

Camera transitions are **damped interpolation** (no snap). The user always scrolls natively — never hijack scroll, never lock scroll, never require long animations to finish.

---

## 6. DESIGN SYSTEM

### 6.1 Colour tokens (`src/styles/tokens.css`)
```css
:root {
  /* Ocean */
  --ocean-surface: #BFE6FF;
  --ocean-light:   #2E9BD6;
  --ocean-mid:     #1F7FBF;
  --ocean-deep:    #0E4A7A;
  --ocean-abyss:   #072A4F;
  --sun-warm:      #FFD9A0;

  /* Cyberpunk accents (icebergs + project views; magenta ≤ ~10% of any surface) */
  --neon-cyan:     #22E5FF;
  --neon-blue:     #2D6BFF;
  --neon-magenta:  #FF3DC8;

  /* Cyberpunk dark surfaces (project view) */
  --cp-bg:         #05080F;
  --cp-panel:      #0B1220;
  --cp-line:       rgba(34, 229, 255, 0.28);
  --silver:        #E6ECF5;
  --silver-muted:  #9AA7BA;

  /* Clay (hero) */
  --clay-bg:       #EAF6FF;
  --clay-ink:      #0B2545;   /* dark navy text on clay: contrast ≥ 7:1 */

  /* Glass */
  --glass-bg:      rgba(255, 255, 255, 0.12);
  --glass-bg-deep: rgba(6, 22, 44, 0.45);   /* use in Z3–Z5 for text contrast */
  --glass-border:  rgba(255, 255, 255, 0.28);
}
```
The ocean dominates. Black/silver identity appears only in typography, project views, outlines and dark glass in deep zones. Do not make the site "black gothic".

### 6.2 Surface recipes
**Glassmorphism** (navbar, mobile nav, skills/journey cards, contact/footer)
```css
background: var(--glass-bg);
backdrop-filter: blur(18px) saturate(140%);
-webkit-backdrop-filter: blur(18px) saturate(140%);
border: 1px solid var(--glass-border);
border-radius: 20px;
box-shadow: 0 8px 32px rgba(3, 20, 45, 0.25);
```
In Z3–Z5 use `--glass-bg-deep`. Text on glass must meet WCAG AA (4.5:1) against the worst-case background; add a darker tint if needed. Provide a `@supports not (backdrop-filter)` fallback with a solid semi-opaque background.

**Claymorphism** (hero panel, primary CTA)
```css
background: var(--clay-bg);
border-radius: 32px;
box-shadow:
  12px 12px 28px rgba(8, 40, 80, 0.28),
  -8px -8px 20px rgba(255, 255, 255, 0.85),
  inset 4px 4px 10px rgba(255, 255, 255, 0.9),
  inset -6px -6px 14px rgba(120, 170, 210, 0.35);
color: var(--clay-ink);
```
Soft, tactile, thick rounded forms. Pressed state: invert to inset shadows over 120ms.

**Cyberpunk** (iceberg holograms, project view)
Dark panels (`--cp-panel`), 1px `--cp-line` outlines, corner brackets, faint grid, mono uppercase micro-labels, subtle scan gradient. **Never flash**; no element may change brightness more than 3 times per second.

### 6.3 Typography
| Role | Font | Style |
|---|---|---|
| Hero title | Sora | 700, uppercase, tight tracking, `clamp(2rem, 6vw, 5rem)` |
| Section title | Sora | 600, `clamp(1.75rem, 4vw, 3rem)` |
| Body | Manrope | 400/500, 16–18px, line-height 1.6 |
| Micro labels | JetBrains Mono | 500, 11–13px, uppercase, letter-spacing 0.12em |

Long name must never overflow at 320px width; allow controlled line breaks.

### 6.4 Motion principles
Slow, cinematic, smooth, purposeful, non-distracting. Default easing `cubic-bezier(0.22, 1, 0.36, 1)`; DOM transitions 300–600ms; camera damping. No bouncing, spinning, flashing, or perpetual UI movement.

---

## 7. OCEAN WORLD SPECIFICATION

### 7.1 Architecture
- One persistent `<OceanStage/>` mounted in `layout.tsx`: `position: fixed; inset: 0; z-index: 0; pointer-events` enabled only for iceberg hit areas. Canvas is `aria-hidden`.
- DOM content scrolls above it (`z-index: 1+`).
- Canvas loads via `dynamic(() => import(...), { ssr: false })` **after** hero DOM has painted (`requestIdleCallback` with timeout fallback). Until ready, show the CSS ocean gradient (same as static fallback) so there is no blank flash.
- `frameloop="always"` on `/`; **pause (`"never"`) on `/projects/[slug]`**; pause when tab hidden and when canvas is fully off-screen.
- Assets are **procedural** (no external model files required). Architect `Whale`, `Jellyfish`, `Iceberg` so a compressed GLB (Draco/Meshopt) can be swapped in later without changing callers.

### 7.2 Environment
- **Surface:** stylised water plane with a custom shader (layered wave normals, foam-free, soft sun specular). Warm directional sun; bright sky gradient; soft haze at horizon.
- **Underwater:** depth-based fog colour, light shafts (additive planes, low opacity, slow drift), floating particles (plankton-like, slow).
- **Look:** 3D cinematic + clay/3D-illustration polish — stylised, premium, not photorealistic-documentary.
- Parallax between at least 3 depth layers (far haze, mid, near particles).

### 7.3 Whales (only large marine animal)
- Stylised smooth-bodied whales, slow swim with tail/body undulation (vertex shader or bone-free bend).
- Behaviours: gentle swim, **occasional surface jump** (random every 25–45s, only when in view and only in Z1–Z2), dive, and swim **around** project icebergs.
- Whales stay in background/edge lanes and **never cross behind the hero clay panel or important text** during readable moments. They must never be a distraction.

### 7.4 Jellyfish
- Pulsing bell (vertex shader), trailing tentacles (thin lines or instanced strips), slow natural drift, subtle vertical bobbing.
- Bioluminescent: emissive material + additive glow sprite. **Do not use one real-time point light per jellyfish** (performance); fake glow only. Optional single shared soft light in high tier.
- Palette: cyan, electric blue, restrained magenta accents (≤ 1 in 4 jellyfish has magenta).
- They provide ambient lighting feel, more visible from Z3 downward.

### 7.5 Cursor ripple (desktop only)
- Only when `(pointer: fine)` and motion allowed and tier ≥ 2.
- Pointer raycast on the water plane pushes a ring-buffered ripple (max 8 active) into the water shader; ripples decay over ~2s.
- Underwater zones: same pointer position gently displaces nearby particles (uniform-based, no CPU loops).
- Effect must stay subtle and never overpower content. **Mobile: no cursor behaviour at all.**

### 7.6 Camera rig
`CameraRig` reads `scrollProgress` from the store and maps to camera Y/tilt/FOV per zone table (Section 5.2) using damping (`maath` is NOT allowed; use a small local damp function or drei helpers). Optional tiny pointer-parallax (desktop, ≤ 1.5° equivalent). Fully disabled with reduced motion.

### 7.7 Quality tiers (see also Section 11)
| Tier | Target | DPR cap | Whales | Jellyfish | Particles | Ripple | Post-FX | Ice material |
|---|---|---|---|---|---|---|---|---|
| 3 High | Desktop, capable GPU | 1.75 | 2 | 8 | 600 | ✅ | Light bloom | Physical (transmission) |
| 2 Medium | Desktop, modest GPU | 1.5 | 1 | 5 | 300 | ✅ | ❌ | Standard + fresnel fake |
| 1 Low | Mobile / weak GPU | 1 | 1 (simple path) | 3 | 120 | ❌ | ❌ | Simplified low-poly |
| 0 Static | No WebGL2 / reduced motion / user off | — | SVG silhouettes | — | — | ❌ | ❌ | CSS/SVG |

Runtime guard: if average FPS < 45 over 3 seconds, drop one tier (once, then persist for the session).

---

## 8. SECTION SPECIFICATIONS

Every section has **distinct desktop and mobile compositions**. Mobile is not a scaled desktop.

### 8.1 Navigation
**Desktop — floating glass navbar**
- Fixed, centred, rounded, glass recipe, readable over the animated ocean.
- Items: `MAR.` (logo/home) · `WORK` · `SKILLS` · `JOURNEY` · `CONTACT` · `RESUME` (secondary action).
- Smooth scroll to anchors; **active section indicator** via IntersectionObserver.
- Keyboard accessible, visible focus ring, `aria-current="true"` on active item.
- On project routes: nav shows "← RETURN TO OCEAN" as the primary item.

**Mobile — glass bottom navigation**
- 5 items: `HOME · WORK · SKILLS · JOURNEY · CONTACT` with icon + label.
- Touch targets ≥ 48×48px, safe-area padding (`env(safe-area-inset-bottom)`).
- Minimal height (~64px) to preserve ocean visibility. Active state clearly indicated. No top navbar except a small `MAR.` mark.

### 8.2 Hero (`#home`) — Claymorphism + cinematic ocean
**Desktop composition:** left-weighted clay panel containing all text; sun glow upper right; a whale in the far right lane; jellyfish subtle at lower left; icebergs visible at horizon hinting the next section.
**Mobile composition:** clay panel centred in the upper 60%; simplified ocean; single whale; "scroll" cue at bottom above bottom-nav.

Copy (verbatim, uppercase as shown):
```text
[micro-label]  IT STUDENT · DATA SCIENCE ENGINEER
[H1]           MOHAMMED ABDUL RAHIM
[statement]    I BUILD THOUGHTS IN REAL WORLD
[concept]      THE EARTH REVOLVES AROUND SUN PERFECTLY AND YOUR PROJECTS WILL RUN UNDER ME
[primary CTA]  EXPLORE MY WORK      → scrolls to #work
[secondary]    LET'S BUILD          → scrolls to #contact
[tertiary]     VIEW RESUME · DOWNLOAD RESUME   (hidden until resume.available)
```
- Text is set in `--clay-ink` on the clay panel (guaranteed contrast). Hero content is **real HTML that paints before WebGL loads**.
- **WHAT I BUILD strip** (copy-approval flag, small chips under the CTAs):
  `AI-POWERED PRODUCTS · FULL-STACK WEB PLATFORMS · DATA-DRIVEN TOOLS`
  (derived strictly from Nova Class, Materna and Cyber Lens categories.)
- Resume must be visible but less prominent than "EXPLORE MY WORK".

### 8.3 Work / Project icebergs (`#work`) — signature interaction
**Desktop**
- Sticky stage: 3 icebergs visible in a staggered composition (Nova Class centre-forward, Cyber Lens left-back, Materna right-mid), whales circling behind, jellyfish drifting between.
- Icebergs: translucent frosted ice with visible submerged mass; cyan/blue/magenta neon circuitry veins; floating data glyphs; soft atmospheric glow. **Cyberpunk treatment is limited to icebergs and project views** — the ocean stays natural.
- **Hover** (in this order, ≤ 350ms total): iceberg subtly lifts/tilts and glow rises → holographic panel appears (title, category, short line, `EXPLORE →`) → cursor becomes pointer → nearby particles/water react subtly.
- Hologram is a real DOM element via drei `<Html>` containing an `<a href="/projects/[slug]">` so it is keyboard focusable. Focus shows the same state as hover.
- **Click:** run the *Enter Iceberg* transition (8.4), then navigate.

Hover panel content:
```text
┌──────────────────────┐
│ NOVA CLASS           │
│ FULL STACK · WEB     │
│ EXPLORE →            │
└──────────────────────┘
```

**Mobile**
- Section becomes a **snap-scrolling iceberg rail**: one iceberg per snap page (simplified low-poly composition), title + category visible immediately.
- **Tap** an iceberg → preview card slides up (title, category, one-line description, tech chips). Second action `OPEN PROJECT` button (≥ 48px) opens the project. (Tap = reveal; button = open; no accidental navigation.)
- No hover logic, no cursor effects.

**Accessible equivalent (mandatory, both platforms):** below/alongside the stage render a real semantic `<ul>` of project cards (title, category, description, link). It is visually integrated (glass cards) and never hidden behind animation.

### 8.4 Enter-Iceberg transition
1. Lock pointer input, mark `transition = "entering"`.
2. Camera dollies toward the clicked iceberg while a cyan-tinted glass wipe grows from the iceberg's screen position (≤ 900ms total).
3. `router.push('/projects/[slug]')`; canvas pauses after route mount.
4. Project view reveals with a grid/line "boot" (no flashing, respects the 3-per-second rule).
5. **Return:** `← RETURN TO OCEAN` (also `Esc`, and browser back) runs the reverse — wipe out, canvas resumes, scroll restores to `#work` with the previous iceberg centred.
- **Reduced motion / tier 0:** replace all of the above with a 150ms crossfade.
- The transition must never trap the user; a second click/`Esc` during the transition completes it instantly.

### 8.5 Project View (`/projects/[slug]`) — strong cyberpunk
Layout order (omit any section whose data is `null`):
```text
← RETURN TO OCEAN                                (sticky, always visible)
PROJECT NAME  ·  CATEGORY  ·  STATUS
PROJECT HERO VISUAL   (generated cyberpunk visual or supplied heroImage)
WHAT IT IS
THE PROBLEM
THE SOLUTION
KEY FEATURES          (grid of cards)
TECH STACK            (chips)
MY ROLE
RESULT / STATUS
[ LIVE DEMO ]  [ GITHUB ]                        (hidden/“Coming soon” if null)
NEXT PROJECT →  (loops through the 3 icebergs)
```
- Dark `--cp-bg`, mono micro-labels, cyan outlines, restrained magenta.
- Readable long-form text (Manrope, ≥ 16px, max-width ~70ch).
- Project safety notice block (see Materna) rendered near the top when `project.notice` exists.
- Desktop: two-column (sticky index left, content right). Mobile: single column with a sticky compact header and floating `RETURN` button.
- Placeholder project: banner "Full case study in progress." plus whatever verified fields exist.

### 8.6 Skills (`#skills`) — deeper water
- Visual: **"Depth map"** — 5 category clusters (glass cards) with skill nodes; nodes glow softly like jellyfish; hover/focus reveals level label.
- **No percentages and no fake bars.** Level is a 3-step qualitative scale: `1 Foundational · 2 Intermediate · 3 Advanced`, rendered as 3 small depth-rings (filled count = level). All skills default to **2** until owner edits.
- Desktop: 2×3 cluster grid with ambient jellyfish behind. Mobile: vertical accordion list of categories (all skills readable without hover).
- Skills list is in Section 9.5.

### 8.7 Journey (`#journey`) — deep ocean
Vertical dive path that continues the underwater metaphor.
- **Growth ladder** (left/centre line with nodes):
  `SURFACE → IT STUDENT → DATA SCIENCE → AI / GEN AI → PRODUCT BUILDING → GEN AI ENGINEER`
  The final node is labelled **"DIRECTION"**, not "achieved". No claim of expertise beyond what the owner stated.
- **Waypoints** (glass cards attached to the path):
  1. Education — Information Technology, ISL Engineering College, 3rd year, expected graduation 2028. Academic score 73% shown small/secondary (`site.education.showScore`, default `true`); projects get visual priority.
  2. Smart India Hackathon — ArogyaMitr.
  3. SPEC's Industry Hack 2026 — 24-hour national-level hackathon at St. Peter's Engineering College, with Team Punk Records.
  4. HackForge 2.0 — 12-hour rapid-innovation team hackathon at ISL Engineering College; agile software prototypes and UI prototyping.
- **Do NOT invent** awards, rankings, wins, dates, or roles. Order = as listed until owner confirms chronology.
- Mobile: single-column vertical timeline, cards full width.

### 8.8 Contact + Footer (`#contact`) — one glassmorphism section
```text
Headline:    LET'S BUILD SOMETHING REAL.
Supporting:  Available for profitable freelance projects, collaborations, and research opportunities.
Prompt:      Have a problem worth building? Let's talk.
Primary CTA: START A CONVERSATION   → mailto:<email>?subject=Project%20enquiry
Actions:     EMAIL ME · LINKEDIN · GITHUB · VIEW RESUME · DOWNLOAD RESUME
Footer row:  © <current year> Mohammed Abdul Rahim · Back to top ↑
```
- Contact must be reachable in **≤ 2 interactions** from anywhere (`CONTACT` in nav; `LET'S BUILD` in hero).
- `EMAIL ME` includes a "Copy email" secondary control with an `aria-live` "Copied" confirmation.
- Any action whose URL is `null` is not rendered (Section 2.1).
- Calm final zone: minimal motion, soft cyan haze, one slow whale silhouette far away at most.

### 8.9 Resume (three placements)
Desktop navbar, hero, contact/footer. Two actions: **View** (opens PDF in new tab, `rel="noopener"`) and **Download** (`download` attribute). Hidden until `resume.available = true`.

---

## 9. DATA LAYER

### 9.1 Canonical types (`src/data/types.ts`)
```ts
export type Accent = "cyan" | "blue" | "magenta";
export type ContentStatus = "verified" | "placeholder";

export type Project = {
  id: string;                    // stable id
  slug: string;                  // URL segment
  order: number;                 // iceberg order
  title: string;                 // uppercase display title
  category: string;
  shortDescription: string | null;
  status: string | null;         // e.g. "Portfolio project"
  contentStatus: ContentStatus;
  iceberg: {
    model: "iceberg-01" | "iceberg-02" | "iceberg-03";
    position: [number, number, number];
    scale: number;
    accent: Accent;
  };
  thumbnail?: string;
  heroImage?: string;
  github: string | null;
  liveDemo: string | null;
  techStack: string[];
  notice?: string;               // safety / legal notice shown on project view
  details: {
    whatItIs: string | null;
    problem: string | null;
    solution: string | null;
    features: string[];
    role: string | null;
    results: string | null;
  };
};

export type SkillLevel = 1 | 2 | 3;
export type Skill = { id: string; name: string; category: SkillCategory; level: SkillLevel };
export type SkillCategory = "AI / Data" | "Development" | "Backend / Data" | "AI Automation / Tools";

export type Waypoint = {
  id: string; title: string; kind: "education" | "hackathon";
  organisation: string | null; description: string | null; date: string | null;
};

export type SiteConfig = {
  name: string; role: string; futureRole: string;
  statement: string; concept: string;
  links: { email: string | null; linkedin: string | null; github: string | null };
  resume: { available: boolean; path: string };
  education: { degreeLabel: string; institution: string; year: string; expectedGraduation: string; score: string; showScore: boolean };
};
```

### 9.2 `site.ts` seed
```ts
export const site: SiteConfig = {
  name: "MOHAMMED ABDUL RAHIM",
  role: "IT STUDENT · DATA SCIENCE ENGINEER",
  futureRole: "GEN AI ENGINEER",
  statement: "I BUILD THOUGHTS IN REAL WORLD",
  concept: "THE EARTH REVOLVES AROUND SUN PERFECTLY AND YOUR PROJECTS WILL RUN UNDER ME",
  links: { email: null, linkedin: null, github: null },
  resume: { available: false, path: "/resume/Mohammed_Abdul_Rahim_Resume.pdf" },
  education: {
    degreeLabel: "Information Technology (Undergraduate)", // update after owner confirms B.Tech / B.E.
    institution: "ISL Engineering College",
    year: "3rd Year",
    expectedGraduation: "2028",
    score: "73%",
    showScore: true,
  },
};
```

### 9.3 `projects.ts` seed (verified content only)
```ts
export const projects: Project[] = [
  {
    id: "nova-class", slug: "nova-class", order: 1, title: "NOVA CLASS",
    category: "Full Stack · Web Platform",
    shortDescription: "Smart attendance system for organizational roll-call tracking.",
    status: "Portfolio project", contentStatus: "verified",
    iceberg: { model: "iceberg-01", position: [0, 0, 0], scale: 1.2, accent: "cyan" },
    github: null, liveDemo: null,
    techStack: ["TypeScript", "React", "Node.js", "SQL / PostgreSQL", "REST API", "Vercel"],
    details: {
      whatItIs: "A web platform for organizational roll-call tracking.",
      problem: null, solution: null,
      features: [
        "Administration",
        "Sessions",
        "Attendance logging",
        "Reporting",
        "Role-based access",
        "Live attendance visibility",
        "Exports",
      ],
      role: null, results: null,
    },
  },
  {
    id: "cyber-lens", slug: "cyber-lens", order: 2, title: "CYBER LENS",
    category: "AI / Security",
    shortDescription: null, status: null, contentStatus: "placeholder",
    iceberg: { model: "iceberg-02", position: [-4, 0, -3], scale: 1.0, accent: "magenta" },
    github: null, liveDemo: null, techStack: [],
    details: { whatItIs: null, problem: null, solution: null, features: [], role: null, results: null },
  },
  {
    id: "materna", slug: "materna", order: 3, title: "MATERNA",
    category: "AI / Health Tech",
    shortDescription: "AI-powered maternal wellness companion for personalized guidance, nutrition timelines and symptom analysis.",
    status: "Portfolio project", contentStatus: "verified",
    iceberg: { model: "iceberg-03", position: [4, 0, -1.5], scale: 1.1, accent: "blue" },
    github: null, liveDemo: null, techStack: [],
    notice: "MaternaGuard is a portfolio project. It does not diagnose conditions, does not replace clinicians, and does not provide prescription or dosage advice.",
    details: {
      whatItIs: "MaternaGuard — an AI-powered maternal wellness companion.",
      problem: null, solution: null,
      features: [
        "Onboarding",
        "AI chat assistant",
        "Nutrition timeline",
        "Symptom analysis",
        "Red-flag rules engine",
        "Daily check-ins",
        "Reminders",
        "Exportable summaries",
      ],
      role: null, results: null,
    },
  },
];
```
Rules:
- Positions are starting values; tune visually in Phase 5 but keep them in data.
- Do not add features, metrics, or tech that are not listed above.
- If `docs/source/projects.md` exists, the agent may add **only facts explicitly stated there** (e.g. Materna tech stack) and must list each addition in the walkthrough.
- The Materna `notice` must render on the project view above the fold and wherever a live demo link is surfaced.
- Adding a 4th+ project = add one object to this array; iceberg field, project view, mobile rail and accessible list must all pick it up automatically.

### 9.4 `journey.ts` seed
```ts
export const ladder = ["SURFACE","IT STUDENT","DATA SCIENCE","AI / GEN AI","PRODUCT BUILDING","GEN AI ENGINEER"]; // last = "DIRECTION"
export const waypoints: Waypoint[] = [
  { id: "education", title: "Information Technology", kind: "education", organisation: "ISL Engineering College", description: "3rd year · Expected graduation 2028", date: null },
  { id: "sih", title: "Smart India Hackathon — ArogyaMitr", kind: "hackathon", organisation: null, description: null, date: null },
  { id: "spec-industry-hack", title: "SPEC's Industry Hack 2026", kind: "hackathon", organisation: "St. Peter's Engineering College", description: "24-hour national-level hackathon · Team Punk Records", date: null },
  { id: "hackforge", title: "HackForge 2.0", kind: "hackathon", organisation: "ISL Engineering College", description: "12-hour rapid-innovation team hackathon focused on agile software prototypes and UI prototyping", date: null },
];
```

### 9.5 `skills.ts` seed (all `level: 2` by default)
| Category | Skills |
|---|---|
| AI / Data | Generative AI · Machine Learning · Data Science · Large Language Models · AI Agents |
| Development | Python · JavaScript / TypeScript · React · Next.js · HTML / CSS |
| Backend / Data | Node.js · REST APIs · SQL / PostgreSQL |
| AI Automation / Tools | AI Workflow Automation · Git / GitHub |

Total: 15 skills. Do not present any as expert-level.

---

## 10. ACCESSIBILITY (WCAG 2.2 AA target)

- Semantic landmarks: `header`, `nav`, `main`, `section` with headings in order (one `h1`), `footer`.
- **Skip link** to `#main` as the first focusable element.
- Full keyboard operation; visible focus ring (≥ 3:1) on every interactive element; logical tab order; icebergs reachable via their DOM hologram anchors and the accessible project list.
- Canvas `aria-hidden="true"`; decorative SVG `aria-hidden`; meaningful images have alt text.
- Contrast AA everywhere (text over glass verified in every zone).
- **Reduced motion:** honour `prefers-reduced-motion: reduce` automatically → Tier 0 (static ocean composition: CSS gradient + SVG whale/jellyfish silhouettes, no parallax, no ripple, crossfade transitions). Also provide a visible **Motion: On/Off** toggle (persisted in `localStorage`, wrapped in try/catch).
- No flashing/strobing (≤ 3 luminance changes per second, small areas only).
- Touch targets ≥ 44px (mobile nav ≥ 48px). Text ≥ 16px body, ≥ 11px micro labels (uppercase mono only).
- `aria-live="polite"` for copy-email feedback. Route change moves focus to the project `h1`; returning focuses the iceberg link that opened it.
- Automated axe run must report **0 serious/critical** violations on `/` and each project page.

---

## 11. PERFORMANCE

**Principle:** meaningful content is visible immediately, even if 3D never loads.

Budgets (mobile-throttled Lighthouse, production build):
| Metric | Target |
|---|---|
| LCP | ≤ 2.5 s |
| CLS | ≤ 0.05 |
| TBT | ≤ 200 ms |
| Lighthouse Performance | ≥ 90 desktop / ≥ 75 mobile |
| Lighthouse Accessibility / Best Practices / SEO | ≥ 95 / ≥ 95 / ≥ 95 |
| Initial JS before canvas (gzip) | ≤ 170 KB |
| Total external 3D assets | ≤ 3 MB (procedural = ~0) |

Requirements:
- Hero HTML/CSS/fonts render first; canvas + post-FX + per-project scenes are lazy-loaded (`dynamic`, `Suspense`, idle callback).
- `next/font` with `display: swap`; preload only hero fonts.
- Clamp DPR per tier; instanced meshes for particles; reuse geometries/materials; dispose on unmount.
- No per-frame allocations in `useFrame`; no React state updates per frame (use refs/uniforms).
- Pause rendering when tab hidden, canvas off-screen, or on project routes.
- Detect tier via detect-gpu + `matchMedia('(pointer: fine)')` + `navigator.hardwareConcurrency` / `deviceMemory` where available; WebGL2 missing → Tier 0.
- Runtime FPS guard (Section 7.7).
- Graceful fallback: any WebGL context error must render Tier 0 without throwing (error boundary around `<OceanStage/>`).

---

## 12. SEO & METADATA

- `<title>`: `Mohammed Abdul Rahim — IT Student · Data Science Engineer`
- Description (copy-approval flag): `Interactive portfolio of Mohammed Abdul Rahim: AI, data science and full-stack projects. Available for freelance work, collaborations and research.`
- Open Graph + Twitter card with `public/og/og-image.png` (generate a static branded image; no fabricated content).
- `Person` JSON-LD (name, jobTitle, `sameAs` = non-null links only).
- `sitemap.ts` (home + every project slug), `robots.ts`, canonical URLs, `lang="en"`, favicon (simple "M" mark).
- Project pages: unique title/description from `projects.ts` (fallback to category if description is null).

---

## 13. TESTING & QA

### 13.1 Playwright projects
`desktop` (1440×900 Chromium), `mobile` (iPhone 14 profile, 390×844), `reduced-motion` (Chromium with `reducedMotion: "reduce"`).

### 13.2 Required tests
| # | Test | Pass condition |
|---|---|---|
| 1 | Home loads, hero text visible before canvas ready | H1 + CTAs visible ≤ LCP budget |
| 2 | Desktop nav → each anchor | Scrolls, active indicator updates |
| 3 | Mobile bottom nav | 5 items, ≥ 48px targets, navigates |
| 4 | Iceberg hover (desktop) | Hologram with title appears |
| 5 | Iceberg tap → preview → open (mobile) | Preview first, navigation only on `OPEN PROJECT` |
| 6 | Keyboard: Tab to project link → Enter | Opens project view |
| 7 | Project view → `Esc` / Return button / browser back | Returns to `/#work` |
| 8 | Null-link handling | No `href="#"`, no empty hrefs, no "TODO" text in DOM |
| 9 | Materna page | Safety notice visible without scrolling on desktop and mobile |
| 10 | Reduced motion | Tier 0 renders, no canvas, all sections usable |
| 11 | WebGL disabled | Tier 0 fallback, no errors |
| 12 | axe scan (`/`, each project) | 0 serious/critical |
| 13 | Console | 0 errors/warnings on all pages |
| 14 | 320px width | No horizontal scroll, name does not overflow |
| 15 | Adding a mock 4th project in a test fixture | Appears in iceberg field, rail, list, sitemap |

### 13.3 Manual visual QA (agent uses the Antigravity browser)
Capture screenshots for each zone on desktop and mobile; check text legibility over glass in Z3–Z5; check whales never obscure hero text; check no flashing.

---

## 14. BUILD PHASES (strict order, owner approval after each)

Each phase: Implementation Plan artifact → build → quality gates (lint/typecheck/build + browser check) → Walkthrough artifact with screenshots → commit → **STOP for approval**.

| Phase | Scope | Done when (acceptance criteria) |
|---|---|---|
| **0. Foundation** | Scaffold Next.js/TS/Tailwind, install listed deps, write `/AGENTS.md`, tokens, fonts, folder structure, data files + types, `check:content` script, scripts in `package.json`, ESLint/Prettier, Playwright config | `dev`, `build`, `lint`, `typecheck` pass; `check:content` lists open items; folder structure matches Section 4.3 |
| **1. Design system + wireframes** | `GlassSurface`, `ClaySurface`, `Button`, `MotionToggle`, `SkipLink`; static (no-3D) page skeleton for all sections; desktop and mobile layouts with real copy and CSS-gradient ocean | Both breakpoints look intentionally designed; glass and clay recipes visibly correct; contrast AA; no 3D yet |
| **2. Navigation** | Desktop glass navbar, mobile glass bottom nav, active-section observer, smooth scroll, resume actions (hidden logic) | Test 2, 3 pass; focus states visible; safe-area respected |
| **3. Hero** | Clay hero panel, CTAs, WHAT I BUILD strip, scroll cue | Hero paints without JS-heavy deps; text contrast ≥ AAA on clay; fits 320px |
| **4. Ocean scene prototype** | `OceanStage` (lazy), water shader, sky/sun, underwater fog + rays, particles, `CameraRig` with scroll zones, tier system + FPS guard, Tier 0 fallback, error boundary | Smooth scroll through all 5 zones at 55+ fps on desktop tier 3; tier fallbacks verified; reduced-motion → Tier 0; no console errors |
| **5. Creatures** | Whale (swim, jump, dive, around icebergs), jellyfish swarm (glow, drift) with per-tier counts | Only whales + jellyfish exist; whale never crosses hero text; no per-jellyfish real-time lights |
| **6. Icebergs + interaction** | `Iceberg` procedural cyberpunk, hover holograms via `<Html>`, mobile rail + tap-preview, accessible project list, cursor ripple (desktop) | Tests 4, 5, 6 pass; hover sequence per 8.3; ripple subtle and capped |
| **7. Project views + transition** | `/projects/[slug]`, Enter-Iceberg transition and return, Materna notice, placeholder handling, next-project navigation | Tests 7, 8, 9 pass; reduced-motion crossfade works; canvas pauses on project routes |
| **8. Skills** | Depth-map skills section (desktop clusters, mobile accordion) | 15 skills shown, no percentages, all readable without hover |
| **9. Journey** | Dive ladder + waypoints (desktop and mobile) | Final node labelled "DIRECTION"; no invented claims; readable in Z4 |
| **10. Contact + footer** | Combined glass section, mailto CTA, copy-email, resume placements, links hidden when null | Contact reachable ≤ 2 interactions; null links not rendered |
| **11. Performance pass** | Bundle audit, lazy boundaries, asset/texture check, LHCI budgets | Section 11 budgets met (or documented exceptions) |
| **12. Accessibility pass** | Full axe + keyboard + screen-reader sanity + reduced-motion review | Test 12 = 0 serious/critical; all Section 10 items satisfied |
| **13. SEO + QA + release** | Metadata, OG, JSON-LD, sitemap, robots, full Playwright suite, final report, Vercel deploy config | All 15 tests pass; final report lists remaining placeholders and copy-approval items |

---

## 15. GLOBAL UX RULES (checklist for every phase)

1. Never hide important information exclusively behind animation.
2. Every iceberg has an accessible equivalent project link.
3. Project titles are understandable on hover **and** tap.
4. Contact is always easy to reach.
5. No autoplay sound (there is no sound).
6. No flashing cyberpunk effects.
7. The ocean never reduces text readability.
8. Users can exit a project view instantly.
9. Mobile has its own interaction model.
10. Reduced-motion users get a fully functional alternative.
11. The user is never trapped in an animation; native scrolling is never hijacked.

---

## 16. DEFINITION OF DONE

- [ ] All phases 0–13 approved by the owner.
- [ ] `npm run lint`, `typecheck`, `build`, `test:e2e`, `test:a11y`, `lhci` all pass.
- [ ] Ocean feels memorable; navbar clearly glass; hero clearly clay; icebergs clearly communicate navigation; project views clearly cyberpunk; contact/footer clearly glass.
- [ ] Desktop and mobile are visibly different compositions.
- [ ] Only whales and jellyfish appear. No audio.
- [ ] No fabricated content anywhere; every placeholder listed in the final report.
- [ ] A first-time visitor can state what Mohammed builds, what he could build for them, and how to contact him.

---

## 17. OWNER CHECKLIST (before production deploy)

```text
[ ] Email address                       → src/data/site.ts
[ ] LinkedIn URL                        → src/data/site.ts
[ ] GitHub URL                          → src/data/site.ts
[ ] Resume PDF                          → public/resume/ + resume.available = true
[ ] Confirm degree label (B.Tech or B.E.)
[ ] Nova Class GitHub + live demo URLs
[ ] Nova Class: problem, solution, your role, results (optional)
[ ] Cyber Lens: description, problem, solution, features, tech stack, GitHub, live demo, status
[ ] Materna: tech stack, GitHub, live demo, your role, results (optional)
[ ] Project screenshots (optional; generated visuals used until then)
[ ] Adjust skill levels individually (default = Intermediate)
[ ] Hackathon dates and chronological order (optional)
[ ] Approve copy-approval flags (Section 2.3)
[ ] Profile photo (optional)
[ ] Run: STRICT_CONTENT=1 npm run check:content  → must pass
```

---

## 18. FINAL PRODUCT STATEMENT

> **Mohammed Abdul Rahim doesn't just learn technology — he turns ideas into things people can interact with.**

The ocean is the world. The icebergs are the projects. The deeper the visitor goes, the more they discover. And the final destination is a simple conversation with the builder.
