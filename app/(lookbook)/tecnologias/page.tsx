"use client";

import { useState } from "react";
import Link from "next/link";
import { techStack } from "@/data/stack";

export default function StackLookbook() {
  const [activeLook, setActiveLook] = useState(0);
  const activeTech = techStack[activeLook];

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
        
        {/* HERO & THUMBNAILS CONTAINER */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          maxWidth: "900px", 
          margin: "0 auto",
          width: "100%",
          gap: "50px",
          paddingBottom: "60px",
          flexWrap: "wrap"
        }}>
          
          {/* HERO */}
          <div style={{ flex: "1 1 50%", display: "flex", justifyContent: "center", minWidth: "300px", height: "450px", alignItems: "center" }}>
             <activeTech.icon style={{ width: "400px", height: "400px", color: activeTech.color, objectFit: "contain", flexShrink: 0 }} />
          </div>

          {/* THUMBNAILS & PAGER */}
          <div style={{ flex: "0 0 320px", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", width: "100%" }}>
              {techStack.map((tech, index) => {
                const isActive = activeLook === index;
                return (
                  <button
                    key={tech.id}
                    onClick={() => setActiveLook(index)}
                    style={{
                      aspectRatio: "4/5",
                      border: isActive ? "2px solid var(--brand)" : "1px solid transparent",
                      background: "transparent",
                      padding: "8px",
                      cursor: "pointer",
                      transition: "border 0.2s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.border = "1px solid var(--foreground)"; }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.border = "1px solid transparent"; }}
                  >
                    <tech.icon style={{ width: "100%", height: "100%", color: tech.color }} />
                  </button>
                );
              })}
            </div>

            {/* PAGER */}
            <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "12px", color: "#777" }}>
              <span>{activeLook + 1} of {techStack.length}</span>
              <button
                onClick={() => setActiveLook((activeLook + 1) % techStack.length)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "inherit" }}
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM INFO ROW (Logo + Copy + Archive) */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "flex-end", 
          maxWidth: "900px", 
          margin: "0 auto", 
          width: "100%",
          paddingBottom: "25px",
          flexWrap: "wrap",
          gap: "30px"
        }}>
          
          <div style={{ display: "flex", alignItems: "center", gap: "50px", flexWrap: "wrap" }}>
            {/* BRAND */}
            <div className="box-logo">
              <em>Bernardomaia</em>
            </div>
            
            {/* COPY */}
            <div style={{ display: "flex", flexDirection: "column", gap: "5px", fontSize: "13px" }}>
              <h1 className="bold-title" style={{ margin: 0, fontSize: "13px" }}>{activeTech.category}</h1>
              <p style={{ margin: 0, fontSize: "13px" }}>{activeTech.name}</p>
              <p style={{ margin: 0, color: "#777", fontSize: "13px" }}>{activeTech.description}</p>
            </div>
          </div>

          {/* ARCHIVE LINK */}
          <Link href="/" className="nav-link" style={{ color: "#777", marginBottom: "5px" }}>
            voltar
          </Link>
          
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
