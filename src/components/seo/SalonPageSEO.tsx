import React from 'react';
import BaseSEO from './BaseSEO';
import { generateMetaDescription, generateImageAlt } from '@/utils/seoHelpers';

interface SalonPageSEOProps {
  salon: {
    name: string;
    description?: string;
    location?: string;
    services?: string[];
  };
  url: string;
}

const SalonPageSEO: React.FC<SalonPageSEOProps> = ({ salon, url }) => {
  const title = `${salon.name} - ${salon.location || 'Beauty Salon'} | EmviApp`;
  const description = generateMetaDescription(
    salon.description || `Premium beauty salon ${salon.name} in ${salon.location || 'your area'}. Book appointments and connect with top beauty professionals.`,
    160
  );
  const imageAlt = generateImageAlt(salon.name, 'Beauty Salon');
  
  return (
    <BaseSEO
      title={title}
      description={description}
      canonical={url}
      type="business"
      ogImage="/og-salon.jpg"
    />
  );
};

export default SalonPageSEO;