
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

const FounderMessage = () => {
  const { currentLanguage } = useTranslation();
  const isVietnamese = currentLanguage === 'vi';

  const content = {
    title: {
      english: "Founder's Message",
      vietnamese: "Thông Điệp Nhà Sáng Lập"
    },
    message: {
      english: `We see the long hours, the sacrifice, and the quiet strength it takes to keep a salon or beauty business thriving. We know every owner, artist, and technician faces struggles most people never see—from the pressure to provide for loved ones, to the challenge of keeping customers happy, to the worry of staying ahead in a changing industry.

We also understand the customers—those who have trusted, hoped, and sometimes felt disappointed when things didn't go as planned. Every person in this community deserves to be seen, respected, and supported, whether you're behind the chair or searching for the right service.

EmviApp was built out of true empathy for the entire beauty industry. We honor the real stories, the hard work, and the big dreams that drive us all forward. This is more than just a platform—it's a place where you belong, where your efforts are valued, and where opportunity is created for everyone.

Thank you for being part of this community. Together, we are changing the beauty industry for the better.`,
      vietnamese: `Chúng tôi nhìn thấy những giờ làm việc dài, những hy sinh lặng lẽ, và nghị lực kiên cường của các chủ tiệm, nghệ sĩ, và kỹ thuật viên trong ngành làm đẹp. Chúng tôi hiểu mỗi người phải đối mặt với bao thử thách mà người ngoài không bao giờ cảm nhận hết—từ áp lực lo cho gia đình, giữ khách hàng hài lòng, đến nỗi lo phải luôn đổi mới để tồn tại.

Chúng tôi cũng rất hiểu cảm giác của khách hàng—những người luôn mong đợi, tin tưởng, nhưng đôi khi lại thất vọng vì không tìm được nơi phù hợp. Mỗi thành viên trong cộng đồng này đều xứng đáng được lắng nghe, tôn trọng, và hỗ trợ—dù bạn là người phục vụ hay đang tìm kiếm dịch vụ tốt nhất.

EmviApp được tạo ra bằng sự đồng cảm sâu sắc với toàn bộ ngành làm đẹp. Chúng tôi trân trọng những câu chuyện thật, sự chăm chỉ và những ước mơ lớn của tất cả mọi người. Đây không chỉ là một nền tảng—mà là nơi bạn thực sự thuộc về, nơi mọi nỗ lực đều được ghi nhận và cơ hội được trao cho tất cả.

Cảm ơn bạn đã trở thành một phần của cộng đồng này. Cùng nhau, chúng ta sẽ làm ngành làm đẹp tốt đẹp hơn mỗi ngày.`
    },
    signature: {
      english: "— The EmviApp Team",
      vietnamese: "— Đội ngũ EmviApp"
    }
  };

  const currentContent = {
    title: isVietnamese ? content.title.vietnamese : content.title.english,
    message: isVietnamese ? content.message.vietnamese : content.message.english,
    signature: isVietnamese ? content.signature.vietnamese : content.signature.english
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Animated background sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 text-yellow-300/20 text-2xl animate-pulse">✨</div>
        <div className="absolute top-1/3 right-1/4 text-purple-300/15 text-xl animate-pulse" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-1/3 left-1/3 text-pink-300/20 text-lg animate-pulse" style={{ animationDelay: '2s' }}>✨</div>
        <div className="absolute bottom-1/4 right-1/3 text-indigo-300/15 text-xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
      </div>

      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-white to-pink-50/30"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="flex items-center justify-center gap-4 text-4xl md:text-5xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-purple-700 to-gray-800 mb-4">
            <span className="text-5xl md:text-6xl animate-pulse">✨</span>
            <span className="relative">
              {currentContent.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-full transform scale-x-100 transition-transform duration-500 origin-center"></div>
            </span>
          </h2>
        </motion.div>

        {/* Main Message Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Glassmorphism Card */}
          <div 
            className="relative bg-white/25 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/30 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
            }}
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400/20 via-pink-300/20 to-indigo-400/20 p-[1px] group-hover:from-purple-400/30 group-hover:via-pink-300/30 group-hover:to-indigo-400/30 transition-all duration-700">
              <div className="h-full w-full rounded-3xl bg-transparent" />
            </div>
            
            {/* Premium background decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/15 via-pink-200/10 to-transparent rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-200/15 via-blue-200/10 to-transparent rounded-full blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/3"></div>
            
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-3" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }}></div>
            
            <div className="relative z-10">
              {/* Message Text */}
              <div className="text-gray-700 text-lg md:text-xl leading-relaxed space-y-6 font-medium">
                {currentContent.message.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="leading-8">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              {/* Signature */}
              <div className="mt-12 pt-8 border-t border-gray-200/30">
                <p className="text-right text-lg md:text-xl font-playfair italic text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600 font-semibold">
                  {currentContent.signature}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderMessage;
