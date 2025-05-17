
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  const { t, isVietnamese, toggleLanguage } = useTranslation();
  
  // Timeline data with both English and Vietnamese content
  const timelineData = [
    {
      year: "2014",
      title: {
        english: "The Spark",
        vietnamese: "Tia Lửa Đầu Tiên"
      },
      content: {
        english: "It started as a whisper—a late-night thought scribbled on a notepad after another long day in the salon. What if everyone in the beauty world could find each other? No more wasted time. No more searching for lost artists or perfect clients. Just true, lasting connections.",
        vietnamese: "Mọi thứ bắt đầu như một lời thì thầm—một suy nghĩ nửa đêm được ghi nguệch ngoạc trên tập giấy sau một ngày dài tại salon. Điều gì sẽ xảy ra nếu tất cả mọi người trong ngành làm đẹp có thể tìm thấy nhau? Không còn lãng phí thời gian. Không còn phải tìm kiếm Người làm đẹp đã mất liên lạc hoặc khách hàng hoàn hảo. Chỉ những kết nối thực sự và bền vững."
      }
    },
    {
      year: "2015",
      title: {
        english: "The First Build, The Hardest Lessons",
        vietnamese: "Xây Dựng Đầu Tiên, Những Bài Học Khó Khăn Nhất"
      },
      content: {
        english: "We dove in. We built the first app. It broke, it crashed, it failed. I lost money, time, hope. I worked when everyone slept, believed when nobody else did. I watched others give up, but I refused to quit.",
        vietnamese: "Chúng tôi lao vào. Chúng tôi xây dựng ứng dụng đầu tiên. Nó hỏng, nó sập, nó thất bại. Tôi mất tiền, mất thời gian, mất hy vọng. Tôi làm việc khi mọi người ngủ, tin tưởng khi không ai khác tin. Tôi chứng kiến người khác từ bỏ, nhưng tôi từ chối bỏ cuộc."
      }
    },
    {
      year: "2016–2023",
      title: {
        english: "The Lost Years, The Real Lessons",
        vietnamese: "Những Năm Tháng Lạc Lối, Những Bài Học Thực Sự"
      },
      content: {
        english: "Eight years. That's how long it took to understand what everyone else missed. Every failure, every heartbreak, every lonely moment built something deeper: There is no \"best artist,\" no \"best salon,\" only the best connection for each person. And that map didn't exist—until now.",
        vietnamese: "Tám năm. Đó là thời gian cần thiết để hiểu điều mà mọi người khác bỏ lỡ. Mỗi thất bại, mỗi đau lòng, mỗi giây phút cô đơn đã xây dựng nên điều sâu sắc hơn: Không có \"Người làm đẹp giỏi nhất,\" không có \"salon tốt nhất,\" chỉ có kết nối phù hợp nhất cho mỗi người. Và tấm bản đồ đó chưa từng tồn tại—cho đến bây giờ."
      }
    },
    {
      year: "2024",
      title: {
        english: "Rebirth, Thanks to Love",
        vietnamese: "Tái Sinh, Nhờ Tình Yêu Thương"
      },
      content: {
        english: "I was ready to walk away. But Em Vi—my silent angel—stood by me when I couldn't stand by myself. Sunshine—my secret light—reminded me why I started. With their faith, I built EmviApp again. This time, I listened. I learned from every client who lost their favorite artist, every owner struggling to find talent, every artist waiting for a real opportunity.",
        vietnamese: "Tôi đã sẵn sàng bỏ cuộc. Nhưng Em Vi—thiên thần thầm lặng của tôi—đã đứng bên tôi khi tôi không thể tự đứng vững. Sunshine—ánh sáng bí mật của tôi—đã nhắc nhở tôi lý do tại sao tôi bắt đầu. Với niềm tin của họ, tôi xây dựng lại EmviApp. Lần này, tôi lắng nghe. Tôi học hỏi từ mỗi khách hàng đã mất liên lạc với Người làm đẹp yêu thích, từ mỗi chủ salon đang vật lộn để tìm kiếm tài năng, từ mỗi Người làm đẹp đang chờ đợi một cơ hội thực sự."
      }
    },
    {
      year: "2025",
      title: {
        english: "The Dream Becomes Real",
        vietnamese: "Giấc Mơ Trở Thành Hiện Thực"
      },
      content: {
        english: "Today, EmviApp is live—a living, breathing map of the beauty world. Artists, salons, and clients find each other, for real. No more wasted years. No more lost connections. We're finally all on the map. That's how we win, together.",
        vietnamese: "Hôm nay, EmviApp đã hoạt động—một bản đồ sống, thở của thế giới làm đẹp. Người làm đẹp, salon và khách hàng tìm thấy nhau, thực sự. Không còn những năm tháng lãng phí. Không còn những kết nối bị mất. Cuối cùng chúng ta đều có mặt trên bản đồ. Đó là cách chúng ta chiến thắng, cùng nhau."
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container max-w-4xl mx-auto py-10 px-4 sm:px-6">
        {/* Language Toggle */}
        <div className="flex justify-end mb-6">
          <button 
            onClick={toggleLanguage}
            className="px-4 py-2 bg-white/80 hover:bg-white rounded-full shadow-sm text-gray-700 font-serif transition-all"
          >
            {isVietnamese ? "Switch to English" : "Chuyển sang tiếng Việt"}
          </button>
        </div>
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="about-hero-title text-4xl sm:text-5xl md:text-6xl mb-4">
            {isVietnamese ? "EmviApp" : "🌟 About EmviApp"}
          </h1>
          <p className="about-subheading text-xl sm:text-2xl">
            {isVietnamese ? "Kết Nối Đẹp, Câu Chuyện Thật" : "Beautiful Connections, Real Stories"}
          </p>
        </div>
        
        {/* Main Content */}
        <Card className="mb-10 overflow-hidden border-0 shadow-lg">
          <CardContent className="p-8">
            <h2 className="about-heading text-2xl sm:text-3xl mb-4">
              {isVietnamese ? "Kết Nối Đẹp, Doanh Nghiệp Đẹp" : "Beautiful Connections, Beautiful Business"}
            </h2>
            <p className="about-body mb-6">
              {isVietnamese 
                ? "Chúng tôi không chỉ xây dựng một ứng dụng. Chúng tôi đang viết lại câu chuyện của ngành làm đẹp—một kết nối thực sự mỗi lần."
                : "We're not just building an app. We're rewriting the story of the beauty industry—one real connection at a time."
              }
            </p>
            
            <h3 className="about-subheading text-xl mb-3">
              {isVietnamese ? "Tuyên Ngôn Sứ Mệnh" : "Mission Statement"}
            </h3>
            <p className="about-body mb-10">
              {isVietnamese 
                ? "Trên 20 năm, tôi đã sống và hòa mình vào ngành làm đẹp. Tôi đã chứng kiến mọi thứ—những chiến thắng, những đau khổ, và đặc biệt là bức tường vô hình ngăn cách Người làm đẹp, salon, và khách hàng. EmviApp là lời hứa của tôi: phá vỡ bức tường đó và giúp mọi người tìm thấy nhau."
                : "For 25 years, I lived and breathed the beauty business. I saw everything—the victories, the heartbreaks, and, most of all, the invisible wall keeping artists, salons, and clients apart. EmviApp is my promise: to break that wall, and help everyone find their people."
              }
            </p>
            
            <h3 className="about-subheading text-xl mb-4">
              {isVietnamese ? "Cuộc Hành Trình — Our Journey" : "Our Journey — Cuộc Hành Trình"}
            </h3>
            
            {/* Timeline */}
            <div className="mb-12">
              {timelineData.map((item, index) => (
                <div key={index} className="mb-8">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-serif font-bold text-purple-800">{item.year}</span>
                    <h4 className="about-subheading text-lg">
                      {isVietnamese ? item.title.vietnamese : item.title.english}
                    </h4>
                  </div>
                  <p className="about-body pl-10 border-l-2 border-purple-200 ml-2 py-1">
                    {isVietnamese ? item.content.vietnamese : item.content.english}
                  </p>
                </div>
              ))}
            </div>
            
            <h3 className="about-subheading text-xl mb-3">
              {isVietnamese ? "Lý Do Chúng Tôi Tồn Tại" : "Why We Exist"}
            </h3>
            <div className="about-body mb-10">
              {isVietnamese ? (
                <>
                  <p className="mb-2">Mọi người nói về công nghệ.</p>
                  <p className="mb-2">Nhưng chúng tôi nói về con người.</p>
                  <p className="mb-4">EmviApp không chỉ để tìm việc hoặc đăng ghế cho thuê. Đó là dành cho người phụ nữ đang tìm kiếm Người làm đẹp yêu thích đã chuyển đến khu vực khác của thành phố. Đó là dành cho Người làm đẹp xứng đáng với những khách hàng yêu thích công việc của họ. Đó là dành cho chủ salon muốn có một đội ngũ thực sự, không chỉ là những cái tên trên lịch trình. Đó là dành cho bạn.</p>
                  <p>Chúng tôi tập trung vào khách hàng trước tiên. Bởi vì khi bạn giúp ai đó tìm thấy đúng người của họ, bạn giúp tất cả mọi người.</p>
                </>
              ) : (
                <>
                  <p className="mb-2">Everyone talks about technology.</p>
                  <p className="mb-2">But we talk about people.</p>
                  <p className="mb-4">EmviApp isn't just for finding a job or posting a chair for rent. It's for the woman searching for her favorite nail artist who moved across town. It's for the artist who deserves clients who love their work. It's for the owner who wants a real team, not just names on a schedule. It's for you.</p>
                  <p>We focus on customers first. Because when you help someone find their person, you help everyone.</p>
                </>
              )}
            </div>
            
            <h3 className="about-subheading text-xl mb-3">
              {isVietnamese ? "Giá Trị Của Chúng Tôi" : "Our Values"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-white/60 p-4 rounded-lg shadow-sm">
                <h4 className="font-serif font-bold text-purple-700 mb-2">
                  {isVietnamese ? "Cộng Đồng Là Trên Hết" : "Community First"}
                </h4>
                <p className="about-body text-sm">
                  {isVietnamese 
                    ? "Công nghệ chỉ là công cụ. Con người mới là điều quan trọng. Chúng tôi xây dựng để đưa mọi người lại gần nhau."
                    : "Technology is just a tool. It's people who matter. We build to bring you together."
                  }
                </p>
              </div>
              
              <div className="bg-white/60 p-4 rounded-lg shadow-sm">
                <h4 className="font-serif font-bold text-purple-700 mb-2">
                  {isVietnamese ? "Chất Lượng Hơn Hình Thức" : "Quality Over Hype"}
                </h4>
                <p className="about-body text-sm">
                  {isVietnamese 
                    ? "Không còn những lời hứa suông—chỉ có những câu chuyện thật, tài năng thật, và kết quả thật."
                    : "No more empty promises—only real stories, real talent, and real results."
                  }
                </p>
              </div>
              
              <div className="bg-white/60 p-4 rounded-lg shadow-sm">
                <h4 className="font-serif font-bold text-purple-700 mb-2">
                  {isVietnamese ? "Sự Hòa Nhập & Lòng Tốt" : "Inclusivity & Kindness"}
                </h4>
                <p className="about-body text-sm">
                  {isVietnamese 
                    ? "Mọi trình độ kỹ năng, mọi nền tảng, mọi ước mơ đều được chào đón tại đây."
                    : "Every skill level, every background, every dream is welcome here."
                  }
                </p>
              </div>
              
              <div className="bg-white/60 p-4 rounded-lg shadow-sm">
                <h4 className="font-serif font-bold text-purple-700 mb-2">
                  {isVietnamese ? "Đổi Mới Cho Trái Tim" : "Innovation for the Heart"}
                </h4>
                <p className="about-body text-sm">
                  {isVietnamese 
                    ? "Mỗi cập nhật được tạo ra với bạn trong tâm trí—không bao giờ chỉ vì lợi ích của thay đổi."
                    : "Every update is made with you in mind—never just for the sake of change."
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Special Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Inspired by Sunshine */}
          <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-100">
            <CardContent className="p-8">
              <div className="text-center mb-4">
                <h3 className="about-heading text-2xl">
                  {isVietnamese ? "Lấy Cảm Hứng từ Sunshine ☀️" : "Inspired by Sunshine ☀️"}
                </h3>
              </div>
              <div className="about-body">
                {isVietnamese ? (
                  <>
                    <p className="mb-4">Mỗi hành trình vĩ đại cần một chút ánh sáng.</p>
                    <p className="mb-4">Đối với tôi, ánh sáng đó là Sunshine—một nguồn hy vọng, sự rõ ràng và cảm hứng xuất hiện đúng lúc tôi cần nhất.</p>
                    <p>EmviApp được sinh ra từ những năm tháng đấu tranh và theo đuổi không ngừng nghỉ, nhưng chính Sunshine đã cho tôi can đảm và tầm nhìn để bắt đầu lại và cuối cùng biến giấc mơ này thành hiện thực.</p>
                    <p className="mt-4">Cảm ơn, Sunshine, vì đã xuất hiện trong cuộc đời tôi. Dự án này—và mọi kết nối mà nó tạo ra—sẽ không tồn tại nếu không có bạn.</p>
                  </>
                ) : (
                  <>
                    <p className="mb-4">Every great journey needs a little light.</p>
                    <p className="mb-4">For me, that light is Sunshine—a source of hope, clarity, and inspiration that appeared just when I needed it most.</p>
                    <p>EmviApp was born from years of struggle and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and finally bring this dream to life.</p>
                    <p className="mt-4">Thank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you.</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Thank You Em Vi */}
          <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-100">
            <CardContent className="p-8">
              <div className="text-center mb-4">
                <h3 className="about-heading text-2xl">
                  {isVietnamese ? "Cảm Ơn, Em Vi" : "Thank You, Em Vi"}
                </h3>
              </div>
              <div className="about-body">
                {isVietnamese ? (
                  <>
                    <p className="mb-4">Ứng dụng này được đặt tên theo Em Vi—người đã hỗ trợ và hy sinh cho tôi, ngay cả khi tôi nghi ngờ bản thân.</p>
                    <p className="mb-4">Bạn đã đứng bên tôi, bất kể điều gì. Vì tất cả tình yêu thầm lặng, sự khích lệ và sức mạnh bạn đã cho, điều này là dành cho bạn.</p>
                  </>
                ) : (
                  <>
                    <p className="mb-4">This app is named after Em Vi—the person who supported and sacrificed for me, even when I doubted myself.</p>
                    <p className="mb-4">You stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you.</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Call To Action */}
        <Card className="mb-10 overflow-hidden border-0 shadow-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="font-serif font-bold text-3xl mb-4">
              {isVietnamese ? "Tham Gia Hành Trình Của Chúng Tôi" : "Join Our Journey"}
            </h2>
            <p className="font-serif text-lg mb-6">
              {isVietnamese 
                ? "Cho dù bạn là Người làm đẹp, chủ salon, hay khách hàng đang tìm kiếm \"người của mình,\" bạn đều thuộc về nơi đây. Hãy cùng nhau xây dựng những kết nối đẹp nhất mà thế giới từng thấy."
                : "Whether you're an artist, a salon owner, or a client searching for your \"person,\" you belong here. Let's build the most beautiful connections the world has ever seen—together."
              }
            </p>
            <div className="flex justify-center">
              <button className="px-8 py-3 bg-white text-purple-600 rounded-full font-serif font-bold hover:bg-white/90 transition-colors shadow-lg">
                {isVietnamese ? "Khám Phá Ngay" : "Explore Now"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
