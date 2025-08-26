import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedOutlets, generateLogoPlaceholder } from '@/data/pressOutlets';
import './PressMarquee.css';

const PressMarquee: React.FC = () => {
  const featuredOutlets = getFeaturedOutlets();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Duplicate the outlets for seamless infinite scroll
  const duplicatedOutlets = [...featuredOutlets, ...featuredOutlets];

  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement>, name: string) => {
    const img = e.currentTarget;
    img.src = generateLogoPlaceholder(name);
  };

  const handleLogoClick = (outletName: string) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'press_logo_click', {
        event_category: 'engagement',
        event_label: outletName,
        outlet_name: outletName
      });
    }
  };

  return (
    <section 
      className="py-8 bg-muted/20 overflow-hidden"
      aria-label="As Featured In"
    >
      <div className="container mx-auto px-4">
        {/* Section Label */}
        <div className="text-center mb-6">
          <p className="text-sm font-medium text-muted-foreground">
            As Featured In
          </p>
        </div>

        {/* Desktop: Infinite Marquee */}
        <div className="hidden md:block relative">
          {/* Edge fade gradients */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-muted/20 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-muted/20 to-transparent z-10 pointer-events-none" />
          
          <div 
            className="flex gap-8 animate-marquee hover:pause"
            style={{
              width: 'calc(200% + 2rem)',
              animationDuration: '20s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite'
            }}
          >
            {duplicatedOutlets.map((outlet, index) => (
              <Link
                key={`${outlet.slug}-${index}`}
                to="/press"
                className="flex-shrink-0 flex items-center justify-center h-16 w-32 group cursor-pointer"
                onClick={() => handleLogoClick(outlet.name)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                aria-label={`Read ${outlet.name} coverage`}
              >
                <img
                  src={`/press-logos/${outlet.slug}.svg`}
                  alt={outlet.name}
                  className={`max-w-full max-h-10 object-contain transition-all duration-300 ${
                    hoveredIndex === index ? 'filter-none' : 'grayscale'
                  }`}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => handleLogoError(e, outlet.name)}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden">
          <div 
            className="flex gap-6 overflow-x-auto px-4 py-2 scroll-smooth press-marquee-scroll"
            style={{ 
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {featuredOutlets.map((outlet, index) => (
              <Link
                key={outlet.slug}
                to="/press"
                className="flex-shrink-0 flex items-center justify-center h-14 w-28 group cursor-pointer"
                style={{ scrollSnapAlign: 'start' }}
                onClick={() => handleLogoClick(outlet.name)}
                aria-label={`Read ${outlet.name} coverage`}
              >
                <img
                  src={`/press-logos/${outlet.slug}.svg`}
                  alt={outlet.name}
                  className="max-w-full max-h-8 object-contain grayscale group-active:filter-none transition-all duration-200"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => handleLogoError(e, outlet.name)}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Read Press Coverage Link */}
        <div className="text-center mt-6">
          <Link 
            to="/press"
            className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            onClick={() => {
              // Analytics tracking
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'press_coverage_click', {
                  event_category: 'engagement',
                  event_label: 'Read full press coverage',
                  link_location: 'press_marquee'
                });
              }
            }}
          >
            Read the full press coverage →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PressMarquee;