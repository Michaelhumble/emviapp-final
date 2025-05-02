
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { GradientBackground } from '@/components/ui/gradient-background';

const MissingPieceSection = () => {
  const { lang, t, toggleLanguage } = useTranslation();
  const isVietnamese = lang === 'vi';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 opacity-80 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-20 -z-10 transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-20 -z-10 transform -translate-x-1/3 translate-y-1/3"></div>
      
      {/* Sparkle decorations */}
      <div className="absolute top-10 left-1/4 text-yellow-400 opacity-60 z-10">
        <div className="relative">
          <span className="absolute text-4xl transform rotate-12">✨</span>
        </div>
      </div>
      <div className="absolute bottom-20 right-1/3 text-purple-300 opacity-40 z-10">
        <div className="relative">
          <span className="absolute text-3xl transform -rotate-12">✨</span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <header className="text-center mb-12">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <h2 className="text-3xl md:text-5xl font-playfair font-medium text-gray-800 leading-tight">
                {isVietnamese ? 'Hãy Cùng Nhau Trải Nghiệm EmviApp' : 'Let\'s Experience EmviApp Together'}
              </h2>
              <Sparkles className="h-5 w-5 text-purple-500" />
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="w-32 h-1 bg-gradient-to-r from-purple-400 via-purple-300 to-purple-200 mx-auto mb-16 rounded-full shadow-sm"
            ></motion.div>
          </header>
          
          <div className="space-y-8">
            {/* Business Section */}
            <motion.div variants={itemVariants}>
              <GradientBackground className="p-7 md:p-8 text-left rounded-2xl shadow-lg shadow-purple-100/40">
                <h3 className="text-2xl md:text-3xl font-playfair font-medium text-purple-800 mb-4 flex items-center">
                  {isVietnamese ? 'Kinh Doanh Của Bạn, Được Nâng Cấp' : 'Your Business, Supercharged'}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {isVietnamese 
                    ? 'Chúng tôi giúp bạn mang khách hàng đến tận tiệm. Giúp bạn tìm những thợ giỏi, có kinh nghiệm, và đưa ra những ưu đãi tốt nhất — để bạn quản lý tiệm dễ dàng và đạt hiệu quả cao.'
                    : 'We help bring customers straight to your salon. Our platform connects you with skilled technicians, delivers irresistible offers, and streamlines shop management — all in one elegant solution.'
                  }
                </p>
              </GradientBackground>
            </motion.div>
            
            {/* AI Section */}
            <motion.div variants={itemVariants}>
              <div className="bg-white/70 backdrop-blur-sm p-7 md:p-8 rounded-2xl text-left flex items-start gap-6 shadow-lg border border-purple-100/50">
                <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-4 rounded-xl shadow-inner flex items-center justify-center mt-1 shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="6" fill="#F4F1FF" />
                    <path d="M6 12H18" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 6V18" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-medium text-purple-700">
                    {isVietnamese 
                      ? 'Hãy để A.I thông minh của EmviApp lo mọi thứ cho bạn —'
                      : 'EmviApp\'s intelligent AI handles the complex work —'
                    }
                  </p>
                  <p className="text-gray-700 mt-1">
                    {isVietnamese 
                      ? 'bạn chỉ cần tập trung làm điều mình yêu thích và phát triển sự nghiệp của mình.'
                      : 'so you can focus on your passion and growing your business.'
                    }
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Reminder Section */}
            <motion.div variants={itemVariants}>
              <div className="bg-gradient-to-br from-white to-rose-50/50 p-7 md:p-8 rounded-2xl text-left border border-rose-100/30 shadow-lg">
                <p className="text-lg font-medium text-rose-600 mb-2">
                  {isVietnamese 
                    ? 'Nếu bạn không dùng thử EmviApp...'
                    : 'Without EmviApp, you might be missing out on opportunities'
                  }
                </p>
                <p className="text-gray-700">
                  {isVietnamese 
                    ? 'Chắc chắn bạn đang bỏ lỡ một công nghệ có thể giải quyết rất nhiều việc cùng một lúc. 😔'
                    : 'that your competitors are already embracing. 😔'
                  }
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* CTA Section */}
          <motion.div variants={itemVariants} className="mt-12 text-center">
            <Link to="/sign-up">
              <Button 
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-7 text-lg h-auto font-medium group w-full sm:w-auto transition-all duration-300 rounded-xl shadow-md hover:shadow-lg hover:shadow-purple-200/50 border border-purple-400/20"
              >
                {isVietnamese 
                  ? 'Hãy cùng nhau trải nghiệm những điều thú vị mà EmviApp mang đến cho bạn — ngay bây giờ'
                  : 'Try it now and experience the difference'
                }
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <div className="mt-8">
              <Button
                variant="outline"
                onClick={toggleLanguage}
                className="text-purple-600 border-purple-200 hover:bg-purple-50 transition-all duration-300 px-6"
              >
                {isVietnamese ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissingPieceSection;
