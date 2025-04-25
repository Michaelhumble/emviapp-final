
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const EmotionalClosing = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-16 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-purple-50/20" />
      
      <div className="relative max-w-4xl mx-auto text-center px-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100"
        >
          <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-6 bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
            {t({
              english: "Years from now, you'll remember being first.",
              vietnamese: "Nhiều năm sau, bạn sẽ nhớ rằng mình là người đầu tiên."
            })}
          </h2>
          
          <p className="text-xl text-gray-700 mb-8 italic">
            {t({
              english: "These VIP offers will vanish when we go public — secure your future today.",
              vietnamese: "Những ưu đãi VIP này sẽ biến mất khi chúng tôi ra mắt công khai — hãy đảm bảo tương lai của bạn ngay hôm nay."
            })}
          </p>
          
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            {t({
              english: "Secure My VIP Founder Status",
              vietnamese: "Đảm bảo trạng thái Người sáng lập VIP của tôi"
            })}
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default EmotionalClosing;
