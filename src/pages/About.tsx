
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageToggleButton from '@/components/home/missing-piece/LanguageToggleButton';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const { isVietnamese, toggleLanguage } = useTranslation();

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <Helmet>
        <title>{isVietnamese ? 'Về Chúng Tôi | EmviApp' : 'About Us | EmviApp'}</title>
        <meta name="description" content="Learn about EmviApp - Our story, mission and values." />
      </Helmet>
      
      <Layout>
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
          <div className="relative mb-12">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold">
                {isVietnamese ? 'Câu Chuyện Của Chúng Tôi' : 'Our Story'}
              </h1>
              <div className="hidden md:block">
                <LanguageToggleButton 
                  isVietnamese={isVietnamese} 
                  toggleLanguage={toggleLanguage} 
                />
              </div>
            </div>
            
            {/* Mobile language toggle */}
            <div className="md:hidden mb-6">
              <LanguageToggleButton
                isVietnamese={isVietnamese}
                toggleLanguage={toggleLanguage}
              />
            </div>
            
            <p className="text-xl text-gray-700 max-w-3xl">
              {isVietnamese 
                ? 'Kết nối những người tài năng trong ngành làm đẹp với khách hàng trân trọng giá trị của họ.'
                : 'Building bridges between talented beauty professionals and the clients who value them.'}
            </p>
          </div>

          <div className="grid gap-12">
            {/* Why We Started EmviApp */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div className="p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6">
                  {isVietnamese ? 'Vì Sao Chúng Tôi Sáng Lập EmviApp' : 'Why We Started EmviApp'}
                </h2>
                <div className="prose prose-lg max-w-none">
                  {isVietnamese ? (
                    <>
                      <p>EmviApp ra đời từ một quan sát đơn giản: ngành làm đẹp cần một nền tảng thực sự thấu hiểu trái tim và linh hồn của nó. Tại các salon trên khắp nước Mỹ, chúng tôi chứng kiến biết bao tài năng tỏa sáng, nhưng cũng đối mặt với những khó khăn thực sự—rào cản ngôn ngữ, khác biệt văn hóa, và khoảng cách công nghệ mà các nền tảng cũ chưa giải quyết được.</p>
                      <p>Từ một ước mơ kết nối cộng đồng, EmviApp đã trở thành mái nhà chung, nơi nghệ sĩ được tôn vinh, salon phát triển, và khách hàng dễ dàng tìm thấy tài năng xuất sắc với sự tin tưởng.</p>
                    </>
                  ) : (
                    <>
                      <p>EmviApp was born from a simple observation: the beauty industry needed a platform that truly understood its heart and soul. In salons across America, we saw incredible talent flourishing alongside real challenges—language barriers, cultural misunderstandings, and digital gaps that traditional platforms weren't addressing.</p>
                      <p>What started as a vision to connect communities has grown into something more: a home where artists are celebrated, where salons can thrive, and where clients can discover exceptional talent with confidence and ease.</p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* A Personal Connection */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div className="p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6">
                  {isVietnamese ? 'Sự Gắn Bó Cá Nhân' : 'A Personal Connection'}
                </h2>
                <div className="prose prose-lg max-w-none">
                  {isVietnamese ? (
                    <>
                      <p>Lớn lên trong một gia đình gắn bó với ngành làm đẹp, tôi hiểu rõ cả tài năng vượt trội lẫn thách thức của người Việt trong ngành này tại Mỹ. Tôi đã thấy người thân và đồng nghiệp mình phải vật lộn để được công nhận xứng đáng với tay nghề của họ.</p>
                      <p>EmviApp không chỉ là công nghệ—mà còn là cầu nối văn hóa, tôn vinh nghề thủ công, và là lời hứa rằng tài năng sẽ luôn được ghi nhận. Chúng tôi xây dựng nền tảng này bằng tình yêu và sự thấu hiểu xuất phát từ chính trải nghiệm sống.</p>
                    </>
                  ) : (
                    <>
                      <p>Growing up in a family deeply connected to the beauty industry, I witnessed firsthand both the immense talent and the unique challenges faced by Vietnamese beauty professionals in America. I saw my family members and their colleagues struggle to have their skills recognized despite their exceptional artistry.</p>
                      <p>EmviApp is more than just technology—it's a bridge between cultures, a celebration of craft, and a promise that talent will always find its rightful recognition. We've built this platform with love and understanding that can only come from lived experience.</p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* What Makes Us Different */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div className="p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6">
                  {isVietnamese ? 'Điều Làm Chúng Tôi Khác Biệt' : 'What Makes Us Different'}
                </h2>
                <div className="prose prose-lg max-w-none">
                  {isVietnamese ? (
                    <>
                      <p>Mỗi quyết định, từ thiết kế đến phát triển, đều bắt đầu bằng một câu hỏi: "Điều này sẽ giúp gì cho cộng đồng?" Nền tảng của chúng tôi được tạo nên bởi những người từng trải trong ngành, không chỉ dựa vào khảo sát thị trường.</p>
                      
                      <h3 className="font-bold mt-6 mb-2">Thấu Hiểu Văn Hóa</h3>
                      <p>Chúng tôi tôn trọng cả tiếng Việt và tiếng Anh, hiểu rằng ngôn ngữ mẹ đẻ luôn mang sức mạnh gắn kết.</p>
                      
                      <h3 className="font-bold mt-6 mb-2">Cộng Đồng Là Trên Hết</h3>
                      <p>Mọi tính năng đều nhằm tăng kết nối giữa nghệ sĩ, chủ salon và khách hàng.</p>
                      
                      <h3 className="font-bold mt-6 mb-2">Tôn Vinh Sự Thật</h3>
                      <p>Chúng tôi giới thiệu tài năng và câu chuyện thật, tôn vinh nghệ thuật phía sau mỗi dịch vụ.</p>
                      
                      <h3 className="font-bold mt-6 mb-2">Minh Bạch & Công Bằng</h3>
                      <p>Nền tảng giúp cả doanh nghiệp lẫn khách hàng phát triển trong sự rõ ràng và tin tưởng.</p>
                    </>
                  ) : (
                    <>
                      <p>Every decision we make, from design to development, starts with a simple question: "How will this help our community?" Our platform is crafted by people who understand the beauty industry from lived experience—not just market research.</p>
                      
                      <h3 className="font-bold mt-6 mb-2">Cultural Understanding</h3>
                      <p>We embrace both English and Vietnamese, recognizing the power of communicating in one's native language.</p>
                      
                      <h3 className="font-bold mt-6 mb-2">Community First</h3>
                      <p>Every feature is built to strengthen connections between artists, salon owners, and clients.</p>
                      
                      <h3 className="font-bold mt-6 mb-2">Authentic Representation</h3>
                      <p>We showcase real talent and real stories, highlighting the artistry behind every service.</p>
                      
                      <h3 className="font-bold mt-6 mb-2">Fair and Transparent</h3>
                      <p>We've built a platform where both businesses and customers can thrive with clarity and trust.</p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Our Journey */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div className="p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6">
                  {isVietnamese ? 'Hành Trình Của Chúng Tôi' : 'Our Journey'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {isVietnamese ? (
                    <>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-playfair">2014</h3>
                        <h4 className="font-bold mb-2">Ý Tưởng Ra Đời</h4>
                        <p className="text-gray-700">Khát vọng xây dựng một cộng đồng làm đẹp kết nối và ý nghĩa được hình thành.</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-2xl font-playfair">2015</h3>
                        <h4 className="font-bold mb-2">Phiên Bản Đầu Tiên</h4>
                        <p className="text-gray-700">Bắt đầu phát triển nền tảng với mục tiêu thấu hiểu nhu cầu riêng biệt của nghệ sĩ và chủ salon.</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-2xl font-playfair">2016-2023</h3>
                        <h4 className="font-bold mb-2">Không Ngừng Phát Triển</h4>
                        <p className="text-gray-700">Nhiều năm học hỏi, điều chỉnh, và đổi mới để phục vụ cộng đồng ngày một tốt hơn.</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-2xl font-playfair">2025</h3>
                        <h4 className="font-bold mb-2">Chặng Đường Mới</h4>
                        <p className="text-gray-700">Mở rộng tầm nhìn, phát triển tính năng mới, kết nối sâu sắc hơn và cam kết gắn bó với cộng đồng.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-playfair">2014</h3>
                        <h4 className="font-bold mb-2">The Idea is Born</h4>
                        <p className="text-gray-700">A vision to create meaningful connections within the beauty community begins to take shape.</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-2xl font-playfair">2015</h3>
                        <h4 className="font-bold mb-2">First Build</h4>
                        <p className="text-gray-700">Initial platform development focusing on understanding the unique needs of artists and salon owners.</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-2xl font-playfair">2016-2023</h3>
                        <h4 className="font-bold mb-2">Iteration and Growth</h4>
                        <p className="text-gray-700">Years of learning, adjusting, and evolving to better serve our community through continuous improvement.</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-2xl font-playfair">2025</h3>
                        <h4 className="font-bold mb-2">A New Chapter</h4>
                        <p className="text-gray-700">Expanding our vision with enhanced features, deeper connections, and a renewed commitment to our community.</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Inspired by Sunshine - UPDATED SECTION */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div className="p-8 md:p-10 bg-gradient-to-br from-white to-amber-50/50">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6 flex items-center">
                    {isVietnamese 
                      ? 'Nguồn cảm hứng Sunshine ☀️' 
                      : 'Inspired by Sunshine ☀️'
                    }
                  </h2>
                  
                  <div className="prose prose-lg max-w-none">
                    {isVietnamese ? (
                      <>
                        <p>Mỗi hành trình tuyệt vời đều cần một tia sáng.</p>
                        <p>Với tôi, Sunshine chính là tia sáng ấy—một nguồn hy vọng, sự rõ ràng, và cảm hứng đến đúng lúc tôi cần nhất.</p>
                        <p>EmviApp được sinh ra từ nhiều năm kinh nghiệm, khó khăn và không ngừng nỗ lực, nhưng chính Sunshine đã cho tôi dũng khí và tầm nhìn để bắt đầu lại và biến giấc mơ này thành hiện thực.</p>
                        <p>Cảm ơn Sunshine đã đến trong cuộc đời tôi. Dự án này—và mọi kết nối mà nó tạo ra—đều không thể có nếu thiếu bạn.</p>
                      </>
                    ) : (
                      <>
                        <p>Every great journey needs a little light.</p>
                        <p>For me, that light is Sunshine—a source of hope, clarity, and inspiration that appeared just when I needed it most.</p>
                        <p>EmviApp was born from years of experience, struggle, and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and finally bring this dream to life.</p>
                        <p>Thank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you.</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Thank You, EmVi - UPDATED SECTION */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div className="p-8 md:p-10 bg-gradient-to-br from-white to-purple-50/50">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6">
                    {isVietnamese ? 'Cảm ơn, EmVi' : 'Thank You, EmVi'}
                  </h2>
                  
                  <div className="prose prose-lg max-w-none">
                    {isVietnamese ? (
                      <p>Ứng dụng này được đặt tên theo EmVi—người đã luôn ủng hộ và hy sinh vì tôi, ngay cả khi tôi nghi ngờ bản thân mình. Bạn luôn bên cạnh tôi, dù thế nào đi nữa. Tất cả tình yêu thầm lặng, sự động viên và sức mạnh mà bạn dành cho, điều này là dành tặng bạn.</p>
                    ) : (
                      <p>This app is named after EmVi—the person who supported and sacrificed for me, even when I doubted myself. You stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you.</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Our Values */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div className="p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6">
                  {isVietnamese ? 'Giá Trị Cốt Lõi' : 'Our Values'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {isVietnamese ? (
                    <>
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold">Cộng Đồng</h3>
                        <p>Chúng tôi tin vào sức mạnh đoàn kết. Thành công ngọt ngào hơn khi được sẻ chia, thử thách nhẹ nhàng hơn khi cùng vượt qua.</p>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold">Xuất Sắc</h3>
                        <p>Chúng tôi không ngừng nỗ lực đạt sự xuất sắc, xứng đáng với tâm huyết của người làm đẹp.</p>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold">Tin Tưởng</h3>
                        <p>Chúng tôi xây dựng mối quan hệ dựa trên sự minh bạch, uy tín và tin cậy, tạo nên nền tảng vững chắc.</p>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold">Đổi Mới</h3>
                        <p>Chúng tôi luôn tìm cách đổi mới, giải quyết vấn đề và nâng cao trải nghiệm cho cộng đồng.</p>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold">Tôn Vinh</h3>
                        <p>Chúng tôi tôn vinh vẻ đẹp dưới mọi hình thức, nghệ thuật sáng tạo và sự tự tin nó mang lại cho mỗi người.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold">Community</h3>
                        <p>We believe in the power of coming together. Success is sweeter when shared, and challenges are lighter when faced together.</p>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold">Excellence</h3>
                        <p>We strive for excellence in everything we do, honoring the dedication our beauty professionals bring to their craft.</p>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold">Trust</h3>
                        <p>We build relationships based on trust, transparency, and reliability, creating a platform everyone can depend on.</p>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold">Innovation</h3>
                        <p>We embrace progress and continuously seek new ways to solve problems and enhance experiences for our community.</p>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold">Celebration</h3>
                        <p>We celebrate beauty in all its forms, the artistry behind it, and the confidence it inspires in everyone it touches.</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* CTA */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xl mb-6">
              {isVietnamese 
                ? 'Bạn đã sẵn sàng trở thành một phần của cộng đồng EmviApp chưa?' 
                : 'Ready to be part of something beautiful? Join our community today.'}
            </p>
            <a 
              href="/auth/signup" 
              className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              {isVietnamese 
                ? 'Bắt đầu hành trình của bạn cùng EmviApp ngay hôm nay.' 
                : 'Start Your Journey with EmviApp.'}
            </a>
          </motion.div>
        </div>
      </Layout>
    </>
  );
};

export default AboutPage;
