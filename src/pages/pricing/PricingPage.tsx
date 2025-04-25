
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import FoundersEarlyAccess from '@/components/pricing/FoundersEarlyAccess';
import { GradientBackground } from '@/components/ui/gradient-background';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import LanguageToggle from '@/components/ui/LanguageToggle';

const PricingPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle minimal={false} />
      </div>
      
      {/* Early Access Hero */}
      <GradientBackground variant="default" className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge 
              variant="outline" 
              className="mb-6 text-lg font-semibold px-4 py-1.5 bg-white/80 backdrop-blur-sm"
            >
              ⏳ {t({
                english: "Offer Ending Soon",
                vietnamese: "Ưu đãi sắp kết thúc"
              })}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              {t({
                english: "Founding Member Special",
                vietnamese: "Ưu Đãi Thành Viên Sáng Lập"
              })}
            </h1>
            
            <div className="flex flex-col items-center gap-2 mb-8">
              <span className="text-xl text-gray-500 line-through">
                $5,999/year
              </span>
              <span className="text-4xl md:text-5xl font-bold text-emvi-accent">
                $99
                <span className="text-xl text-gray-600 font-normal">/year</span>
              </span>
            </div>
          </motion.div>
        </div>
      </GradientBackground>

      {/* Founders Early Access Section */}
      <FoundersEarlyAccess />

      {/* Referral Banner */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-purple-50 to-pink-50 py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
            {t({
              english: "Invite Friends & Earn Rewards",
              vietnamese: "Mời Bạn Bè & Nhận Phần Thưởng"
            })}
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            {t({
              english: "Invite friends now and unlock exclusive bonuses when EmviApp launches!",
              vietnamese: "Mời bạn bè ngay và mở khóa phần thưởng độc quyền khi EmviApp ra mắt!"
            })}
          </p>
          <Button 
            size="lg"
            className="bg-emvi-accent hover:bg-emvi-accent/90"
          >
            {t({
              english: "Generate My Referral Link",
              vietnamese: "Tạo Liên Kết Giới Thiệu"
            })}
          </Button>
        </div>
      </motion.section>
    </div>
  );
};

export default PricingPage;
