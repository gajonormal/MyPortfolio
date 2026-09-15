"use client";

import { useState } from "react";
import Link from "next/link";

import { projects } from "@/data/projects";

export default function ProjectViews({ onOpenModal }: { onOpenModal: () => void }) {
  const [activeView, setActiveView] = useState<"slices" | "grid">("slices");
  const [fadingView, setFadingView] = useState<"slices" | "grid" | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("tudo");

  const switchView = (target: "slices" | "grid") => {
    if (activeView === target) return;
    setFadingView(activeView);
    setTimeout(() => {
      setActiveView(target);
      setFadingView(null);
    }, 300);
  };

  const filteredProjects = activeCategory === "tudo" 
    ? projects 
    : projects.filter(p => p.category === activeCategory || (activeCategory === "novo" && p.isNew));

  return (
    <>
      {/* Vista de Fatias (Destaques) */}
      {(activeView === "slices" || fadingView === "slices") && (
        <div id="projects-slices" className={`projects-view active-view ${fadingView === "slices" ? "fading-out" : ""}`}>
          <div className="slices-container">
            {projects.slice(0, 14).map((project) => (
              <div key={project.id} className="slice-item project-trigger" onClick={onOpenModal}>
                {project.isNew && <span className="tag-new">novo</span>}
                <div className="placeholder-img" style={{ backgroundColor: project.color }}></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vista de Grelha (Ver Tudo) */}
      {(activeView === "grid" || fadingView === "grid") && (
        <div id="projects-grid" className={`projects-view active-view ${fadingView === "grid" ? "fading-out" : ""}`}>
          <div className="grid-layout">
            <aside className="grid-sidebar">
              <nav className="category-nav">
                {["novo", "frontend", "backend", "ui/ux", "mobile", "jogos", "scripts", "tudo"].map(cat => (
                  <a 
                    key={cat} 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); setActiveCategory(cat); }}
                    className={activeCategory === cat ? "active-category" : ""}
                  >
                    {cat}
                  </a>
                ))}
              </nav>
            </aside>
            <div className="grid-container">
              {filteredProjects.map((project) => (
                <div key={project.id} className="grid-item project-trigger" onClick={onOpenModal}>
                  <div className="placeholder-img" style={{ backgroundColor: project.color }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <footer className="spaced-footer">
        <div className="left-links">
          <span style={{ marginRight: "45px" }}>projetos</span>
          <a
            href="#"
            className={`view-toggle ${activeView === "grid" ? "active-toggle" : ""}`}
            style={{ marginRight: "15px" }}
            onClick={(e) => { e.preventDefault(); switchView("grid"); }}
          >
            ver tudo
          </a>
          <a
            href="#"
            className={`view-toggle ${activeView === "slices" ? "active-toggle" : ""}`}
            onClick={(e) => { e.preventDefault(); switchView("slices"); }}
          >
            destaques
          </a>
        </div>
        <div className="right-links">
          <Link href="/" className="nav-link">voltar</Link>
        </div>
      </footer>
    </>
  );
}
