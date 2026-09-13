import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  CONFIG                                                             */
/* ------------------------------------------------------------------ */

const API_URL = "http://localhost:5000/api/contact";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const SOCIALS = [
  { label: "GitHub", icon: Github, href: "https://github.com/" },
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/" },
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
  },
];

const FILTERS = ["All", "Full-Stack Platform", "Web Platform", "Desktop Application"];

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

const EMAIL = "yushanaththanayake@gmail.com";
const PHONES = ["+94 76 772 5450", "+94 70 155 4291"];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
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
/*  NAVBAR                                                             */
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
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
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
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    scrollToId(link.id);
                    setOpen(false);
                  }}
                  className="text-left text-sm text-zinc-300"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  scrollToId("contact");
                  setOpen(false);
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
/*  HERO                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="hero" className="relative pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen flex items-center">
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-br from-indigo-600/20 via-violet-600/10 to-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative grid md:grid-cols-3 gap-5 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-2 rounded-3xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm p-8 sm:p-10 flex flex-col justify-center"
        >
          <div className="inline-flex items-center gap-2 text-xs font-medium text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1 w-fit mb-6">
            <Sparkles size={14} />
            Open to Software Engineering & Data roles
          </div>

          {/* Avatar + Name row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 blur-md opacity-40" />
              <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400">
                {!imgError ? (
                  <img
                    src="/profile.png"
                    alt="Yushan Sadeepa"
                    onError={() => setImgError(true)}
                    className="w-full h-full rounded-full object-cover bg-zinc-900"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-2xl font-semibold text-zinc-300">
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
            <p className="text-zinc-100 font-medium">Matara, Sri Lanka</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ABOUT                                                              */
/* ------------------------------------------------------------------ */

function About() {
  const stats = [
    { label: "Focus areas", value: "ML, Data & SWE" },
    { label: "Degree progress", value: "Year 3, ongoing" },
    { label: "Home base", value: "Matara, LK" },
  ];

  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading eyebrow="About" title="Who I am" />
      <div className="grid md:grid-cols-3 gap-5">
        <GlowCard className="md:col-span-2 p-8">
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
/*  EDUCATION                                                          */
/* ------------------------------------------------------------------ */

function Education() {
  return (
    <section id="education" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading
        eyebrow="Education"
        title="Academic background"
        description="Formal study alongside hands-on coursework in machine learning and systems fundamentals."
      />
      <div className="grid md:grid-cols-3 gap-5">
        <GlowCard className="md:col-span-2 p-8">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-zinc-700/60 flex items-center justify-center shrink-0">
              <GraduationCap className="text-cyan-300" size={20} />
            </div>
            <div>
              <p className="text-zinc-100 font-semibold text-lg">
                Bachelor of Science (Hons) in Computer Science and Technology
              </p>
              <p className="text-sm text-violet-300/90 mt-1">Special Degree</p>
              <p className="text-sm text-zinc-500 mt-2">
                Sabaragamuwa University of Sri Lanka &nbsp;&bull;&nbsp; 2023 &ndash; Present
              </p>
            </div>
          </div>
        </GlowCard>

        <GlowCard delay={0.1} className="p-8">
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
/*  SKILLS                                                             */
/* ------------------------------------------------------------------ */

function Skills() {
  const [active, setActive] = useState(SKILL_CATEGORIES[0].id);
  const current = SKILL_CATEGORIES.find((c) => c.id === active);

  return (
    <section id="skills" className="py-24 px-6 max-w-6xl mx-auto">
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

      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm p-8 min-h-[180px]">
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
              <span
                key={item}
                className="text-sm px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-950/60 text-zinc-300 hover:border-violet-500/40 hover:text-zinc-100 transition-colors"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PROJECTS                                                           */
/* ------------------------------------------------------------------ */

function ProjectCard({ project }) {
  return (
    <GlowCard className={"p-7 flex flex-col " + (project.size === "lg" ? "md:col-span-2" : "")}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-zinc-50">{project.title}</h3>
          <p className="text-sm text-zinc-500 mt-1">{project.subtitle}</p>
        </div>
        <span className="text-xs shrink-0 px-2.5 py-1 rounded-full border border-zinc-700 text-zinc-400">
          {project.category}
        </span>
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
          <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-zinc-950/70 border border-zinc-800 text-zinc-400">
            {t}
          </span>
        ))}
      </div>
    </GlowCard>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
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
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT (wired to backend)                                        */
/* ------------------------------------------------------------------ */

function CopyRow({ icon: Icon, label, value, copyValue }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      /* clipboard unavailable, fail silently */
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

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  // status: idle | sending | success | error
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
    <section id="contact" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading
        eyebrow="Contact"
        title="Let's talk"
        description="Have a role, project, or idea in mind? Send a message or reach out directly."
      />

      <div className="grid md:grid-cols-5 gap-5">
        <GlowCard className="md:col-span-3 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full rounded-lg bg-zinc-950/60 border border-zinc-800 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/60 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full rounded-lg bg-zinc-950/60 border border-zinc-800 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/60 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-zinc-500 mb-1.5 block">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="What would you like to talk about?"
                className="w-full rounded-lg bg-zinc-950/60 border border-zinc-800 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/60 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:from-indigo-400 hover:to-violet-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={15} />
                  Send Message
                </>
              )}
            </button>

            <AnimatePresence>
              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-sm text-emerald-400"
                >
                  <Check size={15} />
                  {statusMessage}
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-sm text-red-400"
                >
                  <AlertCircle size={15} />
                  {statusMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </GlowCard>

        <div className="md:col-span-2 flex flex-col gap-3">
          <CopyRow icon={Mail} label="Email" value={EMAIL} copyValue={EMAIL} />
          <CopyRow icon={Phone} label="Phone" value={PHONES[0]} copyValue={PHONES[0]} />
          <CopyRow icon={Phone} label="Phone (alt)" value={PHONES[1]} copyValue={PHONES[1]} />
          <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-3">
            <MapPin size={16} className="text-violet-400 shrink-0" />
            <div>
              <span className="block text-xs text-zinc-500">Location</span>
              <span className="block text-sm text-zinc-200">Matara, Sri Lanka</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="border-t border-zinc-900 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-600">&copy; {new Date().getFullYear()} Yushan Sadeepa. All rights reserved.</p>
        <div className="flex items-center gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="w-9 h-9 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-100 hover:border-zinc-600 transition-colors"
            >
              <s.icon size={16} />
            </a>
          ))}
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Email"
            className="w-9 h-9 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-100 hover:border-zinc-600 transition-colors"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  ROOT                                                               */
/* ------------------------------------------------------------------ */

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-violet-500/30">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
