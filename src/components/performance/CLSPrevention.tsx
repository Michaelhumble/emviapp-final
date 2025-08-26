import React, { useEffect } from 'react';

export default function CLSPrevention() {
  useEffect(() => {
    // Prevent layout shifts from images
    const reserveImageSpace = () => {
      const images = document.querySelectorAll('img:not([width]):not([height])') as NodeListOf<HTMLImageElement>;
      
      images.forEach(img => {
        // Set min-height to prevent collapse
        if (!img.style.minHeight && !img.getAttribute('width')) {
          img.style.minHeight = '200px';
          img.style.backgroundColor = '#f3f4f6';
          
          // Remove min-height after load
          const handleLoad = () => {
            img.style.minHeight = '';
            img.style.backgroundColor = '';
            img.removeEventListener('load', handleLoad);
          };
          
          img.addEventListener('load', handleLoad);
        }
      });
    };

    // Prevent shifts from web fonts
    const preventFontShifts = () => {
      // Use font-display: swap in CSS combined with preload
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.as = 'font';
      fontLink.href = '/fonts/Inter-var.woff2';
      fontLink.type = 'font/woff2';
      fontLink.crossOrigin = 'anonymous';
      document.head.appendChild(fontLink);
    };

    // Prevent shifts from dynamic content
    const preventDynamicShifts = () => {
      const dynamicContainers = document.querySelectorAll('[data-dynamic]') as NodeListOf<HTMLElement>;
      
      dynamicContainers.forEach(container => {
        if (!container.style.minHeight) {
          const rect = container.getBoundingClientRect();
          if (rect.height === 0) {
            container.style.minHeight = '100px'; // Reserve space
          }
        }
      });
    };

    // Prevent shifts from ads and embeds
    const preventAdShifts = () => {
      const adContainers = document.querySelectorAll('.ad-container, [data-ad]') as NodeListOf<HTMLElement>;
      
      adContainers.forEach(container => {
        container.style.minHeight = '250px'; // Standard ad height
        container.style.backgroundColor = '#fafafa';
        container.style.border = '1px dashed #ddd';
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';
        container.style.color = '#999';
        container.textContent = container.textContent || 'Ad Space';
      });
    };

    // Monitor for layout shifts
    const observeLayoutShifts = () => {
      if ('LayoutShift' in window) {
        let clsValue = 0;
        
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const layoutShiftEntry = entry as any; // Cast to avoid TS issues with experimental API
            if (!layoutShiftEntry.hadRecentInput) {
              clsValue += layoutShiftEntry.value;
              
              // Log significant shifts for debugging
              if (layoutShiftEntry.value > 0.01) {
                console.warn('⚠️ Significant layout shift detected:', {
                  value: layoutShiftEntry.value,
                  sources: layoutShiftEntry.sources,
                  timestamp: entry.startTime
                });
              }
            }
          }
          
          // Update CLS metric
          if (clsValue > 0.1) {
            console.error('🚨 CLS threshold exceeded:', clsValue);
          }
        }).observe({ type: 'layout-shift', buffered: true });
      }
    };

    // Apply all CLS prevention techniques
    reserveImageSpace();
    preventFontShifts();
    preventDynamicShifts();
    preventAdShifts();
    observeLayoutShifts();

    // Re-apply when DOM changes
    const observer = new MutationObserver(() => {
      setTimeout(() => {
        reserveImageSpace();
        preventDynamicShifts();
      }, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <style>{`
      /* CLS Prevention CSS */
      
      /* Reserve space for images */
      img {
        max-width: 100%;
        height: auto;
      }
      
      /* Prevent font loading shifts */
      @font-face {
        font-family: 'Inter';
        font-display: swap;
        src: url('/fonts/Inter-var.woff2') format('woff2-variations');
      }
      
      /* Aspect ratio containers to prevent shifts */
      .aspect-video {
        aspect-ratio: 16 / 9;
      }
      
      .aspect-square {
        aspect-ratio: 1 / 1;
      }
      
      .aspect-photo {
        aspect-ratio: 4 / 3;
      }
      
      /* Skeleton loading states */
      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      
      /* Prevent content jumping */
      .content-container {
        min-height: 100vh;
      }
      
      /* Stable button heights */
      .btn {
        min-height: 2.5rem;
        line-height: 1.25;
      }
      
      /* Prevent input field shifts */
      input, textarea, select {
        box-sizing: border-box;
      }
      
      /* Reserve space for lazy loaded content */
      .lazy-container {
        min-height: 200px;
        position: relative;
      }
      
      .lazy-container::before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        background: #f8f9fa;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
      }
    `}</style>
  );
}