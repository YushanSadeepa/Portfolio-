import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  Copy,
  Check,
  GraduationCap,
  School,
  Code2,
  Brain,
  Server,
  Wrench,
  Users,
  Menu,
  X,
  Sparkles,
  ArrowUpRight,
  Send,
  Award,
  BookOpen,
  Loader2,
  AlertCircle,
  Play,
  Maximize2,
  ImageOff,
  Target,
  MessageCircle,
  BarChart3,
  Briefcase,
  Building,
} from "lucide-react";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiSocketdotio,
  SiHtml5,
  SiPhp,
  SiMysql,
  SiCss,
  SiJavascript,
  SiDotnet,
  SiPython,
  SiCplusplus,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiGit,
  SiGithub,
  SiPostman,
  SiJira,
  SiTrello,
} from "react-icons/si";

import { TbBrandCSharp, TbSql, TbBrandVscode } from "react-icons/tb";
import { DiMsqlServer, DiJava } from "react-icons/di";

/* ------------------------------------------------------------------ */
/* CONFIG                                                             */
/* ------------------------------------------------------------------ */

const API_URL = "http://localhost:5000/api/contact";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const SOCIALS = [
  { label: "GitHub", icon: Github, href: "https://github.com/YushanSadeepa" },
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/yushan-sadeepa" },
];

const PROJECTS = [
  {
    id: "cinnaxchange",
    title: "CinnaXchange",
    subtitle: "Agricultural Bidding Platform",
    category: "Full-Stack Platform",
    description:
      "An auction and bidding marketplace that connects spice farmers directly with buyers, cutting out middlemen and keeping pricing transparent for both sides.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    highlights: ["Real-time bidding over WebSockets", "Direct buyer-seller connection"],
    size: "lg",
    cover: "/projects/cinnaxchange-cover.png",
    demo: { type: "video", src: "/projects/cinnaxchange-demo.mp4" },
    githubUrl: "https://github.com/YushanSadeepa/Cinnamon-Trading-Platform---cinnaXchange.git",
  },
  {
    id: "susl-connect",
    title: "SUSL Connect Foods",
    subtitle: "Location-Based Food Ordering Platform",
    category: "Web Platform",
    description:
      "A web platform connecting university students with local Belihuloya food vendors, built around how students actually order food between lectures.",
    tech: ["HTML", "PHP", "MySQL", "CSS", "JavaScript"],
    highlights: ["Local vendor management", "Student-tailored ordering system"],
    size: "md",
    cover: "/projects/susl-connect-cover.png",
    demo: { type: "video", src: "/projects/susl-connect-demo.mp4" },
    githubUrl: "https://github.com/YushanSadeepa/susl-connect-food.git",
  },
  {
    id: "budget-manager",
    title: "BudgetManager",
    subtitle: "Personal Expense Tracker",
    category: "Desktop Application",
    description:
      "A desktop application for managing personal finances, turning raw transactions into categorized reports you can actually act on.",
    tech: ["C#", ".NET", "SQL Server"],
    highlights: ["Expense tracking & categorization", "Visual financial reports"],
    size: "md",
    cover: "/projects/budget-manager-cover.png",
    demo: { type: "video", src: "/projects/budget-manager-demo.mp4" },
    githubUrl: "https://github.com/YushanSadeepa/Spendo.git",
  },
];

const FILTERS = ["All", "Full-Stack Platform", "Web Platform", "Desktop Application"];

const TECH_ICON_MAP = {
  "React": { icon: SiReact, color: "#61DAFB" },
  "Node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "Socket.io": { icon: SiSocketdotio, color: "#FFFFFF" },
  "HTML": { icon: SiHtml5, color: "#E34F26" },
  "PHP": { icon: SiPhp, color: "#777BB4" },
  "MySQL": { icon: SiMysql, color: "#4479A1" },
  "CSS": { icon: SiCss, color: "#1572B6" },
  "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
  "C#": { icon: TbBrandCSharp, color: "#9B4F96" },
  ".NET": { icon: SiDotnet, color: "#512BD4" },
  "SQL Server": { icon: DiMsqlServer, color: "#CC2927" },
};

const SKILL_ICON_MAP = {
  ...TECH_ICON_MAP,
  // Languages
  "Python": { icon: SiPython, color: "#3776AB" },
  "Java": { icon: DiJava, color: "#F89820" },
  "C++": { icon: SiCplusplus, color: "#00599C" },
  "SQL": { icon: TbSql, color: "#4479A1" },
  // Machine Learning & Data Science
  "Scikit-learn": { icon: SiScikitlearn, color: "#F7931E" },
  "Pandas": { icon: SiPandas, color: "#150458" },
  "NumPy": { icon: SiNumpy, color: "#4DABCF" },
  "Data Analysis": { icon: BarChart3 },
  // Web Development
  "React.js": { icon: SiReact, color: "#61DAFB" },
  // Tools & Frameworks
  "Git": { icon: SiGit, color: "#F05032" },
  "GitHub": { icon: SiGithub, color: "#FFFFFF" },
  "VS Code": { icon: TbBrandVscode, color: "#007ACC" },
  "Postman": { icon: SiPostman, color: "#FF6C37" },
  "Jira": { icon: SiJira, color: "#0052CC" },
  "Trello": { icon: SiTrello, color: "#0052CC" },
  // Soft Skills
  "Critical Thinking": { icon: Brain },
  "Project Planning & Execution": { icon: Target },
  "Team Collaboration": { icon: Users },
  "Communication": { icon: MessageCircle },
};

const SKILL_CATEGORIES = [
  { id: "languages", label: "Languages", icon: Code2, items: ["Python", "Java", "JavaScript", "C#", "C++", "SQL"] },
  { id: "ml", label: "ML & Data Science", icon: Brain, items: ["Scikit-learn", "Pandas", "NumPy", "Data Analysis"] },
  { id: "web", label: "Web Development", icon: Server, items: ["React.js", "Node.js", "MongoDB", "HTML", "CSS"] },
  {
    id: "tools",
    label: "Tools & Frameworks",
    icon: Wrench,
    items: ["Git", "GitHub", "VS Code", ".NET", "Postman", "SQL Server", "Jira", "Trello"],
  },
  {
    id: "soft",
    label: "Soft Skills",
    icon: Users,
    items: ["Critical Thinking", "Project Planning & Execution", "Team Collaboration", "Communication"],
  },
];

const COURSEWORK = [
  "Machine Learning",
  "Data Structures & Algorithms",
  "Statistics for Experimental Analysis",
  "Computer Architecture",
  "Programming",
];

const EDUCATION = [
  {
    id: "sabaragamuwa-university",
    degree: "Bachelor of Science (Hons) in Computer Science and Technology",
    note: "Special Degree",
    institution: "Sabaragamuwa University of Sri Lanka",
    duration: "2023 \u2013 Present",
    logo: "/university-logo.png",
    fallbackIcon: GraduationCap,
  },
  {
    id: "matara-central-college",
    degree: "Physical Science / Mathematical Stream (A/L)",
    note: null,
    institution: "Matara Central College",
    duration: "2011 \u2013 2019",
    logo: "/school-logo.png",
    fallbackIcon: School,
  },
];

const EXPERIENCE = [
  {
    id: "boc-internship",
    role: "Internship Trainee",
    company: "Bank of Ceylon",
    duration: "Jun 2022 \u2013 Jan 2023",
    location: "Matara, Southern Province, Sri Lanka",
    logo: "/boc-logo.png",
  },
];

const EMAIL = "yushanaththanayake@gmail.com";
const PHONES = ["+94 76 772 5450", "+94 70 155 4291"];

/* ------------------------------------------------------------------ */
/* HELPERS                                                            */
/* ------------------------------------------------------------------ */

function scrollToId(id) {
  // Deferring to the next animation frame ensures this runs after any
  // pending layout change — important right after closing an overlay
  // like the mobile menu, where scrolling immediately could be measured
  // against a layout that's still mid-transition.
  requestAnimationFrame(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-10 max-w-2xl"
    >
      <p className="text-sm font-medium text-cyan-400/90 mb-2">{eyebrow}</p>
      <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-50 tracking-tight">{title}</h2>
      {description && <p className="mt-3 text-zinc-400 leading-relaxed">{description}</p>}
    </motion.div>
  );
}

function GlowCard({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={
        "relative rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm transition-colors duration-300 hover:border-violet-500/40 " +
        className
      }
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* PARTICLE NETWORK (interactive canvas background)                   */
/* ------------------------------------------------------------------ */

function ParticleNetwork() {
  const canvasRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Mutable refs, not state — this avoids any React re-render on every
  // mouse move or animation frame, which is what keeps this smooth.
  const mouseRef = useRef({ x: null, y: null });
  const particlesRef = useRef([]);
  const rafRef = useRef(null);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  const createParticles = useCallback((width, height) => {
    // Density-based count so it looks right on a phone and a 4K monitor
    // alike, clamped so it never gets heavy on very large screens.
    const area = width * height;
    const count = Math.min(90, Math.max(28, Math.round(area / 16000)));
    return Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.8,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      sizeRef.current = { width, height, dpr };
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particlesRef.current = createParticles(width, height);
    };

    resize();

    // If the visitor prefers reduced motion, draw one static frame and stop —
    // no animation loop, no mouse tracking, no continuous canvas repaint.
    if (shouldReduceMotion) {
      const { width, height } = sizeRef.current;
      ctx.clearRect(0, 0, width, height);
      particlesRef.current.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(161,161,170,0.5)";
        ctx.fill();
      });
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }

    const CONNECT_DIST = 130;
    const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;
    const MOUSE_DIST = 160;
    const MOUSE_DIST_SQ = MOUSE_DIST * MOUSE_DIST;

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resize);

    let visible = !document.hidden;
    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) rafRef.current = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVisibility);

    function tick() {
      if (!visible) return;
      const { width, height } = sizeRef.current;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, width, height);

      // Move + bounce off edges
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;
      }

      // Particle-to-particle connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CONNECT_DIST_SQ) {
            const alpha = 1 - Math.sqrt(distSq) / CONNECT_DIST;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(148,163,184,${alpha * 0.28})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Mouse-to-particle "grab" lines, in the site's violet/cyan accent
      if (mouse.x !== null) {
        for (const p of particles) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < MOUSE_DIST_SQ) {
            const alpha = 1 - Math.sqrt(distSq) / MOUSE_DIST;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(167,139,250,${alpha * 0.55})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Particle dots, drawn last so they sit on top of the lines
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(203,213,225,0.55)";
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [shouldReduceMotion, createParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-70"
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------------ */
/* ANIMATED BACKGROUND                                                 */
/* ------------------------------------------------------------------ */

function AnimatedBackground() {
  const shouldReduceMotion = useReducedMotion();

  const blobs = [
    {
      className: "w-[560px] h-[560px] bg-indigo-600/25 blur-[120px]",
      style: { top: "-12%", left: "-10%" },
      animate: { x: [0, 90, -40, 0], y: [0, 70, -30, 0], scale: [1, 1.15, 0.95, 1] },
      duration: 26,
      delay: 0,
    },
    {
      className: "w-[620px] h-[620px] bg-violet-600/20 blur-[130px]",
      style: { top: "28%", right: "-14%" },
      animate: { x: [0, -70, 45, 0], y: [0, -55, 35, 0], scale: [1, 0.9, 1.12, 1] },
      duration: 30,
      delay: 2,
    },
    {
      className: "w-[480px] h-[480px] bg-cyan-500/20 blur-[110px]",
      style: { bottom: "-14%", left: "22%" },
      animate: { x: [0, 55, -65, 0], y: [0, -45, 55, 0], scale: [1, 1.1, 0.92, 1] },
      duration: 28,
      delay: 4,
    },
  ];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Interactive particle network — replaces the old static grid texture */}
      <ParticleNetwork />

      {/* Drifting aurora-style gradient blobs */}
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={"absolute rounded-full " + b.className}
          style={b.style}
          animate={shouldReduceMotion ? undefined : b.animate}
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: b.duration, repeat: Infinity, ease: "easeInOut", delay: b.delay }
          }
        />
      ))}

      {/* Vignette so text stays readable over the brightest blob overlaps */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-transparent to-zinc-950/50" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* NAVBAR                                                             */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 " +
        (scrolled ? "bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80" : "bg-transparent border-b border-transparent")
      }
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button onClick={() => scrollToId("hero")} className="text-sm font-semibold tracking-tight text-zinc-100">
          Yushan<span className="text-violet-400">.</span>Sadeepa
        </button>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToId(link.id)}
              className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <button
            onClick={() => scrollToId("contact")}
            className="text-sm font-medium px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:from-indigo-400 hover:to-violet-400 transition-colors"
          >
            Contact Me
          </button>
        </div>

        <button className="md:hidden text-zinc-200" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-zinc-950/95 border-b border-zinc-800/80"
          >
            <div className="px-4 sm:px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setOpen(false);
                    scrollToId(link.id);
                  }}
                  className="text-left text-sm text-zinc-300"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  scrollToId("contact");
                }}
                className="text-sm font-medium px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white w-fit"
              >
                Contact Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* HERO                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="hero" className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 max-w-6xl mx-auto min-h-screen flex items-center">
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-br from-indigo-600/20 via-violet-600/10 to-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative grid md:grid-cols-3 gap-5 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-2 rounded-3xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-10 flex flex-col justify-center"
        >
          <div className="inline-flex items-center gap-2 text-xs font-medium text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1 max-w-full mb-6">
            <Sparkles size={14} className="shrink-0" />
            <span>Open to Software Engineering & Data roles</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 blur-md opacity-40" />
              <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 overflow-hidden">
                {!imgError ? (
                  <img
                    src="/profile.png"
                    alt="Yushan Sadeepa"
                    onError={() => setImgError(true)}
                    className="w-full h-full rounded-full object-cover bg-zinc-900 transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-2xl font-semibold text-zinc-300 transition-transform duration-300 ease-in-out hover:scale-110">
                    YS
                  </div>
                )}
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-zinc-50 leading-[1.05]">
              Yushan Sadeepa
            </h1>
          </div>

          <p className="mt-4 text-lg sm:text-xl bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent font-medium">
            Computer Science & Technology Undergraduate
          </p>
          <p className="mt-2 text-zinc-400">Specializing in Machine Learning, Data Science & Software Engineering</p>
          <p className="mt-5 max-w-xl text-zinc-400 leading-relaxed">
            Developing data-driven solutions, recommendation systems, and modern web applications.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToId("projects")}
              className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:from-indigo-400 hover:to-violet-400 transition-colors"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollToId("contact")}
              className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full border border-zinc-700 text-zinc-200 hover:border-zinc-500 hover:bg-zinc-800/50 transition-colors"
            >
              Contact Me
            </button>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full border border-zinc-700 text-zinc-200 hover:border-zinc-500 hover:bg-zinc-800/50 transition-colors"
            >
              <Download size={16} />
              Download CV
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition-colors"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col gap-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm p-6 flex-1"
          >
            <GraduationCap className="text-cyan-400 mb-3" size={22} />
            <p className="text-sm text-zinc-500 mb-1">Currently studying</p>
            <p className="text-zinc-100 font-medium leading-snug">BSc (Hons) Computer Science & Technology</p>
            <p className="text-sm text-zinc-500 mt-1">Sabaragamuwa University of Sri Lanka &middot; 2023 &ndash; Present</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm p-6 flex-1"
          >
            <MapPin className="text-violet-400 mb-3" size={22} />
            <p className="text-sm text-zinc-500 mb-1">Based in</p>
            <p className="text-zinc-100 font-medium">Matara, Southern Province, Sri Lanka</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ABOUT                                                              */
/* ------------------------------------------------------------------ */

function About() {
  const stats = [
    { label: "Focus areas", value: "ML, Data & SWE" },
    { label: "Degree progress", value: "Year 4, ongoing" },
    { label: "Home base", value: "Sri Lanka" },
  ];

  return (
    <section id="about" className="scroll-mt-20 py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <SectionHeading eyebrow="About" title="Who I am" />
      <div className="grid md:grid-cols-3 gap-5">
        <GlowCard className="md:col-span-2 p-6 sm:p-8">
          <p className="text-lg text-zinc-300 leading-relaxed">
            Computer Science and Technology undergraduate at{" "}
            <span className="text-zinc-100 font-medium">Sabaragamuwa University of Sri Lanka</span> specializing in
            Machine Learning, Data Science, and Software Engineering. Experienced in developing recommendation
            systems, web applications, and data-driven solutions with strong analytical and problem-solving skills.
          </p>
        </GlowCard>
        <div className="grid grid-rows-3 gap-5">
          {stats.map((s, i) => (
            <GlowCard key={s.label} delay={i * 0.05} className="p-5 flex flex-col justify-center">
              <p className="text-xs text-zinc-500 mb-1">{s.label}</p>
              <p className="text-zinc-100 font-medium">{s.value}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* EDUCATION                                                          */
/* ------------------------------------------------------------------ */

function EducationCard({ edu, delay = 0 }) {
  const [logoError, setLogoError] = useState(false);
  const FallbackIcon = edu.fallbackIcon;

  return (
    <GlowCard delay={delay} className="p-6 sm:p-8">
      <div className="flex items-start gap-4">
        {edu.logo && !logoError ? (
          <img
            src={edu.logo}
            alt={`${edu.institution} logo`}
            onError={() => setLogoError(true)}
            className="w-11 h-11 rounded-xl object-contain bg-white/5 border border-zinc-700/60 p-1.5 shrink-0"
          />
        ) : (
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-zinc-700/60 flex items-center justify-center shrink-0">
            <FallbackIcon className="text-cyan-300" size={20} />
          </div>
        )}
        <div>
          <p className="text-zinc-100 font-semibold text-lg">{edu.degree}</p>
          {edu.note && <p className="text-sm text-violet-300/90 mt-1">{edu.note}</p>}
          <p className="text-sm text-zinc-500 mt-2">
            {edu.institution} &nbsp;&bull;&nbsp; {edu.duration}
          </p>
        </div>
      </div>
    </GlowCard>
  );
}

function Education() {
  return (
    <section id="education" className="scroll-mt-20 py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <SectionHeading
        eyebrow="Education"
        title="Academic background"
        description="Formal study alongside hands-on coursework in machine learning and systems fundamentals."
      />
      <div className="grid md:grid-cols-3 gap-5">
        <div className="md:col-span-2 flex flex-col gap-5">
          {EDUCATION.map((edu, i) => (
            <EducationCard key={edu.id} edu={edu} delay={i * 0.08} />
          ))}
        </div>

        <GlowCard delay={0.16} className="p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4 text-zinc-100 font-medium">
            <BookOpen size={18} className="text-violet-400" />
            Relevant Coursework
          </div>
          <ul className="space-y-2.5">
            {COURSEWORK.map((c) => (
              <li key={c} className="flex items-center gap-2 text-sm text-zinc-400">
                <Award size={14} className="text-cyan-400 shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </GlowCard>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  EXPERIENCE                                                         */
/* ------------------------------------------------------------------ */

function ExperienceCard({ entry, delay = 0 }) {
  const [logoError, setLogoError] = useState(false);

  return (
    <GlowCard delay={delay} className="p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="flex items-start gap-4 flex-1">
          {!logoError ? (
            <img
              src={entry.logo}
              alt={`${entry.company} logo`}
              onError={() => setLogoError(true)}
              className="w-11 h-11 rounded-xl object-contain bg-white/5 border border-zinc-700/60 p-1.5 shrink-0"
            />
          ) : (
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-zinc-700/60 flex items-center justify-center shrink-0">
              <Briefcase className="text-cyan-300" size={20} />
            </div>
          )}
          <div>
            <p className="text-zinc-100 font-semibold text-lg">{entry.role}</p>
            <p className="text-sm text-violet-300/90 mt-1 flex items-center gap-1.5">
              <Building size={13} className="shrink-0" />
              {entry.company}
            </p>
          </div>
        </div>

        <div className="sm:text-right shrink-0 pl-0 sm:pl-4">
          <p className="text-sm text-zinc-300">{entry.duration}</p>
          <p className="text-sm text-zinc-500 mt-1 flex items-center gap-1.5 sm:justify-end">
            <MapPin size={13} className="shrink-0" />
            {entry.location}
          </p>
        </div>
      </div>
    </GlowCard>
  );
}

function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've worked"
        description="Hands-on exposure to a professional environment alongside my studies."
      />
      <div className="space-y-5">
        {EXPERIENCE.map((entry, i) => (
          <ExperienceCard key={entry.id} entry={entry} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* SKILLS                                                             */
/* ------------------------------------------------------------------ */

function SkillChip({ label }) {
  const entry = SKILL_ICON_MAP[label];
  const Icon = entry?.icon;
  return (
    <span className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-950/60 text-zinc-300 hover:border-violet-500/40 hover:text-zinc-100 transition-colors max-w-full break-words">
      {Icon ? (
        <Icon
          size={16}
          className={entry.color ? "shrink-0" : "shrink-0 text-zinc-400"}
          style={entry.color ? { color: entry.color } : undefined}
        />
      ) : null}
      {label}
    </span>
  );
}

function Skills() {
  const [active, setActive] = useState(SKILL_CATEGORIES[0].id);
  const current = SKILL_CATEGORIES.find((c) => c.id === active) || SKILL_CATEGORIES[0];

  return (
    <section id="skills" className="scroll-mt-20 py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <SectionHeading eyebrow="Skills" title="What I work with" />

      <div className="flex flex-wrap gap-2 mb-6">
        {SKILL_CATEGORIES.map((cat) => {
          const isActive = cat.id === active;
          return (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={
                "relative inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border transition-colors " +
                (isActive
                  ? "border-violet-500/50 text-zinc-50"
                  : "border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600")
              }
            >
              {isActive && (
                <motion.span
                  layoutId="skill-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-cyan-500/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <cat.icon size={15} className="relative" />
              <span className="relative">{cat.label}</span>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm p-5 sm:p-8 min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex flex-wrap gap-3"
          >
            {current.items.map((item) => (
              <SkillChip key={item} label={item} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PROJECTS                                                           */
/* ------------------------------------------------------------------ */

function TechBadge({ label }) {
  const entry = TECH_ICON_MAP[label];
  const Icon = entry?.icon;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-zinc-950/70 border border-zinc-800 text-zinc-300">
      {Icon ? <Icon size={13} style={{ color: entry.color }} /> : null}
      {label}
    </span>
  );
}

function CoverImage({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-950/60 text-zinc-700">
        <ImageOff size={28} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  );
}

function ProjectCard({ project, onOpenDemo }) {
  return (
    <GlowCard className={"overflow-hidden flex flex-col " + (project.size === "lg" ? "md:col-span-2" : "")}>
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-zinc-950">
        <CoverImage src={project.cover} alt={`${project.title} cover`} />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/10 to-transparent" />
        <span className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full bg-zinc-950/80 border border-zinc-700 text-zinc-300 backdrop-blur-sm">
          {project.category}
        </span>

        {project.demo && (
          <button
            onClick={() => onOpenDemo(project)}
            className="absolute bottom-3 left-3 inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-zinc-950/80 border border-zinc-700 text-zinc-100 backdrop-blur-sm hover:border-violet-500/60 hover:bg-zinc-900 transition-colors"
          >
            <Play size={13} className="text-violet-400" fill="currentColor" />
            Watch Demo
          </button>
        )}
      </div>

      <div className="p-5 sm:p-7 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-xl font-semibold text-zinc-50 break-words">{project.title}</h3>
            <p className="text-sm text-zinc-500 mt-1">{project.subtitle}</p>
          </div>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              title="View source on GitHub"
              className="shrink-0 w-9 h-9 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:border-violet-500/50 hover:bg-zinc-800/50 transition-colors"
            >
              <Github size={16} />
            </a>
          )}
        </div>

        <p className="mt-4 text-sm text-zinc-400 leading-relaxed">{project.description}</p>

        <ul className="mt-4 space-y-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-zinc-400">
              <ArrowUpRight size={14} className="mt-0.5 text-cyan-400 shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <TechBadge key={t} label={t} />
          ))}
        </div>
      </div>
    </GlowCard>
  );
}

function DemoModal({ project, onClose }) {
  useEffect(() => {
    // Bug fix: this effect used to run unconditionally on every mount,
    // locking document scrolling (overflow: hidden) even when no demo
    // was open — that was the cause of the whole page feeling frozen.
    if (!project) return;

    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="demo-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden"
          >
            <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 sm:py-4 border-b border-zinc-800">
              <h4 className="min-w-0 text-sm font-medium text-zinc-200 flex items-center gap-2">
                <Maximize2 size={14} className="text-violet-400 shrink-0" />
                <span className="truncate">{project.title} &mdash; Demo</span>
              </h4>
              <button
                onClick={onClose}
                aria-label="Close demo"
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="aspect-video bg-black flex items-center justify-center">
              {project.demo?.type === "video" && (
                <video
                  src={project.demo.src}
                  controls
                  autoPlay
                  muted
                  playsInline
                  loop
                  className="w-full h-full object-contain"
                />
              )}
              {project.demo?.type === "gif" && (
                <img src={project.demo.src} alt={`${project.title} demo`} className="w-full h-full object-contain" />
              )}
              {project.demo?.type === "iframe" && (
                <iframe
                  src={project.demo.src}
                  title={`${project.title} interactive demo`}
                  className="w-full h-full"
                  allow="fullscreen"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const [activeProject, setActiveProject] = useState(null);
  const visible = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="scroll-mt-20 py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <SectionHeading
        eyebrow="Projects"
        title="Featured work"
        description="A mix of full-stack platforms and a desktop application, spanning real-time systems, data handling, and everyday tools."
      />

      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={
              "text-sm px-4 py-2 rounded-full border transition-colors " +
              (filter === f
                ? "border-violet-500/50 bg-violet-500/10 text-zinc-50"
                : "border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600")
            }
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className="grid md:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className={project.size === "lg" ? "md:col-span-2" : ""}
            >
              <ProjectCard project={project} onOpenDemo={setActiveProject} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <DemoModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CONTACT                                                            */
/* ------------------------------------------------------------------ */

function CopyRow({ icon: Icon, label, value, copyValue }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="w-full flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-3 text-left hover:border-violet-500/40 transition-colors"
    >
      <span className="flex items-center gap-3 min-w-0">
        <Icon size={16} className="text-cyan-400 shrink-0" />
        <span className="min-w-0">
          <span className="block text-xs text-zinc-500">{label}</span>
          <span className="block text-sm text-zinc-200 truncate">{value}</span>
        </span>
      </span>
      <span className="text-zinc-500 shrink-0">
        {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
      </span>
    </button>
  );
}

export default function App() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setStatusMessage("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setStatusMessage(data.message || "Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setStatusMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setStatusMessage("Couldn't reach the server. Is the backend running on port 5000?");
    }

    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-950 text-zinc-100 font-sans selection:bg-violet-500/30 selection:text-violet-200">
      <AnimatedBackground />

      <div className="relative z-10">
        <Navbar />

      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />

        <section id="contact" className="scroll-mt-20 py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Contact"
            title="Get in touch"
            description="Feel free to reach out for collaboration, opportunities, or just a chat."
          />

          <div className="grid md:grid-cols-2 gap-8">
            <GlowCard className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-zinc-50 mb-2">Direct Contact Details</h3>
                <p className="text-sm text-zinc-400 mb-6">
                  Click on any field below to copy the contact details directly to your clipboard.
                </p>
                <div className="space-y-3">
                  <CopyRow icon={Mail} label="Email Address" value={EMAIL} copyValue={EMAIL} />
                  {PHONES.map((phone, idx) => (
                    <CopyRow key={idx} icon={Phone} label={`Phone ${idx + 1}`} value={phone} copyValue={phone} />
                  ))}
                </div>
              </div>

              <div className="border-t border-zinc-800/80 pt-6">
                <p className="text-xs text-zinc-500">Location</p>
                <p className="text-sm text-zinc-300 font-medium mt-1">Southern Province, Sri Lanka</p>
              </div>
            </GlowCard>

            <GlowCard className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-zinc-400 mb-1">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-sm text-zinc-100 focus:outline-none focus:border-violet-500/60 transition-colors placeholder:text-zinc-600"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-zinc-400 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-sm text-zinc-100 focus:outline-none focus:border-violet-500/60 transition-colors placeholder:text-zinc-600"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-zinc-400 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Hello Yushan, I'd like to talk about..."
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-sm text-zinc-100 focus:outline-none focus:border-violet-500/60 transition-colors placeholder:text-zinc-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-medium text-sm flex items-center justify-center gap-2 hover:from-indigo-400 hover:to-violet-400 disabled:opacity-50 transition-colors"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>

                {statusMessage && (
                  <div
                    className={
                      "p-3 rounded-xl text-xs flex items-center gap-2 " +
                      (status === "success"
                        ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                        : "bg-rose-500/10 border border-rose-500/20 text-rose-400")
                    }
                  >
                    {status === "error" && <AlertCircle size={14} className="shrink-0" />}
                    {statusMessage}
                  </div>
                )}
              </form>
            </GlowCard>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800/80 py-8 px-4 sm:px-6 text-center text-xs text-zinc-500">
        <p>&copy; {new Date().getFullYear()} Yushan Sadeepa. All rights reserved.</p>
      </footer>
      </div>
    </div>
  );
}