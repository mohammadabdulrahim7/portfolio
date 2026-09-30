"use client";

import React from "react";
import { projects } from "@/data/projects";
import { ProceduralIceberg } from "./ProceduralIceberg";

export const IcebergField3D: React.FC = () => {
  return (
    <group name="icebergs-field">
      {projects.map((project) => (
        <ProceduralIceberg key={project.id} project={project} />
      ))}
    </group>
  );
};
