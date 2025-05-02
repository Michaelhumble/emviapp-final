
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

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
          english: "Join the Beauty Industry's Elite Founders Circle",
          vietnamese: "Tham gia Câu lạc bộ Người sáng lập Ưu tú của Ngành Làm đẹp"
        })}
      </h2>

      <p className="text-xl text-gray-600">
        {t({
          english: "Be part of the revolution that's transforming the beauty industry forever.",
          vietnamese: "Hãy là một phần của cuộc cách mạng đang biến đổi ngành làm đẹp mãi mãi."
        })}
      </p>

      <Link to="/auth/signup">
        <Button 
          size="lg" 
          className="bg-emvi-accent hover:bg-emvi-accent/90 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl px-8 py-5 text-lg"
        >
          <Crown className="mr-2 h-5 w-5" />
          {t({
            english: "Join the Founders Circle",
            vietnamese: "Tham gia Câu lạc bộ Người sáng lập"
          })}
        </Button>
      </Link>
    </motion.section>
  );
};

export default FinalCTA;
