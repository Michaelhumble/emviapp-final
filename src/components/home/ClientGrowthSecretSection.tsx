
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getLanguagePreference } from '@/utils/languagePreference';
import { useTranslation } from '@/hooks/useTranslation';

const ClientGrowthSecretSection = () => {
  const { t, isVietnamese } = useTranslation();
  const [language, setLanguage] = useState(getLanguagePreference());

  const getText = (en: string, vi: string) => {
    return language === 'vi' ? vi : en;
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-serif font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {getText(
              "The Secret to Growing Your Client Base",
              "Bí quyết để phát triển khách hàng của bạn"
            )}
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {getText(
              "Build your reputation, showcase your work, and connect with clients who appreciate your unique skills.",
              "Xây dựng uy tín, giới thiệu tác phẩm và kết nối với khách hàng đánh giá cao kỹ năng độc đáo của bạn."
            )}
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: getText("Create Your Portfolio", "Tạo danh mục của bạn"),
              description: getText("Display your best work in a professional portfolio that showcases your unique style and talents.", "Trưng bày những tác phẩm tốt nhất của bạn trong một danh mục chuyên nghiệp thể hiện phong cách và tài năng độc đáo của bạn."),
              icon: "✨"
            },
            {
              title: getText("Get Discovered", "Được khám phá"),
              description: getText("Appear in search results when salon owners and clients are looking for your specific skills.", "Xuất hiện trong kết quả tìm kiếm khi chủ salon và khách hàng đang tìm kiếm kỹ năng cụ thể của bạn."),
              icon: "🔍"
            },
            {
              title: getText("Grow Your Business", "Phát triển doanh nghiệp của bạn"),
              description: getText("Generate more income with direct bookings and expand your client base beyond your salon.", "Tạo thêm thu nhập với đặt lịch trực tiếp và mở rộng cơ sở khách hàng của bạn ngoài salon."),
              icon: "📈"
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90"
          >
            {getText("Create Your Profile", "Tạo hồ sơ của bạn")} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ClientGrowthSecretSection;
