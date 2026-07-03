import Section, { Eyebrow, SectionTitle } from './ui/Section';
import Reveal from './ui/Reveal';
import { education } from '../data';

export default function Education() {
  return (
    <Section id="education" className="bg-ink-900/40">
      <Eyebrow>09 — Education</Eyebrow>
      <Reveal>
        <SectionTitle>From Limassol to London.</SectionTitle>
      </Reveal>

      <div className="mt-12 space-y-6">
        {education.map((e, i) => (
          <Reveal key={e.institution} delay={i * 0.1}>
            <div
              className={`rounded-2xl border p-6 ${
                e.status === 'incoming'
                  ? 'border-signal-light/30 bg-signal/[0.06]'
                  : 'border-paper-100/10 bg-ink-900/50'
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl text-paper-50">{e.institution}</h3>
                <span className="tabular-mono text-xs text-signal-light">{e.period}</span>
              </div>
              <div className="mt-1 text-sm text-paper-100/60">
                {e.degree} · {e.location}
              </div>
              {e.detail && (
                <p className="mt-3 text-sm leading-relaxed text-paper-100/65">
                  {e.detail}
                  {e.linkToAcademics && (
                    <button
                      onClick={() => document.getElementById('academics')?.scrollIntoView({ behavior: 'smooth' })}
                      data-cursor-hover
                      className="ml-2 text-signal-light underline decoration-signal-light/40 underline-offset-4 hover:decoration-signal-light"
                    >
                      Jump to Academic Record ↑
                    </button>
                  )}
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
