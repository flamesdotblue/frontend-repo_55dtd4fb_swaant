import React from 'react';
import { motion } from 'framer-motion';
import { User, Star, Code2, Cpu, Palette } from 'lucide-react';

const skillsFromEnv = () => {
  try {
    const raw = import.meta.env.VITE_SKILLS;
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.slice(0, 5);
    return null;
  } catch (e) {
    return null;
  }
};

const defaultSkills = [
  { label: 'React', icon: Code2 },
  { label: 'Tailwind', icon: Palette },
  { label: 'Framer Motion', icon: Star },
  { label: 'Three.js', icon: Cpu },
  { label: 'Zustand', icon: Code2 },
];

const About = () => {
  const skills = skillsFromEnv() || defaultSkills;
  const bio =
    import.meta.env.VITE_RESUME ||
    'Frontend developer crafting immersive, high-performance experiences with React, Tailwind, Framer Motion, and Three.js. I love blending 3D, motion, and clean design into interfaces that feel alive.';

  return (
    <section id="about" className="relative w-full bg-[#050018] py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl"
        >
          About Me
        </motion.h2>

        <div className="grid items-start gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-slate-200">
              <User className="h-4 w-4" /> Who I am
            </div>
            <p className="leading-relaxed text-slate-200">{bio}</p>
            <a
              href={typeof import.meta.env.VITE_RESUME_URL === 'string' ? import.meta.env.VITE_RESUME_URL : '#'}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block rounded-full bg-gradient-to-r from-[#7e22ce] to-[#3b82f6] px-5 py-2 text-sm font-medium shadow-lg shadow-[#7e22ce]/30"
            >
              Download Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-slate-200">
              <Star className="h-4 w-4" /> Featured Skills
            </div>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {skills.map((s, idx) => {
                const Icon = s.icon ? s.icon : Star;
                return (
                  <li
                    key={idx}
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-colors hover:bg-white/10"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-[#7e22ce]/40 to-[#3b82f6]/40 text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm text-slate-100">{s.label || s}</span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
