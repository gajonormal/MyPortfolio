"use client";

import React, { useRef, useState, useEffect } from 'react';


export default function TvEmulator() {
  const screenRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nostalgistRef = useRef<any>(null); // Guardar a referência do emulador para o podermos desligar

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [showControls, setShowControls] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0); // 0 = Browser, 1 = Play ROM
  const [browserView, setBrowserView] = useState<'main' | 'loading' | 'list'>('main');
  const [savedFiles, setSavedFiles] = useState<string[]>([]);
  const [crtEnabled, setCrtEnabled] = useState(true);
  const [hoveredUtility, setHoveredUtility] = useState<string | null>(null);
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
      const { Nostalgist } = await import('nostalgist');
      nostalgistRef.current = await Nostalgist.launch({
        core: 'pcsx_rearmed',
        rom: file,
        element: canvasRef.current || undefined,
      });
      
      // Dar focus ao canvas para garantir que os inputs (teclado e comando) são capturados
      if (canvasRef.current) {
        canvasRef.current.focus();
      }
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

  const handleOpenBrowser = async () => {
    setBrowserView('loading');
    try {
      const dbs = await indexedDB.databases();
      let foundSaves: string[] = [];
      
      for (const dbInfo of dbs) {
        if (!dbInfo.name) continue;
        
        const db: IDBDatabase | null = await new Promise((resolve) => {
          const req = indexedDB.open(dbInfo.name);
          req.onsuccess = () => resolve(req.result);
          req.onerror = () => resolve(null);
        });
        
        if (db) {
          if (db.objectStoreNames.contains('FILE_DATA')) {
            const transaction = db.transaction('FILE_DATA', 'readonly');
            const store = transaction.objectStore('FILE_DATA');
            const request = store.getAllKeys();
            
            const keys: any[] = await new Promise((resolve) => {
              request.onsuccess = () => resolve(request.result);
              request.onerror = () => resolve([]);
            });
            
            const saveFiles = keys.filter(k => 
              typeof k === 'string' && (k.endsWith('.srm') || k.endsWith('.sav') || k.endsWith('.mcr') || k.endsWith('.state'))
            );
            
            // Clean up the paths to just show the filename
            const formattedSaves = saveFiles.map(path => {
              const parts = path.split('/');
              return parts[parts.length - 1];
            });
            
            foundSaves.push(...formattedSaves);
          }
          db.close();
        }
      }
      
      // Eliminar duplicados
      setSavedFiles(Array.from(new Set(foundSaves)));
    } catch(e) {
      console.error("Erro ao ler base de dados:", e);
    }
    setBrowserView('list');
  };

  return (
    <div
      style={{
        position: "relative",
        width: "550px", // Tamanho intermédio ajustado
      }}
    >
      <style>
        {`
          .crt-overlay {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            z-index: 50;
            pointer-events: none;
            background: 
              linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%), 
              linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.04));
            background-size: 100% 3px, 3px 100%;
            /* Sombreamento nas bordas para simular o ecrã abaulado da TV */
            box-shadow: inset 0 0 60px rgba(0,0,0,0.85);
            animation: crt-flicker 0.15s infinite;
          }
          
          @keyframes crt-flicker {
            0% { opacity: 0.97; }
            50% { opacity: 1; }
            100% { opacity: 0.97; }
          }

          .ps2-menu-list {
            position: absolute;
            left: 68%;
            top: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0px;
            z-index: 10;
          }

          .ps2-menu-item {
            color: rgba(255, 255, 255, 0.4);
            font-size: 23px; /* Reduzido de 26px para ficarem um pouco mais subtis */
            font-family: Arial, sans-serif;
            cursor: pointer;
            user-select: none;
            letter-spacing: 0.5px;
            /* Mesmo nível de blur dos botões in-game para manter a coerência */
            filter: blur(0.5px) contrast(1.1);
          }

          .ps2-menu-item.active {
            color: #9CE3F4; /* Azul ciano mais claro (Ice Blue) */
            text-shadow: 0 0 5px rgba(156, 227, 244, 0.8), 0 0 10px rgba(156, 227, 244, 0.4);
            /* Mesmo brilho/blur para manter a coerência */
            filter: blur(0.6px) contrast(1.2) brightness(1.1);
          }

          /* Nova estética degradada para os botões In-Game */
          .crt-btn {
            color: rgba(255, 255, 255, 0.4);
            font-size: 19px; /* Um pouco menor que os botões principais (23px) */
            font-family: Arial, sans-serif;
            cursor: pointer;
            user-select: none;
            letter-spacing: 0.5px; /* Mesmo espaçamento dos botões principais */
            /* Blur muito ligeiro, apenas um toque mais velho que o menu principal */
            filter: blur(0.5px) contrast(1.2);
          }

          .crt-btn.active {
            color: #9CE3F4;
            /* Mesmo brilho ciano do menu original, com blur proporcional */
            text-shadow: 0 0 6px rgba(156, 227, 244, 0.9), 0 0 12px rgba(156, 227, 244, 0.6);
            filter: blur(0.6px) contrast(1.3) brightness(1.1);
          }
        `}
      </style>
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
          tabIndex={0}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: isPlaying && !loadingMsg ? 1 : 0,
            pointerEvents: isPlaying && !loadingMsg ? "auto" : "none",
            objectFit: "contain",
            cursor: showControls ? "default" : "none",
            zIndex: isPlaying && !loadingMsg ? 5 : -1
          }}
        />

        {/* Controlos Overlay visíveis quando estamos a jogar e passamos o rato */}
        {isPlaying && !loadingMsg && (
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            opacity: showControls ? 1 : 0,
            transition: "opacity 0.3s ease",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)",
            zIndex: 100,
            pointerEvents: showControls ? "auto" : "none"
          }}>
            <div
              className={`crt-btn ${hoveredUtility === 'crt' ? 'active' : ''}`}
              onMouseEnter={() => setHoveredUtility('crt')}
              onMouseLeave={() => setHoveredUtility(null)}
              onClick={() => setCrtEnabled(!crtEnabled)}
            >
              CRT: {crtEnabled ? "ON" : "OFF"}
            </div>
            <div
              className={`crt-btn ${hoveredUtility === 'fullscreen' ? 'active' : ''}`}
              onMouseEnter={() => setHoveredUtility('fullscreen')}
              onMouseLeave={() => setHoveredUtility(null)}
              onClick={toggleFullscreen}
            >
              {isFullscreen ? "EXIT FULLSCREEN" : "FULLSCREEN"}
            </div>
            <div
              className={`crt-btn ${hoveredUtility === 'eject' ? 'active' : ''}`}
              onMouseEnter={() => setHoveredUtility('eject')}
              onMouseLeave={() => setHoveredUtility(null)}
              onClick={stopGame}
            >
              EJECT
            </div>
          </div>
        )}

        {/* Nossa Interface Personalizada (PS2 BIOS Menu) */}
        {(!isPlaying || loadingMsg) && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
            backgroundImage: "url('/bootPs2.gif')",
            backgroundPosition: "-80px center",
            backgroundSize: "130% 130%", // Aumentado para o GIF parecer maior no ecrã
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden"
          }}>


            {loadingMsg ? (
              <div style={{ zIndex: 10, color: "#fff", fontFamily: "Arial, sans-serif", fontWeight: "bold", fontSize: "20px", textShadow: "2px 2px 0 #000" }}>
                {loadingMsg}
              </div>
            ) : browserView === 'loading' ? (
              <div style={{ zIndex: 10, color: "#9CE3F4", fontFamily: "Arial, sans-serif", fontSize: "18px", textShadow: "0 0 5px rgba(156, 227, 244, 0.8)", filter: "blur(0.5px)" }}>
                Reading Memory Card...
              </div>
            ) : browserView === 'list' ? (
              <div style={{ 
                zIndex: 10, 
                width: "80%", 
                height: "70%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                border: "1px solid rgba(156, 227, 244, 0.3)",
                padding: "20px",
                fontFamily: "Arial, sans-serif",
                color: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(4px)"
              }}>
                <div style={{ color: "#9CE3F4", fontSize: "22px", marginBottom: "20px", textShadow: "0 0 5px rgba(156, 227, 244, 0.8)", filter: "blur(0.5px)" }}>
                  MEMORY CARD (PSX)
                </div>
                
                <div style={{ flexGrow: 1, width: "100%", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px", padding: "0 20px", scrollbarWidth: "none" }}>
                  {savedFiles.length > 0 ? savedFiles.map((file, idx) => (
                    <div key={idx} style={{ 
                      padding: "10px", 
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      backgroundColor: "rgba(255, 255, 255, 0.05)"
                    }}>
                      <div style={{ width: "30px", height: "30px", backgroundColor: "#9CE3F4", opacity: 0.8, display: "flex", justifyContent: "center", alignItems: "center", color: "#000", fontSize: "10px", fontWeight: "bold" }}>
                        SAV
                      </div>
                      <span style={{ fontSize: "14px", letterSpacing: "1px", wordBreak: "break-all" }}>{file}</span>
                    </div>
                  )) : (
                    <div style={{ textAlign: "center", marginTop: "40px", color: "rgba(255,255,255,0.4)" }}>
                      NO DATA
                    </div>
                  )}
                </div>

                <div 
                  className="ps2-menu-item active" 
                  style={{ marginTop: "20px", fontSize: "16px" }}
                  onClick={() => setBrowserView('main')}
                >
                  RETURN
                </div>
              </div>
            ) : (
              <>
                {/* Menu Text */}
                <div className="ps2-menu-list">
                  <div
                    className={`ps2-menu-item ${selectedIndex === 0 ? "active" : ""}`}
                    onClick={handleOpenBrowser}
                    onMouseEnter={() => setSelectedIndex(0)}
                  >
                    Browser
                  </div>
                  <div
                    className={`ps2-menu-item ${selectedIndex === 1 ? "active" : ""}`}
                    onClick={handleLoadGameClick}
                    onMouseEnter={() => setSelectedIndex(1)}
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

          </div>
        )}

        {/* Filtro CRT Universal (Cobre menu e jogos) */}
        {crtEnabled && <div className="crt-overlay"></div>}
      </div>
    </div>
  );
}
