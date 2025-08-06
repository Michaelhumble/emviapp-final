import React from 'react';
import { motion } from 'framer-motion';
import { LittleSunshineIcon } from './LittleSunshineIcon';

interface LittleSunshineButtonProps {
  onClick: () => void;
  isOpen?: boolean;
}

export const LittleSunshineButton = ({ onClick, isOpen = false }: LittleSunshineButtonProps) => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {/* Floating effect */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 blur-xl opacity-40"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Main button */}
        <motion.button
          onClick={onClick}
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 shadow-2xl border-2 border-orange-300/50 overflow-hidden"
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 40px rgba(255, 165, 0, 0.8)",
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 10px 30px rgba(255, 165, 0, 0.3)",
              "0 15px 40px rgba(255, 165, 0, 0.5)",
              "0 10px 30px rgba(255, 165, 0, 0.3)",
            ],
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/30 via-transparent to-orange-700/30" />
          
          {/* Sparkle effects */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-200 rounded-full"
                style={{
                  left: `${20 + (i * 12)}%`,
                  top: `${15 + (i % 3) * 25}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          
          {/* Icon */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <LittleSunshineIcon size={32} />
          </div>
          
          {/* Ripple effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-orange-300"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{
              scale: [1, 1.3, 1.6],
              opacity: [0, 0.5, 0],
            }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>
        
        {/* Pulsing ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-orange-400/30"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        
        {/* Notification dot when not open */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-red-400 to-red-600 rounded-full border-2 border-white shadow-lg"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="absolute inset-1 bg-red-300 rounded-full" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default LittleSunshineButton;