export const profile = {
  name: "Zoyan Ahmed",
  role: "Software Engineering Student · Frontend & Full Stack Developer",
  location: "Karachi, Pakistan",
  headline: "Building immersive, interactive and modern web experiences.",
  intro:
    "I'm Zoyan Ahmed, a Software Engineering student and aspiring Full Stack Developer from Karachi. I enjoy building responsive web applications, interactive interfaces, animated experiences and modern e-commerce platforms. I'm continuously expanding my skills across frontend development, backend technologies, databases and 3D web experiences.",
  about: [
    "I'm currently pursuing an Advanced Diploma in Software Engineering at Aptech Gulshan-e-Iqbal and have completed four semesters, with my fifth semester currently underway. My main interest is web development, particularly frontend development and creating visually engaging digital experiences.",
    "Alongside frontend technologies, I've explored backend development, databases and full-stack architectures through academic and personal projects. I enjoy experimenting with React, Node.js, Express.js, MongoDB, Three.js and animation libraries to create websites that aren't just functional, but also interactive and memorable.",
    "My goal is to grow into a professional Full Stack Developer while continuing to improve my problem-solving, software engineering and UI development skills.",
  ],
  email: "aa6930439@gmail.com",
  phone: "03142789910",
  github: "https://github.com/REDiCHAMP",
  githubLabel: "github.com/REDiCHAMP",
  linkedin: "https://linkedin.com/in/zoyan-ahmed-50936a405",
  linkedinLabel: "linkedin.com/in/zoyan-ahmed-50936a405",
} as const;

export const skillGroups = [
  {
    id: "frontend",
    label: "Frontend",
    items: [
      "HTML5",
      "CSS3",
      "JavaScript ES6+",
      "React",
      "Bootstrap",
      "Tailwind CSS",
      "jQuery",
      "AJAX",
      "Responsive Web Design",
      "CSS Animations",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: ["Node.js", "Express.js", "PHP", "C#", "ASP.NET MVC"],
  },
  {
    id: "databases",
    label: "Databases",
    items: ["MySQL", "SQL Server", "MongoDB", "Firebase"],
  },
  {
    id: "motion",
    label: "3D & Animation",
    items: ["Three.js", "GSAP", "Lenis", "Framer Motion", "Scroll Animations"],
  },
  {
    id: "tools",
    label: "Tools & Languages",
    items: ["Git & GitHub", "APIs / JSON", "C / C++", "Flutter / Dart", "AI Fundamentals"],
  },
] as const;

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  features: string[];
  highlight?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "jewelry",
    title: "Jewelry Website",
    subtitle: "3D Luxury Jewelry E-Commerce Experience",
    description:
      "A premium jewelry e-commerce experience focused on immersive product presentation, interactive animations and 3D product visualization.",
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Three.js",
      "GSAP",
      "Lenis",
    ],
    highlight:
      "360° Interactive Jewelry Viewer — users can rotate a 3D jewelry model and inspect the product from any angle.",
    features: [
      "Product showcase",
      "E-commerce interface",
      "3D product visualization",
      "360° interaction",
      "Scroll-driven animations",
      "Premium luxury UI",
    ],
    featured: true,
  },
  {
    id: "gaming",
    title: "Gaming Accessories Store",
    subtitle: "Gaming Accessories E-Commerce Platform",
    description:
      "A modern e-commerce platform concept focused on gaming accessories, combining product discovery, interactive UI and a visually engaging shopping experience.",
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Three.js",
      "GSAP",
      "Lenis",
    ],
    features: [
      "Product catalog",
      "Product details",
      "Categories",
      "Responsive design",
      "Interactive animations",
      "Modern gaming-inspired UI",
    ],
  },
];

export const timeline = [
  {
    period: "Aug 2024 – Aug 2027 (expected)",
    title: "Advanced Diploma in Software Engineering",
    place: "Aptech Computer Education — Gulshan-e-Iqbal Campus",
    detail: "4 semesters completed · 5th semester in progress",
    modules: [
      "HTML & CSS",
      "JavaScript",
      "Bootstrap",
      "PHP",
      "MySQL",
      "C / C++",
      "C#",
      "ASP.NET MVC",
      "SQL Server",
      "React",
      "MERN Stack",
      "Git & GitHub",
      "APIs / JSON",
      "AI Fundamentals",
      "Flutter / Dart",
    ],
  },
  {
    period: "Next 1–2 months",
    title: "BS Computer Science — admission in progress",
    place: "University",
    detail: "Taking the next step from diploma to a bachelor's degree.",
    modules: [],
  },
];

export const achievements = [
  {
    title: "Diploma in Information Systems Management",
    place: "Aptech",
    detail: "First-year qualification within the Software Engineering program.",
  },
  {
    title: "1st Place — Typing Competition",
    place: "Aptech",
    detail: "Speed and accuracy, under pressure.",
  },
];

export const experienceNote =
  "Currently seeking my first professional software development internship. My experience so far includes academic projects, personal web applications and hands-on experimentation with modern frontend, backend and full-stack technologies.";

export const softSkills = [
  "Problem Solving",
  "Quick Learning",
  "Team Collaboration",
  "Adaptability",
  "Creative Thinking",
  "Attention to Detail",
  "Time Management",
  "Communication",
];

export const interests = [
  "Building Personal Web Projects",
  "Exploring New Technologies",
  "3D Web Development",
  "UI/UX Experimentation",
  "Gaming",
  "Learning AI & Emerging Tech",
  "Problem Solving",
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];
