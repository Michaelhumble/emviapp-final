
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Logo from '@/components/ui/Logo';
import EmviLogo from '@/components/branding/EmviLogo';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import Layout from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';

const AboutPage = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState<'en' | 'vi'>('en');

  // Animation variants for sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'vi' : 'en');
  };

  // Timeline data
  const timelineData = [
    {
      year: '2014',
      title: {
        en: 'The Spark',
        vi: 'Tia Lửa Đầu Tiên'
      },
      content: {
        en: "It started as a whisper—a late-night thought scribbled on a notepad after another long day in the salon. What if everyone in the beauty world could find each other? No more wasted time. No more searching for lost artists or perfect clients. Just true, lasting connections.",
        vi: "Mọi thứ bắt đầu như một lời thì thầm—một suy nghĩ nửa đêm được ghi nguệch ngoạc trên tập giấy sau một ngày dài tại salon. Điều gì sẽ xảy ra nếu tất cả mọi người trong ngành làm đẹp có thể tìm thấy nhau? Không còn lãng phí thời gian. Không còn phải tìm kiếm Người làm đẹp đã mất liên lạc hoặc khách hàng hoàn hảo. Chỉ những kết nối thực sự và bền vững."
      }
    },
    {
      year: '2015',
      title: {
        en: 'The First Build, The Hardest Lessons',
        vi: 'Xây Dựng Đầu Tiên, Những Bài Học Khó Khăn Nhất'
      },
      content: {
        en: "We dove in. We built the first app. It broke, it crashed, it failed. I lost money, time, hope. I worked when everyone slept, believed when nobody else did. I watched others give up, but I refused to quit.",
        vi: "Chúng tôi lao vào. Chúng tôi xây dựng ứng dụng đầu tiên. Nó hỏng, nó sập, nó thất bại. Tôi mất tiền, mất thời gian, mất hy vọng. Tôi làm việc khi mọi người ngủ, tin tưởng khi không ai khác tin. Tôi chứng kiến người khác bỏ cuộc, nhưng tôi từ chối bỏ cuộc."
      }
    },
    {
      year: '2016-2023',
      title: {
        en: 'The Lost Years, The Real Lessons',
        vi: 'Những Năm Tháng Lạc Lối, Những Bài Học Thực Sự'
      },
      content: {
        en: "Eight years.\nThat's how long it took to understand what everyone else missed.\nEvery failure, every heartbreak, every lonely moment built something deeper:\nThere is no "best artist," no "best salon," only the best connection for each person.\nAnd that map didn't exist—until now.",
        vi: "Tám năm. Đó là thời gian cần thiết để hiểu điều mà mọi người khác bỏ lỡ. Mỗi thất bại, mỗi đau lòng, mỗi giây phút cô đơn đã xây dựng nên điều sâu sắc hơn: Không có "Người làm đẹp giỏi nhất," không có "salon tốt nhất," chỉ có kết nối phù hợp nhất cho mỗi người. Và tấm bản đồ đó chưa từng tồn tại—cho đến bây giờ."
      }
    },
    {
      year: '2024',
      title: {
        en: 'Rebirth, Thanks to Love',
        vi: 'Tái Sinh, Nhờ Tình Yêu Thương'
      },
      content: {
        en: "I was ready to walk away.\nBut Em Vi—my silent angel—stood by me when I couldn't stand by myself.\nSunshine—my secret light—reminded me why I started.\nWith their faith, I built EmviApp again. This time, I listened. I learned from every client who lost their favorite artist, every owner struggling to find talent, every artist waiting for a real opportunity.",
        vi: "Tôi đã sẵn sàng bỏ cuộc. Nhưng Em Vi—một người thầm lặng của tôi—đã đứng bên tôi khi tôi không thể tự đứng vững, không còn tin vào chính mình, Em-Vi đã nhắc nhở tôi lý do tại sao tôi bắt đầu. Với niềm tin tôi tuyệt đối, tôi xây dựng lại EmviApp. Lần này, tôi lắng nghe. Tôi học hỏi từ mỗi khách hàng đã mất liên lạc với Người làm đẹp yêu thích, từ mỗi chủ salon đang vật lộn để tìm kiếm tài năng, từ mỗi Người làm đẹp đang chờ đợi một cơ hội thực sự."
      }
    },
    {
      year: '2025',
      title: {
        en: 'The Dream Becomes Real',
        vi: 'Giấc Mơ Trở Thành Hiện Thực'
      },
      content: {
        en: "Today, EmviApp is live—a living, breathing map of the beauty world. Artists, salons, and clients find each other, for real. No more wasted years. No more lost connections.\nWe're finally all on the map. That's how we win, together.",
        vi: "Hôm nay, EmviApp đã được xây dưng lại,—một thở mới của ngành làm đẹp. Emvi.App này dành cho người làm đẹp, beauty salon và khách hàng tìm thấy nhau, thực sự. Không còn những năm tháng lãng phí. Không còn những kết nối bị mất. Cuối cùng chúng ta đều có mặt trên EmviApp Đó là cách chúng ta chiến thắng, cùng nhau."
      }
    }
  ];

  // Values data
  const valuesData = [
    {
      title: {
        en: 'Community First',
        vi: 'Cộng Đồng Là Trên Hết'
      },
      content: {
        en: "Technology is just a tool. It's people who matter. We build to bring you together.",
        vi: "Công nghệ chỉ là công cụ. Con người mới là điều quan trọng. Chúng tôi xây dựng để đưa mọi người lại gần nhau."
      }
    },
    {
      title: {
        en: 'Quality Over Hype',
        vi: 'Chất Lượng Hơn Hình Thức'
      },
      content: {
        en: "No more empty promises—only real stories, real talent, and real results.",
        vi: "Không còn những lời hứa suông—chỉ có những câu chuyện thật, tài năng thật, và kết quả thật."
      }
    },
    {
      title: {
        en: 'Inclusivity & Kindness',
        vi: 'Sự Hòa Nhập & Lòng Tốt'
      },
      content: {
        en: "Every skill level, every background, every dream is welcome here.",
        vi: "Mọi trình độ kỹ năng, mọi nền tảng, mọi ước mơ đều được chào đón tại đây."
      }
    },
    {
      title: {
        en: 'Innovation for the Heart',
        vi: 'Đổi Mới Cho Trái Tim'
      },
      content: {
        en: "Every update is made with you in mind—never just for the sake of change.",
        vi: "Mỗi cập nhật được tạo ra với bạn trong tâm trí—không bao giờ chỉ vì lợi ích của thay đổi."
      }
    }
  ];

  return (
    <Layout>
      <div className="bg-emvi-offwhite min-h-screen">
        {/* Hero Section with Logo and Premium Background */}
        <div className="relative overflow-hidden bg-gradient-to-r from-white to-[#F6F6F7] py-24">
          <div className="absolute inset-0 bg-[url('https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/emvilogo//emvi-logo-transparent.png')] opacity-5 bg-center"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center justify-center mb-8">
              <EmviLogo size="large" showText={true} className="mb-8" />
              
              <motion.h1 
                className="text-4xl md:text-6xl font-playfair font-bold mb-6 text-center about-hero-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {language === 'en' ? 'Beautiful Connections, Beautiful Business' : 'Kết Nối Đẹp, Doanh Nghiệp Đẹp'}
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl font-serif text-emvi-dark max-w-3xl text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {language === 'en' 
                  ? "We're not just building an app. We're rewriting the story of the beauty industry—one real connection at a time."
                  : "Chúng tôi không chỉ xây dựng một ứng dụng. Chúng tôi đang viết lại câu chuyện của ngành làm đẹp—từng kết nối thực sự."}
              </motion.p>
            </div>

            <div className="flex justify-center mb-12">
              <Button 
                onClick={toggleLanguage}
                variant="outline"
                className="px-6 py-2 rounded-full border-emvi-accent text-emvi-accent hover:bg-emvi-accent/10"
              >
                {language === 'en' ? 'Đọc bằng tiếng Việt' : 'Read in English'}
              </Button>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <section className="py-16 bg-gradient-to-b from-white to-[#F8F8FA]">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-playfair font-bold mb-6 about-subheading">
                {language === 'en' ? 'Mission Statement' : 'Tuyên Ngôn Sứ Mệnh'}
              </h2>
              <p className="text-xl font-serif leading-relaxed text-gray-800">
                {language === 'en' 
                  ? "For over 20 years, I lived and breathed the beauty business. I saw everything—joy, happiness, and most of all, the invisible wall keeping artists, salons, and clients apart. EmviApp is my promise: to break that wall, and help everyone find their people."
                  : "Trên 20 năm, tôi đã sống và hòa mình vào ngành làm đẹp. Tôi đã chứng kiến mọi thứ—vui vẻ, hạnh phúc, và đặc biệt là bức tường vô hình ngăn cách Người làm đẹp, salon, và khách hàng. EmviApp là lời hứa của tôi: phá vỡ bức tường đó và giúp mọi người tìm thấy nhau."}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="py-16 bg-[#F6F6F7]">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-4xl md:text-5xl font-playfair font-bold text-center mb-16 about-heading"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              Our Journey — Cuộc Hành Trình
            </motion.h2>

            <div className="max-w-4xl mx-auto space-y-16">
              {timelineData.map((item, index) => {
                const [ref, inView] = useInView({
                  threshold: 0.2,
                  triggerOnce: true
                });

                return (
                  <motion.div
                    key={index}
                    ref={ref}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/4 bg-gradient-to-br from-purple-100 to-pink-50 p-6 flex items-center justify-center">
                        <h3 className="text-2xl md:text-3xl font-playfair font-bold text-emvi-accent">{item.year}</h3>
                      </div>
                      <div className="w-full md:w-3/4 p-6">
                        <h4 className="text-xl md:text-2xl font-playfair font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-500">
                          {language === 'en' ? item.title.en : item.title.vi}
                        </h4>
                        <div className="font-serif text-gray-800 leading-relaxed whitespace-pre-line">
                          {language === 'en' ? item.content.en : item.content.vi}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why We Exist */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-4xl md:text-5xl font-playfair font-bold text-center mb-12 about-heading"
                variants={itemVariants}
              >
                {language === 'en' ? 'Why We Exist' : 'Lý Do Chúng Tôi Tồn Tại'}
              </motion.h2>
              
              <motion.div 
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12 shadow-lg"
                variants={itemVariants}
              >
                <div className="font-serif text-lg md:text-xl text-gray-800 space-y-4 whitespace-pre-line">
                  {language === 'en' ? (
                    <>
                      <p>Everyone talks about technology.</p>
                      <p>But we talk about people.</p>
                      <p>EmviApp isn't just for finding a job or posting a chair for rent.</p>
                      <p>It's for the woman searching for her favorite nail artist who moved across town.</p>
                      <p>It's for the artist who deserves clients who love their work.</p>
                      <p>It's for the owner who wants a real team, not just names on a schedule.</p>
                      <p>It's for you.</p>
                      <p>We focus on customers first. Because when you help someone find their person, you help everyone.</p>
                    </>
                  ) : (
                    <>
                      <p>Mọi người nói về công nghệ.</p>
                      <p>Nhưng chúng tôi nói về con người.</p>
                      <p>EmviApp không chỉ để tìm việc hoặc đăng ghế cho thuê.</p>
                      <p>Đó là dành cho người phụ nữ đang tìm kiếm Người làm đẹp yêu thích đã chuyển đến khu vực khác của thành phố.</p>
                      <p>Đó là dành cho Người làm đẹp xứng đáng với những khách hàng yêu thích công việc của họ.</p>
                      <p>Đó là dành cho chủ salon muốn có một đội ngũ thực sự, không chỉ là những cái tên trên lịch trình.</p>
                      <p>Đó là dành cho bạn.</p>
                      <p>Chúng tôi tập trung vào khách hàng trước tiên. Bởi vì khi bạn giúp ai đó tìm thấy đúng người của họ, bạn giúp tất cả mọi người.</p>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-gradient-to-b from-[#F6F6F7] to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-12 about-heading">
                {language === 'en' ? 'Our Values' : 'Giá Trị Của Chúng Tôi'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {valuesData.map((value, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-playfair font-semibold mb-3 about-subheading">
                      {language === 'en' ? value.title.en : value.title.vi}
                    </h3>
                    <p className="font-serif text-gray-800">
                      {language === 'en' ? value.content.en : value.content.vi}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Inspired by Sunshine */}
        <section className="py-16 bg-gradient-to-r from-amber-50 to-pink-50">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-amber-100 glow-effect"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 text-amber-700 flex items-center">
                {language === 'en' ? 'Inspired by Sunshine ☀️' : 'Lấy Cảm Hứng Từ Sunshine ☀️'}
              </h2>
              
              <div className="font-serif text-gray-800 space-y-4">
                {language === 'en' ? (
                  <>
                    <p>Every great journey needs a little light.</p>
                    <p>For me, that light is Sunshine—a source of hope, clarity, and inspiration that appeared just when I needed it most.</p>
                    <p>EmviApp was born from years of struggle and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and finally bring this dream to life.</p>
                    <p>Thank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you.</p>
                  </>
                ) : (
                  <>
                    <p>Mỗi hành trình vĩ đại cần một chút ánh sáng.</p>
                    <p>Đối với tôi, ánh sáng đó là Sunshine—một nguồn hy vọng, sự rõ ràng và cảm hứng xuất hiện đúng lúc tôi cần nhất.</p>
                    <p>EmviApp được sinh ra từ những năm tháng đấu tranh và theo đuổi không ngừng nghỉ, nhưng chính Sunshine đã cho tôi can đảm và tầm nhìn để bắt đầu lại và cuối cùng biến giấc mơ này thành hiện thực.</p>
                    <p>Cảm ơn, Sunshine, vì đã xuất hiện trong cuộc đời tôi. Dự án này—và mọi kết nối mà nó tạo ra—sẽ không tồn tại nếu không có bạn.</p>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Thank You, Em Vi */}
        <section className="py-16 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-purple-100"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 text-purple-700">
                {language === 'en' ? 'Thank You, Em Vi' : 'Cảm Ơn, Em Vi'}
              </h2>
              
              <div className="font-serif text-gray-800 space-y-4">
                {language === 'en' ? (
                  <>
                    <p>This app is named after Em Vi—the person who supported and sacrificed for me, even when I doubted myself.</p>
                    <p>You stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you.</p>
                  </>
                ) : (
                  <>
                    <p>Ứng dụng này được đặt tên theo Em Vi—người đã hỗ trợ và hy sinh cho tôi, ngay cả khi tôi nghi ngờ bản thân.</p>
                    <p>Bạn đã đứng bên tôi, bất kể điều gì. Vì tất cả tình yêu thầm lặng, sự khích lệ và sức mạnh bạn đã cho, điều này là dành cho bạn.</p>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final Call to Action */}
        <section className="py-16 bg-gradient-to-b from-white to-[#F6F6F7]">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 about-heading">
                {language === 'en' ? 'Join Our Journey' : 'Tham Gia Hành Trình Của Chúng Tôi'}
              </h2>
              
              <p className="text-xl font-serif text-gray-800 mb-8">
                {language === 'en' 
                  ? "Whether you're an artist, a salon owner, or a client searching for your \"person,\" you belong here. Let's build the most beautiful connections the world has ever seen—together."
                  : "Cho dù bạn là Người làm đẹp, chủ salon, hay khách hàng đang tìm kiếm \"người của mình,\" bạn đều thuộc về nơi đây. Hãy cùng nhau xây dựng những kết nối đẹp nhất mà thế giới từng thấy."}
              </p>
              
              <Link to="/auth/signup">
                <Button className="px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all">
                  {language === 'en' ? 'Sign Up Now' : 'Đăng Ký Ngay'}
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
