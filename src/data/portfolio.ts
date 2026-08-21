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
    items: [
      "Three.js",
      "GSAP",
      "Lenis",
      "CSS Animations",
      "Interactive 3D",
      "360° Visualization",
    ],
  },
  {
    id: "programming",
    label: "Programming",
    items: ["C", "C++", "C#", "JavaScript", "Java"],
  },
  {
    id: "tools",
    label: "Tools",
    items: [
      "Git",
      "GitHub",
      "Visual Studio",
      "VS Code",
      "SSMS",
      "MySQL Workbench",
      "Figma",
    ],
  },
] as const;

export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  features: string[];
  highlight?: string;
  featured?: boolean;
  problem: string;
  approach: string;
};

export const projects: Project[] = [
  {
    id: "elite-legal",
    index: "01",
    title: "Elite Legal",
    subtitle: "Online Law Firm Booking Platform",
    description:
      "A modern online law firm platform that lets users explore legal services and lawyers while providing a complete appointment booking experience.",
    stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Bootstrap", "Three.js", "GSAP", "Lenis"],
    features: [
      "Lawyer profiles",
      "Appointment booking",
      "Legal service presentation",
      "Responsive design",
      "Interactive UI",
      "Smooth scroll animations",
      "Modern visual effects",
      "Database integration",
    ],
    problem:
      "Law firms usually publish static brochure sites — clients still have to call to book. The challenge was making legal services feel approachable online while handling real appointment data.",
    approach:
      "A PHP + MySQL backend stores lawyers, services and bookings, while the front end leans on GSAP and Lenis for a calm, premium scroll rhythm that suits a professional brand.",
  },
  {
    id: "pulse",
    index: "02",
    title: "Pulse",
    subtitle: "Fitness Tracking Web Application",
    description:
      "A fitness web application concept that helps users monitor workouts, nutrition, meals and daily activity from a single animated dashboard.",
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
      "Workout tracking",
      "Nutrition tracking",
      "Meal tracking",
      "Step tracking",
      "Fitness dashboard",
      "Interactive UI",
      "Responsive design",
      "Animated data presentation",
    ],
    problem:
      "Fitness dashboards get dense fast. The goal was to show workouts, nutrition and steps together without the screen turning into a spreadsheet.",
    approach:
      "A MERN stack with a component-driven dashboard: animated rings and progress reveals give each metric its own visual weight, so scanning the day takes a second, not a minute.",
  },
  {
    id: "gamerz-hub",
    index: "03",
    title: "Gamerz Hub",
    subtitle: "Gaming Accessories E-Commerce Platform",
    description:
      "A modern e-commerce platform focused on gaming accessories, combining product discovery, interactive UI and a visually engaging shopping experience.",
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
      "Shopping experience",
      "Categories",
      "Responsive design",
      "Interactive animations",
      "Modern gaming-inspired UI",
    ],
    problem:
      "Gaming stores compete on energy. A plain grid of products reads as generic and loses the audience immediately.",
    approach:
      "Neon-lit product cards, category-driven discovery and motion on every interaction — built on a MERN backend so the catalog and product detail pages stay data-driven.",
  },
  {
    id: "jewelry",
    index: "04",
    title: "Jewelry Website",
    subtitle: "3D Luxury Jewelry E-Commerce Experience",
    description:
      "A premium jewelry e-commerce experience focused on immersive product presentation, interactive animations and true 3D product visualization.",
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
      "360° Interactive Jewelry Viewer — users rotate a real 3D model and inspect the piece from any angle before buying.",
    features: [
      "Product showcase",
      "E-commerce interface",
      "3D product visualization",
      "360° interaction",
      "Smooth transitions",
      "Scroll-driven animations",
      "Responsive design",
      "Premium luxury UI",
    ],
    featured: true,
    problem:
      "Jewelry sells on detail, and flat photography can't communicate cut, shine or scale. Shoppers hesitate when they can't inspect the piece.",
    approach:
      "A Three.js 360° viewer sits at the centre of the product page, wrapped in a restrained luxury layout with scroll-driven reveals so the product — not the interface — carries the drama.",
  },
  {
    id: "greenway",
    index: "05",
    title: "Greenway School",
    subtitle: "Modern School Website",
    description:
      "An educational website presenting a school's programs, facilities and information through a responsive, interactive interface.",
    stack: ["React", "Tailwind CSS", "Bootstrap", "JavaScript", "Three.js", "GSAP", "Lenis"],
    features: [
      "Responsive school website",
      "Modern landing page",
      "Programs and facilities sections",
      "Interactive navigation",
      "Smooth scrolling",
      "Animated content reveals",
      "Responsive mobile experience",
    ],
    problem:
      "School sites are usually information dumps that parents have to dig through on a phone.",
    approach:
      "Clear program and facility sections, an interactive nav and animated reveals that guide a parent through admissions info in the order they actually need it.",
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

export const marqueeItems = [
  "React",
  "Three.js",
  "Node.js",
  "MongoDB",
  "Tailwind CSS",
  "GSAP",
  "Express.js",
  "MySQL",
  "PHP",
  "C#",
  "ASP.NET MVC",
  "Lenis",
  "Firebase",
  "Git",
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];
