import React from 'react';
import { Shield, Receipt, Calendar, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustBadgeRow = () => {
  const badges = [
    {
      icon: Shield,
      title: 'Verified Pros & Salons',
      description: 'All beauty professionals are verified',
      ariaLabel: 'Verified professionals and salons badge'
    },
    {
      icon: Receipt,
      title: 'No Hidden Fees',
      description: 'Transparent pricing, no surprises',
      ariaLabel: 'No hidden fees badge'
    },
    {
      icon: Calendar,
      title: 'Cancel Anytime',
      description: 'Flexible terms, cancel when needed',
      ariaLabel: 'Cancel anytime badge'
    }
  ];

  return (
    <section className="py-8" aria-label="Trust indicators">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-4xl mx-auto">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 w-full sm:w-auto"
              aria-label={badge.ariaLabel}
            >
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <badge.icon className="h-4 w-4 text-primary" />
                <Check className="h-2 w-2 text-primary absolute translate-x-2 -translate-y-1" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-foreground font-inter">
                  {badge.title}
                </div>
                <div className="text-xs text-muted-foreground font-inter">
                  {badge.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadgeRow;