
import React from "react";
import { motion } from "framer-motion";

const VietnameseContent = () => {
  const contentBlocks = [
    {
      icon: "🎯",
      title: "Dành Cho Salon & Spa",
      content: "Tìm kiếm nghệ sĩ tài năng, quản lý lịch hẹn, và phát triển doanh nghiệp với công nghệ AI thông minh và hệ thống đặt lịch tiện lợi."
    },
    {
      icon: "💅", 
      title: "Dành Cho Nghệ Sĩ Làm Đẹp",
      content: "Trưng bày portfolio, kết nối với khách hàng, và xây dựng thương hiệu cá nhân trong khi gia tăng thu nhập qua mạng lưới cao cấp của chúng tôi."
    },
    {
      icon: "✨",
      title: "Dành Cho Người Yêu Làm Đẹp", 
      content: "Khám phá những nghệ sĩ tuyệt vời, đặt lịch dịch vụ ngay lập tức, và tận hưởng trải nghiệm làm đẹp được cá nhân hóa riêng cho bạn."
    }
  ];

  return (
    <>
      {contentBlocks.map((block, index) => (
        <motion.div
          key={index}
          className="group relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          whileHover={{ 
            scale: 1.02,
            y: -8,
            transition: { duration: 0.3 }
          }}
        >
          {/* Premium Glassmorphism Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 p-10 md:p-12 min-h-[320px] md:min-h-[380px] flex flex-col justify-center">
            
            {/* Floating Sparkle Corner */}
            <motion.div
              className="absolute top-6 right-6 w-4 h-4 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5,
              }}
            />
            
            {/* Multi-layer Glow Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/8 via-pink-400/8 to-purple-400/8 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-3xl" />
            
            {/* Premium Border Shimmer */}
            <div className="absolute inset-0 rounded-3xl border border-gradient-to-r from-yellow-300/30 via-pink-300/30 to-purple-300/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="relative z-10 text-center space-y-6">
              <div className="text-4xl mb-4">{block.icon}</div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight font-playfair">
                {block.title}
              </h3>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
                {block.content}
              </p>
            </div>

            {/* Subtle Inner Glow */}
            <div className="absolute inset-2 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default VietnameseContent;
