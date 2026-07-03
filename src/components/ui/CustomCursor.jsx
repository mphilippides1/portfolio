import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Subtle cursor-following dot + ring, desktop/fine-pointer only.
// Automatically no-ops on touch devices, no event listeners are attached.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });

  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setEnabled(isFinePointer);
    if (!isFinePointer) return;

    document.body.classList.add('custom-cursor-active');

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onOver = (e) => {
      const interactive = e.target.closest('a, button, [data-cursor-hover]');
      setHoveringInteractive(Boolean(interactive));
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', onOver);
      document.body.classList.remove('custom-cursor-active');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[999] h-1.5 w-1.5 rounded-full bg-signal-light"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%', opacity: visible ? 1 : 0 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[998] rounded-full border border-signal-light/50"
        animate={{
          width: hoveringInteractive ? 44 : 28,
          height: hoveringInteractive ? 44 : 28,
          opacity: visible ? (hoveringInteractive ? 0.9 : 0.5) : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  );
}
