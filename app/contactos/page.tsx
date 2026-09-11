"use client";

import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <section id="contact" className="page-section active">
      <div className="content-container">
        <p className="contact-label">Contactar Bernardomaia</p>
        <form className="supreme-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <input type="text" placeholder="nome" required />
            <input type="email" placeholder="email" required />
          </div>
          <div className="form-row">
            <input type="text" placeholder="assunto" required />
          </div>
          <div className="form-row">
            <textarea placeholder="mensagem" rows={8} required></textarea>
          </div>
          <button type="submit" className="submit-btn">enviar</button>
        </form>
      </div>
      <Footer leftText="contactos" backTarget="/" />
    </section>
  );
}
