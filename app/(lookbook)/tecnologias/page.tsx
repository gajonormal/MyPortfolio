"use client";

import { useState } from "react";
import Link from "next/link";
import { techStack } from "@/data/stack";

export default function StackLookbook() {
  const [activeLook, setActiveLook] = useState(0);
  const activeTech = techStack[activeLook];

  // Helper to determine text/icon color based on background
  const getContrastColor = (hexColor: string) => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return yiq >= 128 ? '#000000' : '#ffffff';
  };

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      minHeight: "calc(100vh / 0.9)", 
      backgroundColor: "#fff", 
      color: "#000",
      padding: "30px 40px",
      animation: "fadeIn 0.6s ease"
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
        html, body {
          background-color: #fff !important;
        }
      `}} />
      
      {/* Main Layout Grid */}
      <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
        
        {/* MAIN LAYOUT CONTAINER */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between",
          maxWidth: "900px", 
          margin: "0 auto",
          width: "100%",
          gap: "50px",
          paddingBottom: "60px"
        }}>
          
          {/* LEFT COLUMN (Logo + Hero + Copy) */}
          <div style={{ 
            flex: 1, 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "flex-end", 
            position: "relative" 
          }}>
            
            {/* HERO */}
            <div key={activeTech.id} style={{ 
              animation: "fadeIn 0.3s ease-out", 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              width: "400px", 
              height: "500px", 
              backgroundColor: activeTech.color,
              borderRadius: "2px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
            }}>
              <activeTech.icon style={{ width: "40%", height: "40%", color: getContrastColor(activeTech.color), objectFit: "contain", flexShrink: 0 }} />
            </div>

            {/* COPY & LOGO */}
            <div style={{ position: "relative", width: "400px", marginTop: "30px" }}>
              
              {/* BRAND LOGO (Positioned to the left of the text) */}
              <div style={{ position: "absolute", right: "100%", marginRight: "50px", top: "50%", transform: "translateY(-50%)" }}>
                <div className="box-logo">
                  <em>Bernardomaia</em>
                </div>
              </div>

              {/* COPY */}
              <div style={{ display: "flex", flexDirection: "column", fontSize: "14px" }}>
                <h1 className="bold-title" style={{ margin: 0, fontSize: "14px" }}>{activeTech.category}</h1>
                <p style={{ margin: 0, fontSize: "14px" }}>{activeTech.name}</p>
                <p style={{ margin: 0, color: "#777", fontSize: "14px" }}>{activeTech.description}</p>
              </div>
              
            </div>
            
          </div>

          {/* RIGHT COLUMN (Thumbnails + Pager + Voltar) */}
          <div style={{ flex: "0 0 290px", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            
            {/* THUMBNAILS GRID */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "2px", width: "100%" }}>
              {techStack.map((tech, index) => {
                const isActive = activeLook === index;
                return (
                  <button
                    key={tech.id}
                    onClick={() => setActiveLook(index)}
                    style={{
                      aspectRatio: "4/5",
                      border: isActive ? "1.5px solid var(--supreme-red)" : "1.5px solid transparent",
                      background: "transparent",
                      padding: "2px",
                      cursor: "pointer",
                      transition: "border 0.2s, opacity 0.2s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => { 
                      if (!isActive) e.currentTarget.style.border = "1.5px solid var(--supreme-red)";
                      e.currentTarget.style.opacity = "0.7";
                    }}
                    onMouseLeave={(e) => { 
                      if (!isActive) e.currentTarget.style.border = "1.5px solid transparent";
                      e.currentTarget.style.opacity = "1";
                    }}
                  >
                    <div style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: tech.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "1px"
                    }}>
                      <tech.icon style={{ width: "50%", height: "50%", color: getContrastColor(tech.color) }} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* PAGER */}
            <div style={{ marginTop: "20px", width: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px", color: "#777", marginBottom: "30px" }}>
              <span>{activeLook + 1} of {techStack.length}</span>
              <button
                onClick={() => setActiveLook((activeLook + 1) % techStack.length)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "inherit" }}
              >
                →
              </button>
            </div>

            {/* ARCHIVE LINK */}
            <Link href="/" className="nav-link" style={{ color: "#777" }}>
              voltar
            </Link>

          </div>
          
        </div>
        
      </main>

      {/* BOTTOM NAV */}
      <footer style={{ 
        maxWidth: "900px", 
        margin: "0 auto", 
        width: "100%", 
        display: "flex", 
        justifyContent: "space-between", 
        paddingTop: "20px",
        flexWrap: "wrap",
        gap: "20px"
      }}>
         <div>
           <Link href="/" className="nav-link" style={{ color: "#777" }}>início</Link>
         </div>
         
         <div style={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>
            <Link href="/sobre" className="nav-link" style={{ color: "#777" }}>sobre</Link>
            <Link href="/projetos" className="nav-link" style={{ color: "#777" }}>projetos</Link>
            <span className="nav-link" style={{ fontWeight: "bold", color: "#000", cursor: "default" }}>stack tecnológica</span>
            <Link href="/contactos" className="nav-link" style={{ color: "#777" }}>contactos</Link>
         </div>
      </footer>
    </div>
  );
}
