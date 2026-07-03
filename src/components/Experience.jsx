import Section, { Eyebrow, SectionTitle } from './ui/Section';
import Reveal from './ui/Reveal';
import { experience } from '../data';

export default function Experience() {
  return (
    <Section id="experience" className="bg-ink-900/40">
      <Eyebrow>05 · Experience</Eyebrow>
      <Reveal>
        <SectionTitle>Consulting, fintech, and the military, in that order of surprise.</SectionTitle>
      </Reveal>

      <div className="relative mt-14 ml-3 border-l border-paper-100/15 pl-8 md:ml-6">
        {experience.map((e, i) => (
          <Reveal key={e.org} delay={i * 0.1} className="relative mb-12 last:mb-0">
            <span className="absolute -left-[41px] top-1.5 h-3 w-3 rounded-full border-2 border-signal-light bg-ink-950 md:-left-[49px]" />
            <div className="tabular-mono mb-1 text-xs uppercase tracking-[0.15em] text-signal-light">{e.period}</div>
            <h3 className="font-display text-xl text-paper-50">{e.org}</h3>
            <div className="mb-3 text-sm text-paper-100/60">
              {e.role} · {e.location}
            </div>
            <ul className="space-y-1.5 text-sm leading-relaxed text-paper-100/65">
              {e.points.map((p, j) => (
                <li key={j} className="flex gap-2.5">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-paper-100/40" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
