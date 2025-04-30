
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useIsMobile } from '@/hooks/use-mobile';

const BilingualExperienceSection = () => {
  const { lang, setLanguage } = useTranslation();
  const [isVietnamese, setIsVietnamese] = useState(lang === 'vi');
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsVietnamese(lang === 'vi');
  }, [lang]);

  const handleLanguageToggle = () => {
    const newLanguage = isVietnamese ? 'en' : 'vi';
    setIsVietnamese(!isVietnamese);
    setLanguage(newLanguage);
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      y: -10,
      transition: { duration: 0.4, ease: "easeIn" } 
    }
  };

  const cardVariants = {
    initial: { y: 10, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.15)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Improved background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-pink-50/30 -z-10" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full filter blur-3xl -z-10 opacity-70" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full filter blur-3xl -z-10 opacity-60" />

        {/* Enhanced Title Section with sparkle positioned better */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -right-8 -top-6 md:-top-8 md:-right-10">
              <Sparkles className={`w-6 h-6 md:w-8 md:h-8 text-yellow-400 opacity-90 ${!isMobile && 'animate-pulse'}`} />
            </div>
            <h2 className="font-playfair font-bold text-3xl md:text-5xl text-purple-600 mb-4">
              {isVietnamese ? 'Hãy Cùng Nhau Trải Nghiệm EmviApp' : 'Let\'s Experience EmviApp Together'}
            </h2>
            <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-400 w-full rounded-full" />
          </motion.div>
        </div>
        
        {/* Enhanced Content Block with Language Toggle */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {/* English Content */}
            {!isVietnamese && (
              <motion.div
                key="english"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
                className="space-y-8"
              >
                <motion.div
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  className="bg-gradient-to-r from-white to-purple-50/50 p-7 md:p-9 rounded-2xl shadow-sm border border-purple-100 transition-all"
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-purple-700 font-playfair">Your Business, Supercharged</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    <span className="text-purple-700 font-medium">We help bring customers straight to your salon.</span> Our platform connects you with skilled technicians, delivers irresistible offers, and streamlines shop management — all in one elegant solution.
                  </p>
                </motion.div>
                
                <motion.div
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  className="bg-gradient-to-r from-purple-50/80 to-white p-7 md:p-9 rounded-2xl shadow-sm border border-purple-100/50 transition-all"
                >
                  <div className="flex items-start gap-5">
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-purple-100/50 mt-1">
                      <img 
                        src="/lovable-uploads/6ce31d55-949c-4e43-877f-984794fa65ca.png" 
                        alt="AI Icon" 
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        <span className="font-medium text-purple-700">EmviApp's intelligent AI handles the complex work —</span> so you can focus on your passion and growing your business.
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover" 
                  className="bg-gradient-to-r from-white to-pink-50/50 p-7 md:p-9 rounded-2xl shadow-sm border border-pink-100/70 transition-all"
                >
                  <p className="text-gray-700 text-lg leading-relaxed">
                    <span className="font-medium text-pink-600">Without EmviApp, you might be missing out on opportunities</span> that your competitors are already embracing. <span className="text-2xl">😢</span>
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-center mt-12 transform hover:scale-[1.02] transition-transform"
                >
                  <Link to="/how-it-works">
                    <Button 
                      size={isMobile ? "default" : "lg"} 
                      className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-6 text-lg shadow-md rounded-xl hover:shadow-lg transition-all group"
                    >
                      Try it now and experience the difference
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            )}
            
            {/* Vietnamese Content */}
            {isVietnamese && (
              <motion.div
                key="vietnamese"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
                className="space-y-8"
              >
                <motion.div
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  className="bg-gradient-to-r from-white to-purple-50/50 p-7 md:p-9 rounded-2xl shadow-sm border border-purple-100 transition-all"
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-purple-700 font-playfair">Kinh Doanh Của Bạn, Được Nâng Cấp</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    <span className="text-purple-700 font-medium">Chúng tôi giúp bạn mang khách hàng đến tận tiệm.</span> Giúp bạn tìm những thợ giỏi, có kinh nghiệm, và đưa ra những ưu đãi tốt nhất — để bạn quản lý tiệm dễ dàng và đạt hiệu quả cao.
                  </p>
                </motion.div>
                
                <motion.div
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  className="bg-gradient-to-r from-purple-50/80 to-white p-7 md:p-9 rounded-2xl shadow-sm border border-purple-100/50 transition-all"
                >
                  <div className="flex items-start gap-5">
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-purple-100/50 mt-1">
                      <img 
                        src="/lovable-uploads/6ce31d55-949c-4e43-877f-984794fa65ca.png" 
                        alt="AI Icon" 
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        <span className="font-medium text-purple-700">Hãy để A.I thông minh của EmviApp lo mọi thứ cho bạn —</span> bạn chỉ cần tập trung làm điều mình yêu thích và phát triển sự nghiệp của mình.
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  className="bg-gradient-to-r from-white to-pink-50/50 p-7 md:p-9 rounded-2xl shadow-sm border border-pink-100/70 transition-all"
                >
                  <p className="text-gray-700 text-lg leading-relaxed">
                    <span className="font-medium text-pink-600">Nếu bạn không dùng thử EmviApp...</span> Chắc chắn bạn đang bỏ lỡ một công nghệ có thể giải quyết rất nhiều việc cùng một lúc. <span className="text-2xl">😢</span>
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-center mt-12 transform hover:scale-[1.02] transition-transform"
                >
                  <Link to="/how-it-works">
                    <Button 
                      size={isMobile ? "default" : "lg"} 
                      className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-5 md:px-8 md:py-6 md:text-lg shadow-md rounded-xl hover:shadow-lg transition-all group"
                    >
                      Hãy cùng nhau trải nghiệm những điều thú vị mà EmviApp mang đến cho bạn — ngay bây giờ
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Enhanced Language Toggle Button */}
          <div className="flex justify-center mt-14">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLanguageToggle}
              className="flex items-center gap-2 border-purple-200 hover:bg-purple-50 transition-colors text-purple-700 px-5 py-3 rounded-full shadow-sm hover:shadow"
            >
              <Globe className="h-4 w-4 text-purple-500" />
              <span className="font-medium">
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
