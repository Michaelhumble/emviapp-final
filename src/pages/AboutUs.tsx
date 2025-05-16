
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import EmviLogo from '@/components/branding/EmviLogo';
import { Globe } from 'lucide-react';
import LanguageToggle from '@/components/layout/LanguageToggle';

const AboutUs: React.FC = () => {
  const { t, isVietnamese } = useTranslation();
  
  const title = {
    english: "Our Story",
    vietnamese: "Câu Chuyện Của Chúng Tôi"
  };
  
  const subtitle = {
    english: "Building bridges in the beauty industry",
    vietnamese: "Xây dựng cầu nối trong ngành làm đẹp"
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-purple-50 to-white py-16 md:py-24">
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10">
          <LanguageToggle minimal={true} />
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <EmviLogo className="mb-8" size="large" />
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-4 text-gray-800">
              {t(title)}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl">
              {t(subtitle)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
