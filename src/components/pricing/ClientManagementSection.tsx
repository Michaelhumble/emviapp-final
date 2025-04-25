
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ClientManagementSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      english: "Auto client database management",
      vietnamese: "Quản lý cơ sở dữ liệu khách hàng tự động"
    },
    {
      english: "Birthday & appointment reminders",
      vietnamese: "Nhắc nhở sinh nhật & cuộc hẹn"
    },
    {
      english: "Easy rebooking & promotions",
      vietnamese: "Đặt lại & khuyến mãi dễ dàng"
    },
    {
      english: "Boost repeat business effortlessly",
      vietnamese: "Tăng cường kinh doanh lặp lại một cách dễ dàng"
    },
    {
      english: "Smart marketing without extra effort",
      vietnamese: "Tiếp thị thông minh mà không cần nỗ lực thêm"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-white to-purple-50/30 rounded-2xl p-8 text-center space-y-6"
    >
      <h2 className="text-3xl font-bold font-playfair">
        {t({
          english: "📋 Your Clients, Always in Your Pocket",
          vietnamese: "📋 Khách hàng của Bạn, Luôn trong Tầm Tay"
        })}
      </h2>
      
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        {t({
          english: "EmviApp automatically builds your client list—track visits, birthdays, preferences, and more. Turn every customer into a loyal regular with smart reminders and personalized marketing tools.",
          vietnamese: "EmviApp tự động xây dựng danh sách khách hàng của bạn—theo dõi lượt truy cập, sinh nhật, sở thích và hơn thế nữa. Biến mọi khách hàng thành khách quen trung thành với công cụ nhắc nhở thông minh và tiếp thị cá nhân hóa."
        })}
      </p>

      <div className="space-y-3 max-w-2xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3 text-left">
            <Check className="text-green-500 flex-shrink-0" />
            <span className="text-gray-700">{t(feature)}</span>
          </div>
        ))}
      </div>

      <em className="block text-gray-600 italic mt-6">
        {t({
          english: "No more forgotten clients. Grow smarter, not harder.",
          vietnamese: "Không còn khách hàng bị quên lãng. Phát triển thông minh hơn, không phải khó khăn hơn."
        })}
      </em>

      <Button 
        size="lg" 
        className="bg-emvi-accent hover:bg-emvi-accent/90 mt-6"
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
    </motion.section>
  );
};

export default ClientManagementSection;
