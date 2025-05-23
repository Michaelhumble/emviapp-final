
import React from 'react';
import { motion } from "framer-motion";
import { GradientBackground } from "@/components/ui/gradient-background";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';
import { useTranslation } from "@/hooks/useTranslation";

const AboutPage: React.FC = () => {
  const { t, isVietnamese } = useTranslation();
  
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {isVietnamese ? "Kết Nối Đẹp, Doanh Nghiệp Đẹp" : "Beautiful Connections, Beautiful Business"}
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {isVietnamese 
              ? "EmviApp tạo ra không gian nơi các chuyên gia ngành làm đẹp và khách hàng của họ có thể kết nối một cách tự nhiên, dễ dàng và hiệu quả hơn. Chúng tôi đang thay đổi cách các tiệm nail, salon tóc và spa hoạt động, giúp họ phát triển và đáp ứng nhu cầu của khách hàng hiện đại."
              : "EmviApp creates a space where beauty professionals and their clients can connect more naturally, easily, and efficiently. We're changing how nail salons, hair studios, and spas operate, helping them grow and meet the needs of modern clients."
            }
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <GradientBackground className="p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4 text-gray-800">
              {isVietnamese ? "Sứ Mệnh Của Chúng Tôi" : "Our Mission"}
            </h2>
            <p className="text-gray-600">
              {isVietnamese 
                ? "Sứ mệnh của chúng tôi là đơn giản hóa và nâng cao trải nghiệm làm đẹp cho tất cả mọi người. Chúng tôi tin rằng mọi nghệ sĩ làm đẹp xứng đáng có công cụ tốt nhất để phát triển, và mỗi khách hàng xứng đáng có trải nghiệm dịch vụ tuyệt vời."
                : "Our mission is to simplify and elevate the beauty experience for everyone. We believe every beauty artist deserves the best tools to grow, and every client deserves an exceptional service experience."
              }
            </p>
          </GradientBackground>
          
          <GradientBackground className="p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4 text-gray-800">
              {isVietnamese ? "Giá Trị Cốt Lõi" : "Our Values"}
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li>• {isVietnamese ? "Minh bạch trong mọi tương tác" : "Transparency in every interaction"}</li>
              <li>• {isVietnamese ? "Tôn trọng thời gian của mọi người" : "Respecting everyone's time"}</li>
              <li>• {isVietnamese ? "Trao quyền cho các doanh nghiệp nhỏ" : "Empowering small businesses"}</li>
              <li>• {isVietnamese ? "Đổi mới không ngừng" : "Continuous innovation"}</li>
              <li>• {isVietnamese ? "Trải nghiệm khách hàng xuất sắc" : "Outstanding client experiences"}</li>
            </ul>
          </GradientBackground>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6 text-center text-gray-800">
            {isVietnamese ? "Hành Trình Của Chúng Tôi" : "Our Journey"}
          </h2>
          
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 h-full w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
            
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <h3 className="text-xl font-bold text-gray-700">{isVietnamese ? "2022" : "2022"}</h3>
                  <p className="text-gray-600">{isVietnamese ? "Ý tưởng về EmviApp ra đời" : "The idea for EmviApp was born"}</p>
                </div>
                <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-lg">💡</span>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <p className="text-gray-600">
                    {isVietnamese 
                      ? "Sau khi thấy các salon đấu tranh với việc quản lý lịch hẹn và tiếp cận khách hàng trực tuyến."
                      : "After seeing salons struggle with appointment management and online client reach."
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right order-1 md:order-1">
                  <p className="text-gray-600">
                    {isVietnamese 
                      ? "Chúng tôi tiến hành nghiên cứu thị trường và phỏng vấn hơn 100 chủ salon và nghệ sĩ làm đẹp."
                      : "We conducted market research and interviewed over 100 salon owners and beauty artists."
                    }
                  </p>
                </div>
                <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center order-2 md:order-2">
                  <span className="text-white text-lg">📊</span>
                </div>
                <div className="md:w-1/2 md:pl-12 order-3 md:order-3">
                  <h3 className="text-xl font-bold text-gray-700">{isVietnamese ? "2023" : "2023"}</h3>
                  <p className="text-gray-600">{isVietnamese ? "Nghiên cứu và phát triển" : "Research and development"}</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <h3 className="text-xl font-bold text-gray-700">{isVietnamese ? "2024" : "2024"}</h3>
                  <p className="text-gray-600">{isVietnamese ? "Ra mắt EmviApp" : "EmviApp launch"}</p>
                </div>
                <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-lg">🚀</span>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <p className="text-gray-600">
                    {isVietnamese 
                      ? "Chúng tôi chính thức ra mắt nền tảng, kết nối các nghệ sĩ làm đẹp với khách hàng và giúp các salon phát triển."
                      : "We officially launched the platform, connecting beauty artists with clients and helping salons grow."
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right order-1 md:order-1">
                  <p className="text-gray-600">
                    {isVietnamese 
                      ? "Mục tiêu của chúng tôi là trở thành nền tảng hàng đầu kết nối các chuyên gia làm đẹp và khách hàng trên toàn quốc."
                      : "Our goal is to become the leading platform connecting beauty professionals and clients nationwide."
                    }
                  </p>
                </div>
                <div className="mx-auto md:mx-0 my-4 md:my-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center order-2 md:order-2">
                  <span className="text-white text-lg">🌟</span>
                </div>
                <div className="md:w-1/2 md:pl-12 order-3 md:order-3">
                  <h3 className="text-xl font-bold text-gray-700">{isVietnamese ? "Tương lai" : "Future"}</h3>
                  <p className="text-gray-600">{isVietnamese ? "Mở rộng toàn quốc" : "Nationwide expansion"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4 text-gray-800">
            {isVietnamese ? "Lấy cảm hứng từ Sunshine ☀️" : "Inspired by Sunshine ☀️"}
          </h2>
          <p className="text-gray-600">
            {isVietnamese 
              ? "EmviApp được truyền cảm hứng từ ánh nắng mặt trời—sự ấm áp, tỏa sáng và khả năng làm cho mọi thứ trở nên tươi đẹp hơn. Chúng tôi tin rằng mỗi doanh nghiệp làm đẹp xứng đáng có cơ hội tỏa sáng và thành công."
              : "EmviApp is inspired by sunshine—warmth, brightness, and the ability to make everything more beautiful. We believe every beauty business deserves the chance to shine and succeed."
            }
          </p>
        </div>
        
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4 text-gray-800">
            {isVietnamese ? "Cảm Ơn, EmVi" : "Thank You, EmVi"}
          </h2>
          <p className="text-gray-600">
            {isVietnamese 
              ? "Ứng dụng này được đặt tên theo EmVi—người đã hỗ trợ và hy sinh cho tôi, ngay cả khi tôi tự nghi ngờ bản thân. Bạn đã luôn bên cạnh tôi, bất kể điều gì. Vì tất cả tình yêu thương, sự khích lệ, và sức mạnh âm thầm bạn đã cho tôi, đây là dành cho bạn."
              : "This app is named after EmVi—the person who supported and sacrificed for me, even when I doubted myself. You stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you."
            }
          </p>
        </div>
        
        <div className="text-center">
          <Link to="/contact">
            <Button size="lg" className="group">
              {isVietnamese ? "Liên Hệ Với Chúng Tôi" : "Contact Us"}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
