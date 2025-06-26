
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getLanguagePreference, addLanguageChangeListener } from "@/utils/languagePreference";

const FounderMessage = () => {
  const [language, setLanguage] = useState<"en" | "vi">(getLanguagePreference());

  useEffect(() => {
    const removeListener = addLanguageChangeListener((newLanguage) => {
      setLanguage(newLanguage);
    });
    
    return removeListener;
  }, []);

  const content = {
    en: {
      title: "✨ Founder's Message",
      message: `We see the long hours, the sacrifice, and the quiet strength it takes to keep a salon or beauty business thriving. We know every owner, artist, and technician faces struggles most people never see—from the pressure to provide for loved ones, to the challenge of keeping customers happy, to the worry of staying ahead in a changing industry.

We also understand the customers—those who have trusted, hoped, and sometimes felt disappointed when things didn't go as planned. Every person in this community deserves to be seen, respected, and supported, whether you're behind the chair or searching for the right service.

EmviApp was built out of true empathy for the entire beauty industry. We honor the real stories, the hard work, and the big dreams that drive us all forward. This is more than just a platform—it's a place where you belong, where your efforts are valued, and where opportunity is created for everyone.

Thank you for being part of this community. Together, we are changing the beauty industry for the better.`,
      signature: "— The EmviApp Team"
    },
    vi: {
      title: "✨ Thông Điệp Nhà Sáng Lập",
      message: `Chúng tôi nhìn thấy những giờ làm việc dài, những hy sinh lặng lẽ, và nghị lực kiên cường của các chủ tiệm, nghệ sĩ, và kỹ thuật viên trong ngành làm đẹp. Chúng tôi hiểu mỗi người phải đối mặt với bao thử thách mà người ngoài không bao giờ cảm nhận hết—từ áp lực lo cho gia đình, giữ khách hàng hài lòng, đến nỗi lo phải luôn đổi mới để tồn tại.

Chúng tôi cũng rất hiểu cảm giác của khách hàng—những người luôn mong đợi, tin tưởng, nhưng đôi khi lại thất vọng vì không tìm được nơi phù hợp. Mỗi thành viên trong cộng đồng này đều xứng đáng được lắng nghe, tôn trọng, và hỗ trợ—dù bạn là người phục vụ hay đang tìm kiếm dịch vụ tốt nhất.

EmviApp được tạo ra bằng sự đồng cảm sâu sắc với toàn bộ ngành làm đẹp. Chúng tôi trân trọng những câu chuyện thật, sự chăm chỉ và những ước mơ lớn của tất cả mọi người. Đây không chỉ là một nền tảng—mà là nơi bạn thực sự thuộc về, nơi mọi nỗ lực đều được ghi nhận và cơ hội được trao cho tất cả.

Cảm ơn bạn đã trở thành một phần của cộng đồng này. Cùng nhau, chúng ta sẽ làm ngành làm đẹp tốt đẹp hơn mỗi ngày.`,
      signature: "— Đội ngũ EmviApp"
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-200/10 via-pink-200/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tr from-indigo-200/10 via-blue-200/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating sparkles */}
        <div className="absolute top-20 left-1/4 text-yellow-300/60 animate-pulse text-2xl">✨</div>
        <div className="absolute top-32 right-1/3 text-purple-300/40 animate-pulse text-xl" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-32 left-1/3 text-pink-300/50 animate-pulse text-lg" style={{ animationDelay: '2.5s' }}>✨</div>
        <div className="absolute bottom-20 right-1/4 text-indigo-300/40 animate-pulse text-xl" style={{ animationDelay: '3.5s' }}>✨</div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Section Title */}
        <motion.h2 
          className="text-4xl md:text-5xl font-bold font-playfair mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {content[language].title}
        </motion.h2>

        {/* Main message card */}
        <motion.div 
          className="relative group"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Glassmorphism card */}
          <div 
            className="relative bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/30 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400/30 via-pink-300/30 to-indigo-400/30 p-[2px] group-hover:from-purple-400/50 group-hover:via-pink-300/50 group-hover:to-indigo-400/50 transition-all duration-500">
              <div className="h-full w-full rounded-3xl bg-white/10 backdrop-blur-xl" />
            </div>
            
            {/* Subtle grid pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}></div>
            
            <div className="relative z-10">
              {/* Message content */}
              <motion.div
                key={language}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-6"
              >
                <p className="text-lg md:text-xl leading-relaxed text-gray-700 font-medium">
                  {content[language].message.split('\n\n').map((paragraph, index) => (
                    <span key={index} className="block mb-6 last:mb-0">
                      {paragraph}
                    </span>
                  ))}
                </p>
                
                {/* Signature */}
                <div className="pt-8 border-t border-white/20">
                  <p className="text-lg font-playfair italic text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    {content[language].signature}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderMessage;
