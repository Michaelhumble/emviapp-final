
import React from 'react';
import { RadioGroup } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from 'lucide-react';
import { PricingOptions, JobPricingTier } from "@/utils/posting/types";
import { jobPricingOptions } from "@/utils/posting/jobPricing";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PricingTierSelectorProps {
  selectedTier: string;
  onSelectTier: (tier: string) => void;
  pricingOptions: PricingOptions;
  setPricingOptions: React.Dispatch<React.SetStateAction<PricingOptions>>;
}

// The timer animation variants
const timerVariants = {
  highlight: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
};

export function PricingTierSelector({
  selectedTier,
  onSelectTier,
  pricingOptions,
  setPricingOptions,
}: PricingTierSelectorProps) {
  // Calculate remaining time for the discount offer (24 hours from now)
  const [remainingTime, setRemainingTime] = React.useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 }; // Reset to 24 hours
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Find the pricing option
  const currentOption = jobPricingOptions.find(option => option.id === selectedTier);

  // Handle auto-renew toggle
  const handleAutoRenewToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPricingOptions({
      ...pricingOptions,
      autoRenew: event.target.checked,
    });
  };

  return (
    <div className="w-full">
      {/* FOMO Countdown Timer */}
      <motion.div
        className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-center"
        variants={timerVariants}
        animate="highlight"
      >
        <p className="text-amber-800 font-medium">
          🔥 Limited time offer! Prices will increase in:
        </p>
        <div className="text-xl font-bold text-amber-900 mt-1">
          {remainingTime.hours.toString().padStart(2, '0')}:
          {remainingTime.minutes.toString().padStart(2, '0')}:
          {remainingTime.seconds.toString().padStart(2, '0')}
        </div>
        <p className="text-xs text-amber-700 mt-1">
          Lock in your special price now before it expires!
        </p>
      </motion.div>

      <RadioGroup
        value={selectedTier}
        onValueChange={onSelectTier}
        className="grid grid-cols-1 gap-4"
      >
        {jobPricingOptions.filter(option => !option.hidden).map((option) => (
          <label
            key={option.id}
            className={cn(
              "relative cursor-pointer rounded-xl overflow-hidden transition-all",
              selectedTier === option.id 
                ? "ring-2 ring-purple-500 shadow-md" 
                : "border border-gray-200 hover:border-purple-200"
            )}
          >
            <input
              type="radio"
              value={option.id}
              name="pricing-tier"
              className="sr-only"
              checked={selectedTier === option.id}
              onChange={() => onSelectTier(option.id)}
            />
            <Card className="border-0 shadow-none">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{option.name}</h3>
                      {option.popular && (
                        <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                          Most Popular
                        </span>
                      )}
                      {option.tag && (
                        <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full">
                          {option.tag}
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-2xl font-bold">${option.price.toFixed(2)}</p>
                      {option.wasPrice && (
                        <p className="text-sm text-gray-500 line-through mt-1">
                          Was ${option.wasPrice.toFixed(2)}
                        </p>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mt-2">
                      {option.description}
                    </p>
                  </div>
                  
                  {selectedTier === option.id && (
                    <div className="bg-purple-500 rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>

                {option.features && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Includes:</p>
                    <ul className="text-sm space-y-1">
                      {option.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-purple-500" /> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {option.limitedSpots && (
                  <div className="mt-3 bg-red-50 p-2 rounded text-sm text-red-600">
                    <span className="font-medium">Limited availability:</span> {option.limitedSpots}
                  </div>
                )}

                {option.upsellText && (
                  <div className="mt-3 text-xs text-purple-600 font-medium">
                    {option.upsellText}
                  </div>
                )}
              </CardContent>
            </Card>
          </label>
        ))}
      </RadioGroup>
      
      <div className="mt-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="auto-renew"
            className="rounded text-purple-500 focus:ring-purple-500 mr-2"
            checked={pricingOptions.autoRenew}
            onChange={handleAutoRenewToggle}
          />
          <label htmlFor="auto-renew" className="text-gray-700 text-sm">
            Auto-renew my plan (recommended to maintain your special pricing)
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-1 ml-5">
          You can cancel anytime. Don't lose your special rate!
        </p>
      </div>
    </div>
  );
}
