
import { useEffect, useRef, useState } from 'react';

export interface UseScrollAnimationProps {
  threshold?: number;
  animation?: string;
  once?: boolean;
  rootMargin?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const useScrollAnimation = ({
  threshold = 0.1,
  animation = 'fade-in',
  once = true,
  rootMargin = '0px 0px -100px 0px',
  className = '',
  style = {}
}: UseScrollAnimationProps = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const currentRef = ref.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // If once is true, unobserve after it becomes visible
          if (once && currentRef) {
            observer.unobserve(currentRef);
          }
        } else if (!once) {
          // Only set to false if once is false
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin // Trigger slightly before the element comes into view
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once, rootMargin]);

  return { ref, isVisible, animation, className, style };
};
