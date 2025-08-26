import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getFeaturedOutlets } from '@/config/pressOutlets';
import Logo from './Logo';
import { Button } from '@/components/ui/button';

const PressBand: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const featuredOutlets = getFeaturedOutlets();

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 bg-muted/20" aria-label="Press coverage">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-sm font-medium text-muted-foreground mb-4">
            As Featured In
          </p>
          
          {/* Desktop: Show all logos in a grid */}
          <div className="hidden md:flex justify-center items-center gap-8 flex-wrap max-w-5xl mx-auto">
            {featuredOutlets.map((outlet, index) => (
              <motion.div
                key={outlet.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to="/press/emviapp-ai-powered-growth-engine">
                  <Logo
                    name={outlet.name}
                    logo={outlet.logo}
                    alt={`As featured on ${outlet.name}`}
                    className="w-32 h-16"
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile: Horizontal scroll with arrows */}
          <div className="md:hidden relative">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-0 z-10 bg-background/80 backdrop-blur-sm"
                onClick={scrollLeft}
                aria-label="Previous logos"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-2 scroll-smooth"
                style={{ scrollSnapType: 'x mandatory' }}
              >
                {featuredOutlets.map((outlet, index) => (
                  <motion.div
                    key={outlet.slug}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex-shrink-0"
                    style={{ scrollSnapAlign: 'start' }}
                  >
                    <Link to="/press/emviapp-ai-powered-growth-engine">
                      <Logo
                        name={outlet.name}
                        logo={outlet.logo}
                        alt={`As featured on ${outlet.name}`}
                        className="w-28 h-14"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 z-10 bg-background/80 backdrop-blur-sm"
                onClick={scrollRight}
                aria-label="Next logos"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Mobile dots indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: Math.ceil(featuredOutlets.length / 3) }).map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 bg-muted-foreground/30 rounded-full"
                />
              ))}
            </div>
          </div>

          {/* Secondary link to press release */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-6"
          >
            <a
              href="https://www.einpresswire.com/article/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry"
              target="_blank"
              rel="noopener nofollow"
              className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              onClick={() => {
                // Analytics tracking
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'press_release_click', {
                    event_category: 'engagement',
                    event_label: 'EIN Presswire',
                    link_location: 'press_band'
                  });
                }
              }}
            >
              Read our launch press release →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PressBand;