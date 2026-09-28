"use client";

import { useState } from "react";
import ProjectViews from "@/components/ProjectViews";
import ProjectModal from "@/components/ProjectModal";
import { Project } from "@/data/projects";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="page-section active">
      <ProjectViews onOpenModal={(p) => setSelectedProject(p)} />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
