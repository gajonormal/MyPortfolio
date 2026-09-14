"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fechar o dropdown se clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section id="contact" className="page-section active">
      <div className="content-container" style={{ maxWidth: "800px", margin: "0 auto", marginTop: "40px" }}>
        
        <div style={{ marginBottom: "25px", fontSize: "13px" }}>Contactar</div>
        
        <form className="supreme-form" style={{ width: "100%", maxWidth: "800px" }} onSubmit={(e) => e.preventDefault()}>
          
          <div className="form-row" style={{ marginBottom: "20px" }}>
            <input type="text" placeholder="nome" required style={{ width: "100%", padding: "12px", border: "1px solid #e0e0e0", fontSize: "12px", outline: "none", backgroundColor: "transparent" }} />
          </div>
          
          <div className="form-row" style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <input type="email" placeholder="o teu email" required style={{ flex: 1, padding: "12px", border: "1px solid #e0e0e0", fontSize: "12px", outline: "none", backgroundColor: "transparent" }} />
            <input type="text" placeholder="telefone (opcional)" style={{ flex: 1, padding: "12px", border: "1px solid #e0e0e0", fontSize: "12px", outline: "none", backgroundColor: "transparent" }} />
          </div>
          
          {/* Dropdown Customizado para suportar o hover vermelho */}
          <div className="form-row" style={{ marginBottom: "20px", position: "relative" }} ref={dropdownRef}>
            {/* Input escondido para manter a obrigatoriedade do form (se necessário) */}
            <input type="hidden" required value={selectedOption} />
            
            <div 
              onClick={() => setIsOpen(!isOpen)} 
              style={{ width: "100%", padding: "12px", border: "1px solid #e0e0e0", fontSize: "12px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "transparent" }}
            >
              <span style={{ color: "#333333" }}>{selectedOption || "motivo de contacto"}</span>
              <svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </div>
            
            {isOpen && (
              <div style={{ position: "absolute", top: "100%", left: 0, right: 0, backgroundColor: "#fff", border: "1px solid #e0e0e0", borderTop: "none", zIndex: 50, boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                {["projeto freelance", "oportunidade de emprego", "outros assuntos"].map((opt) => (
                  <div 
                    key={opt}
                    onClick={() => { setSelectedOption(opt); setIsOpen(false); }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#ED1C24"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#333333"; }}
                    style={{ padding: "12px", fontSize: "12px", cursor: "pointer", color: "#333333", transition: "background-color 0.1s" }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="form-row" style={{ marginBottom: "20px" }}>
            <textarea placeholder="mensagem" rows={10} required style={{ width: "100%", padding: "12px", border: "1px solid #e0e0e0", fontSize: "12px", outline: "none", resize: "none", backgroundColor: "transparent" }}></textarea>
          </div>
          
          <div style={{ textAlign: "left" }}>
            <button type="submit" style={{ backgroundColor: "#ED1C24", color: "#fff", border: "none", padding: "8px 20px", fontSize: "13px", fontWeight: "bold", cursor: "pointer" }}>enviar</button>
          </div>
          
        </form>
      </div>
      
      <footer className="spaced-footer">
        <div className="left-links">
        </div>
        <div className="right-links">
          <Link href="/" className="nav-link">voltar</Link>
        </div>
      </footer>
    </section>
  );
}
