import Section, { Eyebrow, SectionTitle } from './ui/Section';
import Reveal from './ui/Reveal';
import { skills } from '../data';

const levelWidth = { Advanced: '90%', Intermediate: '65%' };

export default function Skills() {
  return (
    <Section id="skills">
      <Eyebrow>08 · Skills</Eyebrow>
      <Reveal>
        <SectionTitle>Tools in service of the research.</SectionTitle>
      </Reveal>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {skills.groups.map((group, gi) => (
          <Reveal key={group.title} delay={gi * 0.08}>
            <h3 className="tabular-mono mb-4 text-xs uppercase tracking-[0.2em] text-signal-light">{group.title}</h3>
            {group.items[0].level ? (
              <div className="space-y-3">
                {group.items.map((item) => (
                  <div key={item.name}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-paper-50">{item.name}</span>
                      <span className="text-paper-100/45">{item.level}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-800/70">
                      <div
                        className="h-full rounded-full bg-signal-light/80"
                        style={{ width: levelWidth[item.level] || '50%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item.name}
                    className="rounded-full border border-paper-100/15 bg-ink-900/50 px-3 py-1.5 text-sm text-paper-100/75 transition-colors hover:border-signal-light/40 hover:text-paper-50"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            )}
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Reveal delay={0.2}>
          <div className="rounded-2xl border border-paper-100/10 bg-ink-900/50 p-5">
            <h3 className="tabular-mono mb-3 text-xs uppercase tracking-[0.2em] text-signal-light">Certifications</h3>
            {skills.certifications.map((c) => (
              <div key={c.name} className="text-sm text-paper-100/75">
                {c.name} <span className="text-paper-100/40">· {c.issuer}, {c.year}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.26}>
          <div className="rounded-2xl border border-paper-100/10 bg-ink-900/50 p-5">
            <h3 className="tabular-mono mb-3 text-xs uppercase tracking-[0.2em] text-signal-light">Languages</h3>
            <div className="flex flex-wrap gap-4 text-sm text-paper-100/75">
              {skills.languages.map((l) => (
                <div key={l.name}>
                  {l.name} <span className="text-paper-100/40">({l.level})</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
