
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Heart, Clock, Award, Rocket } from "lucide-react";

const RenamedAIFeatures = () => {
  const [language, setLanguage] = useState<"en" | "vi">("en");

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
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: language === "en" ? "We Understand Beauty" : "Chúng Tôi Hiểu Về Ngành Nails",
      description: language === "en" 
        ? "Built by industry insiders who know what it's like to grow a beauty business from the ground up."
        : "Được xây dựng bởi người trong ngành, những người biết thế nào là phát triển một doanh nghiệp làm đẹp từ con số 0."
    },
    {
      icon: <Heart className="h-10 w-10 text-red-500" />,
      title: language === "en" ? "The Heart of Service" : "Trái Tim Của Dịch Vụ",
      description: language === "en"
        ? "We put your needs first because we've been there—carrying the water, sweeping the floors, staying late."
        : "Chúng tôi đặt nhu cầu của bạn lên hàng đầu vì chúng tôi đã từng ở đó—xách nước, quét sàn, làm việc đến khuya."
    },
    {
      icon: <Clock className="h-10 w-10 text-amber-500" />,
      title: language === "en" ? "Your Time Matters" : "Thời Gian Của Bạn Rất Quý",
      description: language === "en"
        ? "Our tools save you hours each week so you can focus on your craft, your clients, and your life."
        : "Công cụ của chúng tôi giúp bạn tiết kiệm hàng giờ mỗi tuần để bạn có thể tập trung vào kỹ năng, khách hàng và cuộc sống của mình."
    },
    {
      icon: <Award className="h-10 w-10 text-emerald-500" />,
      title: language === "en" ? "Community Pride" : "Niềm Tự Hào Cộng Đồng",
      description: language === "en"
        ? "We celebrate your work and help you shine, because when you succeed, the whole community rises."
        : "Chúng tôi tôn vinh công việc của bạn và giúp bạn tỏa sáng, bởi vì khi bạn thành công, cả cộng đồng cùng phát triển."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Rocket className="h-6 w-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              {language === "en" ? "Why We're Different" : "Tại Sao Chúng Tôi Khác Biệt"}
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === "en" 
              ? "We're not just another tech platform. We're built from within the beauty industry." 
              : "Chúng tôi không chỉ là một nền tảng công nghệ khác. Chúng tôi được xây dựng từ bên trong ngành làm đẹp."}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-md transition-all border-t-4 border-t-primary">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RenamedAIFeatures;
