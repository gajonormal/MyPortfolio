"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { randomArticles } from "@/data/random";
import GlobalFooter from "@/components/GlobalFooter";

// Sub-component for an individual article to maintain its own carousel state
function NewsArticle({ article, isFirst }: { article: any, isFirst: boolean }) {
  const [currentImage, setCurrentImage] = useState(1);

  const handlePrev = () => {
    if (currentImage > 1) {
      setCurrentImage(currentImage - 1);
    }
  };

  const handleNext = () => {
    if (currentImage < (article.imagesCount || 0)) {
      setCurrentImage(currentImage + 1);
    }
  };

  return (
    <article style={{ display: "flex", flex: "0 0 auto", gap: "50px", alignItems: "flex-start", marginLeft: isFirst ? "30vw" : "0" }}>

      {/* Image/Media Side */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* The image/media container */}
        <div style={{ backgroundColor: article.iframe ? "transparent" : "#f2f2f2", display: "flex" }}>
          {article.iframe ? (
            article.iframe
          ) : article.image ? (
            <img
              src={article.image}
              alt={article.title}
              style={{ width: "auto", height: "auto", display: "block" }}
            />
          ) : null}
        </div>

        {/* Interactive Carousel Controls */}
        {article.imagesCount > 0 && (
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "12px",
            fontSize: "14px",
            color: "#333",
            fontFamily: "var(--font-mono)",
            gap: "4px"
          }}>
            <button
              onClick={handlePrev}
              style={{
                background: "none",
                border: "none",
                cursor: currentImage > 1 ? "pointer" : "default",
                fontSize: "18px",
                color: "#999",
                padding: "0 2px",
                fontFamily: "inherit",
                WebkitTextStroke: "1px currentColor",
                visibility: currentImage > 1 ? "visible" : "hidden",
                transform: "translateY(-1.5px)"
              }}
            >
              &larr;
            </button>

            <span style={{ margin: "0 2px", fontSize: "11.5px", letterSpacing: "0.5px" }}>{currentImage} of {article.imagesCount}</span>

            <button
              onClick={handleNext}
              style={{
                background: "none",
                border: "none",
                cursor: currentImage < article.imagesCount ? "pointer" : "default",
                fontSize: "18px",
                color: "#999",
                padding: "0 2px",
                fontFamily: "inherit",
                WebkitTextStroke: "1px currentColor",
                visibility: currentImage < article.imagesCount ? "visible" : "hidden",
                transform: "translateY(-1.5px)"
              }}
            >
              &rarr;
            </button>
          </div>
        )}
      </div>

      {/* Text Side */}
      <div style={{ display: "flex", flexDirection: "column", width: "300px", fontSize: "12px", paddingTop: "5px", lineHeight: "1.4" }}>
        <h2 style={{ fontSize: "12px", marginBottom: "3px", color: "#888" }}>{article.date}</h2>
        <h1 style={{ fontSize: "14px", marginBottom: "15px" }}>{article.title}</h1>

        <div style={{ flexGrow: 1 }}>
          {article.content}
        </div>
      </div>

    </article>
  );
}

export default function Random() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let target = container.scrollLeft;
    let current = container.scrollLeft;
    let isAnimating = false;

    const updateScroll = () => {
      // Fator de suavidade (lerp). Valores menores = mais suave/lento.
      current = current + (target - current) * 0.08;

      if (Math.abs(target - current) < 0.5) {
        current = target;
        container.scrollLeft = current;
        isAnimating = false;
        if (typeof window !== 'undefined' && (window as any).syncIpodPosition) {
          (window as any).syncIpodPosition();
        }
      } else {
        container.scrollLeft = current;
        if (typeof window !== 'undefined' && (window as any).syncIpodPosition) {
          (window as any).syncIpodPosition();
        }
        requestAnimationFrame(updateScroll);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      target += e.deltaY;

      // Impedir que o target vá além dos limites
      const maxScroll = container.scrollWidth - container.clientWidth;
      target = Math.max(0, Math.min(target, maxScroll));

      if (!isAnimating) {
        isAnimating = true;
        // Sincronizar com o scroll real antes de animar (caso o utilizador tenha mexido na barra)
        current = container.scrollLeft;
        requestAnimationFrame(updateScroll);
      }
    };

    const handleScroll = () => {
      if (!isAnimating) {
        target = container.scrollLeft;
        if (typeof window !== 'undefined' && (window as any).syncIpodPosition) {
          (window as any).syncIpodPosition();
        }
      }
    };

    // Usar { passive: false } permite o e.preventDefault() funcionar corretamente
    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="page-section active" style={{ display: "flex", flexDirection: "column", padding: "0", margin: "0" }}>

      {/* Horizontal Scrolling Area */}
      <div
        ref={scrollContainerRef}
        className="horizontal-news-container"
        style={{
          display: "flex",
          flexGrow: 1,
          overflowX: "auto",
          overflowY: "hidden",
          maxHeight: "calc(100vh - 180px)",
          padding: "60px 5vw 80px 5vw",
          gap: "60px",
          alignItems: "flex-start"
        }}
      >
        {randomArticles.map((article, index) => (
          <NewsArticle key={article.id} article={article} isFirst={index === 0} />
        ))}
      </div>

      {/* Global CSS for the scrollbar injected inline to match slices-container from projetos */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .horizontal-news-container::-webkit-scrollbar {
            height: 10px;
        }
        .horizontal-news-container::-webkit-scrollbar-track {
            background: #f1f1f1; 
        }
        .horizontal-news-container::-webkit-scrollbar-thumb {
            background: #cccccc; 
        }
      `}} />

      {/* BOTTOM NAV */}
      <GlobalFooter activePage="random" />

    </section>
  );
}
