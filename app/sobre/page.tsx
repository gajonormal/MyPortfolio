import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="page-section active">
      <div className="content-container">
        <h1 className="bold-title" style={{ fontWeight: "bold", marginBottom: "30px" }}>Sobre Mim</h1>
        <div className="text-block">
          <p>Olá, sou o Bernardomaia, estudante de Engenharia Informática apaixonado por desenvolvimento web e design de interfaces. O meu foco é criar experiências digitais minimalistas, eficientes e impactantes.</p>
          <br />
          <p>Linguagens favoritas: JavaScript, Python, C++, Java.</p>
          <p>Stack Tecnológica: React, Node.js, PostgreSQL, Docker.</p>
          <p>Objetivo: Construir software robusto que combine uma estética brutalista com usabilidade imaculada e performance.</p>
        </div>
      </div>
      <footer className="spaced-footer">
        <div className="left-links">
          <Link href="/projetos" className="nav-link">projetos</Link>
        </div>
        <div className="right-links">
          <a href="#">github</a>
          <a href="#">currículo</a>
          <Link href="/" className="nav-link">voltar</Link>
        </div>
      </footer>
    </section>
  );
}
