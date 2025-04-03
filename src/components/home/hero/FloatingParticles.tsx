
import { motion } from "framer-motion";

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-20">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-white/30 backdrop-blur-sm shadow-lg"
          initial={{ 
            x: Math.random() * 100 + (i % 2 === 0 ? -50 : 50), 
            y: Math.random() * 100 + 600,
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.3
          }}
          animate={{ 
            y: Math.random() * -600 - 100,
            x: Math.random() * 50 * (i % 2 === 0 ? -1 : 1) + (i * 30),
          }}
          transition={{ 
            duration: Math.random() * 15 + 15, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
