
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const ScrollIndicator = () => {
  return (
    <motion.div 
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <span className="text-xs mb-1">Scroll to explore</span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ArrowDown size={16} className="text-white/70" />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
