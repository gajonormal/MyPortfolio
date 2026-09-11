"use client";

import { useEffect, useState } from "react";

export default function ProjectModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

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
          <p><strong>App React Native</strong></p>
          <br /><br />
          <p>2025-2026 Porto, PT<br />Development & Design</p>
          <br /><br /><br />
          <p>Tecnologias utilizadas:<br />- React Native<br />- Expo<br />- TypeScript<br />- Node.js</p>
          <br /><br /><br />
          <p>Descrição pormenorizada das funcionalidades criadas, focando na performance e usabilidade do utilizador. As escolhas arquiteturais centraram-se num design minimalista e cru.</p>
          <br /><br /><br /><br />
          <p>(scroll para ver mais texto)</p>
          <p>Mais detalhes sobre o projeto aparecem aqui no fundo, mostrando que a parte lateral branca tem scroll infinito independente da imagem estática à direita.</p>
          <br /><br /><br />
          <p>Fim da página.</p>
        </div>
        <div className="modal-right">
          <div className="placeholder-img" style={{ backgroundColor: "#3a5c6e", height: "100%", width: "100%" }}></div>
        </div>
      </div>
    </div>
  );
}
