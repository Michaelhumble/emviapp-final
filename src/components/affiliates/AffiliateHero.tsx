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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ 
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(167, 139, 250, 0.08) 0%, transparent 50%),
          linear-gradient(135deg, #fafafa 0%, #f8fafc 100%)
        `
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Premium Background Grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-8 text-center relative z-10 max-w-8xl">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-16"
        >
          {/* Ultra-Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-xl border border-white/30 rounded-full shadow-2xl"
          >
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-lg font-semibold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              {t(heroContent.badge)}
            </span>
          </motion.div>

          {/* Ultra-Premium Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-8"
          >
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-[-0.04em] max-w-7xl mx-auto">
              <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Earn monthly
              </span>
              <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                payouts
              </span>
              <span className="block text-gray-900">
                for growing the
              </span>
              <span className="block bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                beauty community
              </span>
            </h1>
          </motion.div>

          {/* Ultra-Premium Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-3xl font-medium text-gray-600 max-w-5xl mx-auto leading-relaxed tracking-[-0.01em]"
          >
            Join 500+ creators earning with transparent commissions, real-time tracking, and secure Stripe Connect payouts.
          </motion.p>

          {/* Ultra-Premium CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-8"
          >
            <Button 
              size="lg" 
              className="group relative overflow-hidden bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-0 rounded-2xl px-12 py-8 text-xl font-bold min-w-[320px] h-auto shadow-[0_20px_40px_-12px_rgba(124,58,237,0.4)] hover:shadow-[0_32px_64px_-12px_rgba(124,58,237,0.5)] transition-all duration-500"
              style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              }}
              asChild
              onClick={() => handleCTAClick('join_now')}
            >
              <Link ref={buttonRef} to="/affiliate" data-magnetic="true">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10 flex items-center gap-3">
                  {t(heroContent.primaryCta)}
                  <div className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                </span>
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-gray-300 hover:bg-white text-gray-900 rounded-2xl px-12 py-8 text-xl font-semibold min-w-[320px] h-auto shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
              onClick={() => handleCTAClick('how_it_works')}
            >
              <Link to="#how-it-works">{t(heroContent.secondaryCta)}</Link>
            </Button>
          </motion.div>

          {/* Ultra-Premium Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="pt-24"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {[
                { 
                  number: "30%", 
                  label: isVietnamese ? "Tỷ lệ hoa hồng" : "Commission Rate",
                  gradient: "from-emerald-500 to-teal-600",
                  icon: "💰"
                },
                { 
                  number: "$50", 
                  label: isVietnamese ? "Thanh toán tối thiểu" : "Minimum Payout",
                  gradient: "from-blue-500 to-indigo-600",
                  icon: "💳"
                },
                { 
                  number: "90", 
                  label: isVietnamese ? "Thời gian cookie (ngày)" : "Day Cookie Window",
                  gradient: "from-purple-500 to-violet-600",
                  icon: "⏰"
                }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 + index * 0.2 }}
                  className="group relative"
                >
                  <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-12 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_48px_-8px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-2">
                    <div className="text-6xl mb-4">{stat.icon}</div>
                    <div className={`text-5xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {stat.number}
                    </div>
                    <div className="text-lg font-semibold text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Ultra-Premium Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-wrap items-center justify-center gap-12 pt-16"
          >
            {[
              { icon: Shield, text: "Stripe Connect", color: "text-blue-600" },
              { icon: TrendingUp, text: isVietnamese ? "Phân tích minh bạch" : "Transparent analytics", color: "text-green-600" },
              { icon: Sparkles, text: isVietnamese ? "Theo dõi 24/7" : "24/7 tracking", color: "text-purple-600" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-white/60 backdrop-blur-sm px-6 py-4 rounded-full border border-white/30 shadow-lg">
                <item.icon className={`w-6 h-6 ${item.color}`} />
                <span className="text-lg font-medium text-gray-700">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Premium Floating Elements */}
      {flags.AFFILIATE_LUX_ENABLE && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-violet-300/20 to-purple-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-blue-300/15 to-indigo-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }} />
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-pink-300/30 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '3s' }} />
        </div>
      )}
    </section>
  );
};

export default AffiliateHero;