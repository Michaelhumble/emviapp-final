
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getLanguagePreference } from "@/utils/languagePreference";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const SalonGrowthSection = () => {
  const [language] = useState(getLanguagePreference());
  
  const getText = (en: string, vi: string) => {
    return language === 'vi' ? vi : en;
  };

  const features = [
    {
      icon: "🔍",
      title: getText("Find Talented Artists", "Tìm nghệ sĩ tài năng"),
      description: getText(
        "Access a pool of qualified nail techs and beauty professionals actively looking for opportunities.", 
        "Tiếp cận nguồn nhân lực là các kỹ thuật viên nail và chuyên gia làm đẹp có trình độ đang tích cực tìm kiếm cơ hội."
      )
    },
    {
      icon: "📣",
      title: getText("Promote Your Salon", "Quảng bá salon của bạn"),
      description: getText(
        "Showcase your salon's unique atmosphere and benefits to attract the right employees.", 
        "Giới thiệu không khí và lợi ích độc đáo của salon để thu hút đúng nhân viên."
      )
    },
    {
      icon: "💼",
      title: getText("Streamline Hiring", "Tối ưu hóa tuyển dụng"),
      description: getText(
        "Post job openings, review applications, and connect with applicants all in one place.", 
        "Đăng tin tuyển dụng, xem xét đơn ứng tuyển và kết nối với ứng viên tất cả trong một nơi."
      )
    },
    {
      icon: "🌟",
      title: getText("Build Your Reputation", "Xây dựng danh tiếng"),
      description: getText(
        "Establish your salon as a premier workplace through verified reviews and premium listings.", 
        "Thiết lập salon của bạn như một nơi làm việc hàng đầu thông qua đánh giá đã xác minh và danh sách cao cấp."
      )
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">
              {getText(
                "Grow Your Salon With Top Talent",
                "Phát triển salon của bạn với nhân tài hàng đầu"
              )}
            </h2>
            
            <p className="text-lg text-gray-700 mb-8">
              {getText(
                "Find qualified nail techs and beauty professionals who align with your salon's values, aesthetic, and growth goals.",
                "Tìm kiếm các kỹ thuật viên nail và chuyên gia làm đẹp có trình độ phù hợp với giá trị, thẩm mỹ và mục tiêu phát triển của salon của bạn."
              )}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <div className="text-2xl">{feature.icon}</div>
                  <div>
                    <h3 className="font-medium mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <Link to="/post/job">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                {getText("Post a Job Opening", "Đăng tin tuyển dụng")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/lovable-uploads/f3f2a5ae-65d9-4442-8842-1cb9e26cdb56.png"
                  alt="Salon workspace with nail technicians"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-[200px]">
                <div className="text-amber-500 flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="font-medium mt-2">
                  {getText(
                    "\"Found my dream nail tech in just 3 days!\"",
                    "\"Đã tìm thấy thợ nail trong mơ chỉ sau 3 ngày!\""
                  )}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {getText("— Lisa, Salon Owner", "— Lisa, Chủ Salon")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SalonGrowthSection;
