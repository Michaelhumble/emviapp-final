
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import EnglishContent from "./EnglishContent";
import VietnameseContent from "./VietnameseContent";

interface ContentCardProps {
  language: "en" | "vi";
  itemVariants: any;
}

const ContentCard = ({ language, itemVariants }: ContentCardProps) => {
  const { isVietnamese } = useTranslation();

  return (
    <div className="space-y-16">
      {/* Single Title and Subheadline */}
      <motion.div
        className="text-center space-y-6"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6">
          {isVietnamese 
            ? "Hãy Cùng Nhau Trải Nghiệm EmviApp ✨"
            : "Let's Experience EmviApp Together ✨"
          }
        </h1>
        <p className="text-xl md:text-2xl text-white/90 font-medium">
          {isVietnamese
            ? "Được Xây Dựng Với Tình Yêu Cho Ngành Làm Đẹp"
            : "Built With Love for the Beauty Community"
          }
        </p>
      </motion.div>

      {/* Content Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {isVietnamese ? <VietnameseContent /> : <EnglishContent />}
      </div>

      {/* Premium CTA Button */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Button
          size="lg"
          className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl border border-white/30 text-white hover:from-white/30 hover:to-white/20 transition-all duration-300 px-12 py-6 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105"
        >
          {isVietnamese
            ? "Hãy cùng nhau trải nghiệm những điều thú vị mà EmviApp mang đến cho bạn — ngay bây giờ →"
            : "Try it now and experience the difference →"
          }
        </Button>
      </motion.div>
    </div>
  );
};

export default ContentCard;
