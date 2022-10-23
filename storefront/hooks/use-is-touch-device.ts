import { useState, useCallback } from 'react';
import { useIsomorphicLayoutEffect } from './use-layout-effect';

const detectTouchDevice = () => {
  let isTouchDevice = false;

  if (window.PointerEvent && 'maxTouchPoints' in navigator) {
    isTouchDevice = navigator.maxTouchPoints > 0;
  } else if (window.matchMedia) {
    const query = '(pointer:coarse)';
    isTouchDevice = window.matchMedia(query).matches;
  } else if (window.TouchEvent || 'ontouchstart' in window) {
    isTouchDevice = true;
  }

  return isTouchDevice;
};

export const useIsTouchDevice = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const onResize = useCallback(() => {
    setIsTouchDevice(detectTouchDevice());
  }, []);

  useIsomorphicLayoutEffect(() => {
    onResize();
    window.addEventListener('resize', onResize, false);

    return () => {
      window.removeEventListener('resize', onResize, false);
    };
  }, []);

  return isTouchDevice;
};
