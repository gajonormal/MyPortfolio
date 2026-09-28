"use client";

import { useState } from "react";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";

import { projects, Project } from "@/data/projects";

export default function ProjectViews({ onOpenModal }: { onOpenModal: (project: Project) => void }) {
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
              <div key={project.id} className="slice-item project-trigger" onClick={() => onOpenModal(project)}>
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
                <div key={project.id} className="grid-item project-trigger" onClick={() => onOpenModal(project)}>
                  <div className="placeholder-img" style={{ backgroundColor: project.color }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Toggles extra acima do footer */}
      <div style={{ 
        position: "fixed", 
        bottom: "90px", 
        left: 0, 
        right: 0, 
        width: "100%", 
        maxWidth: "900px", 
        margin: "0 auto", 
        padding: "0 20px", 
        display: "flex", 
        zIndex: 10 
      }}>
        <div style={{ display: "flex", fontSize: "16px", fontWeight: "normal" }}>
          <a
            href="#"
            className={`view-toggle ${activeView === "grid" ? "active-toggle" : ""}`}
            style={{ marginRight: "15px", color: activeView === "grid" ? "#000" : "#777", textDecoration: "none" }}
            onClick={(e) => { e.preventDefault(); switchView("grid"); }}
          >
            ver tudo
          </a>
          <a
            href="#"
            className={`view-toggle ${activeView === "slices" ? "active-toggle" : ""}`}
            style={{ color: activeView === "slices" ? "#000" : "#777", textDecoration: "none" }}
            onClick={(e) => { e.preventDefault(); switchView("slices"); }}
          >
            destaques
          </a>
        </div>
      </div>

      <GlobalFooter activePage="projetos" />
    </>
  );
}
