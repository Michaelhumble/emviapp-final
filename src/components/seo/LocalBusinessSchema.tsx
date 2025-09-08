import React from 'react';
import { Helmet } from 'react-helmet-async';
import { parseJobLocation } from '@/utils/seo/jsonld';

interface LocalBusinessSchemaProps {
  salon: {
    id: string;
    title: string;
    description?: string;
    location?: string;
    phone?: string;
    website?: string;
    services?: string[];
    rating?: number;
    reviewCount?: number;
    priceRange?: string;
    hours?: {
      [key: string]: string;
    };
  };
}

const LocalBusinessSchema: React.FC<LocalBusinessSchemaProps> = ({ salon }) => {
  const locationInfo = parseJobLocation(salon.location);
  
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": salon.title,
    "description": salon.description || `Professional beauty salon offering ${salon.services?.join(', ') || 'various beauty services'} in ${salon.location || 'your area'}.`,
    "url": `https://www.emvi.app/salons/${salon.id}`,
    "address": {
      "@type": "PostalAddress",
      ...locationInfo
    },
    ...(salon.phone && { "telephone": salon.phone }),
    ...(salon.website && { "url": salon.website }),
    "priceRange": salon.priceRange || "$$",
    "servedCuisine": "Beauty Services",
    ...(salon.services && {
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Beauty Services",
        "itemListElement": salon.services.map((service, index) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service
          }
        }))
      }
    }),
    ...(salon.rating && salon.reviewCount && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": salon.rating,
        "reviewCount": salon.reviewCount,
        "bestRating": 5,
        "worstRating": 1
      }
    }),
    ...(salon.hours && {
      "openingHoursSpecification": Object.entries(salon.hours).map(([day, hours]) => ({
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": day,
        "opens": hours.split('-')[0]?.trim(),
        "closes": hours.split('-')[1]?.trim()
      }))
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(businessSchema)}
      </script>
    </Helmet>
  );
};

export default LocalBusinessSchema;