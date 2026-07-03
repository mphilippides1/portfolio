import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowDown } from 'lucide-react';
import { hero, links } from '../data';
import DataGridBackground from './ui/DataGridBackground';
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons';

// Simple typewriter/rotator for the role line, no external dependency needed.
function RoleRotator({ roles }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = deleting ? 35 : 65;
    const pause = 1400;

    if (!deleting && display === current) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && display === '') {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
      return;
    }
    const t = setTimeout(() => {
      setDisplay((d) => (deleting ? current.slice(0, d.length - 1) : current.slice(0, d.length + 1)));
    }, speed);
    return () => clearTimeout(t);
  }, [display, deleting, roleIndex, roles]);

  return (
    <span className="tabular-mono text-signal-light">
      {display}
      <span className="ml-0.5 inline-block w-[2px] animate-blink bg-signal-light align-middle" style={{ height: '1em' }} />
    </span>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-950 px-6 pt-24 md:px-10">
      <DataGridBackground />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="tabular-mono mb-6 inline-flex items-center gap-2 rounded-full border border-signal-light/25 bg-signal/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-signal-light"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-signal-light" />
              Available from Sep 2026
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-paper-50 sm:text-6xl md:text-5xl"
            >
              {hero.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 h-8 text-xl md:text-2xl"
            >
              <RoleRotator roles={hero.roles} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-paper-100/75 md:text-xl"
            >
              {hero.taglines[0]}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 max-w-2xl text-base text-paper-100/55"
            >
              {hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="flex items-center gap-2 rounded-full bg-signal px-5 py-3 text-sm font-medium text-paper-50 transition-colors hover:bg-signal-light"
          >
            <LinkedinIcon size={16} /> LinkedIn
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="flex items-center gap-2 rounded-full border border-paper-100/20 px-5 py-3 text-sm font-medium text-paper-50 transition-colors hover:border-signal-light/60 hover:text-signal-light"
          >
            <GithubIcon size={16} /> GitHub
          </a>
          <a
            href={`mailto:${links.email}`}
            data-cursor-hover
            className="flex items-center gap-2 rounded-full border border-paper-100/20 px-5 py-3 text-sm font-medium text-paper-50 transition-colors hover:border-signal-light/60 hover:text-signal-light"
          >
            <Mail size={16} /> Email
          </a>
        </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative h-72 w-72 overflow-hidden rounded-3xl border border-signal-light/20 shadow-2xl md:h-80 md:w-80">
              <img
                src={hero.photoPlaceholder}
                alt={hero.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent opacity-20" />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-paper-100/40"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
