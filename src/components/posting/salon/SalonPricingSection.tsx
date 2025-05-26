
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import { Dispatch, SetStateAction } from 'react';

interface SalonPricingSectionProps {
  options: SalonPricingOptions;
  onOptionsChange: Dispatch<SetStateAction<SalonPricingOptions>>;
  isNationwide: boolean;
  fastSalePackage: boolean;
}

const SalonPricingSection: React.FC<SalonPricingSectionProps> = ({
  options,
  onOptionsChange,
  isNationwide,
  fastSalePackage
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Listing Plan</h2>
        <p className="text-gray-600">Select the perfect plan for your salon listing</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2 border-purple-200 hover:border-purple-400 transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="text-lg">Standard Listing</CardTitle>
            <div className="text-3xl font-bold">$24.99</div>
            <p className="text-sm text-gray-500">30 days</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✓ Basic visibility</li>
              <li>✓ Standard placement</li>
              <li>✓ Contact information</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-2 border-gold-200 hover:border-gold-400 transition-colors cursor-pointer bg-gradient-to-br from-amber-50 to-yellow-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              Featured Listing
              <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">Popular</span>
            </CardTitle>
            <div className="text-3xl font-bold">$49.99</div>
            <p className="text-sm text-gray-500">30 days</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✓ Priority placement</li>
              <li>✓ Featured badge</li>
              <li>✓ Enhanced visibility</li>
              <li>✓ Premium support</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-3">Add-on Options</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isNationwide}
              onChange={(e) => onOptionsChange(prev => ({ ...prev, isNationwide: e.target.checked }))}
              className="rounded"
            />
            <span className="text-sm">Nationwide visibility (+$10)</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={fastSalePackage}
              onChange={(e) => onOptionsChange(prev => ({ ...prev, fastSalePackage: e.target.checked }))}
              className="rounded"
            />
            <span className="text-sm">Fast sale package (+$25)</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SalonPricingSection;
