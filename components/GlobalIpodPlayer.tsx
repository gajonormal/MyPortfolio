"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { IoPlaySharp, IoPauseSharp, IoVolumeHighSharp, IoVolumeMuteSharp } from "react-icons/io5";

interface PlayerState {
  isPlaying: boolean;
  isMuted: boolean;
  track: string;
  artist: string;
}

interface GlobalPlayerContextType {
  playerState: PlayerState;
  play: () => void;
  pause: () => void;
  toggleMute: () => void;
}

const GlobalPlayerContext = createContext<GlobalPlayerContextType | undefined>(undefined);

export function GlobalIpodProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    isMuted: false,
    track: "",
    artist: "",
  });

  // Escutar mensagens vindas do iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || !event.data.type) return;

      if (event.data.type === "IPOD_STATE_CHANGE") {
        setPlayerState((prev) => ({ ...prev, ...event.data.payload }));
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Sincronizar posição do Iframe Global com o Placeholder na página Random
  useEffect(() => {
    const iframe = document.getElementById("global-ipod-iframe");
    let animId: number;

    const syncPosition = () => {
      if (!iframe) return;
      const placeholder = document.getElementById("ipod-placeholder");
      
      if (pathname === "/random" && placeholder && iframe.dataset.loaded === "true") {
        const rect = placeholder.getBoundingClientRect();
        
        // Compensar o zoom: 0.9 do body
        const zoom = 0.9;
        
        iframe.style.position = "fixed";
        iframe.style.left = "0px";
        iframe.style.top = "0px";
        iframe.style.transform = `translate3d(${rect.left / zoom}px, ${rect.top / zoom}px, 0)`;
        iframe.style.width = "340px";
        iframe.style.height = "560px";
        iframe.style.zIndex = "10";
        iframe.style.opacity = "1";
        iframe.style.pointerEvents = "auto";
      } else {
        // Esconder o iframe quando não estamos na página Random
        iframe.style.opacity = "0";
        iframe.style.pointerEvents = "none";
        iframe.style.left = "-9999px";
        iframe.style.top = "-9999px";
        iframe.style.transform = "none";
      }
      
      animId = requestAnimationFrame(syncPosition);
    };

    animId = requestAnimationFrame(syncPosition);
    return () => cancelAnimationFrame(animId);
  }, [pathname]);

  const sendCommand = (type: string) => {
    const iframe = document.getElementById("global-ipod-iframe") as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type }, "*");
    }
  };

  return (
    <GlobalPlayerContext.Provider
      value={{
        playerState,
        play: () => sendCommand("IPOD_PLAY"),
        pause: () => sendCommand("IPOD_PAUSE"),
        toggleMute: () => sendCommand("IPOD_TOGGLE_MUTE"),
      }}
    >
      {children}

      {/* Iframe Fixo Global */}
      <iframe
        id="global-ipod-iframe"
        src="https://ipod-classic-revamped.vercel.app/embed"
        className="border-none bg-transparent overflow-hidden"
        onLoad={(e) => { 
          const target = e.currentTarget;
          // Esperar 500ms extra para o Next.js dentro do iframe fazer a hidratação e evitar "flashes" brancos
          setTimeout(() => { target.dataset.loaded = "true"; }, 500); 
        }}
        style={{
          position: "fixed",
          left: "-9999px",
          top: "-9999px",
          opacity: 0,
          backgroundColor: "transparent",
          colorScheme: "light dark",
          transition: "opacity 0.5s ease-in-out",
        }}
        title="iPod Classic Interativo"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        scrolling="no"
      ></iframe>

      {/* Controlos Minimalistas nas outras páginas */}
      {pathname !== "/random" && playerState.track !== "" && (
        <div 
          style={{
            position: "fixed",
            bottom: "25px",
            left: "20px",
            display: "flex",
            alignItems: "center",
            gap: "15px",
            zIndex: 100,
          }}
        >
          {/* Botão Play/Pause */}
          <button 
            className="player-btn"
            onClick={() => playerState.isPlaying ? sendCommand("IPOD_PAUSE") : sendCommand("IPOD_PLAY")} 
          >
            {playerState.isPlaying ? <IoPauseSharp size={18} /> : <IoPlaySharp size={18} />}
          </button>

          {/* Botão Mute */}
          <button 
            className="player-btn"
            onClick={() => sendCommand("IPOD_TOGGLE_MUTE")} 
          >
            {playerState.isMuted ? <IoVolumeMuteSharp size={20} /> : <IoVolumeHighSharp size={20} />}
          </button>
        </div>
      )}
    </GlobalPlayerContext.Provider>
  );
}

export const useGlobalIpod = () => {
  const context = useContext(GlobalPlayerContext);
  if (!context) throw new Error("useGlobalIpod must be used within GlobalIpodProvider");
  return context;
};
