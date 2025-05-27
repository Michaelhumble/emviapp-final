
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sparkles, Check, Flame, Crown, Star, Shield } from 'lucide-react'; 
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import { JobPricingOption } from '@/utils/posting/types';
import { useTranslation } from '@/hooks/useTranslation';

export interface PricingCardProps {
  id?: string;
  name?: string;
  price?: number;
  wasPrice?: number;
  description?: string;
  vietnameseDescription?: string;
  tag?: string;
  popular?: boolean;
  features?: string[];
  isFirstPost?: boolean;
  tier?: string;
  pricingOptions?: JobPricingOption[];
  selectedPricing?: string;
  onChange?: (pricingId: string) => void;
  selectedDuration?: number;
  onDurationChange?: (duration: number) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  id,
  name,
  price,
  wasPrice,
  description,
  vietnameseDescription,
  tag,
  popular,
  features,
  isFirstPost,
  tier,
  onChange
}) => {
  const { t, isVietnamese } = useTranslation();
  const isFree = price === 0;
  const isPremium = tier === 'premium';
  const isGold = tier === 'gold';
  const isDiamond = tier === 'diamond';
  
  const getTierIcon = () => {
    if (isDiamond) return <Crown className="h-6 w-6 text-purple-500" />;
    if (isGold) return <Star className="h-6 w-6 text-amber-500" />;
    if (isPremium) return <Sparkles className="h-6 w-6 text-blue-500" />;
    return <Shield className="h-6 w-6 text-green-500" />;
  };
  
  return (
    <motion.div
      onClick={() => onChange && onChange(id || '')}
      className={cn(
        "relative rounded-xl border overflow-hidden transition-all cursor-pointer",
        popular ? "ring-2 ring-purple-300 shadow-lg" : "shadow-md hover:shadow-lg",
        isFree ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200" : 
        isPremium ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200" :
        isGold ? "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200" :
        isDiamond ? "bg-gradient-to-br from-purple-50 to-fuchsia-50 border-purple-200" :
        "bg-white border-gray-200",
      )}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {tag && (
        <div className={cn(
          "absolute top-0 right-0 py-1 px-3 text-xs font-bold text-white z-10",
          popular ? "bg-gradient-to-r from-purple-600 to-violet-600" : 
          isFree ? "bg-gradient-to-r from-green-600 to-emerald-600" :
          isGold ? "bg-gradient-to-r from-amber-500 to-yellow-500" :
          isDiamond ? "bg-gradient-to-r from-violet-600 to-fuchsia-600" :
          "bg-gradient-to-r from-blue-600 to-indigo-600",
          "rounded-bl-lg"
        )}>
          {tag}
        </div>
      )}
      
      {popular && (
        <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold py-1 px-3 rounded-br-lg z-10">
          {t({
            english: "Popular",
            vietnamese: "Phổ biến"
          })}
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          {getTierIcon()}
          <h3 className={cn(
            "text-lg font-semibold ml-2",
            isFree ? "text-green-800" : 
            isPremium ? "text-blue-800" :
            isGold ? "text-amber-800" :
            isDiamond ? "text-purple-800" :
            "text-gray-800"
          )}>{name}</h3>
        </div>
        
        <div className="mb-4">
          <div className="flex items-baseline">
            <span className={cn(
              "text-3xl font-bold",
              isFree ? "text-green-700" : 
              isPremium ? "text-blue-700" :
              isGold ? "text-amber-700" :
              isDiamond ? "text-purple-700" :
              "text-gray-800"
            )}>
              ${price?.toFixed(2)}
            </span>
            {wasPrice && (
              <span className="ml-2 text-gray-500 line-through">
                ${wasPrice.toFixed(2)}
              </span>
            )}
            <span className="ml-1 text-gray-500">/ {t({
              english: "month",
              vietnamese: "tháng"
            })}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {isVietnamese ? vietnameseDescription : description}
          </p>
        </div>
        
        <ul className="space-y-2">
          {features?.map((feature, index) => (
            <motion.li 
              key={index} 
              className={cn(
                "flex items-start text-sm",
                isFree ? "text-green-700" : 
                isPremium ? "text-blue-700" :
                isGold ? "text-amber-700" :
                isDiamond ? "text-purple-700" :
                "text-gray-700"
              )}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Check className={cn(
                "h-4 w-4 mr-2 mt-0.5 flex-shrink-0",
                isFree ? "text-green-500" : 
                isPremium ? "text-blue-500" :
                isGold ? "text-amber-500" :
                isDiamond ? "text-purple-500" :
                "text-green-500"
              )} />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
        
        {isFirstPost && (
          <div className="mt-4 text-sm font-medium flex items-center">
            <Flame className={cn(
              "h-4 w-4 mr-1",
              isFree ? "text-green-500" : "text-purple-500"
            )} />
            <span className={isFree ? "text-green-600" : "text-purple-600"}>
              {t({
                english: "First Post Free!",
                vietnamese: "Bài Đăng Đầu Tiên Miễn Phí!"
              })}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Main component that renders pricing cards
const PricingCards: React.FC<{
  pricingOptions: JobPricingOption[];
  selectedPricing: string;
  onChange: (pricingId: string) => void;
}> = ({ pricingOptions, selectedPricing, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {pricingOptions.map((option) => (
        <PricingCard
          key={option.id}
          id={option.id}
          name={option.name}
          price={option.price}
          wasPrice={option.wasPrice}
          description={option.description}
          vietnameseDescription={option.vietnameseDescription}
          tag={option.tag}
          popular={option.popular}
          features={option.features}
          isFirstPost={option.isFirstPost}
          tier={option.tier}
          onChange={onChange}
          selectedPricing={selectedPricing}
        />
      ))}
    </div>
  );
};

export default PricingCard;
export { PricingCards };
