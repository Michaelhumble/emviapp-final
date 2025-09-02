import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useTranslation, Translation } from '@/hooks/useTranslation';
import { Sparkles, TrendingUp, Shield } from 'lucide-react';

const AffiliateHero = () => {
  const { t, isVietnamese } = useTranslation();

  const heroContent = {
    badge: {
      english: "💰 Now Accepting New Affiliates",
      vietnamese: "💰 Đang Tuyển Cộng Tác Viên Mới"
    } as Translation,
    headline: {
      english: "Earn monthly payouts for growing the beauty community",
      vietnamese: "Nhận tiền thưởng mỗi tháng khi giúp cộng đồng làm đẹp phát triển"
    } as Translation,
    subline: {
      english: "Transparent commissions, real-time tracking, Stripe Connect payouts.",
      vietnamese: "Hoa hồng minh bạch, theo dõi thời gian thực, thanh toán qua Stripe Connect."
    } as Translation,
    primaryCta: {
      english: "Join Now",
      vietnamese: "Tham gia ngay"
    } as Translation,
    secondaryCta: {
      english: "How it works",
      vietnamese: "Cách hoạt động"
    } as Translation,
    trustRow: {
      english: "Powered by Stripe Connect • Transparent analytics • 24/7 tracking",
      vietnamese: "Được hỗ trợ bởi Stripe Connect • Phân tích minh bạch • Theo dõi 24/7"
    } as Translation
  };

  const handleCTAClick = (action: string) => {
    // Light GA4 event dispatch (guarded)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'affiliate_lp_cta_click', {
        event_category: 'affiliate',
        event_label: action,
        value: 1
      });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[hsl(var(--pearl-white))]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/8"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 100,
              scale: 0,
              opacity: 0
            }}
            animate={{ 
              y: -100,
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{ 
              duration: Math.random() * 8 + 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Badge className="mb-8 px-6 py-3 text-sm font-medium rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 hover:from-primary/20 hover:to-primary/10 transition-all duration-300">
            {t(heroContent.badge)}
          </Badge>
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent animate-gradient">
            {t(heroContent.headline)}
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {t(heroContent.subline)}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <Button 
            size="lg" 
            className="rounded-2xl px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
            asChild
            onClick={() => handleCTAClick('join_now')}
          >
            <Link to="/affiliate">{t(heroContent.primaryCta)}</Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-2xl px-8 py-6 text-base font-semibold border-2 hover:bg-accent/10 transition-all duration-300"
            asChild
            onClick={() => handleCTAClick('how_it_works')}
          >
            <Link to="#how-it-works">{t(heroContent.secondaryCta)}</Link>
          </Button>
        </motion.div>
        
        {/* Trust indicators */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>Stripe Connect</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-muted-foreground/50 rounded-full"></div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span>{isVietnamese ? "Phân tích minh bạch" : "Transparent analytics"}</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-muted-foreground/50 rounded-full"></div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>{isVietnamese ? "Theo dõi 24/7" : "24/7 tracking"}</span>
          </div>
        </motion.div>

        {/* Quick stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          {[
            { number: "30%", label: isVietnamese ? "Tỷ lệ hoa hồng" : "Commission Rate" },
            { number: "$50", label: isVietnamese ? "Thanh toán tối thiểu" : "Minimum Payout" },
            { number: "90", label: isVietnamese ? "Thời gian cookie (ngày)" : "Day Cookie Window" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-300"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AffiliateHero;