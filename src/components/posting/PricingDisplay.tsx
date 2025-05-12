
import React from 'react';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import { Check, Star, Crown, Fire, Gem } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { GradientBackground } from '@/components/ui/gradient-background';
import { useTranslation } from '@/hooks/useTranslation';

interface PricingDisplayProps {
  selectedPricing: string;
  onSelect: (pricingId: string) => void;
  isFirstPost?: boolean;
}

const PricingDisplay: React.FC<PricingDisplayProps> = ({ selectedPricing, onSelect, isFirstPost = false }) => {
  const { t, isVietnamese } = useTranslation();
  
  // Filter out hidden plans
  const visibleOptions = jobPricingOptions.filter(option => !option.hidden);
  
  // Define our exact order and format for the plans
  const orderedOptions = [
    { id: 'standard', displayName: 'Standard — $9.99/mo' },
    { id: 'gold', displayName: 'Gold Featured — $14.99/mo' },
    { id: 'premium', displayName: 'Premium Listing — $24.99/mo' },
    { id: 'free', displayName: 'Basic Plan – Free (first-time only)' }
  ];
  
  // Sort the visible options based on our ordered list
  const sortedOptions = [...visibleOptions].sort((a, b) => {
    const aIndex = orderedOptions.findIndex(o => o.id === a.id);
    const bIndex = orderedOptions.findIndex(o => o.id === b.id);
    return aIndex - bIndex;
  });
  
  // Get display names from our ordered list
  const getDisplayName = (id: string) => {
    const option = orderedOptions.find(o => o.id === id);
    return option ? option.displayName : '';
  };
  
  // Badge configurations
  const getBadgeConfig = (pricingId: string) => {
    switch(pricingId) {
      case 'standard':
        return {
          text: '🔥 Chosen by 8,200+ salons',
          className: 'bg-blue-500/10 text-blue-800 border-blue-200'
        };
      case 'gold':
        return {
          text: '⭐ Built to help you grow faster',
          className: 'bg-amber-500/10 text-amber-800 border-amber-200'
        };
      case 'premium':
        return {
          text: '💎 Most loved by salons',
          className: 'bg-purple-500/10 text-purple-800 border-purple-200'
        };
      case 'free':
        return {
          text: '✨ For new users',
          className: 'bg-gray-500/10 text-gray-700 border-gray-200'
        };
      default:
        return { text: '', className: '' };
    }
  };
  
  // Subtitle configurations
  const getSubtitle = (pricingId: string) => {
    switch(pricingId) {
      case 'standard':
        return 'Smart visibility for most businesses';
      case 'gold':
        return 'Premium exposure across homepage & listings';
      case 'premium':
        return 'Highlight your listing & match with better candidates';
      case 'free':
        return 'No credit card required. Limited visibility.';
      default:
        return '';
    }
  };
  
  // Card background and styling configurations
  const getCardStyle = (pricingId: string, isSelected: boolean) => {
    const baseClasses = "relative rounded-xl overflow-hidden transition-all duration-300";
    const selectedClasses = "ring-2 ring-[#50C878] transform -translate-y-1";
    
    switch(pricingId) {
      case 'standard':
        return cn(
          baseClasses,
          "border border-blue-200 bg-white",
          isSelected && selectedClasses
        );
      case 'gold':
        return cn(
          baseClasses,
          "border border-amber-200 bg-gradient-to-b from-[#FFF4D4] to-[#FFEAC2]",
          isSelected && "ring-2 ring-amber-400 transform -translate-y-1"
        );
      case 'premium':
        return cn(
          baseClasses,
          "border border-purple-200 bg-gradient-to-b from-[#F5F3FF] to-[#EDE7FF]",
          isSelected && "ring-2 ring-purple-400 transform -translate-y-1"
        );
      case 'free':
        return cn(
          baseClasses,
          "border border-gray-200 bg-gray-50",
          isSelected && selectedClasses
        );
      default:
        return baseClasses;
    }
  };
  
  const getPriceDisplay = (option: any) => {
    if (option.id === 'free') {
      return <span className="font-bold text-gray-600">Free</span>;
    }
    
    return (
      <div className="space-y-1">
        {option.wasPrice && (
          <div className="text-gray-400 text-sm line-through font-medium">
            ${option.wasPrice.toFixed(2)}
          </div>
        )}
        <div className="flex items-center">
          <span className="text-3xl font-bold font-playfair">
            ${option.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-600 ml-1">/mo</span>
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedOptions.filter(option => option.id !== 'free').map((option) => {
          const isSelected = selectedPricing === option.id;
          const badgeConfig = getBadgeConfig(option.id);
          const subtitle = getSubtitle(option.id);
          
          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0.8, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className={getCardStyle(option.id, isSelected)}
            >
              {/* Badge on top */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className={cn("px-3 py-1 font-medium text-xs border shadow-sm whitespace-nowrap", badgeConfig.className)}>
                  {badgeConfig.text}
                </Badge>
              </div>
              
              <div 
                className={cn(
                  "h-full flex flex-col p-6",
                  option.id === 'standard' ? "border-blue-50" : 
                  option.id === 'gold' ? "border-amber-50" : "border-purple-50"
                )}
              >
                <div className="mb-5 text-center">
                  <h3 className="text-xl font-bold font-playfair mb-1">
                    {getDisplayName(option.id)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {subtitle}
                  </p>
                  
                  {/* Vietnamese description */}
                  {isVietnamese && option.vietnameseDescription && (
                    <p className="text-sm text-gray-500 italic mt-1">
                      {option.vietnameseDescription}
                    </p>
                  )}
                </div>
                
                <div className="text-center mb-5">
                  {getPriceDisplay(option)}
                </div>
                
                {/* Social proof tag */}
                {option.tag && (
                  <div className={cn(
                    "text-center text-sm px-4 py-2 mb-5 rounded-full",
                    option.id === 'standard' ? "bg-blue-50 text-blue-800" : 
                    option.id === 'gold' ? "bg-amber-50 text-amber-800" : 
                    "bg-purple-50 text-purple-800"
                  )}>
                    {option.tag}
                  </div>
                )}
                
                <div className="space-y-3 mb-6 flex-grow">
                  {option.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-[#50C878] flex-shrink-0 mr-3 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => onSelect(option.id)}
                  className={cn(
                    "w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all",
                    isSelected ? "bg-[#50C878] text-white shadow-md" : 
                    option.id === 'standard' ? "bg-blue-50 text-blue-800 hover:bg-blue-100" :
                    option.id === 'gold' ? "bg-amber-50 text-amber-800 hover:bg-amber-100" :
                    "bg-purple-50 text-purple-800 hover:bg-purple-100"
                  )}
                >
                  {isSelected ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Free Plan (Basic) */}
      {sortedOptions.filter(option => option.id === 'free').map((option) => (
        <motion.div
          key={option.id}
          initial={{ opacity: 0.8, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={getCardStyle(option.id, selectedPricing === option.id)}
        >
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
            <Badge className={cn("px-3 py-1 font-medium text-xs border shadow-sm", getBadgeConfig(option.id).className)}>
              {getBadgeConfig(option.id).text}
            </Badge>
          </div>
          
          <div className="p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="flex-grow">
              <h3 className="text-xl font-bold font-playfair mb-1">
                {getDisplayName(option.id)}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {getSubtitle(option.id)}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
                <div className="space-y-2">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-[#50C878] flex-shrink-0 mr-3 mt-0.5" />
                    <span className="text-sm">Free for your first job post</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-gray-400 flex-shrink-0 mr-3 mt-0.5" />
                    <span className="text-sm text-gray-500">Limited visibility</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-gray-400 flex-shrink-0 mr-3 mt-0.5" />
                    <span className="text-sm text-gray-500">Standard placement</span>
                  </div>
                  {isFirstPost && (
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-[#50C878] flex-shrink-0 mr-3 mt-0.5" />
                      <span className="text-sm">Available for first-time posters</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="text-center mb-2">
                <div className="text-lg font-bold font-playfair text-gray-700">Free</div>
                <div className="text-xs text-gray-500">First-time only</div>
              </div>
              
              <button
                onClick={() => onSelect(option.id)}
                className={cn(
                  "py-2.5 px-6 rounded-lg font-medium text-sm transition-all",
                  selectedPricing === option.id ? "bg-[#50C878] text-white shadow-md" : 
                  "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {selectedPricing === option.id ? 'Selected' : 'Select Free Plan'}
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PricingDisplay;
