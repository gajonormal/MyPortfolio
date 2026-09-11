import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import ThemeWrapper from "@/components/ThemeWrapper";

export const metadata: Metadata = {
  title: "Bernardomaia - Portfolio",
  description: "Minimalist brutalist portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className="theme-dark" data-current-section="home">
        <ThemeWrapper>
          <Header />
          <main>
            {children}
          </main>
        </ThemeWrapper>
      </body>
    </html>
  );
}
