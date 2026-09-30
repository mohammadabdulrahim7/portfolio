# Mohammed Abdul Rahim — Portfolio

An immersive, photorealistic 3D interactive portfolio built with **Next.js (App Router)**, **React**, **Three.js / React Three Fiber**, and **Tailwind CSS**.

---

## 🌊 Overview & Realism Highlights

- **Photorealistic Ocean Simulation:**
  - Afternoon sun & sky with Fresnel reflectance, specular sun glitter, and waterline foam rings.
  - Submerged depth absorption fog, dynamic caustics, and god rays.
  - Multi-octave facet noise glacial icebergs with deep turquoise subsurface glow.
- **Marine Life:**
  - Skinned and animated breaching humpback whales with dynamic surface splash and foam wake.
  - Translucent *Aurelia aurita* moon jellyfish featuring rhythmic pulse propulsion, trailing marginal tentacles, and bioluminescent inner glow.
- **Adaptive Performance:**
  - 4-Tier Hardware Quality Controller (Tier 0 static fallback to Tier 3 high-fidelity post-FX).
  - Continuous runtime FPS guard dynamically scaling DPR and particle counts to maintain locked 60 FPS.
- **Architecture & Accessibility:**
  - Strict compliance with WCAG accessibility guidelines, full keyboard navigation, and `prefers-reduced-motion` support.
  - Zero claymorphism tokens: sleek cinematic typography layered over responsive navy scrims and cyberpunk holographic overlays.

---

## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **3D & Graphics:** [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons & Animation:** Lucide Icons, Canvas 2D / WebGL shaders
- **Testing:** Playwright E2E test suite

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mohammadabdulrahim7/portfolio.git

# Navigate into the project folder
cd portfolio

# Install dependencies
npm install
```

### Running Locally

```bash
# Start development server
npm run dev

# Or build and run production server
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) (or the assigned port) to view the live experience.

---

## 📄 Licensing & Assets

All 3D models and assets used in this project are strictly public domain, CC0, or permissive open-source (MIT / BSD-3-Clause). Detailed attributions and license records are maintained in [`public/models/LICENSES.md`](./public/models/LICENSES.md).
