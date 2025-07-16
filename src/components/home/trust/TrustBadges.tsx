import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Award, CheckCircle2, Star, Zap } from 'lucide-react';

const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      title: 'SSL Secure',
      subtitle: 'Bank-level encryption',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Lock,
      title: 'Privacy Protected',
      subtitle: 'GDPR Compliant',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Award,
      title: 'Top Rated',
      subtitle: '4.9/5 Stars',
      color: 'text-amber-500',
      bgColor: 'bg-amber-50'
    },
    {
      icon: CheckCircle2,
      title: 'Verified Platform',
      subtitle: 'Trusted by thousands',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          className={`flex items-center space-x-3 ${badge.bgColor} rounded-full px-4 py-2 shadow-sm border border-white/40`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <badge.icon className={`h-5 w-5 ${badge.color}`} />
          <div>
            <div className={`text-sm font-semibold ${badge.color} font-inter`}>
              {badge.title}
            </div>
            <div className="text-xs text-muted-foreground font-inter">
              {badge.subtitle}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TrustBadges;