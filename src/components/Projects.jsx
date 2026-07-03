import { ExternalLink } from 'lucide-react';
import Section, { Eyebrow, SectionTitle } from './ui/Section';
import Reveal from './ui/Reveal';
import { GithubIcon } from './ui/BrandIcons';
import { projects } from '../data';

function ProjectCard({ project, index }) {
  return (
    <Reveal delay={index * 0.1}>
      <div className="group flex h-full flex-col rounded-2xl border border-paper-100/10 bg-ink-900/50 p-6 transition-colors hover:border-signal-light/30">
        <div className="mb-1 flex items-start justify-between gap-3">
          <h3 className="font-display text-xl text-paper-50">{project.title}</h3>
        </div>
        <div className="tabular-mono mb-4 text-xs text-signal-light">{project.role}</div>
        <p className="mb-4 text-sm leading-relaxed text-paper-100/65">{project.summary}</p>
        <ul className="mb-5 space-y-2 text-sm text-paper-100/60">
          {project.points.map((p, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-paper-100/40" />
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="rounded-full border border-paper-100/15 px-2.5 py-1 text-xs text-paper-100/55">
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-4 text-sm">
            {/* TODO: add real GitHub repo link for this project */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="flex items-center gap-1.5 text-paper-100/60 transition-colors hover:text-signal-light"
              >
                <GithubIcon size={14} /> Code
              </a>
            )}
            {/* TODO: add real live demo URL for this project */}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="flex items-center gap-1.5 text-paper-100/60 transition-colors hover:text-signal-light"
              >
                <ExternalLink size={14} /> Live
              </a>
            )}
            {!project.githubUrl && !project.demoUrl && (
              <span className="text-paper-100/35">Private / discontinued venture</span>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <Section id="projects">
      <Eyebrow>04 — Other Projects</Eyebrow>
      <Reveal>
        <SectionTitle>Shipping ability, beyond the research.</SectionTitle>
        <p className="mt-4 max-w-2xl text-lg text-paper-100/65">
          Freelance delivery, entrepreneurship, and team engineering — evidence this extends past
          one capstone.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
