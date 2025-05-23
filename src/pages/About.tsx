
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';
import { GradientBackground } from '@/components/ui/gradient-background';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

const AboutPage: React.FC = () => {
  const { t, isVietnamese } = useTranslation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <Helmet>
        <title>{isVietnamese ? 'Về Chúng Tôi | EmviApp' : 'About Us | EmviApp'}</title>
        <meta 
          name="description" 
          content={isVietnamese ? 'Tìm hiểu về câu chuyện và sứ mệnh của EmviApp' : 'Learn about EmviApp\'s story and mission'} 
        />
      </Helmet>
      
      <Container className="py-12 md:py-16">
        <motion.div 
          className="max-w-4xl mx-auto space-y-8"
          initial="hidden"
          animate="show"
          variants={container}
        >
          {/* Header */}
          <motion.div variants={item} className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
              {isVietnamese ? 'Câu Chuyện Của Chúng Tôi' : 'Our Story'}
            </h1>
            <p className="text-gray-600 text-lg">
              {isVietnamese ? 'Kết nối những người tài năng trong ngành làm đẹp với khách hàng trân trọng giá trị của họ.' : 'Building bridges between talented beauty professionals and the clients who value them.'}
            </p>
          </motion.div>
          
          {/* Why We Started Card */}
          <motion.div variants={item}>
            <Card className="border-purple-100 shadow-md">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
                <CardTitle className="text-xl font-semibold">
                  {isVietnamese ? 'Vì Sao Chúng Tôi Sáng Lập EmviApp' : 'Why We Started EmviApp'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="mb-4">
                  {isVietnamese 
                    ? 'EmviApp ra đời từ một quan sát đơn giản: ngành làm đẹp cần một nền tảng thực sự thấu hiểu trái tim và linh hồn của nó. Tại các salon trên khắp nước Mỹ, chúng tôi chứng kiến biết bao tài năng tỏa sáng, nhưng cũng đối mặt với những khó khăn thực sự—rào cản ngôn ngữ, khác biệt văn hóa, và khoảng cách công nghệ mà các nền tảng cũ chưa giải quyết được.'
                    : 'EmviApp was born from a simple observation: the beauty industry needed a platform that truly understood its heart and soul. In salons across America, we saw incredible talent flourishing alongside real challenges—language barriers, cultural misunderstandings, and digital gaps that traditional platforms weren\'t addressing.'
                  }
                </p>
                <p>
                  {isVietnamese
                    ? 'Từ một ước mơ kết nối cộng đồng, EmviApp đã trở thành mái nhà chung, nơi nghệ sĩ được tôn vinh, salon phát triển, và khách hàng dễ dàng tìm thấy tài năng xuất sắc với sự tin tưởng.'
                    : 'What started as a vision to connect communities has grown into something more: a home where artists are celebrated, where salons can thrive, and where clients can discover exceptional talent with confidence and ease.'
                  }
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Personal Connection */}
          <motion.div variants={item}>
            <Card className="border-purple-100 shadow-md">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
                <CardTitle className="text-xl font-semibold">
                  {isVietnamese ? 'Sự Gắn Bó Cá Nhân' : 'A Personal Connection'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="mb-4">
                  {isVietnamese 
                    ? 'Lớn lên trong một gia đình gắn bó với ngành làm đẹp, tôi hiểu rõ cả tài năng vượt trội lẫn thách thức của người Việt trong ngành này tại Mỹ. Tôi đã thấy người thân và đồng nghiệp mình phải vật lộn để được công nhận xứng đáng với tay nghề của họ.'
                    : 'Growing up in a family deeply connected to the beauty industry, I witnessed firsthand both the immense talent and the unique challenges faced by Vietnamese beauty professionals in America. I saw my family members and their colleagues struggle to have their skills recognized despite their exceptional artistry.'
                  }
                </p>
                <p>
                  {isVietnamese
                    ? 'EmviApp không chỉ là công nghệ—mà còn là cầu nối văn hóa, tôn vinh nghề thủ công, và là lời hứa rằng tài năng sẽ luôn được ghi nhận. Chúng tôi xây dựng nền tảng này bằng tình yêu và sự thấu hiểu xuất phát từ chính trải nghiệm sống.'
                    : 'EmviApp is more than just technology—it\'s a bridge between cultures, a celebration of craft, and a promise that talent will always find its rightful recognition. We\'ve built this platform with love and understanding that can only come from lived experience.'
                  }
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* What Makes Us Different */}
          <motion.div variants={item}>
            <Card className="border-purple-100 shadow-md">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
                <CardTitle className="text-xl font-semibold">
                  {isVietnamese ? 'Điều Làm Chúng Tôi Khác Biệt' : 'What Makes Us Different'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="mb-6">
                  {isVietnamese 
                    ? 'Mỗi quyết định, từ thiết kế đến phát triển, đều bắt đầu bằng một câu hỏi: "Điều này sẽ giúp gì cho cộng đồng?" Nền tảng của chúng tôi được tạo nên bởi những người từng trải trong ngành, không chỉ dựa vào khảo sát thị trường.'
                    : 'Every decision we make, from design to development, starts with a simple question: "How will this help our community?" Our platform is crafted by people who understand the beauty industry from lived experience—not just market research.'
                  }
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      {isVietnamese ? 'Thấu Hiểu Văn Hóa' : 'Cultural Understanding'}
                    </h3>
                    <p className="text-gray-600">
                      {isVietnamese
                        ? 'Chúng tôi tôn trọng cả tiếng Việt và tiếng Anh, hiểu rằng ngôn ngữ mẹ đẻ luôn mang sức mạnh gắn kết.'
                        : 'We embrace both English and Vietnamese, recognizing the power of communicating in one\'s native language.'
                      }
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      {isVietnamese ? 'Cộng Đồng Là Trên Hết' : 'Community First'}
                    </h3>
                    <p className="text-gray-600">
                      {isVietnamese
                        ? 'Mọi tính năng đều nhằm tăng kết nối giữa nghệ sĩ, chủ salon và khách hàng.'
                        : 'Every feature is built to strengthen connections between artists, salon owners, and clients.'
                      }
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      {isVietnamese ? 'Tôn Vinh Sự Thật' : 'Authentic Representation'}
                    </h3>
                    <p className="text-gray-600">
                      {isVietnamese
                        ? 'Chúng tôi giới thiệu tài năng và câu chuyện thật, tôn vinh nghệ thuật phía sau mỗi dịch vụ.'
                        : 'We showcase real talent and real stories, highlighting the artistry behind every service.'
                      }
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      {isVietnamese ? 'Minh Bạch & Công Bằng' : 'Fair and Transparent'}
                    </h3>
                    <p className="text-gray-600">
                      {isVietnamese
                        ? 'Nền tảng giúp cả doanh nghiệp lẫn khách hàng phát triển trong sự rõ ràng và tin tưởng.'
                        : 'We\'ve built a platform where both businesses and customers can thrive with clarity and trust.'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Our Journey */}
          <motion.div variants={item}>
            <Card className="border-purple-100 shadow-md">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
                <CardTitle className="text-xl font-semibold">
                  {isVietnamese ? 'Hành Trình Của Chúng Tôi' : 'Our Journey'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-8">
                  <div className="relative pl-8 before:content-[''] before:absolute before:left-3 before:top-0 before:h-full before:w-0.5 before:bg-purple-100">
                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    </div>
                    <h3 className="text-lg font-medium">
                      2014
                    </h3>
                    <h4 className="text-base font-medium text-gray-800 mb-1">
                      {isVietnamese ? 'Ý Tưởng Ra Đời' : 'The Idea is Born'}
                    </h4>
                    <p className="text-gray-600">
                      {isVietnamese
                        ? 'Khát vọng xây dựng một cộng đồng làm đẹp kết nối và ý nghĩa được hình thành.'
                        : 'A vision to create meaningful connections within the beauty community begins to take shape.'
                      }
                    </p>
                  </div>
                  
                  <div className="relative pl-8 before:content-[''] before:absolute before:left-3 before:top-0 before:h-full before:w-0.5 before:bg-purple-100">
                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    </div>
                    <h3 className="text-lg font-medium">
                      2015
                    </h3>
                    <h4 className="text-base font-medium text-gray-800 mb-1">
                      {isVietnamese ? 'Phiên Bản Đầu Tiên' : 'First Build'}
                    </h4>
                    <p className="text-gray-600">
                      {isVietnamese
                        ? 'Bắt đầu phát triển nền tảng với mục tiêu thấu hiểu nhu cầu riêng biệt của nghệ sĩ và chủ salon.'
                        : 'Initial platform development focusing on understanding the unique needs of artists and salon owners.'
                      }
                    </p>
                  </div>
                  
                  <div className="relative pl-8 before:content-[''] before:absolute before:left-3 before:top-0 before:h-full before:w-0.5 before:bg-purple-100">
                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    </div>
                    <h3 className="text-lg font-medium">
                      2016-2023
                    </h3>
                    <h4 className="text-base font-medium text-gray-800 mb-1">
                      {isVietnamese ? 'Không Ngừng Phát Triển' : 'Iteration and Growth'}
                    </h4>
                    <p className="text-gray-600">
                      {isVietnamese
                        ? 'Nhiều năm học hỏi, điều chỉnh, và đổi mới để phục vụ cộng đồng ngày một tốt hơn.'
                        : 'Years of learning, adjusting, and evolving to better serve our community through continuous improvement.'
                      }
                    </p>
                  </div>
                  
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    </div>
                    <h3 className="text-lg font-medium">
                      2025
                    </h3>
                    <h4 className="text-base font-medium text-gray-800 mb-1">
                      {isVietnamese ? 'Chặng Đường Mới' : 'A New Chapter'}
                    </h4>
                    <p className="text-gray-600">
                      {isVietnamese
                        ? 'Mở rộng tầm nhìn, phát triển tính năng mới, kết nối sâu sắc hơn và cam kết gắn bó với cộng đồng.'
                        : 'Expanding our vision with enhanced features, deeper connections, and a renewed commitment to our community.'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Sunshine */}
          <motion.div variants={item}>
            <Card className="border-purple-100 shadow-md">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-100">
                <CardTitle className="text-xl font-semibold flex items-center">
                  {isVietnamese ? 'Nguồn Cảm Hứng Từ Ánh Nắng ☀️' : 'Inspired by Sunshine ☀️'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="mb-4">
                  {isVietnamese 
                    ? 'Mỗi hành trình lớn đều cần một tia sáng.'
                    : 'Every great journey needs a little light.'
                  }
                </p>
                <p className="mb-4">
                  {isVietnamese
                    ? 'Với tôi, ánh sáng đó là Sunshine—nguồn hy vọng, sự sáng suốt và cảm hứng xuất hiện đúng lúc tôi cần nhất.'
                    : 'For me, that light is Sunshine—a source of hope, clarity, and inspiration that appeared just when I needed it most.'
                  }
                </p>
                <p className="mb-4">
                  {isVietnamese
                    ? 'EmviApp được xây dựng từ bao năm kinh nghiệm, khó khăn và kiên trì, nhưng chính Sunshine đã cho tôi dũng khí và tầm nhìn để bắt đầu lại và biến giấc mơ này thành hiện thực.'
                    : 'EmviApp was born from years of experience, struggle, and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and finally bring this dream to life.'
                  }
                </p>
                <p>
                  {isVietnamese
                    ? 'Cảm ơn Sunshine đã đến trong cuộc đời tôi. Dự án này—và tất cả những kết nối mà nó tạo ra—sẽ không tồn tại nếu thiếu bạn.'
                    : 'Thank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you.'
                  }
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Thank You, EmVi - THE ONLY SECTION BEING UPDATED */}
          <motion.div variants={item}>
            <Card className="border-purple-100 shadow-md bg-gradient-to-br from-white to-purple-50">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                <CardTitle className="text-xl font-semibold">
                  {isVietnamese ? 'Cảm ơn, Em Vi' : 'Thank You, Em Vi'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700">
                  {isVietnamese 
                    ? 'Ứng dụng này được đặt tên theo EmVi—người đã luôn bên cạnh, hy sinh và ủng hộ tôi ngay cả khi tôi nghi ngờ bản thân. Bạn đã luôn ở bên tôi, bất kể điều gì. Tất cả tình yêu thầm lặng, sự động viên và sức mạnh bạn đã cho, điều này là dành cho bạn.'
                    : 'This app is named after EmVi—the person who supported and sacrificed for me, even when I doubted myself. You stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you.'
                  }
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Our Values */}
          <motion.div variants={item}>
            <Card className="border-purple-100 shadow-md">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
                <CardTitle className="text-xl font-semibold">
                  {isVietnamese ? 'Giá Trị Cốt Lõi' : 'Our Values'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                    <h3 className="text-lg font-medium mb-2 text-purple-700">
                      {isVietnamese ? 'Cộng Đồng' : 'Community'}
                    </h3>
                    <p className="text-gray-600">
                      {isVietnamese
                        ? 'Chúng tôi tin vào sức mạnh đoàn kết. Thành công ngọt ngào hơn khi được sẻ chia, thử thách nhẹ nhàng hơn khi cùng vượt qua.'
                        : 'We believe in the power of coming together. Success is sweeter when shared, and challenges are lighter when faced together.'
                      }
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                    <h3 className="text-lg font-medium mb-2 text-purple-700">
                      {isVietnamese ? 'Xuất Sắc' : 'Excellence'}
                    </h3>
                    <p className="text-gray-600">
                      {isVietnamese
                        ? 'Chúng tôi không ngừng nỗ lực đạt sự xuất sắc, xứng đáng với tâm huyết của người làm đẹp.'
                        : 'We strive for excellence in everything we do, honoring the dedication our beauty professionals bring to their craft.'
                      }
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                    <h3 className="text-lg font-medium mb-2 text-purple-700">
                      {isVietnamese ? 'Tin Tưởng' : 'Trust'}
                    </h3>
                    <p className="text-gray-600">
                      {isVietnamese
                        ? 'Chúng tôi xây dựng mối quan hệ dựa trên sự minh bạch, uy tín và tin cậy, tạo nên nền tảng vững chắc.'
                        : 'We build relationships based on trust, transparency, and reliability, creating a platform everyone can depend on.'
                      }
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                    <h3 className="text-lg font-medium mb-2 text-purple-700">
                      {isVietnamese ? 'Đổi Mới' : 'Innovation'}
                    </h3>
                    <p className="text-gray-600">
                      {isVietnamese
                        ? 'Chúng tôi luôn tìm cách đổi mới, giải quyết vấn đề và nâng cao trải nghiệm cho cộng đồng.'
                        : 'We embrace progress and continuously seek new ways to solve problems and enhance experiences for our community.'
                      }
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                    <h3 className="text-lg font-medium mb-2 text-purple-700">
                      {isVietnamese ? 'Tôn Vinh' : 'Celebration'}
                    </h3>
                    <p className="text-gray-600">
                      {isVietnamese
                        ? 'Chúng tôi tôn vinh vẻ đẹp dưới mọi hình thức, nghệ thuật sáng tạo và sự tự tin nó mang lại cho mỗi người.'
                        : 'We celebrate beauty in all its forms, the artistry behind it, and the confidence it inspires in everyone it touches.'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* CTA */}
          <motion.div variants={item} className="text-center pt-6">
            <h2 className="text-xl md:text-2xl font-medium mb-5">
              {isVietnamese 
                ? 'Bạn đã sẵn sàng trở thành một phần của cộng đồng EmviApp chưa?' 
                : 'Ready to be part of something beautiful? Join our community today.'
              }
            </h2>
            <Button size="lg" className="px-8 py-6 text-lg" asChild>
              <Link to="/sign-up">
                {isVietnamese ? 'Bắt đầu hành trình của bạn cùng EmviApp ngay hôm nay.' : 'Start Your Journey with EmviApp.'}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </Layout>
  );
};

export default AboutPage;
