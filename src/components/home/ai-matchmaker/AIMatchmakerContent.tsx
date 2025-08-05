
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
    <div className="space-y-16">
      {/* Feature cards grid with clean, sophisticated design */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="group relative bg-white rounded-2xl p-8 shadow-sm border border-slate-200/80 hover:shadow-lg hover:border-slate-300/80 transition-all duration-500 hover:-translate-y-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Icon */}
            <div className="mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
            </div>
            
            {/* Content */}
            <div>
              <h3 className="text-xl font-display font-semibold text-slate-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed font-primary">
                {feature.description}
              </p>
            </div>
            
            {/* Subtle accent line */}
            <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-purple-200 via-pink-200 to-orange-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>
      
      {/* CTA Button with refined design */}
      <motion.div
        className="flex justify-center pt-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            size="lg"
            onClick={handleCTAClick}
            className="relative px-8 py-4 text-lg font-primary font-medium text-white rounded-xl overflow-hidden group transition-all duration-300 border-0 shadow-md hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%)",
            }}
          >
            {/* Subtle shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12" />
            
            {/* Button content */}
            <span className="relative z-10 flex items-center gap-3">
              <span>
                {language === "en" 
                  ? "✨ Experience Your AI Matchmaker"
                  : "✨ Khám Phá AI Ghép Đôi Ngay"
                }
              </span>
              <motion.span
                className="inline-block text-lg"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AIMatchmakerContent;
