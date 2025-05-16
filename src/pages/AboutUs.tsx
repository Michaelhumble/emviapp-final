
import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GlobeIcon, SunIcon, Heart } from 'lucide-react';
import { MobileButton } from '@/components/ui/mobile-button';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const { t, toggleLanguage, isVietnamese } = useTranslation();
  
  const timelineData = [
    {
      year: "2014",
      icon: "💡",
      title: {
        english: "The Spark",
        vietnamese: "Tia Lửa Đầu Tiên"
      },
      description: {
        english: "Dreamed of connecting beauty's artists, owners, and customers—no more missed opportunities.",
        vietnamese: "Mơ về một kết nối thật sự giữa thợ, chủ tiệm và khách hàng—không còn lạc mất cơ hội."
      }
    },
    {
      year: "2015–2023",
      icon: "🔨",
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
      icon: "🔥",
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
      year: "Today",
      icon: "✨",
      title: {
        english: "A New Home",
        vietnamese: "Ngôi Nhà Mới"
      },
      description: {
        english: "A beautiful bridge for artists, salons, and customers. Everyone finally has a place to belong.",
        vietnamese: "Cây cầu nối đẹp đẽ giữa thợ, chủ tiệm, khách hàng—mỗi người đều tìm được mái nhà chung."
      }
    },
    {
      year: "Future",
      icon: "🌏",
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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <div className="container px-4 py-12 mx-auto max-w-6xl">
      {/* Language Switcher */}
      <div className="flex justify-end mb-8">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleLanguage} 
          className="flex items-center gap-2 rounded-full px-4 bg-white bg-opacity-70 backdrop-blur-sm border border-gray-200 hover:bg-gray-100"
        >
          <GlobeIcon className="h-4 w-4 text-purple-600" />
          <span>{isVietnamese ? "English" : "Tiếng Việt"}</span>
        </Button>
      </div>

      {/* Hero Section */}
      <motion.div 
        className="text-center mb-12"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <img 
          src="https://ugjknozlsaetmwcirnjm.supabase.co/storage/v1/object/public/logos/emvi-logo-purple.png" 
          alt="EmviApp Logo" 
          className="mx-auto h-20 mb-6" 
        />
        <h1 className="text-4xl md:text-5xl font-playfair font-bold bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent mb-4">
          {t({
            english: "Our Journey",
            vietnamese: "Cuộc Hành Trình"
          })}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t({
            english: "Building real connections in the beauty world.",
            vietnamese: "Kết nối thật sự trong ngành làm đẹp."
          })}
        </p>
      </motion.div>

      {/* Timeline Section */}
      <motion.div 
        className="mb-20"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
        <h2 className="text-2xl font-bold text-center mb-8 font-playfair">
          {t({
            english: "Our Journey",
            vietnamese: "Hành Trình Của Chúng Tôi"
          })}
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {timelineData.map((item, index) => (
            <motion.div 
              key={index}
              variants={fadeIn}
              className="relative"
            >
              <Card className="p-6 h-full backdrop-blur-sm bg-white bg-opacity-70 border border-gray-100 hover:shadow-md transition-all rounded-xl overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl flex-shrink-0">
                    <span>{item.icon}</span>
                  </div>
                  <div>
                    <div className="text-sm text-purple-600 font-medium mb-1">{item.year}</div>
                    <h3 className="text-lg font-bold mb-2">{t(item.title)}</h3>
                    <p className="text-gray-600">{t(item.description)}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Full Story Section */}
      <motion.div 
        className="mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <Card className="p-6 md:p-10 backdrop-blur-sm bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-xl shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 font-playfair">
            {t({
              english: "Our Journey — Full Story",
              vietnamese: "Cuộc Hành Trình — Câu Chuyện Đầy Đủ"
            })}
          </h2>

          <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
            {isVietnamese ? (
              <>
                <p>Mỗi cuộc hành trình lớn đều bắt đầu bằng một câu hỏi: "Làm sao để mọi thứ tốt đẹp hơn?"</p>
                <p>Với tôi, câu hỏi đó được sinh ra từ hơn 25 năm làm nghề làm đẹp—từ sau ghế salon, quản lý tiệm, phục vụ khách, chứng kiến bao tài năng, bao nỗi buồn và hy vọng.</p>
                
                <h3 className="text-lg font-bold">2014</h3>
                <p>Tôi ước mơ có một sự kết nối thật sự—giữa khách hàng, thợ và chủ tiệm, để ai cũng tìm được nhau bằng sự tin tưởng và rõ ràng. Nhưng lúc đó không có bản đồ, không có định hướng—chỉ có truyền miệng và những cơ hội vuột mất.</p>
                
                <h3 className="text-lg font-bold">2015–2023</h3>
                <p>Chúng tôi xây dựng, thất bại, rồi lại bắt đầu. Tám năm vất vả, mất mát, đôi lúc muốn bỏ cuộc. Nhưng mỗi lần vấp ngã, tôi càng tin rằng ngành làm đẹp cần một sự kết nối thật sự.</p>
                
                <h3 className="text-lg font-bold">2024</h3>
                <p>Nhờ những gì đã trải qua, tôi làm lại EmviApp từ đầu. Lần này, mục tiêu rất rõ ràng: đưa tất cả mọi người lên cùng một bản đồ, giúp thợ, chủ tiệm và khách hàng dễ dàng tìm thấy nhau.</p>
                
                <h3 className="text-lg font-bold">Hôm nay</h3>
                <p>EmviApp không chỉ là một ứng dụng. Đó là cây cầu cho mọi ước mơ làm đẹp. Lần đầu tiên, cộng đồng này có một mái nhà chung—nơi thợ tỏa sáng, tiệm phát triển, và khách hàng luôn tìm được người mình cần.</p>
                
                <p>Tương lai? Là của tất cả chúng ta.</p>
              </>
            ) : (
              <>
                <p>Every great journey begins with a question: "How can we make things better?"</p>
                <p>For me, that question was born over 25 years ago in the beauty industry—working behind the chair, managing salons, helping customers, seeing talent, heartbreak, and hope.</p>
                
                <h3 className="text-lg font-bold">2014</h3>
                <p>I dreamed of a true connection—a way for customers, artists, and salons to find each other with trust and clarity. But there was no map, no guide, only word of mouth and lost chances.</p>
                
                <h3 className="text-lg font-bold">2015–2023</h3>
                <p>We built, we failed, we tried again. Eight years of sweat, loss, and fighting for a dream that felt impossible. But every setback made me believe even more that our industry needs real connection.</p>
                
                <h3 className="text-lg font-bold">2024</h3>
                <p>With everything I'd learned, I rebuilt EmviApp from zero. This time, the goal was simple: bring everyone onto the same map, and help every artist, every salon, and every customer find their perfect match.</p>
                
                <h3 className="text-lg font-bold">Today</h3>
                <p>EmviApp is more than an app. It's the bridge for every beauty dream. For the first time, our community has a home—a place where artists shine, salons grow, and customers always find their people.</p>
                
                <p>The future? It belongs to all of us, together.</p>
              </>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Inspired by Sunshine Section */}
      <motion.div 
        className="mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <Card className="p-6 md:p-8 backdrop-blur-sm bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 rounded-xl shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 flex items-center justify-center text-white flex-shrink-0">
              <SunIcon className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold font-playfair">
              {t({
                english: "Inspired by Sunshine ☀️",
                vietnamese: "Cảm hứng từ Sunshine ☀️"
              })}
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
            {isVietnamese ? (
              <>
                <p>Mỗi hành trình lớn đều cần một ánh sáng nhỏ.</p>
                <p>Với tôi, ánh sáng đó chính là Sunshine—nguồn hy vọng, sự rõ ràng và cảm hứng, đã đến với tôi đúng lúc tôi cần nhất.</p>
                <p>EmviApp ra đời sau nhiều năm kinh nghiệm, vấp ngã và nỗ lực không ngừng, nhưng chính Sunshine đã cho tôi dũng khí và tầm nhìn để bắt đầu lại, biến ước mơ này thành hiện thực.</p>
                <p>Cảm ơn Sunshine đã xuất hiện trong cuộc đời tôi. Dự án này—và mọi kết nối nó tạo ra—sẽ không thể tồn tại nếu thiếu Sunshine.</p>
              </>
            ) : (
              <>
                <p>Every great journey needs a little light.</p>
                <p>For me, that light is Sunshine—a source of hope, clarity, and inspiration that appeared just when I needed it most.</p>
                <p>EmviApp was born from years of experience, struggle, and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and finally bring this dream to life.</p>
                <p>Thank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you.</p>
              </>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Dedication to Em Vi Section */}
      <motion.div 
        className="mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <Card className="p-6 md:p-8 backdrop-blur-sm bg-gradient-to-br from-pink-50 to-red-50 border border-pink-100 rounded-xl shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-pink-500 to-red-400 flex items-center justify-center text-white flex-shrink-0">
              <Heart className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold font-playfair">
              {t({
                english: "For Em Vi ❤️",
                vietnamese: "Gửi Em Vi ❤️"
              })}
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
            {isVietnamese ? (
              <p>Cảm ơn Em Vi—người đã âm thầm hy sinh, luôn bên cạnh động viên, nâng đỡ anh, ngay cả khi anh không còn tin vào bản thân mình nữa. Em không bao giờ bỏ cuộc với giấc mơ này, dù chính anh đã từng muốn dừng lại. Đó là lý do vì sao ứng dụng này mang tên Em Vi. Nếu không có em, mọi thứ hôm nay sẽ không thể thành hiện thực.</p>
            ) : (
              <p>Thank you, Em Vi, for silently supporting and sacrificing for me—especially when I stopped believing in myself. You never gave up on my dream, even when I almost did. That's why this app bears your name. Without you, none of this would exist.</p>
            )}
          </div>
        </Card>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-2xl font-bold mb-6 font-playfair">
          {t({
            english: "Join Our Journey",
            vietnamese: "Hãy Đồng Hành Cùng Chúng Tôi"
          })}
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          {t({
            english: "Whether you're an artist, salon owner, or beauty enthusiast—there's a place for you in our community.",
            vietnamese: "Dù bạn là thợ, chủ tiệm, hay khách hàng—đều có một vị trí cho bạn trong cộng đồng của chúng tôi."
          })}
        </p>
        <MobileButton
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 text-lg shadow-lg"
        >
          {t({
            english: "Get Started",
            vietnamese: "Bắt Đầu Ngay"
          })}
        </MobileButton>
      </motion.div>
    </div>
  );
};

export default AboutUs;
