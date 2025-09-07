import React from 'react';
import { Link } from 'react-router-dom';
import { PRESS_OUTLETS } from '@/data/pressOutlets';

const PressMarquee: React.FC = () => {
  const addUTMParams = (href: string) => {
    try {
      const url = new URL(href);
      url.searchParams.set('utm_source', 'emvi.app');
      url.searchParams.set('utm_medium', 'as-seen-on');
      url.searchParams.set('utm_campaign', 'press');
      return url.toString();
    } catch {
      return href;
    }
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = '/press-logos/fallback.svg';
  };

  return (
    <section 
      aria-labelledby="press-title" 
      className="py-12 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container mx-auto px-4">
        <h2 
          id="press-title" 
          className="text-center text-sm font-semibold tracking-[0.16em] text-muted-foreground mb-8 uppercase"
        >
          As seen on
        </h2>

        <div className="grid grid-flow-col auto-cols-[max-content] gap-6 overflow-x-auto md:overflow-visible justify-center md:justify-center pb-4 scrollbar-hide">
          {PRESS_OUTLETS.map((outlet) => (
            <a
              key={outlet.id}
              href={addUTMParams(outlet.href)}
              target="_blank"
              rel="nofollow noopener"
              aria-label={`Read EmviApp press on ${outlet.name}`}
              className="group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
            >
              <div className="h-22 w-22 rounded-full bg-white ring-1 ring-black/5 shadow-sm p-4 flex items-center justify-center transition-transform hover:scale-102 group-focus:scale-102">
                <img
                  src={outlet.logo}
                  alt={outlet.alt}
                  loading="lazy"
                  className="h-full w-full object-contain aspect-square"
                  onError={handleImageError}
                  width={56}
                  height={56}
                />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link 
            to="/press"
            className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors font-medium group"
          >
            Read full press coverage 
            <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground">
            All trademarks are property of their respective owners.
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .h-22 {
            height: 5.5rem;
          }
          .w-22 {
            width: 5.5rem;
          }
          .hover\\:scale-102:hover {
            transform: scale(1.02);
          }
          .group-focus\\:scale-102:focus {
            transform: scale(1.02);
          }
        `
      }} />
    </section>
  );
};

export default PressMarquee;