
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
          english: "Join thousands of beauty professionals already growing with EmviApp.",
          vietnamese: "Tham gia cùng hàng nghìn chuyên gia làm đẹp đang phát triển với EmviApp."
        })}
      </p>

      <Button 
        size="lg" 
        className="bg-emvi-accent hover:bg-emvi-accent/90 transform hover:scale-[1.02] transition-all duration-200"
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
