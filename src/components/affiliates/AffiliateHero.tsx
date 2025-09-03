import React from 'react';
import { motion } from 'framer-motion';
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

      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-8 pt-20 pb-16 md:pt-28 md:pb-24">
        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.8 }}
          className="mx-auto max-w-3xl rounded-3xl border border-white/40 bg-white/65 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-8 md:p-12"
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
            <h1 className="text-[32px] leading-[40px] md:text-[44px] md:leading-[52px] font-semibold tracking-[-0.01em] text-[hsl(var(--ink-900))] text-center">
              Earn monthly payouts for growing the beauty community
            </h1>
            <p className="mt-4 text-[16px] leading-7 text-[hsl(var(--ink-600))] text-center max-w-[46ch] mx-auto">
              Transparent commissions, real-time tracking, Stripe Connect payouts.
            </p>
          </motion.div>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.4 }}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <button
              className="group relative rounded-2xl px-7 py-3.5 font-medium text-white
                         bg-gradient-to-r from-violet-600 to-fuchsia-500
                         shadow-lg shadow-fuchsia-500/20
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400
                         transition-transform motion-safe:hover:-translate-y-0.5"
            >
              <span className="relative">Join Now</span>
              <span className="pointer-events-none absolute inset-0 rounded-2xl
                               opacity-0 group-hover:opacity-100 transition
                               bg-white/10" />
            </button>

            <button
              className="rounded-2xl px-7 py-3.5 font-medium
                         border border-black/10 bg-white/70 backdrop-blur-md
                         text-[hsl(var(--ink-900))]
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
            >
              How it works
            </button>
          </motion.div>

          {/* Trust Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.5 }}
          >
            <ul className="mt-6 flex items-center justify-center gap-6 text-sm text-[hsl(var(--ink-600))]">
              <li className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-violet-400/70" />
                Stripe Connect
              </li>
              <li className="opacity-40">•</li>
              <li className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-400/70" />
                Transparent analytics
              </li>
              <li className="opacity-40">•</li>
              <li className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                24/7 tracking
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AffiliateHero;