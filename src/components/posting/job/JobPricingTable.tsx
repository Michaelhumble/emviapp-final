
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Diamond, Sparkles, Clock } from 'lucide-react';
import { jobPricingOptions, durationOptions, calculateDiscountedPrice } from '@/utils/posting/jobPricing';
import { toast } from 'sonner';

interface JobPricingTableProps {
  onPricingSelect: (tier: string, finalPrice: number, durationMonths: number) => void;
  jobData?: any;
}

const JobPricingTable: React.FC<JobPricingTableProps> = ({ onPricingSelect, jobData }) => {
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [showDiamondWaitlist, setShowDiamondWaitlist] = useState(false);

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'diamond': return <Diamond className="h-5 w-5 text-cyan-500" />;
      case 'premium': return <Crown className="h-5 w-5 text-purple-500" />;
      case 'gold': return <Star className="h-5 w-5 text-amber-500" />;
      default: return <Sparkles className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTierGradient = (tier: string) => {
    switch (tier) {
      case 'diamond': return 'from-cyan-50 to-blue-50 border-cyan-200';
      case 'premium': return 'from-purple-50 to-indigo-50 border-purple-200';
      case 'gold': return 'from-amber-50 to-yellow-50 border-amber-200';
      default: return 'from-gray-50 to-slate-50 border-gray-200';
    }
  };

  const handleDiamondApplication = () => {
    setShowDiamondWaitlist(true);
    toast.info('Diamond tier applications require review. You will be contacted within 24 hours.');
  };

  const handlePricingSelect = (tier: string, basePrice: number) => {
    if (tier === 'diamond') {
      handleDiamondApplication();
      return;
    }

    const pricing = calculateDiscountedPrice(basePrice, selectedDuration);
    onPricingSelect(tier, pricing.finalPrice, selectedDuration);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-playfair font-bold mb-4">Choose Your Listing Plan</h1>
        <p className="text-gray-600 mb-6">All plans include 30-day listing duration with optional auto-renewal</p>
        
        {/* Duration Selector */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg border p-1 flex">
            {durationOptions.map((option) => (
              <button
                key={option.months}
                onClick={() => setSelectedDuration(option.months)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedDuration === option.months
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {option.label}
                {option.discount > 0 && (
                  <span className="ml-1 text-xs">Save {option.discount}%</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid - Diamond → Premium → Gold → Free */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {jobPricingOptions.map((option) => {
          const pricing = calculateDiscountedPrice(option.price, selectedDuration);
          const isRecommended = option.recommended;
          const isPopular = option.popular;
          
          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className={`relative overflow-hidden h-full ${getTierGradient(option.tier)} ${
                isRecommended ? 'ring-2 ring-purple-500 ring-offset-2' : ''
              }`}>
                {/* Recommended/Popular Badge */}
                {(isRecommended || isPopular) && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                    <Badge className={`${
                      isRecommended ? 'bg-purple-500' : 'bg-amber-500'
                    } text-white px-3 py-1 text-xs font-semibold`}>
                      {isRecommended ? 'RECOMMENDED' : 'POPULAR'}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-2">
                    {getTierIcon(option.tier)}
                  </div>
                  <CardTitle className="text-xl font-playfair">{option.name}</CardTitle>
                  <div className="mt-2">
                    {option.price === 0 ? (
                      <div className="text-2xl font-bold">Free</div>
                    ) : (
                      <div>
                        <div className="text-3xl font-bold">
                          ${pricing.finalPrice.toFixed(2)}
                        </div>
                        {pricing.discountPercentage > 0 && (
                          <div className="text-sm text-gray-500">
                            <span className="line-through">${pricing.originalPrice.toFixed(2)}</span>
                            <span className="ml-2 text-green-600 font-medium">
                              Save {pricing.discountPercentage}%
                            </span>
                          </div>
                        )}
                        {selectedDuration === 1 && (
                          <div className="text-sm text-gray-500">for 30 days</div>
                        )}
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-4 text-center min-h-[40px]">
                    {option.description}
                  </p>

                  {/* Limited Spots Warning */}
                  {option.limitedSpots && (
                    <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="text-xs text-orange-700 font-medium">
                          {option.limitedSpots}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {option.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handlePricingSelect(option.tier, option.price)}
                    className={`w-full ${
                      option.tier === 'diamond' 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
                        : option.tier === 'premium'
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700'
                        : option.tier === 'gold'
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700'
                        : 'bg-gray-600 hover:bg-gray-700'
                    } text-white font-semibold`}
                    disabled={option.tier === 'diamond' && showDiamondWaitlist}
                  >
                    {option.tier === 'diamond' 
                      ? showDiamondWaitlist 
                        ? 'Application Submitted' 
                        : 'Apply for Diamond'
                      : option.price === 0 
                      ? 'Start Free Listing'
                      : `Select ${option.name}`
                    }
                  </Button>

                  {/* Diamond Additional Info */}
                  {option.tier === 'diamond' && (
                    <p className="text-xs text-center text-gray-500 mt-2">
                      Premium placement requires approval
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          All plans include secure payment processing and 24/7 customer support
        </p>
      </div>
    </div>
  );
};

export default JobPricingTable;
