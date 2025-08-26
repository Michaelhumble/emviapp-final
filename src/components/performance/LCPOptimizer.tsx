import React, { useEffect } from 'react';

interface LCPOptimizerProps {
  criticalImages?: string[];
  preloadFonts?: string[];
  criticalCSS?: string;
}

export default function LCPOptimizer({ 
  criticalImages = [], 
  preloadFonts = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
  ],
  criticalCSS 
}: LCPOptimizerProps) {
  
  useEffect(() => {
    // Preload critical images for LCP
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });

    // Preload critical fonts
    preloadFonts.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      link.onload = () => {
        // Convert to stylesheet after load
        link.rel = 'stylesheet';
      };
      document.head.appendChild(link);
    });

    // Optimize existing images for LCP
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach((img, index) => {
        // Mark first few images as high priority
        if (index < 3) {
          img.fetchPriority = 'high';
          img.loading = 'eager';
        }
        
        // Add decode optimization
        if ('decoding' in img) {
          img.decoding = 'async';
        }
      });
    };

    // Run optimization after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizeImages);
    } else {
      optimizeImages();
    }

    // Resource hints for performance
    const addResourceHints = () => {
      const hints = [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
        { rel: 'preconnect', href: 'https://images.unsplash.com' },
        { rel: 'dns-prefetch', href: '//www.googletagmanager.com' },
        { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
      ];

      hints.forEach(hint => {
        const existing = document.querySelector(`link[rel="${hint.rel}"][href="${hint.href}"]`);
        if (!existing) {
          const link = document.createElement('link');
          link.rel = hint.rel;
          link.href = hint.href;
          if (hint.crossorigin) link.crossOrigin = 'anonymous';
          document.head.appendChild(link);
        }
      });
    };

    addResourceHints();

    return () => {
      document.removeEventListener('DOMContentLoaded', optimizeImages);
    };
  }, [criticalImages, preloadFonts]);

  return (
    <>
      {/* Inline critical CSS for fastest render */}
      {criticalCSS && (
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      )}
      
      {/* Resource hints */}
      <link rel="preload" href="/fonts/Inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      
      {/* Optimize viewport for mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    </>
  );
}