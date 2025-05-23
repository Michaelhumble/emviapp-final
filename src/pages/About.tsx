
import React from 'react';
import { Container } from '@/components/ui/container';
import { GradientBackground } from '@/components/ui/gradient-background';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Heart, 
  Sparkles, 
  Lightbulb, 
  Code, 
  LineChart, 
  Sun, 
  Milestone,
  ArrowRight
} from 'lucide-react';
import LanguageToggle from '@/components/layout/LanguageToggle';
import { Button } from "@/components/ui/button";
import { Translation } from '@/hooks/useTranslation';

const AboutPage: React.FC = () => {
  const { t, isVietnamese, toggleLanguage } = useTranslation();

  // Define all translation content
  const translations = {
    pageTitle: {
      english: "Beautiful Connections, Beautiful Business",
      vietnamese: "Kết Nối Tuyệt Vời, Kinh Doanh Tuyệt Vời"
    },
    ourMission: {
      english: "Our Mission",
      vietnamese: "Sứ Mệnh Của Chúng Tôi"
    },
    missionText: {
      english: "EmviApp exists to empower beauty professionals to find better opportunities, while helping salon owners build thriving businesses with exceptional talent. We connect people to possibilities in the beauty industry through technology that understands the unique needs of this vibrant community.",
      vietnamese: "EmviApp tồn tại để trao quyền cho các chuyên gia làm đẹp tìm kiếm cơ hội tốt hơn, đồng thời giúp chủ tiệm xây dựng doanh nghiệp phát triển mạnh với những tài năng xuất sắc. Chúng tôi kết nối mọi người với các cơ hội trong ngành làm đẹp thông qua công nghệ hiểu được nhu cầu độc đáo của cộng đồng sôi động này."
    },
    ourValues: {
      english: "Our Values",
      vietnamese: "Giá Trị Của Chúng Tôi"
    },
    communityValue: {
      english: "Community",
      vietnamese: "Cộng Đồng"
    },
    communityText: {
      english: "We believe in the power of connection, bringing artists and salon owners together to create meaningful professional relationships.",
      vietnamese: "Chúng tôi tin vào sức mạnh của sự kết nối, đưa các nghệ sĩ và chủ tiệm lại với nhau để tạo ra các mối quan hệ chuyên nghiệp có ý nghĩa."
    },
    compassionValue: {
      english: "Compassion",
      vietnamese: "Lòng Trắc Ẩn"
    },
    compassionText: {
      english: "Every feature we build starts with understanding the real challenges facing beauty professionals.",
      vietnamese: "Mỗi tính năng chúng tôi xây dựng đều bắt đầu bằng việc hiểu rõ những thách thức thực sự mà các chuyên gia làm đẹp đang phải đối mặt."
    },
    excellenceValue: {
      english: "Excellence",
      vietnamese: "Sự Xuất Sắc"
    },
    excellenceText: {
      english: "We pursue the highest standards in design, functionality, and service—because our community deserves nothing less.",
      vietnamese: "Chúng tôi theo đuổi các tiêu chuẩn cao nhất về thiết kế, chức năng và dịch vụ—bởi vì cộng đồng của chúng tôi xứng đáng với điều đó."
    },
    ourJourney: {
      english: "Our Journey",
      vietnamese: "Hành Trình Của Chúng Tôi"
    },
    journeyStep1Title: {
      english: "The Idea is Born",
      vietnamese: "Ý Tưởng Ra Đời"
    },
    journeyStep1Text: {
      english: "From conversations with salon owners and nail artists, we recognized the need for a better way to connect talent with opportunity.",
      vietnamese: "Từ những cuộc trò chuyện với chủ tiệm và nghệ sĩ làm móng, chúng tôi nhận ra nhu cầu về một cách tốt hơn để kết nối tài năng với cơ hội."
    },
    journeyStep2Title: {
      english: "First Build",
      vietnamese: "Xây Dựng Đầu Tiên"
    },
    journeyStep2Text: {
      english: "Our team developed the initial platform focused on solving the hiring challenges unique to the beauty industry.",
      vietnamese: "Đội ngũ của chúng tôi đã phát triển nền tảng ban đầu tập trung vào giải quyết các thách thức tuyển dụng đặc thù của ngành làm đẹp."
    },
    journeyStep3Title: {
      english: "Iteration and Growth",
      vietnamese: "Cải Tiến và Phát Triển"
    },
    journeyStep3Text: {
      english: "Through continuous feedback and improvement, we've expanded our services to meet evolving needs of our growing community.",
      vietnamese: "Thông qua phản hồi và cải tiến liên tục, chúng tôi đã mở rộng dịch vụ của mình để đáp ứng nhu cầu ngày càng phát triển của cộng đồng đang phát triển."
    },
    journeyStep4Title: {
      english: "A New Chapter",
      vietnamese: "Chương Mới"
    },
    journeyStep4Text: {
      english: "Today, EmviApp connects thousands of beauty professionals with their perfect opportunities while helping salons find their ideal team members.",
      vietnamese: "Ngày nay, EmviApp kết nối hàng ngàn chuyên gia làm đẹp với cơ hội hoàn hảo của họ trong khi giúp các tiệm tìm thấy thành viên nhóm lý tưởng của họ."
    },
    representation: {
      english: "Representation Matters",
      vietnamese: "Đại Diện Rất Quan Trọng"
    },
    representationText: {
      english: "We're proud to build technology that serves the diverse beauty community, with special attention to Vietnamese-American salon owners and artists who form such a vital part of this industry.",
      vietnamese: "Chúng tôi tự hào xây dựng công nghệ phục vụ cộng đồng làm đẹp đa dạng, đặc biệt chú ý đến chủ tiệm và nghệ sĩ người Mỹ gốc Việt - những người tạo nên một phần quan trọng của ngành công nghiệp này."
    },
    inspired: {
      english: "Inspired by Sunshine ☀️",
      vietnamese: "Lấy Cảm Hứng từ Ánh Nắng ☀️"
    },
    inspiredText: {
      english: "Every feature of EmviApp has been built with love, inspired by the warmth and care that salon professionals bring to their clients daily.",
      vietnamese: "Mỗi tính năng của EmviApp được xây dựng với tình yêu thương, được truyền cảm hứng từ sự ấm áp và quan tâm mà các chuyên gia làm đẹp mang đến cho khách hàng của họ hàng ngày."
    },
    thankYou: {
      english: "Thank You, Emvi",
      vietnamese: "Cảm Ơn, Emvi"
    },
    thankYouText: {
      english: "We named our platform after a dear friend whose spirit of generosity and connection inspired this entire journey. Her legacy of bringing people together continues through every match we help create.",
      vietnamese: "Chúng tôi đặt tên nền tảng của mình theo tên một người bạn thân, người mà tinh thần rộng lượng và kết nối đã truyền cảm hứng cho toàn bộ hành trình này. Di sản về việc kết nối mọi người của cô ấy tiếp tục thông qua mỗi sự kết hợp mà chúng tôi giúp tạo ra."
    },
    ctaHeading: {
      english: "Ready to be part of something beautiful?",
      vietnamese: "Sẵn sàng trở thành một phần của điều tuyệt vời?"
    },
    ctaButton: {
      english: "Start Your Journey with EmviApp",
      vietnamese: "Bắt Đầu Hành Trình Với EmviApp"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-12 relative">
        {/* Language Toggle at top right */}
        <div className="absolute top-0 right-0 mt-4 mr-4 z-10">
          <LanguageToggle minimal={true} />
        </div>
        
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl text-center font-playfair font-bold text-gray-800 mb-16">
          {t(translations.pageTitle)}
        </h1>

        {/* Mission Section */}
        <GradientBackground variant="premium" className="mb-12 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6 text-center">
            {t(translations.ourMission)}
          </h2>
          <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto">
            {t(translations.missionText)}
          </p>
        </GradientBackground>

        {/* Values Section */}
        <div className="my-16">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-10 text-center">
            {t(translations.ourValues)}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <GradientBackground className="p-6 md:p-8 text-center">
              <div className="flex justify-center mb-4">
                <Users size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t(translations.communityValue)}</h3>
              <p>{t(translations.communityText)}</p>
            </GradientBackground>
            
            <GradientBackground className="p-6 md:p-8 text-center">
              <div className="flex justify-center mb-4">
                <Heart size={32} className="text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t(translations.compassionValue)}</h3>
              <p>{t(translations.compassionText)}</p>
            </GradientBackground>
            
            <GradientBackground className="p-6 md:p-8 text-center">
              <div className="flex justify-center mb-4">
                <Sparkles size={32} className="text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t(translations.excellenceValue)}</h3>
              <p>{t(translations.excellenceText)}</p>
            </GradientBackground>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="my-16">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-10 text-center">
            {t(translations.ourJourney)}
          </h2>
          
          <div className="space-y-12 relative before:content-[''] before:absolute before:left-16 md:before:left-1/2 before:-ml-1 before:h-full before:w-0.5 before:bg-gray-200">
            {/* 2014 - The Idea is Born */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-center">
              <div className="flex items-center md:justify-end md:w-1/2 md:pr-8">
                <div className="hidden md:block w-full text-right">
                  <h3 className="text-xl font-bold mb-2">{t(translations.journeyStep1Title)}</h3>
                  <p className="text-gray-600">{t(translations.journeyStep1Text)}</p>
                </div>
              </div>
              
              <div className="flex justify-center items-center z-10 w-12 h-12 bg-purple-100 rounded-full border-4 border-white shadow-md md:mx-0">
                <Lightbulb size={20} className="text-purple-600" />
              </div>
              
              <div className="md:w-1/2 md:pl-8">
                <div className="ml-8 md:ml-0 md:mt-0 mt-4">
                  <span className="block md:hidden font-bold text-purple-600 mb-1">2014</span>
                  <h3 className="md:hidden text-xl font-bold mb-2">{t(translations.journeyStep1Title)}</h3>
                  <p className="md:hidden text-gray-600">{t(translations.journeyStep1Text)}</p>
                  <span className="hidden md:block font-bold text-purple-600 mb-1">2014</span>
                </div>
              </div>
            </div>
            
            {/* 2015 - First Build */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-center">
              <div className="flex items-center md:justify-end md:w-1/2 md:pr-8">
                <div className="hidden md:block w-full text-right">
                  <h3 className="text-xl font-bold mb-2">{t(translations.journeyStep2Title)}</h3>
                  <p className="text-gray-600">{t(translations.journeyStep2Text)}</p>
                </div>
              </div>
              
              <div className="flex justify-center items-center z-10 w-12 h-12 bg-blue-100 rounded-full border-4 border-white shadow-md md:mx-0">
                <Code size={20} className="text-blue-600" />
              </div>
              
              <div className="md:w-1/2 md:pl-8">
                <div className="ml-8 md:ml-0 md:mt-0 mt-4">
                  <span className="block md:hidden font-bold text-blue-600 mb-1">2015</span>
                  <h3 className="md:hidden text-xl font-bold mb-2">{t(translations.journeyStep2Title)}</h3>
                  <p className="md:hidden text-gray-600">{t(translations.journeyStep2Text)}</p>
                  <span className="hidden md:block font-bold text-blue-600 mb-1">2015</span>
                </div>
              </div>
            </div>
            
            {/* 2016-2023 - Iteration and Growth */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-center">
              <div className="flex items-center md:justify-end md:w-1/2 md:pr-8">
                <div className="hidden md:block w-full text-right">
                  <h3 className="text-xl font-bold mb-2">{t(translations.journeyStep3Title)}</h3>
                  <p className="text-gray-600">{t(translations.journeyStep3Text)}</p>
                </div>
              </div>
              
              <div className="flex justify-center items-center z-10 w-12 h-12 bg-green-100 rounded-full border-4 border-white shadow-md md:mx-0">
                <LineChart size={20} className="text-green-600" />
              </div>
              
              <div className="md:w-1/2 md:pl-8">
                <div className="ml-8 md:ml-0 md:mt-0 mt-4">
                  <span className="block md:hidden font-bold text-green-600 mb-1">2016-2023</span>
                  <h3 className="md:hidden text-xl font-bold mb-2">{t(translations.journeyStep3Title)}</h3>
                  <p className="md:hidden text-gray-600">{t(translations.journeyStep3Text)}</p>
                  <span className="hidden md:block font-bold text-green-600 mb-1">2016-2023</span>
                </div>
              </div>
            </div>
            
            {/* 2025 - A New Chapter */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-center">
              <div className="flex items-center md:justify-end md:w-1/2 md:pr-8">
                <div className="hidden md:block w-full text-right">
                  <h3 className="text-xl font-bold mb-2">{t(translations.journeyStep4Title)}</h3>
                  <p className="text-gray-600">{t(translations.journeyStep4Text)}</p>
                </div>
              </div>
              
              <div className="flex justify-center items-center z-10 w-12 h-12 bg-amber-100 rounded-full border-4 border-white shadow-md md:mx-0">
                <Milestone size={20} className="text-amber-600" />
              </div>
              
              <div className="md:w-1/2 md:pl-8">
                <div className="ml-8 md:ml-0 md:mt-0 mt-4">
                  <span className="block md:hidden font-bold text-amber-600 mb-1">2025</span>
                  <h3 className="md:hidden text-xl font-bold mb-2">{t(translations.journeyStep4Title)}</h3>
                  <p className="md:hidden text-gray-600">{t(translations.journeyStep4Text)}</p>
                  <span className="hidden md:block font-bold text-amber-600 mb-1">2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Representation */}
        <GradientBackground className="my-16 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6 text-center">
            {t(translations.representation)}
          </h2>
          <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto">
            {t(translations.representationText)}
          </p>
        </GradientBackground>
        
        {/* Inspired by Sunshine */}
        <div className="my-16 p-8 md:p-12 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-sm">
          <div className="flex justify-center mb-6">
            <Sun size={48} className="text-amber-500" />
          </div>
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6 text-center">
            {t(translations.inspired)}
          </h2>
          <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto">
            {t(translations.inspiredText)}
          </p>
        </div>
        
        {/* Thank You, Emvi */}
        <GradientBackground variant="premium" className="my-16 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6 text-center">
            {t(translations.thankYou)}
          </h2>
          <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto">
            {t(translations.thankYouText)}
          </p>
        </GradientBackground>
        
        {/* CTA Section */}
        <div className="mt-16 py-16 px-8 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 rounded-3xl shadow-sm">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-8">
              {t(translations.ctaHeading)}
            </h2>
            <Link to="/auth/signup">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-md">
                {t(translations.ctaButton)}
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
