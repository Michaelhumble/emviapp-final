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

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {PRESS_OUTLETS.map((outlet) => (
            <a
              key={outlet.id}
              href={addUTMParams(outlet.href)}
              target="_blank"
              rel="nofollow noopener"
              aria-label={`Read EmviApp press on ${outlet.name}`}
              className="group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <div className="h-16 w-32 md:h-20 md:w-40 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center p-3 transition-all duration-300 group-hover:shadow-md group-hover:border-gray-200">
                <img
                  src={outlet.logo}
                  alt={outlet.alt}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                  onError={handleImageError}
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

    </section>
  );
};

export default PressMarquee;