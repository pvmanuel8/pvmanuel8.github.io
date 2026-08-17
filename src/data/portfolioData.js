/**
 * ==========================================
 * DATOS CENTRALIZADOS DEL PORTFOLIO
 * ==========================================
 * Este archivo concentra toda la información estática del portfolio.
 * Al separar los datos del código de renderizado, es muy fácil actualizar
 * el contenido (añadir proyectos, cambiar experiencia, editar textos)
 * sin necesidad de tocar la lógica de los componentes de React.
 */

// Roles que van rotando con efecto mecanográfico (typewriter) en la sección Hero
export const ROLES = [
  "Desarrollador Back-end",
];

// Fragmentos de código en formato de objeto para simular el tipeado en la terminal interactiva
// t: texto a escribir, c: clase de color ('p': normal/puntuación, 'k': keyword, 's': string, 'c': comentario)
export const TERM_CODE = [
  { t: "const ", c: "k" },
  { t: "manuel", c: "p" },
  { t: " = {\n", c: "p" },
  { t: "  name", c: "p" },
  { t: ": '", c: "p" },
  { t: "Manuel Piñeiro", c: "s" },
  { t: "',\n", c: "p" },
  { t: "  role", c: "p" },
  { t: ": '", c: "p" },
  { t: "Back-end Developer", c: "s" },
  { t: "',\n", c: "p" },
  { t: "  based_in", c: "p" },
  { t: ": '", c: "p" },
  { t: "Vilagarcia de Arousa, ES", c: "s" },
  { t: "',\n", c: "p" },
  { t: "  loves", c: "p" },
  { t: ": [", c: "p" },
  { t: "'clean code'", c: "s" },
  { t: ", ", c: "p" },
  { t: "'coffee'", c: "s" },
  { t: ", ", c: "p" },
  { t: "'good typography'", c: "s" },
  { t: "],\n", c: "p" },
  { t: "  available", c: "p" },
  { t: ": ", c: "p" },
  { t: "true", c: "k" },
  { t: "\n", c: "p" },
  { t: "};", c: "p" },
  { t: "\n\n// ", c: "c" },
  { t: "gracias por pasarte 👋", c: "c" },
];

// Estadísticas que se muestran en la sección "Sobre mí"
export const STATS = [
  { number: "<1", label: "AÑO DE EXPERIENCIA" },
  { number: "1", label: "PROYECTOS ENTREGADOS" },
  { number: "30", label: "PERSONAS MENTORIZADAS" }
];

// Agrupación de tecnologías y herramientas por categoría para la sección "Stack"
export const STACK_GROUPS = [
  {
    category: "Frontend",
    items: ["React", "JavaScript", "Next.js", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    category: "Backend",
    items: ["Java", "Python", "PostgreSQL", "FastAPI", "MySQL"],
  },
  {
    category: "Herramientas",
    items: ["Git", "Docker", "Figma", "Vercel", "Supabase", "Render",],
  },
];

// Proyectos destacados mostrados en el carrusel interactivo
export const PROJECTS = [
  {
    n: "01",
    bg: "linear-gradient(135deg,#2A2416,#3A2E12)",
    image: "/assets/gestoria.png",
    tag: "SaaS B2B & IA",
    title: "GestorIA",
    desc: "Plataforma de automatización documental. Integra arquitectura RAG, LLMs locales y procesamiento asíncrono de correos.",
    stack: ["Python", "FastAPI", "React", "PostgreSQL"],
    demoLink: "#",
    githubLink: "https://github.com/pvmanuel8",
  },
];

// Trayectoria profesional para la sección "Experiencia"
export const EXPERIENCE = [
  {
    date: "Feb - Jun 2026",
    role: "Desarrollador Full Stack Junior",
    org: "B2AI",
    desc: "Desarrollo completo de un SaaS B2B para automatización documental. Construí el backend (Python/FastAPI) con arquitecturas RAG e IA para procesar documentos y correos asíncronamente. Frontend dinámico y responsivo desarrollado en React.",
  }

];

// Historial educativo y certificaciones
export const EDUCATION = [
  {
    title: "Ciclo Medio Sistemas Microinformaticos y Redes",
    sub: "IES Armando Cotarelo",
    date: "2018 — 2024",
  },
  {
    title: "Ciclo Superior Desarrollo de Aplicaciones Multiplataforma",
    sub: "IES Armando Cotarelo",
    date: "2024 — 2026",
  },
];

// Listado ordenado de IDs de secciones para el scroll y la navegación
export const SECTIONS = ["hero", "about", "stack", "exp", "projects", "edu", "contact"];

// Etiquetas legibles para cada sección en el menú de navegación
export const SECTION_LABELS = {
  hero: "hero",
  about: "sobre mí",
  stack: "stack",
  exp: "experiencia",
  projects: "proyectos",
  edu: "formación",
  contact: "contacto",
};
