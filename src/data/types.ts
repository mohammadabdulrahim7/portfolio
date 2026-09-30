export type Accent = "cyan" | "blue" | "magenta";
export type ContentStatus = "verified" | "placeholder";

export type Project = {
  id: string; // stable id
  slug: string; // URL segment
  order: number; // iceberg order
  title: string; // uppercase display title
  category: string;
  shortDescription: string | null;
  status: string | null; // e.g. "Portfolio project"
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
  notice?: string; // safety / legal notice shown on project view
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
export type SkillCategory = "AI / Data" | "Development" | "Backend / Data" | "AI Automation / Tools";
export type Skill = { id: string; name: string; category: SkillCategory; level: SkillLevel };

export type Waypoint = {
  id: string;
  title: string;
  kind: "education" | "hackathon";
  organisation: string | null;
  description: string | null;
  date: string | null;
};

export type SiteConfig = {
  name: string;
  role: string;
  futureRole: string;
  statement: string;
  concept: string;
  links: {
    email: string | null;
    linkedin: string | null;
    github: string | null;
  };
  resume: {
    available: boolean;
    path: string;
  };
  education: {
    degreeLabel: string;
    institution: string;
    year: string;
    expectedGraduation: string;
    score: string;
    showScore: boolean;
  };
};
