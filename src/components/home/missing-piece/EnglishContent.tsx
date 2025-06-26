
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EnglishContentProps {
  itemVariants: any;
}

const EnglishContent = ({ itemVariants }: EnglishContentProps) => {
  return (
    <div className="space-y-12">
      <motion.div 
        className="text-center"
        variants={itemVariants}
      >
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 mb-6 flex items-center justify-center gap-4 group leading-tight">
          <span className="text-5xl md:text-6xl lg:text-7xl animate-pulse group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">✨</span>
          <span className="relative">
            Let's Experience EmviApp Together
            <div className="absolute -bottom-3 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center shadow-lg"></div>
          </span>
        </h3>
      </motion.div>
      
      <motion.div 
        className="space-y-8"
        variants={itemVariants}
      >
        <motion.div 
          className="bg-gradient-to-br from-purple-50/90 to-purple-100/70 backdrop-blur-sm rounded-3xl p-8 border border-purple-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'linear-gradient(135deg, rgba(248,250,252,0.95) 0%, rgba(243,232,255,0.8) 50%, rgba(254,249,195,0.7) 100%)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 40px -12px rgba(139, 92, 246, 0.15), 0 0 0 1px rgba(139, 92, 246, 0.1)'
          }}
        >
          <div className="flex items-start gap-4">
            <div className="w-1.5 h-20 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full flex-shrink-0 shadow-lg"></div>
            <div>
              <h4 className="text-2xl font-bold text-purple-900 mb-4 font-playfair">Your Business, Supercharged</h4>
              <p className="text-gray-800 leading-relaxed text-lg">
                We help bring customers straight to your salon. Our platform connects you with skilled technicians, delivers irresistible offers, and streamlines shop management — all in one elegant solution.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-blue-50/90 to-indigo-100/70 backdrop-blur-sm rounded-3xl p-8 border border-blue-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'linear-gradient(135deg, rgba(248,250,252,0.95) 0%, rgba(224,242,254,0.8) 50%, rgba(219,234,254,0.7) 100%)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 40px -12px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)'
          }}
        >
          <div className="flex items-start gap-4">
            <div className="w-1.5 h-16 bg-gradient-to-b from-blue-400 to-indigo-600 rounded-full flex-shrink-0 shadow-lg"></div>
            <div>
              <p className="text-gray-800 leading-relaxed text-lg">
                <span className="font-semibold text-blue-900 font-playfair text-xl">EmviApp's intelligent AI handles the complex work</span> — so you can focus on your passion and growing your business.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-orange-50/90 to-amber-100/70 backdrop-blur-sm rounded-3xl p-8 border border-orange-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'linear-gradient(135deg, rgba(254,252,232,0.95) 0%, rgba(254,243,199,0.8) 50%, rgba(253,230,138,0.7) 100%)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 40px -12px rgba(245, 158, 11, 0.15), 0 0 0 1px rgba(245, 158, 11, 0.1)'
          }}
        >
          <div className="flex items-start gap-4">
            <div className="w-1.5 h-16 bg-gradient-to-b from-orange-400 to-amber-600 rounded-full flex-shrink-0 shadow-lg"></div>
            <div>
              <p className="text-gray-800 leading-relaxed text-lg">
                Without EmviApp, you might be missing out on opportunities that your competitors are already embracing. 😔
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="pt-8 text-center"
        variants={itemVariants}
      >
        <Link to="/auth/signup">
          <Button 
            size="lg" 
            className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white font-bold px-12 py-6 text-lg rounded-3xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:-translate-y-2 hover:scale-105 backdrop-blur-lg border border-white/30"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 30%, #8b5cf6 60%, #a855f7 100%)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              Try it now and experience the difference 
              <span className="group-hover:translate-x-2 transition-transform duration-300 text-xl">→</span>
            </span>
            {/* Ultra-premium glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default EnglishContent;
