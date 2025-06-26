
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
                "We Understand What You're Going Through",
                "Chúng Tôi Thật Sự Thấu Hiểu Bạn"
              )}
            </h2>
            
            <div className="text-lg text-gray-700 space-y-4">
              <p>
                {getText(
                  "We see the long hours, the sacrifice, and the quiet strength it takes to keep a salon or beauty business thriving. We know every owner, artist, and technician faces struggles most people never see—from the pressure to provide for loved ones, to the challenge of keeping customers happy, to the worry of staying ahead in a changing industry.",
                  "Chúng tôi nhìn thấy những giờ làm việc dài, những hy sinh lặng lẽ, và nghị lực kiên cường của các chủ tiệm, nghệ sĩ, và kỹ thuật viên trong ngành làm đẹp. Chúng tôi hiểu mỗi người phải đối mặt với bao thử thách mà người ngoài không bao giờ cảm nhận hết—từ áp lực lo cho gia đình, giữ khách hàng hài lòng, đến nỗi lo phải luôn đổi mới để tồn tại."
                )}
              </p>
              
              <p>
                {getText(
                  "We also understand the customers—those who have trusted, hoped, and sometimes felt disappointed when things didn't go as planned. Every person in this community deserves to be seen, respected, and supported, whether you're behind the chair or searching for the right service.",
                  "Chúng tôi cũng rất hiểu cảm giác của khách hàng—những người luôn mong đợi, tin tưởng, nhưng đôi khi lại thất vọng vì không tìm được nơi phù hợp. Mỗi thành viên trong cộng đồng này đều xứng đáng được lắng nghe, tôn trọng, và hỗ trợ—dù bạn là người phục vụ hay đang tìm kiếm dịch vụ tốt nhất."
                )}
              </p>

              <p>
                {getText(
                  "EmviApp was built out of true empathy for the entire beauty industry. We honor the real stories, the hard work, and the big dreams that drive us all forward. This is more than just a platform—it's a place where you belong, where your efforts are valued, and where opportunity is created for everyone.",
                  "EmviApp được tạo ra bằng sự đồng cảm sâu sắc với toàn bộ ngành làm đẹp. Chúng tôi trân trọng những câu chuyện thật, sự chăm chỉ và những ước mơ lớn của tất cả mọi người. Đây không chỉ là một nền tảng—mà là nơi bạn thực sự thuộc về, nơi mọi nỗ lực đều được ghi nhận và cơ hội được trao cho tất cả."
                )}
              </p>

              <p>
                {getText(
                  "Thank you for being part of this community. Together, we are changing the beauty industry for the better.",
                  "Cảm ơn bạn đã trở thành một phần của cộng đồng này. Cùng nhau, chúng ta sẽ làm ngành làm đẹp tốt đẹp hơn mỗi ngày."
                )}
              </p>
              
              <p className="font-medium text-primary pt-2">
                {getText(
                  "— The EmviApp Team",
                  "— Đội ngũ EmviApp"
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
