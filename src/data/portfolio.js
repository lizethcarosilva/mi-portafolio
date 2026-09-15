import { HiOutlineCodeBracket, HiOutlineCubeTransparent, HiOutlineUserGroup } from "react-icons/hi2";
import { asset } from "../lib/asset";

const skill = (file) => asset(`/images/skill/${file}`);

export const profile = {
  name: "Lizeth Andrea Caro",
  roles: [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Desarrolladora Web",
    "Desarrolladora Python",
    "Analista de Datos",
    "Líder de Proyectos TI",
    "Tecnóloga en Sistemas",
  ],
  summary:
    "Transformo ideas en productos digitales reales, integrando frontend, backend y datos.",
  bio: "Desarrolladora Full Stack con experiencia en la construcción de aplicaciones web, APIs y soluciones digitales. He liderado proyectos end-to-end, desde el diseño de bases de datos y APIs hasta interfaces modernas con React y Angular, combinando análisis de datos y diseño técnico para entregar productos completos que realmente generan impacto.",
  stackLine: "React * Angular * Java * Python * RStudio * SQL * PostgreSQL * MySQL",
  email: "lizethandreacarosilva@gmail.com",
  linkedin: "https://www.linkedin.com/in/liancasi/",
  github: "https://github.com/lizethcarosilva",
};

export const stats = [
  { label: "Años de experiencia", value: "+3" },
  { label: "Tecnologías dominadas", value: "+15" },
  { label: "Certificaciones obtenidas", value: "+10" },
];

export const locations = [
  { code: "CO", label: "Colombia", primary: true },
  { code: "US", label: "Estados Unidos" },
  { code: "ES", label: "España" },
  { code: "MX", label: "México" },
];

export const valuePillars = [
  {
    title: "Desarrollo",
    Icon: HiOutlineCodeBracket,
    description:
      "Construyo aplicaciones web, APIs y soluciones Full Stack integrando frontend, backend y bases de datos.",
  },
  {
    title: "Diseño técnico",
    Icon: HiOutlineCubeTransparent,
    description:
      "Combino mis conocimientos de AutoCAD, Figma y desarrollo web para pensar soluciones desde una perspectiva técnica y visual.",
  },
  {
    title: "Comunicación",
    Icon: HiOutlineUserGroup,
    description:
      "Mi experiencia como monitora académica fortaleció mi capacidad para comunicar, acompañar procesos y explicar conceptos complejos de forma sencilla.",
  },
];

// Tailwind background classes per technology, used for pill tags across sections
export const techColors = {
  React: "bg-sky-600",
  Angular: "bg-red-600",
  TypeScript: "bg-blue-600",
  "Tailwind CSS": "bg-orange-500",
  Jira: "bg-emerald-600",
  GitHub: "bg-neutral-700",
  Python: "bg-indigo-800",
  "Google Drive": "bg-emerald-500",
  Deepnote: "bg-blue-800",
  RStudio: "bg-amber-600",
  "Spring Boot": "bg-green-700",
  Commerce: "bg-blue-900",
  PostgreSQL: "bg-blue-700",
  Docker: "bg-sky-700",
  GitLab: "bg-orange-600",
  FastAPI: "bg-teal-600",
  JavaScript: "bg-yellow-500",
  HTML: "bg-orange-600",
  CSS: "bg-blue-500",
  Bootstrap: "bg-purple-700",
};

export const techStack = [
  { name: "React.js", image: skill("react.png") },
  { name: "FastAPI", image: skill("fastapi.png") },
  { name: "Angular", image: skill("angular.png") },
  { name: "SQL", image: skill("sql.png") },
  { name: "TypeScript", image: skill("typescript.png") },
  { name: "MySQL", image: skill("mysql.png") },
  { name: "Python", image: skill("python.png") },
  { name: "JavaScript", image: skill("javascript.png") },
  { name: "PostgreSQL", image: skill("postresql.png") },
  { name: "RStudio", image: skill("rstudio.png") },
  { name: "Tailwind CSS", image: skill("tailwind.png") },
  { name: "Docker", image: skill("docker.png") },
  { name: "Deepnote", image: skill("deepnote.png") },
  { name: "Bootstrap", image: skill("bootstrap.png") },
  { name: "Git", image: skill("git.png") },
  { name: "Figma", image: skill("figma.png") },
  { name: "Java", image: skill("java.png") },
  { name: "GitHub", image: skill("github.png") },
  { name: "GitLab", image: skill("gitlab.png") },
  { name: "Spring Boot", image: skill("spring boot.png") },
];

export const heroBadges = [
  { name: "Angular", image: skill("angular.png") },
  { name: "SQL", image: skill("sql.png") },
  { name: "Java", image: skill("java.png") },
  { name: "React", image: skill("react.png") },
  { name: "Python", image: skill("python.png") },
];

export const experience = [
  {
    period: "2025 Dic - 2026 Jul",
    role: "Frontend Developer",
    company: "STARTQUAKE (Remoto)",
    description:
      "Desarrollo de la aplicación web y landing page del proyecto Eterna utilizando React.js y Angular.",
    tags: ["React", "Angular", "TypeScript", "Tailwind CSS", "Jira", "GitHub"],
  },
  {
    period: "2025 Nov - 2026 Ago",
    role: "Tecnóloga en Sistemas",
    company: "Universidad del Tolima (Remoto)",
    description:
      "Gestión documental, análisis de datos y desarrollo web en el proyecto de turismo ambiental.",
    tags: ["Python", "Google Drive", "Deepnote", "RStudio", "Spring Boot", "React", "Commerce"],
  },
  {
    period: "2025 Feb - 2026 Feb",
    role: "Full Stack Developer",
    company: "AIS Ingeniería SA (Presencial)",
    description:
      "Desarrollo de soluciones Full Stack como líder del proyecto GHG API, así mismo se aportó en el desarrollo del sistema de facturación ISIPOS.",
    tags: ["Python", "Docker", "GitLab", "Angular", "PostgreSQL", "GitHub", "FastAPI"],
  },
];

const project = (file) => asset(`/images/projects/${file}`);

export const projects = [
  {
    name: "GHG API",
    tagline: "Calculadora de emisiones de gases de efecto invernadero para apoyar decisiones ambientales basadas en datos.",
    description:
      "GHG API centraliza el cálculo de emisiones de gases de efecto invernadero a partir de la información operativa de la organización, generando análisis que facilitan la toma de decisiones ambientales.",
    highlights: [
      "Lideré el proyecto como desarrolladora backend, a cargo de la arquitectura y la lógica de cálculo de emisiones.",
      "Diseñé el análisis de los datos generados por la calculadora para apoyar la interpretación de resultados.",
      "Backend construido en Python con PostgreSQL como motor de base de datos.",
    ],
    tags: ["Python", "FastAPI", "PostgreSQL"],
    image: project("ghg.png"),
    url: "https://ghgwebapp.ghg-ca.com/ghgwebapp/auth/login",
  },
  {
    name: "ISIPOS",
    tagline: "Sistema de facturación electrónica Full Stack para la gestión comercial del negocio.",
    description:
      "ISIPOS es un facturador electrónico que digitaliza el proceso de venta y facturación, integrando frontend y backend en una sola solución construida de extremo a extremo.",
    highlights: [
      "Desarrollo Full Stack del sistema de facturación electrónica.",
      "Implementación y mantenimiento de formularios e interfaces orientadas a la captura y gestión de información de usuarios.",
      "Trabajo colaborativo en equipo, aplicando Git para el control de versiones y la gestión del código fuente.",
    ],
    tags: ["Python", "Angular", "PostgreSQL"],
    image: project("isipos.png"),
    url: "https://facturame.co/isiPos/auth/login",
  },
  {
    name: "Eterna",
    tagline: "Aplicación web y landing page desarrolladas para STARTQUAKE, con foco en consistencia visual y funcional.",
    description:
      "Proyecto Eterna: desarrollo frontend de la aplicación web y la landing page del producto, garantizando una experiencia de usuario consistente entre ambos.",
    highlights: [
      "Desarrollo frontend con JavaScript, React.js y Angular.",
      "Diseño e implementación de interfaces de usuario, garantizando consistencia visual y funcional en ambos productos.",
      "Trabajo colaborativo en equipo, aplicando control de versiones con Git.",
    ],
    tags: ["React", "Angular", "JavaScript"],
    image: project("eterna.png"),
    url: "https://www.eternadx.com/inicio",
  },
  {
    name: "Negocios Verdes",
    tagline: "Visualización y socialización de resultados del proyecto de Turismo Ambiental en el corredor Murillo – PNN Los Nevados.",
    description:
      "Página web construida con React.js para la visualización y socialización de los resultados y productos clave del proyecto de Desarrollo de Negocios Verdes en Turismo Ambiental, respaldada por gestión documental y análisis de datos.",
    highlights: [
      "Desarrollo de una página web con React.js para la visualización de resultados y productos clave del proyecto.",
      "Procesamiento y visualización de bases de datos e indicadores mediante Python (Deepnote), JavaScript y RStudio.",
      "Diseño de un sistema de gestión documental y flujos de trabajo digital para el seguimiento de entregables.",
    ],
    tags: ["React", "Python", "RStudio"],
    image: project("negocios_verdes.png"),
    url: "https://negocios-verdes-murillo.web.app/establecimientos",
  },
  {
    name: "Safety for People (SAPE)",
    tagline: "Marketplace de dispositivos de seguridad para familias, trabajo colaborativo del bootcamp de Generation.",
    description:
      "Safety for People es un marketplace web de dispositivos de seguridad para familias, desarrollado en equipo durante el bootcamp de Generation. Incluye inicio, catálogo de productos, carrito, nosotros, contacto, login y registro.",
    highlights: [
      "Trabajo colaborativo grupal usando HTML, CSS, Bootstrap y JavaScript.",
      "Desarrollo frontend de las páginas de inicio, productos, carrito y contacto.",
      "Uso de GitHub y Figma para el control de versiones y el diseño de la interfaz.",
    ],
    tags: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    image: project("safety.png"),
    url: "https://generation-classes.github.io/Safety-for-people/pages/home-usuario/index.html",
  },
  {
    name: "Planificador de Tareas",
    tagline: "Proyecto personal del bootcamp de Generation: una aplicación para organizar tareas por prioridad y fecha límite.",
    description:
      "Aplicación web para organizar tareas por prioridad y fecha límite, con lista de tareas, filtros, progreso y modo claro/oscuro. Incluye dashboard, calendario, reportes, inicio de sesión y registro.",
    highlights: [
      "Desarrollo frontend completo con HTML5, Bootstrap 5 y JavaScript.",
      "Diseño de dashboard, calendario y reportes de progreso de tareas.",
      "Planificación y diseño previos en Trello y Figma antes de la implementación.",
    ],
    tags: ["HTML", "Bootstrap", "JavaScript"],
    image: project("planificador_tareas.png"),
    url: "https://lizethcarosilva.github.io/Planificador-Tareas-Frontend/",
  },
  {
    name: "Sailor Food",
    tagline: "Landing page para una tienda online de comida japonesa, creada en la Hackathon 1 del bootcamp.",
    description:
      "Sailor Food es una landing page para una tienda online de comida japonesa, con una estética inspirada en la cultura japonesa y Sailor Moon. Permite explorar productos y gestionar un carrito de compras con persistencia en LocalStorage.",
    highlights: [
      "Desarrollo frontend en equipo con HTML5, CSS3, Bootstrap 5 y JavaScript.",
      "Catálogo de productos y carrito de compras con persistencia mediante LocalStorage.",
      "Diseño responsivo con una identidad visual moderna inspirada en la cultura japonesa.",
    ],
    tags: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    image: project("sailor_food.png"),
    url: "https://lizethcarosilva.github.io/hackathon_uno/Pages/index.html",
  },
  {
    name: "CoWork API",
    tagline: "API backend para la gestión de espacios de un coworking, construida con Spring Boot.",
    description:
      "CoWork API es el backend de un sistema de gestión de espacios de coworking, con operaciones para crear, listar, consultar, actualizar y eliminar espacios.",
    highlights: [
      "Backend construido con Java, Spring Boot y Spring Data JPA.",
      "Persistencia de datos en PostgreSQL, con Lombok para reducir código repetitivo.",
      "CRUD completo de espacios: creación, listado, consulta por ID, actualización y eliminación.",
    ],
    tags: ["Java", "Spring Boot", "PostgreSQL"],
    image: project("cowork.png"),
    url: "https://github.com/lizethcarosilva/cowork.git",
  },
  {
    name: "Biblioteca en Java",
    tagline: "Sistema de gestión de una biblioteca universitaria, enfocado en el uso de colecciones de Java.",
    description:
      "Sistema para el catálogo de materiales, listas de espera y membresías de una biblioteca universitaria, aplicando distintas colecciones de Java según la necesidad de cada estructura de datos.",
    highlights: [
      "Interfaz Catalogable y clase abstracta Material, con las subclases Libro y Revista.",
      "Catálogo de materiales con HashMap y listas de espera con ArrayList.",
      "Registro de membresías activas con HashSet e integración completa en SistemaBiblioteca.",
    ],
    tags: ["Java"],
    image: project("biblioteca.png"),
    url: "https://github.com/lizethcarosilva/biblioteca.git",
  },
  {
    name: "Clínica Veterinaria",
    tagline: "Laboratorio de herencia, clases abstractas e interfaces en Java aplicado a una clínica veterinaria.",
    description:
      "Modelo orientado a objetos de una clínica veterinaria, con herencia, clases abstractas, interfaces y polimorfismo para representar distintos tipos de animales y sus servicios.",
    highlights: [
      "Clase abstracta Animal con las subclases Perro, Gato y Ave.",
      "Interfaces Vacunable y Asegurable, implementadas por la clase Clinica.",
      "Aplicación de herencia, polimorfismo e interfaces para modelar el dominio veterinario.",
    ],
    tags: ["Java"],
    image: project("clinica_veterinaria.png"),
    url: "https://github.com/lizethcarosilva/ClinicaVeterinaria.git",
  },
];

const certification = (file) => asset(`/images/certifications/${file}`);

// Ordered from most recent to oldest, per each certificate's issue date.
export const certifications = [
  {
    title: "Científico de Datos e IA Aplicada",
    provider: "Dev Senior",
    skills: "Ciencia de datos, Machine Learning, IA aplicada",
    image: certification("cientifico_datos.png"),
  },
  {
    title: "Desarrollador Full Stack de Soluciones Inteligentes",
    provider: "Dev Senior",
    skills: "Desarrollo Full Stack, soluciones con IA integrada",
    image: certification("desarrollador_full_stack.png"),
  },
  {
    title: "Frontend Mean Developer",
    provider: "Dev Senior",
    skills: "HTML, CSS, JavaScript, Angular",
    image: certification("frontend.png"),
  },
  {
    title: "Variables y Estructuras de Control en POO: Java",
    provider: "SENA",
    skills: "Variables, estructuras de control, POO en Java",
    image: certification("java_sena_.png"),
  },
  {
    title: "Interfaces Gráficas, Eventos, Clases y Objetos en Java",
    provider: "SENA",
    skills: "GUI en Java, manejo de eventos, POO",
    image: certification("java_sena.png"),
  },
  {
    title: "Especialista en Fundamentos de IA",
    provider: "Dev Senior",
    skills: "Ciencia de datos, Machine Learning",
    image: certification("especialista_fundamentos_ia.png"),
  },
  {
    title: "Backend Mean Developer",
    provider: "Dev Senior",
    skills: "Node.js, Express, MongoDB",
    image: certification("backend.png"),
  },
  {
    title: "JavaScript Junior Developer",
    provider: "Dev Senior",
    skills: "Fundamentos de JavaScript, POO",
    image: certification("javascript.png"),
  },
  {
    title: "Análisis de Datos Nivel Explorador",
    provider: "Talento Tech · MinTIC",
    skills: "Análisis exploratorio de datos, 164 horas",
    image: certification("analisis_datos.png"),
  },
  {
    title: "Explora React con JavaScript",
    provider: "Alura LATAM",
    skills: "React, componentes, hooks",
    image: certification("react_javascript.png"),
  },
  {
    title: "Lógica de Programación con JavaScript",
    provider: "Alura LATAM",
    skills: "Lógica de programación, JavaScript",
    image: certification("logica_programacion.png"),
  },
  {
    title: "Nivelación TypeScript y React",
    provider: "Alura Boost",
    skills: "TypeScript, React",
    image: certification("nivelacion_typescript_react.png"),
  },
  {
    title: "PCEP — Certified Entry-Level Python Programmer",
    provider: "Python Institute",
    skills: "Sintaxis de Python, estructuras de datos, funciones",
    image: certification("pyrhon.png"),
  },
  {
    title: "HTML y CSS para Proyectos Web",
    provider: "Alura LATAM",
    skills: "HTML5, CSS3, maquetación web",
    image: certification("html_css.png"),
  },
  {
    title: "Desarrollo de Apps Móviles — Avanzado",
    provider: "Universidad Nacional de Colombia · ATENEA",
    skills: "Desarrollo móvil avanzado, 280 horas",
    image: certification("aplicaciones_moviles_avanzado.png"),
  },
  {
    title: "Java y Spring Boot",
    provider: "Alura LATAM",
    skills: "Java, Spring Boot, APIs REST",
    image: certification("java_spring_boot.png"),
  },
  {
    title: "Emprendimiento, Agilidad y Protagonismo Profesional",
    provider: "Alura LATAM · Oracle ONE",
    skills: "Metodologías ágiles, emprendimiento, trabajo en equipo",
    image: certification("emprendimiento.png"),
  },
  {
    title: "Java y Spring Boot G6",
    provider: "Alura LATAM · Oracle ONE",
    skills: "Java, Spring Boot, JPA, APIs REST",
    image: certification("java.png"),
  },
  {
    title: "Java Web con Spring Boot",
    provider: "Alura LATAM",
    skills: "Java, Spring Boot, aplicaciones web",
    image: certification("java_web.png"),
  },
  {
    title: "Java con Orientación a Objetos",
    provider: "Alura LATAM",
    skills: "POO, clases, herencia, polimorfismo",
    image: certification("poo_java.png"),
  },
  {
    title: "Desarrollo de Apps Móviles — Intermedio",
    provider: "Universidad Nacional de Colombia · Todos a la U",
    skills: "Desarrollo móvil, inglés técnico, habilidades socioemocionales",
    image: certification("aplicaciones_moviles_intermedio.png"),
  },
  {
    title: "Desarrollo de Apps Móviles — Básico",
    provider: "Universidad Nacional de Colombia · ATENEA",
    skills: "Fundamentos de desarrollo móvil, 280 horas",
    image: certification("aplicaciones_moviles_basico.png"),
  },
  {
    title: "Curso Básico de Python",
    provider: "Platzi",
    skills: "Sintaxis, estructuras de datos, funciones",
    image: certification("basico_python.png"),
  },
  {
    title: "Fundamentos en Analítica de Datos",
    provider: "DS4A / Correlation One",
    skills: "Python, estadística, analítica de datos",
    image: certification("fundamentos_analitica.png"),
  },
  {
    title: "Conceptualización del Lenguaje C++",
    provider: "SENA",
    skills: "Sintaxis y fundamentos de C++, 40 horas",
    image: certification("conceptualizacion_lenguahe_c++.png"),
  },
  {
    title: "Metodología de la Programación",
    provider: "SENA",
    skills: "Algoritmos, diagramas de flujo, pseudocódigo",
    image: certification("metologia_programacion.png"),
  },
];

export const githubStats = [
  { label: "Followers", value: "+19" },
  { label: "Repositorios", value: "+30" },
  { label: "Contribuciones", value: "+400" },
  { label: "Rachas de commits", value: "+12" },
];
