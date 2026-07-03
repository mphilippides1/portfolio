import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { nav } from '../data';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-ink-950/85 backdrop-blur-md border-b border-signal/10' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <button
          onClick={() => go('top')}
          className="tabular-mono text-sm font-semibold tracking-tight text-paper-50"
          data-cursor-hover
        >
          MP<span className="text-signal-light">.</span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => go(item.id)}
                data-cursor-hover
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  active === item.id
                    ? 'text-signal-light'
                    : 'text-paper-100/70 hover:text-paper-50'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="rounded-md p-2 text-paper-50 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          data-cursor-hover
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-signal/10 bg-ink-950/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col px-6 py-2">
              {nav.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => go(item.id)}
                    className={`block w-full py-3.5 text-left text-base ${
                      active === item.id ? 'text-signal-light' : 'text-paper-100/80'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
