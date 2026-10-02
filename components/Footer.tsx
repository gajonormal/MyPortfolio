import Link from "next/link";
import LanguageSelector from "./LanguageSelector";

export default function Footer({ leftText, backTarget = "/" }: { leftText: string, backTarget?: string }) {
  return (
    <footer className="spaced-footer" style={{ zIndex: 10 }}>
      <div className="left-links">
        <span className="current-section-label">{leftText}</span>
      </div>
      <div className="right-links" style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        <LanguageSelector />
        <Link href={backTarget} className="nav-link">
          voltar
        </Link>
      </div>
    </footer>
  );
}
