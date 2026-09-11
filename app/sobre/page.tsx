"use client";

import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="page-section active">
      <div className="content-container" style={{ maxWidth: "1200px" }}>
        
        <div className="text-block" style={{ width: "100%", maxWidth: "1000px", margin: "0" }}>
          <h1 className="bold-title" style={{ fontWeight: "bold", marginBottom: "15px" }}>About</h1>
          <p style={{ marginBottom: "20px" }}>In April 1994, Supreme opened its doors on Lafayette Street in downtown Manhattan and became the home of New York City skate culture. At its core was a group of neighborhood kids, New York skaters, and local artists who became the store’s staff, crew, and customers.</p>
          <p style={{ marginBottom: "20px" }}>Supreme grew to embody downtown culture, and play an integral part in its constant regeneration. Skaters, punks, hip-hop heads — the young counter culture at large — all gravitated toward Supreme.</p>
          <p style={{ marginBottom: "20px" }}>While it developed into a downtown institution, Supreme established itself as a brand known for its quality, style, and authenticity.</p>
          <p style={{ marginBottom: "20px" }}>Over 30 years, Supreme has expanded from its New York City origins into a global community; working with generations of artists, photographers, designers, musicians, filmmakers, and writers who defied conventions and contributed to its unique identity and attitude.</p>
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
