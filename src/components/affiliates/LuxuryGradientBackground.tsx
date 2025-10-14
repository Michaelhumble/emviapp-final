import React from 'react';
import { motion } from 'framer-motion';

const LuxuryGradientBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: 'linear-gradient(135deg, hsl(280, 100%, 65%) 0%, hsl(320, 100%, 70%) 100%)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
        style={{
          background: 'linear-gradient(135deg, hsl(250, 100%, 70%) 0%, hsl(200, 100%, 65%) 100%)',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-10"
        style={{
          background: 'linear-gradient(135deg, hsl(330, 100%, 75%) 0%, hsl(280, 100%, 65%) 100%)',
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle mesh gradient overlay */}
      <div className="absolute inset-0 opacity-30" 
        style={{
          backgroundImage: `
            radial-gradient(at 20% 30%, hsla(280, 100%, 70%, 0.15) 0px, transparent 50%),
            radial-gradient(at 80% 20%, hsla(250, 100%, 70%, 0.12) 0px, transparent 50%),
            radial-gradient(at 40% 80%, hsla(320, 100%, 75%, 0.13) 0px, transparent 50%),
            radial-gradient(at 90% 70%, hsla(200, 100%, 70%, 0.10) 0px, transparent 50%)
          `
        }}
      />
    </div>
  );
};

export default LuxuryGradientBackground;
