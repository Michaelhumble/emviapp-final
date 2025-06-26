
import React from "react";
import { motion } from "framer-motion";

const VietnameseContent = () => {
  const contentBlocks = [
    {
      title: "Dành Cho Chủ Tiệm & Spa",
      content: "Tìm kiếm nghệ sĩ tài năng, quản lý lịch hẹn, và phát triển doanh nghiệp với công nghệ AI thông minh và hệ thống đặt lịch tiện lợi."
    },
    {
      title: "Dành Cho Nghệ Sĩ Làm Đẹp", 
      content: "Trưng bày portfolio, kết nối với khách hàng, và xây dựng thương hiệu cá nhân trong khi gia tăng thu nhập qua mạng lưới cao cấp của chúng tôi."
    },
    {
      title: "Dành Cho Người Yêu Làm Đẹp", 
      content: "Khám phá những nghệ sĩ tuyệt vời, đặt lịch dịch vụ ngay lập tức, và tận hưởng trải nghiệm làm đẹp được cá nhân hóa riêng cho bạn."
    }
  ];

  return (
    <>
      {contentBlocks.map((block, index) => (
        <motion.div
          key={index}
          className="group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <div className="h-full bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-xl border border-white/25 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="text-center space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white font-playfair leading-tight">
                {block.title}
              </h3>
              <p className="text-lg md:text-xl text-white/95 leading-relaxed font-medium">
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
