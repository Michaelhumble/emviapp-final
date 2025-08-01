import React from 'react';
import DynamicSEO from './DynamicSEO';
import { Job } from '@/types/job';

interface SalonSEOProps {
  salon: Job;
  baseUrl?: string;
}

const SalonSEO: React.FC<SalonSEOProps> = ({ salon, baseUrl = 'https://emvi.app' }) => {
  const salonUrl = `${baseUrl}/salons/${salon.id}`;
  
  // Create SEO-friendly title
  const title = `${salon.title} - ${salon.location || 'Beauty Salon'} | EmviApp`;
  
  // Generate description from salon details
  const description = salon.description 
    ? `${salon.description.substring(0, 150)}...`
    : `${salon.title} - Professional beauty salon in ${salon.location || 'your area'}. Book services and discover talented beauty professionals on EmviApp.`;
  
  // Get primary image
  const image = salon.image_urls?.[0] || salon.image_url || `${baseUrl}/og-salon-default.jpg`;
  
  // Generate structured data for LocalBusiness
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": salonUrl,
    "name": salon.title,
    "description": salon.description || description,
    "image": image,
    "url": salonUrl,
    "address": salon.location ? {
      "@type": "PostalAddress",
      "addressLocality": salon.location
    } : undefined,
    "priceRange": salon.compensation_details || "$$",
    "openingHours": "Mo-Su 09:00-21:00", // Default hours
    "servesCuisine": undefined, // Not applicable
    "acceptsReservations": true,
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Beauty Services",
        "value": true
      }
    ],
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": salonUrl,
        "inLanguage": "en-US",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "result": {
        "@type": "Reservation",
        "name": "Beauty Service Reservation"
      }
    }
  };

  return (
    <DynamicSEO
      title={title}
      description={description}
      image={image}
      url={salonUrl}
      type="business"
      tags={['salon', 'beauty', 'spa', salon.location, salon.category].filter(Boolean)}
      structuredData={structuredData}
      canonicalUrl={salonUrl}
    />
  );
};

export default SalonSEO;