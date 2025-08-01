import React from 'react';
import DynamicSEO from './DynamicSEO';

interface CategorySEOProps {
  category: string;
  title?: string;
  description?: string;
  baseUrl?: string;
}

const CategorySEO: React.FC<CategorySEOProps> = ({ 
  category, 
  title,
  description,
  baseUrl = 'https://emvi.app' 
}) => {
  const categoryData = getCategoryData(category);
  const categoryUrl = `${baseUrl}/${category}`;
  
  const finalTitle = title || `${categoryData.displayName} Jobs & Services | EmviApp`;
  const finalDescription = description || `Find the best ${categoryData.displayName.toLowerCase()} jobs, professionals, and services. Connect with top talent in the ${categoryData.displayName.toLowerCase()} industry on EmviApp.`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": finalTitle,
    "description": finalDescription,
    "url": categoryUrl,
    "mainEntity": {
      "@type": "ItemList",
      "name": `${categoryData.displayName} Listings`,
      "description": `Professional ${categoryData.displayName.toLowerCase()} services and job opportunities`,
      "itemListElement": []
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": categoryData.displayName,
          "item": categoryUrl
        }
      ]
    }
  };

  return (
    <DynamicSEO
      title={finalTitle}
      description={finalDescription}
      image={`${baseUrl}/og-${category}.jpg`}
      url={categoryUrl}
      type="website"
      tags={[category, 'beauty', 'jobs', 'services', 'professionals']}
      structuredData={structuredData}
      canonicalUrl={categoryUrl}
    />
  );
};

// Helper function to get category-specific data
function getCategoryData(category: string) {
  const categoryMap: { [key: string]: { displayName: string; keywords: string[] } } = {
    'nails': { displayName: 'Nail', keywords: ['nail technician', 'manicure', 'pedicure', 'nail art'] },
    'hair': { displayName: 'Hair', keywords: ['hair stylist', 'colorist', 'barber', 'salon'] },
    'barber': { displayName: 'Barber', keywords: ['barber', 'men\'s grooming', 'haircut', 'beard trim'] },
    'massage': { displayName: 'Massage', keywords: ['massage therapist', 'spa', 'wellness', 'relaxation'] },
    'makeup': { displayName: 'Makeup', keywords: ['makeup artist', 'beauty', 'cosmetics', 'wedding makeup'] },
    'skincare': { displayName: 'Skincare', keywords: ['esthetician', 'facial', 'skincare', 'beauty treatment'] },
    'tattoo': { displayName: 'Tattoo', keywords: ['tattoo artist', 'ink', 'body art', 'piercing'] },
    'brows-lashes': { displayName: 'Brows & Lashes', keywords: ['eyebrow', 'lash extensions', 'microblading', 'threading'] }
  };

  return categoryMap[category] || { displayName: 'Beauty', keywords: ['beauty', 'personal care'] };
}

export default CategorySEO;