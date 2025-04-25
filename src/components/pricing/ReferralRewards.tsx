
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Gift, ArrowUp, Star, Award } from 'lucide-react';

const ReferralRewards = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Star,
      title: {
        english: "Exclusive Perks",
        vietnamese: "Đặc quyền độc quyền"
      },
      description: {
        english: "Profile boosts, premium themes, and priority visibility in search results",
        vietnamese: "Tăng cường hồ sơ, chủ đề cao cấp và hiển thị ưu tiên trong kết quả tìm kiếm"
      }
    },
    {
      icon: ArrowUp,
      title: {
        english: "Status Growth",
        vietnamese: "Tăng trưởng trạng thái"
      },
      description: {
        english: "The more friends you invite, the higher your VIP status climbs with exclusive benefits",
        vietnamese: "Càng nhiều bạn bè bạn mời, trạng thái VIP của bạn càng cao với những lợi ích độc quyền"
      }
    },
    {
      icon: Star,
      title: {
        english: "VIP Recognition",
        vietnamese: "Công nhận VIP"
      },
      description: {
        english: "Top referrers receive special recognition and exclusive platform opportunities",
        vietnamese: "Người giới thiệu hàng đầu nhận được sự công nhận đặc biệt và cơ hội nền tảng độc quyền"
      }
    },
    {
      icon: Gift,
      title: {
        english: "Surprise Rewards",
        vietnamese: "Phần thưởng bất ngờ"
      },
      description: {
        english: "Unlock mystery bonuses as you reach new referral milestones",
        vietnamese: "Mở khóa phần thưởng bí ẩn khi bạn đạt được các cột mốc giới thiệu mới"
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
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-pink-50/20 rounded-2xl" />
      
      <div className="relative rounded-2xl p-8 md:p-12 space-y-12">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center bg-emvi-accent/10 text-emvi-accent rounded-full px-4 py-1 mb-4"
          >
            <Gift className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Referral Program</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold font-playfair bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {t({
              english: "Invite Friends. Earn Perks. Grow Your Status.",
              vietnamese: "Mời bạn bè. Nhận đặc quyền. Nâng cao trạng thái của bạn."
            })}
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t({
              english: "Every invite unlocks exclusive bonuses like profile boosts, premium themes, and surprise rewards.",
              vietnamese: "Mỗi lời mời mở khóa các phần thưởng độc quyền như tăng cường hồ sơ, chủ đề cao cấp và phần thưởng bất ngờ."
            })}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
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
          <p className="text-lg text-gray-600 italic">
            {t({
              english: "Top referrers will receive special recognition and exclusive opportunities within the EmviApp ecosystem.",
              vietnamese: "Người giới thiệu hàng đầu sẽ nhận được sự công nhận đặc biệt và cơ hội độc quyền trong hệ sinh thái EmviApp."
            })}
          </p>

          <Button 
            size="lg" 
            className="bg-emvi-accent hover:bg-emvi-accent/90 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {t({
              english: "Boost My Beauty Business",
              vietnamese: "Tăng cường Doanh nghiệp Làm đẹp của Tôi"
            })}
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

export default ReferralRewards;
