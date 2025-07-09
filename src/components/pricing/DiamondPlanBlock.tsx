import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Zap, Sparkles, Star } from 'lucide-react';

interface DiamondPlanBlockProps {
  spotsLeft?: number;
  maxSpots?: number;
  onSelectPlan?: () => void;
}

const DiamondPlanBlock: React.FC<DiamondPlanBlockProps> = ({ 
  spotsLeft = 1, 
  maxSpots = 3,
  onSelectPlan
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mb-12"
    >
      {/* Exclusive Banner */}
      <div className="text-center mb-6">
        <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-2 text-sm font-bold border-0 shadow-lg">
          <Crown className="w-4 h-4 mr-2" />
          DIAMOND EXCLUSIVE — ONLY {maxSpots} SPOTS AVAILABLE
        </Badge>
      </div>

      <Card className="relative overflow-hidden border-2 border-gradient-to-r from-amber-400 to-yellow-500 shadow-2xl">
        {/* Premium gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50" />
        
        {/* Sparkle animations */}
        <div className="absolute top-6 right-6">
          <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
        </div>
        <div className="absolute bottom-6 left-6">
          <Star className="w-6 h-6 text-yellow-500 animate-bounce" />
        </div>

        <CardContent className="relative z-10 p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-12 h-12 text-amber-500 mr-4" />
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Diamond Exclusive</h3>
              <p className="text-amber-600 font-semibold">VIP Everything</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              $9,999
              <span className="text-lg text-gray-600 font-normal">/year</span>
            </div>
            <p className="text-red-600 font-bold text-lg">
              Only {spotsLeft} of {maxSpots} spots remaining
            </p>
          </div>

          <div className="space-y-3 mb-8 text-left">
            {[
              "🎯 VIP Premium Placement Above All Others",
              "👑 Personal Account Manager",
              "🎨 Custom Branding & White-Label Options", 
              "📊 Advanced Analytics Dashboard",
              "📞 Priority Phone Support",
              "🎪 Exclusive Industry Events Access",
              "🤝 White-glove Concierge Service",
              "⚡ Custom Integration Support"
            ].map((feature, index) => (
              <div key={index} className="flex items-center text-gray-700">
                <span className="text-lg mr-3">{feature.split(' ')[0]}</span>
                <span className="font-medium">{feature.substring(feature.indexOf(' ') + 1)}</span>
              </div>
            ))}
          </div>

          <Button 
            onClick={onSelectPlan}
            size="lg"
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold py-4 text-lg shadow-lg"
          >
            <Zap className="w-5 h-5 mr-2" />
            Apply for Diamond Status
          </Button>

          <p className="text-xs text-gray-500 mt-4 italic">
            * Subject to approval. Limited availability.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DiamondPlanBlock;