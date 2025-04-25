
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';

const ReferralRewards = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center space-y-6"
    >
      <h2 className="text-3xl font-bold font-playfair">
        {t({
          english: "Invite Friends & Earn Rewards",
          vietnamese: "Mời Bạn bè & Nhận Phần thưởng"
        })}
      </h2>
      
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        {t({
          english: "Earn exclusive bonuses when EmviApp launches by sharing your referral link.",
          vietnamese: "Nhận thưởng độc quyền khi EmviApp ra mắt bằng cách chia sẻ liên kết giới thiệu của bạn."
        })}
      </p>

      <Button 
        variant="outline" 
        size="lg" 
        className="bg-white"
        onClick={() => {}} // Mock function for now
      >
        {t({
          english: "Generate My Referral Link",
          vietnamese: "Tạo Liên kết Giới thiệu"
        })}
      </Button>
    </motion.section>
  );
};

export default ReferralRewards;
