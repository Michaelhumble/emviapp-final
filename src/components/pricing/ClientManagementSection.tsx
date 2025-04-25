
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Users, CalendarCheck, RotateCw, TrendingUp, SendHorizontal, MessageSquare } from 'lucide-react';

const ClientManagementSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Users,
      title: {
        english: "Auto Client Database",
        vietnamese: "Cơ sở dữ liệu khách hàng tự động"
      },
      description: {
        english: "Automatically build and organize your client list with zero effort",
        vietnamese: "Tự động xây dựng và tổ chức danh sách khách hàng không cần nỗ lực"
      }
    },
    {
      icon: CalendarCheck,
      title: {
        english: "Smart Tracking",
        vietnamese: "Theo dõi thông minh"
      },
      description: {
        english: "Track visits, birthdays, preferences, and spending habits effortlessly",
        vietnamese: "Theo dõi lượt truy cập, sinh nhật, sở thích và thói quen chi tiêu một cách dễ dàng"
      }
    },
    {
      icon: RotateCw,
      title: {
        english: "Intelligent Reminders",
        vietnamese: "Nhắc nhở thông minh"
      },
      description: {
        english: "Smart reminders for rebooking and special offers at the perfect time",
        vietnamese: "Nhắc nhở thông minh để đặt lại và ưu đãi đặc biệt vào thời điểm hoàn hảo"
      }
    },
    {
      icon: TrendingUp,
      title: {
        english: "Growth Tools",
        vietnamese: "Công cụ tăng trưởng"
      },
      description: {
        english: "Personalized marketing tools to boost repeat business automatically",
        vietnamese: "Công cụ tiếp thị cá nhân hóa để tăng cường kinh doanh lặp lại tự động"
      }
    },
    {
      icon: SendHorizontal,
      title: {
        english: "Easy Promotions",
        vietnamese: "Khuyến mãi dễ dàng"
      },
      description: {
        english: "Send SMS & Email promotions with just one click",
        vietnamese: "Gửi khuyến mãi qua SMS & Email chỉ với một cú nhấp chuột"
      }
    },
    {
      icon: MessageSquare,
      title: {
        english: "Client Loyalty",
        vietnamese: "Lòng trung thành của khách hàng"
      },
      description: {
        english: "Turn every customer into a loyal regular without extra effort",
        vietnamese: "Biến mọi khách hàng thành khách quen trung thành mà không cần nỗ lực thêm"
      }
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
      
      <div className="relative rounded-2xl p-8 md:p-12 space-y-12">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center bg-emvi-accent/10 text-emvi-accent rounded-full px-4 py-1 mb-4"
          >
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Premium Feature</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold font-playfair bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {t({
              english: "📋 Your Clients, Always in Your Pocket",
              vietnamese: "📋 Khách hàng của Bạn, Luôn trong Tầm Tay"
            })}
          </h2>
          
          <p className="text-xl md:text-2xl font-playfair text-emvi-accent">
            {t({
              english: "The #1 Reason Successful Salons & Artists Grow Faster — Know Your Clients.",
              vietnamese: "Lý do #1 Các Salon & Nghệ sĩ Thành công Phát triển Nhanh hơn — Hiểu Khách hàng của Bạn."
            })}
          </p>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t({
              english: "EmviApp automatically builds your client list—track visits, birthdays, preferences, and more. Turn every customer into a loyal regular with smart reminders and personalized marketing tools.",
              vietnamese: "EmviApp tự động xây dựng danh sách khách hàng của bạn—theo dõi lượt truy cập, sinh nhật, sở thích và hơn thế nữa. Biến mọi khách hàng thành khách quen trung thành với công cụ nhắc nhở thông minh và tiếp thị cá nhân hóa."
            })}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col gap-4 bg-white/80 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="bg-emvi-accent/10 rounded-lg p-3 w-fit">
                  <Icon className="w-6 h-6 text-emvi-accent" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">{t(feature.title)}</h3>
                  <p className="text-gray-600">{t(feature.description)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center space-y-6">
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
      </div>
    </motion.section>
  );
};

export default ClientManagementSection;
