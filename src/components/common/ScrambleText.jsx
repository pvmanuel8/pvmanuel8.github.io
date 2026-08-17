import { useEffect, useState, useCallback } from "react";

const CYBER_CHARS = "ABCDEFGHIKLMNOPQRSTVXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/";

/**
 * ScrambleText
 * Efecto de decodificación cibernética / cifrado matriz que anima el texto al montar
 * o al pasar el cursor sobre el elemento.
 */
export default function ScrambleText({
  text,
  className = "",
  style = {},
  scrambleOnHover = true,
  as: Component = "span",
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length * 3;

    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / 3) {
              return text[index];
            }
            return CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }

      iteration += 1;
    }, 28);
  }, [text, isScrambling]);

  useEffect(() => {
    scramble();
  }, [text]);

  return (
    <Component
      className={className}
      style={{ display: "inline-block", cursor: scrambleOnHover ? "pointer" : "default", ...style }}
      onMouseEnter={scrambleOnHover ? scramble : undefined}
    >
      {displayText}
    </Component>
  );
}
