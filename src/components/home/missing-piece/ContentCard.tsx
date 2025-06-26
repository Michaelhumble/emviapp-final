
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { ArrowRight } from "lucide-react";

interface ContentCardProps {
  language: "en" | "vi";
  itemVariants: any;
}

const ContentCard = ({ language, itemVariants }: ContentCardProps) => {
  const { t } = useTranslation();

  const content = {
    en: {
      heading: "Let's Experience EmviApp Together",
      subsection1: {
        title: "Your Business, Supercharged",
        content: "We help bring customers straight to your salon. Our platform connects you with skilled technicians, delivers irresistible offers, and streamlines shop management — all in one elegant solution."
      },
      subsection2: {
        title: "EmviApp's intelligent AI handles the complex work —",
        content: "so you can focus on your passion and growing your business."
      },
      subsection3: {
        title: "Without EmviApp, you might be missing out on opportunities",
        content: "that your competitors are already embracing. 😔"
      },
      button: "Try it now and experience the difference →"
    },
    vi: {
      heading: "Hãy Cùng Nhau Trải Nghiệm EmviApp",
      subsection1: {
        title: "Kinh Doanh Của Bạn, Được Nâng Cấp",
        content: "Chúng tôi giúp bạn mang khách hàng đến tận tiệm. Giúp bạn tìm những thợ giỏi, có kinh nghiệm, và đưa ra những ưu đãi tốt nhất — để bạn quản lý tiệm dễ dàng và đạt hiệu quả cao."
      },
      subsection2: {
        title: "Hãy để A.I thông minh của EmviApp lo mọi thứ cho bạn —",
        content: "bạn chỉ cần tập trung làm điều mình yêu thích và phát triển sự nghiệp của mình."
      },
      subsection3: {
        title: "Nếu bạn không dùng thử EmviApp...",
        content: "Chắc chắn bạn đang bỏ lỡ một công nghệ có thể giải quyết rất nhiều việc cùng một lúc. 😔"
      },
      button: "Hãy cùng nhau trải nghiệm những điều thú vị mà EmviApp mang đến cho bạn — ngay bây giờ →"
    }
  };

  const currentContent = content[language];

  return (
    <div className="relative">
      {/* Animated sparkle background */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute top-10 left-10 w-2 h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-1/4 right-20 w-1 h-1 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full animate-ping opacity-60"></div>
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-gradient-to-r from-blue-200 to-purple-300 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute top-1/3 left-1/2 w-1 h-1 bg-gradient-to-r from-yellow-200 to-orange-300 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-gradient-to-r from-pink-200 to-purple-300 rounded-full animate-pulse opacity-60"></div>
      </div>

      <div className="relative z-10 text-center space-y-12">
        {/* Main Heading */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-purple-700 to-pink-600 leading-tight">
            {currentContent.heading} ✨
          </h1>
          <div className="w-32 h-1 mx-auto bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 rounded-full opacity-80"></div>
        </motion.div>

        {/* Subsection Cards */}
        <div className="space-y-8">
          {/* Subsection 1 */}
          <motion.div
            className="group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 bg-gradient-to-br from-white/95 via-purple-50/80 to-pink-50/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(31,38,135,0.15)] hover:shadow-[0_12px_48px_rgba(31,38,135,0.25)] transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/20 via-transparent to-purple-100/20 opacity-50"></div>
              <div className="relative z-10 text-center space-y-4">
                <h3 className="font-playfair text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
                  {currentContent.subsection1.title}
                </h3>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium max-w-4xl mx-auto">
                  {currentContent.subsection1.content}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Subsection 2 */}
          <motion.div
            className="group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 bg-gradient-to-br from-blue-50/90 via-white/95 to-indigo-50/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(59,130,246,0.1)] hover:shadow-[0_12px_48px_rgba(59,130,246,0.2)] transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-purple-100/20 opacity-50"></div>
              <div className="relative z-10 text-center space-y-4">
                <h3 className="font-playfair text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
                  {currentContent.subsection2.title}
                </h3>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium max-w-4xl mx-auto">
                  {currentContent.subsection2.content}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Subsection 3 */}
          <motion.div
            className="group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 bg-gradient-to-br from-amber-50/90 via-white/95 to-orange-50/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(245,158,11,0.1)] hover:shadow-[0_12px_48px_rgba(245,158,11,0.2)] transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/20 via-transparent to-orange-100/20 opacity-50"></div>
              <div className="relative z-10 text-center space-y-4">
                <h3 className="font-playfair text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
                  {currentContent.subsection3.title}
                </h3>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium max-w-4xl mx-auto">
                  {currentContent.subsection3.content}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Premium CTA Button */}
        <motion.div
          className="pt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <button className="group relative inline-flex items-center justify-center px-12 py-4 text-lg md:text-xl font-bold text-white rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 shadow-[0_8px_32px_rgba(147,51,234,0.3)] hover:shadow-[0_12px_48px_rgba(147,51,234,0.4)] hover:scale-105 transform-gpu backdrop-blur-sm border border-white/20">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent opacity-50"></div>
            <span className="relative z-10 flex items-center gap-2">
              {currentContent.button}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ContentCard;
