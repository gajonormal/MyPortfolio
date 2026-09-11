"use client";

import Link from "next/link";
import GitHubCalendar from "react-github-calendar";

export default function About() {
  // Configuração das cores para o gráfico do GitHub (Dark mode com Supreme Red)
  const explicitTheme = {
    light: ['#1a1a1a', '#4a0000', '#8c0000', '#d11a20', '#ED1C24'],
    dark: ['#1a1a1a', '#4a0000', '#8c0000', '#d11a20', '#ED1C24'],
  };

  return (
    <section id="about" className="page-section active">
      <div className="content-container" style={{ maxWidth: "1200px" }}>
        
        <div style={{ display: "flex", gap: "60px", alignItems: "flex-start", marginBottom: "80px", flexWrap: "wrap" }}>
          {/* Imagem Placeholder à esquerda */}
          <div style={{ flexShrink: 0, width: "220px", height: "260px", backgroundColor: "#555555" }}></div>
          
          {/* Bloco de Texto mais largo ("corrido") */}
          <div className="text-block" style={{ width: "100%", maxWidth: "800px", flex: 1 }}>
            <h1 className="bold-title" style={{ fontWeight: "bold", marginBottom: "30px" }}>Sobre Mim</h1>
            <p>Olá, sou o Bernardomaia, estudante de Engenharia Informática apaixonado por desenvolvimento web e design de interfaces. O meu foco é criar experiências digitais minimalistas, eficientes e impactantes.</p>
            <br />
            <p>Linguagens favoritas: JavaScript, Python, C++, Java.</p>
            <br />
            <p>Stack Tecnológica: React, Node.js, PostgreSQL, Docker.</p>
            <br />
            <p>Objetivo: Construir software robusto que combine uma estética brutalista com usabilidade imaculada e performance.</p>
          </div>
        </div>

        {/* Gráfico do GitHub */}
        <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto", padding: "20px", backgroundColor: "#111111", borderRadius: "5px" }}>
          <GitHubCalendar 
            username="gajonormal" 
            theme={explicitTheme}
            colorScheme="dark"
            hideColorLegend
            hideMonthLabels={false}
            fontSize={12}
            blockSize={12}
            blockMargin={4}
          />
        </div>

      </div>
      <footer className="spaced-footer">
        <div className="left-links">
          <Link href="/projetos" className="nav-link">projetos</Link>
        </div>
        <div className="right-links">
          <a href="https://github.com/gajonormal" target="_blank" rel="noopener noreferrer" style={{ marginRight: "15px" }}>github</a>
          <a href="#">currículo</a>
          <Link href="/" className="nav-link">voltar</Link>
        </div>
      </footer>
    </section>
  );
}
