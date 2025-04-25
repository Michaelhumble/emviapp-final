
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';

const FinalCTA = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center space-y-6 py-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold font-playfair">
        {t({
          english: "These VIP Offers Will Never Return",
          vietnamese: "Những Ưu Đãi VIP Này Sẽ Không Bao Giờ Trở Lại"
        })}
      </h2>

      <p className="text-xl text-gray-600">
        {t({
          english: "Join thousands securing their future in the beauty industry.",
          vietnamese: "Tham gia cùng hàng nghìn người đang đảm bảo tương lai của họ trong ngành làm đẹp."
        })}
      </p>

      <Button 
        size="lg" 
        className="bg-emvi-accent hover:bg-emvi-accent/90"
        onClick={() => window.location.href = '/checkout?plan=founding_member'}
      >
        {t({
          english: "Get Started Now",
          vietnamese: "Bắt đầu Ngay"
        })}
      </Button>
    </motion.section>
  );
};

export default FinalCTA;
