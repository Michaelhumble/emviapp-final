
import React from 'react';
import { RefreshCw, Check, ArrowRight, Star } from 'lucide-react';
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
        title: "Want to double your hiring chances?",
        description: "For just $5 more, get front-page exposure for 30 days and hire up to 3× faster.",
        buttonText: "Upgrade for $5 more"
      };
    } else if (selectedPricing === 'premium') {
      return {
        title: "Did you know 1,200 brands upgraded to Featured last month?",
        description: "Get maximum visibility and premium placement with our Featured plan for just $10 more.",
        buttonText: "Upgrade to Featured"
      };
    }
    
    // Default
    return {
      title: "Upgrade to Featured for Maximum Visibility",
      description: "Featured listings get 3x more views and appear in the top section.",
      buttonText: "Upgrade Now"
    };
  };
  
  if (onUpgrade) {
    // This is the upgrade card variant
    const upgradeInfo = getUpgradeMessage();
    
    return (
      <Card className="p-5 bg-gradient-to-r from-[#F8F8FF] to-[#F7E7CE]/20 border border-[#F7E7CE]/50 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-[#1D1E1E] flex items-center font-playfair">
              <Star className="h-5 w-5 mr-2 text-[#F7E7CE] stroke-amber-600" />
              {upgradeInfo.title}
            </h3>
            <p className="text-sm mt-1 text-[#1D1E1E]/80">
              {upgradeInfo.description}
            </p>
            <ul className="mt-2 space-y-1">
              <li className="flex items-center text-sm text-[#1D1E1E]/80">
                <Check className="h-4 w-4 mr-1.5 text-[#50C878]" />
                <span>Premium placement on homepage</span>
              </li>
              <li className="flex items-center text-sm text-[#1D1E1E]/80">
                <Check className="h-4 w-4 mr-1.5 text-[#50C878]" />
                <span>Free listing boost included</span>
              </li>
            </ul>
          </div>
          <div>
            <Button 
              onClick={onUpgrade} 
              className="bg-[#50C878] hover:bg-[#50C878]/90 text-white font-medium shadow-sm"
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
    <Card className="p-5 bg-gradient-to-r from-[#F8F8FF] to-[#F7E7CE]/10 border-[#F7E7CE]/30 shadow-md">
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-4">
          <div className="h-12 w-12 rounded-full bg-[#F7E7CE]/20 flex items-center justify-center">
            <RefreshCw className="h-6 w-6 text-[#1D1E1E]/80" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-[#1D1E1E] font-playfair">Auto-Renew Recommended</h3>
          <p className="text-sm mt-1 text-[#1D1E1E]/70">
            Keep your listing active without interruption. You'll be notified before each renewal.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AutoRenewSuggestionCard;
