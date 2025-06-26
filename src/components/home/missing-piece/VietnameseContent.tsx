
import React from "react";
import { motion } from "framer-motion";

const VietnameseContent = () => {
  const contentBlocks = [
    {
      title: "🎯 Dành Cho Salon & Spa",
      content: "Tìm kiếm nghệ sĩ tài năng, quản lý lịch hẹn, và phát triển doanh nghiệp với công nghệ AI thông minh và hệ thống đặt lịch tiện lợi."
    },
    {
      title: "💅 Dành Cho Nghệ Sĩ Làm Đẹp",
      content: "Trưng bày portfolio, kết nối với khách hàng, và xây dựng thương hiệu cá nhân trong khi gia tăng thu nhập qua mạng lưới cao cấp của chúng tôi."
    },
    {
      title: "✨ Dành Cho Người Yêu Làm Đẹp",
      content: "Khám phá những nghệ sĩ tuyệt vời, đặt lịch dịch vụ ngay lập tức, và tận hưởng trải nghiệm làm đẹp được cá nhân hóa riêng cho bạn."
    }
  ];

  return (
    <>
      {contentBlocks.map((block, index) => (
        <motion.div
          key={index}
          className="group relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          whileHover={{ 
            scale: 1.02,
            y: -5,
            transition: { duration: 0.3 }
          }}
        >
          {/* Premium Glassmorphism Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/20 via-white/10 to-transparent backdrop-blur-xl border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 p-8 md:p-10 min-h-[280px] md:min-h-[320px] flex flex-col justify-center">
            {/* Floating Sparkle Corner */}
            <motion.div
              className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full opacity-60"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 0.9, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5,
              }}
            />
            
            {/* Gradient Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-pink-400/5 to-purple-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Gold Border Shimmer */}
            <div className="absolute inset-0 rounded-3xl border border-gradient-to-r from-yellow-400/20 via-pink-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="relative z-10 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                {block.title}
              </h3>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
                {block.content}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default VietnameseContent;
