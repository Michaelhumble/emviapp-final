
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Users, Calendar, MessageSquare, Clock } from 'lucide-react';

const ClientManagementSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Calendar className="h-6 w-6 text-blue-500" />,
      title: {
        english: "Intelligent Scheduling",
        vietnamese: "Lập lịch thông minh"
      },
      description: {
        english: "Let clients book while you sleep, with automated confirmation and reminders",
        vietnamese: "Cho phép khách hàng đặt lịch trong khi bạn ngủ, với xác nhận và nhắc nhở tự động"
      }
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-green-500" />,
      title: {
        english: "Smart Communication",
        vietnamese: "Giao tiếp thông minh"
      },
      description: {
        english: "One-tap messaging that keeps clients coming back without constant effort",
        vietnamese: "Nhắn tin một chạm giúp khách hàng quay lại mà không cần nỗ lực liên tục"
      }
    },
    {
      icon: <Clock className="h-6 w-6 text-amber-500" />,
      title: {
        english: "Automated Follow-ups",
        vietnamese: "Theo dõi tự động"
      },
      description: {
        english: "Perfectly timed reminders that turn one-time visits into loyal clients",
        vietnamese: "Nhắc nhở đúng lúc biến chuyến thăm một lần thành khách hàng trung thành"
      }
    },
    {
      icon: <Users className="h-6 w-6 text-purple-500" />,
      title: {
        english: "Client Insights",
        vietnamese: "Thông tin chi tiết về khách hàng"
      },
      description: {
        english: "Know what your clients want before they tell you with AI-powered preferences",
        vietnamese: "Biết khách hàng của bạn muốn gì trước khi họ nói với bạn với sở thích được hỗ trợ bởi AI"
      }
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-16"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
            {t({
              english: "Your Clients, Always in Your Pocket",
              vietnamese: "Khách hàng của bạn, luôn trong túi của bạn"
            })}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t({
              english: "The Secret to Building a Loyal Clientele Without Lifting a Finger",
              vietnamese: "Bí quyết xây dựng khách hàng trung thành mà không cần nỗ lực"
            })}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-5 bg-white/90 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-100"
            >
              <div className="bg-gray-50 rounded-lg p-3 h-fit">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{t(feature.title)}</h3>
                <p className="text-gray-600">{t(feature.description)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ClientManagementSection;
