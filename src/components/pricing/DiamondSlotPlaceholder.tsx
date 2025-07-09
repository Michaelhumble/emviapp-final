import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, DollarSign, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const DiamondSlotPlaceholder = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="h-full bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300 border-dashed hover:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl">
        <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center min-h-[300px]">
          <div className="mb-4 p-4 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full">
            <Crown className="w-12 h-12 text-amber-600" />
          </div>
          
          <h3 className="text-xl font-playfair font-bold text-foreground mb-3 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-amber-500" />
            Claim Your Diamond Spot
          </h3>
          
          <p className="text-muted-foreground font-inter mb-4 text-sm leading-relaxed">
            Premium visibility for your salon, job posting, or artist profile. Get maximum exposure to our engaged community.
          </p>
          
          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-2 rounded-full font-inter font-bold text-lg mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-1" />
            $9,999/year
          </div>
          
          <div className="space-y-2 text-xs text-muted-foreground font-inter mb-4">
            <p>✓ Top position placement</p>
            <p>✓ Premium badge display</p>
            <p>✓ Maximum visibility</p>
            <p>✓ Priority support</p>
          </div>
          
          <Link to="/pricing" className="w-full">
            <Button 
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-inter font-medium"
              size="sm"
            >
              Upgrade to Diamond
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DiamondSlotPlaceholder;