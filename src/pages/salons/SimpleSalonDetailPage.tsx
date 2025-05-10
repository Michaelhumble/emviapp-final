import React from 'react';

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
