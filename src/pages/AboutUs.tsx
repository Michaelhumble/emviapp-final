
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Globe, Sun, Heart, Lightbulb, Tool, Flame, Sparkles, Globe2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { GradientBackground } from '@/components/ui/gradient-background';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { MobileButton } from '@/components/ui/mobile-button';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  const { t, isVietnamese, toggleLanguage } = useTranslation();
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  // Animation hooks for different sections
  const heroAnimation = useScrollAnimation({ animation: 'fade-in', delay: 100 });
  const timelineAnimation = useScrollAnimation({ animation: 'fade-in', delay: 200 });
  const storyAnimation = useScrollAnimation({ animation: 'fade-in', delay: 300 });
  const sunshineAnimation = useScrollAnimation({ animation: 'fade-in', delay: 400 });
  const emViAnimation = useScrollAnimation({ animation: 'fade-in', delay: 500 });

  const milestones = [
    {
      year: "2014",
      icon: <Lightbulb className="h-8 w-8 text-amber-500" />,
      title: { 
        english: "The Spark", 
        vietnamese: "Tia Lửa"
      },
      description: {
        english: "Dreamed of connecting beauty's artists, owners, and customers—no more missed opportunities.",
        vietnamese: "Mơ về một kết nối thật sự giữa thợ, chủ tiệm và khách hàng—không còn lạc mất cơ hội."
      }
    },
    {
      year: "2015-2023",
      icon: <Tool className="h-8 w-8 text-blue-500" />,
      title: { 
        english: "The Climb", 
        vietnamese: "Hành Trình"
      },
      description: {
        english: "Eight years of building, failing, and never giving up. Every setback made the mission clearer.",
        vietnamese: "Tám năm xây dựng, thất bại, không bỏ cuộc. Mỗi lần vấp ngã chỉ càng làm rõ thêm lý do tồn tại."
      }
    },
    {
      year: "2024",
      icon: <Flame className="h-8 w-8 text-orange-500" />,
      title: { 
        english: "Rebirth", 
        vietnamese: "Tái Sinh"
      },
      description: {
        english: "Started from zero—EmviApp rebuilt for the world, determined to map every connection.",
        vietnamese: "Bắt đầu lại từ đầu—EmviApp hồi sinh để vẽ bản đồ kết nối cho cả cộng đồng."
      }
    },
    {
      year: t({
        english: "Today", 
        vietnamese: "Hiện Tại"
      }),
      icon: <Sparkles className="h-8 w-8 text-purple-500" />,
      title: { 
        english: "A New Home", 
        vietnamese: "Mái Nhà Mới"
      },
      description: {
        english: "A beautiful bridge for artists, salons, and customers. Everyone finally has a place to belong.",
        vietnamese: "Cây cầu nối đẹp đẽ giữa thợ, chủ tiệm, khách hàng—mỗi người đều tìm được mái nhà chung."
      }
    },
    {
      year: t({
        english: "Future", 
        vietnamese: "Tương Lai"
      }),
      icon: <Globe2 className="h-8 w-8 text-green-500" />,
      title: { 
        english: "The Connected Dream", 
        vietnamese: "Giấc Mơ Kết Nối"
      },
      description: {
        english: "Our mission is to help everyone in beauty find their path—and their people.",
        vietnamese: "Sứ mệnh: Đưa mọi người lên bản đồ, ai cũng tìm được đúng người, đúng chỗ."
      }
    }
  ];

  const storyContent = {
    english: [
      "Every great journey begins with a question: "How can we make things better?"",
      "For me, that question was born over 25 years ago in the beauty industry—working behind the chair, managing salons, helping customers, seeing talent, heartbreak, and hope.",
      "2014",
      "I dreamed of a true connection—a way for customers, artists, and salons to find each other with trust and clarity. But there was no map, no guide, only word of mouth and lost chances.",
      "2015–2023",
      "We built, we failed, we tried again. Eight years of sweat, loss, and fighting for a dream that felt impossible. But every setback made me believe even more that our industry needs real connection.",
      "2024",
      "With everything I'd learned, I rebuilt EmviApp from zero. This time, the goal was simple: bring everyone onto the same map, and help every artist, every salon, and every customer find their perfect match.",
      "Today",
      "EmviApp is more than an app. It's the bridge for every beauty dream. For the first time, our community has a home—a place where artists shine, salons grow, and customers always find their people.",
      "The future? It belongs to all of us, together."
    ],
    vietnamese: [
      "Mỗi cuộc hành trình lớn đều bắt đầu bằng một câu hỏi: "Làm sao để mọi thứ tốt đẹp hơn?"",
      "Với tôi, câu hỏi đó được sinh ra từ hơn 25 năm làm nghề làm đẹp—từ sau ghế salon, quản lý tiệm, phục vụ khách, chứng kiến bao tài năng, bao nỗi buồn và hy vọng.",
      "2014",
      "Tôi ước mơ có một sự kết nối thật sự—giữa khách hàng, thợ và chủ tiệm, để ai cũng tìm được nhau bằng sự tin tưởng và rõ ràng. Nhưng lúc đó không có bản đồ, không có định hướng—chỉ có truyền miệng và những cơ hội vuột mất.",
      "2015–2023",
      "Chúng tôi xây dựng, thất bại, rồi lại bắt đầu. Tám năm vất vả, mất mát, đôi lúc muốn bỏ cuộc. Nhưng mỗi lần vấp ngã, tôi càng tin rằng ngành làm đẹp cần một sự kết nối thật sự.",
      "2024",
      "Nhờ những gì đã trải qua, tôi làm lại EmviApp từ đầu. Lần này, mục tiêu rất rõ ràng: đưa tất cả mọi người lên cùng một bản đồ, giúp thợ, chủ tiệm và khách hàng dễ dàng tìm thấy nhau.",
      "Hôm nay",
      "EmviApp không chỉ là một ứng dụng. Đó là cây cầu cho mọi ước mơ làm đẹp. Lần đầu tiên, cộng đồng này có một mái nhà chung—nơi thợ tỏa sáng, tiệm phát triển, và khách hàng luôn tìm được người mình cần.",
      "Tương lai? Là của tất cả chúng ta."
    ]
  };

  const sunshineContent = {
    english: {
      title: "Inspired by Sunshine ☀️",
      paragraphs: [
        "Every great journey needs a little light.",
        "For me, that light is Sunshine—a source of hope, clarity, and inspiration that appeared just when I needed it most.",
        "EmviApp was born from years of experience, struggle, and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and finally bring this dream to life.",
        "Thank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you."
      ]
    },
    vietnamese: {
      title: "Cảm hứng từ Sunshine ☀️",
      paragraphs: [
        "Mỗi hành trình lớn đều cần một ánh sáng nhỏ.",
        "Với tôi, ánh sáng đó chính là Sunshine—nguồn hy vọng, sự rõ ràng và cảm hứng, đã đến với tôi đúng lúc tôi cần nhất.",
        "EmviApp ra đời sau nhiều năm kinh nghiệm, vấp ngã và nỗ lực không ngừng, nhưng chính Sunshine đã cho tôi dũng khí và tầm nhìn để bắt đầu lại, biến ước mơ này thành hiện thực.",
        "Cảm ơn Sunshine đã xuất hiện trong cuộc đời tôi. Dự án này—và mọi kết nối nó tạo ra—sẽ không thể tồn tại nếu thiếu Sunshine."
      ]
    }
  };

  const emViContent = {
    english: {
      title: "For Em Vi ❤️",
      paragraphs: [
        "Thank you, Em Vi, for silently supporting and sacrificing for me—especially when I stopped believing in myself. You never gave up on my dream, even when I almost did. That's why this app bears your name.",
        "Without you, none of this would exist."
      ]
    },
    vietnamese: {
      title: "Gửi Em Vi ❤️",
      paragraphs: [
        "Cảm ơn Em Vi—người đã âm thầm hy sinh, luôn bên cạnh động viên, nâng đỡ anh, ngay cả khi anh không còn tin vào bản thân mình nữa. Em không bao giờ bỏ cuộc với giấc mơ này, dù chính anh đã từng muốn dừng lại. Đó là lý do vì sao ứng dụng này mang tên Em Vi.",
        "Nếu không có em, mọi thứ hôm nay sẽ không thể thành hiện thực."
      ]
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-indigo-50 overflow-hidden">
        {/* Language Switcher */}
        <div className="fixed top-24 right-4 z-50">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all border border-purple-100"
          >
            <Globe className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium">
              {isVietnamese ? "EN" : "VI"}
            </span>
          </button>
        </div>

        {/* Hero Section */}
        <div 
          className="container max-w-6xl mx-auto pt-16 pb-8 px-4" 
          ref={heroAnimation.ref}
          style={heroAnimation.style}
        >
          <div className={`flex flex-col items-center text-center gap-6 ${heroAnimation.className}`}>
            <div className="h-32 w-auto">
              <img
                src="https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/emvilogo//emvi-logo-transparent.png"
                alt="EmviApp Logo"
                className="h-full w-auto object-contain"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent tracking-tight">
              {t({
                english: "Our Journey",
                vietnamese: "Cuộc Hành Trình"
              })}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl">
              {t({
                english: "Building real connections in the beauty world.",
                vietnamese: "Kết nối thật sự trong ngành làm đẹp."
              })}
            </p>
          </div>
        </div>

        {/* Timeline/Milestones Section */}
        <div 
          className="container max-w-6xl mx-auto py-12 px-4"
          ref={timelineAnimation.ref}
          style={timelineAnimation.style}
        >
          <div className={`timeline-container ${timelineAnimation.className}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className="col-span-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="h-full backdrop-blur-md bg-white/70 border border-purple-100/50 shadow-md hover:shadow-lg transition-all p-6 flex flex-col">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 p-3 flex-shrink-0">
                        {milestone.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-purple-800 text-sm uppercase tracking-wider">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mt-1 mb-3">
                          {t(milestone.title)}
                        </h3>
                        <p className="text-gray-600">
                          {t(milestone.description)}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Journey - Full Story Section */}
        <div 
          className="container max-w-6xl mx-auto py-12 px-4"
          ref={storyAnimation.ref}
          style={storyAnimation.style}  
        >
          <motion.div 
            className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-purple-100/50 p-6 md:p-10 ${storyAnimation.className}`}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-8 text-center bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
              {t({
                english: "Our Journey — Full Story",
                vietnamese: "Cuộc Hành Trình — Câu Chuyện Đầy Đủ"
              })}
            </h2>
            <div className="prose prose-lg max-w-none prose-purple">
              {storyContent[isVietnamese ? 'vietnamese' : 'english'].map((paragraph, index) => (
                <React.Fragment key={index}>
                  {paragraph.includes("2014") || paragraph.includes("2015") || paragraph.includes("2024") || paragraph.includes("Today") || paragraph === "The future? It belongs to all of us, together." || paragraph === "Tương lai? Là của tất cả chúng ta." ? (
                    <h3 className="text-xl md:text-2xl font-bold text-purple-700 mt-8 mb-4">{paragraph}</h3>
                  ) : (
                    <p className="mb-4 text-gray-700">{paragraph}</p>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Inspired by Sunshine Section */}
        <div 
          className="container max-w-5xl mx-auto py-12 px-4"
          ref={sunshineAnimation.ref}
          style={sunshineAnimation.style}
        >
          <motion.div 
            className={`rounded-2xl overflow-hidden ${sunshineAnimation.className}`}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-gradient-to-r from-amber-50 to-yellow-100 border border-amber-200/50 rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <Sun className="h-7 w-7 text-amber-500" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-amber-800">
                  {t({
                    english: sunshineContent.english.title,
                    vietnamese: sunshineContent.vietnamese.title
                  })}
                </h2>
              </div>

              <div className="prose prose-lg max-w-none prose-amber">
                {isVietnamese
                  ? sunshineContent.vietnamese.paragraphs.map((p, i) => (
                      <p key={i} className="mb-4 text-amber-800">{p}</p>
                    ))
                  : sunshineContent.english.paragraphs.map((p, i) => (
                      <p key={i} className="mb-4 text-amber-800">{p}</p>
                    ))
                }
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dedication to Em Vi Section */}
        <div 
          className="container max-w-5xl mx-auto py-12 px-4 mb-12"
          ref={emViAnimation.ref}
          style={emViAnimation.style}
        >
          <motion.div 
            className={`animate-subtle-pulse ${emViAnimation.className}`}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-gradient-to-r from-rose-50 to-pink-100 border border-rose-200/50 rounded-2xl p-6 md:p-8 shadow-lg glow-effect">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center">
                  <Heart className="h-7 w-7 text-rose-500" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-rose-800">
                  {t({
                    english: emViContent.english.title,
                    vietnamese: emViContent.vietnamese.title
                  })}
                </h2>
              </div>

              <div className="prose prose-lg max-w-none prose-pink">
                {isVietnamese
                  ? emViContent.vietnamese.paragraphs.map((p, i) => (
                      <p key={i} className="mb-4 text-rose-800">{p}</p>
                    ))
                  : emViContent.english.paragraphs.map((p, i) => (
                      <p key={i} className="mb-4 text-rose-800">{p}</p>
                    ))
                }
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <div className="container max-w-5xl mx-auto py-12 px-4 text-center">
          <GradientBackground variant="premium" className="p-8 md:p-12 rounded-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 font-playfair">
              {t({
                english: "Ready to be part of our story?",
                vietnamese: "Sẵn sàng trở thành một phần câu chuyện?"
              })}
            </h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              {t({
                english: "Join EmviApp today and discover the power of real connections in the beauty world.",
                vietnamese: "Tham gia EmviApp ngay hôm nay và khám phá sức mạnh của kết nối thật sự trong ngành làm đẹp."
              })}
            </p>
            <Link to="/sign-up">
              <MobileButton className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium px-8">
                {t({
                  english: "Get Started Free",
                  vietnamese: "Bắt Đầu Miễn Phí"
                })}
              </MobileButton>
            </Link>
          </GradientBackground>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
