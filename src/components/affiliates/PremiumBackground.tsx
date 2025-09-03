import React from 'react';
import { motion } from 'framer-motion';
import { prefersReducedMotion } from '@/utils/featureFlags';

interface PremiumBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const PremiumBackground: React.FC<PremiumBackgroundProps> = ({ 
  children, 
  className = "" 
}) => {
  const reduced = prefersReducedMotion();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Mesh Gradient Base */}
      <div 
        className="absolute inset-0 opacity-100"
        style={{
          background: `
            radial-gradient(circle at 15% 85%, hsl(267 100% 69% / 0.15) 0%, transparent 45%),
            radial-gradient(circle at 85% 15%, hsl(174 100% 65% / 0.1) 0%, transparent 45%),
            radial-gradient(circle at 45% 60%, hsl(267 100% 85% / 0.08) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, hsl(220 15% 85% / 0.06) 0%, transparent 40%),
            linear-gradient(135deg, hsl(240 100% 99%), hsl(267 78% 98%))
          `
        }}
      />

      {/* Animated Mesh Overlay */}
      {!reduced && (
        <>
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.12) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 40%, rgba(167, 139, 250, 0.1) 0%, transparent 50%)',
              ]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
          
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                'radial-gradient(circle at 60% 30%, rgba(99, 102, 241, 0.06) 0%, transparent 40%)',
                'radial-gradient(circle at 30% 70%, rgba(168, 85, 247, 0.08) 0%, transparent 45%)',
                'radial-gradient(circle at 70% 60%, rgba(14, 165, 233, 0.05) 0%, transparent 35%)',
              ]
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: 2
            }}
          />
        </>
      )}

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PremiumBackground;