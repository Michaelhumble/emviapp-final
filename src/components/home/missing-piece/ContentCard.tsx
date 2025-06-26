
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-6 leading-tight">
          {language === "en" 
            ? "Let's Experience EmviApp Together" 
            : "Hãy Cùng Nhau Trải Nghiệm EmviApp"
          } ✨
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 mx-auto rounded-full mb-8"></div>
      </motion.div>

      {/* Content Sections */}
      <div className="space-y-12 mb-16">
        {/* Section 1: Business Supercharged */}
        <motion.div
          className="group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-xl border border-white/25 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <h3 className="text-2xl md:text-3xl font-bold text-white font-playfair leading-tight mb-4">
              {language === "en" 
                ? "Your Business, Supercharged" 
                : "Kinh Doanh Của Bạn, Được Nâng Cấp"
              }
            </h3>
            <p className="text-lg md:text-xl text-white/95 leading-relaxed font-medium">
              {language === "en" 
                ? "We help bring customers straight to your salon. Our platform connects you with skilled technicians, delivers irresistible offers, and streamlines shop management — all in one elegant solution."
                : "Chúng tôi giúp bạn mang khách hàng đến tận tiệm. Giúp bạn tìm những thợ giỏi, có kinh nghiệm, và đưa ra những ưu đãi tốt nhất — để bạn quản lý tiệm dễ dàng và đạt hiệu quả cao."
              }
            </p>
          </div>
        </motion.div>

        {/* Section 2: AI Block */}
        <motion.div
          className="group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gradient-to-br from-purple-600/30 via-pink-500/20 to-purple-700/30 backdrop-blur-xl border border-purple-300/30 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <p className="text-lg md:text-xl text-white/95 leading-relaxed font-medium">
              {language === "en" 
                ? "EmviApp's intelligent AI handles the complex work — so you can focus on your passion and growing your business."
                : "Hãy để A.I thông minh của EmviApp lo mọi thứ cho bạn — bạn chỉ cần tập trung làm điều mình yêu thích và phát triển sự nghiệp của mình."
              }
            </p>
          </div>
        </motion.div>

        {/* Section 3: Reminder Block */}
        <motion.div
          className="group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gradient-to-br from-orange-500/20 via-red-400/15 to-pink-500/20 backdrop-blur-xl border border-orange-300/25 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <p className="text-lg md:text-xl text-white/95 leading-relaxed font-medium">
              {language === "en" 
                ? "Without EmviApp, you might be missing out on opportunities that your competitors are already embracing. 😔"
                : "Nếu bạn không dùng thử EmviApp... Chắc chắn bạn đang bỏ lỡ một công nghệ có thể giải quyết rất nhiều việc cùng một lúc. 😔"
              }
            </p>
          </div>
        </motion.div>
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
                : "Hãy cùng nhau trải nghiệm những điều thú vị mà EmviApp mang đến cho bạn — ngay bây giờ"
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
