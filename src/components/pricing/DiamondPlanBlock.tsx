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
              <h3 className="text-3xl font-playfair font-bold text-foreground">Diamond Exclusive</h3>
              <p className="text-amber-600 font-inter font-semibold">Get Seen First, Get Hired Fast</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-5xl font-inter font-bold text-foreground mb-2">
              $9,999
              <span className="text-lg text-muted-foreground font-inter font-normal">/year</span>
            </div>
            <p className="text-red-600 font-inter font-bold text-lg">
              Only {spotsLeft} of {maxSpots} spots remaining
            </p>
          </div>

          <div className="space-y-4 mb-6 text-left">
            {[
              { icon: Crown, text: "VIP Premium Placement: Your listing always appears first in every search" },
              { icon: Zap, text: "Maximum Visibility: All eyes on your job—most clicks, most views, every day" },
              { icon: Sparkles, text: "Priority Marketing: Featured in all EmviApp marketing emails and homepage" },
              { icon: Star, text: "Brand Prestige: Diamond badge shows your business is a leader" },
              { icon: Crown, text: "Dedicated Support: Fast help from our real team when you need it" },
              { icon: Zap, text: "Access to New Features: Be first to try all new EmviApp upgrades" }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex items-start text-foreground">
                  <IconComponent className="w-5 h-5 mr-3 mt-0.5 text-amber-500 flex-shrink-0" />
                  <span className="font-inter font-medium">{feature.text}</span>
                </div>
              );
            })}
          </div>

          <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-200">
            <p className="text-sm font-inter text-foreground leading-relaxed">
              Diamond spots are the most powerful way to hire fast, get more applicants, and become the go-to salon or studio in your area. Every visitor will see you first—guaranteed as long as you keep your spot.
            </p>
          </div>

          <Button 
            onClick={onSelectPlan}
            size="lg"
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-inter font-bold py-4 text-lg shadow-lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Apply for Diamond Status
          </Button>

          <p className="text-xs text-muted-foreground font-inter mt-4 italic">
            * Subject to approval. Limited availability.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DiamondPlanBlock;