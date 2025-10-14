import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import PremiumBackground from './PremiumBackground';
import { prefersReducedMotion } from '@/utils/featureFlags';

const AffiliateHero = () => {
  const reduced = prefersReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[hsl(var(--emvi-pearl))]">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <PremiumBackground />
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
            <Badge className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-100 transition-colors">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
              💰 Now Accepting New Affiliates
            </Badge>
          </motion.div>

          {/* Hero Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.3 }}
          >
            <h1 className="text-[28px] leading-[34px] md:text-[44px] md:leading-[52px] font-semibold tracking-[-0.01em] text-[hsl(var(--ink-900))] text-center max-w-[22ch] mx-auto">
              Earn monthly payouts for growing the beauty community
            </h1>
            <p className="mt-4 text-[16px] leading-[26px] text-[hsl(var(--ink-600))] text-center max-w-[42ch] mx-auto">
              Transparent commissions, real-time tracking, Stripe Connect payouts.
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
              className="group relative rounded-xl px-6 py-4 font-medium text-white min-w-[160px] h-12
                         bg-gradient-to-r from-violet-600 to-fuchsia-500
                         shadow-lg shadow-fuchsia-500/20
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2
                         transition-transform motion-safe:hover:-translate-y-0.5 touch-manipulation
                         flex items-center justify-center"
            >
              <span className="relative">Join Now</span>
              <span className="pointer-events-none absolute inset-0 rounded-xl
                               opacity-0 group-hover:opacity-100 transition
                               bg-white/10" />
            </Link>

            <a
              href="#how-it-works"
              className="rounded-xl px-6 py-4 font-medium min-w-[160px] h-12
                         border border-black/10 bg-white/70 backdrop-blur-md
                         text-[hsl(var(--ink-900))]
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 touch-manipulation
                         flex items-center justify-center"
            >
              How it works
            </a>
          </motion.div>

          {/* Trust Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.5 }}
          >
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-[hsl(var(--ink-600))]">
              <li className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-violet-400/70 shrink-0" />
                <span className="whitespace-nowrap">Stripe Connect</span>
              </li>
              <li className="opacity-40 hidden sm:block">•</li>
              <li className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-400/70 shrink-0" />
                <span className="whitespace-nowrap">Transparent analytics</span>
              </li>
              <li className="opacity-40 hidden sm:block">•</li>
              <li className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70 shrink-0" />
                <span className="whitespace-nowrap">24/7 tracking</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AffiliateHero;