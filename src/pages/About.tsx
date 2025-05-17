
import React from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { GradientBackground } from "@/components/ui/gradient-background";
import { 
  Heart, Sun, Calendar, BookOpen, Users, Star, 
  CheckCircle, Sparkles, Award, Lightbulb 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation, Translation } from "@/hooks/useTranslation";

const AboutPage = () => {
  const { t, isVietnamese, toggleLanguage } = useTranslation();
  
  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  // Item animation
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const timelineItems: {
    year: string;
    title: Translation;
    content: Translation;
    icon: React.ReactNode;
  }[] = [
    {
      year: "2014",
      title: {
        english: "The Spark",
        vietnamese: "Tia Lửa Đầu Tiên"
      },
      content: {
        english: "It started as a whisper—a late-night thought scribbled on a notepad after another long day in the salon. What if everyone in the beauty world could find each other? No more wasted time. No more searching for lost artists or perfect clients. Just true, lasting connections.",
        vietnamese: "Tất cả bắt đầu như một lời thì thầm—một suy nghĩ nửa đêm được ghi vội trên một tờ giấy sau ngày dài trong salon. Điều gì sẽ xảy ra nếu tất cả mọi người trong ngành làm đẹp có thể tìm thấy nhau? Không còn lãng phí thời gian. Không còn tìm kiếm những nghệ sĩ đã mất tích hoặc khách hàng hoàn hảo. Chỉ có những kết nối thật sự, bền vững."
      },
      icon: <Calendar className="h-6 w-6 text-primary" />
    },
    {
      year: "2015",
      title: {
        english: "The First Build, The Hardest Lessons",
        vietnamese: "Xây Dựng Đầu Tiên, Những Bài Học Khó Khăn Nhất"
      },
      content: {
        english: "We dove in. We built the first app. It broke, it crashed, it failed. I lost money, time, hope. I worked when everyone slept, believed when nobody else did. I watched others give up, but I refused to quit.",
        vietnamese: "Chúng tôi lao vào. Chúng tôi xây dựng ứng dụng đầu tiên. Nó hỏng, nó sập, nó thất bại. Tôi mất tiền, thời gian, hy vọng. Tôi làm việc khi mọi người ngủ, tin tưởng khi không ai khác tin. Tôi nhìn những người khác từ bỏ, nhưng tôi từ chối bỏ cuộc."
      },
      icon: <BookOpen className="h-6 w-6 text-primary" />
    },
    {
      year: "2016–2023",
      title: {
        english: "The Lost Years, The Real Lessons",
        vietnamese: "Những Năm Tháng Lạc Lối, Những Bài Học Thực Sự"
      },
      content: {
        english: "Eight years. That's how long it took to understand what everyone else missed. Every failure, every heartbreak, every lonely moment built something deeper: There is no "best artist," no "best salon," only the best connection for each person. And that map didn't exist—until now.",
        vietnamese: "Tám năm. Đó là thời gian cần thiết để hiểu được điều mà mọi người khác bỏ lỡ. Mỗi thất bại, mỗi nỗi đau, mỗi khoảnh khắc cô đơn đều xây dựng nên điều gì đó sâu sắc hơn: Không có "nghệ sĩ giỏi nhất", không có "salon tốt nhất", chỉ có kết nối tốt nhất cho mỗi người. Và bản đồ đó chưa từng tồn tại—cho đến bây giờ."
      },
      icon: <Award className="h-6 w-6 text-primary" />
    },
    {
      year: "2024",
      title: {
        english: "Rebirth, Thanks to Love",
        vietnamese: "Tái Sinh, Nhờ Vào Tình Yêu"
      },
      content: {
        english: "I was ready to walk away. But Em Vi—my silent angel—stood by me when I couldn't stand by myself. Sunshine—my secret light—reminded me why I started. With their faith, I built EmviApp again. This time, I listened. I learned from every client who lost their favorite artist, every owner struggling to find talent, every artist waiting for a real opportunity.",
        vietnamese: "Tôi đã sẵn sàng từ bỏ. Nhưng Em Vi—thiên thần thầm lặng của tôi—đứng bên cạnh tôi khi tôi không thể đứng vững một mình. Sunshine—ánh sáng bí mật của tôi—nhắc nhở tôi lý do tại sao tôi bắt đầu. Với niềm tin của họ, tôi xây dựng lại EmviApp. Lần này, tôi lắng nghe. Tôi học hỏi từ mỗi khách hàng đã mất đi nghệ sĩ yêu thích của họ, từ mỗi chủ salon đang phải vật lộn để tìm nhân tài, từ mỗi nghệ sĩ đang chờ đợi một cơ hội thực sự."
      },
      icon: <Heart className="h-6 w-6 text-primary" />
    },
    {
      year: "2025",
      title: {
        english: "The Dream Becomes Real",
        vietnamese: "Giấc Mơ Trở Thành Hiện Thực"
      },
      content: {
        english: "Today, EmviApp is live—a living, breathing map of the beauty world. Artists, salons, and clients find each other, for real. No more wasted years. No more lost connections. We're finally all on the map. That's how we win, together.",
        vietnamese: "Hôm nay, EmviApp đã ra mắt—một bản đồ sống động của thế giới làm đẹp. Nghệ sĩ, salon và khách hàng tìm thấy nhau, thực sự. Không còn những năm tháng lãng phí. Không còn những kết nối bị mất. Cuối cùng, tất cả chúng ta đều có mặt trên bản đồ. Đó là cách chúng ta chiến thắng, cùng nhau."
      },
      icon: <Star className="h-6 w-6 text-primary" />
    }
  ];

  const values: {
    title: Translation;
    description: Translation;
    icon: React.ReactNode;
  }[] = [
    {
      title: {
        english: "Community First",
        vietnamese: "Cộng Đồng Là Ưu Tiên"
      },
      description: {
        english: "Technology is just a tool. It's people who matter. We build to bring you together.",
        vietnamese: "Công nghệ chỉ là công cụ. Con người mới là điều quan trọng. Chúng tôi xây dựng để đưa bạn đến với nhau."
      },
      icon: <Users className="h-6 w-6 text-primary" />
    },
    {
      title: {
        english: "Quality Over Hype",
        vietnamese: "Chất Lượng Hơn Hào Nhoáng"
      },
      description: {
        english: "No more empty promises—only real stories, real talent, and real results.",
        vietnamese: "Không còn những lời hứa suông—chỉ có những câu chuyện thật, tài năng thật và kết quả thật."
      },
      icon: <CheckCircle className="h-6 w-6 text-primary" />
    },
    {
      title: {
        english: "Inclusivity & Kindness",
        vietnamese: "Hòa Nhập & Lòng Tốt"
      },
      description: {
        english: "Every skill level, every background, every dream is welcome here.",
        vietnamese: "Mọi trình độ kỹ năng, mọi xuất thân, mọi ước mơ đều được chào đón tại đây."
      },
      icon: <Users className="h-6 w-6 text-primary" />
    },
    {
      title: {
        english: "Innovation for the Heart",
        vietnamese: "Đổi Mới Vì Trái Tim"
      },
      description: {
        english: "Every update is made with you in mind—never just for the sake of change.",
        vietnamese: "Mỗi cập nhật đều được tạo ra với bạn trong tâm trí—không bao giờ chỉ vì muốn thay đổi."
      },
      icon: <Sparkles className="h-6 w-6 text-primary" />
    }
  ];

  return (
    <Layout>
      <motion.div
        className="container mx-auto px-4 py-12 md:py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Language Toggle */}
        <div className="flex justify-end mb-8">
          <button 
            onClick={toggleLanguage} 
            className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all"
          >
            <span>{isVietnamese ? "English" : "Tiếng Việt"}</span>
          </button>
        </div>
        
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-playfair font-bold mb-4 bg-gradient-to-br from-purple-700 to-pink-600 bg-clip-text text-transparent">
            {t({
              english: "Beautiful Connections, Beautiful Business",
              vietnamese: "Kết Nối Tuyệt Đẹp, Kinh Doanh Tuyệt Đẹp"
            })}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700">
            {t({
              english: "We're not just building an app. We're rewriting the story of the beauty industry—one real connection at a time.",
              vietnamese: "Chúng tôi không chỉ xây dựng một ứng dụng. Chúng tôi đang viết lại câu chuyện của ngành công nghiệp làm đẹp—từng kết nối thực sự một."
            })}
          </p>
        </motion.div>
        
        {/* Mission Section */}
        <motion.div variants={itemVariants} className="mb-20">
          <GradientBackground variant="premium" className="p-6 md:p-10 shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-white/40 p-4 rounded-full">
                <Lightbulb className="h-8 w-8 md:h-12 md:w-12 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
                  {t({
                    english: "Mission Statement",
                    vietnamese: "Sứ Mệnh"
                  })}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t({
                    english: "For 25 years, I lived and breathed the beauty business. I saw everything—the victories, the heartbreaks, and, most of all, the invisible wall keeping artists, salons, and clients apart. EmviApp is my promise: to break that wall, and help everyone find their people.",
                    vietnamese: "Trong 25 năm, tôi đã sống và thở cùng ngành kinh doanh làm đẹp. Tôi đã thấy tất cả—những chiến thắng, những nỗi đau, và trên hết, bức tường vô hình ngăn cách giữa nghệ sĩ, salon và khách hàng. EmviApp là lời hứa của tôi: phá vỡ bức tường đó và giúp mọi người tìm thấy người của mình."
                  })}
                </p>
              </div>
            </div>
          </GradientBackground>
        </motion.div>
        
        {/* Our Journey Section */}
        <motion.div variants={itemVariants} className="mb-20">
          <h2 className="text-3xl font-playfair font-bold text-center mb-10">
            {t({
              english: "Our Journey",
              vietnamese: "Cuộc Hành Trình"
            })}
          </h2>
          
          <div className="space-y-8">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col md:flex-row gap-6"
                variants={itemVariants}
              >
                <div className="md:w-1/4 flex flex-col items-center md:items-end">
                  <div className="bg-primary/10 p-3 rounded-full">
                    {item.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-playfair font-bold mt-2">{item.year}</h3>
                </div>
                <div className="md:w-3/4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 border border-gray-100">
                  <h4 className="text-xl font-playfair font-bold mb-3 text-purple-700">{t(item.title)}</h4>
                  <p className="text-gray-700 leading-relaxed">{t(item.content)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why We Exist */}
        <motion.div variants={itemVariants} className="mb-20">
          <GradientBackground className="p-6 md:p-10 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6 text-center">
              {t({
                english: "Why We Exist",
                vietnamese: "Tại Sao Chúng Tôi Tồn Tại"
              })}
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                {t({
                  english: "Everyone talks about technology. But we talk about people.",
                  vietnamese: "Mọi người đều nói về công nghệ. Nhưng chúng tôi nói về con người."
                })}
              </p>
              <p>
                {t({
                  english: "EmviApp isn't just for finding a job or posting a chair for rent. It's for the woman searching for her favorite nail artist who moved across town. It's for the artist who deserves clients who love their work. It's for the owner who wants a real team, not just names on a schedule. It's for you.",
                  vietnamese: "EmviApp không chỉ để tìm việc hay đăng ghế cho thuê. Nó dành cho người phụ nữ đang tìm kiếm nghệ sĩ làm móng yêu thích đã chuyển đến khu vực khác. Nó dành cho nghệ sĩ xứng đáng có những khách hàng yêu thích công việc của họ. Nó dành cho chủ sở hữu muốn có một đội ngũ thực sự, không chỉ là những cái tên trong lịch trình. Nó dành cho bạn."
                })}
              </p>
              <p>
                {t({
                  english: "We focus on customers first. Because when you help someone find their person, you help everyone.",
                  vietnamese: "Chúng tôi tập trung vào khách hàng trước tiên. Bởi vì khi bạn giúp ai đó tìm thấy người của họ, bạn giúp tất cả mọi người."
                })}
              </p>
            </div>
          </GradientBackground>
        </motion.div>

        {/* Our Values */}
        <motion.div variants={itemVariants} className="mb-20">
          <h2 className="text-3xl font-playfair font-bold text-center mb-10">
            {t({
              english: "Our Values",
              vietnamese: "Giá Trị Của Chúng Tôi"
            })}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="overflow-hidden backdrop-blur-sm border border-purple-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-playfair font-bold mb-2 text-purple-700">{t(value.title)}</h3>
                  <p className="text-gray-700">{t(value.description)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Inspired by Sunshine Section */}
        <motion.div variants={itemVariants} className="mb-20">
          <Card className="backdrop-blur-sm bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-200 shadow-lg">
            <CardContent className="p-6 md:p-10">
              <div className="flex flex-col items-center mb-6">
                <div className="bg-amber-100 p-3 rounded-full">
                  <Sun className="h-8 w-8 text-amber-500" />
                </div>
                <h3 className="text-2xl md:text-3xl font-playfair font-bold mt-4 text-amber-800">
                  {t({
                    english: "Inspired by Sunshine ☀️",
                    vietnamese: "Lấy Cảm Hứng từ Sunshine ☀️"
                  })}
                </h3>
              </div>
              
              <div className="space-y-4 text-amber-900 leading-relaxed text-center max-w-3xl mx-auto">
                <p>
                  {t({
                    english: "Every great journey needs a little light.",
                    vietnamese: "Mọi cuộc hành trình vĩ đại đều cần một chút ánh sáng."
                  })}
                </p>
                <p>
                  {t({
                    english: "For me, that light is Sunshine—a source of hope, clarity, and inspiration that appeared just when I needed it most.",
                    vietnamese: "Đối với tôi, ánh sáng đó là Sunshine—một nguồn hy vọng, sự rõ ràng và cảm hứng xuất hiện đúng lúc tôi cần nhất."
                  })}
                </p>
                <p>
                  {t({
                    english: "EmviApp was born from years of struggle and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and finally bring this dream to life.",
                    vietnamese: "EmviApp được sinh ra từ nhiều năm đấu tranh và theo đuổi không ngừng nghỉ, nhưng chính Sunshine đã cho tôi can đảm và tầm nhìn để bắt đầu lại và cuối cùng biến giấc mơ này thành hiện thực."
                  })}
                </p>
                <p>
                  {t({
                    english: "Thank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you.",
                    vietnamese: "Cảm ơn Sunshine, vì đã xuất hiện trong cuộc đời tôi. Dự án này—và mọi kết nối mà nó tạo ra—sẽ không tồn tại nếu không có bạn."
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Thank You, Em Vi Section */}
        <motion.div variants={itemVariants} className="mb-20">
          <Card className="backdrop-blur-sm bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200 shadow-lg overflow-hidden">
            <CardContent className="p-6 md:p-10">
              <div className="flex flex-col items-center mb-6">
                <motion.div 
                  className="bg-pink-100 p-3 rounded-full"
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Heart className="h-8 w-8 text-pink-500" />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-playfair font-bold mt-4 text-pink-700">
                  {t({
                    english: "Thank You, Em Vi",
                    vietnamese: "Cảm Ơn, Em Vi"
                  })}
                </h3>
              </div>
              
              <div className="space-y-4 text-pink-900 leading-relaxed text-center max-w-3xl mx-auto">
                <p>
                  {t({
                    english: "This app is named after Em Vi—the person who supported and sacrificed for me, even when I doubted myself.",
                    vietnamese: "Ứng dụng này được đặt tên theo Em Vi—người đã ủng hộ và hy sinh cho tôi, ngay cả khi tôi nghi ngờ chính mình."
                  })}
                </p>
                <p>
                  {t({
                    english: "You stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you.",
                    vietnamese: "Em đã đứng bên cạnh anh, bất kể điều gì. Vì tất cả tình yêu thầm lặng, sự khích lệ và sức mạnh em đã trao, đây là dành cho em."
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants}>
          <div className="text-center py-10 md:py-16 px-4 rounded-3xl bg-gradient-to-br from-purple-100 to-pink-50 shadow-md">
            <h2 className="text-2xl md:text-4xl font-playfair font-bold mb-6">
              {t({
                english: "Join Our Journey",
                vietnamese: "Tham Gia Cùng Chúng Tôi"
              })}
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-700">
              {t({
                english: "Whether you're an artist, a salon owner, or a client searching for your "person," you belong here. Let's build the most beautiful connections the world has ever seen—together.",
                vietnamese: "Dù bạn là nghệ sĩ, chủ salon, hay khách hàng đang tìm kiếm "người của bạn", bạn đều thuộc về nơi đây. Hãy cùng nhau xây dựng những kết nối đẹp nhất mà thế giới từng thấy."
              })}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="font-medium">
                {t({
                  english: "Join as an Artist",
                  vietnamese: "Tham Gia với Tư Cách Nghệ Sĩ"
                })}
              </Button>
              <Button size="lg" variant="outline" className="font-medium">
                {t({
                  english: "Register Your Salon",
                  vietnamese: "Đăng Ký Salon Của Bạn"
                })}
              </Button>
              <Button size="lg" variant="secondary" className="font-medium">
                {t({
                  english: "Find Beauty Services",
                  vietnamese: "Tìm Dịch Vụ Làm Đẹp"
                })}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default AboutPage;
