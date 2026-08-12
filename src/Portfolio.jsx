import { useEffect, useRef, useState } from "react";
import "./styles/portfolio.css";

// Importación de datos estáticos
import { SECTIONS } from "./data/portfolioData";

// Importación de componentes modulares
import Navigation from "./components/layout/Navigation";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import StackSection from "./components/sections/StackSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import EducationSection from "./components/sections/EducationSection";
import ContactSection from "./components/sections/ContactSection";

/**
 * Componente Principal Orquestador del Portfolio.
 * Coordina los observadores de scroll para la navegación activa,
 * la barra de progreso de lectura superior y renderiza las diferentes secciones modulares.
 */
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollPct, setScrollPct] = useState(0);

  // Diccionario de referencias para observar qué sección está visible en pantalla
  const sectionRefs = useRef({});

  // Desplazamiento suave hacia cualquier sección por su ID
  const scrollToSection = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // IntersectionObserver para detectar qué sección está en el centro de la pantalla
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.5 }
    );

    SECTIONS.forEach((id) => {
      const el = sectionRefs.current[id];
      if (el) io.observe(el);
    });

    // Cálculo del porcentaje de scroll de la página completa
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setScrollPct(isFinite(pct) ? pct : 0);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: "'Inter',sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* Fondo ambiental decorativo: cuadrícula y resplandor radial */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(var(--border-soft) 1px, transparent 1px), linear-gradient(90deg, var(--border-soft) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 90%)",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 90%)",
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 600,
          zIndex: 0,
          pointerEvents: "none",
          background: "radial-gradient(circle, rgba(255,180,84,0.10) 0%, transparent 65%)",
          filter: "blur(10px)",
        }}
      />

      {/* Componente de Navegación (Header + Gutter + Barra de progreso) */}
      <Navigation
        activeSection={activeSection}
        scrollPct={scrollPct}
        scrollToSection={scrollToSection}
      />

      {/* Ámbito Principal de Contenido */}
      <main className="pf-main" style={{ position: "relative", zIndex: 1, marginLeft: 56 }}>
        <HeroSection
          sectionRef={(el) => (sectionRefs.current.hero = el)}
          scrollToSection={scrollToSection}
        />
        <AboutSection sectionRef={(el) => (sectionRefs.current.about = el)} />
        <StackSection sectionRef={(el) => (sectionRefs.current.stack = el)} />
        <ExperienceSection sectionRef={(el) => (sectionRefs.current.exp = el)} />
        <ProjectsSection sectionRef={(el) => (sectionRefs.current.projects = el)} />
        <EducationSection sectionRef={(el) => (sectionRefs.current.edu = el)} />
        <ContactSection sectionRef={(el) => (sectionRefs.current.contact = el)} />
      </main>
    </div>
  );
}
