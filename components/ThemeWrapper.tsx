"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const section = isHome ? "home" : pathname.replace("/", "");

  // Fallback for document.body classes for any external CSS reliance, though style tag handles the flash
  useEffect(() => {
    if (isHome) {
      document.body.classList.remove("theme-light");
      document.body.classList.add("theme-dark");
      document.body.setAttribute("data-current-section", "home");
    } else {
      document.body.classList.remove("theme-dark");
      document.body.classList.add("theme-light");
      document.body.setAttribute("data-current-section", section);
    }
  }, [isHome, section]);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        body {
          --background: ${isHome ? '#000000' : '#ffffff'} !important;
          --text-color: ${isHome ? '#ffffff' : '#000000'} !important;
          background-color: var(--background) !important;
          color: var(--text-color) !important;
        }
      `}} />
      {children}
    </>
  );
}
