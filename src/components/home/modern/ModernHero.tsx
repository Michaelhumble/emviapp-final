import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Users, TrendingUp } from "lucide-react";
import LanguageToggleButton from "../missing-piece/LanguageToggleButton";
import heroImage from "@/assets/hero-ai-beauty-salon.jpg";

interface ModernHeroProps {
  isVietnamese?: boolean;
  toggleLanguage?: () => void;
}

const ModernHero = ({ isVietnamese = false, toggleLanguage = () => {} }: ModernHeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage}
          alt="AI-powered beauty salon with professional nail technicians and modern technology"
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(37, 99, 235, 0.9) 0%, rgba(147, 51, 234, 0.95) 50%, rgba(219, 39, 119, 0.9) 100%)"
          }}
        />
      </div>

      {/* Language Toggle - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageToggleButton 
          isVietnamese={isVietnamese}
          toggleLanguage={toggleLanguage}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Hero Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8"
          >
            <Sparkles className="h-5 w-5 text-yellow-300" />
            <span className="text-sm font-medium">
              {isVietnamese ? "2.4 Triệu+ Chuyên Gia Làm Đẹp Tin Tưởng" : "Trusted by 2.4M+ Beauty Professionals Worldwide"}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            {isVietnamese ? (
              <>
                Tìm <span className="text-yellow-300">Nghệ Sĩ Làm Đẹp</span><br />
                Tốt Nhất Gần Bạn
              </>
            ) : (
              <>
                Book the Best <span className="text-yellow-300">Beauty Artists</span><br />
                Near You
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed max-w-3xl mx-auto"
          >
            {isVietnamese 
              ? "Kết nối với hàng nghìn salon, nail tech, stylist và makeup artist. Đặt lịch dễ dàng, tìm việc mơ ước hoặc mở rộng thương hiệu với AI thông minh."
              : "Connect with thousands of salons, nail techs, stylists & makeup artists. Book services easily, find dream jobs, or grow your beauty business with intelligent AI."
            }
          </motion.p>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-300" />
              <span className="text-lg font-semibold">15,000+ {isVietnamese ? "Chuyên Gia" : "Artists"}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-300" />
              <span className="text-lg font-semibold">$2.8B {isVietnamese ? "Thị Trường" : "Market"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-300" />
              <span className="text-lg font-semibold">92% {isVietnamese ? "Thành Công" : "Success Rate"}</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/booking-services">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-lg shadow-xl"
              >
                {isVietnamese ? "Đặt Lịch Ngay" : "Book Services Now"}
              </Button>
            </Link>
            <Link to="/auth/signup">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg"
              >
                {isVietnamese ? "Tìm Việc Làm Đẹp" : "Find Beauty Jobs"}
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 text-white/70"
          >
            <p className="text-sm">
              {isVietnamese 
                ? "Được tin tưởng bởi các salon hàng đầu tại Mỹ và Việt Nam"
                : "Trusted by leading salons across America and Vietnam"
              }
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernHero;