
import { motion } from "framer-motion";

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 z-20 overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/30 backdrop-blur-sm"
          style={{
            width: Math.random() * 10 + 5 + "px",
            height: Math.random() * 10 + 5 + "px",
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
    </div>
  );
};

export default FloatingElements;
