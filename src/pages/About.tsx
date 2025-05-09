
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Container } from '@/components/ui/container';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';

const About: React.FC = () => {
  const { t } = useTranslation();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <Layout>
      <Container className="py-16 px-6 md:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          {/* Page Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 font-playfair">
            {t("Our Story", "Câu Chuyện Của Chúng Tôi")}
          </h1>

          {/* Mission Statement */}
          <div className="mb-16">
            <motion.p 
              className="text-xl md:text-2xl text-center font-light italic mb-8" 
              variants={fadeIn}
            >
              {t(
                "Building bridges between talented beauty professionals and the clients who value them.",
                "Xây dựng cầu nối giữa các chuyên gia làm đẹp tài năng và khách hàng trân trọng họ."
              )}
            </motion.p>
          </div>

          {/* Introduction Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 font-playfair">
              {t("Why We Started EmviApp", "Tại Sao Chúng Tôi Bắt Đầu EmviApp")}
            </h2>
            <div className="prose max-w-none prose-lg">
              <p className="text-gray-700 mb-4">
                {t(
                  "EmviApp was born from a simple observation: the beauty industry needed a platform that truly understood its heart and soul. In salons across America, we saw incredible talent flourishing alongside real challenges—language barriers, cultural misunderstandings, and digital gaps that traditional platforms weren't addressing.",
                  "EmviApp ra đời từ một quan sát đơn giản: ngành công nghiệp làm đẹp cần một nền tảng thực sự hiểu được trái tim và tâm hồn của nó. Tại các tiệm làm đẹp khắp nước Mỹ, chúng tôi nhận thấy những tài năng tuyệt vời đang phát triển cùng với những thách thức thực sự—rào cản ngôn ngữ, hiểu lầm văn hóa, và khoảng cách kỹ thuật số mà các nền tảng truyền thống không giải quyết được."
                )}
              </p>
              <p className="text-gray-700">
                {t(
                  "What started as a vision to connect communities has grown into something more: a home where artists are celebrated, where salons can thrive, and where clients can discover exceptional talent with confidence and ease.",
                  "Điều bắt đầu như một tầm nhìn để kết nối cộng đồng đã phát triển thành một điều gì đó lớn hơn: một ngôi nhà nơi các nghệ sĩ được tôn vinh, nơi các tiệm có thể phát triển, và nơi khách hàng có thể khám phá tài năng đặc biệt với sự tự tin và dễ dàng."
                )}
              </p>
            </div>
          </section>

          {/* Founder's Vision Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 font-playfair">
              {t("A Personal Connection", "Kết Nối Cá Nhân")}
            </h2>
            <div className="prose max-w-none prose-lg">
              <p className="text-gray-700 mb-4">
                {t(
                  "Growing up in a family deeply connected to the beauty industry, I witnessed firsthand both the immense talent and the unique challenges faced by Vietnamese beauty professionals in America. I saw my family members and their colleagues struggle to have their skills recognized despite their exceptional artistry.",
                  "Lớn lên trong một gia đình gắn bó sâu sắc với ngành làm đẹp, tôi đã chứng kiến trực tiếp cả tài năng to lớn và những thách thức độc đáo mà các chuyên gia làm đẹp Việt Nam phải đối mặt tại Mỹ. Tôi đã thấy các thành viên trong gia đình và đồng nghiệp của họ phải đấu tranh để được công nhận kỹ năng mặc dù họ có tài năng nghệ thuật đặc biệt."
                )}
              </p>
              <p className="text-gray-700">
                {t(
                  "EmviApp is more than just technology—it's a bridge between cultures, a celebration of craft, and a promise that talent will always find its rightful recognition. We've built this platform with love and understanding that can only come from lived experience.",
                  "EmviApp không chỉ là công nghệ—đó là cầu nối giữa các nền văn hóa, sự tôn vinh kỹ năng, và lời hứa rằng tài năng sẽ luôn được công nhận xứng đáng. Chúng tôi đã xây dựng nền tảng này với tình yêu và sự thấu hiểu chỉ có thể đến từ trải nghiệm sống."
                )}
              </p>
            </div>
          </section>

          {/* Why EmviApp is Different */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 font-playfair">
              {t("What Makes Us Different", "Điều Gì Làm Nên Sự Khác Biệt")}
            </h2>
            <div className="prose max-w-none prose-lg">
              <p className="text-gray-700">
                {t(
                  "Every decision we make, from design to development, starts with a simple question: \"How will this help our community?\" Our platform is crafted by people who understand the beauty industry from lived experience—not just market research.",
                  "Mỗi quyết định chúng tôi đưa ra, từ thiết kế đến phát triển, bắt đầu với một câu hỏi đơn giản: \"Điều này sẽ giúp cộng đồng của chúng ta như thế nào?\" Nền tảng của chúng tôi được tạo nên bởi những người hiểu ngành làm đẹp từ trải nghiệm sống thực tế—không chỉ từ nghiên cứu thị trường."
                )}
              </p>
            </div>
            
            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-3 text-purple-600">
                  {t("Cultural Understanding", "Hiểu Biết Văn Hóa")}
                </h3>
                <p className="text-gray-600">
                  {t(
                    "We embrace both English and Vietnamese, recognizing the power of communicating in one's native language.",
                    "Chúng tôi sử dụng cả tiếng Anh và tiếng Việt, công nhận sức mạnh của việc giao tiếp bằng tiếng mẹ đẻ."
                  )}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-3 text-purple-600">
                  {t("Community First", "Cộng Đồng Là Hàng Đầu")}
                </h3>
                <p className="text-gray-600">
                  {t(
                    "Every feature is built to strengthen connections between artists, salon owners, and clients.",
                    "Mỗi tính năng được xây dựng để củng cố kết nối giữa nghệ sĩ, chủ salon và khách hàng."
                  )}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-3 text-purple-600">
                  {t("Authentic Representation", "Đại Diện Chân Thực")}
                </h3>
                <p className="text-gray-600">
                  {t(
                    "We showcase real talent and real stories, highlighting the artistry behind every service.",
                    "Chúng tôi giới thiệu những tài năng thực và câu chuyện thực, làm nổi bật nghệ thuật đằng sau mỗi dịch vụ."
                  )}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-3 text-purple-600">
                  {t("Fair and Transparent", "Công Bằng và Minh Bạch")}
                </h3>
                <p className="text-gray-600">
                  {t(
                    "We've built a platform where both businesses and customers can thrive with clarity and trust.",
                    "Chúng tôi đã xây dựng một nền tảng nơi cả doanh nghiệp và khách hàng có thể phát triển với sự rõ ràng và tin tưởng."
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* Closing Message */}
          <section className="mb-8">
            <motion.div 
              className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl text-center"
              variants={fadeIn}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 font-playfair">
                {t("Join Our Journey", "Tham Gia Hành Trình Của Chúng Tôi")}
              </h2>
              <p className="text-lg text-gray-700 mb-0">
                {t(
                  "EmviApp is more than a platform—it's a movement to elevate and celebrate the beauty industry's true essence. We invite you to be part of this story, whether you're an artist, a salon owner, or someone who appreciates beauty in all its forms.",
                  "EmviApp không chỉ là một nền tảng—đó là một phong trào để nâng cao và tôn vinh bản chất thực sự của ngành làm đẹp. Chúng tôi mời bạn trở thành một phần của câu chuyện này, cho dù bạn là một nghệ sĩ, chủ salon, hay là người đánh giá cao vẻ đẹp dưới mọi hình thức."
                )}
              </p>
            </motion.div>
          </section>
        </motion.div>
      </Container>
    </Layout>
  );
};

export default About;
