
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';

const PricingInfoCard: React.FC = () => {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4 flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
          <Info className="h-5 w-5 text-blue-500" />
        </div>
        <div className="text-sm text-blue-800">
          <p className="font-medium mb-1">Smart Pricing Tips:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Sale prices typically range from $50K-$250K depending on location and clientele</li>
            <li>Consider monthly revenue (typically 2-5x asking price)</li>
            <li>Review lease terms before making a purchase decision</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingInfoCard;
