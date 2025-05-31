
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Star, Users, Lightbulb, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const About = () => {
  const [language, setLanguage] = useState<'en' | 'vi'>('en');

  const content = {
    en: {
      title: "Our Story",
      subtitle: "Building bridges between talented beauty professionals and the clients who value them.",
      whyStarted: {
        title: "Why We Started EmviApp",
        content: "EmviApp was born from a simple observation: the beauty industry needed a platform that truly understood its heart and soul. In salons across America, we saw incredible talent flourishing alongside real challenges—language barriers, cultural misunderstandings, and digital gaps that traditional platforms weren't addressing.\n\nWhat started as a vision to connect communities has grown into something more: a home where artists are celebrated, where salons can thrive, and where clients can discover exceptional talent with confidence and ease."
      },
      personalConnection: {
        title: "A Personal Connection",
        content: "Growing up in a family deeply connected to the beauty industry, I witnessed firsthand both the immense talent and the unique challenges faced by Vietnamese beauty professionals in America. I saw my family members and their colleagues struggle to have their skills recognized despite their exceptional artistry.\n\nEmviApp is more than just technology—it's a bridge between cultures, a celebration of craft, and a promise that talent will always find its rightful recognition. We've built this platform with love and understanding that can only come from lived experience."
      },
      whatMakesUsDifferent: {
        title: "What Makes Us Different",
        subtitle: "Every decision we make, from design to development, starts with a simple question: \"How will this help our community?\" Our platform is crafted by people who understand the beauty industry from lived experience—not just market research.",
        points: [
          {
            title: "Cultural Understanding",
            description: "We embrace both English and Vietnamese, recognizing the power of communicating in one's native language."
          },
          {
            title: "Community First",
            description: "Every feature is built to strengthen connections between artists, salon owners, and clients."
          },
          {
            title: "Authentic Representation",
            description: "We showcase real talent and real stories, highlighting the artistry behind every service."
          },
          {
            title: "Fair and Transparent",
            description: "We've built a platform where both businesses and customers can thrive with clarity and trust."
          }
        ]
      },
      journey: {
        title: "Our Journey",
        milestones: [
          {
            year: "2014",
            title: "The Idea is Born",
            description: "A vision to create meaningful connections within the beauty community begins to take shape."
          },
          {
            year: "2015",
            title: "First Build",
            description: "Initial platform development focusing on understanding the unique needs of artists and salon owners."
          },
          {
            year: "2016-2023",
            title: "Iteration and Growth",
            description: "Years of learning, adjusting, and evolving to better serve our community through continuous improvement."
          },
          {
            year: "2025",
            title: "A New Chapter",
            description: "Expanding our vision with enhanced features, deeper connections, and a renewed commitment to our community."
          }
        ]
      },
      sunshine: {
        title: "Inspired by Sunshine ☀️",
        subtitle: "Every great journey needs a little light.",
        content: "For me, that light is Sunshine—a source of hope, clarity, and inspiration that appeared just when I needed it most.\n\nEmviApp was born from years of experience, struggle, and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and finally bring this dream to life.\n\nThank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you."
      },
      thankYou: {
        title: "Thank You, EmVi",
        content: "This app is named after EmVi—the person who supported and sacrificed for me, even when I doubted myself. You stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you."
      },
      values: {
        title: "Our Values",
        items: [
          {
            title: "Community",
            description: "We believe in the power of coming together. Success is sweeter when shared, and challenges are lighter when faced together.",
            icon: Users
          },
          {
            title: "Excellence",
            description: "We strive for excellence in everything we do, honoring the dedication our beauty professionals bring to their craft.",
            icon: Award
          },
          {
            title: "Trust",
            description: "We build relationships based on trust, transparency, and reliability, creating a platform everyone can depend on.",
            icon: Heart
          },
          {
            title: "Innovation",
            description: "We embrace progress and continuously seek new ways to solve problems and enhance experiences for our community.",
            icon: Lightbulb
          },
          {
            title: "Celebration",
            description: "We celebrate beauty in all its forms, the artistry behind it, and the confidence it inspires in everyone it touches.",
            icon: Star
          }
        ]
      },
      cta: {
        title: "Ready to be part of something beautiful? Join our community today.",
        subtitle: "Start Your Journey with EmviApp.",
        button: "Join Now"
      }
    },
    vi: {
      title: "Câu Chuyện Của Chúng Tôi",
      subtitle: "Xây dựng cầu nối giữa các chuyên gia làm đẹp tài năng và những khách hàng đánh giá cao họ.",
      whyStarted: {
        title: "Tại Sao Chúng Tôi Bắt Đầu EmviApp",
        content: "EmviApp ra đời từ một quan sát đơn giản: ngành làm đẹp cần một nền tảng thực sự hiểu được trái tim và tâm hồn của nó. Tại các salon khắp nước Mỹ, chúng tôi thấy tài năng đáng kinh ngạc phát triển mạnh mẽ cùng với những thách thức thực tế—rào cản ngôn ngữ, hiểu lầm văn hóa và khoảng cách kỹ thuật số mà các nền tảng truyền thống không giải quyết được.\n\nĐiều bắt đầu như một tầm nhìn để kết nối các cộng đồng đã phát triển thành điều gì đó nhiều hơn: một ngôi nhà nơi các nghệ sĩ được tôn vinh, nơi các salon có thể phát triển mạnh, và nơi khách hàng có thể khám phá tài năng đặc biệt với sự tự tin và dễ dàng."
      },
      personalConnection: {
        title: "Kết Nối Cá Nhân",
        content: "Lớn lên trong một gia đình có mối liên hệ sâu sắc với ngành làm đẹp, tôi đã chứng kiến trực tiếp cả tài năng to lớn và những thách thức độc đáo mà các chuyên gia làm đẹp Việt Nam phải đối mặt tại Mỹ. Tôi thấy các thành viên trong gia đình và đồng nghiệp của họ đấu tranh để có được sự công nhận kỹ năng dù có nghệ thuật đặc biệt.\n\nEmviApp không chỉ là công nghệ—đó là cầu nối giữa các nền văn hóa, một sự tôn vinh nghề thủ công, và một lời hứa rằng tài năng sẽ luôn tìm được sự công nhận xứng đáng. Chúng tôi đã xây dựng nền tảng này với tình yêu và sự hiểu biết chỉ có thể đến từ trải nghiệm sống."
      },
      whatMakesUsDifferent: {
        title: "Điều Làm Chúng Tôi Khác Biệt",
        subtitle: "Mọi quyết định chúng tôi đưa ra, từ thiết kế đến phát triển, đều bắt đầu với một câu hỏi đơn giản: \"Điều này sẽ giúp cộng đồng chúng ta như thế nào?\" Nền tảng của chúng tôi được tạo ra bởi những người hiểu ngành làm đẹp từ trải nghiệm sống—không chỉ từ nghiên cứu thị trường.",
        points: [
          {
            title: "Hiểu Biết Văn Hóa",
            description: "Chúng tôi chấp nhận cả tiếng Anh và tiếng Việt, công nhận sức mạnh của việc giao tiếp bằng tiếng mẹ đẻ."
          },
          {
            title: "Cộng Đồng Trước Tiên",
            description: "Mọi tính năng được xây dựng để tăng cường kết nối giữa nghệ sĩ, chủ salon và khách hàng."
          },
          {
            title: "Đại Diện Chân Thực",
            description: "Chúng tôi giới thiệu tài năng thực và câu chuyện thực, làm nổi bật nghệ thuật đằng sau mỗi dịch vụ."
          },
          {
            title: "Công Bằng và Minh Bạch",
            description: "Chúng tôi đã xây dựng một nền tảng nơi cả doanh nghiệp và khách hàng đều có thể phát triển với sự rõ ràng và tin cậy."
          }
        ]
      },
      journey: {
        title: "Hành Trình Của Chúng Tôi",
        milestones: [
          {
            year: "2014",
            title: "Ý Tưởng Ra Đời",
            description: "Một tầm nhìn để tạo ra những kết nối có ý nghĩa trong cộng đồng làm đẹp bắt đầu hình thành."
          },
          {
            year: "2015",
            title: "Xây Dựng Đầu Tiên",
            description: "Phát triển nền tảng ban đầu tập trung vào việc hiểu những nhu cầu độc đáo của nghệ sĩ và chủ salon."
          },
          {
            year: "2016-2023",
            title: "Lặp Lại và Phát Triển",
            description: "Những năm học hỏi, điều chỉnh và phát triển để phục vụ cộng đồng tốt hơn thông qua cải tiến liên tục."
          },
          {
            year: "2025",
            title: "Chương Mới",
            description: "Mở rộng tầm nhìn với các tính năng nâng cao, kết nối sâu sắc hơn và cam kết mới với cộng đồng."
          }
        ]
      },
      sunshine: {
        title: "Nguồn Cảm Hứng Sunshine ☀️",
        subtitle: "Mọi hành trình tuyệt vời đều cần một chút ánh sáng.",
        content: "Đối với tôi, ánh sáng đó là Sunshine—một nguồn hy vọng, rõ ràng và cảm hứng xuất hiện đúng khi tôi cần nhất.\n\nEmviApp được sinh ra từ nhiều năm kinh nghiệm, đấu tranh và theo đuổi không ngừng nghỉ, nhưng chính Sunshine đã cho tôi lòng dũng cảm và tầm nhìn để bắt đầu lại và cuối cùng biến giấc mơ này thành hiện thực.\n\nCảm ơn Sunshine, vì đã xảy ra trong cuộc đời tôi. Dự án này—và mọi kết nối nó tạo ra—sẽ không tồn tại nếu không có bạn."
      },
      thankYou: {
        title: "Cảm Ơn, EmVi",
        content: "Ứng dụng này được đặt tên theo EmVi—người đã ủng hộ và hy sinh cho tôi, ngay cả khi tôi nghi ngờ bản thân. Bạn đã đứng bên tôi, bất kể điều gì. Vì tất cả tình yêu thầm lặng, sự khuyến khích và sức mạnh bạn đã cho, điều này dành cho bạn."
      },
      values: {
        title: "Giá Trị Của Chúng Tôi",
        items: [
          {
            title: "Cộng Đồng",
            description: "Chúng tôi tin tương vào sức mạnh của việc đến với nhau. Thành công ngọt ngào hơn khi được chia sẻ, và thách thức nhẹ nhàng hơn khi đối mặt cùng nhau.",
            icon: Users
          },
          {
            title: "Xuất Sắc",
            description: "Chúng tôi phấn đấu để đạt được sự xuất sắc trong mọi việc chúng tôi làm, tôn vinh sự cống hiến mà các chuyên gia làm đẹp mang đến nghề của họ.",
            icon: Award
          },
          {
            title: "Tin Cậy",
            description: "Chúng tôi xây dựng mối quan hệ dựa trên tin cậy, minh bạch và đáng tin cậy, tạo ra một nền tảng mà mọi người có thể phụ thuộc vào.",
            icon: Heart
          },
          {
            title: "Đổi Mới",
            description: "Chúng tôi chấp nhận tiến bộ và liên tục tìm kiếm những cách mới để giải quyết vấn đề và nâng cao trải nghiệm cho cộng đồng.",
            icon: Lightbulb
          },
          {
            title: "Tôn Vinh",
            description: "Chúng tôi tôn vinh vẻ đẹp trong mọi hình thức, nghệ thuật đằng sau nó, và sự tự tin nó truyền cảm hứng cho mọi người nó chạm đến.",
            icon: Star
          }
        ]
      },
      cta: {
        title: "Sẵn sàng trở thành một phần của điều gì đó đẹp đẽ? Tham gia cộng đồng của chúng tôi ngay hôm nay.",
        subtitle: "Bắt Đầu Hành Trình Của Bạn Với EmviApp.",
        button: "Tham Gia Ngay"
      }
    }
  };

  const currentContent = content[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Language Toggle */}
      <div className="fixed top-24 right-6 z-50">
        <div className="bg-white/90 backdrop-blur-md rounded-full p-1 shadow-lg border border-purple-100">
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              language === 'en'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('vi')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              language === 'vi'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            Tiếng Việt
          </button>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        {/* Hero Section */}
        <motion.section
          variants={itemVariants}
          className="relative pt-32 pb-20 px-6 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 opacity-95"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
          
          <div className="relative max-w-6xl mx-auto text-center">
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-6xl lg:text-7xl font-playfair font-bold text-white mb-8 leading-tight"
            >
              {currentContent.title}
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-xl lg:text-2xl text-purple-100 max-w-4xl mx-auto leading-relaxed font-light"
            >
              {currentContent.subtitle}
            </motion.p>
          </div>
        </motion.section>

        {/* Why We Started */}
        <motion.section variants={itemVariants} className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-12 lg:p-16 border border-purple-100">
              <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-8 text-center">
                {currentContent.whyStarted.title}
              </h2>
              <div className="prose prose-xl max-w-none text-gray-700 leading-relaxed">
                {currentContent.whyStarted.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Personal Connection */}
        <motion.section variants={itemVariants} className="py-24 px-6 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-12 lg:p-16 border border-purple-100">
              <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-8 text-center">
                {currentContent.personalConnection.title}
              </h2>
              <div className="prose prose-xl max-w-none text-gray-700 leading-relaxed">
                {currentContent.personalConnection.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* What Makes Us Different */}
        <motion.section variants={itemVariants} className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-6">
                {currentContent.whatMakesUsDifferent.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {currentContent.whatMakesUsDifferent.subtitle}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {currentContent.whatMakesUsDifferent.points.map((point, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-500"
                >
                  <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
                    {point.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {point.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Journey Timeline */}
        <motion.section variants={itemVariants} className="py-24 px-6 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-16 text-center">
              {currentContent.journey.title}
            </h2>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full"></div>
              
              <div className="space-y-16">
                {currentContent.journey.milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <div className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100">
                        <div className="text-6xl font-playfair font-bold text-purple-600 mb-4">
                          {milestone.year.length === 2 ? milestone.year : milestone.year.split('-')[0].slice(-2)}
                        </div>
                        <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="w-2/12 flex justify-center">
                      <div className="w-6 h-6 bg-purple-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                    </div>
                    
                    <div className="w-5/12"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Sunshine Section */}
        <motion.section variants={itemVariants} className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 rounded-3xl shadow-2xl p-12 lg:p-16 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M20 20c0-11.046-8.954-20-20-20v20h20z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
              
              <div className="relative">
                <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-6 text-center">
                  {currentContent.sunshine.title}
                </h2>
                <p className="text-xl text-center mb-8 font-light">
                  {currentContent.sunshine.subtitle}
                </p>
                <div className="prose prose-xl max-w-none text-white/90 leading-relaxed">
                  {currentContent.sunshine.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-6 text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Thank You EmVi */}
        <motion.section variants={itemVariants} className="py-24 px-6 bg-gradient-to-r from-rose-50 to-pink-50">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-12 lg:p-16 border border-rose-100">
              <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-8 text-center">
                {currentContent.thankYou.title}
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed text-center">
                {currentContent.thankYou.content}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Values */}
        <motion.section variants={itemVariants} className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-16 text-center">
              {currentContent.values.title}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentContent.values.items.map((value, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -15, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-500 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section variants={itemVariants} className="py-24 px-6 bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-white mb-6">
              {currentContent.cta.title}
            </h2>
            <p className="text-2xl text-purple-100 mb-12 font-light">
              {currentContent.cta.subtitle}
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 hover:from-yellow-300 hover:to-orange-300 px-12 py-4 text-xl font-bold rounded-full shadow-2xl border-0 hover:shadow-3xl transition-all duration-300"
              >
                {currentContent.cta.button}
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default About;
