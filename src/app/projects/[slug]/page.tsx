import { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ProjectView } from "@/components/projects/ProjectView";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
    return {
      title: "Project Not Found — Mohammed Abdul Rahim",
    };
  }

  return {
    title: `${project.title} — Mohammed Abdul Rahim`,
    description:
      project.shortDescription ||
      `${project.title} (${project.category}) project architecture by Mohammed Abdul Rahim.`,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectView project={project} />;
}
