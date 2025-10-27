import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { Rocket } from 'lucide-react';

const App = () => {
  const [showTop, setShowTop] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050018] text-white">
      {/* Simple sticky header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#050018]/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <a href="#home" className="text-sm font-semibold tracking-wide text-slate-200">
            {import.meta.env.VITE_NAME || 'Cosmic Developer'}
          </a>
          <nav className="hidden gap-6 text-sm text-slate-300 sm:flex">
            <a className="hover:text-white" href="#about">About</a>
            <a className="hover:text-white" href="#projects">Projects</a>
            <a className="hover:text-white" href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#050018] py-8 text-center text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-6">
          <p>
            © {new Date().getFullYear()} {import.meta.env.VITE_NAME || 'Cosmic Developer'} — From code to cosmos — I build digital galaxies that feel alive.
          </p>
        </div>
      </footer>

      {/* Scroll to top rocket */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-r from-[#7e22ce] to-[#3b82f6] text-white shadow-lg shadow-[#7e22ce]/30"
            aria-label="Scroll to top"
          >
            <Rocket className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
