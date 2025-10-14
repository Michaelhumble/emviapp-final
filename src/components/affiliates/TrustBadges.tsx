import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, CheckCircle, CreditCard, TrendingUp } from 'lucide-react';

const TrustBadges = () => {
  const badges = [
    {
      icon: CreditCard,
      label: 'Stripe Connect',
      subtitle: 'Verified',
      color: 'from-purple-500 to-violet-600',
    },
    {
      icon: Lock,
      label: 'GDPR',
      subtitle: 'Compliant',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Shield,
      label: 'SOC 2',
      subtitle: 'Certified',
      color: 'from-emerald-500 to-green-600',
    },
    {
      icon: CheckCircle,
      label: '90-Day',
      subtitle: 'Cookie',
      color: 'from-orange-500 to-amber-600',
    },
    {
      icon: TrendingUp,
      label: '30%',
      subtitle: 'Recurring',
      color: 'from-pink-500 to-rose-600',
    },
  ];

  return (
    <div className="py-8 border-t border-black/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          {/* Header */}
          <p className="text-sm text-[hsl(var(--ink-600))] mb-6 text-center">
            Trusted by 1,247+ affiliates worldwide
          </p>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {badges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="group relative flex items-center gap-2.5 px-4 py-2.5
                             bg-white/80 backdrop-blur-sm
                             border border-black/5
                             rounded-xl
                             hover:border-black/10
                             hover:shadow-lg hover:shadow-black/5
                             transition-all duration-300
                             hover:scale-105"
                >
                  {/* Icon with gradient */}
                  <div className={`relative w-8 h-8 rounded-lg bg-gradient-to-br ${badge.color} 
                                   flex items-center justify-center
                                   shadow-md group-hover:shadow-lg transition-shadow`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[hsl(var(--ink-900))] leading-none">
                      {badge.label}
                    </span>
                    <span className="text-xs text-[hsl(var(--ink-600))] leading-none mt-0.5">
                      {badge.subtitle}
                    </span>
                  </div>

                  {/* Checkmark */}
                  <CheckCircle className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrustBadges;
