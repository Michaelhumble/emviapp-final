import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getWeightedOutlets, getOutletByKey, type Outlet } from '@/lib/press';
import PressModal from './PressModal';
import './PressMarquee.css';

const PressMarquee: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState<string | null>(null);
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Get weighted outlets for display (16 total)
  const displayOutlets = getWeightedOutlets(16);
  
  // Duplicate for seamless infinite scroll
  const list = [...displayOutlets, ...displayOutlets];

  const handleLogoClick = (outlet: Outlet) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'press_logo_click',
        outlet_key: outlet.key,
        outlet_name: outlet.name,
        type: outlet.type,
        location: 'home-marquee'
      });
    }

    setSelectedOutlet(outlet.key);
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
      <section aria-labelledby="press-title" className="py-12 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <h2 id="press-title" className="text-center text-sm font-semibold tracking-[0.16em] text-muted-foreground mb-8 uppercase">
            As seen on
          </h2>

          <div className="overflow-hidden">
            <div className="flex pressMarquee will-change-transform">
              {list.map((outlet, index) => (
                <button
                  key={`${outlet.key}-${index}`}
                  ref={(el) => setTriggerRef(`${outlet.key}-${index}`, el)}
                  onClick={() => handleLogoClick(outlet)}
                  aria-label={`${outlet.name} coverage for EmviApp`}
                  className="pressLogoWrap cursor-pointer"
                >
                  <img
                    src={outlet.logo}
                    alt={`${outlet.name} logo`}
                    loading="lazy"
                    decoding="async"
                    style={{ 
                      contentVisibility: 'auto',
                      width: 'auto',
                      height: '100%'
                    }}
                    onError={(e) => {
                      const parent = (e.currentTarget.parentElement as HTMLElement);
                      const initials = outlet.name.split(' ').map(w => w[0]).join('').toUpperCase();
                      parent.innerHTML = `<div class="inline-flex items-center justify-center w-full h-full rounded-xl bg-card border text-card-foreground text-sm font-semibold">${initials}</div>`;
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Read Press Coverage Link */}
          <div className="text-center mt-10">
            <Link 
              to="/press"
              className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors font-medium group"
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
              Read full press coverage 
              <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
          
          {/* Legal disclaimer */}
          <div className="text-center mt-4">
            <p className="text-xs text-muted-foreground">
              All trademarks are property of their respective owners.
            </p>
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