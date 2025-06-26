
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ContentCardProps {
  language: "en" | "vi";
  itemVariants: any;
}

const ContentCard = ({ language, itemVariants }: ContentCardProps) => {
  const content = {
    en: {
      heading: "Let's Experience EmviApp Together",
      subsections: [
        {
          title: "Your Business, Supercharged",
          content: "We help bring customers straight to your salon. Our platform connects you with skilled technicians, delivers irresistible offers, and streamlines shop management — all in one elegant solution."
        },
        {
          title: "EmviApp's intelligent AI handles the complex work —",
          content: "so you can focus on your passion and growing your business."
        },
        {
          title: "Without EmviApp, you might be missing out on opportunities",
          content: "that your competitors are already embracing. 😔"
        }
      ],
      cta: "Try it now and experience the difference →"
    },
    vi: {
      heading: "Hãy Cùng Nhau Trải Nghiệm EmviApp",
      subsections: [
        {
          title: "Kinh Doanh Của Bạn, Được Nâng Cấp",
          content: "Chúng tôi giúp bạn mang khách hàng đến tận tiệm. Giúp bạn tìm những thợ giỏi, có kinh nghiệm, và đưa ra những ưu đãi tốt nhất — để bạn quản lý tiệm dễ dàng và đạt hiệu quả cao."
        },
        {
          title: "Hãy để A.I thông minh của EmviApp lo mọi thứ cho bạn —",
          content: "bạn chỉ cần tập trung làm điều mình yêu thích và phát triển sự nghiệp của mình."
        },
        {
          title: "Nếu bạn không dùng thử EmviApp...",
          content: "Chắc chắn bạn đang bỏ lỡ một công nghệ có thể giải quyết rất nhiều việc cùng một lúc. 😔"
        }
      ],
      cta: "Hãy cùng nhau trải nghiệm những điều thú vị mà EmviApp mang đến cho bạn — ngay bây giờ →"
    }
  };

  const currentContent = content[language];

  return (
    <div className="text-center space-y-12">
      {/* Premium Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-40"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Heading with Premium Gradient */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-gray-900 mb-6 leading-tight">
          {currentContent.heading}
          <span className="inline-block ml-2">✨</span>
        </h2>
        
        {/* Premium Gradient Underline */}
        <motion.div
          className="w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-full mx-auto mb-8"
          initial={{ width: 0 }}
          whileInView={{ width: 128 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>

      {/* Premium Content Cards */}
      <div className="grid gap-8 max-w-5xl mx-auto relative z-10">
        {currentContent.subsections.map((section, index) => (
          <motion.div
            key={index}
            className="group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl shadow-purple-100/30 p-8 md:p-12 hover:shadow-3xl hover:shadow-purple-200/40 transition-all duration-500 hover:scale-[1.02]">
              {/* Premium Glass Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/60 to-purple-50/80 rounded-3xl" />
              
              {/* Subtle Sparkle Accent */}
              <div className="absolute top-6 right-6 w-3 h-3 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-60 animate-pulse" />
              
              <div className="relative z-10 text-center space-y-4">
                <h3 className="text-xl md:text-2xl font-playfair font-bold text-gray-900 leading-tight">
                  {section.title}
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium max-w-3xl mx-auto">
                  {section.content}
                </p>
              </div>

              {/* Premium Card Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-200/20 via-pink-200/20 to-purple-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Premium CTA Button */}
      <motion.div
        className="relative z-10 flex justify-center pt-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Button
          asChild
          className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white px-8 py-6 rounded-2xl text-lg font-semibold shadow-2xl shadow-purple-500/30 hover:shadow-3xl hover:shadow-purple-600/40 transition-all duration-300 hover:scale-105 border-0"
        >
          <Link to="/auth/signup">
            {/* Premium Button Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Button Sparkle Effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
            
            <span className="relative z-10 flex items-center gap-2">
              {currentContent.cta}
            </span>
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default ContentCard;
