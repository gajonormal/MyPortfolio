import type { Metadata } from "next";
import "./globals.css";
import { GlobalIpodProvider } from "@/components/GlobalIpodPlayer";

export const metadata: Metadata = {
  metadataBase: new URL('https://bernardomaia.dev'),
  title: "Bernardo Maia — Software Engineer",
  description: "Portfólio de Bernardo Maia. Desenvolvimento web com estética minimalista e performance brutal.",
  keywords: ["Bernardo Maia", "Software Engineer", "Web Development", "Portfolio", "Next.js", "Brutalist Design", "Frontend"],
  authors: [{ name: "Bernardo Maia" }],
  creator: "Bernardo Maia",
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://bernardomaia.dev",
    title: "Bernardo Maia — Software Engineer",
    description: "Desenvolvimento web com estética minimalista e performance brutal.",
    siteName: "Bernardo Maia Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bernardo Maia — Software Engineer",
    description: "Desenvolvimento web com estética minimalista e performance brutal.",
  },
  icons: {
    icon: '/Logo.svg',
    shortcut: '/Logo.svg',
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
        <GlobalIpodProvider>
          {children}
        </GlobalIpodProvider>
      </body>
    </html>
  );
}
