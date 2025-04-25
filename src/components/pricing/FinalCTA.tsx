
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
          english: "Secure Your Future in the Beauty Industry",
          vietnamese: "Đảm bảo Tương lai của Bạn trong Ngành Làm đẹp"
        })}
      </h2>

      <p className="text-xl text-gray-600">
        {t({
          english: "These offers will never return once we launch publicly.",
          vietnamese: "Những ưu đãi này sẽ không bao giờ quay lại sau khi chúng tôi ra mắt công khai."
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
