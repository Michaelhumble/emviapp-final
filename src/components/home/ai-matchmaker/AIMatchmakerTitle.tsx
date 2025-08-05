
import React from "react";
import { motion } from "framer-motion";

interface AIMatchmakerTitleProps {
  language: "en" | "vi";
  itemVariants: any;
}

const AIMatchmakerTitle = ({ language, itemVariants }: AIMatchmakerTitleProps) => {
  return (
    <motion.div
      className="text-center mb-12 md:mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={itemVariants}
    >
      <div className="relative inline-block max-w-5xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6 leading-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {language === "en" ? (
            <>
              Meet Your AI Matchmaker
            </>
          ) : (
            <>
              Trải Nghiệm AI Ghép Đôi Hoàn Hảo
            </>
          )}
          <motion.span 
            className="inline-block ml-3 text-2xl md:text-3xl lg:text-4xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            ✨
          </motion.span>
        </motion.h2>
        
        {/* Enhanced premium gradient underline */}
        <motion.div 
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-1 rounded-full"
          style={{
            width: "70%",
            background: "linear-gradient(90deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%)",
            boxShadow: "0 4px 12px rgba(139, 92, 246, 0.4)"
          }}
          initial={{ width: "0%" }}
          whileInView={{ width: "70%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Enhanced subheadline with better typography */}
      <motion.div
        className="max-w-4xl mx-auto mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-inter">
          {language === "en" ? (
            <>
              EmviApp's advanced AI doesn't just connect you—it finds your <em className="text-purple-600 font-semibold">perfect match</em>. 
              Whether you're hiring top talent, seeking the best salons, or looking for loyal customers, our 
              intelligent system learns what you love and delivers results you can trust. 
              <span className="text-foreground font-medium"> Unlock your future in beauty—instantly.</span>
            </>
          ) : (
            <>
              AI tiên tiến của EmviApp không chỉ kết nối—mà còn tìm <em className="text-purple-600 font-semibold">đúng người, đúng tiệm, đúng khách</em> cho bạn. 
              Chủ tiệm dễ dàng tuyển chọn thợ giỏi, nghệ sĩ tìm được môi trường mơ ước, khách hàng gặp dịch vụ tuyệt vời—
              <span className="text-foreground font-medium">tất cả trong tích tắc.</span>
            </>
          )}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AIMatchmakerTitle;
