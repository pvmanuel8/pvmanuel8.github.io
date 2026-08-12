import Reveal from "../common/Reveal";
import { EXPERIENCE } from "../../data/portfolioData";

/**
 * Sección "Experiencia Profesional".
 * Muestra una línea de tiempo vertical (Timeline) con las posiciones laborales ocupadas.
 * 
 * @param {React.Ref} sectionRef - Referencia para el observador de sección visible.
 */
export default function ExperienceSection({ sectionRef }) {
  return (
    <section
      id="exp"
      ref={sectionRef}
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        padding: "60px 40px 130px",
        borderTop: "1px solid var(--border-soft)",
      }}
    >
      <Reveal>
        <div className="pf-eyebrow">03 · Experiencia</div>
        <h2 className="pf-h" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)" }}>
          Dónde he trabajado
        </h2>
      </Reveal>

      {/* Contenedor de la línea de tiempo vertical */}
      <div style={{ marginTop: 40, position: "relative", paddingLeft: 28 }}>
        {/* Línea vertical conectora */}
        <div
          style={{
            position: "absolute",
            left: 4,
            top: 6,
            bottom: 6,
            width: 1,
            background: "var(--border)",
          }}
        />

        {/* Lista de experiencias */}
        {EXPERIENCE.map((item, i) => (
          <Reveal
            key={item.role}
            style={{
              paddingBottom: i === EXPERIENCE.length - 1 ? 0 : 44,
              position: "relative",
            }}
          >
            {/* Punto indicador de la línea de tiempo */}
            <div
              style={{
                position: "absolute",
                left: -28,
                top: 6,
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "var(--bg)",
                border: "2px solid var(--accent)",
              }}
            />

            {/* Período de fechas */}
            <div className="pf-mono" style={{ fontSize: 12, color: "var(--accent)", marginBottom: 6 }}>
              {item.date}
            </div>

            {/* Puesto de trabajo */}
            <div className="pf-h" style={{ fontSize: "1.15rem", fontWeight: 600 }}>
              {item.role}
            </div>

            {/* Empresa / Organización */}
            <div style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginTop: 2 }}>
              {item.org}
            </div>

            {/* Descripción del puesto y logros */}
            <div style={{ color: "var(--text-muted)", marginTop: 10, fontSize: "0.95rem", maxWidth: "60ch" }}>
              {item.desc}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
