import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './ui/BrandIcons';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import Section, { Eyebrow, SectionTitle } from './ui/Section';
import Reveal from './ui/Reveal';
import { flagship } from '../data';

const TABS = [
  { id: 'accuracy', label: 'Prediction Accuracy' },
  { id: 'risk', label: 'Risk-Adjusted Decisions' },
];

const strategyColors = {
  'MoE Advisor (confidence-gated)': '#2fa578',
  'Buy-and-Hold': '#6b7d78',
  'Naive (lower threshold)': '#d9a441',
};

function ChartTooltip({ active, payload, label, unit = '' }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-signal/20 bg-ink-900 px-3 py-2 text-xs shadow-xl">
      <div className="mb-1 text-paper-100/60">{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="tabular-mono text-paper-50">
          {p.name}: {p.value}
          {unit}
        </div>
      ))}
    </div>
  );
}

function SharpeChart() {
  const data = flagship.backtest.strategies.map((s) => ({ name: s.name.split(' (')[0], sharpe: s.sharpe, full: s.name }));
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1f2f2a" vertical={false} />
        <XAxis dataKey="name" tick={{ fill: '#c9c4b8', fontSize: 11 }} axisLine={{ stroke: '#1f2f2a' }} tickLine={false} />
        <YAxis tick={{ fill: '#c9c4b8', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(47,165,120,0.08)' }} />
        <Bar dataKey="sharpe" name="Sharpe" radius={[6, 6, 0, 0]} isAnimationActive>
          {data.map((d) => (
            <Cell key={d.name} fill={strategyColors[d.full] || '#2fa578'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function DrawdownChart() {
  const data = flagship.backtest.strategies.map((s) => ({ name: s.name.split(' (')[0], drawdown: s.maxDrawdown, full: s.name }));
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1f2f2a" vertical={false} />
        <XAxis dataKey="name" tick={{ fill: '#c9c4b8', fontSize: 11 }} axisLine={{ stroke: '#1f2f2a' }} tickLine={false} />
        <YAxis tick={{ fill: '#c9c4b8', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip content={<ChartTooltip unit="%" />} cursor={{ fill: 'rgba(217,164,65,0.08)' }} />
        <Bar dataKey="drawdown" name="Max Drawdown" radius={[6, 6, 0, 0]} isAnimationActive>
          {data.map((d) => (
            <Cell key={d.name} fill={strategyColors[d.full] || '#d9a441'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function ShapBars() {
  const max = Math.max(...flagship.shap.drivers.map((d) => d.importance));
  return (
    <div className="space-y-3">
      {flagship.shap.drivers.map((d, i) => (
        <div key={d.feature}>
          <div className="mb-1 flex items-baseline justify-between text-sm">
            <span className="tabular-mono text-paper-50">{d.feature}</span>
            <span
              className={`text-xs ${
                d.direction === 'negative'
                  ? 'text-red-400/80'
                  : d.direction === 'positive'
                  ? 'text-signal-light'
                  : 'text-signal-amber'
              }`}
            >
              {d.direction}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-ink-800/70">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(d.importance / max) * 100}%` }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`h-full rounded-full ${
                d.direction === 'negative' ? 'bg-red-400/70' : d.direction === 'positive' ? 'bg-signal-light' : 'bg-signal-amber'
              }`}
            />
          </div>
          <div className="mt-1 text-xs text-paper-100/50">{d.note}</div>
        </div>
      ))}
    </div>
  );
}

function StrategyTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-paper-100/15 text-left text-paper-100/50">
            <th className="py-2 pr-4 font-normal">Strategy</th>
            <th className="py-2 pr-4 font-normal">Cum. Return</th>
            <th className="py-2 pr-4 font-normal">Sharpe</th>
            <th className="py-2 pr-4 font-normal">Max Drawdown</th>
            <th className="py-2 font-normal">Exposure</th>
          </tr>
        </thead>
        <tbody className="tabular-mono">
          {flagship.backtest.strategies.map((s) => (
            <tr key={s.name} className="border-b border-paper-100/5">
              <td className="py-3 pr-4 font-sans text-paper-100/80">{s.name}</td>
              <td className="py-3 pr-4 text-paper-50">+{s.cumReturn}%</td>
              <td className={`py-3 pr-4 ${s.name.includes('MoE') ? 'font-semibold text-signal-light' : 'text-paper-50'}`}>
                {s.sharpe.toFixed(3)}
              </td>
              <td className={`py-3 pr-4 ${s.name.includes('MoE') ? 'font-semibold text-signal-light' : 'text-paper-50'}`}>
                {s.maxDrawdown}%
              </td>
              <td className="py-3 text-paper-50">{s.exposure}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function FlagshipProject() {
  const [tab, setTab] = useState('accuracy');

  return (
    <Section id="flagship" className="bg-gradient-to-b from-transparent via-signal/[0.04] to-transparent">
      <Eyebrow>03 — Flagship Research</Eyebrow>
      <Reveal>
        <SectionTitle>{flagship.title}</SectionTitle>
        <p className="mt-2 tabular-mono text-sm text-paper-100/50">{flagship.subtitle}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-paper-100/75">{flagship.framing}</p>
      </Reveal>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <Reveal>
          <h3 className="mb-3 font-display text-lg text-paper-50">Problem framing</h3>
          <ul className="space-y-2.5 text-sm leading-relaxed text-paper-100/70">
            {flagship.problem.map((p, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal-light" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <h3 className="mb-3 font-display text-lg text-paper-50">Architecture</h3>
          <ul className="space-y-2.5 text-sm leading-relaxed text-paper-100/70">
            {flagship.architecture.map((p, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal-light" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Interactive tabbed results widget — the centerpiece */}
      <Reveal delay={0.15} className="mt-16">
        <div className="rounded-3xl border border-signal/15 bg-ink-900/50 p-6 md:p-10">
          <div className="tabular-mono mb-2 text-xs uppercase tracking-[0.2em] text-signal-light">
            Walk-forward, out-of-sample
          </div>
          <p className="mb-6 text-sm text-paper-100/55">{flagship.evalWindow}</p>

          <div className="mb-8 inline-flex rounded-full border border-paper-100/10 bg-ink-950/60 p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                data-cursor-hover
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5 ${
                  tab === t.id ? 'text-ink-950' : 'text-paper-100/60 hover:text-paper-50'
                }`}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="flagship-tab-pill"
                    className="absolute inset-0 rounded-full bg-signal-light"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {tab === 'accuracy' ? (
              <motion.div
                key="accuracy"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid gap-4 sm:grid-cols-3">
                  {flagship.accuracyMetrics.map((m) => (
                    <div key={m.label} className="rounded-xl border border-paper-100/10 bg-ink-950/40 p-4">
                      <div className="tabular-mono text-2xl text-paper-50">{m.value}</div>
                      <div className="mt-1 text-xs text-paper-100/50">{m.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {flagship.calibrationMetrics.map((m) => (
                    <div key={m.label} className="rounded-xl border border-signal-light/20 bg-signal/[0.06] p-4">
                      <div className="tabular-mono text-2xl text-signal-light">{m.value}</div>
                      <div className="mt-1 text-xs text-paper-100/50">{m.label}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-relaxed text-paper-100/70">{flagship.accuracyNote}</p>
              </motion.div>
            ) : (
              <motion.div
                key="risk"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <p className="mb-6 text-sm leading-relaxed text-paper-100/70">{flagship.backtest.note}</p>
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 text-xs uppercase tracking-[0.15em] text-paper-100/50">Sharpe ratio</h4>
                    <SharpeChart />
                  </div>
                  <div>
                    <h4 className="mb-2 text-xs uppercase tracking-[0.15em] text-paper-100/50">Max drawdown (%)</h4>
                    <DrawdownChart />
                  </div>
                </div>
                <div className="mt-8">
                  <StrategyTable />
                </div>
                <p className="mt-6 text-sm leading-relaxed text-paper-100/70">{flagship.backtest.takeaway}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>

      {/* SHAP explainability */}
      <Reveal delay={0.1} className="mt-16">
        <h3 className="mb-2 font-display text-lg text-paper-50">Explainability — per-regime SHAP attribution</h3>
        <p className="mb-6 max-w-2xl text-sm text-paper-100/60">{flagship.shap.note}</p>
        <div className="max-w-2xl">
          <ShapBars />
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-16">
        <div className="flex flex-col gap-6 rounded-2xl border border-paper-100/10 bg-ink-900/40 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h4 className="mb-1 font-display text-lg text-paper-50">Delivery</h4>
            <p className="max-w-xl text-sm text-paper-100/65">{flagship.delivery}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {flagship.tech.map((t) => (
                <span key={t} className="tabular-mono rounded-full border border-paper-100/15 px-3 py-1 text-xs text-paper-100/60">
                  {t}
                </span>
              ))}
            </div>
          </div>
          {/* TODO: replace href="#" with the real GitHub repository URL once published */}
          <a
            href={flagship.githubUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="flex shrink-0 items-center justify-center gap-2 rounded-full border border-signal-light/40 px-5 py-3 text-sm font-medium text-signal-light transition-colors hover:bg-signal-light hover:text-ink-950"
          >
            <GithubIcon size={16} /> View repository <ExternalLink size={14} />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
