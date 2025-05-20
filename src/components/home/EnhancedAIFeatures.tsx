
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, MessageSquare, Search, Sparkles } from 'lucide-react';
import { getLanguagePreference } from '@/utils/languagePreference';

const EnhancedAIFeatures = () => {
  const [language] = useState(getLanguagePreference());

  const getText = (en: string, vi: string) => {
    return language === 'vi' ? vi : en;
  };

  const features = [
    {
      title: getText("AI Resume Polish", "AI Hoàn thiện hồ sơ"),
      description: getText("Our AI analyzes your profile and suggests professional improvements to make you stand out to employers.", "AI của chúng tôi phân tích hồ sơ của bạn và đề xuất những cải tiến chuyên nghiệp giúp bạn nổi bật trong mắt nhà tuyển dụng."),
      icon: <Sparkles className="h-5 w-5" />,
      tag: getText("New", "Mới"),
      color: "bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100"
    },
    {
      title: getText("Smart Job Matching", "Khớp công việc thông minh"),
      description: getText("Get matched with jobs that align with your skills, experience level, and preferred work environment.", "Được ghép với công việc phù hợp với kỹ năng, cấp độ kinh nghiệm và môi trường làm việc ưa thích của bạn."),
      icon: <Search className="h-5 w-5" />,
      tag: getText("Popular", "Phổ biến"),
      color: "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100"
    },
    {
      title: getText("AI Chat Assistant", "Trợ lý chat AI"),
      description: getText("Get immediate answers about job listings, application status, or general beauty industry questions.", "Nhận câu trả lời ngay lập tức về danh sách công việc, trạng thái đơn xin việc hoặc các câu hỏi chung về ngành làm đẹp."),
      icon: <MessageSquare className="h-5 w-5" />,
      tag: getText("Beta", "Thử nghiệm"),
      color: "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100"
    },
    {
      title: getText("AI Career Advisor", "Cố vấn nghề nghiệp AI"),
      description: getText("Receive personalized career guidance and growth strategies based on your skills and goals.", "Nhận hướng dẫn nghề nghiệp cá nhân hóa và chiến lược phát triển dựa trên kỹ năng và mục tiêu của bạn."),
      icon: <Brain className="h-5 w-5" />,
      tag: getText("Coming Soon", "Sắp ra mắt"),
      color: "bg-gradient-to-br from-green-50 to-emerald-50 border-green-100"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-4">
            {getText("AI-POWERED", "CÔNG NGHỆ AI")}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">
            {getText(
              "Enhanced with Advanced AI Features", 
              "Tăng cường bằng các tính năng AI tiên tiến"
            )}
          </h2>
          <p className="text-lg text-gray-600">
            {getText(
              "Our platform leverages artificial intelligence to make your job search smarter and more effective.", 
              "Nền tảng của chúng tôi tận dụng trí tuệ nhân tạo để giúp việc tìm kiếm việc làm của bạn thông minh và hiệu quả hơn."
            )}
          </p>
        </motion.div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <Card className={`h-full overflow-hidden ${feature.color} border`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-3">
                      {feature.icon}
                    </div>
                    {feature.tag && (
                      <Badge variant="secondary" className="bg-white">
                        {feature.tag}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base text-gray-700">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  {feature.tag !== getText("Coming Soon", "Sắp ra mắt") ? (
                    <Button variant="outline" className="bg-white">
                      {getText("Try Now", "Thử ngay")}
                    </Button>
                  ) : (
                    <Button variant="outline" className="bg-white opacity-50 cursor-not-allowed">
                      {getText("Coming Soon", "Sắp ra mắt")}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedAIFeatures;
