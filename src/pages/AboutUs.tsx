
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Clock, BookOpen, Sparkles, Compass } from 'lucide-react';
import EmviLogo from '@/components/branding/EmviLogo';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageToggleButton from '@/components/home/missing-piece/LanguageToggleButton';

const AboutUs = () => {
  const { t, isVietnamese, toggleLanguage } = useTranslation();
  
  // Translations
  const translations = {
    hero: {
      title: {
        english: "Our Story. Our Journey. Our Purpose.",
        vietnamese: "Câu Chuyện. Hành Trình. Sứ Mệnh."
      },
      subtitle: {
        english: "Discover the heart behind EmviApp—a platform built by beauty professionals, for beauty professionals and customers.",
        vietnamese: "Khám phá trái tim đằng sau EmviApp—nền tảng được xây dựng bởi các chuyên gia làm đẹp, dành cho các chuyên gia và khách hàng."
      }
    },
    timeline: {
      heading: {
        english: "Our Journey",
        vietnamese: "Cuộc Hành Trình"
      },
      steps: [
        {
          year: "2014",
          title: {
            english: "The Idea",
            vietnamese: "Ý Tưởng"
          },
          description: {
            english: "A spark of inspiration from 25 years in beauty.",
            vietnamese: "Tia sáng cảm hứng từ 25 năm trong ngành làm đẹp."
          },
          icon: <Lightbulb className="w-6 h-6 text-purple-500" />,
          position: "right"
        },
        {
          year: "2015",
          title: {
            english: "First Attempt",
            vietnamese: "Nỗ Lực Đầu Tiên"
          },
          description: {
            english: "Our first app was born; we spent years and all our resources, but still fell short.",
            vietnamese: "Ứng dụng đầu tiên của chúng tôi ra đời; chúng tôi đã dành nhiều năm và tất cả nguồn lực, nhưng vẫn chưa thành công."
          },
          icon: <Clock className="w-6 h-6 text-purple-500" />,
          position: "left"
        },
        {
          year: "2015–2023",
          title: {
            english: "Lessons & Perseverance",
            vietnamese: "Bài Học & Kiên Trì"
          },
          description: {
            english: "Eight years of hard work, setbacks, but never giving up.",
            vietnamese: "Tám năm làm việc chăm chỉ, thất bại, nhưng không bao giờ bỏ cuộc."
          },
          icon: <BookOpen className="w-6 h-6 text-purple-500" />,
          position: "right"
        },
        {
          year: "2024",
          title: {
            english: "Rebirth",
            vietnamese: "Tái Sinh"
          },
          description: {
            english: "With new vision and the help of Sunshine, EmviApp is reborn.",
            vietnamese: "Với tầm nhìn mới và sự giúp đỡ của Sunshine, EmviApp được tái sinh."
          },
          icon: <Sparkles className="w-6 h-6 text-purple-500" />,
          position: "left"
        },
        {
          year: t({
            english: "Now",
            vietnamese: "Hiện Tại"
          }),
          title: {
            english: "Our Journey Continues",
            vietnamese: "Hành Trình Tiếp Tục"
          },
          description: {
            english: "We build bridges between artists, salons, and clients—so no one is ever lost again.",
            vietnamese: "Chúng tôi xây dựng cầu nối giữa nghệ sĩ, salon và khách hàng—để không ai bị lạc lối nữa."
          },
          icon: <Compass className="w-6 h-6 text-purple-500" />,
          position: "right"
        }
      ]
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      {/* Language Switcher - Floating */}
      <div className="fixed top-24 right-4 z-10">
        <LanguageToggleButton 
          isVietnamese={isVietnamese} 
          toggleLanguage={toggleLanguage} 
        />
      </div>
      
      {/* Hero Section */}
      <motion.section 
        className="text-center mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center mb-8">
          <EmviLogo size="large" />
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-6">
          {t(translations.hero.title)}
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          {t(translations.hero.subtitle)}
        </p>
      </motion.section>
      
      {/* Timeline Section */}
      <section className="mb-20 relative">
        <h2 className="text-2xl md:text-3xl font-playfair text-center mb-12">
          {t(translations.timeline.heading)}
        </h2>
        
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 md:transform md:-translate-x-1/2 bg-gradient-to-b from-purple-300 via-purple-500 to-pink-500"></div>
        
        {/* Timeline items */}
        <div className="space-y-12 relative">
          {translations.timeline.steps.map((step, index) => (
            <TimelineItem 
              key={index}
              year={step.year}
              title={t(step.title)}
              description={t(step.description)}
              icon={step.icon}
              position={step.position}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

// Timeline Item Component
interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  position: 'left' | 'right';
}

const TimelineItem = ({ year, title, description, icon, position }: TimelineItemProps) => {
  const isRight = position === 'right';
  
  return (
    <motion.div 
      className={`flex items-start ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
      initial={{ opacity: 0, x: isRight ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Content */}
      <div className={`md:w-1/2 w-full ${isRight ? 'md:pr-12 md:text-right' : 'md:pl-12'} mb-6 md:mb-0`}>
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <span className="text-sm font-medium text-purple-600 block mb-2">{year}</span>
          <h3 className="text-xl font-playfair font-semibold mb-2">{title}</h3>
          <p className="text-gray-700">{description}</p>
        </div>
      </div>
      
      {/* Icon - Mobile: Hidden, Desktop: Shown in center */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-12 h-12 rounded-full bg-white shadow-md border border-gray-200">
        {icon}
      </div>
      
      {/* Icon - Mobile: Shown to left, Desktop: Hidden */}
      <div className="flex md:hidden absolute left-0 transform -translate-x-1/2 items-center justify-center w-8 h-8 rounded-full bg-white shadow-md border border-gray-200">
        {icon}
      </div>
      
      {/* Empty div for spacing on other side */}
      <div className="md:w-1/2 hidden md:block"></div>
    </motion.div>
  );
};

export default AboutUs;
