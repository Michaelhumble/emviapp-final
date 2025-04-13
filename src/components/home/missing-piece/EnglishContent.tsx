
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface EnglishContentProps {
  itemVariants: any;
}

const EnglishContent = ({ itemVariants }: EnglishContentProps) => {
  return (
    <>
      <motion.div 
        className="text-center mb-10" 
        variants={itemVariants}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-6">
          <span className="bg-indigo-50 px-4 py-1 rounded-lg">Your Business, Supercharged</span>
        </h3>
        <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          <span className="font-semibold text-indigo-600">We help bring customers straight to your salon.</span>{" "}
          Our platform connects you with skilled technicians, delivers irresistible offers, and streamlines shop management — all in one elegant solution.
        </p>
      </motion.div>

      <motion.div 
        className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl mb-10 border border-indigo-100/50 shadow-inner"
        variants={itemVariants}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex-shrink-0 bg-white rounded-2xl p-4 shadow-md">
            <Sparkles size={48} className="text-indigo-600" />
          </div>
          <p className="text-xl text-gray-700 text-center md:text-left">
            <span className="font-semibold">EmviApp's intelligent AI handles the complex work —</span><br />
            so you can focus on your passion and growing your business.
          </p>
        </div>
      </motion.div>

      <motion.div 
        className="text-center" 
        variants={itemVariants}
      >
        <p className="text-xl text-gray-800 font-medium mb-8">
          Without EmviApp, you might be missing out on opportunities<br />
          that your competitors are already embracing. <span className="text-2xl">😌</span>
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="group inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Try it now and experience the difference
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowRight size={20} className="text-white" />
          </motion.div>
        </motion.button>
      </motion.div>
    </>
  );
};

export default EnglishContent;
