import { useEffect, useMemo, useRef, useState } from 'react';

const DEFAULT_OPTIONS = {
  root: null,
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.15,
};

export default function useScrollAnimation(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const observerOptions = useMemo(
    () => ({ ...DEFAULT_OPTIONS, ...options }),
    [options],
  );

  useEffect(() => {
    if (isVisible || typeof window === 'undefined' || !ref.current) {
      return undefined;
    }

    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      observerOptions,
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isVisible, observerOptions]);

  return { ref, isVisible };
}
