import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, Mail, Calendar } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const EmviAppPressPage = () => {
  const pressOutlets = [
    {
      name: 'AP News',
      logo: 'AP',
      url: 'https://apnews.com/press-release/ein-presswire-newsmatics/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry-d88a14938f130a67055f7826439cfb7c',
      description: 'Associated Press'
    },
    {
      name: 'KRON4',
      logo: 'KRON4',
      url: 'https://www.kron4.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
      description: 'San Francisco Bay Area'
    },
    {
      name: 'FOX 40',
      logo: 'FOX40',
      url: 'https://fox40.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
      description: 'Sacramento'
    },
    {
      name: 'WFLA NBC 8',
      logo: 'NBC8',
      url: 'https://www.wfla.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
      description: 'Tampa Bay'
    },
    {
      name: 'WOOD TV NBC 8',
      logo: 'WOOD8',
      url: 'https://www.woodtv.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
      description: 'Grand Rapids'
    },
    {
      name: 'KRQE CBS 13',
      logo: 'CBS13',
      url: 'https://www.krqe.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
      description: 'Albuquerque'
    },
    {
      name: 'KXAN NBC',
      logo: 'KXAN',
      url: 'https://www.kxan.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
      description: 'Austin'
    },
    {
      name: 'WGN 9',
      logo: 'WGN9',
      url: 'https://wgntv.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
      description: 'Chicago'
    },
    {
      name: 'FOX 59',
      logo: 'FOX59',
      url: 'https://fox59.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
      description: 'Indianapolis'
    },
    {
      name: 'KGET NBC 17',
      logo: 'KGET17',
      url: 'https://www.kget.com/business/press-releases/ein-presswire/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
      description: 'Bakersfield'
    },
    {
      name: 'Benzinga',
      logo: 'BENZINGA',
      url: 'https://www.benzinga.com/content/47334199/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry',
      description: 'Financial News'
    }
  ];

  const handleCTAClick = (ctaType: string) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'press_cta_click', {
        event_category: 'conversion',
        event_label: ctaType,
        cta_type: ctaType
      });
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>EmviApp Launches First AI-Powered Growth Engine for Beauty Industry | Press Coverage</title>
        <meta name="description" content="EmviApp introduces an AI growth engine that helps salons and beauty pros get discovered, book clients, and grow revenue. Featured in AP News, NBC, FOX, and more." />
        <link rel="canonical" href="https://www.einpresswire.com/article/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry" />
        
        {/* Open Graph */}
        <meta property="og:title" content="EmviApp Launches First AI-Powered Growth Engine for Beauty Industry" />
        <meta property="og:description" content="Revolutionary AI platform helps salons and beauty professionals get discovered, book clients, and grow revenue." />
        <meta property="og:image" content="https://emvi.app/og/press-emviapp.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://emvi.app/press/emviapp-ai-powered-growth-engine" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EmviApp Launches First AI-Powered Growth Engine for Beauty Industry" />
        <meta name="twitter:description" content="Revolutionary AI platform helps salons and beauty professionals get discovered, book clients, and grow revenue." />
        <meta name="twitter:image" content="https://emvi.app/og/press-emviapp.jpg" />
        
        {/* NewsArticle JSON-LD */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "EmviApp launches the first AI-powered growth engine for the global beauty industry",
          "datePublished": "2025-08-26",
          "dateModified": "2025-08-26",
          "author": {
            "@type": "Organization",
            "name": "EmviApp"
          },
          "publisher": {
            "@type": "Organization",
            "name": "EmviApp",
            "logo": {
              "@type": "ImageObject",
              "url": "https://emvi.app/logo.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://www.einpresswire.com/article/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry"
          },
          "image": ["https://emvi.app/og/press-emviapp.jpg"],
          "description": "EmviApp introduces an AI growth engine that helps salons and beauty pros get discovered, book clients, and grow revenue."
        })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/30 to-white">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground font-medium">August 26, 2025</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent leading-tight">
                EmviApp Launches the First AI-Powered Growth Engine for the Global Beauty Industry
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                Revolutionary platform connects salons, beauty professionals, and customers through intelligent AI technology
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => handleCTAClick('join_emviapp')}
                  className="font-medium px-8"
                >
                  Join EmviApp (Free) <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => handleCTAClick('read_press_release')}
                  className="font-medium px-8"
                  asChild
                >
                  <a 
                    href="https://www.einpresswire.com/article/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry" 
                    target="_blank" 
                    rel="noopener"
                  >
                    Read Press Release <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Summary Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto max-w-4xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Key Highlights</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">What We Launched</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      AI-powered matching system for beauty professionals
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      Comprehensive salon and artist discovery platform
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      Intelligent client booking and growth tools
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Who It Helps</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      Salons seeking qualified beauty professionals
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      Artists looking for career opportunities
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      Customers finding their perfect beauty match
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Press Coverage Grid */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto max-w-6xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-12 text-center">Featured In Major News Outlets</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pressOutlets.map((outlet, index) => (
                  <motion.a
                    key={index}
                    href={outlet.url}
                    target="_blank"
                    rel="noopener nofollow"
                    className="group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 group-hover:shadow-md transition-all duration-300 text-center h-full flex flex-col justify-center">
                      <div className="mb-3">
                        <span className="text-lg font-bold text-gray-600 group-hover:text-primary transition-colors duration-300">
                          {outlet.logo}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {outlet.description}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Founder Quote */}
        <section className="py-16 bg-white">
          <div className="container mx-auto max-w-4xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-8">From Our Founder</h2>
              
              <blockquote className="text-xl md:text-2xl italic text-muted-foreground mb-6 leading-relaxed">
                "The beauty industry has been fragmented for too long. EmviApp brings together the missing pieces—connecting talent with opportunity through AI-powered intelligence. We're not just building a platform; we're building the future of how beauty professionals grow their careers and businesses."
              </blockquote>
              
              <cite className="text-lg font-medium text-primary">
                — Michael Humble, Founder & CEO, EmviApp
              </cite>
            </motion.div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 bg-white">
          <div className="container mx-auto max-w-4xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Related Resources</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Industry Insights</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                      <a 
                        href="/blog/salon-staffing-crisis-2025" 
                        className="text-primary hover:text-primary/80 font-medium text-lg"
                      >
                        The Great Salon Staffing Crisis of 2025: Solutions That Work
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Discover proven strategies successful salon owners use to attract and retain top talent.
                      </p>
                    </div>
                    
                    <div className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                      <a 
                        href="/blog/why-weekly-pay-attracts-better-artists" 
                        className="text-primary hover:text-primary/80 font-medium text-lg"
                      >
                        Why Weekly Pay Attracts Better Artists (Data-Backed)
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        See real data showing why weekly pay structures attract 73% more qualified professionals.
                      </p>
                    </div>
                    
                    <div className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                      <a 
                        href="/blog/how-to-find-the-best-beauty-professionals" 
                        className="text-primary hover:text-primary/80 font-medium text-lg"
                      >
                        How to Find the Best Beauty Professionals Guide
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Complete guide to finding and hiring top beauty professionals for your salon.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Explore Local Talent</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                      <a 
                        href="/artists/nails/los-angeles-ca" 
                        className="text-primary hover:text-primary/80 font-medium text-lg"
                      >
                        Top Nail Artists in Los Angeles, CA
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Find skilled nail technicians and artists in the Los Angeles area.
                      </p>
                    </div>
                    
                    <div className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                      <a 
                        href="/artists/hair/houston-tx" 
                        className="text-primary hover:text-primary/80 font-medium text-lg"
                      >
                        Professional Hair Stylists in Houston, TX
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Connect with expert hair stylists and colorists in Houston.
                      </p>
                    </div>
                    
                    <div className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                      <a 
                        href="/artists/lashes/miami-fl" 
                        className="text-primary hover:text-primary/80 font-medium text-lg"
                      >
                        Certified Lash Artists in Miami, FL
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Discover talented lash extension specialists in Miami.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Media Contact */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto max-w-2xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-8">Media Contact</h2>
              
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary mr-2" />
                  <span className="text-lg font-medium">For Media Inquiries</span>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  For interviews, additional information, or media kit requests
                </p>
                
                <Button asChild>
                  <a href="mailto:press@emvi.app" className="font-medium">
                    Contact Press Team
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default EmviAppPressPage;