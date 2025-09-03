import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Clock, TrendingUp } from 'lucide-react';
import PremiumBackground from './PremiumBackground';
import { prefersReducedMotion } from '@/utils/featureFlags';

const AffiliateHero = () => {
  const reduced = prefersReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[hsl(var(--emvi-pearl))] py-20 md:py-28 min-h-[560px]">
      <PremiumBackground className="absolute inset-0 -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="text-center space-y-12">
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
            className="mx-auto max-w-3xl rounded-3xl border border-white/30 bg-white/60 backdrop-blur-md shadow-lg p-8 md:p-10"
          >
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[hsl(var(--ink-900))] text-center">
              Earn monthly payouts for growing the beauty community
            </h1>
            
            {/* Subcopy */}
            <p className="mt-4 text-[hsl(var(--ink-600))] text-center max-w-2xl mx-auto">
              Transparent commissions, real-time tracking, Stripe Connect payouts.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <motion.div
                whileHover={reduced ? {} : { scale: 1.02 }}
                whileTap={reduced ? {} : { scale: 0.98 }}
              >
                <button className="relative rounded-2xl px-6 py-3 font-medium text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400">
                  Join Now
                  <motion.div
                    className="ml-2 inline-block"
                    animate={reduced ? {} : { x: [0, 4, 0] }}
                    transition={reduced ? {} : { duration: 1, repeat: Infinity }}
                  >
                    <ArrowRight className="h-5 w-5 inline" />
                  </motion.div>
                </button>
              </motion.div>
              
              <button className="rounded-2xl px-6 py-3 font-medium border border-black/10 bg-white/70 backdrop-blur-md text-[hsl(var(--ink-900))] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300">
                How it works
              </button>
            </div>

            {/* Trust Row */}
            <div className="flex items-center justify-center gap-6 text-sm text-[hsl(var(--ink-600))] flex-wrap mt-6">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="font-medium">Stripe Connect</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-black/20"></div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Secure</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-black/20"></div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-600" />
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
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
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
                  y: -4
                }}
                className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/30 shadow-md group cursor-pointer"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-[hsl(var(--ink-900))] mb-2">
                  {stat.number}
                </div>
                <h3 className="text-lg font-semibold text-[hsl(var(--ink-800))] mb-1">
                  {stat.label}
                </h3>
                <p className="text-[hsl(var(--ink-600))] text-sm">
                  {stat.sublabel}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AffiliateHero;