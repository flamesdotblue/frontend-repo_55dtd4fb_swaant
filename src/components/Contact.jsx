import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const Contact = () => {
  const [status, setStatus] = React.useState('idle');

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // Graceful fallback: if a Formspree endpoint is provided via env, try to post there.
      const endpoint = import.meta.env.VITE_CONTACT_EMAIL;
      if (endpoint && typeof endpoint === 'string' && endpoint.startsWith('https://')) {
        const form = new FormData(e.currentTarget);
        const res = await fetch(endpoint, { method: 'POST', body: form, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error('Network');
      } else {
        // Simulate success for demo
        await new Promise((r) => setTimeout(r, 800));
      }
      setStatus('success');
      (e.currentTarget).reset();
      setTimeout(() => setStatus('idle'), 2000);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <section id="contact" className="w-full bg-[#050018] py-20 text-white">
      <div className="mx-auto max-w-3xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Let’s Build Something Stellar 🚀
        </motion.h2>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-slate-200">Name</label>
              <input
                name="name"
                required
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-300 outline-none transition focus:border-[#7e22ce] focus:bg-white/15"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-200">Email</label>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-300 outline-none transition focus:border-[#3b82f6] focus:bg-white/15"
                placeholder="you@domain.com"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-1 block text-sm text-slate-200">Message</label>
            <textarea
              name="message"
              rows={5}
              required
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-300 outline-none transition focus:border-[#7e22ce] focus:bg-white/15"
              placeholder="Tell me about your project"
            />
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7e22ce] to-[#3b82f6] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7e22ce]/30 transition disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {status === 'loading' ? 'Sending…' : status === 'success' ? 'Message Sent 🌠' : 'Send Message'}
            </button>
            <p className="text-xs text-slate-400">
              {import.meta.env.VITE_CONTACT_EMAIL
                ? 'Securely delivered via Formspree.'
                : 'Demo mode: configure VITE_CONTACT_EMAIL to enable submissions.'}
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
