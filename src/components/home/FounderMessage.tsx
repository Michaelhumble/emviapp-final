
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Stars } from "lucide-react";
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
      title: "Founder's Message",
      message: `To everyone who believes beauty changes lives:

We see your hard work, your late nights, and the silent sacrifices no one else understands.

We know the dreams you carry and the pressure you feel—to make people look and feel their best, to build a better future for your family.

EmviApp exists because you deserve more: more recognition, more respect, more real opportunity.

This is your community—a place to be seen, supported, and celebrated.

Thank you for making life more beautiful. Together, we're changing the beauty industry—starting with love and sincerity.`,
      signature: "— The EmviApp Team",
      icon: Sparkles
    },
    vi: {
      title: "Thông điệp Người sáng lập",
      message: `Gửi đến những người làm đẹp bằng cả trái tim:

EmviApp hiểu nỗi vất vả, nỗi lo, và cả những ước mơ thầm lặng của bạn.

Chúng tôi biết cảm giác mệt mỏi, những hy sinh vì gia đình, vì khách hàng, vì một ngày mai tốt đẹp hơn.

EmviApp ra đời để bạn không còn phải tự mình cố gắng—ở đây, bạn được lắng nghe, tôn trọng và nâng đỡ.

Cộng đồng này là chỗ dựa, là nơi bạn thực sự thuộc về.

Cảm ơn bạn đã làm đẹp cho cuộc sống này.
Chúng ta cùng nhau thay đổi ngành làm đẹp, bắt đầu từ sự yêu thương và chân thành.`,
      signature: "— Đội ngũ EmviApp",
      icon: Stars
    }
  };

  const currentContent = content[language];
  const IconComponent = currentContent.icon;

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4">
        {/* Section Number Badge */}
        <motion.div 
          className="flex justify-center mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 rounded-full px-4 py-2">
            <span className="w-6 h-6 bg-blue-600 text-white text-sm font-semibold rounded-full flex items-center justify-center">
              7
            </span>
            <span className="text-blue-700 font-medium text-sm">
              Founder's Message
            </span>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
              A Message from Our{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Founder
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-primary">
              Building EmviApp has been a journey of understanding what beauty professionals truly need.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200/80"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <motion.div
              key={language}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Message content with consistent typography */}
              <div className="text-lg md:text-xl leading-relaxed text-slate-700 space-y-6 font-primary">
                {currentContent.message.split('\n\n').map((paragraph, index) => (
                  <motion.p 
                    key={index} 
                    className="text-center leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
              
              {/* Enhanced signature section */}
              <motion.div 
                className="pt-8 border-t border-slate-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <p className="text-xl font-display font-semibold text-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {currentContent.signature}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* CTA section */}
          <motion.div 
            className="mt-12 text-center"
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
              <a 
                href="http://emviapp-final.lovable.app/auth/signup?redirect=%2F"
                className="inline-block"
              >
                <Button
                  size="lg" 
                  className="font-primary font-medium px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span className="flex items-center gap-3">
                    <span>
                      {language === 'vi' ? '🌟 Tham Gia Cộng Đồng' : '🌟 Join Our Community'}
                    </span>
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </span>
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;
