
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import EnglishContent from "./EnglishContent";
import VietnameseContent from "./VietnameseContent";

interface ContentCardProps {
  language: "en" | "vi";
  itemVariants: any;
}

const ContentCard = ({ language, itemVariants }: ContentCardProps) => {
  const content = {
    en: {
      title: "Let's Experience EmviApp Together",
      business: {
        title: "Your Business, Supercharged",
        description: "We help bring customers straight to your salon. Our platform connects you with skilled technicians, delivers irresistible offers, and streamlines shop management — all in one elegant solution."
      },
      ai: {
        description: "EmviApp's intelligent AI handles the complex work — so you can focus on your passion and growing your business."
      },
      reminder: {
        description: "Without EmviApp, you might be missing out on opportunities that your competitors are already embracing. 😔"
      },
      cta: "Try it now and experience the difference"
    },
    vi: {
      title: "Hãy Cùng Nhau Trải Nghiệm EmviApp",
      business: {
        title: "Kinh Doanh Của Bạn, Được Nâng Cấp",
        description: "Chúng tôi giúp bạn mang khách hàng đến tận tiệm. Giúp bạn tìm những thợ giỏi, có kinh nghiệm, và đưa ra những ưu đãi tốt nhất — để bạn quản lý tiệm dễ dàng và đạt hiệu quả cao."
      },
      ai: {
        description: "Hãy để A.I thông minh của EmviApp lo mọi thứ cho bạn — bạn chỉ cần tập trung làm điều mình yêu thích và phát triển sự nghiệp của mình."
      },
      reminder: {
        description: "Nếu bạn không dùng thử EmviApp... Chắc chắn bạn đang bỏ lỡ một công nghệ có thể giải quyết rất nhiều việc cùng một lúc. 😔"
      },
      cta: "Hãy cùng nhau trải nghiệm những điều thú vị mà EmviApp mang đến cho bạn — ngay bây giờ"
    }
  };

  const currentContent = content[language];

  return (
    <div className="relative w-full">
      {/* Luxury Background with Premium Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-purple-50/90 to-pink-50/95 backdrop-blur-3xl rounded-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-purple-100/30 rounded-3xl"></div>
      
      {/* Floating Sparkle Effects */}
      <div className="absolute top-8 left-12 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-20 right-16 w-1.5 h-1.5 bg-gradient-to-r from-gold-400 to-yellow-300 rounded-full animate-bounce opacity-70"></div>
      <div className="absolute bottom-20 left-20 w-1 h-1 bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full animate-ping opacity-50"></div>
      <div className="absolute bottom-32 right-24 w-2.5 h-2.5 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full animate-pulse opacity-40"></div>

      <div className="relative z-10 px-8 py-16 md:px-16 md:py-20">
        
        {/* Hero Title with Premium Styling */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-gray-900 leading-tight mb-6">
            {currentContent.title}
            <span className="inline-block ml-3 text-5xl md:text-6xl animate-pulse">✨</span>
          </h1>
          
          {/* Premium Gradient Underline */}
          <div className="flex justify-center mb-8">
            <div className="w-32 md:w-48 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full shadow-lg"></div>
          </div>
        </motion.div>

        {/* Premium Content Cards */}
        <div className="space-y-8 max-w-5xl mx-auto">
          
          {/* Business Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-white/90 via-white/95 to-purple-50/80 backdrop-blur-2xl border border-white/40 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
              
              {/* Luxury Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-transparent to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-gray-900 mb-6 leading-tight">
                  {currentContent.business.title}
                </h3>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                  {currentContent.business.description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* AI Feature Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-white/90 via-purple-50/90 to-white/95 backdrop-blur-2xl border border-purple-200/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
              
              {/* Premium AI Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/5 via-transparent to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 p-8 md:p-12 text-center">
                <p className="text-xl md:text-2xl lg:text-3xl font-playfair font-semibold text-gray-800 leading-relaxed">
                  {currentContent.ai.description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Reminder Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-white/90 via-pink-50/80 to-white/95 backdrop-blur-2xl border border-pink-200/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
              
              {/* Subtle Warning Accent */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400/5 via-transparent to-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 p-8 md:p-12 text-center">
                <p className="text-xl md:text-2xl lg:text-3xl font-playfair font-semibold text-gray-800 leading-relaxed">
                  {currentContent.reminder.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Premium CTA Button */}
        <motion.div 
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Link to="/early-access" className="group">
            <Button 
              size="lg"
              className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-800 text-white font-semibold px-12 py-6 text-lg md:text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 border-0"
            >
              {/* Premium Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Button Sparkles */}
              <div className="absolute top-2 right-4 w-1 h-1 bg-white rounded-full animate-ping opacity-60"></div>
              <div className="absolute bottom-3 left-6 w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-80"></div>
              
              <span className="relative z-10 flex items-center gap-3">
                {currentContent.cta}
                <span className="text-2xl group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </Button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default ContentCard;
