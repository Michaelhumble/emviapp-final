
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { SalonPricingOptions, calculateSalonPostPrice, getPlanDetails } from '@/utils/posting/salonPricing';
import SalonPostOptions from './SalonPostOptions';

interface SalonPricingSectionProps {
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstPost?: boolean;
}

const SalonPricingSection: React.FC<SalonPricingSectionProps> = ({
  selectedOptions,
  onOptionsChange,
  onNext,
  onBack,
  isFirstPost = false
}) => {
  const currentPrice = calculateSalonPostPrice(selectedOptions);
  const planDetails = getPlanDetails(selectedOptions.durationMonths);

  const handleDurationChange = (months: number) => {
    onOptionsChange({
      ...selectedOptions,
      durationMonths: months
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Plan</h2>
        <p className="text-gray-600">Select the perfect plan for your salon listing</p>
      </div>

      {/* Duration Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Listing Duration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 6, 12].map((months) => {
              const details = getPlanDetails(months);
              const isSelected = selectedOptions.durationMonths === months;
              
              return (
                <div
                  key={months}
                  className={`cursor-pointer p-4 border rounded-lg transition-all ${
                    isSelected 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => handleDurationChange(months)}
                >
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{details.name}</h3>
                    <div className="text-2xl font-bold text-purple-600 mt-2">
                      ${details.price}
                    </div>
                    {details.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        ${details.originalPrice}
                      </div>
                    )}
                    {details.savings && (
                      <div className="text-sm text-green-600 font-medium">
                        Save {details.savings}%
                      </div>
                    )}
                    <p className="text-sm text-gray-600 mt-2">{details.description}</p>
                    <ul className="text-xs text-gray-500 mt-3 space-y-1">
                      {details.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Add-on Options */}
      <SalonPostOptions
        options={selectedOptions}
        onOptionsChange={onOptionsChange}
        isFirstPost={isFirstPost}
      />

      {/* Price Summary & Actions */}
      <Card className="border-purple-200 bg-purple-50">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total Price:</span>
            <span className="text-2xl font-bold text-purple-600">
              ${currentPrice.toFixed(2)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Photos
            </Button>
            
            <Button 
              onClick={onNext}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8"
            >
              Continue to Payment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonPricingSection;
