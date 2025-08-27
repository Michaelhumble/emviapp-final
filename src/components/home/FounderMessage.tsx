
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Sparkles, Quote, Star, ArrowRight } from "lucide-react";
import { getLanguagePreference, addLanguageChangeListener } from "@/utils/languagePreference";

const FounderMessage = () => {
  const [language, setLanguage] = useState<"en" | "vi">(getLanguagePreference());

  useEffect(() => {
    const removeListener = addLanguageChangeListener((newLanguage) => {
      setLanguage(newLanguage);
    });
    
    return removeListener;
  }, []);

  const content = {
    en: {
      badge: "Message from Our Founder",
      title: "A Message from Our Founder",
      subtitle: "Why we built EmviApp for YOU",
      quote: "Every beauty professional deserves to be seen, heard, and celebrated.",
      message: `To everyone who believes beauty changes lives:

We see your hard work, your late nights, and the silent sacrifices no one else understands.

We know the dreams you carry and the pressure you feel—to make people look and feel their best, to build a better future for your family.

EmviApp exists because you deserve more: more recognition, more respect, more real opportunity.

This is your community—a place to be seen, supported, and celebrated.

Thank you for making life more beautiful. Together, we're changing the beauty industry—starting with love and sincerity.`,
      signature: "With love and respect,",
      cta: "🌟 Join Our Community"
    },
    vi: {
      badge: "Thông Điệp Từ Người Sáng Lập",
      title: "Thông Điệp Từ Người Sáng Lập",
      subtitle: "Tại sao chúng tôi xây dựng EmviApp cho BẠN",
      quote: "Mỗi chuyên gia làm đẹp đều xứng đáng được nhìn thấy, lắng nghe và tôn vinh.",
      message: `Gửi đến những người làm đẹp bằng cả trái tim:

EmviApp hiểu nỗi vất vả, nỗi lo, và cả những ước mơ thầm lặng của bạn.

Chúng tôi biết cảm giác mệt mỏi, những hy sinh vì gia đình, vì khách hàng, vì một ngày mai tốt đẹp hơn.

EmviApp ra đời để bạn không còn phải tự mình cố gắng—ở đây, bạn được lắng nghe, tôn trọng và nâng đỡ.

Cộng đồng này là chỗ dựa, là nơi bạn thực sự thuộc về.

Cảm ơn bạn đã làm đẹp cho cuộc sống này.
Chúng ta cùng nhau thay đổi ngành làm đẹp, bắt đầu từ sự yêu thương và chân thành.`,
      signature: "Với tình yêu và sự tôn trọng,",
      cta: "🌟 Tham Gia Cộng Đồng"
    }
  };

  const currentContent = content[language];

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const quoteVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  const heartbeat = {
    animate: { scale: [1, 1.1, 1] }
  };

  const floatingAnimation = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0]
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-rose-50 via-white to-purple-50/30 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-rose-100/30 to-pink-100/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/30 to-indigo-100/20 rounded-full blur-3xl"></div>
        
        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-20 left-10 text-rose-300"
          variants={floatingAnimation}
          animate="animate"
        >
          <Heart className="h-6 w-6" />
        </motion.div>
        
        <motion.div
          className="absolute top-32 right-20 text-purple-300"
          animate={{
            y: [10, -10, 10],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Star className="h-8 w-8" />
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-20 text-rose-400"
          animate={{
            y: [-5, 15, -5],
            x: [-5, 5, -5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <Sparkles className="h-7 w-7" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Badge */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-50 to-purple-50 border border-rose-200/60 rounded-full px-6 py-3 shadow-sm">
              <span className="w-8 h-8 bg-gradient-to-r from-rose-600 to-purple-600 text-white text-sm font-bold rounded-full flex items-center justify-center">
                7
              </span>
              <span className="text-rose-700 font-semibold text-sm font-primary tracking-wide">
                {currentContent.badge}
              </span>
            </div>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-rose-100/60 overflow-hidden"
          >
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 p-8 md:p-12 text-white relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <motion.div
                  variants={heartbeat}
                  animate="animate"
                  className="flex justify-center mb-6"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Heart className="h-8 w-8 text-white fill-current" />
                  </div>
                </motion.div>
                
                <motion.h2 
                  variants={itemVariants}
                  className="text-3xl md:text-5xl font-display font-bold text-center mb-4 leading-tight"
                >
                  {currentContent.title}
                </motion.h2>
                
                <motion.p 
                  variants={itemVariants}
                  className="text-xl text-center font-primary opacity-90"
                >
                  {currentContent.subtitle}
                </motion.p>
              </div>
            </div>

            {/* Quote Section */}
            <motion.div 
              variants={quoteVariants}
              className="px-8 md:px-12 py-8 bg-gradient-to-br from-rose-50/50 to-purple-50/50 border-b border-rose-100/30"
            >
              <div className="flex items-start gap-4">
                <Quote className="h-8 w-8 text-rose-400 flex-shrink-0 mt-1" />
                <blockquote className="text-xl md:text-2xl font-display font-medium text-slate-800 italic leading-relaxed">
                  "{currentContent.quote}"
                </blockquote>
              </div>
            </motion.div>

            {/* Message Content */}
            <div className="p-8 md:p-12">
              <motion.div 
                key={language}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Message paragraphs */}
                <div className="text-lg md:text-xl leading-relaxed text-slate-700 space-y-6 font-primary">
                  {currentContent.message.split('\n\n').map((paragraph, index) => (
                    <motion.p 
                      key={index} 
                      className={`leading-relaxed ${
                        index === 0 
                          ? "text-2xl font-semibold text-rose-700 mb-8 text-center" 
                          : "text-center"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                {/* Signature */}
                <motion.div 
                  className="mt-12 pt-8 border-t border-rose-100/60"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <p className="text-lg font-primary text-slate-600 mb-4 text-center">
                    {currentContent.signature}
                  </p>
                  
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-purple-100 rounded-full flex items-center justify-center p-2">
                      <img 
                        src="https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/emvilogo/emvi-logo-transparent.png"
                        alt="EmviApp Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-xl font-display font-bold text-slate-900">
                        EmviApp {language === 'vi' ? 'Người Sáng Lập' : 'Founder'}
                      </p>
                      <p className="text-sm text-slate-500 font-primary">
                        {language === 'vi' ? 'Người xây dựng cộng đồng làm đẹp' : 'Building the beauty community'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced CTA Section */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-br from-white to-rose-50/50 p-8 md:p-12 rounded-3xl shadow-xl border border-rose-100/60 max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-4">
                {language === 'vi' ? 'Sẵn sàng tham gia?' : 'Ready to join us?'}
              </h3>
              <p className="text-lg text-slate-600 mb-8 font-primary leading-relaxed">
                {language === 'vi' 
                  ? 'Tham gia cộng đồng làm đẹp đang phát triển và kết nối với những chuyên gia thực thụ'
                  : 'Join our growing beauty community and connect with real professionals'
                }
              </p>
              
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link 
                  to="/auth/signup"
                  className="inline-block"
                >
                  <Button
                    size="lg" 
                    className="font-primary font-bold px-10 py-5 text-lg bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span className="flex items-center gap-3">
                      <span>{currentContent.cta}</span>
                      <ArrowRight className="h-6 w-6" />
                    </span>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom decorative hearts */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mt-8"
          >
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  <Heart className="h-4 w-4 text-rose-400 fill-current" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderMessage;
