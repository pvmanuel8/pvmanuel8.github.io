import { useRef, useState } from "react";
import Reveal from "../common/Reveal";
import { PROJECTS } from "../../data/portfolioData";

/**
 * Sección "Proyectos".
 * Muestra un carrusel de proyectos interactivo con:
 * - Desplazamiento por arrastre de ratón (Drag to scroll)
 * - Botones de navegación flecha izquierda / derecha
 * - Indicadores tipo 'dots'
 * - Efecto Tilt 3D (inclinación perspectiva) al pasar el cursor sobre cada tarjeta
 * 
 * @param {React.Ref} sectionRef - Referencia para el observador de scroll.
 */
export default function ProjectsSection({ sectionRef }) {
  const [activeCard, setActiveCard] = useState(0);

  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0 });

  // Calcula el ancho individual de cada tarjeta más el margen entre ellas
  const cardStep = () => (cardRefs.current[0]?.offsetWidth || 340) + 22;

  // Desplaza el carrusel a una tarjeta específica según su índice
  const scrollToCard = (i) => {
    trackRef.current?.scrollTo({ left: i * cardStep(), behavior: "smooth" });
  };

  // Desplaza el carrusel en la dirección indicada (-1 o +1)
  const slide = (dir) => {
    trackRef.current?.scrollBy({ left: dir * cardStep(), behavior: "smooth" });
  };

  // Evento de scroll en el carrusel para sincronizar el dot activo
  const onTrackScroll = () => {
    if (!trackRef.current) return;
    setActiveCard(Math.round(trackRef.current.scrollLeft / cardStep()));
  };

  // Lógica de arrastre manual con ratón (Mouse Dragging)
  const onMouseDown = (e) => {
    dragState.current = {
      isDown: true,
      startX: e.pageX - trackRef.current.offsetLeft,
      scrollLeft: trackRef.current.scrollLeft,
    };
  };

  const onMouseUp = () => {
    dragState.current.isDown = false;
  };

  const onMouseMove = (e) => {
    if (!dragState.current.isDown || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = dragState.current.scrollLeft - (x - dragState.current.startX) * 1.2;
  };

  // Efecto de inclinación 3D (Tilt) basado en la posición del ratón sobre la tarjeta
  const onCardTilt = (e, i) => {
    const card = cardRefs.current[i];
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  };

  // Restablece la tarjeta a su posición original al salir el cursor
  const resetTilt = (i) => {
    if (cardRefs.current[i]) cardRefs.current[i].style.transform = "";
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ padding: "60px 0 130px", borderTop: "1px solid var(--border-soft)" }}
    >
      {/* Encabezado con título y botones de navegación de carrusel */}
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 20,
        }}
      >
        <Reveal>
          <div className="pf-eyebrow">04 · Proyectos</div>
          <h2 className="pf-h" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)" }}>
            Cosas que he construido
          </h2>
        </Reveal>

        {/* Botones Flecha Anterior / Siguiente (Solo si hay más de 1 proyecto) */}
        {PROJECTS.length > 1 && (
          <Reveal style={{ display: "flex", gap: 10 }}>
            <button
              className="pf-btn-ghost"
              onClick={() => slide(-1)}
              aria-label="Anterior proyecto"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--text)",
                cursor: "pointer",
              }}
            >
              ←
            </button>
            <button
              className="pf-btn-ghost"
              onClick={() => slide(1)}
              aria-label="Siguiente proyecto"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--text)",
                cursor: "pointer",
              }}
            >
              →
            </button>
          </Reveal>
        )}
      </div>

      {/* Contenedor desplazable de tarjetas centrado */}
      <Reveal style={{ maxWidth: 1120, margin: "36px auto 0", padding: "0 40px" }}>
        <div
          ref={trackRef}
          className="pf-track"
          onScroll={onTrackScroll}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onMouseMove={onMouseMove}
          style={{
            display: "flex",
            gap: 22,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            padding: "4px 0 20px",
            cursor: PROJECTS.length > 1 ? "grab" : "default",
            justifyContent: PROJECTS.length < 3 ? "center" : "flex-start",
            flexWrap: PROJECTS.length < 3 ? "wrap" : "nowrap",
          }}
        >
          {PROJECTS.map((p, i) => (
            <div
              key={p.n}
              ref={(el) => (cardRefs.current[i] = el)}
              className="pf-card"
              onMouseMove={(e) => onCardTilt(e, i)}
              onMouseLeave={() => resetTilt(i)}
              style={{
                flex: "0 0 auto",
                width: PROJECTS.length < 3 ? 420 : 340,
                maxWidth: "100%",
                scrollSnapAlign: "start",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                overflow: "hidden",
                transition: "transform .35s ease, box-shadow .35s ease",
                willChange: "transform",
              }}
            >
              {/* Imagen/Cabecera visual del proyecto con degradado */}
              <div
                style={{
                  height: 240,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: p.image ? `url(${p.image}) 0% 0% / 125% auto no-repeat` : p.bg,
                }}
              >
                {!p.image && (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg, transparent 40%, rgba(18,22,31,0.9) 100%)",
                      }}
                    />
                    <span
                      className="pf-h"
                      style={{
                        position: "relative",
                        zIndex: 1,
                        fontWeight: 700,
                        fontSize: "2.2rem",
                        color: "rgba(255,255,255,0.85)",
                      }}
                    >
                      {p.n}
                    </span>
                  </>
                )}
                {p.image && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, transparent 75%, rgba(18,22,31,0.3) 100%)",
                    }}
                  />
                )}
              </div>

              {/* Información del Proyecto */}
              <div style={{ padding: "24px 22px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <span
                    className="pf-mono"
                    style={{
                      fontSize: 11,
                      color: "var(--accent)",
                      background: "var(--accent-soft)",
                      border: "1px solid rgba(255, 180, 84, 0.25)",
                      padding: "3px 10px",
                      borderRadius: 20,
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {p.tag}
                  </span>
                </div>

                <h3 className="pf-h" style={{ fontSize: "1.3rem", fontWeight: 700, marginTop: 12, color: "var(--text)" }}>
                  {p.title}
                </h3>

                <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginTop: 8, lineHeight: 1.6, margin: "8px 0 0" }}>
                  {p.desc}
                </p>

                {/* Tags de tecnologías del proyecto */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="pf-mono"
                      style={{
                        fontSize: 11,
                        color: "var(--text-muted)",
                        background: "var(--surface-2)",
                        border: "1px solid var(--border-soft)",
                        padding: "3px 9px",
                        borderRadius: 6,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Enlaces de Acción: Probar Demo y Repositorio GitHub */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22, paddingTop: 16, borderTop: "1px solid var(--border-soft)" }}>
                  {(p.demoLink || p.caseLink) && (
                    <a
                      href={p.demoLink || p.caseLink}
                      target={p.demoLink && p.demoLink !== "#" ? "_blank" : "_self"}
                      rel="noreferrer"
                      className="pf-btn pf-btn-primary"
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        padding: "9px 16px",
                        fontSize: 12.5,
                        borderRadius: 8,
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                      Probar Demo
                    </a>
                  )}

                  {p.githubLink && (
                    <a
                      href={p.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="pf-btn pf-btn-ghost"
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        padding: "9px 16px",
                        fontSize: 12.5,
                        borderRadius: 8,
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicadores de tarjeta activa (Dots - Solo si hay más de 1 proyecto) */}
        {PROJECTS.length > 1 && (
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 14 }}>
            {PROJECTS.map((p, i) => (
              <div
                key={p.n}
                className={`pf-dot${activeCard === i ? " active" : ""}`}
                onClick={() => scrollToCard(i)}
              />
            ))}
          </div>
        )}
      </Reveal>
    </section>
  );
}
