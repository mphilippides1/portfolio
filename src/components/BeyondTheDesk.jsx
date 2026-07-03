import { useState } from 'react';
import { motion } from 'framer-motion';
import Section, { Eyebrow, SectionTitle } from './ui/Section';
import Reveal from './ui/Reveal';
import { beyondTheDesk } from '../data';

// Flip cards driven by click/tap state (not CSS :hover) so the interaction
// works identically on touch devices and desktop.
function FlipCard({ item, index }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Reveal delay={index * 0.08}>
      <div
        className="h-52 [perspective:1200px]"
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        data-cursor-hover
        aria-label={`${item.title} — tap to flip`}
      >
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Front */}
          <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-paper-100/10 bg-ink-900/60 p-5 [backface-visibility:hidden]">
            <div className="tabular-mono text-2xl text-signal-light">{item.stat}</div>
            <div>
              <h3 className="font-display text-lg text-paper-50">{item.title}</h3>
              <p className="mt-1 text-xs text-paper-100/40">Tap to read more</p>
            </div>
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 flex items-center rounded-2xl border border-signal-light/30 bg-signal/10 p-5 [backface-visibility:hidden]"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <p className="text-sm leading-relaxed text-paper-100/80">{item.detail}</p>
          </div>
        </motion.div>
      </div>
    </Reveal>
  );
}

export default function BeyondTheDesk() {
  return (
    <Section id="beyond" className="bg-ink-900/40">
      <Eyebrow>07 — Beyond the Desk</Eyebrow>
      <Reveal>
        <SectionTitle>Same discipline, different scoreboard.</SectionTitle>
        <p className="mt-4 max-w-2xl text-lg text-paper-100/65">Tap a card to flip it.</p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {beyondTheDesk.map((item, i) => (
          <FlipCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </Section>
  );
}
