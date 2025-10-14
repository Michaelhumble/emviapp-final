import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import LuxuryGradientBackground from './LuxuryGradientBackground';
import { prefersReducedMotion } from '@/utils/featureFlags';
import { Sparkles } from 'lucide-react';

const AffiliateHero = () => {
  const reduced = prefersReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-violet-50/50 via-fuchsia-50/30 to-purple-50/40">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <LuxuryGradientBackground />
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8 pt-16 pb-12 md:pt-28 md:pb-24 safe-area-padding">
        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.8 }}
          className="mx-auto max-w-[680px] md:max-w-3xl rounded-2xl md:rounded-3xl border border-white/40 bg-white/65 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-6 md:p-12"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.2 }}
            className="flex justify-center mb-8"
          >
            <Badge className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-700 border border-violet-300/50 hover:shadow-lg hover:scale-105 transition-all">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="font-semibold">Now Accepting New Partners</span>
            </Badge>
          </motion.div>

          {/* Hero Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.3 }}
          >
            <h1 className="text-[32px] leading-[38px] md:text-[52px] md:leading-[60px] font-bold tracking-[-0.02em] bg-gradient-to-r from-violet-900 via-fuchsia-800 to-purple-900 bg-clip-text text-transparent text-center max-w-[22ch] mx-auto">
              Turn your passion into monthly income
            </h1>
            <p className="mt-6 text-[17px] leading-[28px] md:text-[19px] md:leading-[30px] text-[hsl(var(--ink-700))] text-center max-w-[48ch] mx-auto font-medium">
              Join beauty professionals earning with transparent commissions, real-time analytics, and instant Stripe payouts.
            </p>
          </motion.div>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.4 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/affiliate/apply"
              className="group relative rounded-2xl px-8 py-5 font-bold text-white min-w-[180px] h-14
                         bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600 bg-size-200 bg-pos-0
                         shadow-xl shadow-violet-500/30
                         hover:bg-pos-100 hover:shadow-2xl hover:shadow-fuchsia-500/40 hover:scale-105
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2
                         transition-all duration-300 ease-out
                         flex items-center justify-center relative overflow-hidden"
            >
              <span className="relative z-10">Join Now →</span>
              
              {/* Animated glow border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 
                              blur opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
              
              {/* Inner shine effect */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
            </Link>

            <a
              href="#calculator"
              className="rounded-2xl px-8 py-5 font-semibold min-w-[180px] h-14
                         border-2 border-violet-200 bg-white/90 backdrop-blur-md
                         text-[hsl(var(--ink-900))]
                         hover:border-violet-300 hover:bg-white hover:shadow-lg hover:scale-105
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2
                         transition-all duration-300
                         flex items-center justify-center"
            >
              Calculate Earnings
            </a>
          </motion.div>

          {/* Trust Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.5 }}
          >
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-sm md:text-base text-[hsl(var(--ink-700))] font-medium">
              <li className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 shrink-0 animate-pulse" />
                <span className="whitespace-nowrap">Instant Stripe Payouts</span>
              </li>
              <li className="opacity-30 hidden sm:block text-xl">•</li>
              <li className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shrink-0 animate-pulse" />
                <span className="whitespace-nowrap">Real-Time Analytics</span>
              </li>
              <li className="opacity-30 hidden sm:block text-xl">•</li>
              <li className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 shrink-0 animate-pulse" />
                <span className="whitespace-nowrap">90-Day Attribution</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AffiliateHero;