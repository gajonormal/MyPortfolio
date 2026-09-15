import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bernardo Maia — Software Engineer",
  description: "Portfólio de Bernardo Maia. Desenvolvimento web com estética minimalista e performance brutal.",
  keywords: ["Bernardo Maia", "Software Engineer", "Web Development", "Portfolio", "Next.js", "Brutalist Design"],
  openGraph: {
    title: "Bernardo Maia — Software Engineer",
    description: "Portfólio de Bernardo Maia. Desenvolvimento web com estética minimalista e performance brutal.",
    url: "https://bernardomaia.dev",
    siteName: "Bernardo Maia Portfolio",
    locale: "pt_PT",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className="theme-light" data-current-section="home">
        {children}
      </body>
    </html>
  );
}
