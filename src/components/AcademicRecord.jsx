import { useState } from 'react';
import { motion } from 'framer-motion';
import Section, { Eyebrow, SectionTitle } from './ui/Section';
import Reveal from './ui/Reveal';
import Stat from './ui/Stat';
import { academics } from '../data';

const maxYearly = Math.max(...academics.yearlyAverages.map((y) => y.mark));
const maxModule = Math.max(...academics.modules.map((m) => m.mark));

function YearlyBars() {
  return (
    <div className="flex items-end gap-6 md:gap-10">
      {academics.yearlyAverages.map((y, i) => (
        <div key={y.year} className="flex flex-1 flex-col items-center gap-3">
          <div className="tabular-mono text-sm text-paper-100/60">{y.mark}%</div>
          <div className="flex h-40 w-full items-end overflow-hidden rounded-t-md bg-ink-800/60 md:h-52">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(y.mark / 100) * 100}%` }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`w-full ${
                y.year === 'Year 3'
                  ? 'bg-gradient-to-t from-signal to-signal-light'
                  : 'bg-signal/40'
              }`}
            />
          </div>
          <div className="text-sm text-paper-100/70">{y.year}</div>
        </div>
      ))}
    </div>
  );
}

function ModuleBars() {
  const [hovered, setHovered] = useState(null);
  return (
    <div className="space-y-3">
      {academics.modules.map((m, i) => (
        <div
          key={m.name}
          onMouseEnter={() => setHovered(m.name)}
          onMouseLeave={() => setHovered(null)}
          data-cursor-hover
          className="group cursor-default"
        >
          <div className="mb-1 flex items-baseline justify-between gap-4 text-sm">
            <span className="text-paper-100/75 transition-colors group-hover:text-paper-50">{m.name}</span>
            <span className="tabular-mono shrink-0 text-paper-50">
              {m.mark.toFixed(1)}
              <span className="ml-2 hidden text-xs text-signal-light sm:inline">{m.class}</span>
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-ink-800/70">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(m.mark / maxModule) * 100}%` }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full rounded-full transition-[filter] ${
                hovered === m.name ? 'bg-signal-light brightness-110' : 'bg-signal-light/80'
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AcademicRecord() {
  return (
    <Section id="academics" className="bg-ink-900/40">
      <Eyebrow>02 — Academic Record</Eyebrow>
      <Reveal>
        <SectionTitle>Consistency, not a one-off result.</SectionTitle>
        <p className="mt-4 max-w-2xl text-lg text-paper-100/65">
          Grades framed as evidence of quantitative rigor across three years — an upward trajectory,
          not a single strong semester.
        </p>
      </Reveal>

      {/* Top-line stat cards */}
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Reveal delay={0}>
          <div className="rounded-2xl border border-signal-light/25 bg-gradient-to-br from-signal/15 to-transparent p-5">
            <div className="tabular-mono text-xs uppercase tracking-[0.2em] text-signal-light">Degree Mark</div>
            <Stat value={academics.degreeMark} suffix="%" className="mt-2" />
            <div className="mt-1 text-sm font-medium text-paper-50">First Class</div>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="rounded-2xl border border-paper-100/10 bg-ink-900/60 p-5">
            <div className="tabular-mono text-xs uppercase tracking-[0.2em] text-paper-100/50">Year 3 Avg</div>
            <Stat value={84} suffix="%" className="mt-2" />
            <div className="mt-1 text-sm text-paper-100/60">Best of three</div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="rounded-2xl border border-paper-100/10 bg-ink-900/60 p-5">
            <div className="tabular-mono text-xs uppercase tracking-[0.2em] text-paper-100/50">Top Module</div>
            <Stat value={94} suffix="%" className="mt-2" />
            <div className="mt-1 text-sm text-paper-100/60">NLE, Class 1</div>
          </div>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="rounded-2xl border border-paper-100/10 bg-ink-900/60 p-5">
            <div className="tabular-mono text-xs uppercase tracking-[0.2em] text-paper-100/50">Dean's List</div>
            <Stat value={2} className="mt-2" />
            <div className="mt-1 text-sm text-paper-100/60">2024 &amp; 2025</div>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-12 md:grid-cols-2">
        <Reveal>
          <h3 className="mb-6 font-display text-xl text-paper-50">Yearly average, by year</h3>
          <YearlyBars />
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="mb-6 font-display text-xl text-paper-50">Year 3 standout modules</h3>
          <ModuleBars />
        </Reveal>
      </div>
    </Section>
  );
}
