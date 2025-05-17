
import React from 'react';
import { Check, Sparkles, ArrowRight, Star, TrendingUp, AlertTriangle } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { useTranslation } from '@/hooks/useTranslation';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { JobPricingTier } from '@/utils/posting/types';
import { motion } from 'framer-motion';

interface PricingCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  vietnameseDescription?: string;
  tag?: string;
  popular?: boolean;
  features: string[];
  tier?: JobPricingTier;
  selectedPricing: string;
  onChange: (id: string) => void;
}

const pricingCardVariants = cva(
  "relative rounded-lg border overflow-hidden transition-all cursor-pointer h-full flex flex-col",
  {
    variants: {
      tier: {
        free: "border-gray-200 bg-white",
        standard: "border-gray-200 bg-white",
        premium: "border-purple-200 bg-gradient-to-b from-purple-50 to-white",
        gold: "border-amber-200 bg-gradient-to-b from-amber-50 to-white",
        diamond: "border-blue-200 bg-gradient-to-b from-blue-50 to-white"
      },
      selected: {
        true: "ring-2 ring-offset-2",
        false: "hover:shadow-md"
      }
    },
    compoundVariants: [
      {
        tier: "free",
        selected: true,
        class: "ring-gray-400"
      },
      {
        tier: "standard",
        selected: true,
        class: "ring-green-500"
      },
      {
        tier: "premium",
        selected: true,
        class: "ring-purple-500"
      },
      {
        tier: "gold",
        selected: true,
        class: "ring-amber-500"
      },
      {
        tier: "diamond",
        selected: true,
        class: "ring-blue-500"
      }
    ],
    defaultVariants: {
      tier: "standard",
      selected: false
    }
  }
);

const PricingCard = ({
  id,
  name,
  price,
  description,
  vietnameseDescription,
  tag,
  popular,
  features,
  tier = 'standard',
  selectedPricing,
  onChange
}: PricingCardProps) => {
  const { t, isVietnamese } = useTranslation();
  const selected = selectedPricing === id;
  
  const displayDescription = isVietnamese && vietnameseDescription ? vietnameseDescription : description;
  
  const getTierIcon = () => {
    switch(tier) {
      case 'diamond':
        return <Sparkles className="h-5 w-5 text-blue-500" />;
      case 'gold': 
        return <Star className="h-5 w-5 text-amber-500" />;
      case 'premium':
        return <TrendingUp className="h-5 w-5 text-purple-600" />;
      default:
        return null;
    }
  };
  
  const remainingCount = tier === 'diamond' ? 3 : (tier === 'gold' ? 5 : null);
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={() => onChange(id)}
      className={pricingCardVariants({
        tier: tier as JobPricingTier,
        selected
      })}
    >
      {/* Popular tag */}
      {popular && (
        <div className="absolute top-0 right-0">
          <Badge className="rounded-none rounded-bl-lg bg-purple-600 text-white text-xs py-0.5 px-2 font-medium">
            {t({
              english: "MOST POPULAR",
              vietnamese: "PHỔ BIẾN NHẤT" 
            })}
          </Badge>
        </div>
      )}
      
      {/* Tier-specific badge */}
      {tag && (
        <Badge 
          className={cn(
            "absolute top-0 left-0 rounded-none rounded-br-lg text-xs py-0.5 px-2 font-medium",
            tier === 'diamond' ? "bg-blue-600 text-white" : 
            tier === 'gold' ? "bg-amber-600 text-white" : 
            tier === 'premium' ? "bg-purple-600 text-white" : 
            "bg-green-600 text-white"
          )}
        >
          {t({
            english: tag,
            vietnamese: tag
          })}
        </Badge>
      )}
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          {getTierIcon()}
          <h3 className={cn(
            "text-lg font-semibold", 
            tier === 'diamond' ? "text-blue-800" :
            tier === 'gold' ? "text-amber-800" :
            tier === 'premium' ? "text-purple-800" :
            "text-gray-800"
          )}>
            {t({
              english: name,
              vietnamese: name
            })}
          </h3>
        </div>
        
        {/* Display price */}
        <div className="mb-3 flex items-baseline">
          {price > 0 ? (
            <>
              <span className="text-2xl font-bold">${price}</span>
              <span className="ml-1 text-gray-600 text-sm">/mo</span>
            </>
          ) : (
            <span className="text-2xl font-bold text-gray-700">
              {t({
                english: "Free",
                vietnamese: "Miễn Phí"
              })}
            </span>
          )}
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">{displayDescription}</p>
        
        {/* Limited spots notification */}
        {remainingCount !== null && (
          <div className="mb-4 py-1.5 px-3 bg-amber-50 border border-amber-100 rounded text-xs flex items-center text-amber-800">
            <AlertTriangle className="h-3 w-3 text-amber-600 mr-1 flex-shrink-0" />
            {t({
              english: `Only ${remainingCount} spots left at this price`,
              vietnamese: `Chỉ còn ${remainingCount} vị trí ở mức giá này`
            })}
          </div>
        )}
        
        {/* Features list */}
        <ul className="space-y-2 mt-auto">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm gap-2">
              <Check className={cn(
                "h-4 w-4 mt-0.5",
                tier === 'diamond' ? "text-blue-600" :
                tier === 'gold' ? "text-amber-600" :
                tier === 'premium' ? "text-purple-600" :
                "text-green-600"
              )} />
              <span className="text-gray-700">{t({
                english: feature,
                vietnamese: feature
              })}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Selection indicator */}
      <div className={cn(
        "px-5 py-3 text-center text-sm border-t transition-colors flex items-center justify-center font-medium",
        selected ? (
          tier === 'diamond' ? "bg-blue-600 text-white border-blue-600" :
          tier === 'gold' ? "bg-amber-600 text-white border-amber-600" :
          tier === 'premium' ? "bg-purple-600 text-white border-purple-600" :
          "bg-green-600 text-white border-green-600"
        ) : (
          tier === 'diamond' ? "bg-blue-50 text-blue-700 border-blue-100" :
          tier === 'gold' ? "bg-amber-50 text-amber-700 border-amber-100" :
          tier === 'premium' ? "bg-purple-50 text-purple-700 border-purple-100" :
          "bg-gray-50 text-gray-700 border-gray-100"
        )
      )}>
        {selected ? (
          <>
            <Check className="h-4 w-4 mr-1" />
            {t({
              english: "Selected",
              vietnamese: "Đã chọn"
            })}
          </>
        ) : (
          <>
            {t({
              english: "Select Plan",
              vietnamese: "Chọn gói"
            })}
            <ArrowRight className="h-4 w-4 ml-1" />
          </>
        )}
      </div>
    </motion.div>
  );
};

export default PricingCard;
