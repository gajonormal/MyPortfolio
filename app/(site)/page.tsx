import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Home() {
  return (
    <section id="home" className="page-section active">
      <div className="home-layout">
        <div className="home-menu-block">
          <nav className="vertical-nav">
            <Link href="/sobre" className="nav-link">sobre</Link>
            <Link href="/projetos" className="nav-link">projetos</Link>
            <Link href="/random" className="nav-link">random</Link>
            <Link href="/tecnologias" className="nav-link">stack tecnológica</Link>
            <Link href="/contactos" className="nav-link">contactos</Link>
          </nav>
          
          <div className="home-socials">
            <a href="https://github.com/gajonormal" target="_blank" aria-label="GitHub">
              <FaGithub size={16} />
            </a>
            <a href="https://www.linkedin.com/in/bernardo-maia-bpm" target="_blank" aria-label="LinkedIn">
              <FaLinkedin size={16} />
            </a>
            <a href="mailto:bernamaia12@gmail.com" aria-label="Email">
              <FaEnvelope size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
