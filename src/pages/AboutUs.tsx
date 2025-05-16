
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Star, Award, Heart, Users, BarChart3 } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  icon: JSX.Element;
}

const AboutUs: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'vi'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'vi' : 'en');
  };

  const timelineItems: TimelineItem[] = [
    {
      year: '2014',
      title: {
        en: 'The Idea Is Born',
        vi: 'Ý Tưởng Ra Đời'
      },
      description: {
        en: 'The concept of EmviApp was first conceived as a way to connect beauty professionals with clients in the Vietnamese community.',
        vi: 'Ý tưởng về EmviApp lần đầu tiên được hình thành như một cách để kết nối các chuyên gia làm đẹp với khách hàng trong cộng đồng người Việt.'
      },
      icon: <Star className="w-6 h-6 text-purple-600" />
    },
    {
      year: '2018',
      title: {
        en: 'Initial Research Phase',
        vi: 'Giai Đoạn Nghiên Cứu Ban Đầu'
      },
      description: {
        en: 'Extensive market research and user interviews helped shape the foundation of what EmviApp would become.',
        vi: 'Nghiên cứu thị trường và phỏng vấn người dùng giúp định hình nền tảng cho EmviApp.'
      },
      icon: <MapPin className="w-6 h-6 text-blue-500" />
    },
    {
      year: '2021',
      title: {
        en: 'Beta Platform Launch',
        vi: 'Ra Mắt Nền Tảng Beta'
      },
      description: {
        en: 'The first version of EmviApp was launched to a select group of beauty professionals and clients for testing.',
        vi: 'Phiên bản đầu tiên của EmviApp được ra mắt cho một nhóm chuyên gia làm đẹp và khách hàng được lựa chọn để thử nghiệm.'
      },
      icon: <Award className="w-6 h-6 text-amber-500" />
    },
    {
      year: '2022',
      title: {
        en: 'Growing Community',
        vi: 'Cộng Đồng Phát Triển'
      },
      description: {
        en: 'EmviApp began to see significant growth in the Vietnamese beauty professional community across the United States.',
        vi: 'EmviApp bắt đầu chứng kiến sự tăng trưởng đáng kể trong cộng đồng chuyên gia làm đẹp người Việt trên khắp Hoa Kỳ.'
      },
      icon: <Users className="w-6 h-6 text-green-500" />
    },
    {
      year: '2023',
      title: {
        en: 'New Features & Expansion',
        vi: 'Tính Năng Mới & Mở Rộng'
      },
      description: {
        en: 'Introduction of key features like booking management, portfolio showcases, and secure payments elevated the platform.',
        vi: 'Giới thiệu các tính năng chính như quản lý đặt chỗ, trưng bày danh mục và thanh toán an toàn đã nâng cao nền tảng.'
      },
      icon: <BarChart3 className="w-6 h-6 text-indigo-500" />
    },
    {
      year: '2024',
      title: {
        en: 'Nationwide Coverage',
        vi: 'Phủ Sóng Toàn Quốc'
      },
      description: {
        en: 'EmviApp now connects thousands of Vietnamese beauty professionals with clients across all 50 states.',
        vi: 'EmviApp hiện kết nối hàng ngàn chuyên gia làm đẹp người Việt với khách hàng trên khắp 50 tiểu bang.'
      },
      icon: <Heart className="w-6 h-6 text-rose-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <img 
                src="/salon-banner.png" 
                alt="EmviApp Logo" 
                className="h-28 md:h-36 object-contain"
              />
            </motion.div>

            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="mb-6 px-4 py-1.5 bg-white/70 hover:bg-white rounded-full border border-purple-100 text-sm font-medium text-purple-700 flex items-center shadow-sm transition"
            >
              <Clock className="h-4 w-4 mr-2 text-purple-500" />
              {language === 'en' ? 'Switch to Tiếng Việt' : 'Change to English'}
            </button>

            {/* Heading */}
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 font-playfair"
            >
              {language === 'en' ? (
                <>Our <span className="text-purple-600">Story</span></>
              ) : (
                <>Câu Chuyện <span className="text-purple-600">Của Chúng Tôi</span></>
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 max-w-2xl"
            >
              {language === 'en' ? (
                "Building bridges between talented Vietnamese beauty professionals and clients seeking exceptional service."
              ) : (
                "Xây dựng cầu nối giữa các chuyên gia làm đẹp người Việt tài năng và khách hàng tìm kiếm dịch vụ đặc biệt."
              )}
            </motion.p>
          </div>

          {/* Timeline Section */}
          <div className="mt-20">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-center mb-16 font-playfair"
            >
              {language === 'en' ? (
                <>Our <span className="text-purple-600">Journey</span></>
              ) : (
                <>Cuộc <span className="text-purple-600">Hành Trình</span></>
              )}
            </motion.h2>

            <div className="relative">
              {/* Timeline center line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-300 to-pink-300 rounded-full"></div>

              {/* Timeline items */}
              <div className="relative">
                {timelineItems.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className={`mb-16 flex items-center ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    } md:flex-row-reverse md:even:flex-row`}
                  >
                    <div className="w-1/2 md:w-[45%] flex justify-end md:even:justify-start pr-8 md:even:pr-0 md:even:pl-8">
                      <div className="w-full max-w-md">
                        <div className="bg-white/80 backdrop-blur-sm border border-purple-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                          <div className="text-sm text-purple-500 font-semibold mb-1">{item.year}</div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {language === 'en' ? item.title.en : item.title.vi}
                          </h3>
                          <p className="text-gray-600">
                            {language === 'en' ? item.description.en : item.description.vi}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-purple-300 flex items-center justify-center shadow-md">
                        {item.icon}
                      </div>
                    </div>

                    <div className="w-1/2 md:w-[45%]"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
