
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Logo from '@/components/ui/Logo';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link2, Lightbulb, UserHeart, Star, Clock, Sun, Heart } from 'lucide-react';
import { useTranslation, Translation } from '@/hooks/useTranslation';

// Timeline data structure
interface TimelineItem {
  year: string;
  title: {
    english: string;
    vietnamese: string;
  };
  content: {
    english: string;
    vietnamese: string;
  };
  icon: React.ReactNode;
}

const About = () => {
  const { t, language, setLanguage } = useTranslation();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger animations after component mount
    setIsAnimated(true);
  }, []);

  // Timeline data
  const timelineItems: TimelineItem[] = [
    {
      year: "2014",
      title: {
        english: "The Spark",
        vietnamese: "Ý Tưởng Ra Đời"
      },
      content: {
        english: "After years in beauty, I saw an important gap that needed to be filled. A vision formed to create something that would truly connect beauty professionals and clients.",
        vietnamese: "Sau nhiều năm trong ngành làm đẹp, tôi nhận thấy một khoảng trống quan trọng cần được lấp đầy. Một tầm nhìn đã hình thành để tạo ra điều gì đó thực sự kết nối các chuyên gia làm đẹp và khách hàng."
      },
      icon: <Lightbulb className="h-6 w-6" />
    },
    {
      year: "2015",
      title: {
        english: "The First Effort & Hardship",
        vietnamese: "Nỗ Lực Đầu Tiên & Khó Khăn"
      },
      content: {
        english: "Building the first mobile app began with hope but met tough technical challenges. Even in failure, the dream lived on through persistence.",
        vietnamese: "Việc xây dựng ứng dụng di động đầu tiên bắt đầu với nhiều hy vọng nhưng đối mặt với những thách thức kỹ thuật khó khăn. Mặc dù thất bại, giấc mơ vẫn sống nhờ sự kiên trì."
      },
      icon: <Clock className="h-6 w-6" />
    },
    {
      year: "2016–2023",
      title: {
        english: "The Years of Learning & Growth",
        vietnamese: "Những Năm Học Hỏi & Phát Triển"
      },
      content: {
        english: "Seven years of heartbreak, learning, and rebuilding. Through countless experiments, market research, and personal sacrifice, the vision grew but the mission never changed.",
        vietnamese: "Bảy năm đau lòng, học hỏi và tái thiết. Qua vô số lần thử nghiệm, nghiên cứu thị trường và hy sinh cá nhân, tầm nhìn phát triển nhưng sứ mệnh vẫn không thay đổi."
      },
      icon: <Star className="h-6 w-6" />
    },
    {
      year: "2024",
      title: {
        english: "New Hope, New Beginning",
        vietnamese: "Hy Vọng Mới, Khởi Đầu Mới"
      },
      content: {
        english: "With new determination and inspiration from Sunshine, EmviApp was rebuilt from the ground up. This time: better tech, deeper industry understanding, unwavering focus.",
        vietnamese: "Với quyết tâm mới và nguồn cảm hứng từ Sunshine, EmviApp được xây dựng lại từ đầu. Lần này, với công nghệ tốt hơn, hiểu biết sâu sắc hơn về ngành và sự tập trung không thay đổi."
      },
      icon: <Sun className="h-6 w-6" />
    },
    {
      year: "2025",
      title: {
        english: "The Dream Becomes Real",
        vietnamese: "Giấc Mơ Thành Hiện Thực"
      },
      content: {
        english: "The official launch marks a dream realized after over a decade of perseverance. EmviApp has finally emerged as a lasting platform for beauty industry connection.",
        vietnamese: "Sự ra mắt chính thức đánh dấu một giấc mơ trở thành hiện thực sau hơn một thập kỷ kiên trì. EmviApp cuối cùng đã xuất hiện như một nền tảng bền vững kết nối trong ngành làm đẹp mãi mãi."
      },
      icon: <Star className="h-6 w-6" />
    }
  ];

  return (
    <Layout>
      <div className="bg-[#FDFDFD] min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-[1100px]">
          {/* Logo & Language Switcher */}
          <div className="flex flex-col items-center mb-12">
            <Logo showText={true} size="large" className="mb-6" />
            
            {/* Language Switcher */}
            <div className="flex rounded-full overflow-hidden shadow-sm border border-gray-200">
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  language === 'en' 
                    ? 'bg-gradient-to-r from-[#FF7743] to-[#FFAB73] text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('vi')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  language === 'vi' 
                    ? 'bg-gradient-to-r from-[#FF7743] to-[#FFAB73] text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                VI
              </button>
            </div>
          </div>

          {/* Hero Section */}
          <section className={`mb-16 opacity-0 transform translate-y-4 transition-all duration-700 ${isAnimated ? 'opacity-100 translate-y-0' : ''}`}>
            <h1 className="font-playfair text-center text-4xl md:text-5xl font-extrabold mb-6 text-[#9A7B69] bg-gradient-to-r from-[#FF7743] to-[#FFAB73] bg-clip-text text-transparent">
              {language === 'en' ? 'Beautiful Connections, Beautiful Business' : 'Kết Nối Đẹp, Doanh Nghiệp Đẹp'}
            </h1>
            <p className="text-center text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              {language === 'en' 
                ? "We're not just building an app. We're rewriting the story of the beauty industry—one real connection at a time."
                : "Chúng tôi không chỉ xây dựng một ứng dụng. Chúng tôi đang viết lại câu chuyện của ngành làm đẹp—từng kết nối thực sự."
              }
            </p>
          </section>

          {/* Our Story Section */}
          <section className={`mb-16 opacity-0 transform translate-y-4 transition-all duration-700 delay-100 ${isAnimated ? 'opacity-100 translate-y-0' : ''}`}>
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Link2 className="w-8 h-8 mr-3 text-[#FF7743]" />
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FF7743] to-[#FFAB73] bg-clip-text text-transparent">
                    {language === 'en' ? 'Our Story' : 'Câu Chuyện Của Chúng Tôi'}
                  </h2>
                </div>
                <p className="text-lg text-gray-700">
                  {language === 'en' 
                    ? 'Building bridges between talented beauty professionals and the clients who value them.' 
                    : 'Xây dựng cầu nối giữa các chuyên gia làm đẹp tài năng và khách hàng trân trọng họ.'
                  }
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Why We Started Section */}
          <section className={`mb-16 opacity-0 transform translate-y-4 transition-all duration-700 delay-200 ${isAnimated ? 'opacity-100 translate-y-0' : ''}`}>
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Lightbulb className="w-8 h-8 mr-3 text-[#FF7743]" />
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FF7743] to-[#FFAB73] bg-clip-text text-transparent">
                    {language === 'en' ? 'Why We Started EmviApp' : 'Tại Sao Chúng Tôi Bắt Đầu EmviApp'}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p className="text-lg">
                    {language === 'en' 
                      ? 'EmviApp was born from a simple observation: the beauty industry needed a platform that truly understood its heart and soul. In salons across America, we saw incredible talent flourishing alongside real challenges—language barriers, cultural misunderstandings, and digital gaps that traditional platforms weren\'t addressing.'
                      : 'EmviApp ra đời từ một quan sát đơn giản: ngành công nghiệp làm đẹp cần một nền tảng thực sự hiểu được trái tim và tâm hồn của nó. Tại các tiệm làm đẹp khắp nước Mỹ, chúng tôi nhận thấy những tài năng tuyệt vời đang phát triển cùng với những thách thức thực sự—rào cản ngôn ngữ, hiểu lầm văn hóa, và khoảng cách kỹ thuật số mà các nền tảng truyền thống không giải quyết được.'
                    }
                  </p>
                  <p className="text-lg">
                    {language === 'en'
                      ? 'What started as a vision to connect communities has grown into something more: a home where artists are celebrated, where salons can thrive, and where clients can discover exceptional talent with confidence and ease.'
                      : 'Điều bắt đầu như một tầm nhìn để kết nối cộng đồng đã phát triển thành một điều gì đó lớn hơn: một ngôi nhà nơi các nghệ sĩ được tôn vinh, nơi các tiệm có thể phát triển, và nơi khách hàng có thể khám phá tài năng đặc biệt với sự tự tin và dễ dàng.'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* A Personal Connection Section */}
          <section className={`mb-16 opacity-0 transform translate-y-4 transition-all duration-700 delay-300 ${isAnimated ? 'opacity-100 translate-y-0' : ''}`}>
            <Card className="bg-[#F6F7FB]/90 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <UserHeart className="w-8 h-8 mr-3 text-[#FF7743]" />
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FF7743] to-[#FFAB73] bg-clip-text text-transparent">
                    {language === 'en' ? 'A Personal Connection' : 'Kết Nối Cá Nhân'}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p className="text-lg">
                    {language === 'en'
                      ? 'Growing up in a family deeply connected to the beauty industry, I witnessed firsthand both the immense talent and the unique challenges faced by Vietnamese beauty professionals in America. I saw my family members and their colleagues struggle to have their skills recognized despite their exceptional artistry.'
                      : 'Lớn lên trong một gia đình gắn bó sâu sắc với ngành làm đẹp, tôi đã chứng kiến trực tiếp cả tài năng to lớn và những thách thức độc đáo mà các chuyên gia làm đẹp Việt Nam phải đối mặt tại Mỹ. Tôi đã thấy các thành viên trong gia đình và đồng nghiệp của họ phải đấu tranh để được công nhận kỹ năng mặc dù họ có tài năng nghệ thuật đặc biệt.'
                    }
                  </p>
                  <p className="text-lg italic">
                    {language === 'en'
                      ? 'EmviApp is more than just technology—it\'s a bridge between cultures, a celebration of craft, and a promise that talent will always find its rightful recognition. We\'ve built this platform with love and understanding that can only come from lived experience.'
                      : 'EmviApp không chỉ là công nghệ—đó là cầu nối giữa các nền văn hóa, sự tôn vinh kỹ năng, và lời hứa rằng tài năng sẽ luôn được công nhận xứng đáng. Chúng tôi đã xây dựng nền tảng này với tình yêu và sự thấu hiểu chỉ có thể đến từ trải nghiệm sống.'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* What Makes Us Different Section */}
          <section className={`mb-16 opacity-0 transform translate-y-4 transition-all duration-700 delay-400 ${isAnimated ? 'opacity-100 translate-y-0' : ''}`}>
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Star className="w-8 h-8 mr-3 text-[#FF7743]" />
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FF7743] to-[#FFAB73] bg-clip-text text-transparent">
                    {language === 'en' ? 'What Makes Us Different' : 'Điều Gì Làm Nên Sự Khác Biệt'}
                  </h2>
                </div>
                <p className="text-lg text-gray-700 mb-8">
                  {language === 'en'
                    ? 'Every decision we make, from design to development, starts with a simple question: "How will this help our community?" Our platform is crafted by people who understand the beauty industry from lived experience—not just market research.'
                    : 'Mỗi quyết định chúng tôi đưa ra, từ thiết kế đến phát triển, bắt đầu với một câu hỏi đơn giản: "Điều này sẽ giúp cộng đồng của chúng ta như thế nào?" Nền tảng của chúng tôi được tạo nên bởi những người hiểu ngành làm đẹp từ trải nghiệm sống thực tế—không chỉ từ nghiên cứu thị trường.'
                  }
                </p>
                
                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Cultural Understanding */}
                  <Card className="bg-[#E5DEFF]/50 backdrop-blur-sm shadow-md rounded-xl transition-transform duration-300 hover:transform hover:scale-[1.02] hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-[#E5DEFF] rounded-full flex items-center justify-center mb-4">
                          <span className="text-2xl">🌎</span>
                        </div>
                        <h3 className="font-playfair font-bold text-xl mb-2 text-gray-800">
                          {language === 'en' ? 'Cultural Understanding' : 'Hiểu Biết Văn Hóa'}
                        </h3>
                        <p className="text-gray-600">
                          {language === 'en'
                            ? 'We embrace both English and Vietnamese, recognizing the power of communicating in one\'s native language.'
                            : 'Chúng tôi sử dụng cả tiếng Anh và tiếng Việt, công nhận sức mạnh của việc giao tiếp bằng tiếng mẹ đẻ.'
                          }
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Community First */}
                  <Card className="bg-[#FEF7CD]/50 backdrop-blur-sm shadow-md rounded-xl transition-transform duration-300 hover:transform hover:scale-[1.02] hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-[#FEF7CD] rounded-full flex items-center justify-center mb-4">
                          <span className="text-2xl">🤝</span>
                        </div>
                        <h3 className="font-playfair font-bold text-xl mb-2 text-gray-800">
                          {language === 'en' ? 'Community First' : 'Cộng Đồng Là Hàng Đầu'}
                        </h3>
                        <p className="text-gray-600">
                          {language === 'en'
                            ? 'Every feature is built to strengthen connections between artists, salon owners, and clients.'
                            : 'Mỗi tính năng được xây dựng để củng cố kết nối giữa nghệ sĩ, chủ salon và khách hàng.'
                          }
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Authentic Representation */}
                  <Card className="bg-[#FFDEE2]/50 backdrop-blur-sm shadow-md rounded-xl transition-transform duration-300 hover:transform hover:scale-[1.02] hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-[#FFDEE2] rounded-full flex items-center justify-center mb-4">
                          <span className="text-2xl">🎨</span>
                        </div>
                        <h3 className="font-playfair font-bold text-xl mb-2 text-gray-800">
                          {language === 'en' ? 'Authentic Representation' : 'Đại Diện Chân Thực'}
                        </h3>
                        <p className="text-gray-600">
                          {language === 'en'
                            ? 'We showcase real talent and real stories, highlighting the artistry behind every service.'
                            : 'Chúng tôi giới thiệu những tài năng thực và câu chuyện thực, làm nổi bật nghệ thuật đằng sau mỗi dịch vụ.'
                          }
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Fair and Transparent */}
                  <Card className="bg-[#E0F5FF]/50 backdrop-blur-sm shadow-md rounded-xl transition-transform duration-300 hover:transform hover:scale-[1.02] hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-[#E0F5FF] rounded-full flex items-center justify-center mb-4">
                          <span className="text-2xl">🏆</span>
                        </div>
                        <h3 className="font-playfair font-bold text-xl mb-2 text-gray-800">
                          {language === 'en' ? 'Fair and Transparent' : 'Công Bằng và Minh Bạch'}
                        </h3>
                        <p className="text-gray-600">
                          {language === 'en'
                            ? 'We\'ve built a platform where both businesses and customers can thrive with clarity and trust.'
                            : 'Chúng tôi đã xây dựng một nền tảng nơi cả doanh nghiệp và khách hàng có thể phát triển với sự tôn trọng lẫn nhau và minh bạch tuyệt đối.'
                          }
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Journey Timeline Section */}
          <section className={`mb-16 opacity-0 transform translate-y-4 transition-all duration-700 delay-500 ${isAnimated ? 'opacity-100 translate-y-0' : ''}`}>
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center mb-8">
                  <Clock className="w-8 h-8 mr-3 text-[#FF7743]" />
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FF7743] to-[#FFAB73] bg-clip-text text-transparent">
                    {language === 'en' ? 'Our Journey' : 'Hành Trình'}
                  </h2>
                </div>
                
                {/* Timeline */}
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF7743] to-[#FFAB73]"></div>
                  
                  {/* Timeline items */}
                  <div className="ml-12 md:ml-16 space-y-10">
                    {timelineItems.map((item, index) => (
                      <div 
                        key={index}
                        className={`relative opacity-0 transform translate-y-4 transition-all duration-500 ${isAnimated ? 'opacity-100 translate-y-0' : ''}`}
                        style={{ transitionDelay: `${600 + index * 100}ms` }}
                      >
                        {/* Year bubble */}
                        <div className="absolute -left-12 md:-left-16 -top-1 w-8 h-8 rounded-full bg-gradient-to-r from-[#FF7743] to-[#FFAB73] flex items-center justify-center shadow-md">
                          {item.icon}
                        </div>
                        
                        {/* Content card */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                          <h3 className="font-playfair text-xl font-bold flex items-center mb-2">
                            <span className="text-[#FF7743] mr-2">{item.year}</span> — 
                            <span className="ml-2">{language === 'en' ? item.title.english : item.title.vietnamese}</span>
                          </h3>
                          <p className="text-gray-700">
                            {language === 'en' ? item.content.english : item.content.vietnamese}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Thank You Sunshine Section */}
          <section className={`mb-16 opacity-0 transform translate-y-4 transition-all duration-700 delay-700 ${isAnimated ? 'opacity-100 translate-y-0' : ''}`}>
            <Card className="bg-gradient-to-br from-[#FEF7CD]/60 to-[#FFEDBC]/60 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-200 to-amber-300 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <Sun className="w-8 h-8 text-amber-600" />
                  </div>
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold text-amber-700 mb-6">
                    {language === 'en' ? 'Inspired by Sunshine ☀️' : 'Lấy Cảm Hứng Từ Sunshine ☀️'}
                  </h2>
                  <p className="text-lg text-amber-800 italic max-w-2xl">
                    {language === 'en'
                      ? 'Every great journey needs a little light. Sunshine didn\'t just inspire EmviApp—she transformed it. Her belief in our vision kept the flame alive in the darkest times, and her wisdom guides our path forward. This platform exists because someone believed enough to make it happen.'
                      : 'Mỗi hành trình vĩ đại đều cần một chút ánh sáng. Sunshine không chỉ truyền cảm hứng cho EmviApp—cô ấy đã biến đổi nó. Niềm tin của cô vào tầm nhìn của chúng tôi đã giữ cho ngọn lửa sống trong những thời khắc đen tối nhất, và sự khôn ngoan của cô dẫn dắt con đường phía trước của chúng tôi. Nền tảng này tồn tại bởi vì có người đã tin tưởng đủ để biến nó thành hiện thực.'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Thank You Em Vi Section */}
          <section className={`mb-16 opacity-0 transform translate-y-4 transition-all duration-700 delay-800 ${isAnimated ? 'opacity-100 translate-y-0' : ''}`}>
            <Card className="bg-gradient-to-br from-[#FFDEE2]/60 to-[#F9C0FF]/60 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <Heart className="w-8 h-8 text-pink-500" />
                  </div>
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-6">
                    {language === 'en' ? 'Thank You, Em Vi 💖' : 'Cảm Ơn, Em Vi 💖'}
                  </h2>
                  <p className="text-lg text-pink-800 italic max-w-2xl">
                    {language === 'en'
                      ? 'To the woman whose name inspired it all—thank you. Your talent, your perseverance through countless challenges, and your unwavering dedication to your craft showed us what authentic beauty professionals are capable of. This platform carries your spirit in its very name.'
                      : 'Gửi tới người phụ nữ mà tên của cô đã truyền cảm hứng cho tất cả—cảm ơn. Tài năng của em, sự kiên trì của em qua vô số thử thách, và sự cống hiến không lay chuyển của em cho nghề nghiệp đã cho chúng tôi thấy những gì mà các chuyên gia làm đẹp chân chính có thể đạt được. Nền tảng này mang tinh thần của em trong chính cái tên của nó.'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Footer CTA Section */}
          <section className={`mb-16 opacity-0 transform translate-y-4 transition-all duration-700 delay-900 ${isAnimated ? 'opacity-100 translate-y-0' : ''}`}>
            <Card className="bg-gradient-to-br from-[#F6F7FB]/80 to-[#E9ECEF]/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col items-center text-center">
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FF7743] to-[#FFAB73] bg-clip-text text-transparent mb-6">
                    {language === 'en' ? 'Join Our Journey' : 'Tham Gia Hành Trình Của Chúng Tôi'}
                  </h2>
                  <p className="text-lg text-gray-700 max-w-2xl mb-8">
                    {language === 'en'
                      ? 'Whether you\'re an artist, a salon owner, or a client searching for your "person," you belong here. Let\'s build the most beautiful connections the world has ever seen—together.'
                      : 'Cho dù bạn là Người làm đẹp, chủ salon, hay khách hàng đang tìm kiếm "người của mình," bạn đều thuộc về nơi đây. Hãy cùng nhau xây dựng những kết nối đẹp nhất mà thế giới từng thấy.'
                    }
                  </p>
                  <Button className="bg-gradient-to-r from-[#FF7743] to-[#FFAB73] hover:from-[#FF6633] hover:to-[#FF9966] text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all max-w-xs w-full animate-pulse">
                    {language === 'en' ? 'Join EmviApp Today' : 'Tham Gia EmviApp Ngay'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Footer Credit */}
          <div className="text-center text-sm text-gray-500 mt-8 mb-4">
            <p className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent inline-block font-medium">
              Inspired by Sunshine ☀️
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
