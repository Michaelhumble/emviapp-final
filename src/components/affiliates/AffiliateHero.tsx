import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useTranslation, Translation } from '@/hooks/useTranslation';
import { Sparkles, TrendingUp, Shield } from 'lucide-react';
import { flags, prefersReducedMotion } from '@/utils/featureFlags';

const AffiliateHero = () => {
  const { t, isVietnamese } = useTranslation();
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || prefersReducedMotion()) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    
    if (distance < 100) {
      const strength = Math.min(distance / 100, 1);
      const moveX = (deltaX / distance) * 8 * (1 - strength);
      const moveY = (deltaY / distance) * 8 * (1 - strength);
      
      setMousePosition({ x: moveX, y: moveY });
    } else {
      setMousePosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (prefersReducedMotion() && buttonRef.current) {
      buttonRef.current.setAttribute('data-magnetic', 'false');
    }
  }, []);

  return (
    <section 
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden section-premium"
      style={{ background: 'var(--gradient-mesh-premium)' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Badge className="mb-8 px-6 py-3 text-sm font-medium rounded-2xl glass-hero-card border-0">
            {t(heroContent.badge)}
          </Badge>
        </motion.div>
        
        <motion.h1 
          className="text-hero-primary mb-6 max-w-4xl mx-auto bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          {t(heroContent.headline)}
        </motion.h1>
        
        <motion.p 
          className="text-body-premium text-muted-foreground mb-12 max-w-2xl mx-auto"
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
            className={`btn-magnetic focus-ring-premium rounded-2xl px-8 py-6 text-base font-semibold border-0 ${
              flags.AFFILIATE_LUX_ENABLE ? 'relative overflow-hidden' : ''
            }`}
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              ...(flags.AFFILIATE_LUX_ENABLE && !prefersReducedMotion() ? {
                boxShadow: '0 0 20px hsl(var(--primary) / 0.3), 0 4px 16px -2px hsl(var(--primary) / 0.3)'
              } : {})
            }}
            asChild
            onClick={() => handleCTAClick('join_now')}
          >
            <Link ref={buttonRef} to="/affiliate" data-magnetic="true">
              {flags.AFFILIATE_LUX_ENABLE && !prefersReducedMotion() && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/10 blur-xl"></div>
              )}
              <span className="relative z-10">{t(heroContent.primaryCta)}</span>
            </Link>
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
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 glass-hero-card px-4 py-2 rounded-full border-0">
            <Shield className="w-4 h-4 text-primary" />
            <span>Stripe Connect</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-muted-foreground/50 rounded-full"></div>
          <div className="flex items-center gap-2 glass-hero-card px-4 py-2 rounded-full border-0">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span>{isVietnamese ? "Phân tích minh bạch" : "Transparent analytics"}</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-muted-foreground/50 rounded-full"></div>
          <div className="flex items-center gap-2 glass-hero-card px-4 py-2 rounded-full border-0">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>{isVietnamese ? "Theo dõi 24/7" : "24/7 tracking"}</span>
          </div>
        </motion.div>

        {/* Quick stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
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
              className="text-center p-6 glass-hero-card border-0"
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