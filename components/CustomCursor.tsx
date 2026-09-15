"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" || 
        target.tagName.toLowerCase() === "button" || 
        target.tagName.toLowerCase() === "input" || 
        target.tagName.toLowerCase() === "select" || 
        target.tagName.toLowerCase() === "textarea" ||
        target.closest("a") || 
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: isHovering ? "24px" : "16px",
        height: isHovering ? "24px" : "16px",
        backgroundColor: "white",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 99999,
        transform: `translate(calc(${position.x}px - 50%), calc(${position.y}px - 50%))`,
        transition: "width 0.15s ease, height 0.15s ease",
        mixBlendMode: "difference",
      }}
    />
  );
}
