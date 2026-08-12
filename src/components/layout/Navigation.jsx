import { SECTIONS, SECTION_LABELS } from "../../data/portfolioData";

/**
 * Componente de Navegación Global.
 * Incluye:
 * 1. Barra de progreso superior indicando el porcentaje de lectura.
 * 2. Menú lateral fijo (Gutter) con indicadores de puntos para cada sección.
 * 3. Cabecera superior (Header) con logo y enlaces a las secciones principales.
 * 
 * @param {string} activeSection - ID de la sección visible actualmente.
 * @param {number} scrollPct - Porcentaje de avance de scroll (0 - 100).
 * @param {function} scrollToSection - Función callback para desplazarse suavemente a una sección.
 */
export default function Navigation({ activeSection, scrollPct, scrollToSection }) {
  return (
    <>
      {/* Barra de progreso de desplazamiento superior */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 2,
          background: "var(--accent)",
          zIndex: 60,
          width: `${scrollPct}%`,
          transition: "width .1s linear",
        }}
      />

      {/* Menú lateral fijo tipo Gutter (pantallas grandes) */}
      <nav
        className="pf-gutter"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: 56,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 22,
          zIndex: 50,
          borderRight: "1px solid var(--border-soft)",
        }}
      >
        {SECTIONS.map((id) => (
          <div
            key={id}
            className={`pf-gutter-dot${activeSection === id ? " active" : ""}`}
            data-label={SECTION_LABELS[id]}
            onClick={() => scrollToSection(id)}
          />
        ))}
      </nav>

      {/* Cabecera superior con logotipo y enlaces */}
      <header
        className="pf-nav"
        style={{
          position: "fixed",
          top: 0,
          left: 56,
          right: 0,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 40px",
          backdropFilter: "blur(10px)",
          background: "rgba(11,14,20,0.55)",
          borderBottom: "1px solid var(--border-soft)",
        }}
      >
        {/* Logotipo personalizado */}
        <div className="pf-mono" style={{ fontSize: 14 }}>
          manuel<span style={{ color: "var(--accent)" }}>.</span>dev
        </div>

        {/* Enlaces a las secciones */}
        <div
          className="pf-navlinks pf-mono"
          style={{ display: "flex", gap: 28, fontSize: 13, color: "var(--text-muted)" }}
        >
          {SECTIONS.slice(1).map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(id);
              }}
              style={{ color: "inherit" }}
            >
              {SECTION_LABELS[id]}
            </a>
          ))}
        </div>
      </header>
    </>
  );
}
