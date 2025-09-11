import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOutletByKey, type Outlet } from '@/lib/press';
import outlets from '@/data/outlets.json';
import PressModal from './PressModal';
import '../../styles/marquee.css';

const PressMarquee: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState<string | null>(null);
  const triggerRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  // Build sources synchronously from static data with reordering
  const reorderSources = (outletData: Array<{key: string, name: string, domain: string, url: string, logo: string}>) => {
    const priorityFirst = outletData.filter(o => ['ap'].includes(o.key));
    const yahooGoogle = outletData.filter(o => ['yahoo', 'googlenews'].includes(o.key));
    const rest = outletData.filter(o => !['ap', 'yahoo', 'googlenews'].includes(o.key));
    
    return [...priorityFirst, ...rest, ...yahooGoogle];
  };

  const orderedOutlets = reorderSources(outlets);
  const sources = orderedOutlets.map(outlet => ({
    key: outlet.key,
    name: outlet.name,
    href: outlet.url,
    src: outlet.logo || `https://logo.clearbit.com/${outlet.domain}?size=256`
  }));
  
  // Duplicate the array once for seamless scroll before render
  const track = [...sources, ...sources];
  const itemCount = sources.length;

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

  const setTriggerRef = (key: string, element: HTMLAnchorElement | null) => {
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

          <div className="marquee">
            <div className="track" aria-label="As seen on logos">
              {track.map((item, index) => (
                <a
                  key={`${item.key}-${index < itemCount ? 'a' : 'b'}`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  ref={(el) => setTriggerRef(`${item.key}-${index}`, el)}
                  onClick={(e) => {
                    e.preventDefault();
                    const outlet = getOutletByKey(item.key);
                    if (outlet) handleLogoClick(outlet);
                  }}
                  className="cell"
                  data-name={item.name}
                  aria-label={`Open ${item.name} coverage`}
                >
                  <img
                    src={item.src}
                    alt={`${item.name} logo`}
                    width={72}
                    height={72}
                    loading={index < 8 ? "eager" : "lazy"}
                    fetchPriority={index < 8 ? "high" : "low"}
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="img"
                    onError={(e) => {
                      // Extract domain for fallback
                      const domain = item.key === 'ap' ? 'apnews.com' : 
                                   item.key === 'kron4' ? 'kron4.com' :
                                   item.key === 'bingnews' ? 'bing.com' :
                                   item.key === 'yahoo' ? 'yahoo.com' :
                                   item.key === 'googlenews' ? 'google.com' :
                                   outlets.find(o => o.key === item.key)?.domain || 'example.com';
                      
                      // Try Clearbit fallback
                      e.currentTarget.src = `https://logo.clearbit.com/${domain}?size=256`;
                      e.currentTarget.onerror = () => {
                        // Final fallback: hide element with proper null safety
                        const element = e.currentTarget;
                        const link = element?.parentElement;
                        if (link?.style) {
                          link.style.display = 'none';
                        }
                      };
                    }}
                  />
                </a>
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