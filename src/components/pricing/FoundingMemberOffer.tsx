
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

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
      className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emvi-accent/5 to-purple-100/10 rounded-2xl" />
      
      <div className="relative space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold font-playfair">
            {t({
              english: "Founding Member Special",
              vietnamese: "Ưu đãi Thành viên Sáng lập"
            })}
          </h2>
          
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl text-gray-400 line-through">$5,999/year</span>
            <span className="text-5xl font-bold text-emvi-accent">$99/year</span>
          </div>
        </div>

        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{t(benefit)}</span>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Button 
            size="lg" 
            className="w-full md:w-auto bg-emvi-accent hover:bg-emvi-accent/90"
            onClick={() => window.location.href = '/checkout?plan=founding_member'}
          >
            {t({
              english: "Join as Founding Member",
              vietnamese: "Tham gia với Tư cách Thành viên Sáng lập"
            })}
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

export default FoundingMemberOffer;
