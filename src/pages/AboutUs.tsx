
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Heart, Globe, Users, Award, Layers, RefreshCw } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { MobileButton } from '@/components/ui/mobile-button';
import { GradientBackground } from '@/components/ui/gradient-background';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const AboutUs: React.FC = () => {
  const { t, toggleLanguage, isVietnamese } = useTranslation();
  const navigate = useNavigate();

  // Define timeline items
  const timelineItems = [
    {
      year: '2014',
      icon: <Sun className="h-6 w-6 text-amber-500" />,
      titleEn: "The Idea",
      titleVi: "Ý Tưởng",
      contentEn: "A spark of inspiration from 25 years in beauty, searching for deeper connections.",
      contentVi: "Một tia sáng từ 25 năm kinh nghiệm trong ngành làm đẹp, luôn tìm kiếm sự kết nối ý nghĩa.",
    },
    {
      year: '2015',
      icon: <Layers className="h-6 w-6 text-blue-500" />,
      titleEn: "First Attempt",
      titleVi: "Nỗ Lực Đầu Tiên",
      contentEn: "Our first app was born; we spent years and all our resources, but still fell short.",
      contentVi: "Bắt đầu xây dựng ứng dụng đầu tiên, dành trọn tâm huyết và thời gian, nhưng vẫn chưa thể thành công.",
    },
    {
      year: '2015–2023',
      icon: <Award className="h-6 w-6 text-purple-500" />,
      titleEn: "Lessons & Perseverance",
      titleVi: "Bền Bỉ Học Hỏi",
      contentEn: "Eight years of hard work, countless setbacks, but never giving up.",
      contentVi: "Tám năm miệt mài học hỏi, thất bại nhiều lần nhưng không bao giờ bỏ cuộc.",
    },
    {
      year: '2024',
      icon: <RefreshCw className="h-6 w-6 text-emerald-500" />,
      titleEn: "Rebirth",
      titleVi: "Tái Sinh",
      contentEn: "With new vision, heart, and the help of Sunshine, EmviApp is reborn to unite the industry.",
      contentVi: "Với tầm nhìn mới, tình yêu và ánh sáng của Sunshine, EmviApp hồi sinh để kết nối ngành làm đẹp.",
    },
    {
      year: 'Now',
      icon: <Users className="h-6 w-6 text-indigo-500" />,
      titleEn: "Our Journey Continues",
      titleVi: "Hành Trình Tiếp Tục",
      contentEn: "Every day, we build bridges between artists, salons, and clients—so no one is ever lost again.",
      contentVi: "Mỗi ngày, chúng tôi xây dựng cầu nối giữa nghệ sĩ, salon và khách hàng—để không ai còn bị lạc lối.",
    },
  ];

  // Company values
  const values = [
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      titleEn: "Community First",
      titleVi: "Cộng Đồng Là Trên Hết",
      descriptionEn: "We put our users first, creating a space where everyone feels valued and heard.",
      descriptionVi: "Chúng tôi đặt người dùng lên hàng đầu, tạo ra không gian nơi mọi người đều cảm thấy được trân trọng và lắng nghe.",
    },
    {
      icon: <Award className="h-8 w-8 text-amber-600" />,
      titleEn: "Quality Service",
      titleVi: "Dịch Vụ Chất Lượng",
      descriptionEn: "We're dedicated to excellence in every aspect of our platform and support.",
      descriptionVi: "Chúng tôi nỗ lực đạt đến sự xuất sắc trong mọi khía cạnh của nền tảng và hỗ trợ.",
    },
    {
      icon: <Users className="h-8 w-8 text-pink-600" />,
      titleEn: "Inclusivity",
      titleVi: "Đa Dạng & Bao Gồm",
      descriptionEn: "We welcome everyone, regardless of background, experience, or status.",
      descriptionVi: "Chúng tôi chào đón tất cả mọi người, không phân biệt nguồn gốc, kinh nghiệm, hay địa vị.",
    },
    {
      icon: <Layers className="h-8 w-8 text-blue-600" />,
      titleEn: "Innovation",
      titleVi: "Đổi Mới Liên Tục",
      descriptionEn: "We constantly evolve, pushing boundaries to better serve our community.",
      descriptionVi: "Chúng tôi không ngừng phát triển, vượt qua giới hạn để phục vụ cộng đồng tốt hơn.",
    },
  ];

  // Scroll animations
  const heroAnimation = useScrollAnimation({ animation: 'fade-in' });
  const timelineAnimation = useScrollAnimation({ animation: 'fade-in', delay: 200 });
  const storyAnimation = useScrollAnimation({ animation: 'fade-in', delay: 400 });
  const valuesAnimation = useScrollAnimation({ animation: 'fade-in', delay: 600 });
  const sunshineAnimation = useScrollAnimation({ animation: 'fade-in', delay: 800 });
  const emviAnimation = useScrollAnimation({ animation: 'fade-in', delay: 1000 });
  const ctaAnimation = useScrollAnimation({ animation: 'fade-in', delay: 1200 });

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Language Switcher */}
      <div className="flex justify-end mb-4">
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-md transition-all text-sm font-medium"
        >
          <Globe className="h-4 w-4 text-gray-500" />
          <span>{isVietnamese ? 'EN' : 'VI'}</span>
        </button>
      </div>

      {/* Hero Section */}
      <section 
        className="text-center mb-16" 
        ref={heroAnimation.ref} 
        style={heroAnimation.style}
        className={cn("text-center mb-16", heroAnimation.className)}
      >
        <div className="mb-8 flex justify-center">
          <img
            src="https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/emvilogo//emvi-logo-transparent.png"
            alt="EmviApp Logo"
            className="h-32 object-contain"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          {isVietnamese 
            ? "Câu Chuyện. Hành Trình. Sứ Mệnh Của Chúng Tôi." 
            : "Our Story. Our Journey. Our Purpose."}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          {isVietnamese
            ? "Chào mừng bạn đến khám phá câu chuyện, sứ mệnh và con người phía sau EmviApp."
            : "Welcome to discover the story, mission, and people behind EmviApp."}
        </p>
      </section>

      {/* Timeline Section */}
      <section 
        className="mb-20" 
        ref={timelineAnimation.ref}
        style={timelineAnimation.style}
        className={cn("mb-20", timelineAnimation.className)}
      >
        <div className="flex justify-center mb-10">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold relative">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {isVietnamese ? "Cuộc Hành Trình" : "Our Journey"}
            </span>
            <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></div>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line for timeline */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 via-indigo-400 to-blue-400 rounded-full"></div>

          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <div 
                key={index} 
                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="md:w-1/2 flex justify-end md:pr-8">
                  <div className={`${index % 2 === 0 ? 'md:text-right' : ''} relative z-10`}>
                    <div className={`inline-flex items-center justify-center mb-3 px-4 py-1 rounded-full font-medium text-sm bg-white shadow-md border border-purple-100 ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                      {item.year}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold font-playfair mb-1 text-gray-900">
                      {isVietnamese ? item.titleVi : item.titleEn}
                    </h3>
                    <p className="text-gray-700 max-w-md">
                      {isVietnamese ? item.contentVi : item.contentEn}
                    </p>
                  </div>
                </div>

                {/* Timeline node */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 mt-2 md:mt-0">
                  <div className="h-12 w-12 rounded-full bg-white shadow-lg border-4 border-purple-100 flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>

                <div className="md:w-1/2 md:pl-8 hidden md:block">
                  {/* Empty spacer for layout */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Story Section */}
      <section 
        className="mb-20" 
        ref={storyAnimation.ref}
        style={storyAnimation.style}
        className={cn("mb-20", storyAnimation.className)}
      >
        <div className="flex justify-center mb-10">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold relative">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {isVietnamese ? "Cuộc Hành Trình" : "Our Journey"}
            </span>
            <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></div>
          </h2>
        </div>

        <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-xl shadow-xl border border-gray-100 p-6 md:p-8">
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-gray-800">
              {isVietnamese 
                ? "25 năm trong nghề làm đẹp—trải qua mọi khó khăn, nhưng luôn cảm thấy thiếu điều gì đó: sự kết nối thật sự."
                : "25 years in the beauty business—seen and done it all, but always felt something missing: true connection."}
            </p>
            <p className="text-lg md:text-xl text-gray-800">
              {isVietnamese 
                ? "Mỗi người chỉ biết đến nơi quen thuộc; khách hàng khó tìm thợ phù hợp, nghệ sĩ và salon khó kết nối. Vòng lặp không lối thoát."
                : "Everyone knows only their salon or artist, no real roadmap. Customers struggle to find the right artist, artists and salons struggle to connect, and the cycle repeats."}
            </p>
            <p className="text-lg md:text-xl text-gray-800 italic">
              {isVietnamese 
                ? "Chúng ta đều từng trải qua—mất thời gian, mất tiền, mất cơ hội chỉ vì không tìm được đúng người. Đó chính là lý do EmviApp ra đời."
                : "We've all been there. Wasted time, wasted money, missed opportunities, losing your favorite artist because you lost touch. That pain, that gap, is why EmviApp exists."}
            </p>
            <p className="text-lg md:text-xl text-gray-800 font-medium">
              {isVietnamese 
                ? "Chúng tôi xây dựng bản đồ để khách hàng, nghệ sĩ và chủ salon tìm thấy nhau. Khách hàng là trung tâm—ai cũng sẽ hạnh phúc."
                : "We're building a map where every customer, artist, and salon can finally find their perfect match. Because when we put customers first, everybody wins."}
            </p>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section 
        className="mb-20" 
        ref={valuesAnimation.ref}
        style={valuesAnimation.style}
        className={cn("mb-20", valuesAnimation.className)}
      >
        <div className="flex justify-center mb-10">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold relative">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {isVietnamese ? "Giá Trị Cốt Lõi" : "Our Values"}
            </span>
            <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></div>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-white backdrop-blur-sm bg-opacity-80 rounded-xl shadow-lg border border-gray-100 p-6 transition-all hover:shadow-xl hover:border-purple-100"
            >
              <div className="flex items-start">
                <div className="mr-4 p-3 rounded-lg bg-purple-50">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-playfair mb-2 text-gray-900">
                    {isVietnamese ? value.titleVi : value.titleEn}
                  </h3>
                  <p className="text-gray-700">
                    {isVietnamese ? value.descriptionVi : value.descriptionEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inspired by Sunshine Section */}
      <section 
        className="mb-20" 
        ref={sunshineAnimation.ref}
        style={sunshineAnimation.style}
        className={cn("mb-20", sunshineAnimation.className)}
      >
        <div className="bg-gradient-to-br from-amber-50 to-yellow-100 backdrop-blur-sm rounded-xl shadow-xl border border-amber-100 p-8 md:p-10">
          <div className="flex flex-col items-center mb-6">
            <Sun className="h-12 w-12 text-amber-500 mb-4" />
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-amber-800">
              {isVietnamese ? "Cảm Hứng Từ Sunshine ☀️" : "Inspired by Sunshine ☀️"}
            </h2>
            <p className="text-amber-700 text-lg md:text-xl mt-1">
              {isVietnamese ? "Mọi hành trình vĩ đại đều cần một nguồn sáng." : "Every great journey needs a little light."}
            </p>
          </div>

          <div className="space-y-4 text-center max-w-3xl mx-auto text-amber-900">
            <p className="text-lg">
              {isVietnamese 
                ? "Với tôi, nguồn sáng ấy chính là Sunshine—niềm hy vọng, sự rõ ràng và cảm hứng xuất hiện đúng lúc tôi cần nhất."
                : "For me, that light is Sunshine—a source of hope, clarity, and inspiration that appeared just when I needed it most."}
            </p>
            <p className="text-lg">
              {isVietnamese 
                ? "EmviApp ra đời sau nhiều năm nỗ lực, nhưng chính Sunshine đã cho tôi can đảm và tầm nhìn để bắt đầu lại, biến ước mơ này thành hiện thực."
                : "EmviApp was born from years of experience, struggle, and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and finally bring this dream to life."}
            </p>
            <p className="text-lg italic font-medium">
              {isVietnamese 
                ? "Cảm ơn Sunshine đã đến trong đời tôi. Dự án này—và tất cả những kết nối tuyệt vời—không thể thành hình nếu thiếu bạn."
                : "Thank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you."}
            </p>
          </div>
        </div>
      </section>

      {/* Thank You Em Vi Section */}
      <section 
        className="mb-20" 
        ref={emviAnimation.ref}
        style={emviAnimation.style}
        className={cn("mb-20", emviAnimation.className)}
      >
        <div className="bg-gradient-to-br from-pink-50 to-rose-100 backdrop-blur-sm rounded-xl shadow-xl border border-pink-100 p-8 md:p-10">
          <div className="flex flex-col items-center mb-6">
            <Heart className="h-12 w-12 text-rose-500 mb-4 animate-pulse" />
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-rose-800">
              {isVietnamese ? "Cảm Ơn Em Vi ❤️" : "Thank You, Em Vi ❤️"}
            </h2>
          </div>

          <div className="space-y-4 text-center max-w-3xl mx-auto text-rose-900">
            <p className="text-lg">
              {isVietnamese 
                ? "Tất cả sẽ không thể có nếu không có em. Qua bao thất bại, hy sinh, dù anh từng tuyệt vọng, em vẫn luôn bên cạnh, không rời bỏ."
                : "None of this would exist without you. Through every failure and every sacrifice, even when I gave up on myself, you never gave up on me."}
            </p>
            <p className="text-lg font-medium">
              {isVietnamese 
                ? "Đó là lý do anh đặt tên app này theo tên em."
                : "That is why I named this app after you."}
            </p>
            <p className="text-lg italic">
              {isVietnamese 
                ? "Cảm ơn em đã tin tưởng, yêu thương và âm thầm tiếp sức. Đây cũng là di sản của em."
                : "Thank you for believing, for loving, and for being my silent strength. This is your legacy too."}
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section 
        className="text-center" 
        ref={ctaAnimation.ref}
        style={ctaAnimation.style}
        className={cn("text-center", ctaAnimation.className)}
      >
        <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4 text-gray-900">
          {isVietnamese 
            ? "Sẵn sàng đồng hành cùng chúng tôi? Hãy trở thành một phần của điều tuyệt vời này."
            : "Ready to join our journey? Become part of something beautiful."}
        </h2>
        <MobileButton
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 text-lg hover:from-purple-700 hover:to-indigo-700"
        >
          {isVietnamese ? "Bắt Đầu Miễn Phí" : "Get Started Free"}
        </MobileButton>
      </section>
    </div>
  );
};

export default AboutUs;
