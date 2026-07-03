import { Award } from 'lucide-react';
import Section, { Eyebrow, SectionTitle } from './ui/Section';
import Reveal from './ui/Reveal';
import { leadership } from '../data';

export default function Leadership() {
  return (
    <Section id="leadership">
      <Eyebrow>06 — Leadership &amp; Achievements</Eyebrow>
      <Reveal>
        <SectionTitle>Leading isn't a side note.</SectionTitle>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {leadership.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08}>
            <div className="flex h-full gap-4 rounded-2xl border border-paper-100/10 bg-ink-900/50 p-5 transition-colors hover:border-signal-light/30">
              <div className="mt-0.5 shrink-0 text-signal-light">
                <Award size={20} />
              </div>
              <div>
                <div className="tabular-mono mb-1 text-xs text-signal-light">{item.period}</div>
                <h3 className="mb-1 font-medium text-paper-50">{item.title}</h3>
                <p className="text-sm leading-relaxed text-paper-100/60">{item.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
