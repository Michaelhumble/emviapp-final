import React from 'react';
import ComprehensiveSEO from './ComprehensiveSEO';
import { SITE_BASE_URL } from '@/config/seo';
import { organizationJsonLd, marketplaceLocalBusinessJsonLd } from '@/lib/seo/jsonld';

interface SalonsPageSEOProps {
  salons: Array<{
    id: string;
    name?: string;
    title?: string;
    salon_name?: string;
    location?: string;
    city?: string;
    state?: string;
    description?: string;
  }>;
  currentPage?: number;
  location?: string;
}

const SalonsPageSEO: React.FC<SalonsPageSEOProps> = ({ 
  salons = [], 
  currentPage = 1,
  location
}) => {
  const baseUrl = SITE_BASE_URL || 'https://www.emvi.app';
  
  // Generate dynamic title and description
  const locationText = location ? ` in ${location}` : '';
  const pageText = currentPage > 1 ? ` - Page ${currentPage}` : '';
  
  const title = `Beauty Salons${locationText} | EmviApp${pageText}`;
  const description = `Find premium beauty salons${locationText} on EmviApp. Connect with top nail salons, hair salons, and beauty establishments. ${salons.length} verified salons available.`;

  // Generate ItemList structured data for visible salons
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Beauty Salons${locationText}`,
    "description": description,
    "numberOfItems": salons.length,
    "itemListElement": salons.slice(0, 20).map((salon, index) => {
      const salonName = salon.name || salon.title || salon.salon_name || 'Beauty Salon';
      const salonLocation = salon.location || [salon.city, salon.state].filter(Boolean).join(', ') || 'Various Locations';
      
      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "BeautySalon",
          "name": salonName,
          "description": salon.description || `Premium beauty salon in ${salonLocation}`,
          "url": `${baseUrl}/salons/${salon.id}`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": salon.city || salonLocation.split(',')[0]?.trim() || salonLocation,
            "addressRegion": salon.state || salonLocation.split(',')[1]?.trim() || "US"
          }
        }
      };
    })
  };

  // Generate Collection structured data
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "Collection",
    "name": `Beauty Salon Directory`,
    "description": `Directory of premium beauty salons${locationText}`,
    "url": `${baseUrl}/salons`,
    "hasPart": salons.slice(0, 10).map(salon => {
      const salonName = salon.name || salon.title || salon.salon_name || 'Beauty Salon';
      return {
        "@type": "BeautySalon",
        "name": salonName,
        "url": `${baseUrl}/salons/${salon.id}`
      };
    })
  };

  // Add Organization and LocalBusiness schemas
  const organizationSchema = organizationJsonLd();
  const localBusinessSchema = marketplaceLocalBusinessJsonLd();
  
  const structuredData = [organizationSchema, localBusinessSchema, itemListSchema, collectionSchema];

  return (
    <ComprehensiveSEO
      title={title}
      description={description}
      canonicalUrl={`${baseUrl}/salons`}
      structuredData={structuredData}
      tags={[
        'beauty salons',
        'nail salons',
        'hair salons',
        'beauty establishments',
        'salon directory',
        'beauty services',
        ...(location ? [location.toLowerCase()] : [])
      ]}
    />
  );
};

export default SalonsPageSEO;