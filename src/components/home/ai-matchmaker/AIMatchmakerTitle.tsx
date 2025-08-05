
import React from "react";
import { motion } from "framer-motion";

interface AIMatchmakerTitleProps {
  language: "en" | "vi";
  itemVariants: any;
}

const AIMatchmakerTitle = ({ language, itemVariants }: AIMatchmakerTitleProps) => {
  return (
    <motion.div
      className="text-center mb-16 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={itemVariants}
    >
      {/* Section Number Badge - Blog Style */}
      <motion.div 
        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/60 rounded-full px-4 py-2 mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="w-6 h-6 bg-purple-600 text-white text-sm font-semibold rounded-full flex items-center justify-center">
          4
        </span>
        <span className="text-purple-700 font-medium text-sm">
          {language === "en" ? "AI Matchmaking" : "Ghép Đôi AI"}
        </span>
      </motion.div>

      <div className="relative inline-block max-w-5xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6 leading-tight tracking-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {language === "en" ? (
            <>
              Meet Your{" "}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                AI Matchmaker
              </span>
            </>
          ) : (
            <>
              Trải Nghiệm{" "}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                AI Ghép Đôi Hoàn Hảo
              </span>
            </>
          )}
          <motion.span 
            className="inline-block ml-3 text-3xl md:text-4xl lg:text-5xl"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            ✨
          </motion.span>
        </motion.h2>
        
        {/* Elegant underline */}
        <motion.div 
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400"
          style={{ width: "60%" }}
          initial={{ width: "0%" }}
          whileInView={{ width: "60%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Subheadline */}
      <motion.div
        className="max-w-4xl mx-auto mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-primary">
          {language === "en" ? (
            <>
              EmviApp's advanced AI doesn't just connect you—it finds your <span className="text-purple-600 font-semibold">perfect match</span>. 
              Whether you're hiring top talent, seeking the best salons, or looking for loyal customers, our 
              intelligent system learns what you love and delivers results you can trust. 
              <span className="text-slate-800 font-medium"> Unlock your future in beauty—instantly.</span>
            </>
          ) : (
            <>
              AI tiên tiến của EmviApp không chỉ kết nối—mà còn tìm <span className="text-purple-600 font-semibold">đúng người, đúng tiệm, đúng khách</span> cho bạn. 
              Chủ tiệm dễ dàng tuyển chọn thợ giỏi, nghệ sĩ tìm được môi trường mơ ước, khách hàng gặp dịch vụ tuyệt vời—
              <span className="text-slate-800 font-medium">tất cả trong tích tắc.</span>
            </>
          )}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AIMatchmakerTitle;
