import React from 'react';
import { motion } from 'framer-motion';

interface LittleSunshineIconProps {
  className?: string;
  size?: number;
}

export const LittleSunshineIcon = ({ className = "", size = 24 }: LittleSunshineIconProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* Main sun circle with gradient */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 shadow-lg"
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 20px rgba(255, 165, 0, 0.3)",
            "0 0 30px rgba(255, 165, 0, 0.6)",
            "0 0 20px rgba(255, 165, 0, 0.3)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Inner glow */}
      <div className="absolute inset-1 rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 opacity-80" />
      
      {/* Face */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Eyes */}
          <div className="absolute -top-1 -left-1.5 w-1 h-1 bg-orange-800 rounded-full" />
          <div className="absolute -top-1 left-0.5 w-1 h-1 bg-orange-800 rounded-full" />
          
          {/* Smile */}
          <div className="absolute top-0.5 -left-1 w-2 h-1 border-b-2 border-orange-800 rounded-full" />
        </div>
      </div>
      
      {/* Rays */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-gradient-to-r from-orange-300 to-yellow-300"
          style={{
            width: size * 0.15,
            height: size * 0.05,
            left: '50%',
            top: '50%',
            transformOrigin: `${-size * 0.6}px 50%`,
            transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Sparkles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 bg-yellow-200 rounded-full"
          style={{
            left: `${20 + i * 25}%`,
            top: `${15 + i * 20}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
};

export default LittleSunshineIcon;