import { useEffect, useState } from "react";

/**
 * TechCursor
 * Cursor táctico cibernético con retícula de puntería, suave seguimiento (spring physics)
 * y efectos de expansión magnética al pasar sobre elementos interactivos.
 */
export default function TechCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detectar si el dispositivo es táctil para deshabilitar el cursor de escritorio
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Verificar si el elemento bajo el puntero es interactivo
      const target = e.target;
      if (target) {
        const isInteractive =
          target.closest("button, a, input, textarea, select, .pf-btn, .pf-card, .pf-pill, .pf-gutter-dot, [data-interactive]");
        setIsHovered(!!isInteractive);
      }
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // Animación fluida de seguimiento del anillo exterior con lerp
  useEffect(() => {
    if (isTouchDevice) return;
    let animFrame;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    let currentX = ringPos.x;
    let currentY = ringPos.y;

    const animate = () => {
      currentX = lerp(currentX, pos.x, 0.22);
      currentY = lerp(currentY, pos.y, 0.22);
      setRingPos({ x: currentX, y: currentY });
      animFrame = requestAnimationFrame(animate);
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [pos, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Ocultar el cursor por defecto del sistema */}
      <style>{`
        @media (min-width: 769px) {
          body, a, button, input, textarea, select {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Punto central del cursor */}
      <div
        style={{
          position: "fixed",
          top: pos.y,
          left: pos.x,
          width: isHovered ? 8 : 5,
          height: isHovered ? 8 : 5,
          background: isHovered ? "var(--accent-2)" : "var(--accent)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 99999,
          boxShadow: `0 0 10px ${isHovered ? "var(--accent-2)" : "var(--accent)"}`,
          transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease",
        }}
      />

      {/* Anillo exterior táctico cibernético */}
      <div
        style={{
          position: "fixed",
          top: ringPos.y,
          left: ringPos.x,
          width: isHovered ? 42 : isMouseDown ? 24 : 32,
          height: isHovered ? 42 : isMouseDown ? 24 : 32,
          border: `1px solid ${isHovered ? "rgba(125, 211, 252, 0.75)" : "rgba(255, 180, 84, 0.5)"}`,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 99998,
          transition: "width 0.25s cubic-bezier(0.1, 0.8, 0.3, 1), height 0.25s cubic-bezier(0.1, 0.8, 0.3, 1), border-color 0.25s ease",
          boxShadow: isHovered
            ? "0 0 20px rgba(125, 211, 252, 0.3)"
            : "0 0 12px rgba(255, 180, 84, 0.15)",
        }}
      >
        {/* Retícula en esquinas si está hovered */}
        {isHovered && (
          <>
            <div
              style={{
                position: "absolute",
                top: -3,
                left: -3,
                width: 6,
                height: 6,
                borderTop: "2px solid var(--accent-2)",
                borderLeft: "2px solid var(--accent-2)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: -3,
                right: -3,
                width: 6,
                height: 6,
                borderTop: "2px solid var(--accent-2)",
                borderRight: "2px solid var(--accent-2)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -3,
                left: -3,
                width: 6,
                height: 6,
                borderBottom: "2px solid var(--accent-2)",
                borderLeft: "2px solid var(--accent-2)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -3,
                right: -3,
                width: 6,
                height: 6,
                borderBottom: "2px solid var(--accent-2)",
                borderRight: "2px solid var(--accent-2)",
              }}
            />
          </>
        )}
      </div>
    </>
  );
}
