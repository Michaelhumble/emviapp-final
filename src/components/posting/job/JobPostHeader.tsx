
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

const JobPostHeader: React.FC = () => {
  const { isVietnamese } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto mb-10 text-center">
      <h1 className="text-3xl md:text-4xl font-playfair font-semibold mb-3 text-gray-900">
        {isVietnamese ? "Đăng Tin Tuyển Dụng" : "Post a Job"}
      </h1>
      
      <p className="text-lg text-gray-600 mb-3 max-w-2xl mx-auto">
        {isVietnamese 
          ? "Cách nhanh nhất để kết nối với những chuyên gia làm đẹp giỏi nhất. Tin đăng sớm sẽ được nhiều thợ giỏi nhìn thấy và nhận được nhiều hồ sơ chất lượng hơn."
          : "The fastest way to connect with the best beauty professionals. Jobs posted earlier get seen by more top artists and receive more high-quality applications."
        }
      </p>
      
      <p className="text-sm text-gray-500 italic max-w-xl mx-auto">
        {isVietnamese
          ? "Hệ thống ghép đôi thông minh của chúng tôi kết nối bạn với ứng viên tốt nhất trong vòng 24 giờ."
          : "Our smart matching system connects you with the best candidates within 24 hours."
        }
      </p>
    </div>
  );
};

export default JobPostHeader;
