import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, TrendingUp } from 'lucide-react';
import { prefersReducedMotion } from '@/utils/featureFlags';

const FinalCTA = () => {
  const reduced = prefersReducedMotion();

  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      {/* Full-width Gradient Background (Navy → Emerald) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900">
        {!reduced && (
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                'radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.12) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.18) 0%, transparent 50%)',
              ]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
        )}
      </div>

      <div className="relative z-10 container mx-auto px-5 md:px-6 max-w-[680px] md:max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0 : 0.8 }}
          className="space-y-8 md:space-y-12"
        >
          {/* Headline */}
          <h2 className="text-2xl md:text-hero-secondary text-white max-w-[20ch] mx-auto leading-tight">
            <span className="block">Ready to start earning</span>
            <span className="block bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              with EmviApp?
            </span>
          </h2>

          {/* Subcopy */}
          <p className="text-base md:text-body-large text-slate-200 max-w-[50ch] md:max-w-3xl mx-auto leading-relaxed">
            Join hundreds of creators already earning recurring payouts.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
            <motion.div
              whileHover={reduced ? {} : { scale: 1.02 }}
              whileTap={reduced ? {} : { scale: 0.98 }}
            >
              <Button 
                size="lg"
                className="btn-magnetic focus-ring-premium bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white h-12 md:h-16 px-8 md:px-12 text-lg md:text-xl font-bold min-w-[200px] rounded-xl md:rounded-2xl shadow-2xl group touch-manipulation"
              >
                Join Now
                <motion.div
                  className="ml-2"
                  animate={reduced ? {} : { x: [0, 4, 0] }}
                  transition={reduced ? {} : { duration: 1, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
                </motion.div>
              </Button>
            </motion.div>
            
            <Button 
              variant="outline" 
              size="lg"
              className="h-12 md:h-16 px-8 md:px-10 text-base md:text-lg font-semibold border-2 border-white/30 hover:border-emerald-400 text-white hover:text-emerald-400 rounded-xl md:rounded-2xl min-w-[180px] bg-white/10 backdrop-blur-sm hover:bg-white/20 touch-manipulation"
            >
              View Dashboard
            </Button>
          </div>

          {/* Trust Strip */}
          <div className="flex items-center justify-center gap-6 md:gap-8 text-slate-300 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <svg className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.25 8.25h19.5a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25H2.25A2.25 2.25 0 010 19.5v-9a2.25 2.25 0 012.25-2.25zM9 16.5v-4l3 2 3-2v4H9z"/>
                </svg>
              </div>
              <span className="font-medium text-sm md:text-base">Stripe</span>
            </div>
            <div className="hidden sm:block w-px h-3 md:h-4 bg-slate-500"></div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Shield className="h-3 w-3 md:h-4 md:w-4 text-blue-400" />
              </div>
              <span className="font-medium text-sm md:text-base">Secure payouts</span>
            </div>
            <div className="hidden sm:block w-px h-3 md:h-4 bg-slate-500"></div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-emerald-400" />
              </div>
              <span className="font-medium text-sm md:text-base">Transparent analytics</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;