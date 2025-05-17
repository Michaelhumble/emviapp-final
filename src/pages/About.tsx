
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import EmviLogo from "@/components/branding/EmviLogo";
import { Button } from "@/components/ui/button";
import { GradientBackground } from "@/components/ui/gradient-background";
import { Card } from "@/components/ui/card";
import { Heart, Users, Award, Navigation, Sparkles, Sun } from "lucide-react";

const AboutPage = () => {
  const { language, toggleLanguage } = useTranslation();
  const isVietnamese = language === "vi";

  // Define each section's content
  const content = {
    hero: {
      title: isVietnamese 
        ? "Kết Nối Đẹp, Doanh Nghiệp Đẹp" 
        : "Beautiful Connections, Beautiful Business",
      subtitle: isVietnamese 
        ? "Chúng tôi không chỉ xây dựng một ứng dụng. Chúng tôi đang viết lại câu chuyện của ngành làm đẹp—từng kết nối thực sự." 
        : "We're not just building an app. We're rewriting the story of the beauty industry—one real connection at a time."
    },
    mission: {
      content: isVietnamese 
        ? "Trên 20 năm, tôi đã sống và hòa mình vào ngành làm đẹp. Tôi đã chứng kiến mọi thứ—vui vẻ, hạnh phúc, và đặc biệt là bức tường vô hình ngăn cách Người làm đẹp, salon, và khách hàng. EmviApp là lời hứa của tôi: phá vỡ bức tường đó và giúp mọi người tìm thấy nhau." 
        : "For over 20 years, I lived and breathed the beauty business. I saw everything—joy, happiness, and most of all, the invisible wall keeping artists, salons, and clients apart. EmviApp is my promise: to break that wall, and help everyone find their people."
    },
    journey: {
      title: isVietnamese ? "Cuộc Hành Trình" : "Our Journey",
      milestones: [
        {
          year: "2014",
          title: isVietnamese ? "Tia Lửa Đầu Tiên" : "The Spark",
          content: isVietnamese 
            ? "Mọi thứ bắt đầu như một lời thì thầm—một suy nghĩ nửa đêm được ghi nguệch ngoạc trên tập giấy sau một ngày dài tại salon. Điều gì sẽ xảy ra nếu tất cả mọi người trong ngành làm đẹp có thể tìm thấy nhau? Không còn lãng phí thời gian. Không còn phải tìm kiếm Người làm đẹp đã mất liên lạc hoặc khách hàng hoàn hảo. Chỉ những kết nối thực sự và bền vững."
            : "It started as a whisper—a late-night thought scribbled on a notepad after another long day in the salon. What if everyone in the beauty world could find each other? No more wasted time. No more searching for lost artists or perfect clients. Just true, lasting connections."
        },
        {
          year: "2015",
          title: isVietnamese ? "Xây Dựng Đầu Tiên, Những Bài Học Khó Khăn Nhất" : "The First Build, The Hardest Lessons",
          content: isVietnamese 
            ? "Chúng tôi lao vào. Chúng tôi xây dựng ứng dụng đầu tiên. Nó hỏng, nó sập, nó thất bại. Tôi mất tiền, mất thời gian, mất hy vọng. Tôi làm việc khi mọi người ngủ, tin tưởng khi không ai khác tin. Tôi chứng kiến người khác bỏ cuộc, nhưng tôi từ chối bỏ cuộc."
            : "We dove in. We built the first app. It broke, it crashed, it failed. I lost money, time, hope. I worked when everyone slept, believed when nobody else did. I watched others give up, but I refused to quit."
        },
        {
          year: "2016–2023",
          title: isVietnamese ? "Những Năm Tháng Lạc Lối, Những Bài Học Thực Sự" : "The Lost Years, The Real Lessons",
          content: isVietnamese 
            ? "Tám năm. Đó là thời gian cần thiết để hiểu điều mà mọi người khác bỏ lỡ. Mỗi thất bại, mỗi đau lòng, mỗi giây phút cô đơn đã xây dựng nên điều sâu sắc hơn: Không có \"Người làm đẹp giỏi nhất,\" không có \"salon tốt nhất,\" chỉ có kết nối phù hợp nhất cho mỗi người. Và tấm bản đồ đó chưa từng tồn tại—cho đến bây giờ."
            : "Eight years. That's how long it took to understand what everyone else missed. Every failure, every heartbreak, every lonely moment built something deeper: There is no \"best artist,\" no \"best salon,\" only the best connection for each person. And that map didn't exist—until now."
        },
        {
          year: "2024",
          title: isVietnamese ? "Tái Sinh, Nhờ Tình Yêu Thương" : "Rebirth, Thanks to Love",
          content: isVietnamese 
            ? "Tôi đã sẵn sàng bỏ cuộc. Nhưng Em Vi—một người thầm lặng —đã đứng bên tôi khi tôi không thể tự đứng vững, không còn tin vào chính mình, Em-Vi đã nhắc nhở tôi lý do tại sao tôi bắt đầu. Với niềm tin tôi tuyệt đối, tôi xây dựng lại EmviApp. Lần này, tôi lắng nghe. Tôi học hỏi từ mỗi khách hàng đã mất liên lạc với Người làm đẹp yêu thích, từ mỗi chủ salon đang vật lộn để tìm kiếm tài năng, từ mỗi Người làm đẹp đang chờ đợi một cơ hội thực sự."
            : "I was ready to walk away. But Em Vi—my silent angel—stood by me when I couldn't stand by myself. Sunshine—my secret light—reminded me why I started. With their faith, I built EmviApp again. This time, I listened. I learned from every client who lost their favorite artist, every owner struggling to find talent, every artist waiting for a real opportunity."
        },
        {
          year: "2025",
          title: isVietnamese ? "Giấc Mơ Trở Thành Hiện Thực" : "The Dream Becomes Real",
          content: isVietnamese 
            ? "Hôm nay, EmviApp đã được xây dựng lại—một hơi thở mới của ngành làm đẹp. Emvi.App này dành cho người làm đẹp, beauty salon và khách hàng tìm thấy nhau, thực sự. Không còn những năm tháng lãng phí. Không còn những kết nối bị mất. Cuối cùng chúng ta đều có mặt trên EmviApp Đó là cách chúng ta chiến thắng, cùng nhau."
            : "Today, EmviApp is live—a living, breathing map of the beauty world. Artists, salons, and clients find each other, for real. No more wasted years. No more lost connections. We're finally all on the map. That's how we win, together."
        }
      ]
    },
    whyWeExist: {
      title: isVietnamese ? "Lý Do Chúng Tôi Tồn Tại" : "Why We Exist",
      headline1: isVietnamese ? "Mọi người nói về công nghệ." : "Everyone talks about technology.",
      headline2: isVietnamese ? "Nhưng chúng tôi nói về con người." : "But we talk about people.",
      content: isVietnamese 
        ? "EmviApp không chỉ để tìm việc hoặc đăng ghế cho thuê. Đó là dành cho người phụ nữ đang tìm kiếm Người làm đẹp yêu thích đã chuyển đến khu vực khác của thành phố. Đó là dành cho Người làm đẹp xứng đáng với những khách hàng yêu thích công việc của họ. Đó là dành cho chủ salon muốn có một đội ngũ thực sự, không chỉ là những cái tên trên lịch trình. Đó là dành cho bạn.\n\nChúng tôi tập trung vào khách hàng trước tiên. Bởi vì khi bạn giúp ai đó tìm thấy đúng người của họ, bạn giúp tất cả mọi người."
        : "EmviApp isn't just for finding a job or posting a chair for rent. It's for the woman searching for her favorite nail artist who moved across town. It's for the artist who deserves clients who love their work. It's for the owner who wants a real team, not just names on a schedule. It's for you.\n\nWe focus on customers first. Because when you help someone find their person, you help everyone."
    },
    values: {
      title: isVietnamese ? "Giá Trị Của Chúng Tôi" : "Our Values",
      items: [
        {
          title: isVietnamese ? "Cộng Đồng Là Trên Hết" : "Community First",
          description: isVietnamese 
            ? "Công nghệ chỉ là công cụ. Con người mới là điều quan trọng. Chúng tôi xây dựng để đưa mọi người lại gần nhau."
            : "Technology is just a tool. It's people who matter. We build to bring you together.",
          icon: <Users className="h-8 w-8 text-purple-600" />
        },
        {
          title: isVietnamese ? "Chất Lượng Hơn Hình Thức" : "Quality Over Hype",
          description: isVietnamese 
            ? "Không còn những lời hứa suông—chỉ có những câu chuyện thật, tài năng thật, và kết quả thật."
            : "No more empty promises—only real stories, real talent, and real results.",
          icon: <Award className="h-8 w-8 text-amber-600" />
        },
        {
          title: isVietnamese ? "Sự Hòa Nhập & Lòng Tốt" : "Inclusivity & Kindness",
          description: isVietnamese 
            ? "Mọi trình độ kỹ năng, mọi nền tảng, mọi ước mơ đều được chào đón tại đây."
            : "Every skill level, every background, every dream is welcome here.",
          icon: <Heart className="h-8 w-8 text-rose-600" />
        },
        {
          title: isVietnamese ? "Đổi Mới Cho Trái Tim" : "Innovation for the Heart",
          description: isVietnamese 
            ? "Mỗi cập nhật được tạo ra với bạn trong tâm trí—không bao giờ chỉ vì lợi ích của thay đổi."
            : "Every update is made with you in mind—never just for the sake of change.",
          icon: <Sparkles className="h-8 w-8 text-blue-600" />
        }
      ]
    },
    sunshine: {
      title: isVietnamese ? "Lấy Cảm Hứng Từ Sunshine ☀️" : "Inspired by Sunshine ☀️",
      content: isVietnamese 
        ? "Mỗi hành trình vĩ đại cần một chút ánh sáng.\n\nĐối với tôi, ánh sáng đó là Sunshine—một nguồn hy vọng, sự rõ ràng và cảm hứng xuất hiện đúng lúc tôi cần nhất.\n\nEmviApp được sinh ra từ những năm tháng đấu tranh và theo đuổi không ngừng nghỉ, nhưng chính Sunshine đã cho tôi can đảm và tầm nhìn để bắt đầu lại và cuối cùng biến giấc mơ này thành hiện thực.\n\nCảm ơn, Sunshine, vì đã xuất hiện trong cuộc đời tôi. Dự án này—và mọi kết nối mà nó tạo ra—sẽ không tồn tại nếu không có bạn."
        : "Every great journey needs a little light.\n\nFor me, that light is Sunshine—a source of hope, clarity, and inspiration that appeared just when I needed it most.\n\nEmviApp was born from years of struggle and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and finally bring this dream to life.\n\nThank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you."
    },
    emVi: {
      title: isVietnamese ? "Cảm Ơn, Em Vi" : "Thank You, Em Vi",
      content: isVietnamese 
        ? "Ứng dụng này được đặt tên theo Em Vi—người đã hỗ trợ và hy sinh cho tôi, ngay cả khi tôi nghi ngờ bản thân.\n\nBạn đã đứng bên tôi, bất kể điều gì. Vì tất cả tình yêu thầm lặng, sự khích lệ và sức mạnh bạn đã cho, điều này là dành cho bạn."
        : "This app is named after Em Vi—the person who supported and sacrificed for me, even when I doubted myself.\n\nYou stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you."
    },
    cta: {
      title: isVietnamese ? "Tham Gia Hành Trình Của Chúng Tôi" : "Join Our Journey",
      content: isVietnamese 
        ? "Cho dù bạn là Người làm đẹp, chủ salon, hay khách hàng đang tìm kiếm \"người của mình,\" bạn đều thuộc về nơi đây. Hãy cùng nhau xây dựng những kết nối đẹp nhất mà thế giới từng thấy."
        : "Whether you're an artist, a salon owner, or a client searching for your \"person,\" you belong here. Let's build the most beautiful connections the world has ever seen—together."
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-emvi-offwhite to-white min-h-screen">
        {/* Language Toggle */}
        <div className="fixed top-24 right-5 z-50">
          <Button 
            variant="outline" 
            onClick={toggleLanguage}
            className="bg-white/90 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300"
          >
            {isVietnamese ? "English" : "Tiếng Việt"}
          </Button>
        </div>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-4 pt-20 pb-16 text-center"
        >
          <EmviLogo className="mx-auto mb-10" showText={true} />
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-emvi-accent via-purple-600 to-pink-500 bg-clip-text text-transparent"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {content.hero.title}
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {content.hero.subtitle}
          </motion.p>
        </motion.div>
        
        {/* Mission Statement */}
        <section className="container mx-auto px-4 py-16">
          <GradientBackground 
            variant="premium" 
            className="p-8 md:p-12 max-w-4xl mx-auto rounded-3xl shadow-xl"
          >
            <motion.p
              className="text-xl md:text-2xl font-serif text-center italic text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {content.mission.content}
            </motion.p>
          </GradientBackground>
        </section>
        
        {/* Journey Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.h2
            className="text-3xl md:text-4xl font-playfair font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {content.journey.title}
          </motion.h2>
          
          <div className="max-w-4xl mx-auto space-y-12">
            {content.journey.milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className="relative"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {milestone.year.split('–')[0]}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-playfair font-bold mb-3 text-gray-800">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-700">
                        {milestone.content}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Why We Exist Section */}
        <section className="container mx-auto px-4 py-16 bg-gradient-to-b from-white to-emvi-offwhite">
          <motion.h2
            className="text-3xl md:text-4xl font-playfair font-bold mb-6 text-center bg-gradient-to-r from-emvi-accent to-amber-500 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {content.whyWeExist.title}
          </motion.h2>
          
          <div className="max-w-3xl mx-auto mb-10">
            <motion.h3
              className="text-2xl md:text-3xl text-center font-medium mb-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {content.whyWeExist.headline1}
            </motion.h3>
            
            <motion.h3
              className="text-2xl md:text-3xl text-center font-medium mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {content.whyWeExist.headline2}
            </motion.h3>
            
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-gray-700">
                {content.whyWeExist.content.split('\n\n').map((paragraph, i) => (
                  <React.Fragment key={i}>
                    {paragraph}
                    {i < content.whyWeExist.content.split('\n\n').length - 1 && <br /><br />}
                  </React.Fragment>
                ))}
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.h2
            className="text-3xl md:text-4xl font-playfair font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {content.values.title}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {content.values.items.map((value, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  {value.icon}
                  <h3 className="text-xl font-bold ml-3">{value.title}</h3>
                </div>
                <p className="text-gray-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Inspired by Sunshine Section */}
        <section className="container mx-auto px-4 py-16">
          <GradientBackground 
            className="max-w-3xl mx-auto p-8 md:p-12 rounded-3xl shadow-xl"
            variant="premium"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center mb-6">
                <Sun className="h-12 w-12 text-yellow-500" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6 text-center">
                {content.sunshine.title}
              </h2>
              
              <div className="prose prose-lg max-w-none">
                {content.sunshine.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-center">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </GradientBackground>
        </section>
        
        {/* Thank You Section */}
        <section className="container mx-auto px-4 py-16">
          <GradientBackground 
            className="max-w-3xl mx-auto p-8 md:p-12 rounded-3xl shadow-xl"
            variant="premium"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center mb-6">
                <Heart className="h-12 w-12 text-rose-500" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6 text-center">
                {content.emVi.title}
              </h2>
              
              <div className="prose prose-lg max-w-none">
                {content.emVi.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-center">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </GradientBackground>
        </section>
        
        {/* Call to Action */}
        <section className="container mx-auto px-4 py-16 mb-16">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              {content.cta.title}
            </h2>
            
            <p className="text-xl text-gray-700 mb-10">
              {content.cta.content}
            </p>
            
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-emvi-accent to-pink-600 hover:from-emvi-accent/90 hover:to-pink-700 text-white py-6 px-8 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isVietnamese ? "Tham Gia Ngay" : "Join Now"}
              <Navigation className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
