
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { JobPricingTier, PricingOptions } from '@/utils/posting/types';
import { Globe, RotateCcw, Users, Clock, Flame } from 'lucide-react';
import EnhancedPricingHero from './EnhancedPricingHero';
import EnhancedPricingCards from './EnhancedPricingCards';

interface EnhancedPricingSectionProps {
  selectedTier: JobPricingTier;
  onTierSelect: (tier: JobPricingTier) => void;
  options: PricingOptions;
  onOptionsChange: (options: PricingOptions) => void;
  onProceed: () => void;
}

const EnhancedPricingSection: React.FC<EnhancedPricingSectionProps> = ({
  selectedTier,
  onTierSelect,
  options,
  onOptionsChange,
  onProceed
}) => {
  const [nationwideEnabled, setNationwideEnabled] = useState(true);
  const [autoRenewEnabled, setAutoRenewEnabled] = useState(true);
  
  // Diamond spots logic - max 3, with 1 reserved
  const maxDiamondSpots = 3;
  const reservedSpots = 1; // Reserved for founder's brother
  const diamondSpotsLeft = 2; // Currently 2 available out of 3 total

  const durationOptions = [
    { months: 1, label: '1 Month', discount: 0 },
    { months: 3, label: '3 Months', discount: 10 },
    { months: 6, label: '6 Months', discount: 15 },
    { months: 12, label: '12 Months', discount: 25 }
  ];

  const handleDurationChange = (months: number) => {
    onOptionsChange({
      ...options,
      durationMonths: months
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <EnhancedPricingHero />

      {/* Duration Switch */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Duration</h2>
        
        <div className="flex flex-wrap justify-center gap-3">
          {durationOptions.map((option) => (
            <Button
              key={option.months}
              variant={options.durationMonths === option.months ? "default" : "outline"}
              onClick={() => handleDurationChange(option.months)}
              className={`relative ${
                options.durationMonths === option.months 
                  ? 'bg-purple-600 hover:bg-purple-700' 
                  : 'hover:bg-purple-50'
              }`}
            >
              {option.label}
              {option.discount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1 py-0">
                  -{option.discount}%
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {options.durationMonths === 12 && (
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-green-600 font-semibold"
          >
            🔒 Lock in this special price for a year!
          </motion.p>
        )}
      </motion.div>

      {/* Pricing Cards */}
      <EnhancedPricingCards
        selectedTier={selectedTier}
        onTierSelect={onTierSelect}
        options={options}
        diamondSpotsLeft={diamondSpotsLeft}
        onProceed={onProceed}
      />

      {/* Nationwide & Auto-Renew Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-6"
      >
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6 space-y-6">
            <h3 className="text-lg font-semibold text-center text-gray-900">
              Power-Up Your Listing
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nationwide Visibility */}
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Globe className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Nationwide Visibility</p>
                    <p className="text-sm text-gray-600">Reach talent across all 50 states</p>
                  </div>
                </div>
                <Switch
                  checked={nationwideEnabled}
                  onCheckedChange={setNationwideEnabled}
                />
              </div>

              {/* Auto-Renew */}
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <RotateCcw className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Auto-Renew</p>
                    <p className="text-sm text-gray-600">Never miss top talent</p>
                  </div>
                </div>
                <Switch
                  checked={autoRenewEnabled}
                  onCheckedChange={setAutoRenewEnabled}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FOMO Slot Tracker */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-wrap justify-center items-center gap-6 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4"
        >
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-semibold text-orange-800">12 slots left this week</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-red-600" />
            <span className="text-sm font-semibold text-red-800">High demand</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-mono font-bold text-purple-800">23:45:12</span>
          </div>
        </motion.div>

        {/* Proceed Button */}
        <div className="text-center">
          <Button
            onClick={onProceed}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Continue with {selectedTier === 'free' ? 'Free' : 
                         selectedTier === 'gold' ? 'Professional' :
                         selectedTier === 'premium' ? 'Business Elite' : 'Diamond Exclusive'} Plan
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedPricingSection;
