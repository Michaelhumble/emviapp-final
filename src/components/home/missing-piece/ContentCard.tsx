
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import EnglishContent from "./EnglishContent";
import VietnameseContent from "./VietnameseContent";

interface ContentCardProps {
  language: "en" | "vi";
  itemVariants: any;
}

const ContentCard = ({ language, itemVariants }: ContentCardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCTAClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="space-y-8">
      {/* Content blocks */}
      <div className="grid grid-cols-1 gap-8 md:gap-10">
        {language === "en" ? <EnglishContent /> : <VietnameseContent />}
      </div>
      
      {/* Premium CTA Button */}
      <motion.div
        className="flex justify-center pt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Button
          size="lg"
          onClick={handleCTAClick}
          className="relative px-12 py-6 text-lg font-semibold text-white rounded-2xl overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-2xl border-0"
          style={{
            background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%)",
            boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)"
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          {/* Button text */}
          <span className="relative z-10">
            {language === "en" 
              ? "Try it now and experience the difference →"
              : "Hãy cùng nhau trải nghiệm những điều thú vị mà EmviApp mang đến cho bạn — ngay bây giờ →"
            }
          </span>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-amber-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
      </motion.div>
    </div>
  );
};

export default ContentCard;
