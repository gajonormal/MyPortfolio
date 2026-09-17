import Link from "next/link";
import Image from "next/image";

export default function Random() {
  const articles = [
    {
      id: 1,
      date: "09/11/2026",
      title: "Supreme Seoul - Seongsu",
      image: "https://via.placeholder.com/600x450/e0e0e0/000000?text=Store+Image",
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
      image: "https://via.placeholder.com/450x600/e0e0e0/000000?text=Lookbook+1",
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
      image: "https://via.placeholder.com/450x600/e0e0e0/000000?text=Larry+Clark",
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
        className="horizontal-news-container"
        style={{ 
          display: "flex", 
          flexGrow: 1, 
          overflowX: "auto", 
          overflowY: "hidden", 
          padding: "20px 5vw 80px 5vw", 
          gap: "60px",
          alignItems: "center"
        }}
      >
        {articles.map((article) => (
          <article key={article.id} style={{ display: "flex", flex: "0 0 auto", gap: "25px", alignItems: "flex-start" }}>
            
            {/* Image Side */}
            <div style={{ display: "flex", flexDirection: "column", width: "320px" }}>
              <div style={{ width: "320px", height: "350px", position: "relative", backgroundColor: "#f2f2f2" }}>
                <img 
                  src={article.image} 
                  alt={article.title} 
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              {/* Carousel Controls */}
              <div style={{ textAlign: "center", marginTop: "12px", fontSize: "11px", color: "#888" }}>
                1 of {article.imagesCount} &rarr;
              </div>
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
        ))}
      </div>

      {/* Global CSS for the scrollbar injected inline to match slices-container from projetos */}
      <style dangerouslySetInnerHTML={{__html: `
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
