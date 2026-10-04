"use client";

import { useEffect, useState, ReactNode } from "react";
import { Project } from "@/data/projects";

export default function ProjectModal({ project, onClose }: { project: Project | null, onClose: () => void }) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const isOpen = !!project;

  useEffect(() => {
    if (!isOpen) {
      setIsFadingOut(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onClose();
      setIsFadingOut(false);
    }, 300);
  };

  if (!isOpen && !isFadingOut) return null;

  return (
    <div 
      className={`modal-overlay ${isOpen && !isFadingOut ? "active" : ""} ${isFadingOut ? "fading-out" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="modal-content">
        <div className="modal-left">
          <br />
          <p><strong>{project?.title || "App React Native"}</strong></p>
          <br /><br />
          <p>{project?.dateLocation || "2025-2026 Porto, PT"}<br />{project?.role || "Development & Design"}</p>
          <br /><br /><br />
          <p>Tecnologias utilizadas:<br />
            {project?.technologies 
              ? project.technologies.map((t, i) => <span key={i}>- {t}<br /></span>)
              : <>- React Native<br />- Expo<br />- TypeScript<br />- Node.js</>
            }
          </p>
          <br /><br /><br />
          <p>{project?.description || "Descrição pormenorizada das funcionalidades criadas, focando na performance e usabilidade do utilizador. As escolhas arquiteturais centraram-se num design minimalista e cru."}</p>
        </div>
        <div className="modal-right">
          <div className="placeholder-img" style={{ backgroundColor: project?.color || "#3a5c6e", height: "100%", width: "100%" }}></div>
        </div>
      </div>
    </div>
  );
}
