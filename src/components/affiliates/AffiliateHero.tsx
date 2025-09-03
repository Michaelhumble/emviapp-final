import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Clock, TrendingUp } from 'lucide-react';
import PremiumBackground from './PremiumBackground';
import { prefersReducedMotion } from '@/utils/featureFlags';

const AffiliateHero = () => {
  const reduced = prefersReducedMotion();

  return (
    <PremiumBackground className="relative min-h-screen flex items-center justify-center">
      {/* Hero Content Container */}
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center space-y-16">
          {/* Glass Card for Headline + Subcopy */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: reduced ? 0 : 0.8, 
              delay: reduced ? 0 : 0.3,
              type: "spring",
              stiffness: 100
            }}
            className="glass-hero-card p-12 max-w-5xl mx-auto"
          >
            {/* Main Headline */}
            <h1 className="text-hero-primary mb-8">
              <span className="block">
                Earn monthly payouts for
              </span>
              <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
                growing the beauty community
              </span>
            </h1>
            
            {/* Subcopy */}
            <p className="text-body-large text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Transparent commissions, real-time tracking, Stripe Connect payouts.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <motion.div
                whileHover={reduced ? {} : { scale: 1.02 }}
                whileTap={reduced ? {} : { scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  className="btn-magnetic focus-ring-premium bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-16 px-12 text-xl font-bold min-w-[200px] rounded-2xl shadow-2xl group"
                >
                  Join Now
                  <motion.div
                    className="ml-2"
                    animate={reduced ? {} : { x: [0, 4, 0] }}
                    transition={reduced ? {} : { duration: 1, repeat: Infinity }}
                  >
                    <ArrowRight className="h-6 w-6" />
                  </motion.div>
                </Button>
              </motion.div>
              
              <Button 
                variant="outline" 
                size="lg"
                className="h-16 px-10 text-lg font-semibold border-2 border-gray-300 hover:border-purple-500 text-gray-700 hover:text-purple-700 rounded-2xl min-w-[180px] bg-white/50 backdrop-blur-sm"
              >
                How it works
              </Button>
            </div>

            {/* Trust Row */}
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Shield className="h-3 w-3 text-green-600" />
                </div>
                <span className="font-medium">Stripe Connect</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <Shield className="h-3 w-3 text-blue-600" />
                </div>
                <span className="font-medium">Secure</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                  <Clock className="h-3 w-3 text-purple-600" />
                </div>
                <span className="font-medium">24/7 Tracking</span>
              </div>
            </div>
          </motion.div>

          {/* Enterprise Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: reduced ? 0 : 0.8, 
              delay: reduced ? 0 : 0.6 
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { icon: '💰', number: '30%', label: 'Commission Rate', sublabel: 'Recurring monthly' },
              { icon: '🚀', number: '500+', label: 'Active Affiliates', sublabel: 'Growing daily' },
              { icon: '⚡', number: '24/7', label: 'Real-time Tracking', sublabel: 'Live analytics' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: reduced ? 0 : 0.6, 
                  delay: reduced ? 0 : 0.8 + index * 0.1
                }}
                whileHover={reduced ? {} : { 
                  scale: 1.05,
                  y: -8
                }}
                className="stat-card-premium text-center p-8 group cursor-pointer"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl font-black text-gray-900 mb-3">
                  {stat.number}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {stat.label}
                </h3>
                <p className="text-gray-600">
                  {stat.sublabel}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PremiumBackground>
  );
};

export default AffiliateHero;