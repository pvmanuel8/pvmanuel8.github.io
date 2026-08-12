import { useEffect, useState } from "react";
import Reveal from "../common/Reveal";
import Terminal from "./Terminal";
import { ROLES } from "../../data/portfolioData";

/**
 * Sección Hero (Presentación Principal).
 * Presenta el nombre, disponibilidad, efecto de rotación de roles estilo máquina de escribir,
 * botones principales de acción y la simulación interactiva de terminal.
 * 
 * @param {React.Ref} sectionRef - Referencia para observar cuándo está visible en pantalla.
 * @param {function} scrollToSection - Función callback para navegar a otra sección.
 */
export default function HeroSection({ sectionRef, scrollToSection }) {
  const [roleText, setRoleText] = useState("");

  // Efecto de rotación y borrado estilo mecanógrafo (Typewriter)
  useEffect(() => {
    let ri = 0;
    let ci = 0;
    let deleting = false;
    let timeoutId;

    const tick = () => {
      const word = ROLES[ri];
      if (!deleting) {
        ci++;
        setRoleText(word.slice(0, ci));
        if (ci === word.length) {
          deleting = true;
          timeoutId = setTimeout(tick, 1400); // Pausa tras terminar de escribir una palabra
          return;
        }
      } else {
        ci--;
        setRoleText(word.slice(0, ci));
        if (ci === 0) {
          deleting = false;
          ri = (ri + 1) % ROLES.length; // Pasa a la siguiente palabra
        }
      }
      timeoutId = setTimeout(tick, deleting ? 35 : 65);
    };

    timeoutId = setTimeout(tick, 200);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        padding: "120px 40px 80px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 64, alignItems: "center" }}>
        <div>
          {/* Ubicación y estado laboral */}
          <div className="pf-eyebrow">Vilagarcía de Arousa, España — disponible en remoto</div>
          
          {/* Nombre y Título principal */}
          <h1 className="pf-h" style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 700, lineHeight: 1.05 }}>
            Manuel Piñeiro
          </h1>

          {/* Texto dinámico con cursor parpadeante */}
          <div className="pf-mono" style={{ marginTop: 14, fontSize: "1.05rem", color: "var(--accent)", height: "1.4em" }}>
            {roleText}
            <span className="pf-cursor" />
          </div>

          {/* Resumen o biografía corta */}
          <p style={{ marginTop: 22, color: "var(--text-muted)", fontSize: "1.05rem", maxWidth: "46ch" }}>
            Construyo productos web rápidos, accesibles y con detalles que se notan. Del prototipo a producción, sin perder de vista a quien lo usa.
          </p>

          {/* Botones de acción directos */}
          <div style={{ display: "flex", gap: 14, marginTop: 34, flexWrap: "wrap" }}>
            <a
              href="#projects"
              className="pf-btn pf-btn-primary"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("projects");
              }}
            >
              Ver proyectos →
            </a>
            <a href="/cv.pdf" download="CV_Manuel_Pineiro.pdf" target="_blank" rel="noreferrer" className="pf-btn pf-btn-ghost">
              Descargar CV
            </a>
          </div>
        </div>

        {/* Terminal animada en la columna derecha */}
        <Reveal>
          <Terminal />
        </Reveal>
      </div>
    </section>
  );
}
