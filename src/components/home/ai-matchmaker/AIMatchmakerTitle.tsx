
import React from "react";
import { motion } from "framer-motion";

interface AIMatchmakerTitleProps {
  language: "en" | "vi";
  itemVariants: any;
}

const AIMatchmakerTitle = ({ language, itemVariants }: AIMatchmakerTitleProps) => {
  return (
    <motion.div
      className="text-center mb-16 md:mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={itemVariants}
    >
      <div className="relative inline-block">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-gray-800 mb-6 leading-tight">
          {language === "en" ? (
            <>
              Meet Your AI Matchmaker
            </>
          ) : (
            <>
              Trải Nghiệm AI Ghép Đôi Hoàn Hảo
            </>
          )}
          <span className="inline-block ml-2 text-3xl md:text-4xl lg:text-5xl animate-pulse">✨</span>
        </h2>
        
        {/* Premium gradient underline */}
        <div 
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 rounded-full"
          style={{
            width: "65%",
            background: "linear-gradient(90deg, #8B5CF6, #EC4899, #F59E0B)",
            boxShadow: "0 2px 8px rgba(139, 92, 246, 0.4)"
          }}
        />
      </div>

      {/* Subheadline */}
      <motion.p 
        className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-5xl mx-auto mt-8 leading-relaxed font-medium"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {language === "en" ? (
          <>
            EmviApp's advanced AI doesn't just connect you—it finds your perfect match. Whether you're hiring top talent, seeking the best salons, or looking for loyal customers, our intelligent system learns what you love and delivers results you can trust. Unlock your future in beauty—instantly.
          </>
        ) : (
          <>
            AI tiên tiến của EmviApp không chỉ kết nối—mà còn tìm đúng người, đúng tiệm, đúng khách cho bạn. Chủ tiệm dễ dàng tuyển chọn thợ giỏi, nghệ sĩ tìm được môi trường mơ ước, khách hàng gặp dịch vụ tuyệt vời—tất cả trong tích tắc.
          </>
        )}
      </motion.p>
    </motion.div>
  );
};

export default AIMatchmakerTitle;
