"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  useEffect(() => {
    if (pathname === "/") {
      document.body.classList.remove("theme-light");
      document.body.classList.add("theme-dark");
      document.body.setAttribute("data-current-section", "home");
    } else {
      document.body.classList.remove("theme-dark");
      document.body.classList.add("theme-light");
      const section = pathname.replace("/", "") || "home";
      document.body.setAttribute("data-current-section", section);
    }
  }, [pathname]);

  return <>{children}</>;
}
