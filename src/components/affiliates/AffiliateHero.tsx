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
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden section-hero"
      style={{ background: 'var(--gradient-mesh-premium)' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-6 text-center relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-12"
        >
          {/* Premium Trust Badge */}
          <Badge className="mb-8 px-8 py-4 text-lg font-semibold rounded-3xl glass-hero-card border-0 shadow-lg">
            {t(heroContent.badge)}
          </Badge>
        
          {/* Premium Main Headline */}
          <h1 className="text-hero-primary mb-8 max-w-6xl mx-auto leading-[1.02] tracking-tight">
            {t(heroContent.headline)}
          </h1>
          
          {/* Premium Subheadline */}
          <p className="text-body-large text-muted-foreground/90 mb-16 max-w-4xl mx-auto font-medium">
            {t(heroContent.subline)}
          </p>
          
          {/* Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-20">
            <Button 
              size="lg" 
              className={`btn-magnetic focus-ring-premium rounded-3xl px-12 py-8 text-xl font-bold min-w-[280px] h-auto border-0 ${
                flags.AFFILIATE_LUX_ENABLE ? 'relative overflow-hidden' : ''
              }`}
              style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                ...(flags.AFFILIATE_LUX_ENABLE && !prefersReducedMotion() ? {
                  boxShadow: '0 0 40px hsl(var(--primary) / 0.4), 0 8px 32px -8px hsl(var(--primary) / 0.3)'
                } : {})
              }}
              asChild
              onClick={() => handleCTAClick('join_now')}
            >
              <Link ref={buttonRef} to="/affiliate" data-magnetic="true">
                {flags.AFFILIATE_LUX_ENABLE && !prefersReducedMotion() && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/30 to-primary/20 blur-2xl animate-pulse"></div>
                )}
                <span className="relative z-10">{t(heroContent.primaryCta)}</span>
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-3xl px-12 py-8 text-xl font-semibold min-w-[280px] h-auto border-2 hover:bg-white/90 glass-hero-card transition-all duration-500"
              asChild
              onClick={() => handleCTAClick('how_it_works')}
            >
              <Link to="#how-it-works">{t(heroContent.secondaryCta)}</Link>
            </Button>
          </div>
          
          {/* Premium Trust Row */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-12 text-lg text-muted-foreground/80 max-w-4xl mx-auto mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 glass-hero-card px-8 py-4 rounded-full border-0 shadow-md">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-semibold">Stripe Connect</span>
            </div>
            <div className="hidden sm:block w-2 h-2 bg-muted-foreground/30 rounded-full"></div>
            <div className="flex items-center gap-4 glass-hero-card px-8 py-4 rounded-full border-0 shadow-md">
              <TrendingUp className="w-6 h-6 text-primary" />
              <span className="font-semibold">{isVietnamese ? "Phân tích minh bạch" : "Transparent analytics"}</span>
            </div>
            <div className="hidden sm:block w-2 h-2 bg-muted-foreground/30 rounded-full"></div>
            <div className="flex items-center gap-4 glass-hero-card px-8 py-4 rounded-full border-0 shadow-md">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="font-semibold">{isVietnamese ? "Theo dõi 24/7" : "24/7 tracking"}</span>
            </div>
          </motion.div>

          {/* Premium Stats Grid */}
          <motion.div 
            className="stats-grid-premium max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            {[
              { number: "30%", label: isVietnamese ? "Tỷ lệ hoa hồng" : "Commission Rate", color: "from-green-500 to-emerald-600" },
              { number: "$50", label: isVietnamese ? "Thanh toán tối thiểu" : "Minimum Payout", color: "from-blue-500 to-indigo-600" },
              { number: "90", label: isVietnamese ? "Thời gian cookie (ngày)" : "Day Cookie Window", color: "from-purple-500 to-violet-600" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="stat-card-premium text-center p-10 group cursor-pointer"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className={`text-6xl font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Premium Background Elements */}
      {flags.AFFILIATE_LUX_ENABLE && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-60 -right-60 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-accent/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-60 -left-60 w-[800px] h-[800px] bg-gradient-to-tr from-accent/8 to-primary/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>
      )}
    </section>
  );
};

export default AffiliateHero;