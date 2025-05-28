
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { useTranslation } from "@/hooks/useTranslation";
import LanguageToggleButton from "@/components/home/missing-piece/LanguageToggleButton";
import { 
  Users, Star, HeartHandshake, Lightbulb, Sparkles, 
  CalendarDays, GraduationCap, Rocket, Zap, ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const AboutPage = () => {
  const { isVietnamese, toggleLanguage } = useTranslation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>{isVietnamese ? "Về Chúng Tôi | EmviApp" : "About Us | EmviApp"}</title>
        <meta 
          name="description" 
          content={isVietnamese 
            ? "Khám phá câu chuyện phía sau EmviApp - kết nối cộng đồng làm đẹp" 
            : "Discover the story behind EmviApp - connecting the beauty community"
          }
        />
      </Helmet>
      
      <div className="container max-w-5xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-playfair bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {isVietnamese ? "Về Chúng Tôi" : "About Us"}
          </h1>
          <div className="sticky top-4 z-10">
            <LanguageToggleButton
              isVietnamese={isVietnamese}
              toggleLanguage={toggleLanguage}
              className="shadow-lg"
            />
          </div>
        </div>
        
        {/* Our Story */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          <motion.div variants={cardVariants}>
            <Card className="bg-white/80 backdrop-blur-sm border-gray-100 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-3">
                  {isVietnamese ? "Câu Chuyện Của Chúng Tôi" : "Our Story"}
                </h2>
                <p className="text-lg text-gray-700">
                  {isVietnamese 
                    ? "Kết nối những người tài năng trong ngành làm đẹp với khách hàng trân trọng giá trị của họ." 
                    : "Building bridges between talented beauty professionals and the clients who value them."
                  }
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Why We Started */}
          <motion.div variants={cardVariants}>
            <Card className="bg-white/80 backdrop-blur-sm border-gray-100 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
                  {isVietnamese ? "Vì Sao Chúng Tôi Sáng Lập EmviApp" : "Why We Started EmviApp"}
                </h2>
                <p className="text-base text-gray-700 mb-4">
                  {isVietnamese 
                    ? "EmviApp ra đời từ một quan sát đơn giản: ngành làm đẹp cần một nền tảng thực sự thấu hiểu trái tim và linh hồn của nó. Tại các salon trên khắp nước Mỹ, chúng tôi chứng kiến biết bao tài năng tỏa sáng, nhưng cũng đối mặt với những khó khăn thực sự—rào cản ngôn ngữ, khác biệt văn hóa, và khoảng cách công nghệ mà các nền tảng cũ chưa giải quyết được."
                    : "EmviApp was born from a simple observation: the beauty industry needed a platform that truly understood its heart and soul. In salons across America, we saw incredible talent flourishing alongside real challenges—language barriers, cultural misunderstandings, and digital gaps that traditional platforms weren't addressing."
                  }
                </p>
                <p className="text-base text-gray-700">
                  {isVietnamese 
                    ? "Từ một ước mơ kết nối cộng đồng, EmviApp đã trở thành mái nhà chung, nơi nghệ sĩ được tôn vinh, salon phát triển, và khách hàng dễ dàng tìm thấy tài năng xuất sắc với sự tin tưởng."
                    : "What started as a vision to connect communities has grown into something more: a home where artists are celebrated, where salons can thrive, and where clients can discover exceptional talent with confidence and ease."
                  }
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* A Personal Connection */}
          <motion.div variants={cardVariants}>
            <Card className="bg-white/80 backdrop-blur-sm border-gray-100 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
                  {isVietnamese ? "Sự Gắn Bó Cá Nhân" : "A Personal Connection"}
                </h2>
                <p className="text-base text-gray-700 mb-4">
                  {isVietnamese 
                    ? "Lớn lên trong một gia đình gắn bó với ngành làm đẹp, tôi hiểu rõ cả tài năng vượt trội lẫn thách thức của người Việt trong ngành này tại Mỹ. Tôi đã thấy người thân và đồng nghiệp mình phải vật lộn để được công nhận xứng đáng với tay nghề của họ."
                    : "Growing up in a family deeply connected to the beauty industry, I witnessed firsthand both the immense talent and the unique challenges faced by Vietnamese beauty professionals in America. I saw my family members and their colleagues struggle to have their skills recognized despite their exceptional artistry."
                  }
                </p>
                <p className="text-base text-gray-700">
                  {isVietnamese 
                    ? "EmviApp không chỉ là công nghệ—mà còn là cầu nối văn hóa, tôn vinh nghề thủ công, và là lời hứa rằng tài năng sẽ luôn được ghi nhận. Chúng tôi xây dựng nền tảng này bằng tình yêu và sự thấu hiểu xuất phát từ chính trải nghiệm sống."
                    : "EmviApp is more than just technology—it's a bridge between cultures, a celebration of craft, and a promise that talent will always find its rightful recognition. We've built this platform with love and understanding that can only come from lived experience."
                  }
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* What Makes Us Different */}
          <motion.div variants={cardVariants}>
            <Card className="bg-white/80 backdrop-blur-sm border-gray-100 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
                  {isVietnamese ? "Điều Làm Chúng Tôi Khác Biệt" : "What Makes Us Different"}
                </h2>
                <p className="text-base text-gray-700 mb-6">
                  {isVietnamese 
                    ? "Mỗi quyết định, từ thiết kế đến phát triển, đều bắt đầu bằng một câu hỏi: \"Điều này sẽ giúp gì cho cộng đồng?\" Nền tảng của chúng tôi được tạo nên bởi những người từng trải trong ngành, không chỉ dựa vào khảo sát thị trường."
                    : "Every decision we make, from design to development, starts with a simple question: \"How will this help our community?\" Our platform is crafted by people who understand the beauty industry from lived experience—not just market research."
                  }
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Cultural Understanding */}
                  <div className="bg-purple-50 rounded-lg p-4 flex flex-col">
                    <h3 className="font-medium mb-2">
                      {isVietnamese ? "Thấu Hiểu Văn Hóa" : "Cultural Understanding"}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {isVietnamese 
                        ? "Chúng tôi tôn trọng cả tiếng Việt và tiếng Anh, hiểu rằng ngôn ngữ mẹ đẻ luôn mang sức mạnh gắn kết."
                        : "We embrace both English and Vietnamese, recognizing the power of communicating in one's native language."
                      }
                    </p>
                  </div>
                  
                  {/* Community First */}
                  <div className="bg-blue-50 rounded-lg p-4 flex flex-col">
                    <h3 className="font-medium mb-2">
                      {isVietnamese ? "Cộng Đồng Là Trên Hết" : "Community First"}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {isVietnamese 
                        ? "Mọi tính năng đều nhằm tăng kết nối giữa nghệ sĩ, chủ salon và khách hàng."
                        : "Every feature is built to strengthen connections between artists, salon owners, and clients."
                      }
                    </p>
                  </div>
                  
                  {/* Authentic Representation */}
                  <div className="bg-pink-50 rounded-lg p-4 flex flex-col">
                    <h3 className="font-medium mb-2">
                      {isVietnamese ? "Tôn Vinh Sự Thật" : "Authentic Representation"}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {isVietnamese 
                        ? "Chúng tôi giới thiệu tài năng và câu chuyện thật, tôn vinh nghệ thuật phía sau mỗi dịch vụ."
                        : "We showcase real talent and real stories, highlighting the artistry behind every service."
                      }
                    </p>
                  </div>
                  
                  {/* Fair and Transparent */}
                  <div className="bg-green-50 rounded-lg p-4 flex flex-col">
                    <h3 className="font-medium mb-2">
                      {isVietnamese ? "Minh Bạch & Công Bằng" : "Fair and Transparent"}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {isVietnamese 
                        ? "Nền tảng giúp cả doanh nghiệp lẫn khách hàng phát triển trong sự rõ ràng và tin tưởng."
                        : "We've built a platform where both businesses and customers can thrive with clarity and trust."
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Our Journey */}
          <motion.div variants={cardVariants}>
            <Card className="bg-white/80 backdrop-blur-sm border-gray-100 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6">
                  {isVietnamese ? "Hành Trình Của Chúng Tôi" : "Our Journey"}
                </h2>
                
                <div className="space-y-8">
                  {/* 2014 */}
                  <div className="relative pl-10 border-l-2 border-primary/20 pb-8">
                    <div className="absolute left-[-15px] top-0 w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center">
                      <span className="text-pink-500 font-bold text-sm">14</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">2014</h3>
                    <h4 className="font-medium mb-1">
                      {isVietnamese ? "Ý Tưởng Ra Đời" : "The Idea is Born"}
                    </h4>
                    <p className="text-sm text-gray-700">
                      {isVietnamese 
                        ? "Khát vọng xây dựng một cộng đồng làm đẹp kết nối và ý nghĩa được hình thành."
                        : "A vision to create meaningful connections within the beauty community begins to take shape."
                      }
                    </p>
                  </div>
                  
                  {/* 2015 */}
                  <div className="relative pl-10 border-l-2 border-primary/20 pb-8">
                    <div className="absolute left-[-15px] top-0 w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-500 font-bold text-sm">15</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">2015</h3>
                    <h4 className="font-medium mb-1">
                      {isVietnamese ? "Phiên Bản Đầu Tiên" : "First Build"}
                    </h4>
                    <p className="text-sm text-gray-700">
                      {isVietnamese 
                        ? "Bắt đầu phát triển nền tảng với mục tiêu thấu hiểu nhu cầu riêng biệt của nghệ sĩ và chủ salon."
                        : "Initial platform development focusing on understanding the unique needs of artists and salon owners."
                      }
                    </p>
                  </div>
                  
                  {/* 2016-2023 */}
                  <div className="relative pl-10 border-l-2 border-primary/20 pb-8">
                    <div className="absolute left-[-15px] top-0 w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-500 font-bold text-sm">16-23</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">2016-2023</h3>
                    <h4 className="font-medium mb-1">
                      {isVietnamese ? "Không Ngừng Phát Triển" : "Iteration and Growth"}
                    </h4>
                    <p className="text-sm text-gray-700">
                      {isVietnamese 
                        ? "Nhiều năm học hỏi, điều chỉnh, và đổi mới để phục vụ cộng đồng ngày một tốt hơn."
                        : "Years of learning, adjusting, and evolving to better serve our community through continuous improvement."
                      }
                    </p>
                  </div>
                  
                  {/* 2025 */}
                  <div className="relative pl-10">
                    <div className="absolute left-[-15px] top-0 w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-500 font-bold text-sm">25</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">2025</h3>
                    <h4 className="font-medium mb-1">
                      {isVietnamese ? "Chặng Đường Mới" : "A New Chapter"}
                    </h4>
                    <p className="text-sm text-gray-700">
                      {isVietnamese 
                        ? "Mở rộng tầm nhìn, phát triển tính năng mới, kết nối sâu sắc hơn và cam kết gắn bó với cộng đồng."
                        : "Expanding our vision with enhanced features, deeper connections, and a renewed commitment to our community."
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Inspired by Sunshine */}
          <motion.div variants={cardVariants}>
            <Card className="bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
                  {isVietnamese ? "Nguồn cảm hứng Sunshine ☀️" : "Inspired by Sunshine ☀️"}
                </h2>
                <p className="text-base text-gray-700 mb-4">
                  {isVietnamese 
                    ? "Mỗi hành trình tuyệt vời đều cần một tia sáng."
                    : "Every great journey needs a little light."
                  }
                </p>
                <p className="text-base text-gray-700 mb-4">
                  {isVietnamese 
                    ? "Với tôi, Sunshine chính là tia sáng ấy—một nguồn hy vọng, sự rõ ràng, và cảm hứng đến đúng lúc tôi cần nhất."
                    : "For me, that light is Sunshine—a source of hope, clarity, and inspiration that appeared just when I needed it most."
                  }
                </p>
                <p className="text-base text-gray-700 mb-4">
                  {isVietnamese 
                    ? "EmviApp được sinh ra từ nhiều năm kinh nghiệm, khó khăn và không ngừng nỗ lực, nhưng chính Sunshine đã cho tôi dũng khí và tầm nhìn để bắt đầu lại và biến giấc mơ này thành hiện thực."
                    : "EmviApp was born from years of experience, struggle, and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and finally bring this dream to life."
                  }
                </p>
                <p className="text-base text-gray-700">
                  {isVietnamese 
                    ? "Cảm ơn Sunshine đã đến trong cuộc đời tôi. Dự án này—và mọi kết nối mà nó tạo ra—đều không thể có nếu thiếu bạn."
                    : "Thank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you."
                  }
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Thank You, EmVi */}
          <motion.div variants={cardVariants}>
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
                  {isVietnamese ? "Cảm ơn, EmVi" : "Thank You, EmVi"}
                </h2>
                <p className="text-base text-gray-700">
                  {isVietnamese 
                    ? "Ứng dụng này được đặt tên theo EmVi—người đã luôn ủng hộ và hy sinh vì tôi, ngay cả khi tôi nghi ngờ bản thân mình. Bạn luôn bên cạnh tôi, dù thế nào đi nữa. Tất cả tình yêu thầm lặng, sự động viên và sức mạnh mà bạn dành cho, điều này là dành tặng bạn."
                    : "This app is named after EmVi—the person who supported and sacrificed for me, even when I doubted myself. You stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you."
                  }
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Our Values */}
          <motion.div variants={cardVariants}>
            <Card className="bg-white/80 backdrop-blur-sm border-gray-100 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6">
                  {isVietnamese ? "Giá Trị Cốt Lõi" : "Our Values"}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Community */}
                  <div className="bg-blue-50 rounded-lg p-5 flex flex-col items-center">
                    <Users className="h-10 w-10 text-blue-500 mb-3" />
                    <h3 className="font-medium text-lg mb-2 text-center">
                      {isVietnamese ? "Cộng Đồng" : "Community"}
                    </h3>
                    <p className="text-sm text-gray-700 text-center">
                      {isVietnamese 
                        ? "Chúng tôi tin vào sức mạnh đoàn kết. Thành công ngọt ngào hơn khi được sẻ chia, thử thách nhẹ nhàng hơn khi cùng vượt qua."
                        : "We believe in the power of coming together. Success is sweeter when shared, and challenges are lighter when faced together."
                      }
                    </p>
                  </div>
                  
                  {/* Excellence */}
                  <div className="bg-amber-50 rounded-lg p-5 flex flex-col items-center">
                    <Star className="h-10 w-10 text-amber-500 mb-3" />
                    <h3 className="font-medium text-lg mb-2 text-center">
                      {isVietnamese ? "Xuất Sắc" : "Excellence"}
                    </h3>
                    <p className="text-sm text-gray-700 text-center">
                      {isVietnamese 
                        ? "Chúng tôi không ngừng nỗ lực đạt sự xuất sắc, xứng đáng với tâm huyết của người làm đẹp."
                        : "We strive for excellence in everything we do, honoring the dedication our beauty professionals bring to their craft."
                      }
                    </p>
                  </div>
                  
                  {/* Trust */}
                  <div className="bg-green-50 rounded-lg p-5 flex flex-col items-center">
                    <HeartHandshake className="h-10 w-10 text-green-500 mb-3" />
                    <h3 className="font-medium text-lg mb-2 text-center">
                      {isVietnamese ? "Tin Tưởng" : "Trust"}
                    </h3>
                    <p className="text-sm text-gray-700 text-center">
                      {isVietnamese 
                        ? "Chúng tôi xây dựng mối quan hệ dựa trên sự minh bạch, uy tín và tin cậy, tạo nên nền tảng vững chắc."
                        : "We build relationships based on trust, transparency, and reliability, creating a platform everyone can depend on."
                      }
                    </p>
                  </div>
                  
                  {/* Innovation */}
                  <div className="bg-indigo-50 rounded-lg p-5 flex flex-col items-center md:col-span-1 lg:col-span-1 md:mx-auto lg:mx-0">
                    <Lightbulb className="h-10 w-10 text-indigo-500 mb-3" />
                    <h3 className="font-medium text-lg mb-2 text-center">
                      {isVietnamese ? "Đổi Mới" : "Innovation"}
                    </h3>
                    <p className="text-sm text-gray-700 text-center">
                      {isVietnamese 
                        ? "Chúng tôi luôn tìm cách đổi mới, giải quyết vấn đề và nâng cao trải nghiệm cho cộng đồng."
                        : "We embrace progress and continuously seek new ways to solve problems and enhance experiences for our community."
                      }
                    </p>
                  </div>
                  
                  {/* Celebration */}
                  <div className="bg-pink-50 rounded-lg p-5 flex flex-col items-center md:col-span-1 lg:col-span-1 md:mx-auto lg:mx-0">
                    <Sparkles className="h-10 w-10 text-pink-500 mb-3" />
                    <h3 className="font-medium text-lg mb-2 text-center">
                      {isVietnamese ? "Tôn Vinh" : "Celebration"}
                    </h3>
                    <p className="text-sm text-gray-700 text-center">
                      {isVietnamese 
                        ? "Chúng tôi tôn vinh vẻ đẹp dưới mọi hình thức, nghệ thuật sáng tạo và sự tự tin nó mang lại cho mỗi người."
                        : "We celebrate beauty in all its forms, the artistry behind it, and the confidence it inspires in everyone it touches."
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* CTA */}
          <motion.div variants={cardVariants}>
            <Card className="bg-gradient-to-br from-purple-100/50 to-indigo-50 border border-purple-200/50 overflow-hidden shadow-lg">
              <CardContent className="py-10 px-8 flex flex-col items-center">
                <h2 className="text-xl md:text-2xl font-playfair font-bold text-center mb-4">
                  {isVietnamese 
                    ? "Bạn đã sẵn sàng trở thành một phần của cộng đồng EmviApp chưa?"
                    : "Ready to be part of something beautiful? Join our community today."
                  }
                </h2>
                <p className="text-base text-gray-700 text-center mb-6">
                  {isVietnamese 
                    ? "Bắt đầu hành trình của bạn cùng EmviApp ngay hôm nay."
                    : "Start Your Journey with EmviApp."
                  }
                </p>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-6 h-auto text-base group shadow-lg"
                >
                  {isVietnamese ? "Tham Gia Ngay" : "Join Now"}
                  <ChevronRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AboutPage;
