
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
          english: "Share EmviApp and unlock exclusive bonuses when we launch.",
          vietnamese: "Chia sẻ EmviApp và mở khóa các phần thưởng độc quyền khi chúng tôi ra mắt."
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
          vietnamese: "Tạo Liên kết Giới thiệu Của Tôi"
        })}
      </Button>
    </motion.section>
  );
};

export default ReferralRewards;
