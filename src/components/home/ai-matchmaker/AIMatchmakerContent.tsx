
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import AIFeatureCard from "./AIFeatureCard";
import { Users, MapPin, Zap, TrendingUp } from "lucide-react";

interface AIMatchmakerContentProps {
  language: "en" | "vi";
  itemVariants: any;
}

const AIMatchmakerContent = ({ language, itemVariants }: AIMatchmakerContentProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCTAClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  const features = language === "en" ? [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Perfect Talent Matching",
      description: "Find the best artists and staff for your salon in seconds. Our AI analyzes skills, experience, and personality—so you build the dream team, not just fill a seat.",
      gradient: "from-purple-500/10 via-indigo-500/10 to-blue-500/10",
      accentColor: "border-purple-200"
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Salon Finder & Smart Listings",
      description: "Buy, sell, or discover top-rated salons. AI surfaces the best opportunities and dream locations—tailored for owners, artists, and investors.",
      gradient: "from-blue-500/10 via-teal-500/10 to-emerald-500/10",
      accentColor: "border-blue-200"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Instant Job & Customer Matching",
      description: "Artists find perfect-fit jobs. Customers are matched to the right artists and salons—every time, everywhere.",
      gradient: "from-emerald-500/10 via-yellow-500/10 to-orange-500/10",
      accentColor: "border-emerald-200"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Trust & Growth Engine",
      description: "EmviApp's AI works for you 24/7: boosting trust, building your reputation, and helping you grow with every click.",
      gradient: "from-orange-500/10 via-red-500/10 to-pink-500/10",
      accentColor: "border-orange-200"
    }
  ] : [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Ghép Đôi Nhân Tài Hoàn Hảo",
      description: "Tìm những nghệ sĩ và nhân viên tốt nhất cho tiệm của bạn trong vài giây. AI phân tích kỹ năng, kinh nghiệm và tính cách—để bạn xây dựng đội ngũ mơ ước, không chỉ lấp chỗ trống.",
      gradient: "from-purple-500/10 via-indigo-500/10 to-blue-500/10",
      accentColor: "border-purple-200"
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Tìm Kiếm Tiệm & Danh Sách Thông Minh",
      description: "Mua, bán, hoặc khám phá các tiệm hàng đầu. AI tìm ra những cơ hội tốt nhất và địa điểm mơ ước—phù hợp cho chủ tiệm, nghệ sĩ và nhà đầu tư.",
      gradient: "from-blue-500/10 via-teal-500/10 to-emerald-500/10",
      accentColor: "border-blue-200"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Ghép Đôi Công Việc & Khách Hàng Tức Thì",
      description: "Nghệ sĩ tìm được công việc phù hợp hoàn hảo. Khách hàng được ghép với đúng nghệ sĩ và tiệm—mọi lúc, mọi nơi.",
      gradient: "from-emerald-500/10 via-yellow-500/10 to-orange-500/10",
      accentColor: "border-emerald-200"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Động Cơ Tin Tưởng & Phát Triển",
      description: "AI của EmviApp làm việc cho bạn 24/7: tăng cường lòng tin, xây dựng danh tiếng và giúp bạn phát triển với mỗi cú click.",
      gradient: "from-orange-500/10 via-red-500/10 to-pink-500/10",
      accentColor: "border-orange-200"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Feature cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {features.map((feature, index) => (
          <AIFeatureCard 
            key={index}
            feature={feature}
            index={index}
          />
        ))}
      </div>
      
      {/* Premium CTA Button */}
      <motion.div
        className="flex justify-center pt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Button
          size="lg"
          onClick={handleCTAClick}
          className="relative px-16 py-8 text-xl font-bold text-white rounded-2xl overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-2xl border-0"
          style={{
            background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 30%, #F59E0B 70%, #10B981 100%)",
            boxShadow: "0 12px 32px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.3)"
          }}
        >
          {/* Enhanced shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          {/* Button text */}
          <span className="relative z-10">
            {language === "en" 
              ? "Try Your AI Matchmaker →"
              : "Khám Phá AI Ghép Đôi Ngay →"
            }
          </span>
          
          {/* Enhanced glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 via-pink-400/30 to-emerald-400/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
      </motion.div>
    </div>
  );
};

export default AIMatchmakerContent;
