
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageToggleButton from "./LanguageToggleButton";
import ContentCard from "./ContentCard";
import SectionTitle from "./SectionTitle";
import { sparkle, tSlow, sparkleTransition } from "@/lib/motion";

const MissingPieceSection = () => {
  const { isVietnamese, toggleLanguage } = useTranslation();
  
  // Enhanced motion variants for luxury feel
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-purple-50/30 via-pink-50/20 to-orange-50/30">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 via-transparent to-pink-100/30"></div>
      <div className="absolute top-10 left-20 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 right-20 w-80 h-80 bg-gradient-to-tl from-orange-400/10 to-red-400/10 rounded-full filter blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-300/10 to-orange-300/10 rounded-full filter blur-3xl"></div>
      
      {/* Enhanced floating sparkles */}
      <motion.div
        className="absolute top-20 left-1/4 text-purple-500 text-2xl"
        variants={sparkle}
        animate="animate"
        transition={sparkleTransition}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute top-32 right-1/3 text-amber-500 text-xl"
        variants={sparkle}
        animate="animate"
        transition={{ ...sparkleTransition, delay: 2 }}
      >
        ⭐
      </motion.div>
      <motion.div
        className="absolute bottom-24 left-1/5 text-pink-500 text-2xl"
        variants={sparkle}
        animate="animate"
        transition={{ ...sparkleTransition, delay: 4 }}
      >
        💫
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Section Title */}
        <motion.div 
          className="text-center max-w-5xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">✨</span>
            </div>
            <SectionTitle 
              language={isVietnamese ? "vi" : "en"} 
              itemVariants={itemVariants} 
            />
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">✨</span>
            </div>
          </div>
        </motion.div>
        
        <div className="relative max-w-7xl mx-auto">
          {/* Blog-inspired premium container */}
          <motion.div
            className="relative rounded-3xl shadow-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.3)"
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          >
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl p-1">
              <div className="bg-white rounded-3xl h-full w-full"></div>
            </div>
            
            {/* Content with enhanced padding */}
            <div className="relative p-12 md:p-16 lg:p-20">
              <ContentCard 
                language={isVietnamese ? "vi" : "en"} 
                itemVariants={itemVariants} 
              />
            </div>
            
            {/* Enhanced decorative elements */}
            <div className="absolute top-8 left-8 w-4 h-4 bg-purple-400 rounded-full opacity-60"></div>
            <div className="absolute top-8 right-8 w-3 h-3 bg-pink-400 rounded-full opacity-60"></div>
            <div className="absolute bottom-8 left-8 w-3 h-3 bg-orange-400 rounded-full opacity-60"></div>
            <div className="absolute bottom-8 right-8 w-4 h-4 bg-yellow-400 rounded-full opacity-60"></div>
          </motion.div>
          
          {/* Enhanced language toggle with blog-style design */}
          <motion.div 
            className="absolute -bottom-6 right-6 z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-2 border border-purple-100">
              <LanguageToggleButton
                isVietnamese={isVietnamese}
                toggleLanguage={toggleLanguage}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 rounded-xl px-6 py-3 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
              />
            </div>
          </motion.div>
        </div>

        {/* Additional CTA section inspired by blog */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 p-12 rounded-3xl shadow-2xl max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {isVietnamese 
                ? "🌟 Khám Phá Sức Mạnh AI Của EmviApp" 
                : "🌟 Discover EmviApp's AI Power"
              }
            </h3>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              {isVietnamese 
                ? "Từ việc tìm kiếm công việc phù hợp đến xây dựng danh tiếng chuyên nghiệp, EmviApp sử dụng AI để kết nối bạn với những cơ hội tốt nhất trong ngành làm đẹp."
                : "From finding the perfect job match to building your professional reputation, EmviApp uses AI to connect you with the best opportunities in the beauty industry."
              }
            </p>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <a 
                href="/signup"
                className="inline-block"
              >
                <Button 
                  size="lg" 
                  className="bg-white text-purple-900 hover:bg-gray-50 font-bold px-12 py-6 rounded-2xl text-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <span className="flex items-center">
                    <span className="mr-3">
                      {isVietnamese ? "🚀 Bắt Đầu Ngay" : "🚀 Get Started Now"}
                    </span>
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </span>
                </Button>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissingPieceSection;
