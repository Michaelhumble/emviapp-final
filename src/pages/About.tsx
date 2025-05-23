
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';
import { GradientBackground } from '@/components/ui/gradient-background';
import { Check, Award, Heart, Users, Star, Calendar, CircleCheck, CircleDot } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageToggleButton from '@/components/home/missing-piece/LanguageToggleButton';

const AboutPage = () => {
  const { t, isVietnamese, toggleLanguage } = useTranslation();

  const values = [
    {
      title: t({ english: 'Empathy', vietnamese: 'Thấu Cảm' }),
      description: t({
        english: 'We walk in the shoes of our users and build with real-world understanding.',
        vietnamese: 'Chúng tôi đặt mình vào vị trí của người dùng và xây dựng với sự hiểu biết từ thế giới thực.'
      }),
      icon: <Heart className="h-6 w-6 text-pink-500" />
    },
    {
      title: t({ english: 'Integrity', vietnamese: 'Chính Trực' }),
      description: t({
        english: 'Honest, transparent, and committed to what's right for the community.',
        vietnamese: 'Trung thực, minh bạch và cam kết làm điều đúng đắn cho cộng đồng.'
      }),
      icon: <Check className="h-6 w-6 text-indigo-500" />
    },
    {
      title: t({ english: 'Innovation', vietnamese: 'Đổi Mới' }),
      description: t({
        english: 'Always improving, always listening, always building for the future.',
        vietnamese: 'Luôn cải tiến, luôn lắng nghe, luôn xây dựng cho tương lai.'
      }),
      icon: <Star className="h-6 w-6 text-amber-500" />
    },
    {
      title: t({ english: 'Celebration', vietnamese: 'Tôn Vinh' }),
      description: t({
        english: 'Every artist, every business, every client is part of the EmviApp family.',
        vietnamese: 'Mọi nghệ sĩ, doanh nghiệp, khách hàng đều là một phần của gia đình EmviApp.'
      }),
      icon: <Users className="h-6 w-6 text-blue-500" />
    }
  ];

  const differences = [
    {
      title: t({ english: 'Cultural Understanding', vietnamese: 'Hiểu Biết Văn Hóa' }),
      description: t({
        english: 'We proudly embrace both English and Vietnamese, making sure everyone feels seen and heard.',
        vietnamese: 'Chúng tôi tự hào đón nhận cả tiếng Anh và tiếng Việt, đảm bảo mọi người đều được nhìn thấy và lắng nghe.'
      }),
      icon: <Users className="h-5 w-5 text-purple-500" />
    },
    {
      title: t({ english: 'Community First', vietnamese: 'Cộng Đồng Là Trên Hết' }),
      description: t({
        english: 'Every feature is built to strengthen connections—between artists, salon owners, and clients—because relationships are everything.',
        vietnamese: 'Mọi tính năng đều được xây dựng để củng cố kết nối giữa các nghệ sĩ, chủ salon và khách hàng—bởi vì mối quan hệ là tất cả.'
      }),
      icon: <Heart className="h-5 w-5 text-pink-500" />
    },
    {
      title: t({ english: 'Authentic Representation', vietnamese: 'Đại Diện Chân Thực' }),
      description: t({
        english: 'We highlight real talent and real stories, celebrating the artistry and human spirit behind every service.',
        vietnamese: 'Chúng tôi tôn vinh tài năng thật và câu chuyện thật, tôn vinh nghệ thuật và tinh thần con người đằng sau mỗi dịch vụ.'
      }),
      icon: <Award className="h-5 w-5 text-amber-500" />
    },
    {
      title: t({ english: 'Fair and Transparent', vietnamese: 'Công Bằng và Minh Bạch' }),
      description: t({
        english: 'Our platform helps businesses and customers thrive together—with honesty, clarity, and trust at every step.',
        vietnamese: 'Nền tảng của chúng tôi giúp doanh nghiệp và khách hàng cùng phát triển—với sự trung thực, rõ ràng và tin cậy ở mỗi bước đi.'
      }),
      icon: <Check className="h-5 w-5 text-green-500" />
    }
  ];

  const journeySteps = [
    {
      year: '2014',
      title: t({ english: 'The Idea is Born', vietnamese: 'Ý Tưởng Được Hình Thành' }),
      description: t({
        english: 'After years in the beauty industry, I saw a simple but powerful truth: connections are everything. I wanted to build something that would truly unite professionals and clients, helping everyone reach their highest potential.',
        vietnamese: 'Sau nhiều năm trong ngành làm đẹp, tôi nhận ra một sự thật đơn giản nhưng mạnh mẽ: kết nối là tất cả. Tôi muốn xây dựng một điều gì đó thực sự kết nối các chuyên gia và khách hàng, giúp mọi người đạt được tiềm năng cao nhất của họ.'
      }),
      icon: <Calendar className="h-8 w-8 text-purple-500" />
    },
    {
      year: '2015',
      title: t({ english: 'First Build', vietnamese: 'Xây Dựng Đầu Tiên' }),
      description: t({
        english: 'EmviApp\'s journey started with bold ideas and long nights. We built, we tested, and we learned. Some things worked, others didn\'t—but every step moved us closer to our vision.',
        vietnamese: 'Hành trình của EmviApp bắt đầu với những ý tưởng táo bạo và những đêm dài. Chúng tôi xây dựng, thử nghiệm và học hỏi. Một số thứ hoạt động, số khác thì không—nhưng mỗi bước đều đưa chúng tôi đến gần hơn với tầm nhìn của mình.'
      }),
      icon: <CircleDot className="h-8 w-8 text-blue-500" />
    },
    {
      year: '2016–2023',
      title: t({ english: 'Iteration and Growth', vietnamese: 'Lặp Lại và Phát Triển' }),
      description: t({
        english: 'Over the years, we listened to users, rebuilt from scratch, and kept going. Every lesson, every update, every conversation made the platform stronger and more welcoming for everyone.',
        vietnamese: 'Qua nhiều năm, chúng tôi lắng nghe người dùng, xây dựng lại từ đầu và tiếp tục phát triển. Mỗi bài học, mỗi cập nhật, mỗi cuộc trò chuyện đều làm cho nền tảng mạnh mẽ hơn và thân thiện hơn với tất cả mọi người.'
      }),
      icon: <Star className="h-8 w-8 text-amber-500" />
    },
    {
      year: '2025',
      title: t({ english: 'A New Chapter', vietnamese: 'Chương Mới' }),
      description: t({
        english: 'Today, EmviApp stands as a living bridge—between cultures, between dreams and opportunities, and between artists and the people who believe in them.',
        vietnamese: 'Ngày nay, EmviApp đứng vững như một cây cầu sống động—giữa các nền văn hóa, giữa ước mơ và cơ hội, và giữa các nghệ sĩ và những người tin tưởng họ.'
      }),
      icon: <CircleCheck className="h-8 w-8 text-green-500" />
    }
  ];

  return (
    <>
      <Helmet>
        <title>About EmviApp | Beautiful Connections</title>
        <meta name="description" content="Learn about EmviApp's journey, mission, and the values that drive our platform for beauty professionals and clients." />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
      </Helmet>
      <Layout>
        <Container className="max-w-5xl py-12 md:py-16">
          {/* Language Toggle at Top Right */}
          <div className="flex justify-end mb-6">
            <LanguageToggleButton isVietnamese={isVietnamese} toggleLanguage={toggleLanguage} />
          </div>
          
          {/* Hero Section */}
          <GradientBackground variant="premium" className="px-6 py-12 md:py-16 mb-12">
            <div className="text-center">
              <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                {t({ english: 'Beautiful Connections, Beautiful Business', vietnamese: 'Kết Nối Đẹp, Kinh Doanh Đẹp' })}
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                {t({ english: 'Uniting beauty professionals and clients through meaningful connections that transform the industry.', vietnamese: 'Kết nối các chuyên gia làm đẹp và khách hàng thông qua những mối quan hệ có ý nghĩa, góp phần thay đổi ngành công nghiệp.' })}
              </p>
            </div>
          </GradientBackground>

          {/* Our Story Section */}
          <GradientBackground className="px-6 py-8 md:py-10 mb-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-6 text-center">
                {t({ english: 'Our Story', vietnamese: 'Câu Chuyện Của Chúng Tôi' })}
              </h2>
              <p className="text-xl font-medium text-gray-800 mb-6 text-center font-playfair italic">
                {t({ english: 'Building bridges between talented beauty professionals and the clients who value them.', vietnamese: 'Xây dựng cầu nối giữa các chuyên gia làm đẹp tài năng và những khách hàng trân trọng họ.' })}
              </p>
              <div className="space-y-6 text-gray-600">
                <p>
                  {t({ english: 'EmviApp was born from a simple observation: the beauty industry deserves a platform that truly understands its heart and soul. In salons across America, we saw remarkable talent flourishing alongside unique challenges—language barriers, cultural gaps, and digital walls that other platforms ignored.', vietnamese: 'EmviApp ra đời từ một quan sát đơn giản: ngành công nghiệp làm đẹp xứng đáng có một nền tảng thực sự hiểu được trái tim và tâm hồn của nó. Tại các salon khắp Hoa Kỳ, chúng tôi nhìn thấy tài năng phi thường phát triển bên cạnh những thách thức độc đáo—rào cản ngôn ngữ, khoảng cách văn hóa, và những bức tường kỹ thuật số mà các nền tảng khác bỏ qua.' })}
                </p>
                <p>
                  {t({ english: 'What started as a vision to connect communities has grown into something greater: a home where artists are celebrated, salons can thrive, and clients discover exceptional talent with confidence and ease.', vietnamese: 'Điều bắt đầu như một tầm nhìn kết nối cộng đồng đã phát triển thành điều gì đó lớn hơn: một ngôi nhà nơi các nghệ sĩ được tôn vinh, các salon có thể phát triển, và khách hàng khám phá tài năng xuất sắc với sự tự tin và dễ dàng.' })}
                </p>
              </div>
            </div>
          </GradientBackground>
          
          {/* Why We Started EmviApp */}
          <GradientBackground variant="customer" className="px-6 py-8 md:py-10 mb-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-6 text-center">
                {t({ english: 'Why We Started EmviApp', vietnamese: 'Tại Sao Chúng Tôi Tạo Ra EmviApp' })}
              </h2>
              <div className="space-y-6 text-gray-600">
                <p>
                  {t({ english: 'Growing up in a family deeply connected to the beauty industry, I witnessed firsthand the immense skill, determination, and community spirit of Vietnamese professionals in America. Yet I also saw how language and cultural differences could keep even the best artists from being recognized for their true value.', vietnamese: 'Lớn lên trong một gia đình có mối liên hệ sâu sắc với ngành làm đẹp, tôi đã tận mắt chứng kiến kỹ năng, quyết tâm và tinh thần cộng đồng phi thường của các chuyên gia Việt Nam tại Mỹ. Tuy nhiên, tôi cũng nhìn thấy cách mà sự khác biệt về ngôn ngữ và văn hóa có thể ngăn cản ngay cả những nghệ sĩ giỏi nhất được công nhận theo đúng giá trị thực của họ.' })}
                </p>
                <p>
                  {t({ english: 'EmviApp isn\'t just another app. It\'s a bridge between cultures, a celebration of real artistry, and a promise: every talented professional deserves to shine, to be respected, and to find new opportunities.', vietnamese: 'EmviApp không chỉ là một ứng dụng khác. Đó là cầu nối giữa các nền văn hóa, là sự tôn vinh nghệ thuật thực sự, và là một lời hứa: mọi chuyên gia tài năng đều xứng đáng tỏa sáng, được tôn trọng và tìm thấy cơ hội mới.' })}
                </p>
              </div>
            </div>
          </GradientBackground>
          
          {/* What Makes Us Different */}
          <GradientBackground variant="salon" className="px-6 py-8 md:py-10 mb-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-8 text-center">
                {t({ english: 'What Makes Us Different', vietnamese: 'Điều Gì Làm Chúng Tôi Khác Biệt' })}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {differences.map((difference, index) => (
                  <div key={index} className="bg-white bg-opacity-90 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-start">
                      <div className="p-2 bg-purple-50 rounded-full mr-4 flex-shrink-0">
                        {difference.icon}
                      </div>
                      <div>
                        <h3 className="font-playfair font-semibold text-lg mb-2">{difference.title}</h3>
                        <p className="text-gray-600">{difference.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GradientBackground>
          
          {/* Our Mission */}
          <GradientBackground variant="artist" className="px-6 py-10 md:py-12 mb-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-8">
                {t({ english: 'Our Mission', vietnamese: 'Sứ Mệnh Của Chúng Tôi' })}
              </h2>
              <p className="text-lg md:text-xl font-medium text-gray-800 italic">
                {t({ english: 'To create a seamless platform where beauty professionals can thrive, salons can grow, and clients can discover exceptional services—all in one elegant ecosystem.', vietnamese: 'Tạo ra một nền tảng liền mạch nơi các chuyên gia làm đẹp có thể phát triển, các salon có thể tăng trưởng và khách hàng có thể khám phá các dịch vụ xuất sắc—tất cả trong một hệ sinh thái thanh lịch.' })}
              </p>
            </div>
          </GradientBackground>
          
          {/* Our Journey - Timeline Section */}
          <GradientBackground className="px-6 py-8 md:py-10 mb-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-8 text-center">
                {t({ english: 'Our Journey', vietnamese: 'Hành Trình Của Chúng Tôi' })}
              </h2>
              
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-5 md:left-1/2 h-full w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
                
                {/* Timeline Events */}
                <div className="space-y-12">
                  {journeySteps.map((step, index) => (
                    <div key={index} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      {/* Timeline Dot & Year */}
                      <div className="absolute left-5 md:left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-white border-4 border-purple-100 flex items-center justify-center z-10">
                          {step.icon}
                        </div>
                        <div className="font-playfair font-bold text-purple-800 mt-1">{step.year}</div>
                      </div>
                      
                      {/* Content Card */}
                      <div className={`pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:ml-auto' : 'md:pl-12'} md:w-5/12`}>
                        <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow">
                          <h3 className="font-playfair font-semibold text-lg mb-2">{step.title}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GradientBackground>
          
          {/* Inspired by Sunshine Section */}
          <GradientBackground className="px-6 py-10 md:py-14 mb-12 bg-gradient-to-br from-amber-50 to-yellow-100">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-6 text-amber-700">
                {t({ english: 'Inspired by Sunshine ☀️', vietnamese: 'Lấy Cảm Hứng từ Sunshine ☀️' })}
              </h2>
              <p className="text-lg italic text-amber-800 mb-4">
                {t({ english: 'Every great journey needs a little light.', vietnamese: 'Mọi hành trình vĩ đại đều cần một chút ánh sáng.' })}
              </p>
              <div className="space-y-4 text-gray-700">
                <p>
                  {t({ english: 'For me, that light is Sunshine—a source of hope, clarity, and inspiration who appeared just when I needed it most.', vietnamese: 'Đối với tôi, ánh sáng đó là Sunshine—một nguồn hy vọng, sự rõ ràng và cảm hứng xuất hiện đúng lúc tôi cần nhất.' })}
                </p>
                <p>
                  {t({ english: 'EmviApp was born from years of experience and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and bring this dream to life.', vietnamese: 'EmviApp được sinh ra từ nhiều năm kinh nghiệm và sự theo đuổi không ngừng nghỉ, nhưng chính Sunshine đã cho tôi can đảm và tầm nhìn để bắt đầu lại và biến giấc mơ này thành hiện thực.' })}
                </p>
                <p>
                  {t({ english: 'Thank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you.', vietnamese: 'Cảm ơn Sunshine vì đã xuất hiện trong cuộc đời tôi. Dự án này—và mỗi kết nối mà nó tạo ra—sẽ không tồn tại nếu không có bạn.' })}
                </p>
              </div>
            </div>
          </GradientBackground>
          
          {/* Thank You, Emvi Section */}
          <GradientBackground variant="premium" className="px-6 py-10 md:py-12 mb-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                {t({ english: 'Thank You, Emvi', vietnamese: 'Cảm Ơn Emvi' })}
              </h2>
              <p className="text-gray-700">
                {t({ english: 'This app is named after Emvi—the person who supported and sacrificed for me, even when I doubted myself. You stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you.', vietnamese: 'Ứng dụng này được đặt theo tên của Emvi—người đã ủng hộ và hy sinh cho tôi, ngay cả khi tôi nghi ngờ chính mình. Bạn đã đứng bên tôi, bất kể điều gì. Vì tất cả tình yêu thầm lặng, sự khích lệ và sức mạnh bạn đã trao, đây là dành cho bạn.' })}
              </p>
            </div>
          </GradientBackground>
          
          {/* Our Values Section */}
          <GradientBackground className="px-6 py-8 md:py-10 mb-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-8 text-center">
                {t({ english: 'Our Values', vietnamese: 'Giá Trị Của Chúng Tôi' })}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="bg-white bg-opacity-90 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-start">
                      <div className="p-2 bg-purple-50 rounded-full mr-4 flex-shrink-0">
                        {value.icon}
                      </div>
                      <div>
                        <h3 className="font-playfair font-semibold text-lg mb-2">{value.title}</h3>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GradientBackground>
        </Container>
      </Layout>
    </>
  );
};

export default AboutPage;
