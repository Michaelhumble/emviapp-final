
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Timer } from 'lucide-react';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-6 py-12"
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
          english: "Secure Your VIP Access to EmviApp — The Future of Beauty Business",
          vietnamese: "Đảm Bảo Quyền Truy Cập VIP của Bạn vào EmviApp — Tương Lai của Ngành Kinh Doanh Làm Đẹp"
        })}
      </h1>

      <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
        {t({
          english: "Exclusive early-bird pricing. Limited spots. Lifetime discounts.",
          vietnamese: "Giá ưu đãi đặc biệt. Số lượng có hạn. Giảm giá trọn đời."
        })}
      </p>

      <div className="mt-8">
        <Button 
          size="lg" 
          className="bg-emvi-accent hover:bg-emvi-accent/90 px-8 py-6 text-lg"
        >
          {t({
            english: "Claim Your VIP Access",
            vietnamese: "Nhận Quyền Truy Cập VIP Của Bạn"
          })}
        </Button>
      </div>
    </motion.section>
  );
};

export default HeroSection;
