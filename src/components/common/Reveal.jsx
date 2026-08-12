import { useEffect, useRef, useState } from "react";

/**
 * Componente Wrapper para animación de entrada al hacer scroll.
 * Utiliza la API nativa `IntersectionObserver` para detectar cuando
 * el elemento entra en la pantalla y desencadena una transición CSS suave.
 * 
 * @param {ReactNode} children - Elementos hijos a los que se aplicará la animación.
 * @param {string} className - Clases CSS adicionales opcionales.
 * @param {object} style - Estilos en línea adicionales.
 */
export default function Reveal({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Observador para detectar cuándo el elemento es visible en el viewport
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true); // Activa la visibilidad
            io.unobserve(e.target); // Detiene la observación una vez animado
          }
        });
      },
      { threshold: 0.15 } // Se activa cuando el 15% del elemento es visible
    );

    io.observe(el);

    // Limpieza al desmontar el componente
    return () => io.disconnect();
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
