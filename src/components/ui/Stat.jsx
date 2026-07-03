import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

// Animated numeric stat: counts up from 0 when scrolled into view, once.
// Hand-rolled with Framer Motion's animate() rather than a separate
// count-up library — one less dependency for a few lines of tweening.
export default function Stat({ value, decimals = 0, suffix = '', prefix = '', label, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={ref} className={className}>
      <div className="tabular-mono text-3xl font-semibold text-paper-50 md:text-4xl">
        {prefix}
        {display.toFixed(decimals)}
        {suffix}
      </div>
      {label && <div className="mt-1 text-sm text-paper-100/60">{label}</div>}
    </div>
  );
}
