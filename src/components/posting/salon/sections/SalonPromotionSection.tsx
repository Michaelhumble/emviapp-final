
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Zap, Target, Shield, Star, Clock, Eye, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { EnhancedSalonFormValues } from '../enhancedSalonFormSchema';

interface SalonPromotionSectionProps {
  onUpdate: (data: Partial<EnhancedSalonFormValues>) => void;
  onPromotionChange: (upgrades: any) => void;
  data: Partial<EnhancedSalonFormValues>;
}

export const SalonPromotionSection = ({ onUpdate, onPromotionChange, data }: SalonPromotionSectionProps) => {
  const [selectedUpgrades, setSelectedUpgrades] = useState({
    isUrgent: false,
    isFeatured: false,
    isDiamond: false
  });

  const handleUpgradeChange = (key: string, value: boolean) => {
    const newUpgrades = { ...selectedUpgrades, [key]: value };
    setSelectedUpgrades(newUpgrades);
    onPromotionChange(newUpgrades);
    onUpdate({ promotionUpgrades: newUpgrades });
  };

  const upgrades = [
    {
      id: 'isUrgent',
      name: 'Urgent Sale',
      price: '$49',
      originalPrice: '$99',
      icon: Clock,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      borderColor: 'border-orange-200',
      features: [
        '🔥 "Urgent Sale" badge',
        '⚡ Priority in search results',
        '📞 Instant buyer notifications',
        '🎯 Limited time pricing'
      ],
      description: 'Create urgency and attract serious buyers quickly',
      badge: 'Limited Time',
      savings: 'Save $50'
    },
    {
      id: 'isFeatured',
      name: 'Featured Listing',
      price: '$149',
      originalPrice: '$199',
      icon: Star,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      features: [
        '⭐ Featured on homepage',
        '📈 3x more visibility',
        '🎨 Premium design layout',
        '💌 Email marketing inclusion'
      ],
      description: 'Stand out with premium placement and design',
      badge: 'Most Popular',
      savings: 'Save $50'
    },
    {
      id: 'isDiamond',
      name: 'Diamond Exclusive',
      price: '$299',
      originalPrice: '$399',
      icon: Crown,
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'from-cyan-50 to-blue-50',
      borderColor: 'border-cyan-200',
      features: [
        '💎 Ultra-exclusive placement',
        '🔒 Confidential listing option',
        '👥 Dedicated agent support',
        '📱 VIP buyer matching',
        '🏆 Success guarantee'
      ],
      description: 'White-glove service for premium salon sales',
      badge: 'Only 2 Left',
      savings: 'Save $100'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Boost Your Salon's Visibility
        </h2>
        <p className="text-gray-600">Choose promotion options to sell faster and at better prices</p>
      </div>

      {/* Stats Banner */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">400%</div>
            <div className="text-sm text-green-700">More views with photos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">3x</div>
            <div className="text-sm text-green-700">Faster sales featured</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">$50K+</div>
            <div className="text-sm text-green-700">Average higher price</div>
          </div>
        </div>
      </div>

      {/* Upgrade Options */}
      <div className="grid gap-6">
        {upgrades.map((upgrade, index) => (
          <motion.div
            key={upgrade.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`relative overflow-hidden border-2 transition-all duration-300 ${
              selectedUpgrades[upgrade.id as keyof typeof selectedUpgrades]
                ? `${upgrade.borderColor} shadow-lg scale-105`
                : 'border-gray-200 hover:border-gray-300'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${upgrade.color}`}>
                        <upgrade.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-semibold text-gray-900">{upgrade.name}</h3>
                          <Badge className={`bg-gradient-to-r ${upgrade.color} text-white`}>
                            {upgrade.badge}
                          </Badge>
                        </div>
                        <p className="text-gray-600">{upgrade.description}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Includes:</h4>
                        <ul className="space-y-1">
                          {upgrade.features.map((feature, idx) => (
                            <li key={idx} className="text-sm text-gray-600">{feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="text-2xl font-bold text-gray-900">{upgrade.price}</span>
                            <span className="text-lg text-gray-500 line-through">{upgrade.originalPrice}</span>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {upgrade.savings}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-4">
                    <Switch
                      checked={selectedUpgrades[upgrade.id as keyof typeof selectedUpgrades]}
                      onCheckedChange={(checked) => handleUpgradeChange(upgrade.id, checked)}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-pink-600"
                    />
                  </div>
                </div>

                {/* Premium Background Effect */}
                {selectedUpgrades[upgrade.id as keyof typeof selectedUpgrades] && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${upgrade.bgColor} opacity-30 pointer-events-none`} />
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Trust Signals */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          Why Salon Owners Choose EmviApp
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Verified buyers only - no time wasters</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Secure payment processing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Professional listing support</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>NDA protection available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Success-based pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>24/7 customer support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
            ))}
          </div>
          <div>
            <div className="flex items-center gap-1 text-yellow-500">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-gray-600">From 2,847 successful salon sales</p>
          </div>
        </div>
        <blockquote className="text-gray-700 italic">
          "EmviApp helped me sell my nail salon 60% faster than expected. The Diamond package was worth every penny - I got multiple qualified offers within days!"
        </blockquote>
        <div className="text-sm text-gray-500 mt-2">- Sarah L., Sold Luxury Nails & Spa</div>
      </div>
    </div>
  );
};
