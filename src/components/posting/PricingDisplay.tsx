
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface PricingDisplayProps {
  lineItems?: Array<{ name: string; price: number }>;
  total?: number;
  className?: string;
  // Add new properties to match how it's being used
  basePrice?: number;
  duration?: number;
  pricingId?: string;
  autoRenew?: boolean;
  originalPrice?: number;
  finalPrice?: number;
  discountPercentage?: number;
}

const PricingDisplay: React.FC<PricingDisplayProps> = ({ 
  lineItems = [], 
  total = 0, 
  className = '',
  basePrice,
  duration,
  pricingId,
  autoRenew,
  originalPrice,
  finalPrice,
  discountPercentage
}) => {
  // Calculate line items if not provided directly
  const calculatedLineItems = lineItems.length > 0 ? lineItems : [];
  
  // If we have the new format properties, create line items from them
  if (basePrice !== undefined && duration !== undefined) {
    // Clear existing items to avoid duplication
    calculatedLineItems.length = 0;
    
    // Base price line item
    calculatedLineItems.push({
      name: `Base price${duration > 1 ? ` (${duration} months)` : ''}`,
      price: basePrice * duration
    });
    
    // If there's a discount (auto-renew or other)
    if (discountPercentage && discountPercentage > 0) {
      calculatedLineItems.push({
        name: `${autoRenew ? 'Auto-renew' : 'Discount'} (${discountPercentage}%)`,
        price: -(originalPrice || basePrice * duration) * (discountPercentage / 100)
      });
    }
  }
  
  // Use provided total or calculate from finalPrice
  const displayTotal = finalPrice !== undefined ? finalPrice : total;

  return (
    <Card className={className}>
      <CardContent className="p-5">
        <h3 className="text-lg font-bold mb-4">Order Summary</h3>
        <div className="space-y-2">
          {calculatedLineItems.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <span className="text-gray-700">{item.name}</span>
              <span className="font-medium">${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t mt-4 pt-4 flex justify-between items-center">
          <span className="font-bold">Total</span>
          <span className="font-bold text-lg">${displayTotal.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingDisplay;
