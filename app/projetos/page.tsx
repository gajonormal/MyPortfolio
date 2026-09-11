"use client";

import { useState } from "react";
import ProjectViews from "@/components/ProjectViews";
import ProjectModal from "@/components/ProjectModal";

export default function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="projects" className="page-section active">
      <ProjectViews onOpenModal={() => setIsModalOpen(true)} />
      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
