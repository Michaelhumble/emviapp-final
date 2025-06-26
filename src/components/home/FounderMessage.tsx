
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getLanguagePreference } from '@/utils/languagePreference';

const FounderMessage: React.FC = () => {
  const [language] = useState(getLanguagePreference());

  const getText = (en: string, vi: string) => {
    return language === 'vi' ? vi : en;
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Premium Background with Gradient Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-indigo-50/60 to-pink-50/80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/20"></div>
      
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating Sparkles */}
      <div className="absolute top-16 left-8 text-yellow-400 text-2xl animate-pulse opacity-60">✨</div>
      <div className="absolute top-24 right-12 text-purple-400 text-xl animate-pulse opacity-50" style={{ animationDelay: '1s' }}>✨</div>
      <div className="absolute bottom-16 left-16 text-pink-400 text-lg animate-pulse opacity-40" style={{ animationDelay: '3s' }}>✨</div>
      <div className="absolute bottom-24 right-8 text-indigo-400 text-xl animate-pulse opacity-50" style={{ animationDelay: '2s' }}>✨</div>

      <div className="container max-w-5xl mx-auto px-6">
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Main Glassmorphism Card */}
          <div className="relative group">
            {/* Animated Glow Border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 animate-pulse"></div>
            
            {/* Main Card */}
            <div 
              className="relative bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.3) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              {/* Inner Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-purple-100/10 rounded-3xl"></div>
              
              {/* Content Container */}
              <div className="relative z-10 p-8 md:p-12 lg:p-16">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                  
                  {/* Founder Image with Premium Frame */}
                  <div className="md:w-1/3 flex-shrink-0">
                    <div className="relative group">
                      {/* Animated Ring */}
                      <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 rounded-full opacity-20 blur-lg group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
                      
                      {/* Image Container */}
                      <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-white/50 shadow-2xl backdrop-blur-sm">
                        <img 
                          src="/lovable-uploads/fd96a86c-48b2-4b08-80dc-065fa45327f7.png" 
                          alt="EmviApp Team" 
                          className="w-full h-full object-cover"
                        />
                        {/* Image Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10"></div>
                      </div>
                      
                      {/* Floating Sparkle */}
                      <div className="absolute -bottom-3 -right-3 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg border border-white/50">
                        <span className="text-3xl animate-pulse">✨</span>
                      </div>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="md:w-2/3 space-y-8">
                    
                    {/* Premium Headline */}
                    <div className="relative">
                      <motion.h2 
                        className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6 relative group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-purple-700 to-gray-800 flex items-center gap-4">
                          <span className="text-5xl md:text-6xl animate-pulse opacity-80">✨</span>
                          <span className="relative">
                            {getText(
                              "We Understand What You're Going Through",
                              "Chúng Tôi Thật Sự Thấu Hiểu Bạn"
                            )}
                            {/* Luxury Underline */}
                            <div className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center opacity-60"></div>
                          </span>
                        </span>
                      </motion.h2>
                    </div>
                    
                    {/* Message Content with Premium Styling */}
                    <motion.div 
                      className="space-y-6 text-lg md:text-xl leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <p className="text-gray-700 font-medium">
                        {getText(
                          "We see the long hours, the sacrifice, and the quiet strength it takes to keep a salon or beauty business thriving. We know every owner, artist, and technician faces struggles most people never see—from the pressure to provide for loved ones, to the challenge of keeping customers happy, to the worry of staying ahead in a changing industry.",
                          "Chúng tôi nhìn thấy những giờ làm việc dài, những hy sinh lặng lẽ, và nghị lực kiên cường của các chủ tiệm, nghệ sĩ, và kỹ thuật viên trong ngành làm đẹp. Chúng tôi hiểu mỗi người phải đối mặt với bao thử thách mà người ngoài không bao giờ cảm nhận hết—từ áp lực lo cho gia đình, giữ khách hàng hài lòng, đến nỗi lo phải luôn đổi mới để tồn tại."
                        )}
                      </p>
                      
                      <p className="text-gray-700 font-medium">
                        {getText(
                          "We also understand the customers—those who have trusted, hoped, and sometimes felt disappointed when things didn't go as planned. Every person in this community deserves to be seen, respected, and supported, whether you're behind the chair or searching for the right service.",
                          "Chúng tôi cũng rất hiểu cảm giác của khách hàng—những người luôn mong đợi, tin tưởng, nhưng đôi khi lại thất vọng vì không tìm được nơi phù hợp. Mỗi thành viên trong cộng đồng này đều xứng đáng được lắng nghe, tôn trọng, và hỗ trợ—dù bạn là người phục vụ hay đang tìm kiếm dịch vụ tốt nhất."
                        )}
                      </p>

                      <p className="text-gray-700 font-medium">
                        {getText(
                          "EmviApp was built out of true empathy for the entire beauty industry. We honor the real stories, the hard work, and the big dreams that drive us all forward. This is more than just a platform—it's a place where you belong, where your efforts are valued, and where opportunity is created for everyone.",
                          "EmviApp được tạo ra bằng sự đồng cảm sâu sắc với toàn bộ ngành làm đẹp. Chúng tôi trân trọng những câu chuyện thật, sự chăm chỉ và những ước mơ lớn của tất cả mọi người. Đây không chỉ là một nền tảng—mà là nơi bạn thực sự thuộc về, nơi mọi nỗ lực đều được ghi nhận và cơ hội được trao cho tất cả."
                        )}
                      </p>

                      <p className="text-gray-700 font-medium">
                        {getText(
                          "Thank you for being part of this community. Together, we are changing the beauty industry for the better.",
                          "Cảm ơn bạn đã trở thành một phần của cộng đồng này. Cùng nhau, chúng ta sẽ làm ngành làm đẹp tốt đẹp hơn mỗi ngày."
                        )}
                      </p>
                      
                      {/* Premium Signature */}
                      <motion.div 
                        className="pt-8 relative"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded"></div>
                          <p className="font-playfair text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700">
                            {getText(
                              "— The EmviApp Team",
                              "— Đội ngũ EmviApp"
                            )}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Bottom Glow Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-purple-100/20 via-transparent to-transparent"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderMessage;
