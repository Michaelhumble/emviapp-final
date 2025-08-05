import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Users, TrendingUp, Star, Crown, Zap, ArrowRight } from "lucide-react";

interface HeroImage {
  url: string;
  alt: string;
  industry?: string;
  title?: string;
  subtitle?: string;
  cta?: {
    text: string;
    link: string;
  };
}

interface HeroContentProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  heroImages: HeroImage[];
  isMobile?: boolean;
}

const FloatingParticle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
    initial={{ y: 100, opacity: 0 }}
    animate={{ 
      y: [-10, -30, -10], 
      opacity: [0, 0.8, 0],
      scale: [0.5, 1, 0.5]
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
    style={{
      left: `${Math.random() * 100}%`,
      filter: 'blur(0.5px)'
    }}
  />
);

const PremiumCounter = ({ target, label, icon: Icon }: { target: number, label: string, icon: any }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev < target) {
          return prev + Math.ceil(target / 50);
        }
        return target;
      });
    }, 50);
    
    return () => clearInterval(timer);
  }, [target]);

  return (
    <motion.div
      className="flex items-center space-x-3 bg-white/10 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/20"
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <div className="text-2xl font-bold text-white">
          {count.toLocaleString()}+
        </div>
        <div className="text-sm text-white/70">{label}</div>
      </div>
    </motion.div>
  );
};

const IndustryBadge = ({ industry, isActive }: { industry: string, isActive: boolean }) => {
  const getIndustryIcon = (industry: string) => {
    switch (industry) {
      case 'Nail Tech':
      case 'Nail Artist':
        return '💅';
      case 'Barber':
        return '✂️';
      case 'Hair Stylist':
        return '💇‍♀️';
      case 'Makeup Artist':
        return '💄';
      case 'Esthetician':
        return '🧴';
      case 'Massage Therapist':
        return '💆‍♀️';
      default:
        return '✨';
    }
  };

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
      className="absolute top-12 left-12 z-20"
    >
      <div className="flex items-center space-x-3 bg-black/40 backdrop-blur-2xl rounded-2xl px-6 py-3 border border-white/20">
        <span className="text-2xl">{getIndustryIcon(industry)}</span>
        <span className="text-white font-bold text-lg">{industry}</span>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      </div>
    </motion.div>
  );
};

const PremiumGradientOrb = ({ className }: { className: string }) => (
  <motion.div
    className={`absolute rounded-full opacity-20 ${className}`}
    animate={{
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }}
    style={{
      background: 'radial-gradient(circle, rgba(147,51,234,0.3) 0%, rgba(219,39,119,0.2) 50%, transparent 100%)'
    }}
  />
);

const HeroContent = ({ 
  activeIndex, 
  setActiveIndex, 
  heroImages,
  isMobile = false
}: HeroContentProps) => {
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const currentSlide = heroImages[activeIndex];
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isMobile]);

  const getVisibleDots = () => {
    if (heroImages.length <= 7) return heroImages.map((_, i) => i);
    
    const halfVisible = 3;
    let startIdx = activeIndex - halfVisible;
    let endIdx = activeIndex + halfVisible;
    
    if (startIdx < 0) {
      endIdx = Math.min(endIdx - startIdx, heroImages.length - 1);
      startIdx = 0;
    }
    
    if (endIdx >= heroImages.length) {
      startIdx = Math.max(0, startIdx - (endIdx - heroImages.length + 1));
      endIdx = heroImages.length - 1;
    }
    
    return Array.from({ length: endIdx - startIdx + 1 }, (_, i) => i + startIdx);
  };
  
  const visibleDots = getVisibleDots();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Premium Background Effects */}
      <PremiumGradientOrb className="w-96 h-96 -top-48 -left-48" />
      <PremiumGradientOrb className="w-64 h-64 -bottom-32 -right-32" />
      
      {/* Floating Particles */}
      {!isMobile && Array.from({ length: 12 }).map((_, i) => (
        <FloatingParticle key={i} delay={i * 0.5} />
      ))}
      
      {/* Mouse Follower Effect */}
      {!isMobile && (
        <motion.div
          className="fixed w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none z-50 mix-blend-screen opacity-50"
          animate={{
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}

      {/* Industry Badge */}
      <AnimatePresence mode="wait">
        <IndustryBadge 
          key={activeIndex} 
          industry={currentSlide?.industry || ""} 
          isActive={!!currentSlide?.industry} 
        />
      </AnimatePresence>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 flex items-center justify-center min-h-screen w-full px-4 sm:px-6 lg:px-8"
        style={{
          background: !isMobile ? 
            `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147,51,234,0.1) 0%, transparent 50%)` : 
            undefined
        }}
      >
        <div className="max-w-7xl mx-auto text-center space-y-8">
          {/* Premium Hero Title with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 -m-8" />
            <h1 className="relative text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 leading-tight">
              The Future of
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent animate-pulse">
                Beauty Careers
              </span>
            </h1>
            
            {/* Animated subtitle */}
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-xl md:text-3xl text-white/90 max-w-4xl mx-auto mt-6 leading-relaxed font-light"
            >
              {currentSlide?.subtitle || "Where 10,000+ beauty professionals build extraordinary careers"}
            </motion.p>
          </motion.div>

          {/* Premium Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-12"
          >
            <PremiumCounter target={10000} label="Professionals" icon={Users} />
            <PremiumCounter target={500} label="Premium Salons" icon={Crown} />
            <PremiumCounter target={98} label="Success Rate" icon={TrendingUp} />
          </motion.div>

          {/* Premium CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16"
          >
            <Link to={currentSlide?.cta?.link || "/auth/signup"}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg"
                  className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl border-2 border-white/20 backdrop-blur-xl"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <Sparkles className="mr-3 h-6 w-6" />
                  {currentSlide?.cta?.text || "Start Your Journey"}
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </motion.div>
            </Link>
            
            <Link to="/salons">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg"
                  variant="outline"
                  className="bg-black/20 backdrop-blur-xl border-2 border-white/30 text-white hover:bg-white/10 px-10 py-6 text-lg font-bold rounded-2xl"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Explore Salons
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Premium Navigation Dots */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center items-center gap-3 mt-16"
          >
            {heroImages.length > 7 && activeIndex > 3 && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveIndex(Math.max(0, activeIndex - 5))}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                ⟨
              </motion.button>
            )}
            
            {visibleDots.map(index => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveIndex(index)}
                className={`relative w-14 h-14 rounded-full transition-all ${
                  activeIndex === index 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-110' 
                    : 'bg-white/20 backdrop-blur-xl border border-white/30 hover:bg-white/30'
                }`}
              >
                {activeIndex === index && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                )}
                <div className={`relative z-10 w-4 h-4 rounded-full mx-auto ${
                  activeIndex === index ? 'bg-white' : 'bg-white/60'
                }`} />
              </motion.button>
            ))}
            
            {heroImages.length > 7 && activeIndex < heroImages.length - 4 && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveIndex(Math.min(heroImages.length - 1, activeIndex + 5))}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                ⟩
              </motion.button>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroContent;