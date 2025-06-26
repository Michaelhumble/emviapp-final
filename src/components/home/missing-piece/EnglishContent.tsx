
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
      <motion.div 
        className="text-center"
        variants={itemVariants}
      >
        <h3 className="text-4xl md:text-5xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-purple-700 to-gray-800 mb-4 flex items-center justify-center gap-3 group">
          <span className="text-5xl md:text-6xl animate-pulse group-hover:scale-110 transition-transform duration-300">✨</span>
          <span className="relative">
            Let's Experience EmviApp Together
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
          </span>
        </h3>
      </motion.div>
      
      <motion.div 
        className="space-y-6"
        variants={itemVariants}
      >
        <motion.div 
          className="bg-gradient-to-br from-purple-50/80 to-purple-100/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-1 h-16 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full flex-shrink-0"></div>
            <div>
              <h4 className="text-xl font-bold text-purple-800 mb-3 font-playfair">Your Business, Supercharged</h4>
              <p className="text-gray-700 leading-relaxed">
                We help bring customers straight to your salon. Our platform connects you with skilled technicians, delivers irresistible offers, and streamlines shop management — all in one elegant solution.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-blue-50/80 to-indigo-100/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-1 h-12 bg-gradient-to-b from-blue-400 to-indigo-600 rounded-full flex-shrink-0"></div>
            <div>
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold text-blue-800 font-playfair">EmviApp's intelligent AI handles the complex work</span> — so you can focus on your passion and growing your business.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-orange-50/80 to-amber-100/60 backdrop-blur-sm rounded-2xl p-6 border border-orange-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-1 h-12 bg-gradient-to-b from-orange-400 to-amber-600 rounded-full flex-shrink-0"></div>
            <div>
              <p className="text-gray-700 leading-relaxed">
                Without EmviApp, you might be missing out on opportunities that your competitors are already embracing. 😔
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="pt-4 text-center"
        variants={itemVariants}
      >
        <Link to="/auth/signup">
          <Button 
            size="lg" 
            className="group relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-1 hover:scale-105 backdrop-blur-sm border border-white/20"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #8b5cf6 100%)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Try it now and experience the difference 
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default EnglishContent;
