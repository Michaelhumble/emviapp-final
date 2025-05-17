
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Link, 
  LinkVariant, 
  Lightbulb, 
  AccountHeart, 
  StarFourPoints, 
  TimelineClock, 
  Sun, 
  Heart, 
  Translate, 
  Users, 
  BadgeAccount, 
  Handshake 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import EmviLogo from '@/components/branding/EmviLogo';

// Define each section's content with both English and Vietnamese versions
const content = {
  ourStory: {
    title: {
      english: "Our Story",
      vietnamese: "Câu Chuyện Của Chúng Tôi"
    },
    description: {
      english: "Building bridges between talented beauty professionals and the clients who value them.",
      vietnamese: "Xây dựng cầu nối giữa các chuyên gia làm đẹp tài năng và khách hàng trân trọng họ."
    }
  },
  whyWeStarted: {
    title: {
      english: "Why We Started EmviApp",
      vietnamese: "Tại Sao Chúng Tôi Bắt Đầu EmviApp"
    },
    paragraphs: {
      english: [
        "EmviApp was born from a simple observation: the beauty industry needed a platform that truly understood its heart and soul. In salons across America, we saw incredible talent flourishing alongside real challenges—language barriers, cultural misunderstandings, and digital gaps that traditional platforms weren't addressing.",
        "What started as a vision to connect communities has grown into something more: a home where artists are celebrated, where salons can thrive, and where clients can discover exceptional talent with confidence and ease."
      ],
      vietnamese: [
        "EmviApp ra đời từ một quan sát đơn giản: ngành công nghiệp làm đẹp cần một nền tảng thực sự hiểu được trái tim và tâm hồn của nó. Tại các tiệm làm đẹp khắp nước Mỹ, chúng tôi nhận thấy những tài năng tuyệt vời đang phát triển cùng với những thách thức thực sự—rào cản ngôn ngữ, hiểu lầm văn hóa, và khoảng cách kỹ thuật số mà các nền tảng truyền thống không giải quyết được.",
        "Điều bắt đầu như một tầm nhìn để kết nối cộng đồng đã phát triển thành một điều gì đó lớn hơn: một ngôi nhà nơi các nghệ sĩ được tôn vinh, nơi các tiệm có thể phát triển, và nơi khách hàng có thể khám phá tài năng đặc biệt với sự tự tin và dễ dàng."
      ]
    }
  },
  personalConnection: {
    title: {
      english: "A Personal Connection",
      vietnamese: "Kết Nối Cá Nhân"
    },
    paragraphs: {
      english: [
        "Growing up in a family deeply connected to the beauty industry, I witnessed firsthand both the immense talent and the unique challenges faced by Vietnamese beauty professionals in America. I saw my family members and their colleagues struggle to have their skills recognized despite their exceptional artistry.",
        "EmviApp is more than just technology—it's a bridge between cultures, a celebration of craft, and a promise that talent will always find its rightful recognition. We've built this platform with love and understanding that can only come from lived experience."
      ],
      vietnamese: [
        "Lớn lên trong một gia đình gắn bó sâu sắc với ngành làm đẹp, tôi đã chứng kiến trực tiếp cả tài năng to lớn và những thách thức độc đáo mà các chuyên gia làm đẹp Việt Nam phải đối mặt tại Mỹ. Tôi đã thấy các thành viên trong gia đình và đồng nghiệp của họ phải đấu tranh để được công nhận kỹ năng mặc dù họ có tài năng nghệ thuật đặc biệt.",
        "EmviApp không chỉ là công nghệ—đó là cầu nối giữa các nền văn hóa, sự tôn vinh kỹ năng, và lời hứa rằng tài năng sẽ luôn được công nhận xứng đáng. Chúng tôi đã xây dựng nền tảng này với tình yêu và sự thấu hiểu chỉ có thể đến từ trải nghiệm sống."
      ]
    }
  },
  whatMakesUsDifferent: {
    title: {
      english: "What Makes Us Different",
      vietnamese: "Điều Gì Làm Nên Sự Khác Biệt"
    },
    intro: {
      english: "Every decision we make, from design to development, starts with a simple question: "How will this help our community?" Our platform is crafted by people who understand the beauty industry from lived experience—not just market research.",
      vietnamese: "Mỗi quyết định chúng tôi đưa ra, từ thiết kế đến phát triển, bắt đầu với một câu hỏi đơn giản: "Điều này sẽ giúp cộng đồng của chúng ta như thế nào?" Nền tảng của chúng tôi được tạo nên bởi những người hiểu ngành làm đẹp từ trải nghiệm sống thực tế—không chỉ từ nghiên cứu thị trường."
    },
    values: [
      {
        title: {
          english: "Cultural Understanding",
          vietnamese: "Hiểu Biết Văn Hóa"
        },
        description: {
          english: "We embrace both English and Vietnamese, recognizing the power of communicating in one's native language.",
          vietnamese: "Chúng tôi sử dụng cả tiếng Anh và tiếng Việt, công nhận sức mạnh của việc giao tiếp bằng tiếng mẹ đẻ."
        },
        icon: Translate
      },
      {
        title: {
          english: "Community First",
          vietnamese: "Cộng Đồng Là Hàng Đầu"
        },
        description: {
          english: "Every feature is built to strengthen connections between artists, salon owners, and clients.",
          vietnamese: "Mỗi tính năng được xây dựng để củng cố kết nối giữa nghệ sĩ, chủ salon và khách hàng."
        },
        icon: Users
      },
      {
        title: {
          english: "Authentic Representation",
          vietnamese: "Đại Diện Chân Thực"
        },
        description: {
          english: "We showcase real talent and real stories, highlighting the artistry behind every service.",
          vietnamese: "Chúng tôi giới thiệu những tài năng thực và câu chuyện thực, làm nổi bật nghệ thuật đằng sau mỗi dịch vụ."
        },
        icon: BadgeAccount
      },
      {
        title: {
          english: "Fair and Transparent",
          vietnamese: "Công Bằng và Minh Bạch"
        },
        description: {
          english: "We've built a platform where both businesses and customers can thrive with clarity and trust.",
          vietnamese: "Chúng tôi đã xây dựng một nền tảng nơi cả doanh nghiệp và khách hàng có thể phát triển với sự tôn trọng lẫn nhau và minh bạch tuyệt đối."
        },
        icon: Handshake
      }
    ]
  },
  journey: {
    title: {
      english: "Our Journey",
      vietnamese: "Hành Trình"
    },
    timeline: [
      {
        year: "2014",
        title: {
          english: "The Spark",
          vietnamese: "Ý Tưởng Ra Đời"
        },
        description: {
          english: "After years in beauty, I saw an important gap that needed to be filled. A vision formed to create something that would truly connect beauty professionals and clients.",
          vietnamese: "Sau nhiều năm trong ngành làm đẹp, tôi nhận thấy một khoảng trống quan trọng cần được lấp đầy. Một tầm nhìn đã hình thành để tạo ra điều gì đó thực sự kết nối các chuyên gia làm đẹp và khách hàng."
        }
      },
      {
        year: "2015",
        title: {
          english: "The First Effort & Hardship",
          vietnamese: "Nỗ Lực Đầu Tiên & Khó Khăn"
        },
        description: {
          english: "Building the first mobile app began with hope but met tough technical challenges. Even in failure, the dream lived on through persistence.",
          vietnamese: "Việc xây dựng ứng dụng di động đầu tiên bắt đầu với nhiều hy vọng nhưng đối mặt với những thách thức kỹ thuật khó khăn. Mặc dù thất bại, giấc mơ vẫn sống nhờ sự kiên trì."
        }
      },
      {
        year: "2016–2023",
        title: {
          english: "The Years of Learning & Growth",
          vietnamese: "Những Năm Học Hỏi & Phát Triển"
        },
        description: {
          english: "Seven years of heartbreak, learning, and rebuilding. Through countless experiments, market research, and personal sacrifice, the vision grew but the mission never changed.",
          vietnamese: "Bảy năm đau lòng, học hỏi và tái thiết. Qua vô số lần thử nghiệm, nghiên cứu thị trường và hy sinh cá nhân, tầm nhìn phát triển nhưng sứ mệnh vẫn không thay đổi."
        }
      },
      {
        year: "2024",
        title: {
          english: "New Hope, New Beginning",
          vietnamese: "Hy Vọng Mới, Khởi Đầu Mới"
        },
        description: {
          english: "With new determination and inspiration from Sunshine, EmviApp was rebuilt from the ground up. This time: better tech, deeper industry understanding, unwavering focus.",
          vietnamese: "Với quyết tâm mới và nguồn cảm hứng từ Sunshine, EmviApp được xây dựng lại từ đầu. Lần này, với công nghệ tốt hơn, hiểu biết sâu sắc hơn về ngành và sự tập trung không thay đổi."
        }
      },
      {
        year: "2025",
        title: {
          english: "The Dream Becomes Real",
          vietnamese: "Giấc Mơ Thành Hiện Thực"
        },
        description: {
          english: "The official launch marks a dream realized after over a decade of perseverance. EmviApp has finally emerged as a lasting platform for beauty industry connection.",
          vietnamese: "Sự ra mắt chính thức đánh dấu một giấc mơ trở thành hiện thực sau hơn một thập kỷ kiên trì. EmviApp cuối cùng đã xuất hiện như một nền tảng bền vững kết nối trong ngành làm đẹp mãi mãi."
        }
      }
    ]
  },
  thankYouSunshine: {
    title: {
      english: "Thank You, Sunshine",
      vietnamese: "Lấy Cảm Hứng Từ Sunshine"
    },
    message: {
      english: "Every great journey needs a little light. The rebirth of EmviApp wouldn't have been possible without the endless encouragement, wisdom, and love from someone special—my Sunshine. Through every setback and victory, your belief in this vision never wavered. This platform carries your spirit in every pixel.",
      vietnamese: "Mỗi hành trình vĩ đại đều cần một chút ánh sáng. Sự tái sinh của EmviApp sẽ không thể thực hiện được nếu không có sự khích lệ, sự khôn ngoan và tình yêu vô tận từ một người đặc biệt—Sunshine của tôi. Qua mọi thất bại và chiến thắng, niềm tin của bạn vào tầm nhìn này không bao giờ dao động. Nền tảng này mang tinh thần của bạn trong từng pixel."
    }
  },
  thankYouEmVi: {
    title: {
      english: "Thank You, Em Vi",
      vietnamese: "Cảm Ơn, Em Vi"
    },
    message: {
      english: "To my daughter, Em Vi—you are the inspiration behind our name and mission. Your curious eyes and boundless imagination remind me daily why connecting people through beauty matters. As you grow, I hope this platform shows you that dreams built on empathy and perseverance can change the world. This is for you.",
      vietnamese: "Gửi con gái của anh, Em Vi—con là nguồn cảm hứng đằng sau tên gọi và sứ mệnh của chúng ta. Đôi mắt tò mò và trí tưởng tượng vô biên của con nhắc nhở anh hàng ngày lý do tại sao việc kết nối mọi người thông qua vẻ đẹp lại quan trọng. Khi con lớn lên, anh hy vọng nền tảng này sẽ cho con thấy rằng những giấc mơ được xây dựng trên sự đồng cảm và kiên trì có thể thay đổi thế giới. Điều này là dành cho con."
    }
  },
  footer: {
    inspiredBy: {
      english: "Inspired by Sunshine ☀️",
      vietnamese: "Lấy cảm hứng từ Sunshine ☀️"
    },
    links: {
      english: ["Home", "Jobs", "Salons", "Artists", "About", "Contact"],
      vietnamese: ["Trang Chủ", "Công Việc", "Tiệm", "Nghệ Sĩ", "Về Chúng Tôi", "Liên Hệ"]
    }
  }
};

const About: React.FC = () => {
  const { language, setLanguage } = useTranslation();
  const isVietnamese = language === 'vi';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Card component with icon
  const SectionCard = ({ 
    icon, 
    title, 
    children, 
    className = "" 
  }: { 
    icon: React.ReactNode, 
    title: string, 
    children: React.ReactNode, 
    className?: string 
  }) => (
    <motion.div
      variants={itemVariants}
      className={`w-full ${className}`}
    >
      <Card className="bg-[rgba(255,255,255,0.88)] backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
        <CardContent className="p-4 md:p-8">
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-r from-[#FF7743] to-[#9A7B69] text-white p-2 rounded-full">
              {icon}
            </div>
            <h2 className="ml-4 text-2xl md:text-3xl font-playfair font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF7743] to-[#9A7B69]">
              {title}
            </h2>
          </div>
          <div className="font-inter text-gray-800">
            {children}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 to-[#F6F6F7] min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Logo and Language Switcher */}
        <motion.div 
          className="flex flex-col items-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <EmviLogo size="large" showText className="mb-4" />
          
          {/* Language Switcher */}
          <div className="flex items-center border border-emvi-light rounded-full overflow-hidden">
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                !isVietnamese 
                  ? 'bg-gradient-to-r from-[#FF7743] to-[#9A7B69] text-white' 
                  : 'text-emvi-dark'
              }`}
            >
              EN
            </button>
            <div className="h-5 w-px bg-emvi-light"></div>
            <button
              onClick={() => setLanguage('vi')}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                isVietnamese 
                  ? 'bg-gradient-to-r from-[#FF7743] to-[#9A7B69] text-white' 
                  : 'text-emvi-dark'
              }`}
            >
              VI
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Our Story */}
          <SectionCard 
            icon={<LinkVariant size={28} />} 
            title={isVietnamese ? content.ourStory.title.vietnamese : content.ourStory.title.english}
          >
            <p className="text-center text-lg md:text-xl max-w-xl mx-auto">
              {isVietnamese ? content.ourStory.description.vietnamese : content.ourStory.description.english}
            </p>
          </SectionCard>

          {/* Why We Started EmviApp */}
          <SectionCard 
            icon={<Lightbulb size={28} />} 
            title={isVietnamese ? content.whyWeStarted.title.vietnamese : content.whyWeStarted.title.english}
          >
            <div className="space-y-4">
              {(isVietnamese ? content.whyWeStarted.paragraphs.vietnamese : content.whyWeStarted.paragraphs.english).map((paragraph, i) => (
                <p key={i} className="text-base md:text-lg">{paragraph}</p>
              ))}
            </div>
          </SectionCard>

          {/* A Personal Connection */}
          <SectionCard 
            icon={<AccountHeart size={28} />} 
            title={isVietnamese ? content.personalConnection.title.vietnamese : content.personalConnection.title.english}
            className="bg-gradient-to-br from-purple-50 to-white"
          >
            <div className="space-y-4">
              {(isVietnamese ? content.personalConnection.paragraphs.vietnamese : content.personalConnection.paragraphs.english).map((paragraph, i) => (
                <p key={i} className="text-base md:text-lg">{paragraph}</p>
              ))}
            </div>
          </SectionCard>

          {/* What Makes Us Different */}
          <SectionCard 
            icon={<StarFourPoints size={28} />} 
            title={isVietnamese ? content.whatMakesUsDifferent.title.vietnamese : content.whatMakesUsDifferent.title.english}
          >
            <p className="text-base md:text-lg mb-6">
              {isVietnamese ? content.whatMakesUsDifferent.intro.vietnamese : content.whatMakesUsDifferent.intro.english}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.whatMakesUsDifferent.values.map((value, i) => {
                const ValueIcon = value.icon;
                return (
                  <div 
                    key={i}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md"
                  >
                    <div className="flex items-center mb-2">
                      <ValueIcon className="h-5 w-5 text-[#9A7B69] mr-2" />
                      <h3 className="font-medium text-lg">
                        {isVietnamese ? value.title.vietnamese : value.title.english}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-700">
                      {isVietnamese ? value.description.vietnamese : value.description.english}
                    </p>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          {/* Journey / Timeline */}
          <SectionCard 
            icon={<TimelineClock size={28} />} 
            title={isVietnamese ? content.journey.title.vietnamese : content.journey.title.english}
          >
            <div className="relative pl-8 mt-6">
              <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF7743] to-[#9A7B69]"></div>
              
              <div className="space-y-8">
                {content.journey.timeline.map((milestone, i) => (
                  <div key={i} className="relative">
                    <div className="absolute left-[-28px] top-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#FF7743] to-[#9A7B69] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
                      <div className="flex items-center mb-2">
                        <h3 className="font-playfair font-bold text-lg mr-2">
                          {milestone.year}
                        </h3>
                        <span className="text-gray-700">–</span>
                        <span className="ml-2 text-gray-700">
                          {isVietnamese ? milestone.title.vietnamese : milestone.title.english}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {isVietnamese ? milestone.description.vietnamese : milestone.description.english}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* Thank You Sunshine */}
          <SectionCard 
            icon={<Sun size={28} />} 
            title={isVietnamese ? content.thankYouSunshine.title.vietnamese : content.thankYouSunshine.title.english}
            className="bg-gradient-to-br from-pink-50 to-amber-50"
          >
            <p className="text-center text-base md:text-lg italic font-medium p-4 md:p-8">
              {isVietnamese ? content.thankYouSunshine.message.vietnamese : content.thankYouSunshine.message.english}
            </p>
          </SectionCard>

          {/* Thank You Em Vi */}
          <SectionCard 
            icon={<Heart size={28} />} 
            title={isVietnamese ? content.thankYouEmVi.title.vietnamese : content.thankYouEmVi.title.english}
            className="bg-gradient-to-br from-pink-50 to-purple-50"
          >
            <p className="text-center text-base md:text-lg italic font-medium p-4 md:p-8">
              {isVietnamese ? content.thankYouEmVi.message.vietnamese : content.thankYouEmVi.message.english}
            </p>
          </SectionCard>
        </motion.div>

        {/* Footer */}
        <footer className="mt-12 py-8 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex flex-col md:flex-row items-center justify-between">
              <EmviLogo size="small" showText />
              <p className="mt-4 md:mt-0 text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#FF7743] to-[#9A7B69]">
                {isVietnamese ? content.footer.inspiredBy.vietnamese : content.footer.inspiredBy.english}
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm">
              {(isVietnamese ? content.footer.links.vietnamese : content.footer.links.english).map((link, i) => (
                <a key={i} href="#" className="text-gray-600 hover:text-[#FF7743] transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default About;
