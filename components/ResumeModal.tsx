"use client";

import { useState, useRef, MouseEvent, WheelEvent, useEffect } from 'react';

export default function ResumeModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, rotX: 0, rotY: 0 });
  
  const hasDraggedRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      setIsFadingOut(false);
      setRotateX(0);
      setRotateY(0);
      setScale(1);
    }
  }, [isOpen]);

  if (!isOpen && !isFadingOut) return null;

  const handleClose = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    hasDraggedRef.current = false;
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      rotX: rotateX,
      rotY: rotateY
    });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    hasDraggedRef.current = true;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setRotateY(dragStart.rotY + deltaX * 0.5);
    setRotateX(dragStart.rotX - deltaY * 0.5);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Dá tempo para o evento de 'click' ser ignorado se tiver havido drag
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 100);
  };

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (hasDraggedRef.current) return;
    handleClose();
  };

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setScale(prev => Math.min(Math.max(prev - e.deltaY * 0.002, 0.4), 4));
  };

  const handleReset = () => {
    // Snap to the closest 360 degree multiple to avoid wild spinning
    setRotateX(Math.round(rotateX / 360) * 360);
    setRotateY(Math.round(rotateY / 360) * 360);
    setScale(1);
  };

  return (
    <div 
      className={`modal-overlay ${isFadingOut ? 'fading-out' : 'active'}`}
      style={{ display: "flex", backgroundColor: "rgba(0, 0, 0, 0.85)", flexDirection: "column" }}
      onClick={handleOverlayClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Top Controls Bar */}
      <div style={{ position: "absolute", top: "30px", right: "40px", zIndex: 100, display: "flex", gap: "25px", fontFamily: "var(--font-mono)", fontSize: "13px", color: "#ccc" }}>
        <a 
          href="#"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleReset(); }}
          className="nav-link"
          style={{ cursor: "pointer", padding: "2px 6px", textDecoration: "none", color: "inherit" }}
        >
          reset
        </a>
        <a 
          href="#" 
          download="Curriculo_Bernardomaia.pdf"
          onClick={(e) => { e.stopPropagation(); alert("Irá transferir o PDF quando o adicionares ao projeto!"); }}
          className="nav-link"
          style={{ cursor: "pointer", padding: "2px 6px", textDecoration: "none", color: "inherit" }}
        >
          download pdf
        </a>
        <a 
          href="#"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleClose(); }}
          className="nav-link"
          style={{ cursor: "pointer", padding: "2px 6px", textDecoration: "none", color: "inherit" }}
        >
          fechar
        </a>
      </div>

      <div 
        style={{ 
          perspective: "1200px", 
          width: "100%", 
          height: "100%", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          userSelect: "none"
        }}
      >
        <div
          onMouseDown={handleMouseDown}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "90%",
            maxWidth: "500px",
            aspectRatio: "1 / 1.414", 
            transformStyle: "preserve-3d",
            transform: `scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: isDragging ? "none" : "transform 0.1s ease-out",
            position: "relative",
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {/* FRENTE */}
          <div style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#f0f0f0",
            boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            backfaceVisibility: "hidden",
            borderRadius: "2px",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
          }}>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#ED1C24", pointerEvents: "none" }}>Currículo</h1>
            <p style={{ fontSize: "14px", lineHeight: "1.6", pointerEvents: "none" }}>
              Clica e arrasta para rodares a folha livremente em 360º.<br/><br/>
              Faz scroll (roda do rato) para fazer Zoom In e Zoom Out.<br/><br/>
              Usa os botões no topo para fazer Download em PDF.
            </p>
          </div>

          {/* VERSO */}
          <div style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#e0e0e0",
            boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "2px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <span style={{ color: "#aaa", fontSize: "14px", transform: "rotateZ(-45deg)" }}>Verso da Folha</span>
          </div>
          
        </div>
      </div>
      
      {/* Dica flutuante */}
      <div style={{ position: "absolute", bottom: "30px", left: "50%", transform: "translateX(-50%)", color: "#fff", opacity: 0.6, fontSize: "12px", pointerEvents: "none" }}>
        Scroll para zoom • Arrasta para rodar 360º
      </div>
    </div>
  );
}
