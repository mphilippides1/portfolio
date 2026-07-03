import Section, { Eyebrow, SectionTitle } from './ui/Section';
import Reveal from './ui/Reveal';
import { about } from '../data';

export default function About() {
  return (
    <Section id="about">
      <Eyebrow>01 · About</Eyebrow>
      <Reveal>
        <SectionTitle>Quantitative by training, entrepreneurial by instinct.</SectionTitle>
      </Reveal>

      <div className="mt-10 grid gap-8 md:grid-cols-[1.4fr,1fr] md:gap-12">
        <div className="space-y-5">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-lg leading-relaxed text-paper-100/75">{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="rounded-2xl border border-signal/15 bg-ink-900/60 p-6">
            <div className="tabular-mono text-xs uppercase tracking-[0.2em] text-signal-light">Currently</div>
            <ul className="mt-4 space-y-4 text-sm text-paper-100/70">
              <li className="flex justify-between gap-4 border-b border-paper-100/10 pb-3">
                <span>Studying</span>
                <span className="text-right text-paper-50">BSc Computer Science, Essex</span>
              </li>
              <li className="flex justify-between gap-4 border-b border-paper-100/10 pb-3">
                <span>Incoming</span>
                <span className="text-right text-paper-50">MSc FinTech, Imperial</span>
              </li>
              <li className="flex justify-between gap-4 border-b border-paper-100/10 pb-3">
                <span>Building</span>
                <span className="text-right text-paper-50">Regime-aware MoE LSTM</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Leading</span>
                <span className="text-right text-paper-50">Essex Cypriot Society</span>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
