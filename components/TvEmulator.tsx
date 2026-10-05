"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Nostalgist } from 'nostalgist';

export default function TvEmulator() {
  const screenRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nostalgistRef = useRef<any>(null); // Guardar a referência do emulador para o podermos desligar

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [showControls, setShowControls] = useState(false);
  const mouseMoveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (mouseMoveTimeoutRef.current) {
        clearTimeout(mouseMoveTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseMove = () => {
    setShowControls(true);
    if (mouseMoveTimeoutRef.current) {
      clearTimeout(mouseMoveTimeoutRef.current);
    }
    mouseMoveTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2500); // Esconde os controlos após 2.5s sem mexer o rato
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Cleanup de segurança: se o utilizador sair da página, forçamos o emulador a fechar
    // Isto evita que o som continue a dar e limpa a memória (memory leak)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (nostalgistRef.current) {
        nostalgistRef.current.exit();
      }
    };
  }, []);

  const toggleFullscreen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!document.fullscreenElement) {
      screenRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const stopGame = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (nostalgistRef.current) {
      nostalgistRef.current.exit(); // Desliga o emulador nativamente
      nostalgistRef.current = null;
    }
    setIsPlaying(false);
    setLoadingMsg("");

    // Se estiver em fullscreen quando desliga, sai do fullscreen
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const handleLoadGameClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsPlaying(true);
    setLoadingMsg("BOOTING SYSTEM...");

    try {
      // Guardar a instância para podermos fazer stop mais tarde
      nostalgistRef.current = await Nostalgist.launch({
        core: 'pcsx_rearmed',
        rom: file,
        element: canvasRef.current || undefined,
      });
      setLoadingMsg("");
    } catch (err: any) {
      console.error(err);
      setLoadingMsg("ERROR LOADING DISC.");
      setTimeout(() => {
        setIsPlaying(false);
        setLoadingMsg("");
      }, 3000);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "550px", // Tamanho intermédio ajustado
      }}
    >
      {/* Imagem da TV (Agora na frente) */}
      <img
        src="/Tv.png"
        alt="Retro TV"
        style={{ width: "100%", height: "auto", display: "block", pointerEvents: "none", position: "relative", zIndex: 10 }}
      />

      {/* Área do Ecrã (Por trás da imagem) */}
      <div
        ref={screenRef}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => {
          setShowControls(false);
          if (mouseMoveTimeoutRef.current) clearTimeout(mouseMoveTimeoutRef.current);
        }}
        onMouseMove={handleMouseMove}
        style={isFullscreen ? {
          width: "100vw",
          height: "100vh",
          backgroundColor: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999
        } : {
          position: "absolute",
          top: "16%",
          left: "14%",
          width: "70%",
          height: "53%",
          backgroundColor: "#000",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "0px",
          zIndex: 1 // Fica por trás da imagem que tem zIndex 10
        }}
      >
        {/* Canvas onde o Nostalgist vai renderizar o jogo */}
        <canvas
          ref={canvasRef}
          width="800"
          height="600"
          style={{
            width: "100%",
            height: "100%",
            display: isPlaying && !loadingMsg ? "block" : "none",
            objectFit: "contain",
            cursor: showControls ? "default" : "none" // Esconde o rato se não estivermos sobre os controlos
          }}
        />

        {/* Controlos Overlay visíveis quando estamos a jogar e passamos o rato */}
        {isPlaying && !loadingMsg && (
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            padding: "15px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            opacity: showControls ? 1 : 0,
            transition: "opacity 0.3s ease",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
            zIndex: 100,
            pointerEvents: showControls ? "auto" : "none" // Evita clicar nos botões quando estão invisíveis
          }}>
            <button
              onClick={stopGame}
              style={{ background: "#ED1C24", color: "white", border: "1px solid #ff4444", padding: "6px 12px", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "12px", borderRadius: "4px" }}
            >
              EJECT
            </button>
            <button
              onClick={toggleFullscreen}
              style={{ background: "#333", color: "white", border: "1px solid #555", padding: "6px 12px", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "12px", borderRadius: "4px" }}
            >
              {isFullscreen ? "EXIT FULLSCREEN" : "FULLSCREEN"}
            </button>
          </div>
        )}

        {/* Nossa Interface Personalizada (PS2 BIOS Menu) */}
        {(!isPlaying || loadingMsg) && (
          <div style={{
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
            backgroundImage: "url('/bootPs2.gif')",
            backgroundPosition: "-40px center",
            backgroundSize: "110% 110%", // Aumentar um pouco para que o corte à esquerda não se note tanto
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden"
          }}>
            <style>
              {`
                .ps2-menu-list {
                  position: absolute;
                  left: 55%;
                  top: 50%;
                  transform: translateY(-50%);
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: 0px;
                  z-index: 10;
                }

                .ps2-menu-item {
                  color: rgba(255, 255, 255, 0.4);
                  font-size: 20px;
                  font-family: Arial, sans-serif;
                  cursor: pointer;
                  transition: color 0.1s, text-shadow 0.1s, transform 0.1s;
                  user-select: none;
                  letter-spacing: 0.5px;
                }

                .ps2-menu-item:hover {
                  color: #79d1ff;
                  text-shadow: 0 0 10px rgba(121, 209, 255, 0.8), 0 0 20px rgba(121, 209, 255, 0.4);
                  transform: translateX(5px);
                }
              `}
            </style>

            {loadingMsg ? (
              <div style={{ zIndex: 10, color: "#fff", fontFamily: "Arial, sans-serif", fontWeight: "bold", fontSize: "20px", textShadow: "2px 2px 0 #000" }}>
                {loadingMsg}
              </div>
            ) : (
              <>
                {/* Menu Text */}
                <div className="ps2-menu-list">
                  <div
                    className="ps2-menu-item"
                    onClick={() => alert("Browser de Memory Card em construção!")}
                  >
                    Browser
                  </div>
                  <div
                    className="ps2-menu-item"
                    onClick={handleLoadGameClick}
                  >
                    Play ROM
                  </div>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept=".iso,.bin,.cue,.img,.chd"
                  onChange={handleFileSelect}
                />
              </>
            )}

            {/* Efeito Scanlines */}
            <div style={{
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: 0,
              background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
              backgroundSize: "100% 4px, 6px 100%",
              pointerEvents: "none",
              opacity: 0.6,
              zIndex: 50
            }}></div>
          </div>
        )}
      </div>
    </div>
  );
}
