"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProjectViews({ onOpenModal }: { onOpenModal: () => void }) {
  const [activeView, setActiveView] = useState<"slices" | "grid">("slices");
  const [fadingView, setFadingView] = useState<"slices" | "grid" | null>(null);

  const switchView = (target: "slices" | "grid") => {
    if (activeView === target) return;
    setFadingView(activeView);
    setTimeout(() => {
      setActiveView(target);
      setFadingView(null);
    }, 300);
  };

  return (
    <>
      {/* Vista de Fatias (Destaques) */}
      {(activeView === "slices" || fadingView === "slices") && (
        <div id="projects-slices" className={`projects-view active-view ${fadingView === "slices" ? "fading-out" : ""}`}>
          <div className="slices-container">
            {["#1a1a1a", "#4a0000", "#3d3d3d", "#1a331a", "#8c4600", "#2b2b2b", "#666666", "#222222", "#5a0000", "#111111", "#8b7d6b", "#4a004a", "#333333", "#3a5c6e"].map((color, i) => (
              <div key={i} className="slice-item project-trigger" onClick={onOpenModal}>
                <span className="tag-new">novo</span>
                <div className="placeholder-img" style={{ backgroundColor: color }}></div>
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
                <a href="#" onClick={(e) => e.preventDefault()}>novo</a>
                <a href="#" onClick={(e) => e.preventDefault()}>frontend</a>
                <a href="#" onClick={(e) => e.preventDefault()}>backend</a>
                <a href="#" onClick={(e) => e.preventDefault()}>ui/ux</a>
                <a href="#" onClick={(e) => e.preventDefault()}>mobile</a>
                <a href="#" onClick={(e) => e.preventDefault()}>jogos</a>
                <a href="#" onClick={(e) => e.preventDefault()}>scripts</a>
                <a href="#" onClick={(e) => e.preventDefault()} className="active-category">tudo</a>
              </nav>
            </aside>
            <div className="grid-container">
              {["#1a1a1a", "#4a0000", "#3d3d3d", "#1a331a", "#8c4600", "#2b2b2b", "#666666", "#222222", "#5a0000", "#111111"].map((color, i) => (
                <div key={i} className="grid-item project-trigger" onClick={onOpenModal}>
                  <div className="placeholder-img" style={{ backgroundColor: color }}></div>
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
