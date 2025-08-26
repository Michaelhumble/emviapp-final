import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedLogos } from '@/data/pressLogos';
import './PressMarquee.css';

const PressMarquee: React.FC = () => {
  const featuredLogos = getFeaturedLogos();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Duplicate the logos for seamless infinite scroll
  const duplicatedLogos = [...featuredLogos, ...featuredLogos];

  const handleLogoClick = (logoName: string, articleUrl: string) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'press_logo_click', {
        event_category: 'engagement',
        event_label: logoName,
        outlet_name: logoName,
        article_url: articleUrl
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
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
          
          <div 
            className="flex gap-8 animate-marquee hover:pause h-16 items-center"
            style={{
              width: 'calc(200% + 2rem)',
              animationDuration: '30s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite'
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <a
                key={`${logo.slug}-${index}`}
                href={logo.articleUrl.startsWith('http') ? logo.articleUrl : logo.href}
                target={logo.articleUrl.startsWith('http') ? '_blank' : '_self'}
                rel={logo.articleUrl.startsWith('http') ? 'nofollow noopener' : undefined}
                className="flex-shrink-0 flex items-center justify-center h-16 min-w-[120px] group cursor-pointer"
                onClick={() => handleLogoClick(logo.name, logo.articleUrl)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                aria-label={`Read ${logo.name} coverage`}
              >
                <img
                  src={`/press-logos/${logo.slug}.svg`}
                  alt=""
                  aria-hidden="true"
                  className={`max-w-full h-[26px] object-contain transition-all duration-300 text-muted-foreground ${
                    hoveredIndex === index ? 'filter-none opacity-100' : 'grayscale opacity-60'
                  }`}
                  loading="lazy"
                  decoding="async"
                  style={{ width: 'auto', maxWidth: '120px' }}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden">
          <div 
            className="flex gap-6 overflow-x-auto px-4 py-2 scroll-smooth press-marquee-scroll h-16 items-center"
            style={{ 
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {featuredLogos.map((logo) => (
              <a
                key={logo.slug}
                href={logo.articleUrl.startsWith('http') ? logo.articleUrl : logo.href}
                target={logo.articleUrl.startsWith('http') ? '_blank' : '_self'}
                rel={logo.articleUrl.startsWith('http') ? 'nofollow noopener' : undefined}
                className="flex-shrink-0 flex items-center justify-center h-14 min-w-[100px] group cursor-pointer"
                style={{ scrollSnapAlign: 'start' }}
                onClick={() => handleLogoClick(logo.name, logo.articleUrl)}
                aria-label={`Read ${logo.name} coverage`}
              >
                <img
                  src={`/press-logos/${logo.slug}.svg`}
                  alt=""
                  aria-hidden="true"
                  className="max-w-full h-[22px] object-contain grayscale opacity-60 group-active:filter-none group-active:opacity-100 transition-all duration-200 text-muted-foreground"
                  loading="lazy"
                  decoding="async"
                  style={{ width: 'auto', maxWidth: '100px' }}
                />
              </a>
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
                  event_label: 'See all press (300+)',
                  link_location: 'press_marquee'
                });
              }
            }}
          >
            See all press (300+) →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PressMarquee;