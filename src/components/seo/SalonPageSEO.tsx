import React from 'react';
import { Helmet } from 'react-helmet-async';
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
  const canonical = `https://www.emvi.app${url}`;
  const imageAlt = generateImageAlt(salon.name, 'Beauty Salon');
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="business.business" />
      <meta property="og:image" content="https://www.emvi.app/og-salon.jpg" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://www.emvi.app/og-salon.jpg" />
      <meta name="twitter:image:alt" content={imageAlt} />
    </Helmet>
  );
};

export default SalonPageSEO;