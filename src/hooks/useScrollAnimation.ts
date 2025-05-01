
import { useState, useEffect, useRef } from 'react';

type AnimationType = 'fade-in' | 'slide-up' | 'bounce' | 'none';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  animation?: AnimationType;
  delay?: number;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    animation = 'fade-in',
    delay = 0
  } = options;
  
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    const current = elementRef.current;
    if (!current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(current);
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(current);
    
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [threshold, rootMargin, delay]);
  
  return {
    ref: elementRef,
    isVisible,
    className: isVisible ? animation : 'opacity-0',
    style: { 
      transitionProperty: 'opacity, transform',
      transitionDuration: '0.5s',
      transitionTimingFunction: 'ease-out'
    }
  };
};
