
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
    <div className="space-y-6">
      {/* Content blocks */}
      <div className="grid grid-cols-1 gap-6 md:gap-8">
        {language === "en" ? <EnglishContent /> : <VietnameseContent />}
      </div>
      
      {/* Enhanced Premium CTA Button */}
      <motion.div
        className="flex justify-center pt-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            size="lg"
            onClick={handleCTAClick}
            className="relative px-10 py-5 text-lg font-bold text-white rounded-2xl overflow-hidden group transition-all duration-500 border-0 shadow-2xl hover:shadow-purple-500/30"
            style={{
              background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%)",
              boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3), 0 8px 16px rgba(139, 92, 246, 0.2), 0 0 0 1px rgba(255,255,255,0.1)"
            }}
            aria-label="Try EmviApp now"
          >
            {/* Enhanced shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 group-hover:animate-shimmer" />
            
            {/* Button text with icon */}
            <span className="relative z-10 flex items-center">
              <span className="mr-3">
                {language === "en" 
                  ? "🚀 Try it now and experience the difference"
                  : "🚀 Hãy cùng trải nghiệm EmviApp ngay bây giờ"
                }
              </span>
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </span>
            
            {/* Enhanced glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/40 via-pink-400/40 to-amber-400/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContentCard;
