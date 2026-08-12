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
                width: 340,
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
                  height: 170,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: p.image ? `url(${p.image}) center/cover no-repeat` : p.bg,
                }}
              >
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
              </div>

              {/* Información del Proyecto */}
              <div style={{ padding: 22 }}>
                <div
                  className="pf-mono"
                  style={{
                    fontSize: 11,
                    color: "var(--accent)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {p.tag}
                </div>

                <div className="pf-h" style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: 8 }}>
                  {p.title}
                </div>

                <div style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: 8, lineHeight: 1.55 }}>
                  {p.desc}
                </div>

                {/* Tags de tecnologías del proyecto */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="pf-mono"
                      style={{
                        fontSize: 10.5,
                        color: "var(--text-faint)",
                        border: "1px solid var(--border-soft)",
                        padding: "3px 8px",
                        borderRadius: 12,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Enlaces al caso de estudio o repositorio */}
                <div className="pf-mono" style={{ display: "flex", gap: 16, marginTop: 16, fontSize: 12 }}>
                  <a href={p.caseLink} style={{ color: "var(--text-muted)" }}>
                    Ver caso →
                  </a>
                  <a href={p.githubLink} target="_blank" rel="noreferrer" style={{ color: "var(--text-muted)" }}>
                    GitHub
                  </a>
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
