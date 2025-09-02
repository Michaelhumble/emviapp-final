import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation, Translation } from '@/hooks/useTranslation';
import { ArrowRight, Sparkles, DollarSign } from 'lucide-react';

const FinalCTASection = () => {
  const { t, isVietnamese } = useTranslation();

  const content = {
    headline: {
      english: "Start earning with EmviApp",
      vietnamese: "Bắt đầu kiếm tiền với EmviApp"
    } as Translation,
    subline: {
      english: "Join hundreds of creators building sustainable income with our transparent affiliate program",
      vietnamese: "Tham gia cùng hàng trăm người sáng tạo xây dựng thu nhập bền vững với chương trình cộng tác viên minh bạch của chúng tôi"
    } as Translation,
    primaryButton: {
      english: "Join as an Affiliate",
      vietnamese: "Tham gia làm cộng tác viên"
    } as Translation,
    secondaryButton: {
      english: "View Dashboard",
      vietnamese: "Xem bảng điều khiển"
    } as Translation
  };

  const features = [
    {
      icon: DollarSign,
      text: {
        english: "30% recurring commissions",
        vietnamese: "Hoa hồng định kỳ 30%"
      } as Translation
    },
    {
      icon: Sparkles,
      text: {
        english: "90-day attribution window", 
        vietnamese: "Cửa sổ ghi nhận 90 ngày"
      } as Translation
    }
  ];

  const handleCTAClick = (action: string) => {
    // Light GA4 event dispatch (guarded)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'affiliate_lp_cta_click', {
        event_category: 'affiliate',
        event_label: `final_cta_${action}`,
        value: 1
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-primary/5 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              {t(content.headline)}
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t(content.subline)}
          </motion.p>

          {/* Feature highlights */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50">
                  <IconComponent className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {t(feature.text)}
                  </span>
                </div>
              );
            })}
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg" 
              className="rounded-2xl px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 group"
              asChild
              onClick={() => handleCTAClick('join_affiliate')}
            >
              <Link to="/affiliate" className="flex items-center gap-2">
                {t(content.primaryButton)}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-2xl px-8 py-6 text-base font-semibold border-2 hover:bg-accent/10 transition-all duration-300"
              asChild
              onClick={() => handleCTAClick('view_dashboard')}
            >
              <Link to="/affiliate/dashboard">
                {t(content.secondaryButton)}
              </Link>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div 
            className="mt-12 text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p>
              {t({ 
                english: "✓ No setup fees • ✓ No monthly minimums • ✓ Cancel anytime",
                vietnamese: "✓ Không phí thiết lập • ✓ Không tối thiểu hàng tháng • ✓ Hủy bất kỳ lúc nào"
              })}
            </p>
          </motion.div>
        </motion.div>

        {/* Floating animation elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: window.innerHeight + 50,
                scale: 0
              }}
              animate={{ 
                y: -50,
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{ 
                duration: Math.random() * 6 + 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;