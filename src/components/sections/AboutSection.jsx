import Reveal from "../common/Reveal";
import { STATS } from "../../data/portfolioData";

/**
 * Sección "Sobre Mí" (About).
 * Presenta una descripción profesional más extensa e incluye tarjetas con métricas y estadísticas clave.
 * 
 * @param {React.Ref} sectionRef - Referencia para el observador de sección visible.
 */
export default function AboutSection({ sectionRef }) {
  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        padding: "130px 40px",
        borderTop: "1px solid var(--border-soft)",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 60 }}>
        {/* Columna Izquierda: Encabezado */}
        <Reveal>
          <div className="pf-eyebrow">01 · Sobre mí</div>
          <h2 className="pf-h" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)" }}>
            Me gusta construir cosas que funcionan de verdad.
          </h2>
        </Reveal>

        {/* Columna Derecha: Párrafos de información y cuadrícula de estadísticas */}
        <Reveal>
          <p style={{ color: "var(--text-muted)", fontSize: "1.02rem" }}>
            Soy desarrollador Back-end con menos de 1 año de experiencia diseñando y construyendo software escalable, desde paneles internos hasta plataformas con miles de usuarios activos. Me muevo cómodo entre el frontend y el backend, pero lo que más me interesa es el punto donde el código se convierte en una experiencia que alguien puede usar sin pensar.
          </p>
          <p style={{ marginTop: 14, color: "var(--text-muted)", fontSize: "1.02rem" }}>
            Fuera del código, dedico tiempo a aprender sobre Inteligencia Artificial y desarrollo de videojuegos.
          </p>

          {/* Cuadrícula de tarjetas con métricas destacadas */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 28 }}>
            {STATS.map((stat) => (
              <div
                key={stat.label}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: "18px 20px",
                  background: "var(--surface)",
                }}
              >
                <div className="pf-h" style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--accent)" }}>
                  {stat.number}
                </div>
                <div className="pf-mono" style={{ fontSize: 11.5, color: "var(--text-faint)", marginTop: 4 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
