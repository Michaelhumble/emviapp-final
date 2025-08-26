import React from 'react';
import { motion } from 'framer-motion';

const PressTrustBar = () => {
  const pressOutlets = [
    {
      name: 'AP News',
      logo: 'AP',
      url: 'https://apnews.com/press-release/ein-presswire-newsmatics/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry-d88a14938f130a67055f7826439cfb7c',
      alt: 'Associated Press News coverage of EmviApp launch'
    },
    {
      name: 'KRON4',
      logo: 'KRON4',
      url: 'https://www.kron4.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
      alt: 'KRON4 Bay Area news coverage'
    },
    {
      name: 'FOX 40',
      logo: 'FOX40',
      url: 'https://fox40.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
      alt: 'FOX 40 Sacramento coverage'
    },
    {
      name: 'WFLA NBC 8',
      logo: 'NBC8',
      url: 'https://www.wfla.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
      alt: 'WFLA NBC 8 Tampa Bay coverage'
    },
    {
      name: 'WGN 9',
      logo: 'WGN9',
      url: 'https://wgntv.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
      alt: 'WGN 9 Chicago news coverage'
    },
    {
      name: 'KXAN NBC',
      logo: 'KXAN',
      url: 'https://www.kxan.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
      alt: 'KXAN NBC Austin coverage'
    },
    {
      name: 'FOX 59',
      logo: 'FOX59',
      url: 'https://fox59.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
      alt: 'FOX 59 Indianapolis coverage'
    },
    {
      name: 'Benzinga',
      logo: 'BENZINGA',
      url: 'https://www.benzinga.com/content/47334199/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
      alt: 'Benzinga financial news coverage'
    }
  ];

  const handleLogoClick = (outlet: typeof pressOutlets[0]) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'press_logo_click', {
        event_category: 'engagement',
        event_label: outlet.name,
        outlet_name: outlet.name
      });
    }
  };

  return (
    <section className="py-8 bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50" aria-label="As seen in trusted news outlets">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm text-muted-foreground font-inter font-medium tracking-wide uppercase">
            As Featured In
          </p>
        </motion.div>

        {/* Mobile: Horizontal scrollable */}
        <div className="sm:hidden">
          <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {pressOutlets.map((outlet, index) => (
              <motion.a
                key={index}
                href={outlet.url}
                target="_blank"
                rel="noopener nofollow"
                className="flex-shrink-0 group"
                onClick={() => handleLogoClick(outlet)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="w-16 h-12 bg-white/70 backdrop-blur-sm rounded-lg border border-gray-200/60 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:bg-white transition-all duration-300">
                  <span className="text-xs font-bold text-gray-600 group-hover:text-primary transition-colors duration-300">
                    {outlet.logo}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout with auto-scroll animation */}
        <div className="hidden sm:block">
          <div className="relative overflow-hidden">
            <motion.div 
              className="flex items-center justify-center space-x-8 md:space-x-12"
              animate={{ x: [-10, 10, -10] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              {[...pressOutlets, ...pressOutlets.slice(0, 4)].map((outlet, index) => (
                <motion.a
                  key={`${outlet.name}-${index}`}
                  href={outlet.url}
                  target="_blank"
                  rel="noopener nofollow"
                  className="flex-shrink-0 group"
                  onClick={() => handleLogoClick(outlet)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (index % pressOutlets.length) * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-24 h-16 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:bg-white transition-all duration-300">
                    <span className="text-sm font-bold text-gray-500 group-hover:text-primary transition-colors duration-300">
                      {outlet.logo}
                    </span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Press page link */}
        <motion.div 
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a 
            href="/press/emviapp-ai-powered-growth-engine"
            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-300 underline decoration-1 underline-offset-2"
          >
            Read the full press coverage →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PressTrustBar;