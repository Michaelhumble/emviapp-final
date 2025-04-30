
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const BilingualExperienceSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-white to-purple-50/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* English Version */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:items-start"
          >
            <div className="text-center lg:text-left mb-8">
              <div className="relative inline-block">
                <Sparkles className="absolute -left-10 -top-6 w-8 h-8 text-purple-500 opacity-80" />
                <h2 className="font-playfair font-bold text-2xl md:text-5xl bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent mb-3">
                  Let's Experience EmviApp Together
                </h2>
                <div className="h-1 bg-gradient-to-r from-purple-600 to-purple-300 w-full mt-2 rounded-full" />
              </div>
              <p className="text-lg text-gray-700 mt-4">
                Discover the power of EmviApp for your beauty business ✨
              </p>
            </div>
            
            <div className="space-y-6 text-center lg:text-left">
              <p className="text-gray-600 text-lg leading-relaxed">
                EmviApp brings together beauty professionals, salon owners, and clients in one seamless platform. 
                Book appointments, showcase your work, and grow your business with our intelligent tools designed 
                specifically for the beauty industry.
              </p>
              
              <Link to="/signup">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-8 py-2 rounded-xl shadow-md transform transition hover:scale-105"
                >
                  Try it now and experience the difference
                </Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Vietnamese Version */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:items-start"
          >
            <div className="text-center lg:text-left mb-8">
              <div className="relative inline-block">
                <Sparkles className="absolute -left-10 -top-6 w-8 h-8 text-purple-500 opacity-80" />
                <h2 className="font-playfair font-bold text-2xl md:text-5xl bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent mb-3">
                  Hãy Cùng Nhau Trải Nghiệm EmviApp
                </h2>
                <div className="h-1 bg-gradient-to-r from-purple-600 to-purple-300 w-full mt-2 rounded-full" />
              </div>
              <p className="text-lg text-gray-700 mt-4">
                Khám phá sức mạnh của EmviApp cho doanh nghiệp làm đẹp của bạn ✨
              </p>
            </div>
            
            <div className="space-y-6 text-center lg:text-left">
              <p className="text-gray-600 text-lg leading-relaxed">
                EmviApp kết nối các chuyên gia làm đẹp, chủ salon và khách hàng trên một nền tảng liền mạch. 
                Đặt lịch hẹn, trưng bày tác phẩm của bạn và phát triển doanh nghiệp với các công cụ thông minh 
                được thiết kế đặc biệt cho ngành làm đẹp.
              </p>
              
              <Link to="/signup">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-8 py-2 rounded-xl shadow-md transform transition hover:scale-105"
                >
                  Hãy cùng nhau trải nghiệm những điều thú vị mà EmviApp mang đến cho bạn — ngay bây giờ
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BilingualExperienceSection;
