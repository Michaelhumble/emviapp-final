import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Award, Crown, TrendingUp, Users, DollarSign } from 'lucide-react';

const TierShowcase = () => {
  const tiers = [
    {
      name: 'Bronze',
      icon: Award,
      color: 'from-amber-600 to-orange-600',
      bgColor: 'from-amber-50 to-orange-50',
      requirement: '0-9 conversions/month',
      commission: '30%',
      perks: ['Real-time tracking', 'Basic support', 'Marketing assets'],
    },
    {
      name: 'Silver',
      icon: Star,
      color: 'from-gray-400 to-gray-600',
      bgColor: 'from-gray-50 to-slate-50',
      requirement: '10-24 conversions/month',
      commission: '32%',
      perks: ['Priority email support', 'Custom campaign links', 'Performance insights'],
    },
    {
      name: 'Gold',
      icon: Trophy,
      color: 'from-yellow-400 to-amber-500',
      bgColor: 'from-yellow-50 to-amber-50',
      requirement: '25-49 conversions/month',
      commission: '35%',
      perks: ['Priority DM support', 'Dedicated success manager', 'Early feature access', 'Co-marketing opportunities'],
      highlight: true,
    },
    {
      name: 'Platinum',
      icon: Crown,
      color: 'from-purple-500 to-fuchsia-600',
      bgColor: 'from-purple-50 to-fuchsia-50',
      requirement: '50+ conversions/month',
      commission: '40%',
      perks: ['VIP support line', 'Custom payout terms', 'Exclusive events', 'Revenue share opportunities'],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50/20 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-700 text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Performance Tiers
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Grow Your Earnings as You Succeed
          </h2>
          <p className="text-lg text-[hsl(var(--ink-600))] max-w-2xl mx-auto">
            Unlock higher commissions and exclusive perks as you scale your referrals
          </p>
        </motion.div>

        {/* Tier Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative group ${
                  tier.highlight ? 'md:scale-105 z-10' : ''
                }`}
              >
                <div className={`relative h-full p-6 rounded-2xl border-2 
                                ${tier.highlight 
                                  ? 'border-violet-300 shadow-2xl shadow-violet-500/20' 
                                  : 'border-black/10 hover:border-black/20'
                                }
                                bg-gradient-to-br ${tier.bgColor}
                                transition-all duration-300
                                hover:shadow-xl hover:-translate-y-2`}>
                  
                  {/* Popular badge */}
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-xs font-semibold shadow-lg">
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl
                                   bg-gradient-to-br ${tier.color}
                                   shadow-lg mb-4
                                   group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Tier name */}
                  <h3 className="text-2xl font-bold text-[hsl(var(--ink-900))] mb-2">
                    {tier.name}
                  </h3>

                  {/* Requirement */}
                  <p className="text-sm text-[hsl(var(--ink-600))] mb-4">
                    {tier.requirement}
                  </p>

                  {/* Commission */}
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-black/10">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                      <span className="text-2xl font-bold text-[hsl(var(--ink-900))]">
                        {tier.commission}
                      </span>
                      <span className="text-sm text-[hsl(var(--ink-600))]">
                        commission
                      </span>
                    </div>
                  </div>

                  {/* Perks */}
                  <div className="space-y-2.5">
                    {tier.perks.map((perk, perkIndex) => (
                      <div key={perkIndex} className="flex items-start gap-2">
                        <div className={`shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${tier.color} 
                                       flex items-center justify-center mt-0.5`}>
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm text-[hsl(var(--ink-700))] leading-snug">
                          {perk}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-violet-50 via-purple-50 to-fuchsia-50 border border-violet-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <Users className="w-8 h-8 mx-auto mb-2 text-violet-600" />
              <div className="text-3xl font-bold text-[hsl(var(--ink-900))] mb-1">
                42%
              </div>
              <div className="text-sm text-[hsl(var(--ink-600))]">
                of affiliates reach Silver+ in 90 days
              </div>
            </div>
            <div>
              <Trophy className="w-8 h-8 mx-auto mb-2 text-violet-600" />
              <div className="text-3xl font-bold text-[hsl(var(--ink-900))] mb-1">
                $8,400
              </div>
              <div className="text-sm text-[hsl(var(--ink-600))]">
                average Gold tier monthly earnings
              </div>
            </div>
            <div>
              <Crown className="w-8 h-8 mx-auto mb-2 text-violet-600" />
              <div className="text-3xl font-bold text-[hsl(var(--ink-900))] mb-1">
                $18K+
              </div>
              <div className="text-sm text-[hsl(var(--ink-600))]">
                top Platinum affiliates earn monthly
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TierShowcase;
