
import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface VietnameseContentProps {
  itemVariants: any;
}

const VietnameseContent = ({ itemVariants }: VietnameseContentProps) => {
  const benefits = [
    "Tìm tiệm đang tuyển dụng ngay bây giờ",
    "Kết nối với cơ hội thuê booth",
    "Khám phá các tiệm đang bán",
    "Được trả lương xứng đáng với giá trị của bạn"
  ];

  return (
    <div className="space-y-8">
      <motion.h3 
        className="text-3xl md:text-4xl font-playfair font-bold text-gray-800"
        variants={itemVariants}
      >
        Mảnh Ghép Còn Thiếu Của Bạn Trong Ngành Làm Đẹp
      </motion.h3>
      
      <motion.p 
        className="text-lg text-gray-600"
        variants={itemVariants}
      >
        Kết nối các chuyên gia làm đẹp tài năng với cơ hội hoàn hảo của họ chưa bao giờ dễ dàng hơn thế. Cho dù bạn đang tìm kiếm để tham gia vào một đội ngũ hoặc tìm kiếm nhân viên ngôi sao tiếp theo của mình, chúng tôi đã tạo ra nền tảng mà ngành làm đẹp đang chờ đợi.
      </motion.p>
      
      <div className="space-y-3">
        {benefits.map((benefit, index) => (
          <motion.div 
            key={index}
            className="flex items-start"
            variants={itemVariants}
          >
            <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{benefit}</span>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="pt-4"
        variants={itemVariants}
      >
        <Link to="/sign-up">
          <Button size="lg" className="group">
            Tham Gia EmviApp Ngay Hôm Nay
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default VietnameseContent;
