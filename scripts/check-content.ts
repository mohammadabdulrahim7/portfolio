import { site } from "../src/data/site";
import { projects } from "../src/data/projects";
import { waypoints } from "../src/data/journey";
import { skills } from "../src/data/skills";

interface OpenItem {
  location: string;
  field: string;
  currentValue: unknown;
  note: string;
}

const openItems: OpenItem[] = [];

// 1. Check Site Config
if (!site.links.email) {
  openItems.push({
    location: "site.links.email",
    field: "email",
    currentValue: site.links.email,
    note: "Owner contact email pending",
  });
}
if (!site.links.linkedin) {
  openItems.push({
    location: "site.links.linkedin",
    field: "linkedin",
    currentValue: site.links.linkedin,
    note: "Owner LinkedIn profile URL pending",
  });
}
if (!site.links.github) {
  openItems.push({
    location: "site.links.github",
    field: "github",
    currentValue: site.links.github,
    note: "Owner GitHub profile URL pending",
  });
}
if (!site.resume.available) {
  openItems.push({
    location: "site.resume.available",
    field: "resume",
    currentValue: site.resume.available,
    note: "Resume PDF pending in public/resume/Mohammed_Abdul_Rahim_Resume.pdf",
  });
}

// 2. Check Projects
projects.forEach((proj) => {
  if (proj.contentStatus === "placeholder") {
    openItems.push({
      location: `projects[${proj.slug}]`,
      field: "contentStatus",
      currentValue: proj.contentStatus,
      note: `Project '${proj.title}' is marked as placeholder; case study pending`,
    });
  }
  if (!proj.github) {
    openItems.push({
      location: `projects[${proj.slug}].github`,
      field: "github",
      currentValue: proj.github,
      note: `GitHub URL for '${proj.title}' pending`,
    });
  }
  if (!proj.liveDemo) {
    openItems.push({
      location: `projects[${proj.slug}].liveDemo`,
      field: "liveDemo",
      currentValue: proj.liveDemo,
      note: `Live demo URL for '${proj.title}' pending`,
    });
  }
  if (!proj.shortDescription) {
    openItems.push({
      location: `projects[${proj.slug}].shortDescription`,
      field: "shortDescription",
      currentValue: proj.shortDescription,
      note: `Short description for '${proj.title}' pending`,
    });
  }
  if (proj.techStack.length === 0) {
    openItems.push({
      location: `projects[${proj.slug}].techStack`,
      field: "techStack",
      currentValue: "[]",
      note: `Tech stack for '${proj.title}' pending`,
    });
  }
  if (!proj.details.problem) {
    openItems.push({
      location: `projects[${proj.slug}].details.problem`,
      field: "details.problem",
      currentValue: proj.details.problem,
      note: `Problem breakdown for '${proj.title}' pending`,
    });
  }
  if (!proj.details.solution) {
    openItems.push({
      location: `projects[${proj.slug}].details.solution`,
      field: "details.solution",
      currentValue: proj.details.solution,
      note: `Solution statement for '${proj.title}' pending`,
    });
  }
  if (proj.details.features.length === 0) {
    openItems.push({
      location: `projects[${proj.slug}].details.features`,
      field: "details.features",
      currentValue: "[]",
      note: `Feature list for '${proj.title}' pending`,
    });
  }
});

// 3. Check Waypoints
waypoints.forEach((wp) => {
  if (!wp.date) {
    openItems.push({
      location: `waypoints[${wp.id}].date`,
      field: "date",
      currentValue: wp.date,
      note: `Date/year for waypoint '${wp.title}' pending`,
    });
  }
  if (!wp.organisation && wp.kind === "hackathon") {
    openItems.push({
      location: `waypoints[${wp.id}].organisation`,
      field: "organisation",
      currentValue: wp.organisation,
      note: `Organisation for hackathon '${wp.title}' pending`,
    });
  }
  if (!wp.description) {
    openItems.push({
      location: `waypoints[${wp.id}].description`,
      field: "description",
      currentValue: wp.description,
      note: `Description for waypoint '${wp.title}' pending`,
    });
  }
});

console.log("================================================================================");
console.log("             MOHAMMED ABDUL RAHIM PORTFOLIO — CONTENT AUDIT                     ");
console.log("================================================================================");
console.log(`Audited items: ${projects.length} projects, ${skills.length} skills, ${waypoints.length} waypoints, site config`);
console.log(`Open placeholder/null fields: ${openItems.length}`);
console.log("--------------------------------------------------------------------------------");

openItems.forEach((item, idx) => {
  console.log(`[${idx + 1}] ${item.location} -> ${item.note}`);
});

console.log("================================================================================");

const isStrict = process.env.STRICT_CONTENT === "1";
if (isStrict && openItems.length > 0) {
  console.error(`\x1b[31m[FAIL]\x1b[0m STRICT_CONTENT=1 is enabled and ${openItems.length} placeholder fields are still open.`);
  process.exit(1);
} else {
  console.log(`\x1b[32m[OK]\x1b[0m Content check completed successfully (non-strict mode).`);
  process.exit(0);
}
