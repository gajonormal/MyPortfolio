"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const languages = [
  { code: "en", flag: "/flags/Flag_of_the_United_States.svg", alt: "English" },
  { code: "pt", flag: "/flags/Flag_of_Portugal.svg", alt: "Português" },
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(languages[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      {/* Dropdown Options (Opens Upwards) */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "100%", // Opens above the button
            left: 0, // Align to left so flags align perfectly
            marginBottom: "5px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            zIndex: 100,
          }}
          className="lang-dropdown"
        >
          {languages.filter(l => l.code !== selected.code).map((lang) => (
            <div
              key={lang.code}
              onClick={() => {
                setSelected(lang);
                setIsOpen(false);
              }}
              className="lang-option nav-link"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", width: "20px", height: "14px" }}>
                <Image src={lang.flag} alt={lang.alt} width={20} height={14} style={{ objectFit: "contain", width: "100%", height: "100%" }} />
              </div>
              <span>{lang.code}</span>
              {/* Placeholder to match the exact width of the selected button */}
              <span style={{ fontSize: "10px", marginLeft: "2px", visibility: "hidden" }}>
                ▼
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Selected Language Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          fontFamily: "var(--font-mono)",
          userSelect: "none"
        }}
        className="nav-link"
      >
        <div style={{ display: "flex", alignItems: "center", width: "20px", height: "14px" }}>
          <Image src={selected.flag} alt={selected.alt} width={20} height={14} style={{ objectFit: "contain", width: "100%", height: "100%" }} />
        </div>
        <span>{selected.code}</span>
        <span style={{ fontSize: "10px", marginLeft: "2px" }}>
          {isOpen ? "▲" : "▼"}
        </span>
      </div>
      
      <style jsx>{`
        .lang-dropdown {
          background-color: transparent;
        }
      `}</style>
    </div>
  );
}
