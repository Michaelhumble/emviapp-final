
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Globe } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { useTranslation } from '@/hooks/useTranslation';
import { getLanguagePreference, setLanguagePreference } from '@/utils/languagePreference';

// Content dictionary organized by language and section
const content = {
  en: {
    hero: {
      title: "Beautiful Connections, Beautiful Business",
      subtitle: "We're not just building an app. We're rewriting the story of the beauty industry—one real connection at a time."
    },
    mission: "For over 20 years, I lived and breathed the beauty business. I saw everything—joy, happiness, and most of all, the invisible wall keeping artists, salons, and clients apart. EmviApp is my promise: to break that wall, and help everyone find their people.",
    journey: {
      title: "Our Journey — Cuộc Hành Trình",
      timeline: [
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
          content: "Eight years. That's how long it took to understand what everyone else missed. Every failure, every heartbreak, every lonely moment built something deeper: There is no \"best artist,\" no \"best salon,\" only the best connection for each person. And that map didn't exist—until now."
        },
        {
          year: "2024",
          title: "Rebirth, Thanks to Love",
          content: "I was ready to walk away. But Em Vi—my silent angel—stood by me when I couldn't stand by myself. Sunshine—my secret light—reminded me why I started. With their faith, I built EmviApp again. This time, I listened. I learned from every client who lost their favorite artist, every owner struggling to find talent, every artist waiting for a real opportunity."
        },
        {
          year: "2025",
          title: "The Dream Becomes Real",
          content: "Today, EmviApp is live—a living, breathing map of the beauty world. Artists, salons, and clients find each other, for real. No more wasted years. No more lost connections. We're finally all on the map. That's how we win, together."
        }
      ]
    },
    why: {
      title: "Why We Exist",
      intro: [
        "Everyone talks about technology.",
        "But we talk about people."
      ],
      content: "EmviApp isn't just for finding a job or posting a chair for rent. It's for the woman searching for her favorite nail artist who moved across town. It's for the artist who deserves clients who love their work. It's for the owner who wants a real team, not just names on a schedule. It's for you.",
      conclusion: "We focus on customers first. Because when you help someone find their person, you help everyone."
    },
    values: {
      title: "Our Values",
      items: [
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
      content: [
        "Every great journey needs a little light.",
        "For me, that light is Sunshine—a source of hope, clarity, and inspiration that appeared just when I needed it most.",
        "EmviApp was born from years of struggle and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and finally bring this dream to life.",
        "Thank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you."
      ]
    },
    emvi: {
      title: "Thank You, Em Vi",
      content: [
        "This app is named after Em Vi—the person who supported and sacrificed for me, even when I doubted myself.",
        "You stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you."
      ]
    },
    cta: {
      title: "Join Our Journey",
      content: "Whether you're an artist, a salon owner, or a client searching for your \"person,\" you belong here. Let's build the most beautiful connections the world has ever seen—together."
    }
  },
  vi: {
    hero: {
      title: "Kết Nối Đẹp, Doanh Nghiệp Đẹp",
      subtitle: "Chúng tôi không chỉ xây dựng một ứng dụng. Chúng tôi đang viết lại câu chuyện của ngành làm đẹp—từng kết nối thực sự."
    },
    mission: "Trên 20 năm, tôi đã sống và hòa mình vào ngành làm đẹp. Tôi đã chứng kiến mọi thứ—vui vẻ, hạnh phúc, và đặc biệt là bức tường vô hình ngăn cách Người làm đẹp, salon, và khách hàng. EmviApp là lời hứa của tôi: phá vỡ bức tường đó và giúp mọi người tìm thấy nhau.",
    journey: {
      title: "Our Journey — Cuộc Hành Trình",
      timeline: [
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
          content: "Tôi đã sẵn sàng bỏ cuộc. Nhưng Em Vi—một người thầm lặng —đã đứng bên tôi khi tôi không thể tự đứng vững, không còn tin vào chính mình, Em-Vi đã nhắc nhở tôi lý do tại sao tôi bắt đầu. Với niềm tin tôi tuyệt đối, tôi xây dựng lại EmviApp. Lần này, tôi lắng nghe. Tôi học hỏi từ mỗi khách hàng đã mất liên lạc với Người làm đẹp yêu thích, từ mỗi chủ salon đang vật lộn để tìm kiếm tài năng, từ mỗi Người làm đẹp đang chờ đợi một cơ hội thực sự."
        },
        {
          year: "2025",
          title: "Giấc Mơ Trở Thành Hiện Thực",
          content: "Hôm nay, EmviApp đã được xây dựng lại—một hơi thở mới của ngành làm đẹp. Emvi.App này dành cho người làm đẹp, beauty salon và khách hàng tìm thấy nhau, thực sự. Không còn những năm tháng lãng phí. Không còn những kết nối bị mất. Cuối cùng chúng ta đều có mặt trên EmviApp Đó là cách chúng ta chiến thắng, cùng nhau."
        }
      ]
    },
    why: {
      title: "Lý Do Chúng Tôi Tồn Tại",
      intro: [
        "Mọi người nói về công nghệ.",
        "Nhưng chúng tôi nói về con người."
      ],
      content: "EmviApp không chỉ để tìm việc hoặc đăng ghế cho thuê. Đó là dành cho người phụ nữ đang tìm kiếm Người làm đẹp yêu thích đã chuyển đến khu vực khác của thành phố. Đó là dành cho Người làm đẹp xứng đáng với những khách hàng yêu thích công việc của họ. Đó là dành cho chủ salon muốn có một đội ngũ thực sự, không chỉ là những cái tên trên lịch trình. Đó là dành cho bạn.",
      conclusion: "Chúng tôi tập trung vào khách hàng trước tiên. Bởi vì khi bạn giúp ai đó tìm thấy đúng người của họ, bạn giúp tất cả mọi người."
    },
    values: {
      title: "Giá Trị Của Chúng Tôi",
      items: [
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
      content: [
        "Mỗi hành trình vĩ đại cần một chút ánh sáng.",
        "Đối với tôi, ánh sáng đó là Sunshine—một nguồn hy vọng, sự rõ ràng và cảm hứng xuất hiện đúng lúc tôi cần nhất.",
        "EmviApp được sinh ra từ những năm tháng đấu tranh và theo đuổi không ngừng nghỉ, nhưng chính Sunshine đã cho tôi can đảm và tầm nhìn để bắt đầu lại và cuối cùng biến giấc mơ này thành hiện thực.",
        "Cảm ơn, Sunshine, vì đã xuất hiện trong cuộc đời tôi. Dự án này—và mọi kết nối mà nó tạo ra—sẽ không tồn tại nếu không có bạn."
      ]
    },
    emvi: {
      title: "Cảm Ơn, Em Vi",
      content: [
        "Ứng dụng này được đặt tên theo Em Vi—người đã hỗ trợ và hy sinh cho tôi, ngay cả khi tôi nghi ngờ bản thân.",
        "Bạn đã đứng bên tôi, bất kể điều gì. Vì tất cả tình yêu thầm lặng, sự khích lệ và sức mạnh bạn đã cho, điều này là dành cho bạn."
      ]
    },
    cta: {
      title: "Tham Gia Hành Trình Của Chúng Tôi",
      content: "Cho dù bạn là Người làm đẹp, chủ salon, hay khách hàng đang tìm kiếm \"người của mình,\" bạn đều thuộc về nơi đây. Hãy cùng nhau xây dựng những kết nối đẹp nhất mà thế giới từng thấy."
    }
  }
};

const AboutPage: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "vi">(getLanguagePreference() as "en" | "vi");
  const { t } = useTranslation();
  
  // For animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const handleToggleLanguage = () => {
    const newLanguage = language === "en" ? "vi" : "en";
    setLanguage(newLanguage);
    setLanguagePreference(newLanguage);
  };
  
  const c = content[language]; // Get current language content
  
  return (
    <div className="bg-gradient-to-b from-emvi-offwhite to-white min-h-screen">
      {/* Hero section with EmviApp Logo */}
      <header className="pt-32 pb-20 px-4 bg-hero-pattern">
        <Container className="text-center">
          {/* Logo display - prominent and large */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex justify-center"
          >
            <Logo size="large" showText={true} className="scale-125" />
          </motion.div>
          
          {/* Language toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex justify-center mb-10"
          >
            <button onClick={handleToggleLanguage} className="language-toggle">
              <Globe className="h-5 w-5 text-emvi-accent" />
              <span className={language === 'en' ? 'font-medium' : 'opacity-70'}>English</span>
              <span className="mx-2 text-gray-300">|</span>
              <span className={language === 'vi' ? 'font-medium' : 'opacity-70'}>Tiếng Việt</span>
            </button>
          </motion.div>
          
          {/* Hero content with gradient heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="gradient-heading text-4xl md:text-5xl lg:text-6xl mb-6">
              {c.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              {c.hero.subtitle}
            </p>
          </motion.div>
        </Container>
      </header>
      
      <Container className="py-12">
        {/* Mission Statement - premium glassmorphism card */}
        <motion.div 
          className="premium-card mb-20 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="text-xl md:text-2xl italic text-gray-700 font-serif leading-relaxed">
            {c.mission}
          </p>
        </motion.div>
        
        {/* Timeline - Our Journey */}
        <motion.section 
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <h2 className="gradient-heading text-3xl md:text-4xl mb-12 text-center">
            {c.journey.title}
          </h2>
          
          <div className="max-w-3xl mx-auto">
            {c.journey.timeline.map((item, index) => (
              <motion.div 
                key={item.year}
                className="timeline-item"
                variants={fadeInUp}
              >
                <h3 className="timeline-year">{item.year} – {item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* Why We Exist Section */}
        <motion.section 
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="gradient-heading text-3xl md:text-4xl mb-10 text-center"
            variants={fadeInUp}
          >
            {c.why.title}
          </motion.h2>
          
          <motion.div 
            className="premium-card max-w-4xl mx-auto"
            variants={fadeInUp}
          >
            <div className="mb-8 text-xl font-medium text-center">
              {c.why.intro.map((line, i) => (
                <p key={i} className="mb-1">{line}</p>
              ))}
            </div>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {c.why.content}
            </p>
            
            <p className="text-lg text-emvi-accent font-medium">
              {c.why.conclusion}
            </p>
          </motion.div>
        </motion.section>
        
        {/* Our Values Section */}
        <motion.section 
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="gradient-heading text-3xl md:text-4xl mb-12 text-center"
            variants={fadeInUp}
          >
            {c.values.title}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {c.values.items.map((value, index) => (
              <motion.div 
                key={index} 
                className="value-card"
                variants={fadeInUp}
              >
                <h3 className="text-xl font-serif font-bold text-emvi-accent mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* Inspired by Sunshine - special styling */}
        <motion.section 
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div 
            className="dedication-card max-w-4xl mx-auto"
            variants={fadeInUp}
          >
            {/* Sun-like gradient in background */}
            <div className="absolute -top-5 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-yellow-200 to-amber-100 opacity-40 blur-2xl -z-10"></div>
            
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-400">
              {c.sunshine.title}
            </h2>
            
            {c.sunshine.content.map((paragraph, i) => (
              <p key={i} className="text-gray-700 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </motion.section>
        
        {/* Thank You, Em Vi - special styling */}
        <motion.section 
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div 
            className="dedication-card max-w-4xl mx-auto"
            variants={fadeInUp}
          >
            {/* Subtle heart-like gradient in background */}
            <div className="absolute -top-5 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 opacity-40 blur-2xl -z-10"></div>
            
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-purple-400">
              {c.emvi.title}
            </h2>
            
            {c.emvi.content.map((paragraph, i) => (
              <p key={i} className="text-gray-700 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </motion.section>
        
        {/* Call to Action */}
        <motion.section 
          className="mb-20 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="gradient-heading text-3xl md:text-4xl mb-6"
            variants={fadeInUp}
          >
            {c.cta.title}
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            {c.cta.content}
          </motion.p>
          
          <motion.div variants={fadeInUp}>
            <button className="premium-button">
              {language === 'en' ? 'Join EmviApp Today' : 'Tham Gia EmviApp Hôm Nay'}
            </button>
          </motion.div>
        </motion.section>
        
      </Container>
    </div>
  );
};

export default AboutPage;
