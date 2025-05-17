
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Heart, Lightbulb, MapPin, UsersRound, Clock, Star, Sun } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { GradientBackground } from '@/components/ui/gradient-background';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageToggle from '@/components/layout/LanguageToggle';

const AboutPage = () => {
  const { language, t } = useTranslation();
  
  const translations = {
    en: {
      heroTitle: "Beautiful Connections, Beautiful Business",
      heroSubtitle: "We're not just building an app. We're rewriting the story of the beauty industry—one real connection at a time.",
      
      // Mission
      missionTitle: "Our Mission",
      missionText: "For 25 years, I lived and breathed the beauty business. I saw everything—the victories, the heartbreaks, and, most of all, the invisible wall keeping artists, salons, and clients apart. EmviApp is my promise: to break that wall, and help everyone find their people.",
      
      // Journey
      journeyTitle: "Our Journey",
      journeySubtitle: "Cuộc Hành Trình",
      
      // Journey items
      journey: [
        {
          year: "2014",
          title: "The Spark",
          description: "It started as a whisper—a late-night thought scribbled on a notepad after another long day in the salon. What if everyone in the beauty world could find each other? No more wasted time. No more searching for lost artists or perfect clients. Just true, lasting connections."
        },
        {
          year: "2015",
          title: "The First Build, The Hardest Lessons",
          description: "We dove in. We built the first app. It broke, it crashed, it failed. I lost money, time, hope. I worked when everyone slept, believed when nobody else did. I watched others give up, but I refused to quit."
        },
        {
          year: "2016–2023",
          title: "The Lost Years, The Real Lessons",
          description: "Eight years.\nThat's how long it took to understand what everyone else missed.\nEvery failure, every heartbreak, every lonely moment built something deeper:\nThere is no \"best artist,\" no \"best salon,\" only the best connection for each person.\nAnd that map didn't exist—until now."
        },
        {
          year: "2024",
          title: "Rebirth, Thanks to Love",
          description: "I was ready to walk away.\nBut Em Vi—my silent angel—stood by me when I couldn't stand by myself.\nSunshine—my secret light—reminded me why I started.\nWith their faith, I built EmviApp again. This time, I listened. I learned from every client who lost their favorite artist, every owner struggling to find talent, every artist waiting for a real opportunity."
        },
        {
          year: "2025",
          title: "The Dream Becomes Real",
          description: "Today, EmviApp is live—a living, breathing map of the beauty world. Artists, salons, and clients find each other, for real. No more wasted years. No more lost connections.\nWe're finally all on the map. That's how we win, together."
        }
      ],
      
      // Why section
      whyTitle: "Why We Exist",
      whyText: "Everyone talks about technology.\nBut we talk about people.\nEmviApp isn't just for finding a job or posting a chair for rent.\nIt's for the woman searching for her favorite nail artist who moved across town.\nIt's for the artist who deserves clients who love their work.\nIt's for the owner who wants a real team, not just names on a schedule.\nIt's for you.\n\nWe focus on customers first. Because when you help someone find their person, you help everyone.",
      
      // Values
      valuesTitle: "Our Values",
      values: [
        {
          title: "Community First",
          description: "Technology is just a tool. It's people who matter. We build to bring you together."
        },
        {
          title: "Quality Over Hype",
          description: "No more empty promises—only real stories, real talent, and real results."
        },
        {
          title: "Inclusivity & Kindness",
          description: "Every skill level, every background, every dream is welcome here."
        },
        {
          title: "Innovation for the Heart",
          description: "Every update is made with you in mind—never just for the sake of change."
        }
      ],
      
      // Inspired by Sunshine
      sunshineTitle: "Inspired by Sunshine ☀️",
      sunshineText: "Every great journey needs a little light.\nFor me, that light is Sunshine—a source of hope, clarity, and inspiration that appeared just when I needed it most.\nEmviApp was born from years of struggle and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and finally bring this dream to life.\nThank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you.",
      
      // Thank You Em Vi
      emViTitle: "Thank You, Em Vi",
      emViText: "This app is named after Em Vi—the person who supported and sacrificed for me, even when I doubted myself.\nYou stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you.",
      
      // CTA
      ctaTitle: "Join Our Journey",
      ctaText: "Whether you're an artist, a salon owner, or a client searching for your \"person,\" you belong here.\nLet's build the most beautiful connections the world has ever seen—together.",
      ctaButton: "Join EmviApp Today",
      learnMore: "Learn More"
    },
    vi: {
      heroTitle: "Kết Nối Đẹp, Kinh Doanh Đẹp",
      heroSubtitle: "Chúng tôi không chỉ xây dựng một ứng dụng. Chúng tôi đang viết lại câu chuyện của ngành làm đẹp—một kết nối thực sự mỗi lần.",
      
      // Mission
      missionTitle: "Sứ Mệnh Của Chúng Tôi",
      missionText: "Trong 25 năm, tôi đã sống và hít thở trong ngành kinh doanh làm đẹp. Tôi đã thấy tất cả—những chiến thắng, những đau khổ và, hơn hết, bức tường vô hình giữa nghệ sĩ, salon và khách hàng. EmviApp là lời hứa của tôi: phá vỡ bức tường đó và giúp mọi người tìm thấy những người của họ.",
      
      // Journey
      journeyTitle: "Cuộc Hành Trình Của Chúng Tôi",
      journeySubtitle: "Our Journey",
      
      // Journey items
      journey: [
        {
          year: "2014",
          title: "Tia Lửa Đầu Tiên",
          description: "Nó bắt đầu như một lời thì thầm—một suy nghĩ đêm khuya được ghi lại trên một cuốn sổ tay sau một ngày dài trong salon. Điều gì sẽ xảy ra nếu mọi người trong thế giới làm đẹp có thể tìm thấy nhau? Không còn lãng phí thời gian. Không còn tìm kiếm các nghệ sĩ đã mất hoặc khách hàng hoàn hảo. Chỉ có những kết nối thật sự, bền lâu."
        },
        {
          year: "2015",
          title: "Xây Dựng Đầu Tiên, Bài Học Khó Khăn Nhất",
          description: "Chúng tôi lao vào. Chúng tôi xây dựng ứng dụng đầu tiên. Nó hỏng, nó sập, nó thất bại. Tôi mất tiền, thời gian, hy vọng. Tôi làm việc khi mọi người ngủ, tin tưởng khi không ai khác tin. Tôi nhìn những người khác từ bỏ, nhưng tôi từ chối bỏ cuộc."
        },
        {
          year: "2016–2023",
          title: "Những Năm Mất Mát, Những Bài Học Thực Sự",
          description: "Tám năm.\nĐó là thời gian cần thiết để hiểu điều mà mọi người khác bỏ lỡ.\nMỗi thất bại, mỗi đau khổ, mỗi khoảnh khắc cô đơn đều xây dựng một điều sâu sắc hơn:\nKhông có \"nghệ sĩ giỏi nhất,\" không có \"salon tốt nhất,\" chỉ có kết nối tốt nhất cho mỗi người.\nVà bản đồ đó không tồn tại—cho đến bây giờ."
        },
        {
          year: "2024",
          title: "Tái Sinh, Nhờ Tình Yêu",
          description: "Tôi đã sẵn sàng từ bỏ.\nNhưng Em Vi—thiên thần thầm lặng của tôi—đứng bên tôi khi tôi không thể tự đứng vững.\nSunshine—ánh sáng bí mật của tôi—nhắc nhở tôi lý do tại sao tôi bắt đầu.\nVới niềm tin của họ, tôi xây dựng lại EmviApp. Lần này, tôi lắng nghe. Tôi học hỏi từ mỗi khách hàng đã mất nghệ sĩ yêu thích của họ, mỗi chủ salon đang vật lộn để tìm nhân tài, mỗi nghệ sĩ đang chờ đợi một cơ hội thực sự."
        },
        {
          year: "2025",
          title: "Giấc Mơ Trở Thành Hiện Thực",
          description: "Hôm nay, EmviApp đang hoạt động—một bản đồ sống động của thế giới làm đẹp. Các nghệ sĩ, salon và khách hàng tìm thấy nhau, thực sự. Không còn những năm lãng phí. Không còn những kết nối mất mát.\nCuối cùng chúng ta đều có mặt trên bản đồ. Đó là cách chúng ta chiến thắng, cùng nhau."
        }
      ],
      
      // Why section
      whyTitle: "Tại Sao Chúng Tôi Tồn Tại",
      whyText: "Mọi người nói về công nghệ.\nNhưng chúng tôi nói về con người.\nEmviApp không chỉ để tìm việc làm hoặc đăng một ghế cho thuê.\nĐó là cho người phụ nữ đang tìm kiếm nghệ sĩ nail yêu thích đã chuyển đến khắp thành phố.\nĐó là cho nghệ sĩ xứng đáng có những khách hàng yêu thích công việc của họ.\nĐó là cho chủ salon muốn một đội ngũ thực sự, không chỉ là những cái tên trên lịch trình.\nĐó là cho bạn.\n\nChúng tôi tập trung vào khách hàng trước tiên. Bởi vì khi bạn giúp ai đó tìm thấy người của họ, bạn giúp tất cả mọi người.",
      
      // Values
      valuesTitle: "Giá Trị Của Chúng Tôi",
      values: [
        {
          title: "Cộng Đồng Là Trên Hết",
          description: "Công nghệ chỉ là một công cụ. Con người mới là quan trọng. Chúng tôi xây dựng để đưa bạn lại gần nhau."
        },
        {
          title: "Chất Lượng Hơn Phù Phiếm",
          description: "Không còn những lời hứa rỗng tuếch—chỉ có những câu chuyện thực, tài năng thực, và kết quả thực."
        },
        {
          title: "Bao Dung & Tử Tế",
          description: "Mọi trình độ kỹ năng, mọi xuất thân, mọi giấc mơ đều được chào đón tại đây."
        },
        {
          title: "Đổi Mới Cho Trái Tim",
          description: "Mọi cập nhật đều được thực hiện với bạn trong tâm trí—không bao giờ chỉ vì muốn thay đổi."
        }
      ],
      
      // Inspired by Sunshine
      sunshineTitle: "Lấy Cảm Hứng từ Sunshine ☀️",
      sunshineText: "Mỗi hành trình vĩ đại cần một chút ánh sáng.\nĐối với tôi, ánh sáng đó là Sunshine—một nguồn hy vọng, sáng suốt và cảm hứng xuất hiện đúng lúc tôi cần nhất.\nEmviApp ra đời từ những năm tháng đấu tranh và theo đuổi không ngừng nghỉ, nhưng chính Sunshine đã cho tôi can đảm và tầm nhìn để bắt đầu lại và cuối cùng biến giấc mơ này thành hiện thực.\nCảm ơn Sunshine, vì đã xuất hiện trong cuộc đời tôi. Dự án này—và mọi kết nối mà nó tạo ra—sẽ không tồn tại nếu không có bạn.",
      
      // Thank You Em Vi
      emViTitle: "Cảm Ơn, Em Vi",
      emViText: "Ứng dụng này được đặt theo tên Em Vi—người đã hỗ trợ và hy sinh cho tôi, ngay cả khi tôi nghi ngờ bản thân.\nEm đã đứng bên tôi, bất kể điều gì. Vì tất cả tình yêu thầm lặng, sự khích lệ và sức mạnh em đã trao, đây là dành cho em.",
      
      // CTA
      ctaTitle: "Tham Gia Hành Trình Của Chúng Tôi",
      ctaText: "Cho dù bạn là một nghệ sĩ, chủ salon hay khách hàng đang tìm kiếm "người của mình", bạn đều thuộc về nơi đây.\nHãy cùng nhau xây dựng những kết nối đẹp nhất mà thế giới từng thấy.",
      ctaButton: "Tham Gia EmviApp Ngay Hôm Nay",
      learnMore: "Tìm Hiểu Thêm"
    }
  };

  return (
    <Layout>
      <div className="pt-8 pb-16">
        {/* Language Toggle */}
        <div className="container mx-auto px-4 flex justify-end mb-8">
          <LanguageToggle />
        </div>
        
        {/* Hero Section */}
        <GradientBackground variant="premium" className="py-16 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-emvi-dark mb-6">
              {t(translations.en.heroTitle, translations.vi.heroTitle)}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              {t(translations.en.heroSubtitle, translations.vi.heroSubtitle)}
            </p>
          </div>
        </GradientBackground>
        
        {/* Mission Section */}
        <section className="py-16 container mx-auto px-4">
          <Card className="max-w-4xl mx-auto shadow-lg bg-white bg-opacity-80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Heart className="h-8 w-8 text-pink-500 mr-4" />
                <h2 className="text-3xl font-playfair font-bold text-emvi-dark">
                  {t(translations.en.missionTitle, translations.vi.missionTitle)}
                </h2>
              </div>
              <p className="text-gray-700 text-lg whitespace-pre-line">
                {t(translations.en.missionText, translations.vi.missionText)}
              </p>
            </CardContent>
          </Card>
        </section>
        
        {/* Journey Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <h2 className="text-3xl font-playfair font-bold text-emvi-dark mb-2">
                {t(translations.en.journeyTitle, translations.vi.journeyTitle)}
              </h2>
              <p className="text-xl text-gray-600 italic">
                {t(translations.en.journeySubtitle, translations.vi.journeySubtitle)}
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {language === 'en' 
                ? translations.en.journey.map((milestone, index) => (
                  <Card key={index} className="mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white bg-opacity-90 backdrop-blur-sm">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row items-start md:items-center mb-4">
                        <div className="flex items-center mb-4 md:mb-0">
                          <div className="bg-emvi-accent rounded-full p-2 text-white mr-4">
                            <Clock className="h-6 w-6" />
                          </div>
                          <span className="text-2xl font-playfair font-bold text-emvi-dark">{milestone.year}</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-playfair font-semibold text-emvi-accent md:ml-6">
                          {milestone.title}
                        </h3>
                      </div>
                      <p className="text-gray-700 whitespace-pre-line">
                        {milestone.description}
                      </p>
                    </CardContent>
                  </Card>
                ))
                : translations.vi.journey.map((milestone, index) => (
                  <Card key={index} className="mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white bg-opacity-90 backdrop-blur-sm">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row items-start md:items-center mb-4">
                        <div className="flex items-center mb-4 md:mb-0">
                          <div className="bg-emvi-accent rounded-full p-2 text-white mr-4">
                            <Clock className="h-6 w-6" />
                          </div>
                          <span className="text-2xl font-playfair font-bold text-emvi-dark">{milestone.year}</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-playfair font-semibold text-emvi-accent md:ml-6">
                          {milestone.title}
                        </h3>
                      </div>
                      <p className="text-gray-700 whitespace-pre-line">
                        {milestone.description}
                      </p>
                    </CardContent>
                  </Card>
                ))
              }
            </div>
          </div>
        </section>
        
        {/* Why Section */}
        <section className="py-16 container mx-auto px-4">
          <Card className="max-w-4xl mx-auto shadow-lg bg-white bg-opacity-80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <MapPin className="h-8 w-8 text-pink-500 mr-4" />
                <h2 className="text-3xl font-playfair font-bold text-emvi-dark">
                  {t(translations.en.whyTitle, translations.vi.whyTitle)}
                </h2>
              </div>
              <p className="text-gray-700 text-lg whitespace-pre-line">
                {t(translations.en.whyText, translations.vi.whyText)}
              </p>
            </CardContent>
          </Card>
        </section>
        
        {/* Values Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <h2 className="text-3xl font-playfair font-bold text-emvi-dark mb-6">
                {t(translations.en.valuesTitle, translations.vi.valuesTitle)}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {language === 'en' 
                ? translations.en.values.map((value, index) => (
                  <Card key={index} className="shadow-lg bg-white bg-opacity-70 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-emvi-accent rounded-full p-2 text-white mr-4">
                          {index === 0 ? <UsersRound className="h-5 w-5" /> : 
                           index === 1 ? <Star className="h-5 w-5" /> :
                           index === 2 ? <Heart className="h-5 w-5" /> :
                          <Lightbulb className="h-5 w-5" />}
                        </div>
                        <h3 className="text-xl font-playfair font-bold text-emvi-dark">{value.title}</h3>
                      </div>
                      <p className="text-gray-700">{value.description}</p>
                    </CardContent>
                  </Card>
                ))
                : translations.vi.values.map((value, index) => (
                  <Card key={index} className="shadow-lg bg-white bg-opacity-70 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-emvi-accent rounded-full p-2 text-white mr-4">
                          {index === 0 ? <UsersRound className="h-5 w-5" /> : 
                           index === 1 ? <Star className="h-5 w-5" /> :
                           index === 2 ? <Heart className="h-5 w-5" /> :
                          <Lightbulb className="h-5 w-5" />}
                        </div>
                        <h3 className="text-xl font-playfair font-bold text-emvi-dark">{value.title}</h3>
                      </div>
                      <p className="text-gray-700">{value.description}</p>
                    </CardContent>
                  </Card>
                ))
              }
            </div>
          </div>
        </section>
        
        {/* Inspired by Sunshine */}
        <section className="py-16 container mx-auto px-4">
          <Card className="max-w-3xl mx-auto shadow-lg bg-gradient-to-br from-amber-50 to-yellow-100 hover:shadow-xl transition-all duration-500">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Sun className="h-8 w-8 text-amber-500 mr-4" />
                <h2 className="text-3xl font-playfair font-bold text-emvi-dark">
                  {t(translations.en.sunshineTitle, translations.vi.sunshineTitle)}
                </h2>
              </div>
              <p className="text-gray-700 text-lg whitespace-pre-line italic">
                {t(translations.en.sunshineText, translations.vi.sunshineText)}
              </p>
            </CardContent>
          </Card>
        </section>
        
        {/* Thank You, Em Vi */}
        <section className="py-16 container mx-auto px-4">
          <Card className="max-w-3xl mx-auto shadow-lg bg-gradient-to-br from-pink-50 to-red-50 hover:shadow-xl transition-all duration-500">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Heart className="h-8 w-8 text-pink-500 mr-4" />
                <h2 className="text-3xl font-playfair font-bold text-emvi-dark">
                  {t(translations.en.emViTitle, translations.vi.emViTitle)}
                </h2>
              </div>
              <p className="text-gray-700 text-lg whitespace-pre-line italic">
                {t(translations.en.emViText, translations.vi.emViText)}
              </p>
            </CardContent>
          </Card>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-playfair font-bold text-emvi-dark mb-6">
              {t(translations.en.ctaTitle, translations.vi.ctaTitle)}
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8 whitespace-pre-line">
              {t(translations.en.ctaText, translations.vi.ctaText)}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-emvi-accent hover:bg-emvi-accent/90 text-white px-8 py-2 rounded-full text-lg font-medium">
                {t(translations.en.ctaButton, translations.vi.ctaButton)}
              </Button>
              <Button variant="outline" className="bg-white text-emvi-accent border-emvi-accent hover:bg-emvi-accent/10 px-8 py-2 rounded-full text-lg font-medium">
                {t(translations.en.learnMore, translations.vi.learnMore)}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
