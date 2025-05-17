
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Sun, HandHeart, Users, Star, Sparkles, Gem } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the translations type
interface Translations {
  [key: string]: {
    en: string;
    vi: string;
  };
}

const About = () => {
  const [language, setLanguage] = useState<'en' | 'vi'>('en');
  const navigate = useNavigate();

  // All translations
  const translations: Translations = {
    hero: {
      en: "Beautiful Connections, Beautiful Business",
      vi: "Kết Nối Đẹp, Kinh Doanh Đẹp"
    },
    heroSubtitle: {
      en: "We're not just building an app. We're rewriting the story of the beauty industry—one real connection at a time.",
      vi: "Chúng tôi không chỉ xây dựng một ứng dụng. Chúng tôi đang viết lại câu chuyện của ngành công nghiệp làm đẹp—từng kết nối thực sự."
    },
    mission: {
      en: "For 25 years, I lived and breathed the beauty business. I saw everything—the victories, the heartbreaks, and, most of all, the invisible wall keeping artists, salons, and clients apart. EmviApp is my promise: to break that wall, and help everyone find their people.",
      vi: "Trong 25 năm, tôi đã sống và hòa mình vào ngành làm đẹp. Tôi đã chứng kiến mọi thứ—những chiến thắng, những đau khổ, và đặc biệt là bức tường vô hình ngăn cách nghệ sĩ, salon, và khách hàng. EmviApp là lời hứa của tôi: phá vỡ bức tường đó và giúp mọi người tìm thấy nhau."
    },
    journeyTitle: {
      en: "Our Journey",
      vi: "Cuộc Hành Trình"
    },
    journey2014: {
      en: "It started as a whisper—a late-night thought scribbled on a notepad after another long day in the salon. What if everyone in the beauty world could find each other? No more wasted time. No more searching for lost artists or perfect clients. Just true, lasting connections.",
      vi: "Nó bắt đầu như một lời thì thầm—một suy nghĩ giữa đêm khuya được ghi vội trên một tờ giấy sau một ngày dài tại salon. Điều gì sẽ xảy ra nếu mọi người trong thế giới làm đẹp có thể tìm thấy nhau? Không còn lãng phí thời gian. Không còn phải tìm kiếm những nghệ sĩ đã mất liên lạc hoặc những khách hàng hoàn hảo. Chỉ có những kết nối thật sự, bền vững."
    },
    journey2015: {
      en: "We dove in. We built the first app. It broke, it crashed, it failed. I lost money, time, hope. I worked when everyone slept, believed when nobody else did. I watched others give up, but I refused to quit.",
      vi: "Chúng tôi lao vào. Chúng tôi xây dựng ứng dụng đầu tiên. Nó hỏng, nó sụp đổ, nó thất bại. Tôi mất tiền, mất thời gian, mất hy vọng. Tôi làm việc khi mọi người ngủ, tin tưởng khi không ai còn tin. Tôi chứng kiến người khác từ bỏ, nhưng tôi từ chối bỏ cuộc."
    },
    journey2016: {
      en: "Eight years.\nThat's how long it took to understand what everyone else missed.\nEvery failure, every heartbreak, every lonely moment built something deeper:\nThere is no \"best artist,\" no \"best salon,\" only the best connection for each person.\nAnd that map didn't exist—until now.",
      vi: "Tám năm.\nĐó là khoảng thời gian cần thiết để hiểu điều mà mọi người đều bỏ lỡ.\nMỗi thất bại, mỗi đau khổ, mỗi khoảnh khắc cô đơn đều xây dựng một điều sâu sắc hơn:\nKhông có \"nghệ sĩ giỏi nhất\", không có \"salon tốt nhất\", chỉ có kết nối tốt nhất cho mỗi người.\nVà tấm bản đồ đó chưa từng tồn tại—cho đến bây giờ."
    },
    journey2024: {
      en: "I was ready to walk away.\nBut Em Vi—my silent angel—stood by me when I couldn't stand by myself.\nSunshine—my secret light—reminded me why I started.\nWith their faith, I built EmviApp again. This time, I listened. I learned from every client who lost their favorite artist, every owner struggling to find talent, every artist waiting for a real opportunity.",
      vi: "Tôi đã sẵn sàng bỏ cuộc.\nNhưng Em Vi—thiên thần thầm lặng của tôi—đã đứng bên cạnh tôi khi tôi không thể đứng vững.\nSunshine—ánh sáng bí mật của tôi—nhắc nhở tôi tại sao tôi bắt đầu.\nVới niềm tin của họ, tôi xây dựng lại EmviApp. Lần này, tôi lắng nghe. Tôi học hỏi từ mỗi khách hàng đã mất liên lạc với nghệ sĩ yêu thích của họ, từ mỗi chủ salon đang vật lộn để tìm tài năng, từ mỗi nghệ sĩ đang chờ đợi một cơ hội thực sự."
    },
    journey2025: {
      en: "Today, EmviApp is live—a living, breathing map of the beauty world. Artists, salons, and clients find each other, for real. No more wasted years. No more lost connections.\nWe're finally all on the map. That's how we win, together.",
      vi: "Hôm nay, EmviApp đã ra mắt—một bản đồ sống động của thế giới làm đẹp. Nghệ sĩ, salon và khách hàng tìm thấy nhau, thực sự. Không còn những năm tháng lãng phí. Không còn những kết nối đã mất.\nCuối cùng chúng ta đều có mặt trên bản đồ. Đó là cách chúng ta cùng chiến thắng."
    },
    whyWeExist: {
      en: "Everyone talks about technology.\nBut we talk about people.\nEmviApp isn't just for finding a job or posting a chair for rent.\nIt's for the woman searching for her favorite nail artist who moved across town.\nIt's for the artist who deserves clients who love their work.\nIt's for the owner who wants a real team, not just names on a schedule.\nIt's for you.\n\nWe focus on customers first. Because when you help someone find their person, you help everyone.",
      vi: "Mọi người đều nói về công nghệ.\nNhưng chúng tôi nói về con người.\nEmviApp không chỉ để tìm việc làm hay đăng ghế cho thuê.\nNó dành cho người phụ nữ tìm kiếm nghệ sĩ làm móng yêu thích đã chuyển đến nơi khác trong thành phố.\nNó dành cho nghệ sĩ xứng đáng có những khách hàng yêu thích công việc của họ.\nNó dành cho người chủ muốn có một đội ngũ thực sự, không chỉ là những cái tên trên lịch trình.\nNó dành cho bạn.\n\nChúng tôi tập trung vào khách hàng trước. Bởi vì khi bạn giúp ai đó tìm thấy người của họ, bạn giúp tất cả mọi người."
    },
    valueTitle: {
      en: "Our Values",
      vi: "Giá Trị Của Chúng Tôi"
    },
    communityFirst: {
      en: "Community First",
      vi: "Cộng Đồng Là Trên Hết"
    },
    communityDesc: {
      en: "Technology is just a tool. It's people who matter. We build to bring you together.",
      vi: "Công nghệ chỉ là công cụ. Chính con người mới là quan trọng. Chúng tôi xây dựng để kết nối mọi người."
    },
    qualityFirst: {
      en: "Quality Over Hype",
      vi: "Chất Lượng Hơn Quảng Cáo"
    },
    qualityDesc: {
      en: "No more empty promises—only real stories, real talent, and real results.",
      vi: "Không còn những lời hứa rỗng tuếch—chỉ có những câu chuyện thật, tài năng thật, và kết quả thật."
    },
    inclusivity: {
      en: "Inclusivity & Kindness",
      vi: "Sự Bao Dung & Lòng Tốt"
    },
    inclusivityDesc: {
      en: "Every skill level, every background, every dream is welcome here.",
      vi: "Mọi trình độ kỹ năng, mọi nguồn gốc, mọi ước mơ đều được chào đón tại đây."
    },
    innovation: {
      en: "Innovation for the Heart",
      vi: "Đổi Mới Cho Trái Tim"
    },
    innovationDesc: {
      en: "Every update is made with you in mind—never just for the sake of change.",
      vi: "Mỗi cập nhật đều được thực hiện với bạn trong tâm trí—không bao giờ chỉ vì muốn thay đổi."
    },
    sunshineTitle: {
      en: "Inspired by Sunshine ☀️",
      vi: "Lấy Cảm Hứng từ Sunshine ☀️"
    },
    sunshineText: {
      en: "Every great journey needs a little light.\nFor me, that light is Sunshine—a source of hope, clarity, and inspiration that appeared just when I needed it most.\nEmviApp was born from years of struggle and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and finally bring this dream to life.\nThank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you.",
      vi: "Mỗi cuộc hành trình vĩ đại đều cần một chút ánh sáng.\nĐối với tôi, ánh sáng đó là Sunshine—một nguồn hy vọng, sự rõ ràng và cảm hứng xuất hiện đúng lúc tôi cần nhất.\nEmviApp ra đời từ nhiều năm đấu tranh và theo đuổi không ngừng, nhưng chính Sunshine đã cho tôi can đảm và tầm nhìn để bắt đầu lại và cuối cùng biến giấc mơ này thành hiện thực.\nCảm ơn Sunshine đã xuất hiện trong cuộc đời tôi. Dự án này—và mọi kết nối mà nó tạo ra—sẽ không tồn tại nếu không có bạn."
    },
    emviTitle: {
      en: "Thank You, Em Vi",
      vi: "Cảm Ơn, Em Vi"
    },
    emviText: {
      en: "This app is named after Em Vi—the person who supported and sacrificed for me, even when I doubted myself.\nYou stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you.",
      vi: "Ứng dụng này được đặt theo tên Em Vi—người đã ủng hộ và hy sinh cho tôi, ngay cả khi tôi nghi ngờ bản thân.\nBạn đã đứng bên tôi, bất kể điều gì. Vì tất cả tình yêu thầm lặng, sự khích lệ và sức mạnh bạn đã trao, điều này là dành cho bạn."
    },
    ctaTitle: {
      en: "Join Our Journey",
      vi: "Tham Gia Cuộc Hành Trình Của Chúng Tôi"
    },
    ctaText: {
      en: "Whether you're an artist, a salon owner, or a client searching for your \"person,\" you belong here.\nLet's build the most beautiful connections the world has ever seen—together.",
      vi: "Cho dù bạn là một nghệ sĩ, chủ salon, hay khách hàng đang tìm kiếm \"người của mình,\" bạn đều thuộc về nơi đây.\nHãy cùng nhau xây dựng những kết nối đẹp nhất mà thế giới từng thấy."
    }
  };

  // Fixed timeline data - ensuring proper commas and colons for all entries
  const timelineData = [
    {
      year: "2014",
      title: {
        en: "The Spark",
        vi: "Tia Lửa"
      },
      content: translations.journey2014
    },
    {
      year: "2015",
      title: {
        en: "The First Build, The Hardest Lessons",
        vi: "Xây Dựng Đầu Tiên, Bài Học Khó Nhất"
      },
      content: translations.journey2015
    },
    {
      year: "2016-2023",
      title: {
        en: "The Lost Years, The Real Lessons",
        vi: "Những Năm Tháng Đã Mất, Những Bài Học Thực Sự"
      },
      content: translations.journey2016
    },
    {
      year: "2024",
      title: {
        en: "Rebirth, Thanks to Love",
        vi: "Tái Sinh, Nhờ Vào Tình Yêu"
      },
      content: translations.journey2024
    },
    {
      year: "2025",
      title: {
        en: "The Dream Becomes Real",
        vi: "Giấc Mơ Trở Thành Hiện Thực"
      },
      content: translations.journey2025
    }
  ];

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'vi' : 'en');
  };

  // Helper function to render multiline text
  const renderMultiline = (text: string) => {
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50">
        {/* Language Toggle */}
        <div className="container mx-auto px-4 pt-8 flex justify-end">
          <Button 
            onClick={toggleLanguage}
            variant="outline"
            className="font-medium rounded-full px-6"
          >
            {language === 'en' ? 'Tiếng Việt' : 'English'}
          </Button>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-emvi-dark mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {translations.hero[language]}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {translations.heroSubtitle[language]}
            </motion.p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="container mx-auto px-4 py-12 md:py-20">
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-0">
              <CardContent className="p-8 md:p-10">
                <p className="font-playfair text-xl md:text-2xl leading-relaxed italic text-emvi-dark">
                  {translations.mission[language]}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Journey Timeline */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <motion.h2 
              className="font-playfair text-3xl md:text-4xl font-bold text-center mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {translations.journeyTitle[language]}
            </motion.h2>

            <div className="space-y-12 md:space-y-24 relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-300 via-pink-300 to-rose-300 transform md:-translate-x-1/2 hidden md:block"></div>
              
              {timelineData.map((item, index) => (
                <motion.div 
                  key={item.year}
                  className={cn(
                    "flex flex-col md:flex-row gap-8 relative",
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  )}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Timeline bubble */}
                  <div className="absolute left-0 md:left-1/2 top-0 w-10 h-10 bg-white border-4 border-purple-300 rounded-full transform translate-x-[-20px] md:translate-x-[-50%] flex items-center justify-center z-10">
                    <span className="text-sm font-bold text-purple-500">{item.year}</span>
                  </div>
                  
                  <div className="md:w-1/2 pt-10 md:pt-0">
                    <Card className="h-full bg-white/80 backdrop-blur-sm shadow-md border-0 overflow-hidden">
                      <CardContent className="p-6 md:p-8">
                        <h3 className="text-xl md:text-2xl font-playfair font-bold text-emvi-dark mb-3">
                          {item.title[language]}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {renderMultiline(item.content[language])}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Why We Exist Section */}
        <div className="container mx-auto px-4 py-16 md:py-24 bg-gradient-to-r from-white to-purple-50">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0">
              <CardContent className="p-8 md:p-12">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-emvi-dark mb-8 text-center">
                  {language === 'en' ? 'Why We Exist' : 'Lý Do Chúng Tôi Tồn Tại'}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p className="text-lg md:text-xl leading-relaxed">
                    {renderMultiline(translations.whyWeExist[language])}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Our Values Section */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-emvi-dark">
              {translations.valueTitle[language]}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <ValueCard 
              icon={<Users className="h-8 w-8 text-purple-500" />}
              title={translations.communityFirst[language]}
              description={translations.communityDesc[language]}
            />
            <ValueCard 
              icon={<Gem className="h-8 w-8 text-pink-500" />}
              title={translations.qualityFirst[language]}
              description={translations.qualityDesc[language]}
            />
            <ValueCard 
              icon={<Heart className="h-8 w-8 text-red-500" />}
              title={translations.inclusivity[language]}
              description={translations.inclusivityDesc[language]}
            />
            <ValueCard 
              icon={<Sparkles className="h-8 w-8 text-amber-500" />}
              title={translations.innovation[language]}
              description={translations.innovationDesc[language]}
            />
          </div>
        </div>

        {/* Inspired by Sunshine Section */}
        <div className="container mx-auto px-4 py-16">
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg border-0 overflow-hidden">
              <CardContent className="p-8 md:p-10 relative">
                <div className="absolute top-6 right-6">
                  <Sun className="h-12 w-12 text-amber-400 animate-pulse" />
                </div>
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-amber-700 mb-6">
                  {translations.sunshineTitle[language]}
                </h2>
                <p className="text-amber-800 leading-relaxed text-lg">
                  {renderMultiline(translations.sunshineText[language])}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Thank You Em Vi Section */}
        <div className="container mx-auto px-4 py-16">
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-gradient-to-br from-rose-50 to-pink-50 shadow-lg border-0 overflow-hidden">
              <CardContent className="p-8 md:p-10 relative">
                <div className="absolute top-6 right-6">
                  <HandHeart className="h-12 w-12 text-rose-400" />
                </div>
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-rose-700 mb-6">
                  {translations.emviTitle[language]}
                </h2>
                <p className="text-rose-800 leading-relaxed text-lg">
                  {renderMultiline(translations.emviText[language])}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Call to Action */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-gradient-to-r from-purple-100 to-pink-100 shadow-xl border-0">
              <CardContent className="p-8 md:p-14">
                <Star className="h-12 w-12 text-purple-400 mx-auto mb-6" />
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-emvi-dark mb-6">
                  {translations.ctaTitle[language]}
                </h2>
                <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                  {renderMultiline(translations.ctaText[language])}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => navigate('/signup')} 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-full text-lg"
                  >
                    {language === 'en' ? 'Join EmviApp Today' : 'Tham Gia EmviApp Ngay'}
                  </Button>
                  <Button 
                    onClick={() => navigate('/contact')} 
                    variant="outline" 
                    className="border-purple-300 hover:border-purple-500 px-8 py-6 rounded-full text-lg"
                  >
                    {language === 'en' ? 'Contact Us' : 'Liên Hệ Với Chúng Tôi'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

// Value Card Component
const ValueCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Card className="h-full bg-white/80 backdrop-blur-sm shadow-md border-0 hover:shadow-lg transition-shadow">
        <CardContent className="p-6 text-center">
          <div className="mb-4 flex justify-center">
            {icon}
          </div>
          <h3 className="font-playfair text-xl font-bold mb-2 text-emvi-dark">
            {title}
          </h3>
          <p className="text-gray-600">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default About;
