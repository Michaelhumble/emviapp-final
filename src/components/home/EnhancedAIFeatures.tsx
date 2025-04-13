
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BriefcaseBusiness, BarChart3, Users, Sparkles } from "lucide-react";
import FeatureCard from "@/components/artists/FeatureCard";
import { getLanguagePreference } from "@/utils/languagePreference";

const EnhancedAIFeatures = () => {
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

  const features = [
    {
      icon: <BriefcaseBusiness className="h-10 w-10 text-primary" />,
      title: language === "en" ? "Smart Job Matching" : "Kết Nối Công Việc Thông Minh",
      description: language === "en" 
        ? "Our AI matches you with salon positions and clients that align with your style, skills, and career goals."
        : "AI của chúng tôi kết nối bạn với vị trí làm việc và khách hàng phù hợp với phong cách, kỹ năng và mục tiêu nghề nghiệp của bạn."
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: language === "en" ? "Auto-Generated Profiles" : "Hồ Sơ Tự Động",
      description: language === "en"
        ? "Create a stunning profile in minutes with our AI-powered tools that highlight your best work."
        : "Tạo hồ sơ ấn tượng chỉ trong vài phút với công cụ AI của chúng tôi để nổi bật những thành tựu tốt nhất của bạn."
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: language === "en" ? "Boosted Visibility" : "Tăng Độ Nhận Diện",
      description: language === "en"
        ? "Get discovered by more clients through our intelligent recommendation algorithm."
        : "Được nhiều khách hàng tìm thấy hơn thông qua thuật toán gợi ý thông minh của chúng tôi."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-primary/5 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-3">
            {language === "en" ? (
              <span>Let AI Do the Hard Work — You Just Focus on Your Craft</span>
            ) : (
              <span>Hãy Để AI Lo Việc Khó — Bạn Chỉ Cần Làm Điều Mình Giỏi</span>
            )}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === "en" 
              ? "Our AI-powered platform helps you build your career and connect with clients who value your talent."
              : "Nền tảng AI của chúng tôi giúp bạn phát triển sự nghiệp và kết nối với khách hàng đánh giá cao tài năng của bạn."}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="backdrop-blur-sm"
            >
              <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-serif font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              const newLanguage = language === "en" ? "vi" : "en";
              setLanguage(newLanguage);
              localStorage.setItem('emvi_language_preference', newLanguage);
              window.dispatchEvent(new CustomEvent('languageChanged', { 
                detail: { language: newLanguage } 
              }));
            }}
            className="px-4 py-2 rounded-full bg-white shadow-sm text-gray-700 text-sm border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
          >
            {language === "en" ? "EN / VI" : "VI / EN"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default EnhancedAIFeatures;
