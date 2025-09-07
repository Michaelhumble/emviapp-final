import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { OUTLETS, getTierDisplayName } from '@/lib/press';
import PressPageHero from '@/components/press/PressPageHero';
import PressFilters from '@/components/press/PressFilters';
import PressCard from '@/components/press/PressCard';
import MediaKit from '@/components/press/MediaKit';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { organizationJsonLd, marketplaceLocalBusinessJsonLd } from '@/lib/seo/jsonld';

const PressPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get outlet filter from URL params
  const outletFilter = searchParams.get('outlet');

  // Filter mapping
  const getFilterForTier = (tier: string): string => {
    const filterMap: Record<string, string> = {
      'all': 'all',
      'national': 'national',
      'finance': 'finance',
      'local': 'local_tv',
      'business': 'other'
    };
    return Object.keys(filterMap).find(key => filterMap[key] === tier) || 'business';
  };

  // Filter and search logic
  const filteredOutlets = useMemo(() => {
    let filtered = OUTLETS;

    // Apply outlet-specific filter from URL
    if (outletFilter) {
      filtered = filtered.filter(outlet => outlet.key === outletFilter);
    }

    // Apply tier filter
    if (activeFilter !== 'all') {
      const tierMap: Record<string, string> = {
        'national': 'national',
        'finance': 'finance', 
        'local': 'local_tv',
        'search': 'search',
        'business': 'other'
      };
      const targetTier = tierMap[activeFilter];
      if (targetTier) {
        filtered = filtered.filter(outlet => outlet.tier === targetTier);
      }
    }

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(outlet => 
        outlet.name.toLowerCase().includes(search) ||
        outlet.headline.toLowerCase().includes(search) ||
        (outlet.city && outlet.city.toLowerCase().includes(search))
      );
    }

    return filtered;
  }, [activeFilter, searchTerm, outletFilter]);

  // Add Organization and LocalBusiness schemas
  const organizationSchema = organizationJsonLd();
  const localBusinessSchema = marketplaceLocalBusinessJsonLd();

  const structuredData = [
    organizationSchema,
    localBusinessSchema,
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "EmviApp Press Coverage",
      "description": "Media coverage of EmviApp's AI-powered beauty platform launch",
      "itemListElement": filteredOutlets.map((outlet, index) => ({
        "@type": "NewsArticle",
        "position": index + 1,
        "headline": outlet.headline,
        "datePublished": outlet.dateISO,
        "url": outlet.url,
        "image": outlet.logo || `https://logo.clearbit.com/${outlet.domain}?size=256`,
        "publisher": {
          "@type": "Organization",
          "name": outlet.name,
          "logo": outlet.logo || `https://logo.clearbit.com/${outlet.domain}?size=256`
        },
        "mainEntityOfPage": outlet.url
      }))
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
      }
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
    <>
      <Helmet>
        <title>Press & Media - EmviApp AI Beauty Platform Coverage</title>
        <meta name="description" content="Read media coverage about EmviApp's launch as the first AI-powered growth engine for beauty professionals, salons, and artists. Featured in AP News, Yahoo News, major TV networks and financial outlets." />
        <meta name="keywords" content="EmviApp press, beauty industry AI, press coverage, media mentions, AP News, Yahoo News, beauty technology news" />
        
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
        <link rel="canonical" href="https://www.emvi.app/press" />
        
        {/* JSON-LD Structured Data */}
        {structuredData.map((schema, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>

      <PressPageHero />

      <div className="container mx-auto px-4 py-12 max-w-6xl space-y-16">
        {/* Featured Strip */}
        <div className="mb-8 p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Looking for more insights?
            </h2>
            <p className="text-gray-600 mb-4">
              Discover actionable strategies and industry expertise in our comprehensive guides
            </p>
            <Link 
              to="/blog/how-to-find-the-best-beauty-professionals"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Read our How to Find the Best Beauty Professionals Guide
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        {/* Filters and Search */}
        <PressFilters
          onFilterChange={setActiveFilter}
          onSearchChange={setSearchTerm}
          activeFilter={activeFilter}
        />

        {/* Press Coverage Grid */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            {outletFilter ? `Coverage from ${OUTLETS.find(o => o.key === outletFilter)?.name}` : 'Media Coverage'}
          </h2>
          
          {filteredOutlets.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredOutlets.map((outlet) => (
                <PressCard
                  key={outlet.key}
                  outlet={outlet}
                  market={getTierDisplayName(outlet.tier)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No coverage found matching your search criteria.</p>
            </div>
          )}
        </div>

        {/* Media Kit */}
        <MediaKit />

        {/* Our Mission Quote Section */}
        <div className="bg-card border rounded-lg p-8 text-center">
          <div className="bg-card border-l-4 border-primary p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold mb-4">Our Mission</h3>
            <p className="text-muted-foreground">
              "We're thrilled to see EmviApp's mission to revolutionize the beauty industry resonate with media outlets nationwide. This coverage represents more than press attention—it validates our commitment to empowering beauty professionals and businesses with cutting-edge AI technology."
            </p>
            <p className="text-sm text-muted-foreground mt-3">— EmviApp Founder</p>
          </div>
        </div>

        {/* Legal disclaimer */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            All trademarks are property of their respective owners.
          </p>
        </div>
      </div>
    </>
  );
};

export default PressPage;