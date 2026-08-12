import Reveal from "../common/Reveal";
import { EDUCATION } from "../../data/portfolioData";

/**
 * Sección "Formación Académica y Certificaciones".
 * Muestra una lista de los títulos universitarios y certificaciones obtenidas.
 * 
 * @param {React.Ref} sectionRef - Referencia para el observador de scroll.
 */
export default function EducationSection({ sectionRef }) {
  return (
    <section
      id="edu"
      ref={sectionRef}
      className="pf-section"
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        padding: "60px 40px 130px",
        borderTop: "1px solid var(--border-soft)",
      }}
    >
      <Reveal>
        <div className="pf-eyebrow">05 · Formación</div>
        <h2 className="pf-h" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)" }}>
          Formación
        </h2>
      </Reveal>

      {/* Lista de elementos académicos */}
      <div style={{ marginTop: 36, display: "grid", gap: 16 }}>
        {EDUCATION.map((e) => (
          <Reveal key={e.title}>
            <div
              className="pf-edu-item"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 20,
                padding: "22px 24px",
                border: "1px solid var(--border)",
                borderRadius: 10,
                background: "var(--surface)",
                transition: "border-color .25s ease, transform .25s ease",
              }}
            >
              <div>
                <h3 className="pf-h" style={{ fontSize: "1.05rem" }}>
                  {e.title}
                </h3>
                <div style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginTop: 4 }}>
                  {e.sub}
                </div>
              </div>

              <div className="pf-mono" style={{ fontSize: 12, color: "var(--text-faint)", whiteSpace: "nowrap" }}>
                {e.date}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
