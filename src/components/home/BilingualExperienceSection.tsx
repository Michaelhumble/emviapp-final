
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useIsMobile } from '@/hooks/use-mobile';

const BilingualExperienceSection = () => {
  const { lang, setLanguage } = useTranslation();
  const [isVietnamese, setIsVietnamese] = useState(lang === 'vi');
  const isMobile = useIsMobile();

  const handleLanguageToggle = () => {
    const newLanguage = isVietnamese ? 'en' : 'vi';
    setIsVietnamese(!isVietnamese);
    setLanguage(newLanguage);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 } 
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-white via-purple-50/20 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Shared Title Section */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -right-8 -top-6 md:-top-8 md:-right-10">
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-purple-500 opacity-80" />
            </div>
            <h2 className="font-playfair font-bold text-2xl md:text-4xl bg-gradient-to-r from-purple-600 to-pink-400 bg-clip-text text-transparent mb-3">
              Let's Experience EmviApp Together ✨
            </h2>
            <div className="h-1 bg-gradient-to-r from-purple-600 to-pink-400 w-full rounded-full" />
          </motion.div>
        </div>
        
        {/* Content Block with Language Toggle */}
        <div className="max-w-4xl mx-auto">
          {/* English Content */}
          {!isVietnamese && (
            <motion.div
              key="english"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={cardVariants}
              className="space-y-8"
            >
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-purple-100/50 hover:shadow-md transition-shadow">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-purple-600">Your Business, Supercharged</h3>
                <p className="text-gray-700 leading-relaxed">
                  We help bring customers straight to your salon.
                  Our platform connects you with skilled technicians, delivers irresistible offers, and streamlines shop management — all in one elegant solution.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-white p-6 md:p-8 rounded-xl shadow-sm border border-purple-100/30 hover:shadow-md transition-shadow">
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-medium">EmviApp's intelligent AI handles the complex work —</span> so you can focus on your passion and growing your business.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-white to-pink-50 p-6 md:p-8 rounded-xl shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-medium">Without EmviApp, you might be missing out on opportunities</span> that your competitors are already embracing. 😢
                </p>
              </div>
              
              <div className="text-center mt-12">
                <Link to="/how-it-works">
                  <Button 
                    size={isMobile ? "default" : "lg"} 
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-6 text-lg shadow-md rounded-xl hover:shadow-lg transition-all"
                  >
                    Try it now and experience the difference →
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
          
          {/* Vietnamese Content */}
          {isVietnamese && (
            <motion.div
              key="vietnamese"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={cardVariants}
              className="space-y-8"
            >
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-purple-100/50 hover:shadow-md transition-shadow">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-purple-600">Kinh Doanh Của Bạn, Được Nâng Cấp</h3>
                <p className="text-gray-700 leading-relaxed">
                  Chúng tôi giúp bạn mang khách hàng đến tận tiệm.
                  Giúp bạn tìm những thợ giỏi, có kinh nghiệm, và đưa ra những ưu đãi tốt nhất —
                  để bạn quản lý tiệm dễ dàng và đạt hiệu quả cao.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-white p-6 md:p-8 rounded-xl shadow-sm border border-purple-100/30 hover:shadow-md transition-shadow">
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-medium">Hãy để A.I thông minh của EmviApp lo mọi thứ cho bạn —</span> bạn chỉ cần tập trung làm điều mình yêu thích và phát triển sự nghiệp của mình.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-white to-pink-50 p-6 md:p-8 rounded-xl shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-medium">Nếu bạn không dùng thử EmviApp...</span> Chắc chắn bạn đang bỏ lỡ một công nghệ có thể giải quyết rất nhiều việc cùng một lúc. 😢
                </p>
              </div>
              
              <div className="text-center mt-12">
                <Link to="/how-it-works">
                  <Button 
                    size={isMobile ? "default" : "lg"} 
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-5 md:px-8 md:py-6 md:text-lg shadow-md rounded-xl hover:shadow-lg transition-all"
                  >
                    Hãy cùng nhau trải nghiệm những điều thú vị mà EmviApp mang đến cho bạn — ngay bây giờ →
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
          
          {/* Language Toggle Button */}
          <div className="flex justify-center mt-10">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLanguageToggle}
              className="flex items-center gap-2 border-purple-200 hover:bg-purple-50 transition-colors text-purple-700 px-4 py-2 rounded-full"
            >
              <Globe className="h-4 w-4 text-purple-500" />
              <span>
                {isVietnamese ? 'Switch to English' : 'Chuyển sang tiếng Việt'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BilingualExperienceSection;
