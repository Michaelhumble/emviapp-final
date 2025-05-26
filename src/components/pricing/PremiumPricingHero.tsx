
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield } from 'lucide-react';

const PremiumPricingHero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-blue-50/20 to-pink-50/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,107,107,0.08),transparent_50%)]" />
      </div>
      
      <div className="relative z-10 text-center py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Premium Headline */}
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            Supercharge Your Salon's
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent block">
              Success
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Choose Your Visibility Level
          </p>
          
          {/* Trust Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Every plan unlocks new ways to attract talent, win more clients, and grow your brand—
            <span className="font-semibold text-gray-800">risk-free, with no hidden fees.</span>
          </motion.p>
          
          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex items-center justify-center gap-6 mt-8"
          >
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Secure PCI-compliant checkout</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span>No hidden fees</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumPricingHero;
