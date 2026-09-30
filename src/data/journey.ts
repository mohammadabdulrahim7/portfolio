import { Waypoint } from "./types";

export const ladder = [
  "SURFACE",
  "IT STUDENT",
  "DATA SCIENCE",
  "AI / GEN AI",
  "PRODUCT BUILDING",
  "GEN AI ENGINEER", // last = "DIRECTION"
];

export const waypoints: Waypoint[] = [
  {
    id: "education",
    title: "Information Technology",
    kind: "education",
    organisation: "ISL Engineering College",
    description: "3rd year · Expected graduation 2028",
    date: null,
  },
  {
    id: "sih",
    title: "Smart India Hackathon — ArogyaMitr",
    kind: "hackathon",
    organisation: null,
    description: null,
    date: null,
  },
  {
    id: "spec-industry-hack",
    title: "SPEC's Industry Hack 2026",
    kind: "hackathon",
    organisation: "St. Peter's Engineering College",
    description: "24-hour national-level hackathon · Team Punk Records",
    date: null,
  },
  {
    id: "hackforge",
    title: "HackForge 2.0",
    kind: "hackathon",
    organisation: "ISL Engineering College",
    description: "12-hour rapid-innovation team hackathon focused on agile software prototypes and UI prototyping",
    date: null,
  },
];
