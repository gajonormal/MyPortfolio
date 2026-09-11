import Footer from "@/components/Footer";

export default function About() {
  return (
    <section id="about" className="page-section active">
      <div className="content-container text-block">
        <p>Sou o Bernardo Maia,</p>
        <br />
        <p>Um developer com uma obsessão por precisão, interfaces minimalistas e código que simplesmente funciona sem ruído.</p>
        <br />
        <p>Especializado na criação de arquiteturas digitais onde o design dita a função e a performance não é negociável. A estética brutalista serve de inspiração, focando naquilo que é essencial.</p>
        <br />
        <p>
          <a href="#" className="nav-link inline-link">ver currículo</a>
        </p>
      </div>
      <Footer leftText="sobre mim" backTarget="/" />
    </section>
  );
}
