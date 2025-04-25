
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Quote, ArrowRight, LockKeyhole } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getLanguagePreference } from "@/utils/languagePreference";

const SalonClientGrowthSystem = () => {
  const [language, setLanguage] = useState<"en" | "vi">(getLanguagePreference());

  // Listen for language change event
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      if (event.detail && event.detail.language) {
        setLanguage(event.detail.language);
      }
    };
    
    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    // Get initial language preference
    const storedLanguage = localStorage.getItem('emvi_language_preference');
    if (storedLanguage === 'vi' || storedLanguage === 'en') {
      setLanguage(storedLanguage as "en" | "vi");
    }
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  return (
    <section className="py-28 relative overflow-hidden bg-gradient-to-b from-gray-50 via-purple-50/10 to-white">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-purple-100/40 to-indigo-100/40 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-gradient-to-tr from-pink-100/40 to-yellow-100/40 rounded-full blur-3xl opacity-70"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 shadow-sm mb-3"
            >
              <div className="flex items-center justify-center gap-2">
                <Sparkles size={18} className="text-indigo-600" />
                <span className="text-sm font-medium text-indigo-900">
                  {language === "en" ? "Client Growth System" : "Hệ Thống Phát Triển Khách Hàng"}
                </span>
              </div>
            </motion.div>
          </div>
          
          <Tabs 
            defaultValue={language} 
            value={language} 
            onValueChange={(value) => {
              setLanguage(value as "en" | "vi");
              localStorage.setItem('emvi_language_preference', value);
              window.dispatchEvent(new CustomEvent('languageChanged', { 
                detail: { language: value } 
              }));
            }}
            className="w-full"
          >
            <TabsList className="mx-auto mb-6 h-10">
              <TabsTrigger value="en" className="min-h-[40px]">English</TabsTrigger>
              <TabsTrigger value="vi" className="min-h-[40px]">Tiếng Việt</TabsTrigger>
            </TabsList>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-12 -left-4 text-indigo-300 opacity-30">
                <Quote size={80} />
              </div>
              
              <div className="bg-white p-12 md:p-16 rounded-2xl shadow-xl border border-purple-100 relative z-10 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-bl-full opacity-70"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-50 to-yellow-50 rounded-tr-full opacity-70"></div>
                
                <TabsContent value="en" className="relative space-y-6 text-center">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="space-y-3"
                  >
                    <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-gray-800 mb-6">
                      What's Really Keeping Your Salon From Growing?
                    </h2>
                    <p className="text-lg text-gray-700 font-serif italic">How do you manage your client list?</p>
                    <p className="text-lg text-gray-700 font-serif italic">Do you even have one?</p>
                    <p className="text-lg text-gray-700 font-serif italic">When an artist leaves… how many clients leave with them?</p>
                    <p className="text-lg text-gray-700 font-serif italic">Why are some salons always full, while yours feels unpredictable?</p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-10"
                  >
                    <p className="text-xl text-gray-800 font-serif leading-relaxed">
                      The smartest salons don't chase clients — they keep them loyal through control of their client list.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="my-12 py-4 px-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg"
                  >
                    <p className="text-xl md:text-2xl text-gray-800 font-serif">
                      👉 We don't offer 100 deals for 1 client.<br/>
                      <span className="font-bold">We offer 1 deal to 100 clients — effortlessly.</span>
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-xl text-gray-800 font-serif leading-relaxed mb-6">
                      EmviApp's Client Growth System gives you the power to retain, grow, and protect your clients — so no artist or competitor can take them away.
                    </p>
                    
                    <div className="flex flex-col items-center justify-center space-y-2 mt-8">
                      <p className="text-lg text-gray-700 font-serif italic">
                        This system is reserved for those ready to take control.
                      </p>
                      <p className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 mb-6">
                        <LockKeyhole size={16} className="text-emvi-accent" />
                        Included in select premium plans.
                      </p>
                      
                      <Link to="/pricing">
                        <Button 
                          size="lg" 
                          className="bg-emvi-accent hover:bg-emvi-accent/90 transform hover:scale-[1.02] transition-all duration-200 shadow-lg group"
                        >
                          I'm Ready To Control My Growth
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="vi" className="relative space-y-6 text-center">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="space-y-3"
                  >
                    <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-gray-800 mb-6">
                      Điều Gì Đang Âm Thầm Kìm Hãm Sự Phát Triển Của Tiệm Bạn?
                    </h2>
                    <p className="text-lg text-gray-700 font-serif italic">Bạn quản lý danh sách khách hàng như thế nào?</p>
                    <p className="text-lg text-gray-700 font-serif italic">Bạn có danh sách đó không?</p>
                    <p className="text-lg text-gray-700 font-serif italic">Khi một thợ nghỉ việc... có bao nhiêu khách hàng cũng rời đi theo họ?</p>
                    <p className="text-lg text-gray-700 font-serif italic">Tại sao một số tiệm luôn đông khách, trong khi tiệm bạn lại không ổn định?</p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-10"
                  >
                    <p className="text-xl text-gray-800 font-serif leading-relaxed">
                      Những tiệm thông minh nhất không chạy theo khách — họ giữ khách trung thành bằng cách kiểm soát danh sách khách hàng của họ.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="my-12 py-4 px-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg"
                  >
                    <p className="text-xl md:text-2xl text-gray-800 font-serif">
                      👉 Chúng tôi không cung cấp 100 ưu đãi cho 1 khách hàng.<br/>
                      <span className="font-bold">Chúng tôi cung cấp 1 ưu đãi cho 100 khách hàng — một cách dễ dàng.</span>
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-xl text-gray-800 font-serif leading-relaxed mb-6">
                      Hệ thống Phát triển Khách hàng của EmviApp cho bạn sức mạnh để giữ chân, phát triển và bảo vệ khách hàng của bạn — để không thợ nail hay đối thủ nào có thể lấy đi họ.
                    </p>
                    
                    <div className="flex flex-col items-center justify-center space-y-2 mt-8">
                      <p className="text-lg text-gray-700 font-serif italic">
                        Hệ thống này dành riêng cho những ai sẵn sàng kiểm soát.
                      </p>
                      <p className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 mb-6">
                        <LockKeyhole size={16} className="text-emvi-accent" />
                        Được bao gồm trong các gói cao cấp.
                      </p>
                      
                      <Link to="/pricing">
                        <Button 
                          size="lg" 
                          className="bg-emvi-accent hover:bg-emvi-accent/90 transform hover:scale-[1.02] transition-all duration-200 shadow-lg group"
                        >
                          Tôi Sẵn Sàng Làm Chủ Sự Phát Triển
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </TabsContent>
                
                <div className="absolute -bottom-4 -right-4 text-indigo-300 opacity-30 transform rotate-180">
                  <Quote size={80} />
                </div>
              </div>
            </motion.div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default SalonClientGrowthSystem;
