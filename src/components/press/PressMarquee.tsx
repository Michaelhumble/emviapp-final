import React from 'react';
import { Link } from 'react-router-dom';
import outlets from '@/data/press_outlets.json';
import './PressMarquee.css';

const PressMarquee: React.FC = () => {
  // Prioritize high-trust outlets for first loop
  const priorityOutlets = [
    'apnews.com', 'kron4.com', 'fox40.com', 'krqe.com', 
    'kxan.com', 'wgntv.com', 'kget.com', 'wfla.com', 'benzinga.com'
  ];
  
  const orderedOutlets = [
    ...outlets.filter(o => priorityOutlets.includes(o.domain)),
    ...outlets.filter(o => !priorityOutlets.includes(o.domain)).sort((a, b) => a.name.localeCompare(b.name))
  ];
  
  // Duplicate for seamless infinite scroll
  const list = [...orderedOutlets, ...orderedOutlets];

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
          <div className="flex pressMarquee will-change-transform">
            {list.map((outlet, index) => (
              <a
                key={`${outlet.domain}-${index}`}
                href={outlet.article_url}
                target="_blank"
                rel="noopener nofollow"
                aria-label={`Read coverage on ${outlet.name} (opens in new tab)`}
                className="pressLogoWrap"
                onClick={() => handleLogoClick(outlet.name, outlet.article_url)}
              >
                <img
                  src={`https://logo.clearbit.com/${outlet.domain}?size=256`}
                  alt={`${outlet.name} logo`}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const parent = (e.currentTarget.parentElement as HTMLElement);
                    parent.innerHTML = `<span class="inline-flex items-center justify-center px-3 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium" style="height: var(--press-logo-h)">${outlet.name}</span>`;
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