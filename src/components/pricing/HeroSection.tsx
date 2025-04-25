
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="text-center my-8 md:my-12"
    >
      <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-6 bg-gradient-to-r from-emvi-accent to-purple-600 bg-clip-text text-transparent">
        {t({
          english: "You're Not Just Early — You're Essential",
          vietnamese: "Bạn Không Chỉ Là Người Đầu Tiên — Bạn Là Người Thiết Yếu"
        })}
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        {t({
          english: "Exclusive tools. Lifetime perks. Limited spots. Be part of the beauty industry's future before the world catches on.",
          vietnamese: "Công cụ độc quyền. Đặc quyền suốt đời. Cơ hội có hạn. Hãy là một phần của tương lai ngành làm đẹp trước khi cả thế giới biết đến."
        })}
      </p>

      <div className="flex items-center justify-center mt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center text-emvi-accent"
        >
          <ArrowRight className="mr-2 h-5 w-5" />
          <span className="text-lg font-medium">
            {t({
              english: "Join the EmviApp Founders Circle Today",
              vietnamese: "Tham Gia Câu Lạc Bộ Người Sáng Lập EmviApp Ngay Hôm Nay"
            })}
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
