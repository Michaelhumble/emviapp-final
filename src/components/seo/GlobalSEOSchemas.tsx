import React from 'react';
import { Helmet } from 'react-helmet-async';

const GlobalSEOSchemas = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EmviApp",
    "url": "https://emvi.app",
    "logo": "https://emvi.app/logo.png",
    "sameAs": [
      "https://apnews.com/press-release/ein-presswire-newsmatics/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry-d88a14938f130a67055f7826439cfb7c",
      "https://www.einpresswire.com/article/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry"
    ],
    "description": "AI-powered platform connecting salons, beauty professionals, and customers through intelligent technology",
    "founder": {
      "@type": "Person",
      "name": "Michael Humble"
    },
    "foundingDate": "2025",
    "industry": "Beauty and Personal Care Technology",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://emvi.app",
    "name": "EmviApp",
    "description": "Connect salons, artists & customers through AI-powered beauty technology",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://emvi.app/jobs?query={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(webSiteSchema)}
      </script>
    </Helmet>
  );
};

export default GlobalSEOSchemas;