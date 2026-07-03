// Consistent section shell: id for anchor nav, max-width, vertical rhythm.
export default function Section({ id, className = '', children, bare = false }) {
  return (
    <section id={id} className={`relative scroll-mt-20 px-6 py-24 md:px-10 md:py-32 ${className}`}>
      <div className={bare ? '' : 'mx-auto w-full max-w-5xl'}>{children}</div>
    </section>
  );
}

export function Eyebrow({ children }) {
  return (
    <div className="mb-4 flex items-center gap-3 tabular-mono text-xs uppercase tracking-[0.25em] text-signal-light">
      <span className="h-px w-8 bg-signal-light/60" />
      {children}
    </div>
  );
}

export function SectionTitle({ children, className = '' }) {
  return (
    <h2 className={`font-display text-3xl font-medium tracking-tight text-paper-50 md:text-4xl ${className}`}>
      {children}
    </h2>
  );
}
