
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { GradientBackground } from '@/components/ui/gradient-background';

const MissingPieceSection = () => {
  const { lang, t, toggleLanguage } = useTranslation();
  const isVietnamese = lang === 'vi';

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-32 h-32 text-yellow-300 opacity-60 z-10">
        <div className="relative w-full h-full">
          <span className="absolute text-5xl top-4 right-10">✨</span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-playfair font-medium text-purple-600 leading-tight mb-4">
            {isVietnamese ? 'Hãy Cùng Nhau Trải Nghiệm EmviApp' : 'Let\'s Experience EmviApp Together'}
          </h2>
          <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-purple-300 mb-12 mx-auto"></div>
          
          <div className="space-y-10">
            {/* Business Section */}
            <GradientBackground className="p-6 md:p-8 text-left">
              <h3 className="text-2xl md:text-3xl font-playfair font-medium text-purple-700 mb-4">
                {isVietnamese ? 'Kinh Doanh Của Bạn, Được Nâng Cấp' : 'Your Business, Supercharged'}
              </h3>
              <p className="text-lg text-gray-700">
                {isVietnamese 
                  ? 'Chúng tôi giúp bạn mang khách hàng đến tận tiệm. Giúp bạn tìm những thợ giỏi, có kinh nghiệm, và đưa ra những ưu đãi tốt nhất — để bạn quản lý tiệm dễ dàng và đạt hiệu quả cao.'
                  : 'We help bring customers straight to your salon. Our platform connects you with skilled technicians, delivers irresistible offers, and streamlines shop management — all in one elegant solution.'
                }
              </p>
            </GradientBackground>
            
            {/* AI Section */}
            <div className="bg-purple-50 p-6 md:p-8 rounded-xl text-left flex items-start gap-5">
              <div className="bg-white p-3 rounded-md shadow-sm mt-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="4" fill="#F4F1FF" />
                  <path d="M6 12H18" stroke="#8B5CF6" strokeWidth="2" />
                  <path d="M12 6V18" stroke="#8B5CF6" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium text-purple-600">
                  {isVietnamese 
                    ? 'Hãy để A.I thông minh của EmviApp lo mọi thứ cho bạn —'
                    : 'EmviApp\'s intelligent AI handles the complex work —'
                  }
                </p>
                <p className="text-gray-700">
                  {isVietnamese 
                    ? 'bạn chỉ cần tập trung làm điều mình yêu thích và phát triển sự nghiệp của mình.'
                    : 'so you can focus on your passion and growing your business.'
                  }
                </p>
              </div>
            </div>
            
            {/* Reminder Section */}
            <div className="bg-white border border-gray-100 shadow-sm p-6 md:p-8 rounded-xl text-left">
              <p className="text-lg font-medium text-rose-500 mb-1">
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
          </div>
          
          {/* CTA Section */}
          <div className="mt-10">
            <Link to="/sign-up">
              <Button 
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-6 text-lg h-auto font-medium group"
              >
                {isVietnamese 
                  ? 'Hãy cùng nhau trải nghiệm những điều thú vị mà EmviApp mang đến cho bạn — ngay bây giờ'
                  : 'Try it now and experience the difference'
                }
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <div className="mt-6">
              <Button
                variant="outline"
                onClick={toggleLanguage}
                className="text-purple-600 border-purple-200"
              >
                {isVietnamese ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissingPieceSection;
