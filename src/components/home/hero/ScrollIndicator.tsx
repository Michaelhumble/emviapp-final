
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const ScrollIndicator = () => {
  return (
    <motion.div 
      className="absolute bottom-6 md:bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/80 z-40"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <span className="text-sm font-medium mb-2 tracking-wide">Scroll to explore</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="bg-white/20 backdrop-blur-md rounded-full p-2"
      >
        <ArrowDown size={20} className="text-white" />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
