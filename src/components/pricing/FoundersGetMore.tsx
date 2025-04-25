
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Sparkles, Award, LightbulbIcon, ShieldCheck } from 'lucide-react';

const FoundersGetMore = () => {
  const { t } = useTranslation();

  const mysteryPerks = [
    {
      icon: <Sparkles className="h-8 w-8 text-amber-500" />,
      title: {
        english: "Unlock Surprise Tools at Launch",
        vietnamese: "Mở khóa công cụ bất ngờ khi ra mắt"
      },
      description: {
        english: "Founders will be the first to access secret features we haven't announced yet",
        vietnamese: "Người sáng lập sẽ là những người đầu tiên truy cập các tính năng bí mật mà chúng tôi chưa công bố"
      }
    },
    {
      icon: <Award className="h-8 w-8 text-purple-500" />,
      title: {
        english: "Exclusive VIP Profile Badge",
        vietnamese: "Huy hiệu hồ sơ VIP độc quyền"
      },
      description: {
        english: "Stand out to clients with a permanent Founder badge that shows you were here from the beginning",
        vietnamese: "Nổi bật với khách hàng bằng huy hiệu Nhà sáng lập vĩnh viễn cho thấy bạn đã ở đây từ đầu"
      }
    },
    {
      icon: <LightbulbIcon className="h-8 w-8 text-blue-500" />,
      title: {
        english: "Early Influence on Features",
        vietnamese: "Ảnh hưởng sớm đến các tính năng"
      },
      description: {
        english: "Shape the future of EmviApp with direct access to our product team and feature voting privileges",
        vietnamese: "Định hình tương lai của EmviApp với quyền truy cập trực tiếp vào đội ngũ sản phẩm và đặc quyền bỏ phiếu tính năng"
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center bg-amber-100 text-amber-800 rounded-full px-4 py-1 mb-4"
          >
            <ShieldCheck className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">
              {t({
                english: "Exclusive Benefits",
                vietnamese: "Quyền lợi độc quyền"
              })}
            </span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4 bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
            {t({
              english: "Founders Get More",
              vietnamese: "Người sáng lập được nhiều hơn"
            })}
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t({
              english: "Join our Founders Circle and unlock benefits no one else will ever have access to — even after launch",
              vietnamese: "Tham gia Câu lạc bộ Người sáng lập và mở khóa những lợi ích mà không ai khác có thể tiếp cận - ngay cả sau khi ra mắt"
            })}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {mysteryPerks.map((perk, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-gray-50 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                {perk.icon}
              </div>
              
              <h3 className="text-xl font-bold text-center mb-3">
                {t(perk.title)}
              </h3>
              
              <p className="text-gray-600 text-center">
                {t(perk.description)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FoundersGetMore;
