import { useEffect, useRef, useState } from "react";

/**
 * Componente Wrapper para animación de entrada al hacer scroll.
 * Utiliza la API nativa `IntersectionObserver` para detectar cuando
 * el elemento entra en la pantalla y desencadena una transición CSS suave.
 * Incluye fallback automático para garantizar visibilidad inmediata.
 */
export default function Reveal({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.01 }
    );

    io.observe(el);

    // Fallback de seguridad: asegurar visibilidad a los 400ms por si el observer no se dispara
    const fallbackTimer = setTimeout(() => setInView(true), 400);

    return () => {
      io.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity .7s cubic-bezier(.16,.8,.24,1), transform .7s cubic-bezier(.16,.8,.24,1)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
