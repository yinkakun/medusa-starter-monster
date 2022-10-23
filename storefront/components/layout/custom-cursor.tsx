import { useState, useCallback, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export const CustomCursor = () => {
  const controls = useAnimation();
  const [cursorHasMoved, setCursorHasMoved] = useState(false);

  const CUSTOM_CURSOR_RADIUS = 40;

  const trailMouse = ({ clientX, clientY }: MouseEvent) => {
    controls.start({
      x: clientX - CUSTOM_CURSOR_RADIUS,
      y: clientY - CUSTOM_CURSOR_RADIUS,
      transition: {
        ease: 'backOut',
        duration: cursorHasMoved ? 0.7 : 0,
      },
    });

    if (!cursorHasMoved) {
      setCursorHasMoved(true);
    }
  };

  const handleMouseMove = useCallback(trailMouse, [cursorHasMoved]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, false);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove, false);
    };
  }, [handleMouseMove]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[1000] h-full w-full overflow-hidden ${
        cursorHasMoved ? 'visible' : 'invisible'
      }`}
    >
      <motion.div
        animate={controls}
        className="absolute z-[200] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-monster-green-300 border-opacity-100 bg-monster-green-300 bg-opacity-30"
      ></motion.div>
    </div>
  );
};
