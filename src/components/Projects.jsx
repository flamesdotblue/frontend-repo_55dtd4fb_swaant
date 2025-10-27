import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const readProjects = () => {
  try {
    const raw = import.meta.env.VITE_PROJECTS;
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.slice(0, 3);
    return null;
  } catch (e) {
    return null;
  }
};

const fallback = [
  {
    title: 'Nebula UI Kit',
    desc: 'A cosmic-themed React component library with motion-first design and Tailwind presets.',
    code: 'https://github.com/',
    demo: '#',
  },
  {
    title: 'Stellar Portfolio',
    desc: 'High-performance, 3D-enhanced portfolio with Three.js starfield and GSAP micro-interactions.',
    code: 'https://github.com/',
    demo: '#',
  },
  {
    title: 'Orbit Dashboard',
    desc: 'Realtime analytics dashboard with charts, smooth animations, and responsive layout.',
    code: 'https://github.com/',
    demo: '#',
  },
];

const ProjectCard = ({ project }) => {
  const [style, setStyle] = React.useState({ transform: 'rotateX(0) rotateY(0) scale(1)' });

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = -((y / rect.height) - 0.5) * 8;
    const ry = ((x / rect.width) - 0.5) * 8;
    setStyle({ transform: `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)` });
  };

  const onLeave = () => setStyle({ transform: 'rotateX(0) rotateY(0) scale(1)' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={style}
        className="relative h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-transform will-change-transform"
      >
        <div className="mb-3 text-lg font-semibold text-white">{project.title}</div>
        <p className="mb-6 text-sm text-slate-300">{project.desc}</p>
        <div className="mt-auto flex items-center gap-3">
          <a
            href={project.code}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-xs text-slate-100 transition-colors hover:bg-white/10"
          >
            <Github className="h-4 w-4" /> Code
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7e22ce] to-[#3b82f6] px-3 py-1.5 text-xs text-white"
          >
            <ExternalLink className="h-4 w-4" /> Live
          </a>
        </div>
        {/* Glow border on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-[#7e22ce]/40 transition-opacity group-hover:opacity-100" />
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const items = readProjects() || fallback;
  return (
    <section id="projects" className="w-full bg-[#050018] py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Projects
        </motion.h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <ProjectCard key={`${p.title}-${i}`} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
