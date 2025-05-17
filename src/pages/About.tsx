import React, { useState } from 'react';
import { Heart } from "lucide-react"; // Changed from UserHeart to Heart
import { Card } from "@/components/ui/card";
import { useTranslation, Translation } from '@/hooks/useTranslation';
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";

const About = () => {
  const { t, language, toggleLanguage } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "vi">(language);

  const handleLanguageToggle = () => {
    toggleLanguage();
    setCurrentLanguage(language === "en" ? "vi" : "en");
  };

  // Define translations for the page
  const translations: Record<string, Translation> = {
    hero_title: {
      english: "Beautiful Connections, Beautiful Business",
      vietnamese: "Kết Nối Đẹp, Doanh Nghiệp Đẹp"
    },
    hero_subtitle: {
      english: "We're not just building an app. We're rewriting the story of the beauty industry—one real connection at a time.",
      vietnamese: "Chúng tôi không chỉ xây dựng một ứng dụng. Chúng tôi đang viết lại câu chuyện của ngành làm đẹp—từng kết nối thực sự."
    },
    our_story_title: {
      english: "Our Story",
      vietnamese: "Câu Chuyện Của Chúng Tôi"
    },
    our_story_subtitle: {
      english: "Building bridges between talented beauty professionals and the clients who value them.",
      vietnamese: "Xây dựng cầu nối giữa các chuyên gia làm đẹp tài năng và khách hàng trân trọng họ."
    },
    why_we_started_title: {
      english: "Why We Started EmviApp",
      vietnamese: "Tại Sao Chúng Tôi Bắt Đầu EmviApp"
    },
    why_we_started_content: {
      english: "EmviApp was born from a simple observation: the beauty industry needed a platform that truly understood its heart and soul. In salons across America, we saw incredible talent flourishing alongside real challenges—language barriers, cultural misunderstandings, and digital gaps that traditional platforms weren't addressing.\n\nWhat started as a vision to connect communities has grown into something more: a home where artists are celebrated, where salons can thrive, and where clients can discover exceptional talent with confidence and ease.",
      vietnamese: "EmviApp ra đời từ một quan sát đơn giản: ngành công nghiệp làm đẹp cần một nền tảng thực sự hiểu được trái tim và tâm hồn của nó. Tại các tiệm làm đẹp khắp nước Mỹ, chúng tôi nhận thấy những tài năng tuyệt vời đang phát triển cùng với những thách thức thực sự—rào cản ngôn ngữ, hiểu lầm văn hóa, và khoảng cách kỹ thuật số mà các nền tảng truyền thống không giải quyết được.\n\nĐiều bắt đầu như một tầm nhìn để kết nối cộng đồng đã phát triển thành một điều gì đó lớn hơn: một ngôi nhà nơi các nghệ sĩ được tôn vinh, nơi các tiệm có thể phát triển, và nơi khách hàng có thể khám phá tài năng đặc biệt với sự tự tin và dễ dàng."
    },
    our_mission_title: {
      english: "Our Mission",
      vietnamese: "Sứ Mệnh Của Chúng Tôi"
    },
    our_mission_content: {
      english: "At EmviApp, we're on a mission to empower the beauty community by providing a platform that celebrates diversity, fosters genuine connections, and breaks down barriers to success. We believe that everyone deserves to feel seen, heard, and valued—whether you're an artist, a salon owner, or a client seeking the perfect look.",
      vietnamese: "Tại EmviApp, chúng tôi đang thực hiện sứ mệnh trao quyền cho cộng đồng làm đẹp bằng cách cung cấp một nền tảng tôn vinh sự đa dạng, thúc đẩy các kết nối chân thành và phá vỡ các rào cản đến thành công. Chúng tôi tin rằng mọi người đều xứng đáng được nhìn nhận, lắng nghe và trân trọng—cho dù bạn là một nghệ sĩ, một chủ tiệm hoặc một khách hàng đang tìm kiếm vẻ ngoài hoàn hảo."
    },
    our_values_title: {
      english: "Our Values",
      vietnamese: "Giá Trị Của Chúng Tôi"
    },
    value_1_title: {
      english: "Inclusivity",
      vietnamese: "Tính Toàn Diện"
    },
    value_1_content: {
      english: "We embrace diversity and celebrate the unique backgrounds, talents, and perspectives that make our community so vibrant.",
      vietnamese: "Chúng tôi hoan nghênh sự đa dạng và tôn vinh những nền tảng, tài năng và quan điểm độc đáo làm cho cộng đồng của chúng ta trở nên sôi động."
    },
    value_2_title: {
      english: "Connection",
      vietnamese: "Kết Nối"
    },
    value_2_content: {
      english: "We foster meaningful relationships between beauty professionals and their clients, creating a space where everyone feels valued and understood.",
      vietnamese: "Chúng tôi thúc đẩy các mối quan hệ có ý nghĩa giữa các chuyên gia làm đẹp và khách hàng của họ, tạo ra một không gian nơi mọi người cảm thấy được trân trọng và thấu hiểu."
    },
    value_3_title: {
      english: "Empowerment",
      vietnamese: "Trao Quyền"
    },
    value_3_content: {
      english: "We provide the tools, resources, and support our community needs to thrive, helping beauty professionals achieve their dreams and clients discover their perfect look.",
      vietnamese: "Chúng tôi cung cấp các công cụ, tài nguyên và hỗ trợ mà cộng đồng của chúng tôi cần để phát triển, giúp các chuyên gia làm đẹp đạt được ước mơ của họ và khách hàng khám phá vẻ ngoài hoàn hảo của họ."
    },
    join_us_title: {
      english: "Join Our Community",
      vietnamese: "Tham Gia Cộng Đồng Của Chúng Tôi"
    },
    join_us_content: {
      english: "Ready to experience the difference? Whether you're a beauty professional looking to grow your business or a client searching for your next favorite salon, we invite you to join the EmviApp community today.",
      vietnamese: "Bạn đã sẵn sàng trải nghiệm sự khác biệt? Cho dù bạn là một chuyên gia làm đẹp đang tìm cách phát triển doanh nghiệp của mình hay một khách hàng đang tìm kiếm tiệm yêu thích tiếp theo của mình, chúng tôi mời bạn tham gia cộng đồng EmviApp ngay hôm nay."
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#FDFDFD]">
        <div className="container mx-auto px-4 py-12 max-w-[1100px]">
          {/* Language Switcher */}
          <div className="flex justify-end mb-8">
            <div className="bg-white rounded-full shadow-sm border border-gray-100 flex overflow-hidden">
              <button
                onClick={handleLanguageToggle}
                className={`px-4 py-2 text-sm font-medium ${
                  language === "en"
                    ? "bg-gradient-to-r from-[#9A7B69] to-[#FF7743] text-white"
                    : "text-gray-600"
                }`}
              >
                EN
              </button>
              <button
                onClick={handleLanguageToggle}
                className={`px-4 py-2 text-sm font-medium ${
                  language === "vi"
                    ? "bg-gradient-to-r from-[#9A7B69] to-[#FF7743] text-white"
                    : "text-gray-600"
                }`}
              >
                VI
              </button>
            </div>
          </div>

          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-playfair text-3xl md:text-5xl font-bold text-[#9A7B69] mb-4">
              {t(translations.hero_title)}
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-[600px] mx-auto">
              {t(translations.hero_subtitle)}
            </p>
          </motion.div>
          
          {/* Our Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <Card className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-6 w-6 text-[#FF7743]" /> {/* Changed from UserHeart to Heart */}
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#9A7B69]">
                  {t(translations.our_story_title)}
                </h2>
              </div>
              <p className="text-base md:text-lg text-center text-gray-700">
                {t(translations.our_story_subtitle)}
              </p>
            </Card>
          </motion.div>
          
          {/* Why We Started EmviApp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <Card className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#9A7B69] mb-4">
                {t(translations.why_we_started_title)}
              </h2>
              <p className="text-base md:text-lg text-gray-700">
                {t(translations.why_we_started_content)}
              </p>
            </Card>
          </motion.div>

          {/* Our Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <Card className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#9A7B69] mb-4">
                {t(translations.our_mission_title)}
              </h2>
              <p className="text-base md:text-lg text-gray-700">
                {t(translations.our_mission_content)}
              </p>
            </Card>
          </motion.div>

          {/* Our Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <Card className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#9A7B69] mb-4">
                {t(translations.our_values_title)}
              </h2>
              
              {/* Inclusivity */}
              <div className="mb-6">
                <h3 className="font-playfair text-xl font-semibold text-[#9A7B69] mb-2">
                  {t(translations.value_1_title)}
                </h3>
                <p className="text-base text-gray-700">
                  {t(translations.value_1_content)}
                </p>
              </div>

              {/* Connection */}
              <div className="mb-6">
                <h3 className="font-playfair text-xl font-semibold text-[#9A7B69] mb-2">
                  {t(translations.value_2_title)}
                </h3>
                <p className="text-base text-gray-700">
                  {t(translations.value_2_content)}
                </p>
              </div>

              {/* Empowerment */}
              <div>
                <h3 className="font-playfair text-xl font-semibold text-[#9A7B69] mb-2">
                  {t(translations.value_3_title)}
                </h3>
                <p className="text-base text-gray-700">
                  {t(translations.value_3_content)}
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Join Our Community */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#9A7B69] mb-4">
                {t(translations.join_us_title)}
              </h2>
              <p className="text-base md:text-lg text-gray-700">
                {t(translations.join_us_content)}
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
