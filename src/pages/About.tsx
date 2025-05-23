
import React from 'react';
import { Container } from '@/components/ui/container';
import { GradientBackground } from '@/components/ui/gradient-background';
import { Button } from '@/components/ui/button';
import { ArrowRight, Compass, Heart, Star, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { Toggle } from '@/components/ui/toggle';
import LanguageToggleButton from '@/components/home/missing-piece/LanguageToggleButton';

const AboutPage = () => {
  const { t, isVietnamese, toggleLanguage } = useTranslation();

  // Define our content with translations
  const content = {
    heroTitle: {
      english: "Beautiful Connections, Beautiful Business",
      vietnamese: "Kết nối đẹp, Kinh doanh thành công"
    },
    heroSubtitle: {
      english: "Welcome to the EmviApp journey",
      vietnamese: "Chào mừng bạn đến với hành trình EmviApp"
    },
    mission: {
      title: {
        english: "Our Mission",
        vietnamese: "Sứ mệnh của chúng tôi"
      },
      description: {
        english: "To empower beauty professionals and businesses through technology that creates meaningful connections, drives growth, and simplifies success.",
        vietnamese: "Trao quyền cho các chuyên gia làm đẹp và doanh nghiệp thông qua công nghệ tạo ra các kết nối có ý nghĩa, thúc đẩy tăng trưởng và đơn giản hóa thành công."
      }
    },
    values: {
      title: {
        english: "Our Values",
        vietnamese: "Giá trị của chúng tôi"
      },
      accessibility: {
        english: "Accessibility",
        vietnamese: "Khả năng tiếp cận"
      },
      accessibilityDesc: {
        english: "Making opportunity available to everyone, regardless of background or language.",
        vietnamese: "Tạo cơ hội cho tất cả mọi người, bất kể xuất thân hay ngôn ngữ."
      },
      community: {
        english: "Community",
        vietnamese: "Cộng đồng"
      },
      communityDesc: {
        english: "Building connections that foster growth, support, and shared success.",
        vietnamese: "Xây dựng các kết nối thúc đẩy sự phát triển, hỗ trợ và thành công chung."
      },
      excellence: {
        english: "Excellence",
        vietnamese: "Sự xuất sắc"
      },
      excellenceDesc: {
        english: "Pursuing the highest standards in everything we do.",
        vietnamese: "Theo đuổi các tiêu chuẩn cao nhất trong mọi việc chúng tôi làm."
      }
    },
    representation: {
      title: {
        english: "Representation Matters",
        vietnamese: "Đại diện là quan trọng"
      },
      description: {
        english: "We're proud to build a platform that represents and celebrates the diverse beauty industry, with special attention to supporting Vietnamese salon owners and professionals.",
        vietnamese: "Chúng tôi tự hào xây dựng một nền tảng đại diện và tôn vinh ngành công nghiệp làm đẹp đa dạng, với sự quan tâm đặc biệt đến việc hỗ trợ các chủ tiệm salon và chuyên gia Việt Nam."
      }
    },
    journey: {
      title: {
        english: "Our Journey",
        vietnamese: "Hành trình của chúng tôi"
      },
      step1: {
        year: "2014",
        title: {
          english: "The Idea is Born",
          vietnamese: "Ý tưởng ra đời"
        },
        description: {
          english: "A vision to transform how beauty professionals find opportunities and connect with clients.",
          vietnamese: "Một tầm nhìn để thay đổi cách các chuyên gia làm đẹp tìm kiếm cơ hội và kết nối với khách hàng."
        }
      },
      step2: {
        year: "2015",
        title: {
          english: "First Build",
          vietnamese: "Xây dựng đầu tiên"
        },
        description: {
          english: "The initial EmviApp concept takes shape with a focus on community and accessibility.",
          vietnamese: "Khái niệm EmviApp ban đầu hình thành với trọng tâm là cộng đồng và khả năng tiếp cận."
        }
      },
      step3: {
        year: "2016–2023",
        title: {
          english: "Iteration and Growth",
          vietnamese: "Phát triển liên tục"
        },
        description: {
          english: "Years of refinement, research, and building relationships in the beauty industry.",
          vietnamese: "Nhiều năm cải tiến, nghiên cứu và xây dựng mối quan hệ trong ngành công nghiệp làm đẹp."
        }
      },
      step4: {
        year: "2025",
        title: {
          english: "A New Chapter",
          vietnamese: "Chương mới"
        },
        description: {
          english: "EmviApp launches with a comprehensive platform designed by and for beauty professionals.",
          vietnamese: "EmviApp ra mắt với nền tảng toàn diện được thiết kế bởi và dành cho các chuyên gia làm đẹp."
        }
      }
    },
    sunshine: {
      title: {
        english: "Inspired by Sunshine ☀️",
        vietnamese: "Lấy cảm hứng từ Sunshine ☀️"
      },
      description: {
        english: "Behind every great idea is a story. EmviApp was inspired by a nail technician named Sunshine, whose journey from Vietnam to building a successful career in the U.S. beauty industry showed us the power of connection, community, and opportunity. Our platform is dedicated to making her story possible for countless others.",
        vietnamese: "Đằng sau mỗi ý tưởng tuyệt vời là một câu chuyện. EmviApp được lấy cảm hứng từ một kỹ thuật viên làm móng tên Sunshine, hành trình của cô từ Việt Nam đến việc xây dựng sự nghiệp thành công trong ngành công nghiệp làm đẹp Hoa Kỳ đã cho chúng tôi thấy sức mạnh của kết nối, cộng đồng và cơ hội. Nền tảng của chúng tôi được dành riêng để làm cho câu chuyện của cô ấy trở thành hiện thực cho vô số người khác."
      }
    },
    thankYou: {
      title: {
        english: "Thank You, Emvi",
        vietnamese: "Cảm ơn, Emvi"
      },
      description: {
        english: "We chose our name to honor a remarkable woman whose kindness, business acumen, and dedication to her clients exemplifies everything we hope to foster in the beauty industry. Her salon is a place where everyone feels welcome, valued, and beautiful. That's the spirit we bring to every feature we build.",
        vietnamese: "Chúng tôi chọn tên của mình để tôn vinh một người phụ nữ phi thường với lòng tốt, tầm nhìn kinh doanh và sự tận tâm với khách hàng của cô ấy thể hiện tất cả những gì chúng tôi hy vọng sẽ nuôi dưỡng trong ngành công nghiệp làm đẹp. Salon của cô ấy là nơi mà mọi người đều cảm thấy được chào đón, được đánh giá cao và đẹp. Đó là tinh thần mà chúng tôi mang đến cho mọi tính năng chúng tôi xây dựng."
      }
    },
    cta: {
      headline: {
        english: "Ready to be part of something beautiful? Join our community today.",
        vietnamese: "Sẵn sàng trở thành một phần của điều tuyệt đẹp? Hãy tham gia cộng đồng của chúng tôi ngay hôm nay."
      },
      button: {
        english: "Start Your Journey with EmviApp",
        vietnamese: "Bắt đầu hành trình của bạn với EmviApp"
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Language Toggle at Top Right */}
      <div className="flex justify-end p-4">
        <LanguageToggleButton isVietnamese={isVietnamese} toggleLanguage={toggleLanguage} />
      </div>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-purple-50 to-white py-16">
        <Container>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-4">
            {t(content.heroTitle)}
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
            {t(content.heroSubtitle)}
          </p>
        </Container>
      </div>

      {/* Mission Section */}
      <Container className="py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold mb-6 text-center">
            {t(content.mission.title)}
          </h2>
          <p className="text-xl text-gray-700 text-center">
            {t(content.mission.description)}
          </p>
        </div>
      </Container>

      {/* Values Section */}
      <Container className="py-12">
        <h2 className="text-3xl font-playfair font-bold mb-10 text-center">
          {t(content.values.title)}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <GradientBackground variant="premium" className="p-6 flex flex-col items-center text-center">
            <div className="bg-purple-100 p-3 rounded-full mb-4">
              <Compass className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{t(content.values.accessibility)}</h3>
            <p className="text-gray-600">{t(content.values.accessibilityDesc)}</p>
          </GradientBackground>

          <GradientBackground variant="premium" className="p-6 flex flex-col items-center text-center">
            <div className="bg-pink-100 p-3 rounded-full mb-4">
              <Heart className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{t(content.values.community)}</h3>
            <p className="text-gray-600">{t(content.values.communityDesc)}</p>
          </GradientBackground>

          <GradientBackground variant="premium" className="p-6 flex flex-col items-center text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <Star className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{t(content.values.excellence)}</h3>
            <p className="text-gray-600">{t(content.values.excellenceDesc)}</p>
          </GradientBackground>
        </div>
      </Container>

      {/* Representation Section */}
      <Container className="py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold mb-6 text-center">
            {t(content.representation.title)}
          </h2>
          <p className="text-xl text-gray-700 text-center">
            {t(content.representation.description)}
          </p>
        </div>
      </Container>

      {/* Journey Timeline Section */}
      <Container className="py-16">
        <h2 className="text-3xl font-playfair font-bold mb-12 text-center">
          {t(content.journey.title)}
        </h2>
        
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-200"></div>
          
          {/* Timeline Items */}
          <div className="space-y-24">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3">
                <div className="bg-purple-500 rounded-full w-8 h-8 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-right md:pr-12">
                  <div className="text-2xl font-bold text-purple-500">{content.journey.step1.year}</div>
                  <h3 className="text-xl font-semibold mb-2">{t(content.journey.step1.title)}</h3>
                </div>
                <div className="md:pl-12">
                  <p className="text-gray-600">{t(content.journey.step1.description)}</p>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3">
                <div className="bg-pink-500 rounded-full w-8 h-8 flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-right md:pr-12">
                  <div className="text-2xl font-bold text-pink-500">{content.journey.step2.year}</div>
                  <h3 className="text-xl font-semibold mb-2">{t(content.journey.step2.title)}</h3>
                </div>
                <div className="md:pl-12">
                  <p className="text-gray-600">{t(content.journey.step2.description)}</p>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3">
                <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-right md:pr-12">
                  <div className="text-2xl font-bold text-blue-500">{content.journey.step3.year}</div>
                  <h3 className="text-xl font-semibold mb-2">{t(content.journey.step3.title)}</h3>
                </div>
                <div className="md:pl-12">
                  <p className="text-gray-600">{t(content.journey.step3.description)}</p>
                </div>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3">
                <div className="bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center">
                  <Compass className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-right md:pr-12">
                  <div className="text-2xl font-bold text-purple-600">{content.journey.step4.year}</div>
                  <h3 className="text-xl font-semibold mb-2">{t(content.journey.step4.title)}</h3>
                </div>
                <div className="md:pl-12">
                  <p className="text-gray-600">{t(content.journey.step4.description)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Inspired by Sunshine Section */}
      <Container className="py-16">
        <GradientBackground variant="premium" className="p-8 md:p-12 rounded-2xl">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-playfair font-bold mb-6 text-center">
              {t(content.sunshine.title)}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t(content.sunshine.description)}
            </p>
          </div>
        </GradientBackground>
      </Container>

      {/* Thank You Section */}
      <Container className="py-16">
        <GradientBackground variant="premium" className="p-8 md:p-12 rounded-2xl">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-playfair font-bold mb-6 text-center">
              {t(content.thankYou.title)}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t(content.thankYou.description)}
            </p>
          </div>
        </GradientBackground>
      </Container>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 py-16 mt-12">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-playfair font-bold mb-8">
              {t(content.cta.headline)}
            </h2>
            <Button size="lg" className="text-lg px-8 py-6 rounded-full" asChild>
              <Link to="/">
                {t(content.cta.button)} <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AboutPage;
