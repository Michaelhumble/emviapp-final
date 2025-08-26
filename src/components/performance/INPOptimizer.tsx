import React, { useEffect } from 'react';

export default function INPOptimizer() {
  useEffect(() => {
    // Debounce input handlers to reduce processing
    const debounce = (func: Function, delay: number) => {
      let timeoutId: NodeJS.Timeout;
      return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
      };
    };

    // Throttle scroll and resize handlers
    const throttle = (func: Function, delay: number) => {
      let inThrottle: boolean;
      return (...args: any[]) => {
        if (!inThrottle) {
          func.apply(null, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, delay);
        }
      };
    };

    // Optimize input handlers
    const optimizeInputs = () => {
      const inputs = document.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        // Debounce input events
        const debouncedHandler = debounce((e: Event) => {
          // Process input with lower priority
          setTimeout(() => {
            // Handle input processing
            console.debug('Processing input:', e.target);
          }, 0);
        }, 150);

        input.addEventListener('input', debouncedHandler);
        
        // Use passive listeners where possible
        input.addEventListener('scroll', throttle(() => {
          // Handle scroll
        }, 16), { passive: true });
      });
    };

    // Optimize button interactions
    const optimizeButtons = () => {
      const buttons = document.querySelectorAll('button, [role="button"]') as NodeListOf<HTMLElement>;
      
      buttons.forEach(button => {
        // Add visual feedback immediately
        button.addEventListener('click', (e) => {
          // Immediate visual feedback
          button.style.transform = 'scale(0.98)';
          
          // Schedule heavy processing
          setTimeout(() => {
            button.style.transform = '';
            // Process click logic here
          }, 0);
        }, { passive: false });

        // Preload hover states
        button.addEventListener('mouseenter', () => {
          button.style.willChange = 'transform, box-shadow';
        }, { passive: true });

        button.addEventListener('mouseleave', () => {
          button.style.willChange = 'auto';
        }, { passive: true });
      });
    };

    // Optimize scroll performance
    const optimizeScrolling = () => {
      const scrollHandler = throttle(() => {
        // Handle scroll logic
        requestAnimationFrame(() => {
          // Process scroll-dependent updates
        });
      }, 16);

      window.addEventListener('scroll', scrollHandler, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', scrollHandler);
      };
    };

    // Reduce main thread blocking
    const scheduleNonUrgentTasks = () => {
      // Use requestIdleCallback for non-critical tasks
      if ('requestIdleCallback' in window) {
        const processIdleTasks = (deadline: IdleDeadline) => {
          while (deadline.timeRemaining() > 0) {
            // Process low-priority tasks
            const analytics = performance.getEntriesByType('measure');
            if (analytics.length > 100) {
              performance.clearMeasures();
            }
            break;
          }
        };

        requestIdleCallback(processIdleTasks);
      }
    };

    // Monitor INP performance
    const monitorINP = () => {
      if ('PerformanceObserver' in window) {
        try {
          let maxINP = 0;
          
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              const eventEntry = entry as any; // Cast to avoid TS issues with experimental API
              if (entry.name === 'event') {
                const delay = eventEntry.processingStart - eventEntry.startTime;
                maxINP = Math.max(maxINP, delay);
                
                if (delay > 200) {
                  console.warn('⚠️ Slow interaction detected:', {
                    type: entry.name,
                    delay: delay,
                    target: eventEntry.target
                  });
                }
              }
            }
          }).observe({ type: 'event', buffered: true });

          // Log INP periodically
          setInterval(() => {
            if (maxINP > 0) {
              console.log('📊 Current max INP:', maxINP + 'ms');
            }
          }, 10000);
        } catch (e) {
          // Fallback for browsers without event timing
          console.debug('INP monitoring not available');
        }
      }
    };

    // Break up long tasks
    const breakUpLongTasks = () => {
      const yieldToMain = () => {
        return new Promise(resolve => {
          setTimeout(resolve, 0);
        });
      };

      // Example of breaking up work
      const processLargeDataset = async (items: any[]) => {
        const batchSize = 50;
        
        for (let i = 0; i < items.length; i += batchSize) {
          const batch = items.slice(i, i + batchSize);
          
          // Process batch
          batch.forEach(item => {
            // Process individual item
          });
          
          // Yield to main thread
          await yieldToMain();
        }
      };

      // Make function available globally for use
      (window as any).processLargeDataset = processLargeDataset;
    };

    // Apply all optimizations
    optimizeInputs();
    optimizeButtons();
    const cleanupScroll = optimizeScrolling();
    scheduleNonUrgentTasks();
    monitorINP();
    breakUpLongTasks();

    // Cleanup
    return () => {
      cleanupScroll();
    };
  }, []);

  return (
    <style>{`
      /* INP Optimization CSS */
      
      /* Optimize touch interactions */
      * {
        touch-action: manipulation;
      }
      
      /* Reduce paint complexity */
      .complex-animation {
        will-change: transform;
        transform: translateZ(0);
      }
      
      /* Optimize button interactions */
      button, [role="button"] {
        cursor: pointer;
        transition: transform 0.1s ease-out, box-shadow 0.1s ease-out;
      }
      
      button:active, [role="button"]:active {
        transform: scale(0.98);
      }
      
      /* Optimize input responsiveness */
      input, textarea, select {
        transition: border-color 0.1s ease-out, box-shadow 0.1s ease-out;
      }
      
      /* Prevent unnecessary repaints */
      .static-content {
        contain: layout style paint;
      }
      
      /* Optimize animations */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
      
      /* Use GPU acceleration wisely */
      .gpu-accelerated {
        transform: translateZ(0);
        backface-visibility: hidden;
      }
      
      /* Optimize scrolling */
      .scroll-container {
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
      }
      
      /* Contain layout where possible */
      .card, .component {
        contain: layout;
      }
    `}</style>
  );
}