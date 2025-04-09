
import { motion } from "framer-motion";

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
      {/* More floating elements for a richer visual experience */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/30 backdrop-blur-sm"
          style={{
            width: Math.random() * 18 + 5 + "px",
            height: Math.random() * 18 + 5 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
          initial={{ 
            y: Math.random() * 100 + 500,
            opacity: Math.random() * 0.5 + 0.2
          }}
          animate={{ 
            y: -100,
            x: Math.random() * 100 - 50,
          }}
          transition={{ 
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      
      {/* Add larger, more prominent floating elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`large-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-purple-300/20 to-pink-300/20 backdrop-blur-sm"
          style={{
            width: Math.random() * 80 + 40 + "px",
            height: Math.random() * 80 + 40 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
          initial={{ 
            y: Math.random() * 200 + 400,
            opacity: Math.random() * 0.3 + 0.1,
            scale: 0.8,
          }}
          animate={{ 
            y: -200,
            x: Math.random() * 150 - 75,
            scale: [0.8, 1.2, 0.9],
          }}
          transition={{ 
            duration: Math.random() * 25 + 20,
            repeat: Infinity,
            ease: "linear",
            scale: {
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
