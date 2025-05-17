import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sparkles, Check, Flame } from 'lucide-react'; // Changed Fire to Flame
import { jobPricingOptions } from '@/utils/posting/jobPricing';

interface PricingCardProps {
  id: string;
  name: string;
  price: number;
  wasPrice?: number;
  description: string;
  vietnameseDescription: string;
  tag?: string;
  popular?: boolean;
  features: string[];
  isFirstPost?: boolean;
  tier: string;
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
  tier
}) => {
  const isFree = price === 0;
  const isPremium = tier === 'premium';
  
  return (
    <motion.div
      className={cn(
        "relative rounded-lg border shadow-md overflow-hidden transition-shadow hover:shadow-lg",
        popular ? "border-purple-500" : "border-gray-200",
        isFree ? "bg-green-50" : "bg-white"
      )}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      {tag && (
        <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold py-1 px-3 rounded-bl-lg z-10">
          {tag}
        </div>
      )}
      
      {popular && (
        <div className="absolute top-0 left-0 bg-yellow-500 text-white text-xs font-bold py-1 px-3 rounded-br-lg z-10">
          Popular
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          {isPremium && <Sparkles className="h-5 w-5 text-yellow-500" />}
        </div>
        
        <div className="mb-4">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">
              ${price.toFixed(2)}
            </span>
            {wasPrice && (
              <span className="ml-2 text-gray-500 line-through">
                ${wasPrice.toFixed(2)}
              </span>
            )}
            <span className="ml-1 text-gray-500">/ month</span>
          </div>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-700">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
        
        {isFirstPost && (
          <div className="mt-4 text-sm text-green-600 font-medium">
            <Flame className="inline-block h-4 w-4 mr-1" />
            First Post Free!
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PricingCard;
