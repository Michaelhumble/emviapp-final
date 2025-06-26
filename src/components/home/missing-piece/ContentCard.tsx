
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

interface ContentCardProps {
  language: "en" | "vi";
  itemVariants: any;
}

const ContentCard = ({ language, itemVariants }: ContentCardProps) => {
  const { isVietnamese } = useTranslation();

  const content = {
    en: {
      heading: "Let's Experience EmviApp Together",
      subsection1: {
        title: "Your Business, Supercharged",
        content: "We help bring customers straight to your salon. Our platform connects you with skilled technicians, delivers irresistible offers, and streamlines shop management — all in one elegant solution."
      },
      subsection2: {
        content: "EmviApp's intelligent AI handles the complex work — so you can focus on your passion and growing your business."
      },
      subsection3: {
        content: "Without EmviApp, you might be missing out on opportunities that your competitors are already embracing. 😔"
      },
      ctaButton: "Try it now and experience the difference →"
    },
    vi: {
      heading: "Hãy Cùng Nhau Trải Nghiệm EmviApp",
      subsection1: {
        title: "Kinh Doanh Của Bạn, Được Nâng Cấp",
        content: "Chúng tôi giúp bạn mang khách hàng đến tận tiệm. Giúp bạn tìm những thợ giỏi, có kinh nghiệm, và đưa ra những ưu đãi tốt nhất — để bạn quản lý tiệm dễ dàng và đạt hiệu quả cao."
      },
      subsection2: {
        content: "Hãy để A.I thông minh của EmviApp lo mọi thứ cho bạn — bạn chỉ cần tập trung làm điều mình yêu thích và phát triển sự nghiệp của mình."
      },
      subsection3: {
        content: "Nếu bạn không dùng thử EmviApp... Chắc chắn bạn đang bỏ lỡ một công nghệ có thể giải quyết rất nhiều việc cùng một lúc. 😔"
      },
      ctaButton: "Hãy cùng nhau trải nghiệm những điều thú vị mà EmviApp mang đến cho bạn — ngay bây giờ →"
    }
  };

  const currentContent = isVietnamese ? content.vi : content.en;

  return (
    <div className="space-y-16">
      {/* Single Main Hero Title */}
      <motion.div
        className="text-center space-y-6"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6">
          {currentContent.heading}
        </h1>
      </motion.div>

      {/* Premium Subsection Cards */}
      <div className="space-y-8 mb-16">
        {/* Subsection 1 - Business Card */}
        <motion.div
          className="group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-xl border border-white/25 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="text-center space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-white font-playfair leading-tight">
                {currentContent.subsection1.title}
              </h3>
              <p className="text-lg md:text-xl text-white/95 leading-relaxed font-medium">
                {currentContent.subsection1.content}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Subsection 2 - AI Block */}
        <motion.div
          className="group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gradient-to-br from-purple-500/20 via-blue-500/15 to-indigo-500/10 backdrop-blur-xl border border-white/25 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="text-center">
              <p className="text-lg md:text-xl text-white/95 leading-relaxed font-medium italic">
                {currentContent.subsection2.content}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Subsection 3 - Reminder Block */}
        <motion.div
          className="group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-red-500/10 backdrop-blur-xl border border-white/25 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="text-center">
              <p className="text-lg md:text-xl text-white/95 leading-relaxed font-medium">
                {currentContent.subsection3.content}
              </p>
            </div>
          </div>
        </motion.div>
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
          {currentContent.ctaButton}
        </Button>
      </motion.div>
    </div>
  );
};

export default ContentCard;
