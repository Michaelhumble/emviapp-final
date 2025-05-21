
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { CheckCircle } from 'lucide-react';

const FoundersEarlyAccess = () => {
  const { t } = useTranslation();

  const founderFeatures = [
    {
      english: "Early access to all premium features",
      vietnamese: "Truy cập sớm vào tất cả tính năng cao cấp"
    },
    {
      english: "Lock in discounted founder pricing for life",
      vietnamese: "Khóa giá ưu đãi của người sáng lập trọn đời"
    },
    {
      english: "VIP support and feature requests",
      vietnamese: "Hỗ trợ VIP và yêu cầu tính năng"
    },
    {
      english: "Premium profile badge",
      vietnamese: "Huy hiệu hồ sơ cao cấp"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100"
    >
      {/* Left Column with Image */}
      <div className="md:col-span-1 flex items-center justify-center mb-6 md:mb-0">
        <div className="w-52 h-52 rounded-full bg-gradient-to-r from-purple-300 to-emvi-accent/50 flex items-center justify-center shadow-lg">
          <span className="font-playfair text-3xl text-white font-bold">Founder</span>
        </div>
      </div>
      
      {/* Right Column with Features */}
      <div className="md:col-span-2">
        <h3 className="text-2xl font-bold font-playfair mb-4 text-gray-800">
          {t({
            english: "Join our Founding Members Circle",
            vietnamese: "Tham gia vào Vòng tròn Thành viên Sáng lập của chúng tôi"
          })}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {t({
            english: "Be part of our journey from the beginning and enjoy exclusive founder benefits that will never be offered again.",
            vietnamese: "Hãy là một phần trong hành trình của chúng tôi ngay từ đầu và tận hưởng các lợi ích độc quyền dành cho người sáng lập sẽ không bao giờ được cung cấp lại."
          })}
        </p>
        
        <div className="space-y-3">
          {founderFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-emvi-accent flex-shrink-0" />
              <span className="text-gray-600">{t(feature)}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FoundersEarlyAccess;
