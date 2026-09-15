import Link from "next/link";
import { ActivityCalendar } from "react-activity-calendar";

export default async function About() {
  const explicitTheme = {
    light: ['#fafafa', '#fca5a5', '#f87171', '#ef4444', '#ED1C24'],
    dark: ['#fafafa', '#fca5a5', '#f87171', '#ef4444', '#ED1C24'],
  };

  let contributions = [];
  try {
    const res = await fetch("https://github-contributions-api.jogruber.de/v4/gajonormal?y=last", {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    if (res.ok) {
      const data = await res.json();
      contributions = data.contributions || [];
    }
  } catch (error) {
    console.error("Error fetching github data", error);
  }

  // Se a API falhar, não renderiza nada ou renderiza vazio, mas fallback mínimo:
  if (contributions.length === 0) {
    contributions = [{ date: new Date().toISOString().split('T')[0], count: 0, level: 0 }];
  }

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

        {/* Gráfico do GitHub e link customizado */}
        <div style={{ width: "100%", maxWidth: "850px", margin: "0 auto", position: "relative" }}>
          <ActivityCalendar 
            data={contributions} 
            theme={explicitTheme}
            colorScheme="light"
            showColorLegend={false}
            showMonthLabels={false}
            fontSize={12}
            blockSize={12}
            blockMargin={4}
            blockRadius={0}
          />
          <div style={{ position: "absolute", bottom: "0", right: "0", fontSize: "12px" }}>
            <a 
              href="https://github.com/gajonormal" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-link"
              style={{ textDecoration: "none" }}
            >
              github
            </a>
          </div>
        </div>

      </div>
      <footer className="spaced-footer">
        <div className="left-links">
          <Link href="/projetos" className="nav-link" style={{ marginRight: "15px" }}>projetos</Link>
          <a href="#" className="nav-link">currículo</a>
        </div>
        <div className="right-links">
          <Link href="/" className="nav-link">voltar</Link>
        </div>
      </footer>
    </section>
  );
}
