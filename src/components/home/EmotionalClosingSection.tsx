
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

const EmotionalClosingSection = () => {
  const [language, setLanguage] = useState<"en" | "vi">("en");
  const isMobile = useIsMobile();

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
    <section className="py-16 md:py-20 bg-gradient-to-b from-purple-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
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
            
            <TabsContent value="en" className="px-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-4">
                "You're not late. You're right on time."
              </h2>
              <p className="text-base md:text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Whether you're brand new or 20 years deep — EmviApp was made for you.
                <br className="hidden md:block" />
                You focus on your craft. We'll carry the tech.
              </p>
            </TabsContent>
            
            <TabsContent value="vi" className="px-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-4">
                "Bạn không đến trễ đâu — bạn đến đúng lúc."
              </h2>
              <p className="text-base md:text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Dù bạn mới vào nghề hay đã làm 20 năm, EmviApp vẫn là dành cho bạn.
                <br className="hidden md:block" />
                Bạn chỉ cần làm nghề cho tốt. Chuyện còn lại — để chúng tôi lo.
              </p>
            </TabsContent>
          </Tabs>
          
          <div className={`flex flex-col ${isMobile ? 'space-y-3' : 'sm:flex-row'} items-center justify-center ${!isMobile && 'gap-4'}`}>
            <Link to="/auth/signup" className="w-full sm:w-auto">
              <Button size={isMobile ? "default" : "lg"} className="min-w-[200px] w-full sm:w-auto min-h-[44px]">
                {language === "en" ? "Get Started Free" : "Bắt Đầu Miễn Phí"}
              </Button>
            </Link>
            <Link to="/artists" className="w-full sm:w-auto">
              <Button variant="outline" size={isMobile ? "default" : "lg"} className="min-w-[200px] w-full sm:w-auto min-h-[44px]">
                {language === "en" ? "Just Keep Exploring" : "Tiếp Tục Khám Phá"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmotionalClosingSection;
