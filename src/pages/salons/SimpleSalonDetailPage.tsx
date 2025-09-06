
import React from 'react';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildLocalBusinessJsonLd } from '@/components/seo/jsonld';

const formatPrice = (price: string | number | undefined): string => {
  if (typeof price === 'undefined') return '$0';
  
  let numericPrice: number;
  
  if (typeof price === 'string') {
    // Remove any non-numeric characters except decimal point and try to parse
    const cleanedPrice = price.replace(/[^0-9.]/g, '');
    numericPrice = parseFloat(cleanedPrice);
    
    // If parsing failed, return the original string with a dollar sign
    if (isNaN(numericPrice)) {
      return price.startsWith('$') ? price : `$${price}`;
    }
  } else {
    numericPrice = price;
  }
  
  // Format the numeric price
  return numericPrice.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });
};

const SimpleSalonDetailPage: React.FC = () => {
  // For now, render a simple placeholder with proper SEO
  const salonData = {
    id: 'simple-salon',
    name: 'Premium Beauty Salon',
    description: 'Full-service beauty salon offering premium treatments and services'
  };

  return (
    <>
      <BaseSEO
        title={`${salonData.name} - Beauty Salon | EmviApp`}
        description={salonData.description}
        canonical={`https://www.emvi.app/salons/${salonData.id}`}
        type="business"
        jsonLd={[buildLocalBusinessJsonLd(salonData)]}
      />
      <div>Simple Salon Detail Page</div>
    </>
  );
};

export default SimpleSalonDetailPage;
