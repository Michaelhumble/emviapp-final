import React, { useState } from 'react';
import { PRESS_OUTLETS } from '@/data/pressLogos';
import Layout from '@/components/layout/Layout';
import { ExternalLink, Calendar, Tag } from 'lucide-react';
import PressLogo from '@/components/PressLogo';
import { Helmet } from 'react-helmet-async';
import { organizationJsonLd, articleJsonLd, breadcrumbJsonLd, type ArticleData, type BreadcrumbData } from "@/lib/seo/jsonld";

const PressPage = () => {
  const [filter, setFilter] = useState<'all' | 'verified'>('all');
  
  const filteredCoverage = filter === 'verified' 
    ? PRESS_OUTLETS.filter(item => item.live)
    : PRESS_OUTLETS;

  const verifiedCount = PRESS_OUTLETS.filter(item => item.live).length;
  const totalCount = PRESS_OUTLETS.length;

  // Generate server-side JSON-LD
  const orgSchema = organizationJsonLd();
  
  const breadcrumbData: BreadcrumbData[] = [
    { name: 'Home', url: 'https://www.emvi.app' },
    { name: 'Press & Media', url: 'https://www.emvi.app/press' }
  ];
  const breadcrumbSchema = breadcrumbJsonLd(breadcrumbData);

  const pressCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "EmviApp Press Coverage",
    "description": "Media coverage and press articles about EmviApp's launch",
    "numberOfItems": filteredCoverage.length,
    "itemListElement": filteredCoverage.slice(0, 20).map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "NewsArticle",
        "headline": "EmviApp Launches the First AI-Powered Growth Engine for the Global Beauty Industry",
        "publisher": {
          "@type": "Organization",
          "name": item.name
        },
        "url": item.href,
        "about": {
          "@type": "Organization",
          "name": "EmviApp"
        }
      }
    }))
  };

  return (
    <Layout>
      <Helmet>
        <title>Press & Media Coverage | EmviApp</title>
        <meta name="description" content="EmviApp's launch has been covered by major news outlets including Associated Press, NBC, CBS, and FOX networks. Read the full coverage of our AI-powered beauty platform." />
        <link rel="canonical" href="https://www.emvi.app/press" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pressCollectionSchema) }}
        />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Press & Coverage
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              EmviApp's launch has been covered by major news outlets and media organizations. 
              Read the full coverage of our AI-powered platform for the beauty industry.
            </p>
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-sm border">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'all' 
                    ? 'bg-violet-600 text-white' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                All ({totalCount})
              </button>
              <button
                onClick={() => setFilter('verified')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'verified' 
                    ? 'bg-violet-600 text-white' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Verified ({verifiedCount})
              </button>
            </div>
          </div>

          {/* Coverage Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {filteredCoverage.map((item, index) => (
              <div 
                key={`${item.name}-${index}`}
                className={`bg-white rounded-xl shadow-sm border p-6 transition-all hover:shadow-md ${
                  !item.live ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Logo */}
                  <div className="flex-shrink-0">
                    <PressLogo 
                      publisherName={item.name}
                      href={item.live ? item.href : undefined}
                      isClickable={item.live}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {item.name}
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-3">
                      EmviApp Launches the First AI-Powered Growth Engine for the Global Beauty Industry
                    </p>

                    <div className="flex items-center justify-between">
                      {item.live ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener nofollow"
                          className="inline-flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
                          aria-label={`Read ${item.name} article`}
                        >
                          Read article
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-400 cursor-not-allowed">
                          Read article
                          <ExternalLink className="w-4 h-4" />
                        </span>
                      )}
                    </div>

                    {!item.live && (
                      <div className="mt-2 text-xs text-red-600">
                        Article currently unavailable
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">
              About Syndication Networks
            </h3>
            <p className="text-sm text-blue-800">
              Many of these articles appear through syndication networks like EIN Presswire, 
              which distribute press releases to multiple local news stations and media outlets. 
              This is a standard practice in digital media distribution and ensures wide coverage 
              across various markets and demographics.
            </p>
          </div>

          {/* SEO Content */}
          <div className="mt-8 prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-900">Media Coverage Overview</h2>
            <p className="text-gray-600">
              EmviApp's revolutionary AI-powered platform for the beauty industry has garnered 
              significant media attention across major news networks. Our launch announcement 
              has been featured by Associated Press, regional NBC affiliates, CBS stations, 
              FOX networks, and other prominent media outlets.
            </p>
            <p className="text-gray-600">
              The coverage highlights EmviApp's innovative approach to connecting beauty 
              professionals with opportunities through artificial intelligence, representing 
              a major advancement in the beauty and wellness technology sector.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PressPage;