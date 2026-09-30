import { Hero } from "@/components/hero/Hero";
import { IcebergField } from "@/components/icebergs/IcebergField";
import { SkillsDepthMap } from "@/components/skills/SkillsDepthMap";
import { JourneyDive } from "@/components/journey/JourneyDive";
import { ContactFooter } from "@/components/contact/ContactFooter";
import { OceanStage } from "@/components/ocean/OceanStage";
import { ActiveSectionObserver } from "@/components/navigation/ActiveSectionObserver";

export default function HomePage() {
  return (
    <>
      {/* Persistent Ocean Stage: Static gradient base + lazy R3F WebGL ocean */}
      <OceanStage />

      {/* Dynamic Active Section Tracker */}
      <ActiveSectionObserver />

      {/* Main Single-Page Immersive Depth Stack */}
      <main id="main" className="relative z-10 w-full min-h-screen">
        {/* Zone 1: Surface (#home) */}
        <Hero />

        {/* Zone 2: The Waterline & Icebergs (#work) */}
        <IcebergField />

        {/* Zone 3: Deeper Waters (#skills) */}
        <SkillsDepthMap />

        {/* Zone 4: Deep Ocean Dive (#journey) */}
        <JourneyDive />

        {/* Zone 5: Calm Final Depths (#contact) */}
        <ContactFooter />
      </main>
    </>
  );
}
