import React from 'react';

interface CriticalCSSProps {
  criticalStyles?: string;
}

/**
 * Critical CSS Component for Above-the-Fold Content
 * Inlines critical CSS to eliminate render-blocking resources
 */
export default function CriticalCSS({ criticalStyles }: CriticalCSSProps) {
  // Critical CSS for above-the-fold content
  const defaultCriticalCSS = `
    /* Reset and base styles */
    *, *::before, *::after { box-sizing: border-box; }
    html { line-height: 1.15; -webkit-text-size-adjust: 100%; }
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    
    /* Critical layout styles */
    .header { position: sticky; top: 0; z-index: 50; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); }
    .hero { min-height: 60vh; display: flex; align-items: center; justify-content: center; }
    
    /* Typography */
    h1 { font-size: 2.5rem; font-weight: 700; line-height: 1.2; margin: 0 0 1rem 0; }
    h2 { font-size: 2rem; font-weight: 600; line-height: 1.3; margin: 0 0 0.75rem 0; }
    p { line-height: 1.6; margin: 0 0 1rem 0; }
    
    /* Button styles */
    .btn-primary { 
      background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.8));
      color: white; 
      padding: 0.75rem 1.5rem; 
      border-radius: 0.5rem; 
      border: none; 
      font-weight: 500;
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    .btn-primary:hover { transform: translateY(-1px); }
    
    /* Layout utilities */
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
    .flex { display: flex; }
    .items-center { align-items: center; }
    .justify-center { justify-content: center; }
    .text-center { text-align: center; }
    
    /* Prevent layout shift */
    img { height: auto; width: 100%; }
    .aspect-ratio-16-9 { aspect-ratio: 16 / 9; }
    .aspect-ratio-1-1 { aspect-ratio: 1 / 1; }
    
    /* Loading states */
    .skeleton { 
      background: linear-gradient(90deg, hsl(var(--muted)) 0%, hsl(var(--muted) / 0.7) 50%, hsl(var(--muted)) 100%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
    }
    
    @keyframes skeleton-loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    
    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .header { background: rgba(0, 0, 0, 0.95); }
    }
    
    /* Mobile optimization */
    @media (max-width: 768px) {
      h1 { font-size: 2rem; }
      h2 { font-size: 1.5rem; }
      .container { padding: 0 0.75rem; }
    }
  `;

  const cssToInline = criticalStyles || defaultCriticalCSS;

  return (
    <style 
      dangerouslySetInnerHTML={{ 
        __html: cssToInline.replace(/\s+/g, ' ').trim() 
      }} 
    />
  );
}