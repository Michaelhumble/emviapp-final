
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Timer, Users, Star } from 'lucide-react';

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
          english: "Limited-Time Opportunity",
          vietnamese: "Cơ Hội Có Hạn"
        })}
      </Badge>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair tracking-tight bg-gradient-to-r from-gray-800 to-purple-600 bg-clip-text text-transparent">
        {t({
          english: "You're Not Just Early — You're Essential. Join the EmviApp Founders Circle Today.",
          vietnamese: "Bạn Không Chỉ Đến Sớm - Bạn Là Thiết Yếu. Tham Gia Câu Lạc Bộ Người Sáng Lập EmviApp Ngay Hôm Nay."
        })}
      </h1>

      <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
        {t({
          english: "Exclusive tools. Lifetime perks. Limited spots. Be part of the beauty industry's future before the world catches on.",
          vietnamese: "Công cụ độc quyền. Đặc quyền trọn đời. Số lượng có hạn. Hãy trở thành một phần của tương lai ngành làm đẹp trước khi cả thế giới biết đến."
        })}
      </p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex items-center justify-center mt-4 text-lg text-emvi-accent font-medium"
      >
        <Users className="mr-2 h-5 w-5" />
        {t({
          english: "🔥 1,200+ beauty professionals have already secured their VIP status — will you?",
          vietnamese: "🔥 Hơn 1,200 chuyên gia làm đẹp đã đảm bảo trạng thái VIP của họ — còn bạn thì sao?"
        })}
      </motion.div>

      <div className="mt-8">
        <Button 
          size="lg" 
          className="bg-emvi-accent hover:bg-emvi-accent/90 px-8 py-6 text-lg transform hover:scale-105 transition-transform duration-200 shadow-md"
        >
          {t({
            english: "Join the Founders Circle",
            vietnamese: "Tham Gia Câu Lạc Bộ Người Sáng Lập"
          })}
        </Button>
        
        <p className="mt-4 text-amber-600 font-medium text-sm flex items-center justify-center">
          <Star className="mr-1 h-4 w-4" />
          {t({
            english: "Limited spots available — this opportunity will disappear once we launch.",
            vietnamese: "Số lượng có hạn — cơ hội này sẽ biến mất khi chúng tôi ra mắt."
          })}
        </p>
      </div>
    </motion.section>
  );
};

export default HeroSection;
