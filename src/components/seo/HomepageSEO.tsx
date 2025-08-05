import React from 'react';
import DynamicSEO from './DynamicSEO';

const HomepageSEO = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "EmviApp",
    "description": "The Beauty Industry's Missing Piece - Premium platform for beauty professionals",
    "url": "https://emvi.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://emvi.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "about": {
      "@type": "Organization",
      "name": "EmviApp",
      "description": "Premium beauty platform connecting professionals with opportunities",
      "url": "https://emvi.app",
      "sameAs": [
        "https://linkedin.com/company/emviapp",
        "https://instagram.com/emviapp",
        "https://tiktok.com/@emviapp",
        "https://youtube.com/@emviapp"
      ]
    },
    "mainEntity": {
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
  };

  return (
    <DynamicSEO
      title="EmviApp - The Beauty Industry's Missing Piece | Premium Beauty Platform"
      description="Discover premium beauty opportunities, connect with top salons, and grow your career. Join thousands of nail technicians, hair stylists, barbers, and beauty professionals."
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