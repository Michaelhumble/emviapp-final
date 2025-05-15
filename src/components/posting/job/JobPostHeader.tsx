
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const JobPostHeader: React.FC = () => {
  const { isVietnamese } = useTranslation();

  return (
    <motion.div 
      className="max-w-3xl mx-auto mb-10 text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl md:text-4xl font-playfair font-semibold mb-3 text-gray-900">
        {isVietnamese ? "Đăng Tin Tuyển Dụng" : "Post a Job"}
      </h1>
      
      <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
        {isVietnamese 
          ? "Cách nhanh nhất để kết nối với những chuyên gia làm đẹp giỏi nhất. Tin đăng sớm sẽ được nhiều thợ giỏi nhìn thấy và nhận được nhiều hồ sơ chất lượng hơn."
          : "The fastest way to connect with the best beauty professionals. Jobs posted earlier get seen by more top artists and receive more high-quality applications."
        }
      </p>
      
      <div className="flex justify-center mb-3">
        <Badge variant="secondary" className="bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1.5 px-3 py-1.5 text-sm">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span className="ml-1">{isVietnamese ? "Được tin dùng bởi 10,000+ tiệm" : "Trusted by 10,000+ businesses"}</span>
        </Badge>
      </div>
      
      <p className="text-sm text-gray-500 italic max-w-xl mx-auto">
        {isVietnamese
          ? "Hệ thống ghép đôi thông minh của chúng tôi kết nối bạn với ứng viên tốt nhất trong vòng 24 giờ."
          : "Our smart matching system connects you with the best candidates within 24 hours."
        }
      </p>
    </motion.div>
  );
};

export default JobPostHeader;
