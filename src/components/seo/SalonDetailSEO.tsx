import React from 'react';
import ComprehensiveSEO from './ComprehensiveSEO';
import { SITE_BASE_URL } from '@/config/seo';

interface SalonDetailSEOProps {
  salon: {
    id: string;
    name?: string;
    title?: string;
    salon_name?: string;
    location?: string;
    city?: string;
    state?: string;
    description?: string;
    phone?: string;
    images?: string[];
    image_url?: string;
    category?: string;
    created_at?: string;
  };
}

const SalonDetailSEO: React.FC<SalonDetailSEOProps> = ({ salon }) => {
  const baseUrl = SITE_BASE_URL || 'https://www.emvi.app';
  
  // Generate SEO-friendly title
  const salonName = salon.name || salon.title || salon.salon_name || 'Beauty Salon';
  const location = salon.location || [salon.city, salon.state].filter(Boolean).join(', ') || 'Various Locations';
  const title = `${salonName} - ${location} | EmviApp`;
  
  // Generate description
  const description = salon.description 
    ? `${salon.description.slice(0, 140)}... Book services at ${salonName} on EmviApp.`
    : `Visit ${salonName} in ${location}. Premium beauty salon services. Book appointments and connect with top beauty professionals.`;

  // Generate breadcrumbs
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Salons', url: '/salons' },
    { name: salonName, url: `/salons/${salon.id}` }
  ];

  // Generate LocalBusiness structured data
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": salonName,
    "description": salon.description || `Premium beauty salon offering professional services in ${location}`,
    "url": `${baseUrl}/salons/${salon.id}`,
    "telephone": salon.phone || undefined,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": salon.city || location.split(',')[0]?.trim() || location,
      "addressRegion": salon.state || location.split(',')[1]?.trim() || "US",
      "addressCountry": "US"
    },
    "image": salon.images?.[0] || salon.image_url || `${baseUrl}/og-default.jpg`,
    "priceRange": "$$",
    "serviceType": "Beauty Services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Beauty Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Nail Services",
            "serviceType": "Beauty"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Hair Services",
            "serviceType": "Beauty"
          }
        }
      ]
    },
    "sameAs": [
      baseUrl
    ]
  };

  const structuredData = [localBusinessSchema];

  return (
    <ComprehensiveSEO
      title={title}
      description={description}
      type="business"
      canonicalUrl={`${baseUrl}/salons/${salon.id}`}
      breadcrumbs={breadcrumbs}
      structuredData={structuredData}
      image={salon.images?.[0] || salon.image_url}
      tags={[
        'beauty salon',
        'nail salon',
        'hair salon',
        salon.category || 'beauty services',
        location.toLowerCase(),
        'beauty appointments',
        'professional beauty services'
      ]}
    />
  );
};

export default SalonDetailSEO;