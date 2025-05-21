import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { CalendarDays, Heart, Users, Star, Sparkles, Lightbulb, Sun, Medal } from "lucide-react";
import { GradientBackground } from "@/components/ui/gradient-background";
import { Button } from "@/components/ui/button";
import LanguageToggleButton from "@/components/home/missing-piece/LanguageToggleButton";

const About = () => {
  const { t, isVietnamese, toggleLanguage } = useTranslation();

  // Timeline data with translations
  const timelineData = [
    {
      year: "2014",
      title: {
        english: "The Idea is Born",
        vietnamese: "Ý Tưởng Ra Đời"
      },
      description: {
        english: "After years in the beauty industry, I saw a critical gap that needed to be filled. A vision emerged to create something that would truly unite beauty professionals and their clients.",
        vietnamese: "Sau nhiều năm trong ngành làm đẹp, tôi nhận thấy một khoảng trống quan trọng cần được lấp đầy. Một tầm nhìn đã hình thành để tạo ra điều gì đó thực sự kết nối các chuyên gia làm đẹp và khách hàng."
      },
      icon: <Lightbulb className="h-10 w-10 text-amber-500" />
    },
    {
      year: "2015",
      title: {
        english: "First Attempts & Struggles",
        vietnamese: "Nỗ Lực Đầu Tiên & Khó Khăn"
      },
      description: {
        english: "The first mobile app build began with high hopes but faced overwhelming technical challenges. Despite setbacks and failures, the dream remained alive through persistence.",
        vietnamese: "Việc xây dựng ứng dụng di động đầu tiên bắt đầu với nhiều hy vọng nhưng đối mặt với những thách thức kỹ thuật khó khăn. Mặc dù thất bại, giấc mơ vẫn sống nhờ sự kiên trì."
      },
      icon: <CalendarDays className="h-10 w-10 text-blue-500" />
    },
    {
      year: "2016-2023",
      title: {
        english: "Years of Learning & Growth",
        vietnamese: "Những Năm Học Hỏi & Phát Triển"
      },
      description: {
        english: "Seven years of heartbreak, learning, and rebuilding. Through countless iterations, market research, and personal sacrifice, the vision evolved but the mission stayed true.",
        vietnamese: "Bảy năm đau lòng, học hỏi và tái thiết. Qua vô số lần thử nghiệm, nghiên cứu thị trường và hy sinh cá nhân, tầm nhìn phát triển nhưng sứ mệnh vẫn không thay đổi."
      },
      icon: <Medal className="h-10 w-10 text-emerald-500" />
    },
    {
      year: "2024",
      title: {
        english: "New Hope, Fresh Start",
        vietnamese: "Hy Vọng Mới, Khởi Đầu Mới"
      },
      description: {
        english: "With renewed determination and inspiration from Sunshine, EmviApp was rebuilt from scratch. This time, with better technology, deeper industry insights, and unwavering focus.",
        vietnamese: "Với quyết tâm mới và nguồn cảm hứng từ Sunshine, EmviApp được xây dựng lại từ đầu. Lần này, với công nghệ tốt hơn, hiểu biết sâu sắc hơn về ngành và sự tập trung không thay đổi."
      },
      icon: <Sparkles className="h-10 w-10 text-purple-500" />
    },
    {
      year: "2025",
      title: {
        english: "Dreams Come True",
        vietnamese: "Giấc Mơ Thành Hiện Thực"
      },
      description: {
        english: "The official launch marks a dream realized after more than a decade of persistence. EmviApp finally emerges as the platform that transforms connections in the beauty industry forever.",
        vietnamese: "Sự ra mắt chính thức đánh dấu một giấc mơ trở thành hiện thực sau hơn một thập kỷ kiên trì. EmviApp cuối cùng đã xuất hiện như một nền tảng biến đổi kết nối trong ngành làm đẹp mãi mãi."
      },
      icon: <Star className="h-10 w-10 text-yellow-500" />
    }
  ];

  // Values data with translations
  const valuesData = [
    {
      title: {
        english: "Community First",
        vietnamese: "Cộng Đồng Là Trên Hết"
      },
      description: {
        english: "We believe in the power of a united beauty industry where professionals support each other and grow together.",
        vietnamese: "Chúng tôi tin vào sức mạnh của một ngành làm đẹp đoàn kết, nơi các chuyên gia hỗ trợ nhau và cùng nhau phát triển."
      },
      icon: <Users className="h-10 w-10 text-indigo-500" />
    },
    {
      title: {
        english: "Quality Service",
        vietnamese: "Dịch Vụ Chất Lượng"
      },
      description: {
        english: "Every connection made on our platform aims to deliver exceptional service that transforms both businesses and client experiences.",
        vietnamese: "Mỗi kết nối được tạo ra trên nền tảng của chúng tôi nhằm cung cấp dịch vụ xuất sắc, biến đổi cả doanh nghiệp và trải nghiệm khách hàng."
      },
      icon: <Medal className="h-10 w-10 text-emerald-500" />
    },
    {
      title: {
        english: "Inclusivity",
        vietnamese: "Tính Bao Trùm"
      },
      description: {
        english: "Beauty has no boundaries. Our platform welcomes all professionals, specialties, and clients across cultural and language divides.",
        vietnamese: "Vẻ đẹp không có giới hạn. Nền tảng của chúng tôi chào đón tất cả các chuyên gia, chuyên môn và khách hàng vượt qua rào cản văn hóa và ngôn ngữ."
      },
      icon: <Heart className="h-10 w-10 text-rose-500" />
    },
    {
      title: {
        english: "Innovation",
        vietnamese: "Đổi Mới"
      },
      description: {
        english: "We constantly evolve our technology and services to meet the ever-changing needs of beauty professionals and their clients.",
        vietnamese: "Chúng tôi liên tục phát triển công nghệ và dịch vụ của mình để đáp ứng nhu cầu luôn thay đổi của các chuyên gia làm đẹp và khách hàng của họ."
      },
      icon: <Sparkles className="h-10 w-10 text-blue-500" />
    }
  ];

  return (
    <Layout>
      {/* Language Toggle Button */}
      <div className="absolute top-20 right-4 z-10 md:top-24 md:right-8">
        <LanguageToggleButton isVietnamese={isVietnamese} toggleLanguage={toggleLanguage} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto text-center z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
              {t({
                english: "Beautiful Connections, Beautiful Business",
                vietnamese: "Kết Nối Đẹp, Kinh Doanh Thịnh Vượng"
              })}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t({
                english: "Uniting beauty professionals and clients through meaningful connections that transform the industry.",
                vietnamese: "Kết nối các chuyên gia làm đẹp và khách hàng thông qua những mối quan hệ ý nghĩa, biến đổi ngành công nghiệp."
              })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <GradientBackground className="p-8 md:p-12">
              <div className="flex flex-col items-center">
                <Sparkles className="h-14 w-14 text-primary mb-4" />
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
                  {t({
                    english: "Our Mission",
                    vietnamese: "Sứ Mệnh Của Chúng Tôi"
                  })}
                </h2>
                <p className="text-lg text-gray-700 text-center">
                  {t({
                    english: "To create a seamless platform where beauty professionals can thrive, salons can grow, and clients can discover exceptional services—all in one elegant ecosystem.",
                    vietnamese: "Tạo ra một nền tảng liền mạch nơi các chuyên gia làm đẹp có thể phát triển, các salon có thể phát triển và khách hàng có thể khám phá các dịch vụ xuất sắc—tất cả trong một hệ sinh thái thanh lịch."
                  })}
                </p>
              </div>
            </GradientBackground>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {t({
                english: "Our Journey",
                vietnamese: "Cuộc Hành Trình"
              })}
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="flex flex-col md:flex-row mb-10 items-center md:items-start"
              >
                <div className="md:w-1/4 flex flex-col items-center mb-4 md:mb-0">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    {item.icon}
                  </div>
                  <span className="text-lg font-bold text-primary">{item.year}</span>
                </div>
                <div className="md:w-3/4 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h3 className="text-xl font-playfair font-bold text-gray-800 mb-2">
                    {t(item.title)}
                  </h3>
                  <p className="text-gray-600">
                    {t(item.description)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {t({
                english: "Our Values",
                vietnamese: "Giá Trị Cốt Lõi"
              })}
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {valuesData.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 backdrop-blur-sm rounded-xl shadow-md p-6"
              >
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-playfair font-bold text-gray-800 mb-2 text-center">
                    {t(value.title)}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {t(value.description)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspired by Sunshine Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-yellow-200 p-8 md:p-10">
              <div className="flex justify-center mb-6">
                <Sun className="h-14 w-14 text-amber-400" />
              </div>
              <h2 className="font-playfair text-3xl font-bold text-amber-700 mb-4 text-center">
                {t({
                  english: "Inspired by Sunshine ☀️",
                  vietnamese: "Lấy Cảm Hứng từ Sunshine ☀️"
                })}
              </h2>
              <div className="text-gray-700 text-lg space-y-4">
                <p className="italic">
                  {t({
                    english: "Every great journey needs a little light.",
                    vietnamese: "Mỗi hành trình vĩ đại đều cần một chút ánh sáng."
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
                    english: "EmviApp was born from years of experience, struggle, and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and finally bring this dream to life.",
                    vietnamese: "EmviApp ra đời từ nhiều năm kinh nghiệm, đấu tranh và theo đuổi không ngừng nghỉ, nhưng chính Sunshine đã cho tôi sự can đảm và tầm nhìn để bắt đầu lại và cuối cùng đưa giấc mơ này thành hiện thực."
                  })}
                </p>
                <p>
                  {t({
                    english: "Thank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you.",
                    vietnamese: "Cảm ơn Sunshine, vì đã xuất hiện trong cuộc đời tôi. Dự án này—và mỗi kết nối mà nó tạo ra—sẽ không tồn tại nếu không có em."
                  })}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Thank You Em Vi Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <GradientBackground className="p-8 md:p-10" variant="premium">
              <div className="flex justify-center mb-6">
                <Heart className="h-14 w-14 text-rose-500" />
              </div>
              <h2 className="font-playfair text-3xl font-bold text-gray-800 mb-4 text-center">
                {t({
                  english: "Thank You, Em Vi",
                  vietnamese: "Cảm Ơn Em, Vi"
                })}
              </h2>
              <p className="text-gray-700 text-lg text-center">
                {t({
                  english: "This app is named after Em Vi—the person who supported and sacrificed for me, even when I doubted myself. You stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you.",
                  vietnamese: "Ứng dụng này được đặt theo tên Em Vi—người đã ủng hộ và hy sinh cho tôi, ngay cả khi tôi nghi ngờ bản thân. Em đã ở bên tôi, bất kể điều gì. Vì tất cả tình yêu thầm lặng, sự khích lệ và sức mạnh em đã trao, đây là dành cho em."
                })}
              </p>
            </GradientBackground>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t({
                english: "Join Us on This Journey",
                vietnamese: "Hãy Tham Gia Hành Trình Này"
              })}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              {t({
                english: "Whether you're an artist looking to grow, a salon seeking talent, or a customer searching for quality services—EmviApp is built for you.",
                vietnamese: "Dù bạn là một nghệ sĩ muốn phát triển, một salon tìm kiếm tài năng, hay một khách hàng tìm kiếm dịch vụ chất lượng—EmviApp được xây dựng cho bạn."
              })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-white px-6 py-2 rounded-lg shadow-md hover:bg-primary/90 transition-colors">
                {t({
                  english: "Sign Up Today",
                  vietnamese: "Đăng Ký Ngay"
                })}
              </Button>
              <Button variant="outline" size="lg" className="px-6 py-2 rounded-lg shadow-sm border border-primary text-primary hover:bg-primary/10 transition-colors">
                {t({
                  english: "Learn More",
                  vietnamese: "Tìm Hiểu Thêm"
                })}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
