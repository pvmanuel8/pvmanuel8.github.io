import Reveal from "../common/Reveal";

/**
 * Sección "Contacto y Pie de Página" (Contact & Footer).
 * Proporciona enlaces directos para enviar correos electrónicos y conectar en redes sociales.
 * 
 * @param {React.Ref} sectionRef - Referencia para el observador de scroll.
 */
export default function ContactSection({ sectionRef }) {
  return (
    <>
      <section
        id="contact"
        ref={sectionRef}
        className="pf-section"
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "100px 40px 60px",
          borderTop: "1px solid var(--border-soft)",
          textAlign: "center",
        }}
      >
        <Reveal>
          <div className="pf-eyebrow" style={{ justifyContent: "center" }}>
            06 · Contacto
          </div>
          <h2 className="pf-h" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
            ¿Hablamos de tu proyecto?
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              marginTop: 16,
              maxWidth: "50ch",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Estoy abierto a nuevas oportunidades y colaboraciones. Escríbeme y te respondo en menos de 48h.
          </p>

          {/* Enlaces de contacto y redes sociales */}
          <div className="pf-contact-links" style={{ marginTop: 32, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:pvmanuel8@gmail.com" className="pf-btn pf-btn-primary">
              pvmanuel8@gmail.com
            </a>
            <a href="https://github.com/pvmanuel8" target="_blank" rel="noreferrer" className="pf-btn pf-btn-ghost">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/manuel-piñeiro" target="_blank" rel="noreferrer" className="pf-btn pf-btn-ghost">
              LinkedIn
            </a>
          </div>
        </Reveal>
      </section>

      {/* Pie de página (Footer) */}
      <footer
        className="pf-mono pf-footer"
        style={{
          padding: "30px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid var(--border-soft)",
          fontSize: 12,
          color: "var(--text-faint)",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>© {new Date().getFullYear()} Manuel Piñeiro</div>
        <div>Hecho con ☕ y React</div>
      </footer>
    </>
  );
}
