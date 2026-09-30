import type { Metadata } from "next";
import { Sora, Manrope, JetBrains_Mono } from "next/font/google";
import { SkipLink } from "@/components/ui/SkipLink";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { MobileBottomNav } from "@/components/navigation/MobileBottomNav";
import { site } from "@/data/site";
import "@/styles/globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammed Abdul Rahim — IT Student · Data Science Engineer",
  description:
    "Interactive portfolio of Mohammed Abdul Rahim: AI, data science and full-stack projects. Available for freelance work, collaborations and research.",
  metadataBase: new URL("https://mar-portfolio.vercel.app"),
  openGraph: {
    title: "Mohammed Abdul Rahim — IT Student · Data Science Engineer",
    description:
      "Interactive portfolio of Mohammed Abdul Rahim: AI, data science and full-stack projects. Available for freelance work, collaborations and research.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mohammed Abdul Rahim — Interactive Ocean Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Abdul Rahim — IT Student · Data Science Engineer",
    description:
      "Interactive portfolio of Mohammed Abdul Rahim: AI, data science and full-stack projects. Available for freelance work, collaborations and research.",
    images: ["/og/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description:
      "Interactive portfolio of Mohammed Abdul Rahim: AI, data science and full-stack projects.",
    url: "https://mar-portfolio.vercel.app",
    sameAs: [site.links.linkedin, site.links.github].filter(Boolean),
    alumniOf: {
      "@type": "EducationalOrganization",
      name: site.education.institution,
    },
  };

  return (
    <html
      lang="en"
      className={`${sora.variable} ${manrope.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="relative min-h-screen bg-[#072A4F] text-[#E6ECF5] antialiased selection:bg-[#22E5FF] selection:text-[#05080F]">
        {/* Skip Link for Keyboard Accessibility (PRD Section 10) */}
        <SkipLink targetId="main" label="Skip to main content" />

        {/* Global Navigation Components */}
        <DesktopNav />

        {/* Main Content Area */}
        {children}

        {/* Mobile Navigation */}
        <MobileBottomNav />
      </body>
    </html>
  );
}
