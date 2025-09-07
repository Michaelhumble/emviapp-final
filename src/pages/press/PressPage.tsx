import React from 'react';
import { ExternalLink, Mail, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getAllOutlets } from '@/config/pressOutlets';
import Logo from '@/components/trust/Logo';
import DynamicSEO from '@/components/seo/DynamicSEO';

const PressPage: React.FC = () => {
  const allOutlets = getAllOutlets();

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Press & Media - EmviApp",
      "description": "EmviApp press coverage and media resources for the first AI-powered growth engine for the global beauty industry",
      "url": "https://emvi.app/press/emviapp-ai-powered-growth-engine",
      "mainEntity": {
        "@type": "Organization",
        "name": "EmviApp",
        "url": "https://emvi.app"
      },
      "hasPart": allOutlets.map(outlet => ({
        "@type": "CreativeWork",
        "name": `${outlet.name} coverage`,
        "url": outlet.url,
        "publisher": {
          "@type": "Organization",
          "name": outlet.name
        }
      }))
    },
    {
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
      "description": "EmviApp introduces an AI growth engine that helps salons and beauty pros get discovered, book clients, and grow revenue.",
      "isBasedOn": "https://www.einpresswire.com/article/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry"
    }
  ];

  return (
    <>
      <DynamicSEO
        title="Press & Media Coverage | EmviApp"
        description="EmviApp press coverage and media resources for the first AI-powered growth engine for the global beauty industry. Featured in AP News and major news outlets."
        canonicalUrl="https://emvi.app/press/emviapp-ai-powered-growth-engine"
        tags={['press', 'media', 'news', 'beauty industry', 'AI', 'EmviApp', 'coverage']}
        structuredData={structuredData}
        type="article"
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        {/* Hero Section */}
        <section className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Press & Media
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                EmviApp is revolutionizing the beauty industry with AI-powered technology that connects 
                salons, beauty professionals, and customers like never before. 
              </p>
              
              <p className="text-lg text-muted-foreground mb-8">
                We're building the missing piece that helps beauty businesses grow and thrive 
                in the digital age through intelligent matching and growth tools.
              </p>

              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <a
                  href="https://www.einpresswire.com/article/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry"
                  target="_blank"
                  rel="noopener nofollow"
                  onClick={() => {
                    // Analytics tracking
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'press_release_click', {
                        event_category: 'engagement',
                        event_label: 'EIN Presswire Main',
                        link_location: 'press_page_hero'
                      });
                    }
                  }}
                >
                  Read the Launch Release <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Coverage Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Media Coverage
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered growth engine for the beauty industry has been featured 
                across major news outlets and financial publications.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {allOutlets.map((outlet, index) => (
                <motion.div
                  key={outlet.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-muted/40">
                    <CardContent className="p-6">
                      <div className="flex flex-col h-full">
                        <div className="mb-4">
                          <Logo
                            name={outlet.name}
                            logo={outlet.logo}
                            alt={`${outlet.name} logo`}
                            className="w-full max-w-32 mx-auto"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <h3 className="font-semibold text-foreground mb-2">
                            {outlet.name}
                            {outlet.city && (
                              <span className="text-sm text-muted-foreground font-normal ml-2">
                                ({outlet.city})
                              </span>
                            )}
                          </h3>
                          
                          {outlet.description && (
                            <p className="text-sm text-muted-foreground mb-4">
                              {outlet.description}
                            </p>
                          )}
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="mt-4"
                        >
                          <a
                            href={outlet.url}
                            target="_blank"
                            rel="noopener nofollow"
                            onClick={() => {
                              // Analytics tracking
                              if (typeof window !== 'undefined' && (window as any).gtag) {
                                (window as any).gtag('event', 'press_coverage_click', {
                                  event_category: 'engagement',
                                  event_label: outlet.name,
                                  outlet_name: outlet.name
                                });
                              }
                            }}
                          >
                            Read Coverage <ExternalLink className="ml-2 h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Contact Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <Card>
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      For Media Inquiries
                    </h2>
                    <p className="text-muted-foreground">
                      Contact our media team for interviews, press materials, and additional information.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                        <User className="mr-2 h-5 w-5" />
                        Founder Quote
                      </h3>
                      <blockquote className="text-muted-foreground italic leading-relaxed">
                        "We're not just building another app—we're creating the missing infrastructure 
                        that the beauty industry has needed for decades. Our AI-powered platform connects 
                        talent with opportunity in ways that have never been possible before."
                      </blockquote>
                      <p className="text-sm text-muted-foreground mt-4 font-medium">
                        — Michael Humble, Founder & CEO, EmviApp
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                        <Mail className="mr-2 h-5 w-5" />
                        Media Contact
                      </h3>
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          asChild
                          className="w-full justify-start"
                        >
                          <a href="mailto:press@emvi.app">
                            <Mail className="mr-2 h-4 w-4" />
                            press@emvi.app
                          </a>
                        </Button>
                        
                        <p className="text-sm text-muted-foreground">
                          Available for interviews, quotes, and high-resolution media assets.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PressPage;