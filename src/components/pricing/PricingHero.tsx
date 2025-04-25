
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Badge } from '@/components/ui/badge';
import { Timer } from 'lucide-react';

const PricingHero = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center space-y-6"
    >
      <Badge 
        variant="outline" 
        className="bg-emvi-accent/5 text-emvi-accent border-emvi-accent/20"
      >
        <Timer className="w-4 h-4 mr-1" />
        {t({
          english: "Offer Ends Soon",
          vietnamese: "Ưu đãi Sắp Kết thúc"
        })}
      </Badge>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair tracking-tight">
        {t({
          english: "Unlock Your VIP Access — The Future of Beauty Starts Here",
          vietnamese: "Mở Khóa Quyền Truy cập VIP — Tương lai của Ngành Làm đẹp Bắt đầu từ Đây"
        })}
      </h1>

      <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
        {t({
          english: "Limited spots. Exclusive early-bird pricing. Join thousands of beauty pros before public launch.",
          vietnamese: "Số lượng có hạn. Giá ưu đãi đặc biệt. Tham gia cùng hàng nghìn chuyên gia làm đẹp trước khi ra mắt công khai."
        })}
      </p>
    </motion.section>
  );
};

export default PricingHero;
