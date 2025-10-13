import React from 'react';
import DynamicSEO from './DynamicSEO';

const HomepageSEO = () => {
  // NOTE: Organization and WebSite schemas are now provided by GlobalSEOSchemas (site-wide)
  // to avoid JSON-LD duplication. Only page-specific schemas remain here.
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "EmviApp",
      "description": "AI-powered platform for beauty jobs, salons, and artists",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "url": "https://www.emvi.app",
      "author": {
        "@type": "Organization",
        "name": "EmviApp"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Beauty Industry Opportunities",
      "description": "Premium job listings and opportunities for beauty professionals",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Nail Technician Jobs",
          "description": "Premium nail technician opportunities nationwide"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Hair Stylist Positions",
          "description": "Professional hair stylist careers in top salons"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Barber Opportunities",
          "description": "High-paying barber positions across America"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Makeup Artist Jobs",
          "description": "Exclusive makeup artist opportunities with studios and clients"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Esthetician Careers",
          "description": "Skincare professional positions in wellness centers"
        }
      ]
    }
  ];

  return (
    <>
      <DynamicSEO
        title="Find Nail Artists & Beauty Jobs with AI | EmviApp"
        description="EmviApp is the premier AI-powered platform connecting beauty professionals with jobs, salons, and artists. Discover nail technician careers, salon opportunities, and top beauty talent in your city."
        canonicalUrl="https://www.emvi.app/"
        tags={[
          "beauty jobs",
          "nail technician",
          "hair stylist",
          "barber jobs",
          "makeup artist",
          "esthetician",
          "beauty careers",
          "salon opportunities",
          "premium beauty platform"
        ]}
        structuredData={structuredData}
        type="website"
      />
    </>
  );
};

export default HomepageSEO;