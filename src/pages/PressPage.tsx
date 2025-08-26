import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { ExternalLink, Mail } from 'lucide-react';
import PressGrid from '@/components/press/PressGrid';
import Layout from '@/components/layout/Layout';

const PressPage: React.FC = () => {
  const handlePressReleaseClick = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'press_release_click', {
        event_category: 'engagement',
        event_label: 'EIN Presswire',
        link_location: 'press_page_header'
      });
    }
  };

  const handleMediaContactClick = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'media_contact_click', {
        event_category: 'engagement',
        event_label: 'Press Contact',
        contact_type: 'email'
      });
    }
  };

  const structuredData = [
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
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Press & Media - EmviApp",
      "description": "Media coverage and press releases about EmviApp's AI-powered beauty platform",
      "url": "https://emvi.app/press",
      "isPartOf": {
        "@type": "WebSite",
        "name": "EmviApp",
        "url": "https://emvi.app"
      },
      "hasPart": [
        {
          "@type": "CreativeWork",
          "name": "EmviApp AI Platform Launch",
          "url": "https://www.einpresswire.com/article/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry",
          "publisher": {
            "@type": "Organization",
            "name": "EIN Presswire"
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://emvi.app/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Press & Media",
          "item": "https://emvi.app/press"
        }
      ]
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Press & Media - EmviApp AI Beauty Platform Coverage</title>
        <meta name="description" content="Read media coverage about EmviApp's launch as the first AI-powered growth engine for beauty professionals, salons, and artists. Featured in AP News, Benzinga, and major TV networks." />
        <meta name="keywords" content="EmviApp press, beauty industry AI, press coverage, media mentions, AP News, Benzinga, beauty technology news" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Press & Media - EmviApp AI Beauty Platform Coverage" />
        <meta property="og:description" content="Read media coverage about EmviApp's launch as the first AI-powered growth engine for beauty professionals, salons, and artists." />
        <meta property="og:url" content="https://emvi.app/press" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://emvi.app/og/press-emviapp.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Press & Media - EmviApp AI Beauty Platform Coverage" />
        <meta name="twitter:description" content="Read media coverage about EmviApp's launch as the first AI-powered growth engine for beauty professionals, salons, and artists." />
        <meta name="twitter:image" content="https://emvi.app/og/press-emviapp.jpg" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://emvi.app/press" />
        
        {/* JSON-LD Structured Data */}
        {structuredData.map((schema, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Press & Media
          </h1>
          
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-lg text-muted-foreground">
              EmviApp launched as the first AI-powered growth engine for the global beauty industry, 
              connecting salons, beauty professionals, and customers through intelligent technology.
            </p>
            
            <p className="text-sm text-muted-foreground">
              Published August 26, 2025
            </p>
          </div>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://www.einpresswire.com/article/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry"
              target="_blank"
              rel="noopener nofollow"
              onClick={handlePressReleaseClick}
            >
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <ExternalLink className="w-4 h-4 mr-2" />
                Read the launch release
              </Button>
            </a>
            
            <Button variant="outline" asChild>
              <a href="/jobs">Join EmviApp (Free)</a>
            </Button>
          </div>
        </div>

        {/* Key Points */}
        <div className="mb-12">
          <div className="bg-card border rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Launch Highlights</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="font-semibold text-foreground mb-2">AI-Powered Matching</h3>
                <p className="text-sm text-muted-foreground">
                  Intelligent algorithms connect beauty professionals with ideal opportunities
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Growth Engine</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive platform for discovery, booking, and revenue growth
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Global Reach</h3>
                <p className="text-sm text-muted-foreground">
                  Serving beauty professionals and salons worldwide
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Press Coverage Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-8">Media Coverage</h2>
          <PressGrid />
        </div>

        {/* Media Contact & Founder Quote */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Founder Quote */}
          <div className="bg-card border rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">From Our Founder</h3>
            <blockquote className="text-muted-foreground italic mb-4">
              "The beauty industry has been fragmented for too long. EmviApp bridges the gap between 
              talent and opportunity, creating a thriving ecosystem where professionals can discover 
              their potential and businesses can find the perfect match."
            </blockquote>
            <p className="text-sm font-medium text-foreground">
              — Michael Humble, Founder & CEO, EmviApp
            </p>
          </div>

          {/* Media Contact */}
          <div className="bg-card border rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">For Media Inquiries</h3>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                For interviews, press materials, or additional information about EmviApp, 
                please contact our media team.
              </p>
              
              <a
                href="mailto:press@emvi.app"
                onClick={handleMediaContactClick}
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
              >
                <Mail className="w-4 h-4 mr-2" />
                press@emvi.app
              </a>
              
              <div className="text-sm text-muted-foreground">
                <p>Media kit and high-resolution images available upon request.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PressPage;