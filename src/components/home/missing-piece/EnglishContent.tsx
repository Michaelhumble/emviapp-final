
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EnglishContentProps {
  itemVariants: any;
}

const EnglishContent = ({ itemVariants }: EnglishContentProps) => {
  return (
    <div className="space-y-8">
      <motion.h3 
        className="text-3xl md:text-4xl font-playfair font-bold text-gray-800"
        variants={itemVariants}
      >
        ✨ Let's Experience EmviApp Together
      </motion.h3>
      
      <motion.div 
        className="space-y-6"
        variants={itemVariants}
      >
        <div className="bg-purple-50 rounded-2xl p-6 border-l-4 border-purple-400">
          <h4 className="text-xl font-bold text-purple-800 mb-3">Your Business, Supercharged</h4>
          <p className="text-gray-700 leading-relaxed">
            We help bring customers straight to your salon. Our platform connects you with skilled technicians, delivers irresistible offers, and streamlines shop management — all in one elegant solution.
          </p>
        </div>

        <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-400">
          <p className="text-gray-700">
            <span className="font-semibold text-blue-800">EmviApp's intelligent AI handles the complex work</span> — so you can focus on your passion and growing your business.
          </p>
        </div>

        <div className="bg-orange-50 rounded-2xl p-6 border-l-4 border-orange-400">
          <p className="text-gray-700">
            Without EmviApp, you might be missing out on opportunities that your competitors are already embracing. 😔
          </p>
        </div>
      </motion.div>
      
      <motion.div 
        className="pt-4"
        variants={itemVariants}
      >
        <Link to="/auth/signup">
          <Button size="lg" className="group">
            Try it now and experience the difference →
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default EnglishContent;
