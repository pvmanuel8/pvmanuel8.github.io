import { useEffect, useState } from "react";
import { TERM_CODE } from "../../data/portfolioData";

/**
 * Componente Terminal Interactivo.
 * Simula una ventana de consola donde se va tiroteando (animación de mecanografiado)
 * un objeto JavaScript con la información del desarrollador.
 */
export default function Terminal() {
  const [termNodes, setTermNodes] = useState([]);

  useEffect(() => {
    // Convierte la estructura de chunks en una lista plana de caracteres con sus respectivas clases de color
    const flat = [];
    TERM_CODE.forEach((chunk) => {
      for (const ch of chunk.t) {
        flat.push({ ch, cls: chunk.c });
      }
    });

    let i = 0;
    let timeoutId;
    const nodes = [];

    // Función recursiva que simula la pulsación de teclas con tiempos ligeramente aleatorios
    const tick = () => {
      if (i >= flat.length) return;
      nodes.push(flat[i]);
      setTermNodes([...nodes]);
      i++;
      // Da una pausa un poco mayor al hacer saltos de línea
      timeoutId = setTimeout(tick, flat[i - 1].ch === "\n" ? 40 : 14 + Math.random() * 18);
    };

    timeoutId = setTimeout(tick, 700);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
        overflow: "hidden",
      }}
    >
      {/* Barra superior de la ventana estilo macOS */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 16px",
          background: "var(--surface-2)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F56" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27C93F" }} />
        <div className="pf-mono" style={{ marginLeft: 10, fontSize: 12, color: "var(--text-faint)" }}>
          whoami.js
        </div>
      </div>

      {/* Cuerpo del código generado progresivamente */}
      <div
        className="pf-mono"
        style={{
          padding: "22px 20px",
          fontSize: 13.5,
          lineHeight: 1.85,
          minHeight: 220,
          whiteSpace: "pre-wrap",
        }}
      >
        {termNodes.map((n, i) => (
          <span
            key={i}
            style={{
              color:
                n.cls === "k"
                  ? "var(--accent-2)"
                  : n.cls === "s"
                  ? "var(--accent)"
                  : n.cls === "c"
                  ? "var(--text-faint)"
                  : "var(--text-muted)",
            }}
          >
            {n.ch}
          </span>
        ))}
      </div>
    </div>
  );
}
