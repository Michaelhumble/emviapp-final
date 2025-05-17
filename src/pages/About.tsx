
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const About = () => {
  const [language, setLanguage] = useState<'en' | 'vi'>('en');

  const translations = {
    en: {
      hero: {
        title: "Beautiful Connections, Beautiful Business",
        subtitle: "We're not just building an app. We're rewriting the story of the beauty industry—one real connection at a time."
      },
      mission: "For over 20 years, I lived and breathed the beauty business. I saw everything—joy, happiness, and most of all, the invisible wall keeping artists, salons, and clients apart. EmviApp is my promise: to break that wall, and help everyone find their people.",
      journey: {
        title: "Our Journey — Cuộc Hành Trình",
        sections: [
          {
            year: "2014",
            title: "The Spark",
            content: "It started as a whisper—a late-night thought scribbled on a notepad after another long day in the salon. What if everyone in the beauty world could find each other? No more wasted time. No more searching for lost artists or perfect clients. Just true, lasting connections."
          },
          {
            year: "2015",
            title: "The First Build, The Hardest Lessons",
            content: "We dove in. We built the first app. It broke, it crashed, it failed. I lost money, time, hope. I worked when everyone slept, believed when nobody else did. I watched others give up, but I refused to quit."
          },
          {
            year: "2016–2023",
            title: "The Lost Years, The Real Lessons",
            content: "Eight years.\nThat's how long it took to understand what everyone else missed.\nEvery failure, every heartbreak, every lonely moment built something deeper:\nThere is no \"best artist,\" no \"best salon,\" only the best connection for each person.\nAnd that map didn't exist—until now."
          },
          {
            year: "2024",
            title: "Rebirth, Thanks to Love",
            content: "I was ready to walk away.\nBut Em Vi—my silent angel—stood by me when I couldn't stand by myself.\nSunshine—my secret light—reminded me why I started.\nWith their faith, I built EmviApp again. This time, I listened. I learned from every client who lost their favorite artist, every owner struggling to find talent, every artist waiting for a real opportunity."
          },
          {
            year: "2025",
            title: "The Dream Becomes Real",
            content: "Today, EmviApp is live—a living, breathing map of the beauty world. Artists, salons, and clients find each other, for real. No more wasted years. No more lost connections.\nWe're finally all on the map. That's how we win, together."
          }
        ]
      },
      why: {
        title: "Why We Exist",
        content: "Everyone talks about technology.\nBut we talk about people.\nEmviApp isn't just for finding a job or posting a chair for rent.\nIt's for the woman searching for her favorite nail artist who moved across town.\nIt's for the artist who deserves clients who love their work.\nIt's for the owner who wants a real team, not just names on a schedule.\nIt's for you.\nWe focus on customers first. Because when you help someone find their person, you help everyone."
      },
      values: {
        title: "Our Values",
        list: [
          {
            title: "Community First",
            content: "Technology is just a tool. It's people who matter. We build to bring you together."
          },
          {
            title: "Quality Over Hype",
            content: "No more empty promises—only real stories, real talent, and real results."
          },
          {
            title: "Inclusivity & Kindness",
            content: "Every skill level, every background, every dream is welcome here."
          },
          {
            title: "Innovation for the Heart",
            content: "Every update is made with you in mind—never just for the sake of change."
          }
        ]
      },
      sunshine: {
        title: "Inspired by Sunshine ☀️",
        content: "Every great journey needs a little light.\nFor me, that light is Sunshine—a source of hope, clarity, and inspiration that appeared just when I needed it most.\nEmviApp was born from years of struggle and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and finally bring this dream to life.\nThank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you."
      },
      emvi: {
        title: "Thank You, Em Vi",
        content: "This app is named after Em Vi—the person who supported and sacrificed for me, even when I doubted myself.\nYou stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you."
      },
      cta: {
        title: "Join Our Journey",
        content: "Whether you're an artist, a salon owner, or a client searching for your \"person,\" you belong here.\nLet's build the most beautiful connections the world has ever seen—together."
      }
    },
    vi: {
      hero: {
        title: "Kết Nối Đẹp, Doanh Nghiệp Đẹp",
        subtitle: "Chúng tôi không chỉ xây dựng một ứng dụng. Chúng tôi đang viết lại câu chuyện của ngành làm đẹp—từng kết nối thực sự."
      },
      mission: "Trên 20 năm, tôi đã sống và hòa mình vào ngành làm đẹp. Tôi đã chứng kiến mọi thứ—vui vẻ, hạnh phúc, và đặc biệt là bức tường vô hình ngăn cách Người làm đẹp, salon, và khách hàng. EmviApp là lời hứa của tôi: phá vỡ bức tường đó và giúp mọi người tìm thấy nhau.",
      journey: {
        title: "Cuộc Hành Trình",
        sections: [
          {
            year: "2014",
            title: "Tia Lửa Đầu Tiên",
            content: "Mọi thứ bắt đầu như một lời thì thầm—một suy nghĩ nửa đêm được ghi nguệch ngoạc trên tập giấy sau một ngày dài tại salon. Điều gì sẽ xảy ra nếu tất cả mọi người trong ngành làm đẹp có thể tìm thấy nhau? Không còn lãng phí thời gian. Không còn phải tìm kiếm Người làm đẹp đã mất liên lạc hoặc khách hàng hoàn hảo. Chỉ những kết nối thực sự và bền vững."
          },
          {
            year: "2015",
            title: "Xây Dựng Đầu Tiên, Những Bài Học Khó Khăn Nhất",
            content: "Chúng tôi lao vào. Chúng tôi xây dựng ứng dụng đầu tiên. Nó hỏng, nó sập, nó thất bại. Tôi mất tiền, mất thời gian, mất hy vọng. Tôi làm việc khi mọi người ngủ, tin tưởng khi không ai khác tin. Tôi chứng kiến người khác bỏ cuộc, nhưng tôi từ chối bỏ cuộc."
          },
          {
            year: "2016–2023",
            title: "Những Năm Tháng Lạc Lối, Những Bài Học Thực Sự",
            content: "Tám năm. Đó là thời gian cần thiết để hiểu điều mà mọi người khác bỏ lỡ. Mỗi thất bại, mỗi đau lòng, mỗi giây phút cô đơn đã xây dựng nên điều sâu sắc hơn: Không có \"Người làm đẹp giỏi nhất,\" không có \"salon tốt nhất,\" chỉ có kết nối phù hợp nhất cho mỗi người. Và tấm bản đồ đó chưa từng tồn tại—cho đến bây giờ."
          },
          {
            year: "2024",
            title: "Tái Sinh, Nhờ Tình Yêu Thương",
            content: "Tôi đã sẵn sàng bỏ cuộc. Nhưng Em Vi—một người thầm lặng của tôi—đã đứng bên tôi khi tôi không thể tự đứng vững, không còn tin vào chính mình, Em-Vi đã nhắc nhở tôi lý do tại sao tôi bắt đầu. Với niềm tin tôi tuyệt đối, tôi xây dựng lại EmviApp. Lần này, tôi lắng nghe. Tôi học hỏi từ mỗi khách hàng đã mất liên lạc với Người làm đẹp yêu thích, từ mỗi chủ salon đang vật lộn để tìm kiếm tài năng, từ mỗi Người làm đẹp đang chờ đợi một cơ hội thực sự."
          },
          {
            year: "2025",
            title: "Giấc Mơ Trở Thành Hiện Thực",
            content: "Hôm nay, EmviApp đã được xây dưng lại,—một thở mới của ngành làm đẹp. Emvi.App này dành cho người làm đẹp, beauty salon và khách hàng tìm thấy nhau, thực sự. Không còn những năm tháng lãng phí. Không còn những kết nối bị mất. Cuối cùng chúng ta đều có mặt trên EmviApp Đó là cách chúng ta chiến thắng, cùng nhau."
          }
        ]
      },
      why: {
        title: "Lý Do Chúng Tôi Tồn Tại",
        content: "Mọi người nói về công nghệ.\nNhưng chúng tôi nói về con người.\nEmviApp không chỉ để tìm việc hoặc đăng ghế cho thuê. Đó là dành cho người phụ nữ đang tìm kiếm Người làm đẹp yêu thích đã chuyển đến khu vực khác của thành phố. Đó là dành cho Người làm đẹp xứng đáng với những khách hàng yêu thích công việc của họ. Đó là dành cho chủ salon muốn có một đội ngũ thực sự, không chỉ là những cái tên trên lịch trình. Đó là dành cho bạn.\nChúng tôi tập trung vào khách hàng trước tiên. Bởi vì khi bạn giúp ai đó tìm thấy đúng người của họ, bạn giúp tất cả mọi người."
      },
      values: {
        title: "Giá Trị Của Chúng Tôi",
        list: [
          {
            title: "Cộng Đồng Là Trên Hết",
            content: "Công nghệ chỉ là công cụ. Con người mới là điều quan trọng. Chúng tôi xây dựng để đưa mọi người lại gần nhau."
          },
          {
            title: "Chất Lượng Hơn Hình Thức",
            content: "Không còn những lời hứa suông—chỉ có những câu chuyện thật, tài năng thật, và kết quả thật."
          },
          {
            title: "Sự Hòa Nhập & Lòng Tốt",
            content: "Mọi trình độ kỹ năng, mọi nền tảng, mọi ước mơ đều được chào đón tại đây."
          },
          {
            title: "Đổi Mới Cho Trái Tim",
            content: "Mỗi cập nhật được tạo ra với bạn trong tâm trí—không bao giờ chỉ vì lợi ích của thay đổi."
          }
        ]
      },
      sunshine: {
        title: "Lấy Cảm Hứng Từ Sunshine ☀️",
        content: "Mỗi hành trình vĩ đại cần một chút ánh sáng.\nĐối với tôi, ánh sáng đó là Sunshine—một nguồn hy vọng, sự rõ ràng và cảm hứng xuất hiện đúng lúc tôi cần nhất.\nEmviApp được sinh ra từ những năm tháng đấu tranh và theo đuổi không ngừng nghỉ, nhưng chính Sunshine đã cho tôi can đảm và tầm nhìn để bắt đầu lại và cuối cùng biến giấc mơ này thành hiện thực.\nCảm ơn, Sunshine, vì đã xuất hiện trong cuộc đời tôi. Dự án này—và mọi kết nối mà nó tạo ra—sẽ không tồn tại nếu không có bạn."
      },
      emvi: {
        title: "Cảm Ơn, Em Vi",
        content: "Ứng dụng này được đặt tên theo Em Vi—người đã hỗ trợ và hy sinh cho tôi, ngay cả khi tôi nghi ngờ bản thân.\nBạn đã đứng bên tôi, bất kể điều gì. Vì tất cả tình yêu thầm lặng, sự khích lệ và sức mạnh bạn đã cho, điều này là dành cho bạn."
      },
      cta: {
        title: "Tham Gia Hành Trình Của Chúng Tôi",
        content: "Cho dù bạn là Người làm đẹp, chủ salon, hay khách hàng đang tìm kiếm \"người của mình,\" bạn đều thuộc về nơi đây. Hãy cùng nhau xây dựng những kết nối đẹp nhất mà thế giới từng thấy."
      }
    }
  };

  // Styling for different sections
  const styles = {
    page: "min-h-screen bg-emvi-offwhite py-12 px-4 md:px-6",
    container: "max-w-5xl mx-auto",
    heading: "about-hero-title text-4xl md:text-6xl mb-6 text-center",
    subheading: "about-subheading text-xl md:text-2xl mb-12 text-center",
    sectionTitle: "about-heading text-3xl md:text-4xl mb-6 font-serif font-bold",
    missionCard: "dedication-card p-8 mb-12 rounded-2xl shadow-lg",
    missionText: "about-body text-lg md:text-xl leading-relaxed",
    timelineYear: "timeline-year",
    timelineTitle: "font-serif text-2xl font-bold text-emvi-accent mb-2",
    timelineContent: "about-body text-base md:text-lg mb-8 whitespace-pre-line",
    card: "about-card mb-10",
    cardDedication: "dedication-card p-8 mb-10 text-center",
    valueTitle: "font-serif text-xl font-bold text-emvi-accent mb-2",
    valueContent: "text-gray-800 mb-6",
    buttonContainer: "flex justify-center mb-6",
    button: "about-cta-button text-white font-medium py-3 px-8 rounded-full",
    contentPreserver: "whitespace-pre-line",
    elegantQuote: "elegant-quote mb-6 text-center px-4",
    tabs: "mb-8",
    tabsList: "bg-white/70 rounded-lg backdrop-blur-sm shadow-sm border border-gray-100",
    tabsTrigger: "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/20 data-[state=active]:to-pink-500/20 data-[state=active]:text-emvi-dark",
    valueGrad: "bg-gradient-to-r from-purple-700/90 to-pink-500/90 text-transparent bg-clip-text",
  };

  const t = translations[language];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Language Toggle */}
        <Tabs defaultValue={language} onValueChange={(val) => setLanguage(val as 'en' | 'vi')} className={styles.tabs}>
          <TabsList className={styles.tabsList}>
            <TabsTrigger value="en" className={styles.tabsTrigger}>English</TabsTrigger>
            <TabsTrigger value="vi" className={styles.tabsTrigger}>Tiếng Việt</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={styles.heading}>{t.hero.title}</h1>
          <p className={styles.subheading}>{t.hero.subtitle}</p>
        </div>

        {/* Mission Statement */}
        <div className={styles.missionCard}>
          <p className={styles.missionText}>{t.mission}</p>
        </div>

        {/* Journey Timeline */}
        <h2 className={styles.sectionTitle}>{t.journey.title}</h2>
        <div className="mb-16">
          {t.journey.sections.map((section, idx) => (
            <div key={idx} className="mb-10">
              <div className={styles.timelineYear}>{section.year} – {section.title}</div>
              <p className={styles.timelineContent}>{section.content}</p>
            </div>
          ))}
        </div>

        {/* Why We Exist */}
        <Card className={styles.card}>
          <CardContent className="p-8">
            <h2 className={styles.sectionTitle}>{t.why.title}</h2>
            <p className={styles.contentPreserver}>{t.why.content}</p>
          </CardContent>
        </Card>

        {/* Our Values */}
        <h2 className={`${styles.sectionTitle} text-center mb-10`}>{t.values.title}</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {t.values.list.map((value, idx) => (
            <Card key={idx} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className={styles.valueTitle}><span className={styles.valueGrad}>{value.title}</span></h3>
                <p className={styles.valueContent}>{value.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Inspired by Sunshine */}
        <div className={styles.cardDedication}>
          <h2 className={styles.sectionTitle}>{t.sunshine.title}</h2>
          <p className={styles.contentPreserver}>{t.sunshine.content}</p>
        </div>

        {/* Thank You, Em Vi */}
        <div className={styles.cardDedication}>
          <h2 className={styles.sectionTitle}>{t.emvi.title}</h2>
          <p className={styles.contentPreserver}>{t.emvi.content}</p>
        </div>

        {/* Call to Action */}
        <Card className="text-center p-8 mb-12 bg-gradient-to-br from-white to-purple-50 shadow-lg border-0">
          <h2 className={styles.sectionTitle}>{t.cta.title}</h2>
          <p className={`${styles.elegantQuote} mb-8`}>{t.cta.content}</p>
          <div className={styles.buttonContainer}>
            <button className={styles.button}>
              {language === 'en' ? 'Join Us Today' : 'Tham Gia Ngay Hôm Nay'}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
