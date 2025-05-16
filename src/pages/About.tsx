import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();
  
  const aboutTitle = t({
    english: "About EmviApp",
    vietnamese: "Giới thiệu về EmviApp"
  });
  
  return (
    <>
      <Helmet>
        <title>About EmviApp | Beauty Industry Marketplace</title>
        <meta name="description" content="Learn about EmviApp, the premier marketplace connecting beauty professionals with salons and opportunities across the United States." />
      </Helmet>
      
      <div className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-gray-900">
              {aboutTitle}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t({
                english: "Connecting beauty professionals with opportunities across the United States",
                vietnamese: "Kết nối các chuyên gia làm đẹp với cơ hội trên khắp Hoa Kỳ"
              })}
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg max-w-none"
            >
              <h2>
                {t({
                  english: "Our Mission",
                  vietnamese: "Sứ mệnh của chúng tôi"
                })}
              </h2>
              <p>
                {t({
                  english: "EmviApp was founded with a simple but powerful mission: to create the most comprehensive and user-friendly marketplace for the beauty industry. We connect talented beauty professionals with salons, spas, and other businesses looking for skilled workers.",
                  vietnamese: "EmviApp được thành lập với sứ mệnh đơn giản nhưng mạnh mẽ: tạo ra thị trường toàn diện và thân thiện nhất cho ngành công nghiệp làm đẹp. Chúng tôi kết nối các chuyên gia làm đẹp tài năng với các salon, spa và các doanh nghiệp khác đang tìm kiếm nhân viên có kỹ năng."
                })}
              </p>
              
              <h2>
                {t({
                  english: "What We Offer",
                  vietnamese: "Chúng tôi cung cấp"
                })}
              </h2>
              <ul>
                <li>
                  {t({
                    english: "Job listings for nail technicians, hair stylists, estheticians, and more",
                    vietnamese: "Danh sách việc làm cho kỹ thuật viên làm móng, thợ làm tóc, chuyên viên thẩm mỹ, và nhiều hơn nữa"
                  })}
                </li>
                <li>
                  {t({
                    english: "Salon listings for businesses looking to sell or expand",
                    vietnamese: "Danh sách salon cho các doanh nghiệp muốn bán hoặc mở rộng"
                  })}
                </li>
                <li>
                  {t({
                    english: "Booth rental opportunities for independent professionals",
                    vietnamese: "Cơ hội thuê quầy cho các chuyên gia độc lập"
                  })}
                </li>
                <li>
                  {t({
                    english: "Supply and equipment listings for salon needs",
                    vietnamese: "Danh sách vật tư và thiết bị cho nhu cầu salon"
                  })}
                </li>
              </ul>
              
              <h2>
                {t({
                  english: "Our Story",
                  vietnamese: "Câu chuyện của chúng tôi"
                })}
              </h2>
              <p>
                {t({
                  english: "EmviApp was created by industry veterans who understood the challenges of connecting the right talent with the right opportunities in the beauty industry. What started as a small project has grown into a nationwide platform serving thousands of beauty professionals and businesses.",
                  vietnamese: "EmviApp được tạo ra bởi những người có kinh nghiệm trong ngành hiểu rõ những thách thức trong việc kết nối đúng tài năng với đúng cơ hội trong ngành làm đẹp. Những gì bắt đầu như một dự án nhỏ đã phát triển thành một nền tảng toàn quốc phục vụ hàng nghìn chuyên gia làm đẹp và doanh nghiệp."
                })}
              </p>
              
              <h2>
                {t({
                  english: "Join Our Community",
                  vietnamese: "Tham gia cộng đồng của chúng tôi"
                })}
              </h2>
              <p>
                {t({
                  english: "Whether you're a salon owner looking for talented staff, a beauty professional seeking new opportunities, or someone looking to buy or sell a salon, EmviApp is here to help you succeed.",
                  vietnamese: "Cho dù bạn là chủ salon đang tìm kiếm nhân viên tài năng, một chuyên gia làm đẹp đang tìm kiếm cơ hội mới, hoặc ai đó muốn mua hoặc bán salon, EmviApp luôn sẵn sàng giúp bạn thành công."
                })}
              </p>
            </motion.div>
            
            <div className="mt-12 text-center">
              <Link to="/contact">
                <Button size="lg" className="font-medium">
                  {t({
                    english: "Contact Us",
                    vietnamese: "Liên hệ với chúng tôi"
                  })}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
