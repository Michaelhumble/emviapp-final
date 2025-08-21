import React from 'react';
import DynamicSEO from './DynamicSEO';

const HomepageSEO = () => {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "EmviApp",
      "description": "Premium beauty platform connecting professionals with opportunities",
      "url": "https://www.emvi.app",
      "logo": "https://www.emvi.app/logo.png",
      "sameAs": [
        "https://linkedin.com/company/emviapp",
        "https://instagram.com/emviapp",
        "https://tiktok.com/@emviapp",
        "https://youtube.com/@emviapp"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "url": "https://www.emvi.app/contact"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "EmviApp",
      "description": "The Beauty Industry's Missing Piece - Premium platform for beauty professionals",
      "url": "https://www.emvi.app",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.emvi.app/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
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
    <DynamicSEO
      title="EmviApp - The Beauty Industry's Missing Piece | Premium Beauty Platform"
      description="EmviApp is the first AI-powered platform for beauty jobs, salons, and artists. Find nail artists, salons for sale, and beauty careers in your city."
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
  );
};

export default HomepageSEO;