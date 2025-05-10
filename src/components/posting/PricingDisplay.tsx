
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface PricingDisplayProps {
  lineItems: Array<{ name: string; price: number }>;
  total: number;
  className?: string;
}

const PricingDisplay: React.FC<PricingDisplayProps> = ({ lineItems, total, className = '' }) => {
  return (
    <Card className={className}>
      <CardContent className="p-5">
        <h3 className="text-lg font-bold mb-4">Order Summary</h3>
        <div className="space-y-2">
          {lineItems.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <span className="text-gray-700">{item.name}</span>
              <span className="font-medium">${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t mt-4 pt-4 flex justify-between items-center">
          <span className="font-bold">Total</span>
          <span className="font-bold text-lg">${total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingDisplay;
