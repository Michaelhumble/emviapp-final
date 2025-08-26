import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { OUTLETS, getOutletByKey } from '@/data/pressCoverage';
import PressModal from './PressModal';
import './PressMarquee.css';

const PressMarquee: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState<string | null>(null);
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Map outlets from press_outlets.json to press coverage data
  const outletData = OUTLETS.map(outlet => ({
    domain: outlet.primaryUrl.split('/')[2], // Extract domain from URL
    name: outlet.name,
    article_url: outlet.primaryUrl,
    key: outlet.key
  }));

  // Prioritize high-trust outlets for first loop
  const priorityKeys = [
    'ap', 'kron4', 'fox40', 'cbs13', 'kxan', 'wgn9', 
    'kget17', 'krqe', 'wfla', 'benzinga'
  ];
  
  const orderedOutlets = [
    ...outletData.filter(o => priorityKeys.includes(o.key)),
    ...outletData.filter(o => !priorityKeys.includes(o.key)).sort((a, b) => a.name.localeCompare(b.name))
  ];
  
  // Duplicate for seamless infinite scroll
  const list = [...orderedOutlets, ...orderedOutlets];

  const handleLogoClick = (outletKey: string) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'press_logo_click',
        outlet: outletKey,
        location: 'home-marquee'
      });
    }

    setSelectedOutlet(outletKey);
    setModalOpen(true);
  };

  const setTriggerRef = (key: string, element: HTMLButtonElement | null) => {
    if (element) {
      triggerRefs.current.set(key, element);
    } else {
      triggerRefs.current.delete(key);
    }
  };

  const getCurrentTriggerRef = () => {
    if (selectedOutlet) {
      const element = triggerRefs.current.get(selectedOutlet);
      return element ? { current: element } : undefined;
    }
    return undefined;
  };

  return (
    <>
      <section aria-labelledby="press-title" className="py-10">
        <div className="container mx-auto px-4">
          <h2 id="press-title" className="text-center text-xs font-semibold tracking-[0.18em] text-muted-foreground mb-6">
            AS FEATURED IN
          </h2>

          <div className="overflow-hidden">
            <div className="flex pressMarquee will-change-transform">
              {list.map((outlet, index) => (
                <button
                  key={`${outlet.key}-${index}`}
                  ref={(el) => setTriggerRef(`${outlet.key}-${index}`, el)}
                  onClick={() => handleLogoClick(outlet.key)}
                  aria-label={`Press coverage on ${outlet.name} (opens details)`}
                  className="pressLogoWrap cursor-pointer"
                >
                  <img
                    src={`https://logo.clearbit.com/${outlet.domain}?size=256`}
                    alt={`${outlet.name} logo`}
                    loading="lazy"
                    decoding="async"
                    style={{ contentVisibility: 'auto' }}
                    onError={(e) => {
                      const parent = (e.currentTarget.parentElement as HTMLElement);
                      parent.innerHTML = `<span class="inline-flex items-center justify-center px-3 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium" style="height: var(--press-logo-h)">${outlet.name}</span>`;
                    }}
                  />
                </button>
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
                if (typeof window !== 'undefined' && (window as any).dataLayer) {
                  (window as any).dataLayer.push({
                    event: 'press_coverage_click',
                    location: 'press_marquee'
                  });
                }
              }}
            >
              Read full press coverage →
            </Link>
          </div>
        </div>
      </section>

      {/* Press Modal */}
      <PressModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        outlet={selectedOutlet ? getOutletByKey(selectedOutlet) || null : null}
        triggerRef={getCurrentTriggerRef()}
      />
    </>
  );
};

export default PressMarquee;