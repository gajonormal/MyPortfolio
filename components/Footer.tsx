import Link from "next/link";

export default function Footer({ leftText, backTarget = "/" }: { leftText: string, backTarget?: string }) {
  return (
    <footer className="spaced-footer">
      <div className="left-links">
        <span className="current-section-label">{leftText}</span>
      </div>
      <div className="right-links">
        <Link href={backTarget} className="nav-link">
          voltar
        </Link>
      </div>
    </footer>
  );
}
