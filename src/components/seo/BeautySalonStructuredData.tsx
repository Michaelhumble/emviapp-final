import React from 'react';
import { Helmet } from 'react-helmet-async';

interface BeautySalonStructuredDataProps {
  salon: {
    id: string;
    name?: string;
    title?: string;
    salon_name?: string;
    description?: string;
    location?: string;
    city?: string;
    state?: string;
    phone?: string;
    images?: string[];
    image_url?: string;
    category?: string;
    created_at?: string;
    services?: string[];
    rating?: number;
    reviewCount?: number;
  };
  baseUrl?: string;
}

const BeautySalonStructuredData: React.FC<BeautySalonStructuredDataProps> = ({ 
  salon, 
  baseUrl = 'https://www.emvi.app' 
}) => {
  const salonName = salon.name || salon.title || salon.salon_name || 'Beauty Salon';
  const location = salon.location || [salon.city, salon.state].filter(Boolean).join(', ') || 'Various Locations';

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${baseUrl}/salons/${salon.id}`,
    "name": salonName,
    "description": salon.description || `Premium beauty salon offering professional services in ${location}`,
    "url": `${baseUrl}/salons/${salon.id}`,
    "telephone": salon.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": salon.city || location.split(',')[0]?.trim() || location,
      "addressRegion": salon.state || location.split(',')[1]?.trim() || "US",
      "addressCountry": "US"
    },
    "image": salon.images?.[0] || salon.image_url || `${baseUrl}/og-default.jpg`,
    "priceRange": "$$",
    "serviceType": "Beauty Services",
    "aggregateRating": salon.rating ? {
      "@type": "AggregateRating",
      "ratingValue": salon.rating,
      "reviewCount": salon.reviewCount || 1,
      "bestRating": "5",
      "worstRating": "1"
    } : undefined,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Beauty Services",
      "itemListElement": (salon.services || [
        "Nail Services",
        "Hair Services", 
        "Skincare Services",
        "Beauty Treatments"
      ]).map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service,
          "serviceType": "Beauty",
          "category": salon.category || "Beauty Services"
        }
      }))
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Professional Beauty Services",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification", 
        "name": "Licensed Professionals",
        "value": true
      }
    ],
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/salons/${salon.id}`,
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
    },
    "sameAs": [
      baseUrl
    ],
    "openingHours": "Mo-Su 09:00-21:00", // Default hours
    "acceptsReservations": true,
    "paymentAccepted": ["Cash", "Credit Card", "Debit Card"],
    "currenciesAccepted": "USD"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
};

export default BeautySalonStructuredData;