import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWeightedOutlets, getOutletByKey, getLogoUrl, type Outlet } from '@/lib/press';
import PressModal from './PressModal';
import './PressMarquee.css';

const PressMarquee: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState<string | null>(null);
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Build sources synchronously - no runtime fetch
  const sources = getWeightedOutlets(20).map(outlet => ({
    key: outlet.key,
    name: outlet.name,
    href: outlet.url,
    src: getLogoUrl(outlet)
  }));
  
  // Duplicate the array once for seamless scroll before render
  const track = [...sources, ...sources];

  // Preload logos to avoid late fills - eagerly warm cache for first 24 logos
  useEffect(() => {
    const preload = track.slice(0, 24);
    preload.forEach(item => {
      const img = new Image();
      img.decoding = "async";
      img.src = item.src;
    });
  }, []);

  const handleLogoClick = (outlet: Outlet) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'outlet_click',
        outlet_key: outlet.key,
        outlet_name: outlet.name,
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
              {track.map((item, index) => (
                <button
                  key={`${item.key}-${index}`}
                  ref={(el) => setTriggerRef(`${item.key}-${index}`, el)}
                  onClick={() => {
                    const outlet = getOutletByKey(item.key);
                    if (outlet) handleLogoClick(outlet);
                  }}
                  aria-label={`Open ${item.name} coverage`}
                  className="pressLogoWrap cursor-pointer"
                >
                  <img
                    src={item.src}
                    alt={`${item.name} logo`}
                    width={72}
                    height={72}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-12 w-12 md:h-16 md:w-16 object-contain"
                    onError={(e) => {
                      // Try fallback to default logo
                      e.currentTarget.src = '/press/default.svg';
                      e.currentTarget.onerror = () => {
                        // Hide if even fallback fails
                        const button = e.currentTarget.parentElement as HTMLButtonElement;
                        if (button) {
                          button.style.display = 'none';
                        }
                      };
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