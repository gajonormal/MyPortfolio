"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

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
      } else {
        container.scrollLeft = current;
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

  const articles = [
    {
      id: 0,
      date: "20/09/2026",
      title: "Interactive iPod",
      iframe: (
        <div className="relative flex items-center justify-center" style={{ marginTop: "-80px" }}>
          <iframe
            src="https://ipod-classic-revamped.vercel.app/embed"
            className="w-[340px] h-[560px] border-none bg-transparent overflow-hidden"
            style={{
              backgroundColor: "transparent",
              colorScheme: "light dark"
            }}
            title="iPod Classic Interativo"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            scrolling="no"
          ></iframe>
        </div>
      ),
      imagesCount: 0,
      content: (
        <>
          <p style={{ marginBottom: "15px" }}>
            Widget de iPod interativo, desenvolvido usando React e animações Framer Motion.
          </p>
          <p>
            Permite explorar a interface icónica, selecionar músicas e interagir com o dispositivo de forma autêntica.
          </p>
        </>
      )
    },
    {
      id: 1,
      date: "09/11/2026",
      title: "Supreme Seoul - Seongsu",
      // Landscape placeholder (500x350)
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="350"><rect width="100%" height="100%" fill="%23d8d8d8"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="20" fill="%23666">Retângulo (Horizontal)</text></svg>',
      imagesCount: 7,
      content: (
        <>
          <p style={{ marginBottom: "15px" }}>
            On Saturday September 12th, Supreme will open its newest location in Seoul.
          </p>
          <p style={{ marginBottom: "15px" }}>The store is located at:</p>
          <p style={{ fontWeight: "bold" }}>22 Seongsui-ro 7-gil</p>
          <p style={{ fontWeight: "bold" }}>Seongdong-gu, Seoul 04781</p>
          <p style={{ fontWeight: "bold" }}>Tel: +82-02-2088-4846</p>
          <p style={{ fontWeight: "bold" }}>11 - 8 Monday - Sunday</p>
        </>
      )
    },
    {
      id: 2,
      date: "09/07/2026",
      title: "Supreme/A.PRESSE",
      // Portrait placeholder (300x500)
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="500"><rect width="100%" height="100%" fill="%23e8e8e8"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="16" fill="%23666">Vertical</text></svg>',
      imagesCount: 64,
      content: (
        <>
          <p style={{ marginBottom: "15px" }}>
            A.PRESSE is a Japanese clothing brand founded by Kazuma Shigematsu in 2021. A.PRESSE draws inspiration from classic workwear, military and tailored pieces - reinterpreting these heritage styles with exceptional quality and precise detail. A.PRESSE is highly regarded for its dedication to meticulous craftsmanship, particularly its custom developed fabrics and vintage finishing techniques.
          </p>
          <p>
            Supreme has worked with A.PRESSE on a new collection for Fall 2026. The collection consists of a Leather Jacket in both calfskin and cowhide.
          </p>
        </>
      )
    },
    {
      id: 3,
      date: "08/31/2026",
      title: "Supreme/Larry Clark",
      // Square placeholder (400x400)
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%" height="100%" fill="%23cccccc"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="20" fill="%23666">Quadrado</text></svg>',
      imagesCount: 46,

      content: (
        <>
          <p style={{ marginBottom: "15px" }}>
            Larry Clark is an American photographer and film director who was born in Tulsa, Oklahoma in 1943. Between 1962 and 1971, Clark photographed his friends in their most private moments. Clark made the pictures as a participant rather than a detached observer, and in so doing, pioneered a raw, deeply personal approach to documentary photography.
          </p>
          <p>
            The resulting book, <em>Tulsa</em>, is considered one of the most influential and important collections of American photography.
          </p>
        </>
      )
    }
  ];

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
        {articles.map((article, index) => (
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
      <footer style={{
        position: "fixed",
        bottom: "30px",
        left: "0",
        right: "0",
        maxWidth: "900px",
        margin: "0 auto",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        padding: "0 40px",
        flexWrap: "wrap",
        gap: "20px",
        zIndex: 10
      }}>
        <div>
          <Link href="/" className="nav-link" style={{ color: "#777" }}>início</Link>
        </div>

        <div style={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>
          <Link href="/sobre" className="nav-link" style={{ color: "#777" }}>sobre</Link>
          <Link href="/projetos" className="nav-link" style={{ color: "#777" }}>projetos</Link>
          <span className="nav-link" style={{ fontWeight: "bold", color: "#000", cursor: "default" }}>stack tecnológica</span>
          <Link href="/contactos" className="nav-link" style={{ color: "#777" }}>contactos</Link>
        </div>
      </footer>

    </section>
  );
}
