import React from 'react';
import { Link } from 'react-router-dom';
import outlets from '@/data/press_outlets.json';
import './PressMarquee.css';

const PressMarquee: React.FC = () => {
  // Duplicate the outlets for seamless infinite scroll
  const list = [...outlets, ...outlets];

  const handleLogoClick = (outletName: string, articleUrl: string) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'press_logo_click', {
        event_category: 'engagement',
        event_label: outletName,
        outlet_name: outletName,
        article_url: articleUrl
      });
    }
  };

  return (
    <section aria-labelledby="press-title" className="py-10">
      <div className="container mx-auto px-4">
        <h2 id="press-title" className="text-center text-xs font-semibold tracking-[0.18em] text-muted-foreground mb-6">
          AS FEATURED IN
        </h2>

        <div className="overflow-hidden">
          <div
            className="flex gap-6 [animation:marquee_42s_linear_infinite] hover:[animation-play-state:paused] will-change-transform"
            aria-hidden="true"
          >
            {list.map((outlet, index) => (
              <a
                key={`${outlet.domain}-${index}`}
                href={outlet.article_url}
                target="_blank"
                rel="noopener nofollow"
                aria-label={`Read coverage on ${outlet.name}`}
                className="shrink-0 rounded-2xl bg-white/90 backdrop-blur ring-1 ring-slate-200 px-4 py-3 hover:bg-white transition-shadow hover:shadow-sm"
                onClick={() => handleLogoClick(outlet.name, outlet.article_url)}
              >
                <img
                  src={`https://logo.clearbit.com/${outlet.domain}?size=256`}
                  alt={outlet.name}
                  width={120}
                  height={28}
                  className="h-7 w-auto transition"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const parent = (e.currentTarget.parentElement as HTMLElement);
                    parent.innerHTML = `<span class="inline-flex h-7 items-center justify-center px-3 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium">${outlet.name}</span>`;
                  }}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Read Press Coverage Link */}
        <div className="text-center mt-8">
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
            Read full press coverage →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PressMarquee;