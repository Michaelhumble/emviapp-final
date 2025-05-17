
import React from "react";
import { motion } from "framer-motion";
import { Book, Lightbulb, Users, Star, Calendar, Sun, Heart } from "lucide-react";
import { useTranslation, Translation } from "@/hooks/useTranslation";
import { GradientBackground } from "@/components/ui/gradient-background";
import EmviLogo from "@/components/branding/EmviLogo";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 }
  }
};

// Card variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const About: React.FC = () => {
  const { language } = useTranslation();
  const isVietnamese = language === "vi";

  const renderSection = (
    title: string, 
    vietnameseTitle: string, 
    content: React.ReactNode, 
    vietnameseContent: React.ReactNode,
    icon: React.ReactNode
  ) => (
    <motion.section 
      className="mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-full bg-gradient-to-br from-purple-200 to-indigo-100 shadow-md">
          {icon}
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
          {isVietnamese ? vietnameseTitle : title}
        </h2>
      </div>
      <GradientBackground 
        className="p-6 md:p-8 rounded-xl shadow-lg"
        variant="premium"
      >
        {isVietnamese ? vietnameseContent : content}
      </GradientBackground>
    </motion.section>
  );

  const renderTimeline = () => {
    const timelineItems = [
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
        icon: <Lightbulb className="h-6 w-6 text-amber-500" />
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
        icon: <Star className="h-6 w-6 text-blue-500" />
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
        icon: <Calendar className="h-6 w-6 text-emerald-500" />
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
        icon: <Sun className="h-6 w-6 text-amber-500" />
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
        icon: <Star className="h-6 w-6 text-purple-500" />
      }
    ];

    return (
      <motion.div 
        className="space-y-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {timelineItems.map((item, index) => (
          <motion.div 
            key={item.year} 
            className="flex gap-6 items-start"
            variants={fadeIn}
          >
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-gradient-to-br from-purple-100 to-indigo-50 shadow-md">
                {item.icon}
              </div>
              <div className="h-full w-0.5 bg-gradient-to-b from-purple-300 to-transparent mt-2" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-xl mb-1">
                {item.year}
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-2 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                {isVietnamese ? item.title.vietnamese : item.title.english}
              </h3>
              <GradientBackground 
                className="p-4 md:p-6 rounded-xl shadow-md"
                variant="premium"
              >
                <p className="text-gray-700">
                  {isVietnamese ? item.content.vietnamese : item.content.english}
                </p>
              </GradientBackground>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  const renderThanksSection = (
    title: string, 
    vietnameseTitle: string,
    icon: React.ReactNode,
    theme: "sunshine" | "emvi"
  ) => {
    const themeConfig = {
      sunshine: {
        gradient: "from-amber-400 via-orange-400 to-yellow-500",
        bgGradient: "from-amber-50 to-orange-50"
      },
      emvi: {
        gradient: "from-purple-400 via-pink-400 to-rose-400",
        bgGradient: "from-purple-50 to-pink-50"
      }
    };

    return (
      <motion.section 
        className="mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-3 rounded-full bg-gradient-to-br ${themeConfig[theme].bgGradient} shadow-md`}>
            {icon}
          </div>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-playfair font-bold bg-gradient-to-r ${themeConfig[theme].gradient} bg-clip-text text-transparent`}>
            {isVietnamese ? vietnameseTitle : title}
          </h2>
        </div>
        <GradientBackground 
          className="p-6 md:p-8 rounded-xl shadow-lg"
          variant={theme === "sunshine" ? "customer" : "artist"}
        >
          {/* Content would be here but per instructions these sections are left empty */}
          <div className="h-32 flex items-center justify-center">
            <p className="text-lg text-center text-gray-600 italic">
              {theme === "sunshine" 
                ? (isVietnamese ? "Lấy Cảm Hứng Từ Sunshine" : "Inspired by Sunshine") 
                : (isVietnamese ? "Cảm Ơn, Em Vi" : "Thank you, Em Vi")}
            </p>
          </div>
        </GradientBackground>
      </motion.section>
    );
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-center mb-12">
        <EmviLogo showText size="large" />
      </div>

      {/* Hero Section */}
      <motion.div 
        className="text-center mb-16"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
          {isVietnamese ? "Câu Chuyện Của Chúng Tôi" : "Our Story"}
        </h1>
        <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto text-gray-700">
          {isVietnamese 
            ? "Xây dựng cầu nối giữa các chuyên gia làm đẹp tài năng và khách hàng trân trọng họ." 
            : "Building bridges between talented beauty professionals and the clients who value them."}
        </p>
      </motion.div>

      {/* Why We Started Section */}
      {renderSection(
        "Why We Started EmviApp",
        "Tại Sao Chúng Tôi Bắt Đầu EmviApp",
        <p className="text-gray-700">
          EmviApp was born from a simple observation: the beauty industry needed a platform that truly understood its heart and soul. In salons across America, we saw incredible talent flourishing alongside real challenges—language barriers, cultural misunderstandings, and digital gaps that traditional platforms weren't addressing.
          <br /><br />
          What started as a vision to connect communities has grown into something more: a home where artists are celebrated, where salons can thrive, and where clients can discover exceptional talent with confidence and ease.
        </p>,
        <p className="text-gray-700">
          EmviApp ra đời từ một quan sát đơn giản: ngành công nghiệp làm đẹp cần một nền tảng thực sự hiểu được trái tim và tâm hồn của nó. Tại các tiệm làm đẹp khắp nước Mỹ, chúng tôi nhận thấy những tài năng tuyệt vời đang phát triển cùng với những thách thức thực sự—rào cản ngôn ngữ, hiểu lầm văn hóa, và khoảng cách kỹ thuật số mà các nền tảng truyền thống không giải quyết được.
          <br /><br />
          Điều bắt đầu như một tầm nhìn để kết nối cộng đồng đã phát triển thành một điều gì đó lớn hơn: một ngôi nhà nơi các nghệ sĩ được tôn vinh, nơi các tiệm có thể phát triển, và nơi khách hàng có thể khám phá tài năng đặc biệt với sự tự tin và dễ dàng.
        </p>,
        <Lightbulb className="h-6 w-6 text-amber-500" />
      )}

      {/* Personal Connection Section */}
      {renderSection(
        "A Personal Connection",
        "Kết Nối Cá Nhân",
        <p className="text-gray-700">
          Growing up in a family deeply connected to the beauty industry, I witnessed firsthand both the immense talent and the unique challenges faced by Vietnamese beauty professionals in America. I saw my family members and their colleagues struggle to have their skills recognized despite their exceptional artistry.
          <br /><br />
          EmviApp is more than just technology—it's a bridge between cultures, a celebration of craft, and a promise that talent will always find its rightful recognition. We've built this platform with love and understanding that can only come from lived experience.
        </p>,
        <p className="text-gray-700">
          Lớn lên trong một gia đình gắn bó sâu sắc với ngành làm đẹp, tôi đã chứng kiến trực tiếp cả tài năng to lớn và những thách thức độc đáo mà các chuyên gia làm đẹp Việt Nam phải đối mặt tại Mỹ. Tôi đã thấy các thành viên trong gia đình và đồng nghiệp của họ phải đấu tranh để được công nhận kỹ năng mặc dù họ có tài năng nghệ thuật đặc biệt.
          <br /><br />
          EmviApp không chỉ là công nghệ—đó là cầu nối giữa các nền văn hóa, sự tôn vinh kỹ năng, và lời hứa rằng tài năng sẽ luôn được công nhận xứng đáng. Chúng tôi đã xây dựng nền tảng này với tình yêu và sự thấu hiểu chỉ có thể đến từ trải nghiệm sống.
        </p>,
        <Users className="h-6 w-6 text-indigo-500" />
      )}

      {/* What Makes Us Different Section */}
      {renderSection(
        "What Makes Us Different",
        "Điều Gì Làm Nên Sự Khác Biệt",
        <>
          <p className="text-gray-700 mb-6">
            Every decision we make, from design to development, starts with a simple question: "How will this help our community?" Our platform is crafted by people who understand the beauty industry from lived experience—not just market research.
          </p>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-4 mt-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Cultural Understanding",
                content: "We embrace both English and Vietnamese, recognizing the power of communicating in one's native language."
              },
              {
                title: "Community First",
                content: "Every feature is built to strengthen connections between artists, salon owners, and clients."
              },
              {
                title: "Authentic Representation",
                content: "We showcase real talent and real stories, highlighting the artistry behind every service."
              },
              {
                title: "Fair and Transparent",
                content: "We've built a platform where both businesses and customers can thrive with clarity and trust."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl shadow-sm border border-gray-100"
                variants={fadeIn}
              >
                <h3 className="text-lg font-medium mb-2 text-indigo-700">{feature.title}</h3>
                <p className="text-gray-600">{feature.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </>,
        <>
          <p className="text-gray-700 mb-6">
            Mỗi quyết định chúng tôi đưa ra, từ thiết kế đến phát triển, bắt đầu với một câu hỏi đơn giản: "Điều này sẽ giúp cộng đồng của chúng ta như thế nào?" Nền tảng của chúng tôi được tạo nên bởi những người hiểu ngành làm đẹp từ trải nghiệm sống thực tế—không chỉ từ nghiên cứu thị trường.
          </p>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-4 mt-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Hiểu Biết Văn Hóa",
                content: "Chúng tôi sử dụng cả tiếng Anh và tiếng Việt, công nhận sức mạnh của việc giao tiếp bằng tiếng mẹ đẻ."
              },
              {
                title: "Cộng Đồng Là Hàng Đầu",
                content: "Mỗi tính năng được xây dựng để củng cố kết nối giữa nghệ sĩ, chủ salon và khách hàng."
              },
              {
                title: "Đại Diện Chân Thực",
                content: "Chúng tôi giới thiệu những tài năng thực và câu chuyện thực, làm nổi bật nghệ thuật đằng sau mỗi dịch vụ."
              },
              {
                title: "Công Bằng và Minh Bạch",
                content: "Chúng tôi đã xây dựng một nền tảng nơi cả doanh nghiệp và khách hàng có thể phát triển với sự tôn trọng lẫn nhau và minh bạch tuyệt đối."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl shadow-sm border border-gray-100"
                variants={fadeIn}
              >
                <h3 className="text-lg font-medium mb-2 text-indigo-700">{feature.title}</h3>
                <p className="text-gray-600">{feature.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </>,
        <Star className="h-6 w-6 text-purple-500" />
      )}

      {/* Our Journey Section */}
      <motion.section 
        className="mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="flex items-center gap-3 mb-12">
          <div className="p-3 rounded-full bg-gradient-to-br from-blue-200 to-indigo-100 shadow-md">
            <Calendar className="h-6 w-6 text-blue-500" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            {isVietnamese ? "Hành Trình" : "Our Journey"}
          </h2>
        </div>
        
        <GradientBackground 
          className="p-6 md:p-8 rounded-xl shadow-lg"
          variant="premium"
        >
          {renderTimeline()}
        </GradientBackground>
      </motion.section>

      {/* Thank You Sections */}
      {renderThanksSection(
        "Inspired by Sunshine",
        "Lấy Cảm Hứng Từ Sunshine",
        <Sun className="h-6 w-6 text-yellow-500" />,
        "sunshine"
      )}

      {renderThanksSection(
        "Thank You, Em Vi",
        "Cảm Ơn, Em Vi",
        <Heart className="h-6 w-6 text-rose-500" />,
        "emvi"
      )}
    </div>
  );
};

export default About;
