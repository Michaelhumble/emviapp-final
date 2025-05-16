
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Award, Users, Heart, Gem, BarChart } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import LanguageToggleButton from '@/components/home/missing-piece/LanguageToggleButton';

const AboutUs: React.FC = () => {
  const [isVietnamese, setIsVietnamese] = useState(false);
  
  const toggleLanguage = () => {
    setIsVietnamese(!isVietnamese);
  };
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-50"></div>
        <div className="container mx-auto relative z-10">
          <motion.div 
            className="flex flex-col items-center text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Logo size="large" />
            
            <motion.h1 
              className="mt-8 text-4xl md:text-5xl lg:text-6xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {isVietnamese ? 'Câu Chuyện Của Chúng Tôi' : 'Our Story'}
            </motion.h1>
            
            <motion.p 
              className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {isVietnamese 
                ? 'Kết nối cộng đồng làm đẹp, xây dựng tương lai tươi sáng hơn cho các chuyên gia làm đẹp Việt Nam và quốc tế.'
                : 'Connecting the beauty community, building a brighter future for Vietnamese and international beauty professionals.'}
            </motion.p>
            
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <LanguageToggleButton 
                isVietnamese={isVietnamese} 
                toggleLanguage={toggleLanguage} 
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-playfair font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {isVietnamese ? 'Cuộc Hành Trình Của EmviApp' : 'The EmviApp Journey'}
          </motion.h2>
          
          <div className="relative">
            {/* Timeline Center Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-purple-200"></div>
            
            {/* Timeline Items */}
            <div className="space-y-24">
              <TimelineItem 
                year="2014" 
                position="left"
                icon={<Lightbulb className="h-6 w-6 text-amber-500" />}
                title={isVietnamese ? "Khởi Nguồn Ý Tưởng" : "The Seed of an Idea"}
                content={isVietnamese 
                  ? "Phát hiện khoảng trống thị trường kết nối người thợ làm đẹp Việt Nam với cơ hội việc làm tại Mỹ." 
                  : "Identifying a market gap connecting Vietnamese beauty professionals with opportunities in the US."}
              />
              
              <TimelineItem 
                year="2018" 
                position="right"
                icon={<Users className="h-6 w-6 text-blue-500" />}
                title={isVietnamese ? "Nghiên Cứu Thị Trường" : "Market Research"}
                content={isVietnamese 
                  ? "Phỏng vấn hơn 200 chủ tiệm và thợ làm đẹp để hiểu nhu cầu thực tế của ngành." 
                  : "Interviewing over 200 salon owners and beauty professionals to understand the industry's real needs."}
              />
              
              <TimelineItem 
                year="2021" 
                position="left"
                icon={<Award className="h-6 w-6 text-green-500" />}
                title={isVietnamese ? "Phiên Bản Đầu Tiên" : "First Prototype"}
                content={isVietnamese 
                  ? "Phát triển phiên bản thử nghiệm đầu tiên của ứng dụng kết nối việc làm." 
                  : "Developing the first test version of our job connection platform."}
              />
              
              <TimelineItem 
                year="2022" 
                position="right"
                icon={<Heart className="h-6 w-6 text-pink-500" />}
                title={isVietnamese ? "Hỗ Trợ Cộng Đồng" : "Community Support"}
                content={isVietnamese 
                  ? "Tạo các nhóm hỗ trợ trực tuyến cho người Việt trong ngành làm đẹp tại Mỹ." 
                  : "Creating online support groups for Vietnamese beauty professionals in the US."}
              />
              
              <TimelineItem 
                year="2023" 
                position="left"
                icon={<Gem className="h-6 w-6 text-purple-500" />}
                title={isVietnamese ? "Ra Mắt EmviApp" : "EmviApp Launch"}
                content={isVietnamese 
                  ? "Chính thức ra mắt EmviApp với đầy đủ tính năng kết nối, hỗ trợ song ngữ." 
                  : "Officially launching EmviApp with full connection features and bilingual support."}
              />
              
              <TimelineItem 
                year="2024" 
                position="right"
                icon={<BarChart className="h-6 w-6 text-cyan-500" />}
                title={isVietnamese ? "Mở Rộng và Phát Triển" : "Growth and Expansion"}
                content={isVietnamese 
                  ? "Đạt mốc hàng ngàn người dùng hoạt động, mở rộng đến nhiều thành phố tại Mỹ." 
                  : "Reaching thousands of active users, expanding to multiple cities across the US."}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface TimelineItemProps {
  year: string;
  position: "left" | "right";
  icon: React.ReactNode;
  title: string;
  content: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ 
  year, 
  position, 
  icon, 
  title, 
  content 
}) => {
  const isLeft = position === "left";
  
  return (
    <motion.div 
      className={`flex items-center ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={`w-1/2 ${isLeft ? 'pr-8 text-right' : 'pl-8'}`}>
        <div className="bg-white backdrop-blur-sm rounded-xl shadow-xl p-6 border border-purple-100 hover:border-purple-200 transition-all hover:shadow-purple-100/30">
          <div className="flex items-center gap-3 mb-3">
            {icon}
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          </div>
          <p className="text-gray-600">{content}</p>
        </div>
      </div>
      
      <div className="z-10 flex-shrink-0">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold shadow-lg border-4 border-white">
          {year}
        </div>
      </div>
      
      <div className="w-1/2"></div>
    </motion.div>
  );
};

export default AboutUs;
