
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import EnglishContent from "./EnglishContent";
import VietnameseContent from "./VietnameseContent";

interface ContentCardProps {
  language: "en" | "vi";
  itemVariants: any;
}

const ContentCard = ({ language, itemVariants }: ContentCardProps) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Main Hero Title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-gray-900 mb-6 leading-tight">
          {language === "en" 
            ? "Let's Experience EmviApp Together" 
            : "Hãy Trải Nghiệm EmviApp Cùng Nhau"
          } ✨
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 mx-auto rounded-full mb-8"></div>
      </motion.div>

      {/* Content Cards Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {language === "en" ? <EnglishContent /> : <VietnameseContent />}
      </div>

      {/* CTA Section */}
      <motion.div
        className="text-center pt-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Link to="/auth/signup">
          <button className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1 border-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center gap-3">
              {language === "en" 
                ? "Try it now and experience the difference" 
                : "Thử ngay và cảm nhận sự khác biệt"
              }
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ContentCard;
