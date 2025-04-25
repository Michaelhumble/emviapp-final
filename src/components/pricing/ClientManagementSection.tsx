
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Check, Users, CalendarCheck, RotateCw, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ClientManagementSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Users,
      english: "Auto client database management",
      vietnamese: "Quản lý cơ sở dữ liệu khách hàng tự động"
    },
    {
      icon: CalendarCheck,
      english: "Birthday & appointment reminders",
      vietnamese: "Nhắc nhở sinh nhật & cuộc hẹn"
    },
    {
      icon: RotateCw,
      english: "Easy rebooking & promotions",
      vietnamese: "Đặt lại & khuyến mãi dễ dàng"
    },
    {
      icon: TrendingUp,
      english: "Boost repeat business effortlessly",
      vietnamese: "Tăng cường kinh doanh lặp lại một cách dễ dàng"
    },
    {
      icon: Sparkles,
      english: "Smart marketing without extra effort",
      vietnamese: "Tiếp thị thông minh mà không cần nỗ lực thêm"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-white rounded-2xl" />
      
      <div className="relative rounded-2xl p-8 md:p-12 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {t({
              english: "📋 Your Clients, Always in Your Pocket",
              vietnamese: "📋 Khách hàng của Bạn, Luôn trong Tầm Tay"
            })}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t({
              english: "EmviApp automatically builds your client list—track visits, birthdays, preferences, and more. Turn every customer into a loyal regular with smart reminders and personalized marketing tools.",
              vietnamese: "EmviApp tự động xây dựng danh sách khách hàng của bạn—theo dõi lượt truy cập, sinh nhật, sở thích và hơn thế nữa. Biến mọi khách hàng thành khách quen trung thành với công cụ nhắc nhở thông minh và tiếp thị cá nhân hóa."
            })}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 bg-white/80 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Icon className="w-5 h-5 text-emvi-accent flex-shrink-0" />
                <span className="text-gray-700 text-left">{t(feature)}</span>
              </motion.div>
            );
          })}
        </div>

        <em className="block text-gray-600 italic mt-8 text-lg">
          {t({
            english: "No more forgotten clients. Grow smarter, not harder.",
            vietnamese: "Không còn khách hàng bị quên lãng. Phát triển thông minh hơn, không phải khó khăn hơn."
          })}
        </em>

        <Button 
          size="lg" 
          className="bg-emvi-accent hover:bg-emvi-accent/90 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
          onClick={() => {
            const pricingSection = document.getElementById('pricing');
            pricingSection?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {t({
            english: "Unlock My Client Tools →",
            vietnamese: "Mở Khóa Công Cụ Khách Hàng →"
          })}
        </Button>
      </div>
    </motion.section>
  );
};

export default ClientManagementSection;
