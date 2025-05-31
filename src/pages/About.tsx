
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Lightbulb, Star, Users, Gem, Shield, Globe, Heart, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

const About = () => {
  const { t, isVietnamese, toggleLanguage } = useTranslation();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const values = [
    {
      icon: <Lightbulb className="h-8 w-8 text-blue-600" />,
      title: t({ english: "Innovation", vietnamese: "Đổi Mới" }),
      description: t({
        english: "We embrace progress and continuously seek new ways to solve problems and enhance experiences for our community.",
        vietnamese: "Chúng tôi đón nhận sự tiến bộ và liên tục tìm kiếm những cách thức mới để giải quyết vấn đề và nâng cao trải nghiệm cho cộng đồng của chúng tôi."
      }),
      bgColor: "bg-blue-50"
    },
    {
      icon: <Star className="h-8 w-8 text-pink-600" />,
      title: t({ english: "Celebration", vietnamese: "Tôn Vinh" }),
      description: t({
        english: "We celebrate beauty in all its forms, the artistry behind it, and the confidence it inspires in everyone it touches.",
        vietnamese: "Chúng tôi tôn vinh vẻ đẹp dưới mọi hình thức, nghệ thuật đằng sau nó, và sự tự tin mà nó truyền cảm hứng cho mọi người mà nó chạm đến."
      }),
      bgColor: "bg-pink-50"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: t({ english: "Community", vietnamese: "Cộng Đồng" }),
      description: t({
        english: "We believe in the power of coming together. Success is sweeter when shared, and challenges are lighter when faced together.",
        vietnamese: "Chúng tôi tin vào sức mạnh của việc đến với nhau. Thành công trở nên ngọt ngào hơn khi được chia sẻ, và thử thách trở nên nhẹ nhàng hơn khi cùng nhau đối mặt."
      }),
      bgColor: "bg-blue-50"
    },
    {
      icon: <Gem className="h-8 w-8 text-yellow-600" />,
      title: t({ english: "Excellence", vietnamese: "Xuất Sắc" }),
      description: t({
        english: "We strive for excellence in everything we do, honoring the dedication our beauty professionals bring to their craft.",
        vietnamese: "Chúng tôi phấn đấu vì sự xuất sắc trong mọi việc chúng tôi làm, tôn vinh sự cống hiến mà các chuyên gia làm đẹp của chúng tôi mang đến nghề của họ."
      }),
      bgColor: "bg-yellow-50"
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: t({ english: "Trust", vietnamese: "Tin Tưởng" }),
      description: t({
        english: "We build relationships based on trust, transparency, and reliability, creating a platform everyone can depend on.",
        vietnamese: "Chúng tôi xây dựng các mối quan hệ dựa trên sự tin tưởng, minh bạch và đáng tin cậy, tạo ra một nền tảng mà mọi người có thể dựa vào."
      }),
      bgColor: "bg-green-50"
    }
  ];

  const differenceCards = [
    {
      title: t({ english: "Cultural Understanding", vietnamese: "Hiểu Biết Văn Hóa" }),
      description: t({
        english: "We embrace both English and Vietnamese, recognizing the power of communicating in one's native language.",
        vietnamese: "Chúng tôi đón nhận cả tiếng Anh và tiếng Việt, thừa nhận sức mạnh của việc giao tiếp bằng ngôn ngữ mẹ đẻ của mình."
      }),
      bgColor: "bg-purple-50"
    },
    {
      title: t({ english: "Community First", vietnamese: "Cộng Đồng Đầu Tiên" }),
      description: t({
        english: "Every feature is built to strengthen connections between artists, salon owners, and clients.",
        vietnamese: "Mọi tính năng đều được xây dựng để tăng cường kết nối giữa các nghệ sĩ, chủ salon và khách hàng."
      }),
      bgColor: "bg-blue-50"
    },
    {
      title: t({ english: "Authentic Representation", vietnamese: "Đại Diện Chân Thực" }),
      description: t({
        english: "We showcase real talent and real stories, highlighting the artistry behind every service.",
        vietnamese: "Chúng tôi trưng bày tài năng thực và câu chuyện thực, làm nổi bật nghệ thuật đằng sau mỗi dịch vụ."
      }),
      bgColor: "bg-pink-50"
    },
    {
      title: t({ english: "Fair and Transparent", vietnamese: "Công Bằng và Minh Bạch" }),
      description: t({
        english: "We've built a platform where both businesses and customers can thrive with clarity and trust.",
        vietnamese: "Chúng tôi đã xây dựng một nền tảng nơi cả doanh nghiệp và khách hàng có thể phát triển với sự rõ ràng và tin tưởng."
      }),
      bgColor: "bg-green-50"
    }
  ];

  const timeline = [
    {
      year: "2014",
      title: t({ english: "The Idea is Born", vietnamese: "Ý Tưởng Ra Đời" }),
      description: t({
        english: "A vision to create meaningful connections within the beauty community begins to take shape.",
        vietnamese: "Một tầm nhìn để tạo ra những kết nối ý nghĩa trong cộng đồng làm đẹp bắt đầu hình thành."
      }),
      color: "text-pink-600"
    },
    {
      year: "2015",
      title: t({ english: "First Build", vietnamese: "Xây Dựng Đầu Tiên" }),
      description: t({
        english: "Initial platform development focusing on understanding the unique needs of artists and salon owners.",
        vietnamese: "Phát triển nền tảng ban đầu tập trung vào việc hiểu những nhu cầu độc đáo của các nghệ sĩ và chủ salon."
      }),
      color: "text-blue-600"
    },
    {
      year: "2016-2023",
      title: t({ english: "Iteration and Growth", vietnamese: "Lặp Lại và Phát Triển" }),
      description: t({
        english: "Years of learning, adjusting, and evolving to better serve our community through continuous improvement.",
        vietnamese: "Những năm học hỏi, điều chỉnh và phát triển để phục vụ cộng đồng của chúng tôi tốt hơn thông qua cải tiến liên tục."
      }),
      color: "text-purple-600"
    },
    {
      year: "2025",
      title: t({ english: "A New Chapter", vietnamese: "Một Chương Mới" }),
      description: t({
        english: "Expanding our vision with enhanced features, deeper connections, and a renewed commitment to our community.",
        vietnamese: "Mở rộng tầm nhìn của chúng tôi với các tính năng cải tiến, kết nối sâu sắc hơn và cam kết mới đối với cộng đồng của chúng tôi."
      }),
      color: "text-green-600"
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t({ english: "About EmviApp", vietnamese: "Về EmviApp" })}</title>
        <meta name="description" content={t({ 
          english: "Learn about EmviApp - Building bridges between talented beauty professionals and the clients who value them.",
          vietnamese: "Tìm hiểu về EmviApp - Xây dựng cầu nối giữa các chuyên gia làm đẹp tài năng và những khách hàng đánh giá cao họ."
        })} />
      </Helmet>
      <Layout>
        <div className="container mx-auto py-8 px-4">
          {/* Header with Language Toggle */}
          <motion.div 
            {...fadeInUp}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold font-playfair">
                {t({ english: "About Us", vietnamese: "Về Chúng Tôi" })}
              </h1>
              <div className="flex gap-2">
                <Button
                  onClick={toggleLanguage}
                  variant={!isVietnamese ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                >
                  English
                </Button>
                <Button
                  onClick={toggleLanguage}
                  variant={isVietnamese ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                >
                  Tiếng Việt
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Our Story */}
          <motion.section {...fadeInUp} className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-6">
              {t({ english: "Our Story", vietnamese: "Câu Chuyện Của Chúng Tôi" })}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t({
                english: "Building bridges between talented beauty professionals and the clients who value them.",
                vietnamese: "Xây dựng cầu nối giữa các chuyên gia làm đẹp tài năng và những khách hàng đánh giá cao họ."
              })}
            </p>
          </motion.section>

          {/* Why We Started EmviApp */}
          <motion.section {...fadeInUp} className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-6">
              {t({ english: "Why We Started EmviApp", vietnamese: "Tại Sao Chúng Tôi Bắt Đầu EmviApp" })}
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                {t({
                  english: "EmviApp was born from a simple observation: the beauty industry needed a platform that truly understood its heart and soul. In salons across America, we saw incredible talent flourishing alongside real challenges—language barriers, cultural misunderstandings, and digital gaps that traditional platforms weren't addressing.",
                  vietnamese: "EmviApp ra đời từ một quan sát đơn giản: ngành công nghiệp làm đẹp cần một nền tảng thực sự hiểu được trái tim và tâm hồn của nó. Trong các salon trên khắp nước Mỹ, chúng tôi thấy tài năng đáng kinh ngạc phát triển mạnh cùng với những thách thức thực sự—rào cản ngôn ngữ, hiểu lầm văn hóa và những khoảng cách kỹ thuật số mà các nền tảng truyền thống không giải quyết được."
                })}
              </p>
              <p>
                {t({
                  english: "What started as a vision to connect communities has grown into something more: a home where artists are celebrated, where salons can thrive, and where clients can discover exceptional talent with confidence and ease.",
                  vietnamese: "Những gì bắt đầu như một tầm nhìn để kết nối các cộng đồng đã phát triển thành điều gì đó hơn thế: một ngôi nhà nơi các nghệ sĩ được tôn vinh, nơi các salon có thể phát triển, và nơi khách hàng có thể khám phá tài năng đặc biệt với sự tự tin và dễ dàng."
                })}
              </p>
            </div>
          </motion.section>

          {/* Our Values */}
          <motion.section {...fadeInUp} className="max-w-6xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-12 text-center">
              {t({ english: "Our Values", vietnamese: "Giá Trị Của Chúng Tôi" })}
            </h2>
            <motion.div 
              variants={staggerContainer}
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`${value.bgColor} p-6 rounded-lg border border-gray-100`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Inspired by Sunshine */}
          <motion.section {...fadeInUp} className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-8">
              <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-4 flex items-center gap-2">
                {t({ english: "Inspired by Sunshine", vietnamese: "Nguồn Cảm Hứng Sunshine" })} ☀️
              </h2>
              <div className="space-y-4 text-gray-800">
                <p>
                  {t({
                    english: "Every great journey needs a little light.",
                    vietnamese: "Mọi hành trình tuyệt vời đều cần một chút ánh sáng."
                  })}
                </p>
                <p>
                  {t({
                    english: "For me, that light is Sunshine—a source of hope, clarity, and inspiration that appeared just when I needed it most.",
                    vietnamese: "Đối với tôi, ánh sáng đó là Sunshine—một nguồn hy vọng, sự rõ ràng và cảm hứng xuất hiện đúng khi tôi cần nhất."
                  })}
                </p>
                <p>
                  {t({
                    english: "EmviApp was born from years of experience, struggle, and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and finally bring this dream to life.",
                    vietnamese: "EmviApp ra đời từ nhiều năm kinh nghiệm, đấu tranh và theo đuổi không ngừng, nhưng chính Sunshine đã cho tôi can đảm và tầm nhìn để bắt đầu lại và cuối cùng biến giấc mơ này thành hiện thực."
                  })}
                </p>
                <p>
                  {t({
                    english: "Thank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you.",
                    vietnamese: "Cảm ơn Sunshine, vì đã xuất hiện trong cuộc đời tôi. Dự án này—và mọi kết nối mà nó tạo ra—sẽ không tồn tại nếu không có bạn."
                  })}
                </p>
              </div>
            </div>
          </motion.section>

          {/* Thank You, EmVi */}
          <motion.section {...fadeInUp} className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-8">
              <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-4">
                {t({ english: "Thank You, EmVi", vietnamese: "Cảm Ơn, EmVi" })}
              </h2>
              <p className="text-gray-800 leading-relaxed">
                {t({
                  english: "This app is named after EmVi—the person who supported and sacrificed for me, even when I doubted myself. You stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you.",
                  vietnamese: "Ứng dụng này được đặt tên theo EmVi—người đã ủng hộ và hy sinh cho tôi, ngay cả khi tôi nghi ngờ bản thân. Bạn đã đứng bên tôi, bất kể điều gì. Vì tất cả tình yêu thầm lặng, sự khuyến khích và sức mạnh mà bạn đã cho, điều này dành cho bạn."
                })}
              </p>
            </div>
          </motion.section>

          {/* What Makes Us Different */}
          <motion.section {...fadeInUp} className="max-w-6xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-6">
              {t({ english: "What Makes Us Different", vietnamese: "Điều Làm Chúng Tôi Khác Biệt" })}
            </h2>
            <p className="text-lg text-gray-700 mb-12 max-w-4xl">
              {t({
                english: "Every decision we make, from design to development, starts with a simple question: \"How will this help our community?\" Our platform is crafted by people who understand the beauty industry from lived experience—not just market research.",
                vietnamese: "Mọi quyết định chúng tôi đưa ra, từ thiết kế đến phát triển, đều bắt đầu với một câu hỏi đơn giản: \"Điều này sẽ giúp ích như thế nào cho cộng đồng của chúng tôi?\" Nền tảng của chúng tôi được tạo ra bởi những người hiểu ngành công nghiệp làm đẹp từ kinh nghiệm sống—không chỉ từ nghiên cứu thị trường."
              })}
            </p>
            <motion.div 
              variants={staggerContainer}
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {differenceCards.map((card, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`${card.bgColor} p-6 rounded-lg border border-gray-100`}
                >
                  <h3 className="text-xl font-semibold mb-3">
                    {card.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Our Journey Timeline */}
          <motion.section {...fadeInUp} className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-12 text-center">
              {t({ english: "Our Journey", vietnamese: "Hành Trình Của Chúng Tôi" })}
            </h2>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center border-2 border-white shadow-sm`}>
                      <span className={`text-sm font-bold ${item.color}`}>
                        {item.year.slice(-2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2">
                      <span className={item.color}>{item.year}</span>
                    </h3>
                    <h4 className="text-lg font-semibold mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* A Personal Connection */}
          <motion.section {...fadeInUp} className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-6">
              {t({ english: "A Personal Connection", vietnamese: "Sự Gắn Bó Cá Nhân" })}
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                {t({
                  english: "Growing up in a family deeply connected to the beauty industry, I witnessed firsthand both the immense talent and the unique challenges faced by Vietnamese beauty professionals in America. I saw my family members and their colleagues struggle to have their skills recognized despite their exceptional artistry.",
                  vietnamese: "Lớn lên trong một gia đình có mối liên hệ sâu sắc với ngành công nghiệp làm đẹp, tôi đã chứng kiến trực tiếp cả tài năng to lớn và những thách thức độc đáo mà các chuyên gia làm đẹp Việt Nam phải đối mặt ở Mỹ. Tôi thấy các thành viên trong gia đình và đồng nghiệp của họ phải đấu tranh để có được sự công nhận về kỹ năng của họ mặc dù có nghệ thuật đặc biệt."
                })}
              </p>
              <p>
                {t({
                  english: "EmviApp is more than just technology—it's a bridge between cultures, a celebration of craft, and a promise that talent will always find its rightful recognition. We've built this platform with love and understanding that can only come from lived experience.",
                  vietnamese: "EmviApp không chỉ là công nghệ—nó là cầu nối giữa các nền văn hóa, là sự tôn vinh nghề thủ công, và là lời hứa rằng tài năng sẽ luôn tìm được sự công nhận xứng đáng. Chúng tôi đã xây dựng nền tảng này với tình yêu và sự hiểu biết chỉ có thể đến từ kinh nghiệm sống."
                })}
              </p>
            </div>
          </motion.section>

          {/* Final CTA */}
          <motion.section {...fadeInUp} className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-8">
              <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-4">
                {t({ 
                  english: "Ready to be part of something beautiful? Join our community today.",
                  vietnamese: "Sẵn sàng trở thành một phần của điều gì đó tuyệt đẹp? Tham gia cộng đồng của chúng tôi ngày hôm nay."
                })}
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                {t({ 
                  english: "Start Your Journey with EmviApp.",
                  vietnamese: "Bắt Đầu Hành Trình Của Bạn Với EmviApp."
                })}
              </p>
              <Button 
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-3"
              >
                {t({ english: "Join Now", vietnamese: "Tham Gia Ngay" })} →
              </Button>
            </div>
          </motion.section>
        </div>
      </Layout>
    </>
  );
};

export default About;
