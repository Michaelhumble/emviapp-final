
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const WeTrustEmotionalSection = () => {
  const [language, setLanguage] = useState<"en" | "vi">("en");

  // Get stored language preference from localStorage
  useEffect(() => {
    const storedLanguage = localStorage.getItem('emvi_language_preference');
    if (storedLanguage === 'vi' || storedLanguage === 'en') {
      setLanguage(storedLanguage);
    }
  }, []);

  // Save language preference to localStorage when changed
  useEffect(() => {
    localStorage.setItem('emvi_language_preference', language);
    // Dispatch a custom event that other components can listen for
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language } }));
  }, [language]);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 tracking-tight">
              We've All Tried the Tools. But This Is the System We Were Missing.
            </h2>
            
            <div className="mt-8 mb-10">
              <Tabs 
                defaultValue={language} 
                value={language} 
                onValueChange={(value) => setLanguage(value as "en" | "vi")}
                className="w-full"
              >
                <TabsList className="mx-auto mb-8">
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
                </TabsList>
                
                <TabsContent value="en" className="text-left space-y-6 max-w-3xl mx-auto">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Scheduling helped. POS systems worked. Booking tools got us through.<br />
                    We're grateful for every startup that tried to make our lives easier.<br />
                    They paved the way. And for that — we thank them.
                  </p>
                  
                  <p className="text-lg text-gray-800 font-medium">But here's what we noticed:</p>
                  
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Most weren't built by people who carried water bowls for pedicures.<br />
                    They weren't built by artists who cleaned the floors before opening.<br />
                    They weren't built by salon owners who quietly paid everyone else first — and themselves last.
                  </p>
                  
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Those tools helped — and still do.<br />
                    <span className="font-medium">We're not here to replace them. We're here to complete the picture.</span>
                  </p>
                  
                  <p className="text-lg text-gray-700 leading-relaxed">
                    If you've ever used one of those tools and felt like:<br />
                    <em className="text-primary font-medium">"Something's still missing…"</em><br />
                    — This is it.
                  </p>
                  
                  <p className="text-xl font-medium">
                    Welcome to <span className="font-serif font-bold">EmviApp</span>.<br />
                    The platform that understands the grind — and honors it.
                  </p>
                </TabsContent>
                
                <TabsContent value="vi" className="text-left space-y-6 max-w-3xl mx-auto">
                  <div className="text-lg leading-relaxed">
                    <p className="text-xl font-medium mb-4">
                      "Chúng ta từng dùng rất nhiều hệ thống. Nhưng EmviApp là phần còn thiếu."
                    </p>
                    
                    <p className="mb-4">
                      Lịch đặt trước? Hữu ích. POS? Có hiệu quả. Những ứng dụng khác? Đã giúp chúng ta đi được một đoạn đường dài.<br />
                      EmviApp không đến để thay thế. EmviApp đến để kết nối — và hoàn thiện bức tranh.
                    </p>
                    
                    <p className="mb-4">
                      Chúng tôi từng xách thau nước đi làm chân.<br />
                      Từng lau sàn trước giờ mở cửa.<br />
                      Từng âm thầm trả lương cho nhân viên trước khi nghĩ đến bản thân.
                    </p>
                    
                    <p className="mb-4">
                      Nếu bạn từng cảm thấy: <em className="text-primary font-medium">"Có gì đó vẫn còn thiếu…"</em><br />
                      Thì đúng vậy. EmviApp chính là điều đó.
                    </p>
                    
                    <p className="font-medium">
                      EmviApp được xây dựng bởi những người trong nghề. Cho chính bạn.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WeTrustEmotionalSection;
