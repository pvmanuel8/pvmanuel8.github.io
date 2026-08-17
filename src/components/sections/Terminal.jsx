import { useEffect, useRef, useState } from "react";
import { TERM_CODE } from "../../data/portfolioData";

/**
 * Componente Terminal Interactivo 2.0.
 * Inicialmente tipea la definición JavaScript de Manuel, y a continuación
 * se transforma en un Shell interactivo completamente ejecutable.
 */
export default function Terminal({ onTriggerMatrix }) {
  const [termNodes, setTermNodes] = useState([]);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [history, setHistory] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cmdLogs, setCmdLogs] = useState([]);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  // Animación inicial de mecanografiado
  useEffect(() => {
    const flat = [];
    TERM_CODE.forEach((chunk) => {
      for (const ch of chunk.t) {
        flat.push({ ch, cls: chunk.c });
      }
    });

    let i = 0;
    let timeoutId;
    const nodes = [];

    const tick = () => {
      if (i >= flat.length) {
        setIsTypingDone(true);
        return;
      }
      nodes.push(flat[i]);
      setTermNodes([...nodes]);
      i++;
      timeoutId = setTimeout(tick, flat[i - 1].ch === "\n" ? 35 : 12 + Math.random() * 16);
    };

    timeoutId = setTimeout(tick, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  // Auto-scroll al final del terminal al añadir comandos
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [cmdLogs, termNodes, inputVal]);

  // Manejador de lluvia Matrix interactiva
  useEffect(() => {
    if (!isMatrixActive) return;
    const canvas = document.getElementById("terminal-matrix-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    const width = (canvas.width = canvas.parentElement.offsetWidth);
    const height = (canvas.height = 240);

    const cols = Math.floor(width / 16);
    const ypos = Array(cols).fill(0);

    const matrixDraw = () => {
      ctx.fillStyle = "rgba(18, 22, 31, 0.15)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#27C93F";
      ctx.font = "13px 'JetBrains Mono', monospace";

      ypos.forEach((y, idx) => {
        const char = String.fromCharCode(Math.floor(Math.random() * 96) + 33);
        const x = idx * 16;
        ctx.fillText(char, x, y);

        if (y > 100 + Math.random() * 10000) ypos[idx] = 0;
        else ypos[idx] = y + 16;
      });

      animId = requestAnimationFrame(matrixDraw);
    };

    animId = requestAnimationFrame(matrixDraw);
    return () => cancelAnimationFrame(animId);
  }, [isMatrixActive]);

  // Procesador de comandos ingresados
  const handleCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Añadir a historial
    setHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const logEntry = { type: "input", text: rawCmd };
    let response = [];

    switch (cmd) {
      case "help":
        response = [
          { t: "Comandos disponibles en el shell:", c: "var(--accent)" },
          { t: "  whoami      - Información básica del desarrollador", c: "var(--text)" },
          { t: "  stack       - Resumen del stack tecnológico", c: "var(--text)" },
          { t: "  projects    - Proyectos destacados", c: "var(--text)" },
          { t: "  contact     - Formas de contacto directo", c: "var(--text)" },
          { t: "  cv          - Descargar currículum en PDF", c: "var(--text)" },
          { t: "  matrix      - Activar lluvia digital de código Matrix", c: "var(--accent-2)" },
          { t: "  sudo hire   - Ejecutar protocolo de contratación", c: "#27C93F" },
          { t: "  clear       - Limpiar pantalla", c: "var(--text-faint)" },
        ];
        break;

      case "whoami":
        response = [
          { t: "Manuel Piñeiro | Desarrollador Back-end & Full Stack", c: "var(--accent)" },
          { t: "Ubicación: Vilagarcía de Arousa, España", c: "var(--text-muted)" },
          { t: "Especializado en Python (FastAPI), Java, PostgreSQL e integración de arquitecturas RAG e IA.", c: "var(--text)" },
        ];
        break;

      case "stack":
        response = [
          { t: "⚡ Tech Stack Overview:", c: "var(--accent)" },
          { t: "  • Backend:  Python, FastAPI, Java, PostgreSQL, MySQL", c: "var(--text)" },
          { t: "  • Frontend: React, JavaScript, Next.js, HTML/CSS", c: "var(--text)" },
          { t: "  • DevOps:   Docker, Git, Supabase, Vercel, Render", c: "var(--text)" },
        ];
        break;

      case "projects":
        response = [
          { t: "🚀 Proyectos Destacados:", c: "var(--accent)" },
          { t: "  [01] GestorIA - SaaS B2B de Automatización Documental e IA", c: "var(--text)" },
          { t: "       Stack: Python, FastAPI, React, PostgreSQL, RAG Architecture", c: "var(--text-faint)" },
          { t: "       GitHub: https://github.com/pvmanuel8", c: "var(--accent-2)" },
        ];
        break;

      case "contact":
        response = [
          { t: "✉️ Canales de contacto:", c: "var(--accent)" },
          { t: "  • Email:    pvmanuel8@gmail.com", c: "var(--text)" },
          { t: "  • GitHub:   https://github.com/pvmanuel8", c: "var(--accent-2)" },
        ];
        break;

      case "cv":
        const link = document.createElement("a");
        link.href = "/cv.pdf";
        link.download = "CV_Manuel_Pineiro.pdf";
        link.click();
        response = [{ t: "📄 Descargando CV_Manuel_Pineiro.pdf...", c: "var(--accent-2)" }];
        break;

      case "matrix":
        setIsMatrixActive(true);
        response = [
          { t: "🟢 MODO MATRIX ACTIVADO. (Escribe 'exit' para salir)", c: "#27C93F" },
        ];
        break;

      case "exit":
        if (isMatrixActive) {
          setIsMatrixActive(false);
          response = [{ t: "Matrix desactivado.", c: "var(--text-faint)" }];
        } else {
          response = [{ t: "Nada de lo que salir.", c: "var(--text-faint)" }];
        }
        break;

      case "sudo hire":
      case "sudo hire manuel":
        response = [
          { t: "🔥 [SUDO PROTOCOL ACTIVATED]", c: "var(--accent)" },
          { t: "✔ Verificando competencias back-end... PASS", c: "#27C93F" },
          { t: "✔ Comprobando actitud y código limpio... PASS", c: "#27C93F" },
          { t: "🎉 ¡Felicidades! Has contratado a Manuel Piñeiro como Desarrollador Back-end.", c: "var(--accent-2)" },
        ];
        break;

      case "clear":
        setCmdLogs([]);
        setInputVal("");
        return;

      default:
        response = [
          {
            t: `Comando desconocido: "${rawCmd}". Escribe "help" para ver la lista de comandos.`,
            c: "#FF5F56",
          },
        ];
    }

    setCmdLogs((prev) => [...prev, logEntry, { type: "output", lines: response }]);
    setInputVal("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex + 1 < history.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const possibleCmds = ["help", "whoami", "stack", "projects", "contact", "cv", "matrix", "sudo hire", "clear"];
      const match = possibleCmds.find((c) => c.startsWith(inputVal.trim().toLowerCase()));
      if (match) setInputVal(match);
    }
  };

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(255, 180, 84, 0.1)",
        overflow: "hidden",
        position: "relative",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Encabezado macOS con barra de comandos de atajo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          background: "var(--surface-2)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F56" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27C93F" }} />
          <div className="pf-mono" style={{ marginLeft: 10, fontSize: 12, color: "var(--text-faint)" }}>
            bash - whoami.js
          </div>
        </div>

        <span
          className="pf-mono"
          style={{
            fontSize: 10.5,
            color: "var(--accent)",
            background: "var(--accent-soft)",
            padding: "2px 8px",
            borderRadius: 4,
            border: "1px solid rgba(255, 180, 84, 0.2)",
          }}
        >
          Escribe "help" para ayuda
        </span>
      </div>

      {/* Cuerpo del Terminal */}
      <div
        ref={bodyRef}
        className="pf-mono"
        style={{
          padding: "20px",
          fontSize: 13,
          lineHeight: 1.8,
          minHeight: 260,
          maxHeight: 360,
          overflowY: "auto",
          whiteSpace: "pre-wrap",
          position: "relative",
        }}
      >
        {/* Lluvia Matrix si se activa */}
        {isMatrixActive && (
          <canvas
            id="terminal-matrix-canvas"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 5,
            }}
          />
        )}

        {/* Tipeado inicial de la variable */}
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

        {/* Historial de comandos interactivos */}
        {cmdLogs.map((log, i) => (
          <div key={i} style={{ marginTop: 8 }}>
            {log.type === "input" ? (
              <div style={{ color: "var(--accent)" }}>
                <span style={{ color: "#27C93F", marginRight: 8 }}>guest@manuel:~$</span>
                {log.text}
              </div>
            ) : (
              <div style={{ marginLeft: 12 }}>
                {log.lines.map((line, li) => (
                  <div key={li} style={{ color: line.c }}>
                    {line.t}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Línea de entrada interactiva */}
        {isTypingDone && (
          <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
            <span style={{ color: "#27C93F", marginRight: 8 }}>guest@manuel:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pf-mono"
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--text)",
                fontSize: 13,
                flex: 1,
                fontFamily: "inherit",
              }}
              placeholder={cmdLogs.length === 0 ? 'escribe "help"...' : ""}
            />
          </div>
        )}
      </div>
    </div>
  );
}
