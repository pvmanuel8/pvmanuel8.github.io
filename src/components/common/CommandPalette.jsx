import { useEffect, useState } from "react";

/**
 * CommandPalette (Cmd + K / Ctrl + K)
 * Paleta de comandos táctica flotante estilo Raycast / VS Code.
 * Permite la búsqueda rápida de secciones, descarga de CV y disparador de comandos rápidos.
 */
export default function CommandPalette({ isOpen, onClose, scrollToSection, triggerMatrixMode }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    {
      id: "hero",
      title: "Ir a Inicio / Hero",
      category: "Navegación",
      icon: "🏠",
      action: () => scrollToSection("hero"),
    },
    {
      id: "about",
      title: "Ir a Sobre Mí",
      category: "Navegación",
      icon: "👤",
      action: () => scrollToSection("about"),
    },
    {
      id: "stack",
      title: "Ir a Habilidades & Stack",
      category: "Navegación",
      icon: "⚡",
      action: () => scrollToSection("stack"),
    },
    {
      id: "exp",
      title: "Ir a Experiencia Profesional",
      category: "Navegación",
      icon: "💼",
      action: () => scrollToSection("exp"),
    },
    {
      id: "projects",
      title: "Ir a Proyectos Destacados",
      category: "Navegación",
      icon: "🚀",
      action: () => scrollToSection("projects"),
    },
    {
      id: "edu",
      title: "Ir a Formación Académica",
      category: "Navegación",
      icon: "🎓",
      action: () => scrollToSection("edu"),
    },
    {
      id: "contact",
      title: "Ir a Contacto",
      category: "Navegación",
      icon: "✉️",
      action: () => scrollToSection("contact"),
    },
    {
      id: "cv",
      title: "Descargar CV (PDF)",
      category: "Documentos",
      icon: "📄",
      action: () => {
        const link = document.createElement("a");
        link.href = "/cv.pdf";
        link.download = "CV_Manuel_Pineiro.pdf";
        link.click();
      },
    },
    {
      id: "matrix",
      title: "Modo Lluvia Matrix en la Terminal",
      category: "Efectos Sci-Fi",
      icon: "🟢",
      action: () => {
        scrollToSection("hero");
        if (triggerMatrixMode) triggerMatrixMode();
      },
    },
    {
      id: "email",
      title: "Copiar Email al Portapapeles",
      category: "Contacto Directo",
      icon: "📋",
      action: () => {
        navigator.clipboard.writeText("pvmanuel8@gmail.com");
        alert("Email copiado al portapapeles: pvmanuel8@gmail.com");
      },
    },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          setQuery("");
          setSelectedIndex(0);
          // abrir
          if (isOpen !== undefined) {
            // prop reactiva
          }
        }
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].action();
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose, scrollToSection]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99990,
        background: "rgba(11, 14, 20, 0.85)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "14vh",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "90%",
          maxWidth: 620,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 30px rgba(255, 180, 84, 0.15)",
          overflow: "hidden",
          animation: "cmdScale 0.2s cubic-bezier(0.1, 0.8, 0.3, 1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes cmdScale {
            from { opacity: 0; transform: scale(0.95) translateY(-10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>

        {/* Input de búsqueda estilo terminal táctica */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 20px",
            borderBottom: "1px solid var(--border-soft)",
            background: "var(--surface-2)",
          }}
        >
          <span style={{ fontSize: 18, color: "var(--accent)" }}>⌘</span>
          <input
            type="text"
            autoFocus
            placeholder="Escribe un comando o busca una sección... (Esc para salir)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pf-mono"
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--text)",
              fontSize: 14.5,
            }}
          />
          <kbd
            className="pf-mono"
            style={{
              fontSize: 11,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              padding: "3px 7px",
              borderRadius: 4,
              color: "var(--text-muted)",
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Lista de resultados */}
        <div style={{ maxHeight: 340, overflowY: "auto", padding: "8px 0" }}>
          {filtered.length === 0 ? (
            <div
              className="pf-mono"
              style={{ padding: "28px 20px", textAlign: "center", color: "var(--text-faint)", fontSize: 13 }}
            >
              No se encontraron comandos para "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => {
              const active = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 20px",
                    background: active ? "rgba(255, 180, 84, 0.1)" : "transparent",
                    borderLeft: active ? "3px solid var(--accent)" : "3px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 16 }}>{item.icon}</span>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: active ? 600 : 400,
                        color: active ? "var(--accent)" : "var(--text)",
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                  <span
                    className="pf-mono"
                    style={{
                      fontSize: 11,
                      color: "var(--text-faint)",
                      background: "var(--surface-2)",
                      padding: "2px 8px",
                      borderRadius: 4,
                    }}
                  >
                    {item.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer de atajos */}
        <div
          className="pf-mono"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 20px",
            background: "var(--surface-2)",
            borderTop: "1px solid var(--border-soft)",
            fontSize: 11,
            color: "var(--text-faint)",
          }}
        >
          <span>Navegar con ↑ ↓</span>
          <span>Ejecutar ↵</span>
        </div>
      </div>
    </div>
  );
}
