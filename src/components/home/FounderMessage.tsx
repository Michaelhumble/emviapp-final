
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getLanguagePreference } from '@/utils/languagePreference';

const FounderMessage: React.FC = () => {
  const [language] = useState(getLanguagePreference());

  const getText = (en: string, vi: string) => {
    return language === 'vi' ? vi : en;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div 
          className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="md:w-1/3">
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src="/lovable-uploads/fd96a86c-48b2-4b08-80dc-065fa45327f7.png" 
                  alt="EmviApp Founder" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                <span className="text-3xl">✨</span>
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">
              {getText(
                "We're Building a Better Beauty Industry Together",
                "Chúng tôi đang xây dựng một ngành công nghiệp làm đẹp tốt hơn cùng nhau"
              )}
            </h2>
            
            <div className="text-lg text-gray-700 space-y-4">
              <p>
                {getText(
                  "EmviApp was born from a simple belief: nail artists, technicians, and salon owners deserve better tools to connect, grow, and thrive.",
                  "EmviApp ra đời từ một niềm tin đơn giản: các nghệ sĩ làm móng, kỹ thuật viên và chủ salon xứng đáng có những công cụ tốt hơn để kết nối, phát triển và thịnh vượng."
                )}
              </p>
              
              <p>
                {getText(
                  "As someone who grew up in a family of nail salon entrepreneurs, I've witnessed firsthand the challenges that dedicated beauty professionals face every day. That's why we're creating a platform that truly understands and serves this community.",
                  "Là người lớn lên trong một gia đình kinh doanh tiệm làm móng, tôi đã chứng kiến trực tiếp những thách thức mà các chuyên gia làm đẹp tận tâm phải đối mặt hàng ngày. Đó là lý do tại sao chúng tôi đang tạo ra một nền tảng thực sự hiểu và phục vụ cộng đồng này."
                )}
              </p>
              
              <p className="font-medium text-primary">
                {getText(
                  "— Founder, EmviApp",
                  "— Người sáng lập, EmviApp"
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderMessage;
