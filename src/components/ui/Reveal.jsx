import { motion } from 'framer-motion';

// Scroll-triggered reveal wrapper used throughout the site for consistent,
// restrained entrance motion (fade + rise, once per element).
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.6,
  className = '',
  as = 'div',
}) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Comp>
  );
}
