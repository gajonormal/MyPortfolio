"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

export default function About() {
  const explicitTheme = {
    light: ['#f5f5f5', '#fca5a5', '#f87171', '#ef4444', '#ED1C24'],
    dark: ['#f5f5f5', '#fca5a5', '#f87171', '#ef4444', '#ED1C24'],
  };

  return (
    <section id="about" className="page-section active">
      <div className="content-container">
        
        <div style={{ display: "flex", gap: "30px", justifyContent: "center", alignItems: "flex-start", maxWidth: "850px", margin: "0 auto", marginBottom: "60px" }}>
          
          {/* Imagem Placeholder 110x110 */}
          <div style={{ flexShrink: 0, width: "110px", height: "110px", backgroundColor: "#555555" }}></div>
          
          <div className="text-block" style={{ width: "100%", fontSize: "13px" }}>
            <h1 className="bold-title" style={{ fontWeight: "bold", marginBottom: "12px", fontSize: "13px" }}>Sobre Mim</h1>
            <p style={{ marginBottom: "12px" }}>Olá, sou o Bernardomaia, estudante de Engenharia Informática apaixonado por desenvolvimento web e design de interfaces. O meu foco é criar experiências digitais minimalistas, eficientes e impactantes.</p>
            <p style={{ marginBottom: "12px" }}>Linguagens favoritas: JavaScript, Python, C++, Java.</p>
            <p style={{ marginBottom: "12px" }}>Stack Tecnológica: React, Node.js, PostgreSQL, Docker.</p>
            <p style={{ marginBottom: "12px" }}>Objetivo: Construir software robusto que combine uma estética brutalista com usabilidade imaculada e performance.</p>
          </div>
          
        </div>

        {/* Gráfico do GitHub */}
        <div style={{ width: "100%", maxWidth: "850px", margin: "0 auto" }}>
          <GitHubCalendar 
            username="gajonormal" 
            theme={explicitTheme}
            colorScheme="light"
            hideColorLegend
            hideMonthLabels={false}
            fontSize={12}
            blockSize={12}
            blockMargin={4}
            blockRadius={0}
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
