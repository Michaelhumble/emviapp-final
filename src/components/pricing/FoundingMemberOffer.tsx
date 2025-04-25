
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Check, Crown } from 'lucide-react';

const FoundingMemberOffer = () => {
  const { t } = useTranslation();

  const benefits = [
    { 
      english: "Lifetime Discount",
      vietnamese: "Giảm giá trọn đời"
    },
    {
      english: "3 Months Free",
      vietnamese: "Miễn phí 3 tháng"
    },
    {
      english: "VIP Profile Badge",
      vietnamese: "Huy hiệu VIP trên hồ sơ"
    },
    {
      english: "Priority Support",
      vietnamese: "Hỗ trợ ưu tiên"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white to-purple-50/30 rounded-2xl transform -skew-y-3" />
      
      <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 p-8 md:p-12">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center justify-center bg-emvi-accent/10 text-emvi-accent rounded-full px-4 py-1 mb-4"
            >
              <Crown className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">
                {t({
                  english: "Founding Member Special",
                  vietnamese: "Ưu đãi Thành viên Sáng lập"
                })}
              </span>
            </motion.div>
            
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl text-gray-400 line-through">$5,999/year</span>
              <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emvi-accent to-purple-600 bg-clip-text text-transparent">
                $99/year
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 bg-white/80 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{t(benefit)}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Button 
              size="lg" 
              className="bg-emvi-accent hover:bg-emvi-accent/90 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl text-lg px-8 py-6 h-auto"
              onClick={() => window.location.href = '/checkout?plan=founding_member'}
            >
              {t({
                english: "Join as Founding Member",
                vietnamese: "Tham gia với Tư cách Thành viên Sáng lập"
              })}
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default FoundingMemberOffer;
