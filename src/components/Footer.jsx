import { Mail } from 'lucide-react';
import { links, hero } from '../data';
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons';

export default function Footer() {
  return (
    <footer className="border-t border-paper-100/10 px-6 py-12 md:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <div className="font-display text-lg text-paper-50">{hero.name}</div>
        <div className="flex gap-6">
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            aria-label="LinkedIn"
            className="text-paper-100/50 transition-colors hover:text-signal-light"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            aria-label="GitHub"
            className="text-paper-100/50 transition-colors hover:text-signal-light"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href={`mailto:${links.email}`}
            data-cursor-hover
            aria-label="Email"
            className="text-paper-100/50 transition-colors hover:text-signal-light"
          >
            <Mail size={20} />
          </a>
        </div>
        <p className="tabular-mono text-xs text-paper-100/30">
          © {new Date().getFullYear()} {hero.name}. Built with React, Tailwind &amp; Framer Motion.
        </p>
      </div>
    </footer>
  );
}
