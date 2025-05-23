
import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

interface EnglishContentProps {
  itemVariants: any;
}

const EnglishContent = ({ itemVariants }: EnglishContentProps) => {
  const { t } = useTranslation();
  
  const benefits = [
    { 
      english: "Find salons ready to hire you right now",
      vietnamese: "Tìm tiệm nail sẵn sàng tuyển dụng bạn ngay bây giờ" 
    },
    { 
      english: "Connect with booth rental opportunities", 
      vietnamese: "Kết nối với cơ hội thuê quầy" 
    },
    { 
      english: "Discover established salons for sale", 
      vietnamese: "Khám phá các tiệm nail đã thành lập đang được bán" 
    },
    { 
      english: "Get paid what you're worth", 
      vietnamese: "Được trả công xứng đáng với giá trị của bạn" 
    }
  ];

  return (
    <div className="space-y-8">
      <motion.h3 
        className="text-3xl md:text-4xl font-playfair font-bold text-gray-800"
        variants={itemVariants}
      >
        {t({
          english: "Your Missing Piece in the Beauty Industry",
          vietnamese: "Mảnh Ghép Còn Thiếu Của Bạn Trong Ngành Làm Đẹp"
        })}
      </motion.h3>
      
      <motion.p 
        className="text-lg text-gray-600"
        variants={itemVariants}
      >
        {t({
          english: "Connecting talented beauty professionals with their perfect opportunities has never been easier. Whether you're looking to join a team or find your next star employee, we've created the platform the beauty industry has been waiting for.",
          vietnamese: "Kết nối các chuyên gia làm đẹp tài năng với cơ hội hoàn hảo chưa bao giờ dễ dàng hơn thế. Cho dù bạn đang tìm kiếm để tham gia vào một đội ngũ hoặc tìm kiếm nhân viên tiếp theo xuất sắc của mình, chúng tôi đã tạo ra nền tảng mà ngành công nghiệp làm đẹp đang chờ đợi."
        })}
      </motion.p>
      
      <div className="space-y-3">
        {benefits.map((benefit, index) => (
          <motion.div 
            key={index}
            className="flex items-start"
            variants={itemVariants}
          >
            <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{t(benefit)}</span>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="pt-4"
        variants={itemVariants}
      >
        <Link to="/auth/signup">
          <Button size="lg" className="group">
            {t({
              english: "Join EmviApp Today",
              vietnamese: "Tham Gia EmviApp Ngay Hôm Nay"
            })}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default EnglishContent;
