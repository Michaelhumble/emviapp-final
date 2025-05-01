
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface EnglishContentProps {
  itemVariants: any;
}

const EnglishContent = ({ itemVariants }: EnglishContentProps) => {
  return (
    <div className="space-y-8">
      {/* First block - Your Business, Supercharged */}
      <motion.div 
        className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 mb-8 border border-indigo-100/50"
        variants={itemVariants}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-violet-600 mb-4 font-serif">
          Your Business, Supercharged
        </h3>
        
        <p className="text-gray-700 text-lg">
          We help bring customers straight to your salon. Our platform connects you with skilled 
          technicians, delivers irresistible offers, and streamlines shop management — all in one elegant solution.
        </p>
      </motion.div>
      
      {/* Second block - AI Features */}
      <motion.div 
        className="bg-purple-50 rounded-3xl shadow-md p-6 sm:p-8 mb-8 border border-indigo-100/50 flex gap-6 items-center"
        variants={itemVariants}
      >
        <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
          <img 
            src="/lovable-uploads/abbf3393-89b0-4cf3-974e-9004bf6486ff.png" 
            alt="AI Icon"
            className="w-8 h-8"
          />
        </div>
        <p className="text-violet-700 text-lg font-medium">
          EmviApp's intelligent AI handles the complex work — so you can focus on your passion and growing your business.
        </p>
      </motion.div>
      
      {/* Third block - Warning/Missing Out */}
      <motion.div 
        className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 mb-8 border border-indigo-100/50"
        variants={itemVariants}
      >
        <p className="text-lg">
          <span className="text-pink-500 font-medium">Without EmviApp, you might be missing out on opportunities</span>{" "}
          that your competitors are already embracing. 😔
        </p>
      </motion.div>
      
      {/* CTA Button */}
      <motion.div 
        className="pt-4 flex justify-center"
        variants={itemVariants}
      >
        <Link to="/sign-up">
          <button className="group flex items-center px-8 py-4 bg-violet-600 text-white rounded-full font-medium text-lg shadow-md hover:bg-violet-700 transition-colors">
            Try it now and experience the difference
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default EnglishContent;
