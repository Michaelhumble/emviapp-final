
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Gift, ArrowUp, Star } from 'lucide-react';

const ReferralRewards = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Star,
      title: {
        english: "EmviApp Credits",
        vietnamese: "Tín dụng EmviApp"
      },
      description: {
        english: "Get EmviApp Credits for every friend who signs up",
        vietnamese: "Nhận tín dụng EmviApp cho mỗi người bạn đăng ký"
      }
    },
    {
      icon: ArrowUp,
      title: {
        english: "Premium Perks Access",
        vietnamese: "Truy cập đặc quyền cao cấp"
      },
      description: {
        english: "Use credits for profile boosts, premium features, and special discounts",
        vietnamese: "Sử dụng tín dụng để tăng cường hồ sơ, tính năng cao cấp và giảm giá đặc biệt"
      }
    },
    {
      icon: Star,
      title: {
        english: "VIP Rewards",
        vietnamese: "Phần thưởng VIP"
      },
      description: {
        english: "The more friends you invite, the more VIP rewards you unlock",
        vietnamese: "Càng mời nhiều bạn bè, bạn càng mở khóa nhiều phần thưởng VIP"
      }
    },
    {
      icon: Gift,
      title: {
        english: "Surprise Bonuses",
        vietnamese: "Thưởng bất ngờ"
      },
      description: {
        english: "Top referrers receive surprise bonuses and recognition!",
        vietnamese: "Người giới thiệu hàng đầu nhận được thưởng bất ngờ và sự công nhận!"
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
              english: "Invite Friends. Earn Credits. Unlock Exclusive Perks!",
              vietnamese: "Mời bạn bè. Kiếm tín dụng. Mở khóa đặc quyền!"
            })}
          </h2>
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
              english: "There's no limit — grow your network and enjoy exclusive benefits before anyone else.",
              vietnamese: "Không có giới hạn — phát triển mạng lưới của bạn và tận hưởng lợi ích độc quyền trước mọi người."
            })}
          </p>

          <Button 
            size="lg" 
            className="bg-emvi-accent hover:bg-emvi-accent/90 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
            onClick={() => {}} // Mock function for now
          >
            {t({
              english: "Get My Referral Link",
              vietnamese: "Nhận Liên kết Giới thiệu của Tôi"
            })}
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

export default ReferralRewards;
