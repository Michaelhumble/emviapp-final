
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const ScrollIndicator = () => {
  return (
    <motion.div 
      className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-300 sm:text-gray-500 z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <span className="text-xs mb-1 sm:mb-2 drop-shadow-md">Scroll to explore</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ArrowDown size={16} className="sm:w-[18px] sm:h-[18px] drop-shadow-md" />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
