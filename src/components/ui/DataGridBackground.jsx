import { useMemo } from 'react';

// Faint animated data-grid + line-chart motif for the hero background.
// Pure CSS/SVG, no canvas, cheap to render, decorative (aria-hidden).
export default function DataGridBackground() {
  const path = useMemo(() => {
    // Deterministic pseudo-random walk so it reads as a "price series" without
    // depending on Math.random() at build/runtime for anything functional.
    const seedSteps = [4, -2, 6, -8, 3, 5, -3, 7, -5, 2, 8, -6, 4, -1, 5, -7, 6, 3, -4, 8];
    let y = 60;
    const points = [[0, y]];
    const stepX = 1000 / seedSteps.length;
    seedSteps.forEach((s, i) => {
      y = Math.max(10, Math.min(110, y + s));
      points.push([(i + 1) * stepX, y]);
    });
    return points.map((p) => p.join(',')).join(' ');
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid bg-[size:48px_48px] animate-grid-drift opacity-[0.5]" />
      <svg
        className="absolute bottom-0 left-0 w-full opacity-[0.18]"
        viewBox="0 0 1000 120"
        preserveAspectRatio="none"
        style={{ height: '40%' }}
      >
        <polyline points={path} fill="none" stroke="#2fa578" strokeWidth="1.5" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/20 via-ink-950/60 to-ink-950" />
    </div>
  );
}
