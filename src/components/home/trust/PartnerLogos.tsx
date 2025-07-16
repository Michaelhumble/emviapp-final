import React from 'react';
import { motion } from 'framer-motion';

const PartnerLogos = () => {
  // Elegant placeholder logos with professional salon/beauty industry names
  const partners = [
    { name: 'Luxe Beauty', logo: '💎' },
    { name: 'Elite Salon Co', logo: '👑' },
    { name: 'Pure Aesthetics', logo: '✨' },
    { name: 'Professional Beauty', logo: '🏆' },
    { name: 'Prestige Studios', logo: '💫' },
    { name: 'Premium Wellness', logo: '🌟' }
  ];

  return (
    <div className="py-8">
      <motion.div 
        className="text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm text-muted-foreground font-inter font-medium">
          Trusted by industry leaders
        </p>
      </motion.div>

      <div className="relative overflow-hidden">
        <motion.div 
          className="flex space-x-8 md:space-x-12 justify-center items-center"
          animate={{ x: [-20, 20, -20] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...partners, ...partners].map((partner, index) => (
            <motion.div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm border border-white/30"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-2xl">{partner.logo}</span>
              <span className="text-sm font-medium text-muted-foreground font-inter whitespace-nowrap">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PartnerLogos;