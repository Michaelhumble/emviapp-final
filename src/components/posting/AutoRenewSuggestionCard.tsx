
import React from 'react';
import { RefreshCw, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AutoRenewSuggestionCardProps {
  onUpgrade?: () => void;
  selectedPricing?: string;
}

const AutoRenewSuggestionCard: React.FC<AutoRenewSuggestionCardProps> = ({ onUpgrade, selectedPricing }) => {
  // Conditional upgrade messaging based on selected plan
  const getUpgradeMessage = () => {
    if (selectedPricing === 'standard') {
      return {
        title: "Want to double your reach?",
        description: "For just $5 more, get front-page exposure for 30 days and reach more artists faster.",
        buttonText: "Upgrade to Gold Featured"
      };
    } else if (selectedPricing === 'premium') {
      return {
        title: "Did you know 1,200 brands upgraded to Gold last month?",
        description: "Get maximum visibility and premium placement with our Gold Featured plan.",
        buttonText: "Upgrade to Gold Featured"
      };
    }
    
    // Default for basic/free plan
    return {
      title: "Upgrade to Gold Featured for Maximum Visibility",
      description: "Gold Featured listings get more views and appear in the premium section.",
      buttonText: "Upgrade Now"
    };
  };
  
  // Show upsell variant for basic or standard plans
  const showUpsell = selectedPricing === 'basic' || selectedPricing === 'standard' || selectedPricing === 'free';
  
  if (onUpgrade && showUpsell) {
    // This is the upgrade card variant
    const upgradeInfo = getUpgradeMessage();
    
    return (
      <Card className="p-4 bg-gradient-to-r from-amber-50 to-amber-100/80 border-amber-200 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-amber-800 flex items-center">
              <Star className="h-5 w-5 mr-2 text-amber-600" />
              {upgradeInfo.title}
            </h3>
            <p className="text-sm mt-1 text-amber-700">
              {upgradeInfo.description}
            </p>
            <ul className="mt-2 space-y-1">
              <li className="flex items-center text-sm text-amber-700">
                <Check className="h-4 w-4 mr-1.5 text-green-600" />
                <span>Premium placement on homepage</span>
              </li>
              <li className="flex items-center text-sm text-amber-700">
                <Check className="h-4 w-4 mr-1.5 text-green-600" />
                <span>Free listing boost included</span>
              </li>
            </ul>
          </div>
          <div>
            <Button 
              onClick={onUpgrade} 
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium shadow-sm"
            >
              {upgradeInfo.buttonText} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }
  
  // This is the auto-renew suggestion variant
  return (
    <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100/80 border-blue-200 shadow-md">
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <RefreshCw className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-blue-800">✅ Auto-renew is enabled. Cancel anytime.</h3>
          <p className="text-sm mt-1 text-blue-600">
            Best value over time. Keep your listing active without interruption. You'll be notified before each renewal.
          </p>
        </div>
      </div>
    </Card>
  );
};

// Import Star icon for the upgrade variant
import { Star } from 'lucide-react';

export default AutoRenewSuggestionCard;
