import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Zap } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const LiveStatsBar = () => {
  const stats = [
    {
      icon: DollarSign,
      value: 2400000,
      prefix: '$',
      suffix: 'M',
      label: 'Paid to affiliates',
      color: 'from-emerald-500 to-green-500',
    },
    {
      icon: Users,
      value: 1247,
      prefix: '',
      suffix: '',
      label: 'Active affiliates',
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: TrendingUp,
      value: 3240,
      prefix: '$',
      suffix: '',
      label: 'Avg monthly earnings',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Zap,
      value: 42,
      prefix: '$',
      suffix: '',
      label: 'Earned last hour',
      color: 'from-fuchsia-500 to-pink-500',
      animate: true,
    },
  ];

  return (
    <div className="border-b border-black/5 bg-gradient-to-r from-violet-50/50 via-purple-50/30 to-fuchsia-50/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center gap-3 md:gap-4"
              >
                {/* Icon */}
                <div className={`relative shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  {stat.animate && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-fuchsia-500"></span>
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-1">
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      className="text-xl md:text-2xl font-bold text-[hsl(var(--ink-900))] tabular-nums"
                    />
                  </div>
                  <p className="text-xs md:text-sm text-[hsl(var(--ink-600))] truncate">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LiveStatsBar;
