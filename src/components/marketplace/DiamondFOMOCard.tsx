import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, LockIcon, ArrowRight } from 'lucide-react';

interface DiamondFOMOCardProps {
  industryName: string;
}

const DiamondFOMOCard: React.FC<DiamondFOMOCardProps> = ({ industryName }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="relative"
    >
      <Card className="h-full border-2 border-blue-300 shadow-2xl shadow-blue-200/50 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
        {/* Premium glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-30"></div>
        
        <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
          <div className="text-center">
            <Crown className="w-16 h-16 text-blue-600 mx-auto mb-3 drop-shadow-lg" />
            <p className="text-blue-800 font-bold text-xl">Your Salon Here!</p>
            <p className="text-blue-700 text-sm mt-1">Maximum Visibility Guaranteed</p>
          </div>
          <div className="absolute top-3 left-3">
            <Badge className="bg-blue-600 text-white border-0 font-bold px-3 py-1 text-sm" style={{ backgroundColor: '#2176FF' }}>
              <Crown className="w-3 h-3 mr-1" />
              Diamond
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge className="bg-red-500 text-white border-0 font-bold px-2 py-1 text-xs animate-pulse">
              1 SPOT ONLY
            </Badge>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>

        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-playfair font-bold text-foreground">
              Diamond Exclusive Available
            </h3>
            <LockIcon className="w-5 h-5 text-blue-600" />
          </div>

          <div className="bg-blue-100 rounded-lg p-4 mb-4 border border-blue-200">
            <div className="text-center">
              <p className="text-blue-800 font-bold text-lg mb-1">
                Your salon here! Unlock Diamond placement
              </p>
              <p className="text-blue-700 text-sm">
                1 spot only. Maximum visibility. Contact us to claim this exclusive spot before it's gone.
              </p>
            </div>
          </div>

          <div className="space-y-2 mb-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Crown className="w-4 h-4 mr-2 text-blue-600" />
              <span>Featured at the very top of {industryName} listings</span>
            </div>
            <div className="flex items-center">
              <Crown className="w-4 h-4 mr-2 text-blue-600" />
              <span>Premium placement on main jobs page</span>
            </div>
            <div className="flex items-center">
              <Crown className="w-4 h-4 mr-2 text-blue-600" />
              <span>Exclusive Diamond badge and styling</span>
            </div>
          </div>

          <Button 
            disabled
            className="w-full font-inter font-bold text-white transition-all duration-300 hover:scale-105" 
            style={{ backgroundColor: '#2176FF' }}
          >
            <Crown className="w-4 h-4 mr-2" />
            Apply for Diamond
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          <p className="text-xs text-center text-gray-500 mt-2 font-inter">
            Contact EmviApp team for availability
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DiamondFOMOCard;