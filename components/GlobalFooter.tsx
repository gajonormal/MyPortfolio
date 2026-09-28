import Link from "next/link";

interface GlobalFooterProps {
  activePage: "início" | "sobre" | "projetos" | "tecnologias" | "contactos" | "random";
}

export default function GlobalFooter({ activePage }: GlobalFooterProps) {
  const getStyle = (page: string) => {
    return activePage === page 
      ? { fontWeight: "bold", color: "var(--text-color, #000)", cursor: "default" }
      : { color: "#777" };
  };

  return (
    <footer className="spaced-footer" style={{ zIndex: 10 }}>
      <div>
        {activePage === "início" ? (
          <span className="nav-link" style={getStyle("início")}>início</span>
        ) : (
          <Link href="/" className="nav-link" style={getStyle("início")}>início</Link>
        )}
      </div>
      
      <div style={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>
        {activePage === "sobre" && (
          <a href="https://www.linkedin.com/in/bernardo-maia-bpm" target="_blank" className="nav-link" style={{ color: "#777" }}>currículo</a>
        )}
        
        {activePage === "sobre" ? (
          <span className="nav-link" style={getStyle("sobre")}>sobre</span>
        ) : (
          <Link href="/sobre" className="nav-link" style={getStyle("sobre")}>sobre</Link>
        )}
        
        {activePage === "projetos" ? (
          <span className="nav-link" style={getStyle("projetos")}>projetos</span>
        ) : (
          <Link href="/projetos" className="nav-link" style={getStyle("projetos")}>projetos</Link>
        )}

        {activePage === "random" ? (
          <span className="nav-link" style={getStyle("random")}>random</span>
        ) : (
          <Link href="/random" className="nav-link" style={getStyle("random")}>random</Link>
        )}
        
        {activePage === "tecnologias" ? (
          <span className="nav-link" style={getStyle("tecnologias")}>stack tecnológica</span>
        ) : (
          <Link href="/tecnologias" className="nav-link" style={getStyle("tecnologias")}>stack tecnológica</Link>
        )}
        
        {activePage === "contactos" ? (
          <span className="nav-link" style={getStyle("contactos")}>contactos</span>
        ) : (
          <Link href="/contactos" className="nav-link" style={getStyle("contactos")}>contactos</Link>
        )}
      </div>
    </footer>
  );
}
