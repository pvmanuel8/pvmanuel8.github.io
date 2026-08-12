import Reveal from "../common/Reveal";
import { STACK_GROUPS } from "../../data/portfolioData";

/**
 * Sección "Stack Tecnológico".
 * Desglosa las tecnologías y herramientas dominadas, agrupadas en Frontend, Backend y Herramientas.
 * 
 * @param {React.Ref} sectionRef - Referencia para el observador de scroll.
 */
export default function StackSection({ sectionRef }) {
  return (
    <section
      id="stack"
      ref={sectionRef}
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        padding: "60px 40px 130px",
        borderTop: "1px solid var(--border-soft)",
      }}
    >
      <Reveal>
        <div className="pf-eyebrow">02 · Stack</div>
        <h2 className="pf-h" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)" }}>
          Con qué trabajo
        </h2>
      </Reveal>

      {/* Grid de 3 columnas para cada grupo de tecnologías */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginTop: 36 }}>
        {STACK_GROUPS.map((group) => (
          <Reveal key={group.category}>
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: 22,
                background: "var(--surface)",
                height: "100%",
              }}
            >
              <h3
                className="pf-mono"
                style={{
                  fontSize: "0.95rem",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                  marginBottom: 16,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {group.category}
              </h3>

              {/* Badges / Pills para cada herramienta */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {group.items.map((item) => (
                  <span key={item} className="pf-pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
