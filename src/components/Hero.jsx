import React from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { Rocket, Mail, Eye } from 'lucide-react';

const Hero = () => {
  const title = import.meta.env.VITE_TITLE || 'Cosmic Developer';
  const tagline =
    import.meta.env.VITE_TAGLINE || 'Coding beyond the stars — I build digital galaxies that feel alive.';

  return (
    <section id="home" className="relative h-[100dvh] w-full overflow-hidden bg-[#050018] text-white">
      {/* 3D Spline Background */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Subtle gradient overlays for depth - pointer events disabled so scene stays interactive */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050018]/30 via-transparent to-[#050018]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050018] to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-4 bg-gradient-to-r from-[#7e22ce] via-[#3b82f6] to-[#f8fafc] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.8 } }}
          className="mx-auto max-w-2xl text-base text-slate-200 sm:text-lg"
        >
          {tagline}
        </motion.p>

        {/* Role type cycling (simple fade rotate) */}
        <div className="mt-4 h-6 overflow-hidden text-sm text-slate-300 sm:text-base">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -24, -48, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div>Web Developer</div>
            <div>UI Engineer</div>
            <div>Creative Coder</div>
          </motion.div>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.8 } }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-[#7e22ce] px-6 py-3 font-medium text-white shadow-lg shadow-[#7e22ce]/30 transition-transform duration-200 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
          >
            <Eye className="h-4 w-4" /> View Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-medium text-white backdrop-blur transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#7e22ce]"
          >
            <Mail className="h-4 w-4" /> Contact Me
          </a>
        </motion.div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 text-xs text-slate-300"
          >
            <Rocket className="h-4 w-4" /> Scroll
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
