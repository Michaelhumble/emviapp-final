
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

const About = () => {
  const { isVietnamese, toggleLanguage } = useTranslation();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Language Toggle */}
      <div className="fixed top-24 right-8 z-50">
        <button
          onClick={toggleLanguage}
          className="bg-white/90 backdrop-blur-sm shadow-lg border border-purple-100 rounded-full px-6 py-3 font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-300"
        >
          {isVietnamese ? 'English' : 'Tiếng Việt'}
        </button>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-6xl">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl md:text-7xl font-serif mb-8 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent leading-tight">
            {isVietnamese ? 'Về Chúng Tôi' : 'About Us'}
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            {isVietnamese 
              ? 'Xây dựng cầu nối giữa các chuyên gia làm đẹp tài năng và những khách hàng trân trọng họ.'
              : 'Building bridges between talented beauty professionals and the clients who value them.'
            }
          </p>
        </motion.div>

        {/* Why We Started Section */}
        <motion.section 
          className="mb-24"
          {...fadeInUp}
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20">
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              {isVietnamese ? 'Tại Sao Chúng Tôi Bắt Đầu EmviApp' : 'Why We Started EmviApp'}
            </h2>
            <div className="prose prose-xl max-w-none text-gray-700 leading-relaxed">
              {isVietnamese ? (
                <>
                  <p className="mb-6">EmviApp ra đời từ một quan sát đơn giản: ngành làm đẹp cần một nền tảng thực sự hiểu được trái tim và tâm hồn của nó. Tại các salon khắp nước Mỹ, chúng tôi thấy tài năng đáng kinh ngạc phát triển mạnh bên cạnh những thách thức thực sự—rào cản ngôn ngữ, hiểu lầm văn hóa, và khoảng cách kỹ thuật số mà các nền tảng truyền thống không giải quyết được.</p>
                  <p>Điều bắt đầu như một tầm nhìn để kết nối cộng đồng đã phát triển thành một điều gì đó lớn hơn: một ngôi nhà nơi các nghệ sĩ được tôn vinh, nơi các salon có thể phát triển mạnh, và nơi khách hàng có thể khám phá tài năng đặc biệt với sự tự tin và dễ dàng.</p>
                </>
              ) : (
                <>
                  <p className="mb-6">EmviApp was born from a simple observation: the beauty industry needed a platform that truly understood its heart and soul. In salons across America, we saw incredible talent flourishing alongside real challenges—language barriers, cultural misunderstandings, and digital gaps that traditional platforms weren't addressing.</p>
                  <p>What started as a vision to connect communities has grown into something more: a home where artists are celebrated, where salons can thrive, and where clients can discover exceptional talent with confidence and ease.</p>
                </>
              )}
            </div>
          </div>
        </motion.section>

        {/* Personal Connection Section */}
        <motion.section 
          className="mb-24"
          {...fadeInUp}
        >
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-12 border border-purple-100">
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-center text-purple-800">
              {isVietnamese ? 'Sự Gắn Bó Cá Nhân' : 'A Personal Connection'}
            </h2>
            <div className="prose prose-xl max-w-none text-gray-700 leading-relaxed">
              {isVietnamese ? (
                <>
                  <p className="mb-6">Lớn lên trong một gia đình có mối liên hệ sâu sắc với ngành làm đẹp, tôi đã chứng kiến trực tiếp cả tài năng to lớn và những thách thức độc đáo mà các chuyên gia làm đẹp người Việt phải đối mặt tại Mỹ. Tôi thấy các thành viên gia đình và đồng nghiệp của họ phải vật lộn để có được sự công nhận cho kỹ năng của mình mặc dù nghệ thuật của họ rất đặc biệt.</p>
                  <p>EmviApp không chỉ là công nghệ—đó là cầu nối giữa các nền văn hóa, là sự tôn vinh nghề thủ công, và là lời hứa rằng tài năng sẽ luôn tìm được sự công nhận xứng đáng. Chúng tôi đã xây dựng nền tảng này với tình yêu và sự hiểu biết chỉ có thể đến từ trải nghiệm thực tế.</p>
                </>
              ) : (
                <>
                  <p className="mb-6">Growing up in a family deeply connected to the beauty industry, I witnessed firsthand both the immense talent and the unique challenges faced by Vietnamese beauty professionals in America. I saw my family members and their colleagues struggle to have their skills recognized despite their exceptional artistry.</p>
                  <p>EmviApp is more than just technology—it's a bridge between cultures, a celebration of craft, and a promise that talent will always find its rightful recognition. We've built this platform with love and understanding that can only come from lived experience.</p>
                </>
              )}
            </div>
          </div>
        </motion.section>

        {/* What Makes Us Different */}
        <motion.section 
          className="mb-24"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-serif mb-16 text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            {isVietnamese ? 'Điều Làm Chúng Tôi Khác Biệt' : 'What Makes Us Different'}
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 text-center mb-16 max-w-4xl mx-auto"
            variants={fadeInUp}
          >
            {isVietnamese 
              ? 'Mỗi quyết định chúng tôi đưa ra, từ thiết kế đến phát triển, bắt đầu với một câu hỏi đơn giản: "Điều này sẽ giúp cộng đồng của chúng ta như thế nào?" Nền tảng của chúng tôi được tạo ra bởi những người hiểu ngành làm đẹp từ trải nghiệm thực tế—không chỉ từ nghiên cứu thị trường.'
              : 'Every decision we make, from design to development, starts with a simple question: "How will this help our community?" Our platform is crafted by people who understand the beauty industry from lived experience—not just market research.'
            }
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Cultural Understanding */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-2xl">🌏</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {isVietnamese ? 'Hiểu Biết Văn Hóa' : 'Cultural Understanding'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isVietnamese 
                  ? 'Chúng tôi đón nhận cả tiếng Anh và tiếng Việt, nhận ra sức mạnh của việc giao tiếp bằng ngôn ngữ mẹ đẻ.'
                  : 'We embrace both English and Vietnamese, recognizing the power of communicating in one\'s native language.'
                }
              </p>
            </motion.div>

            {/* Community First */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {isVietnamese ? 'Cộng Đồng Trước Tiên' : 'Community First'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isVietnamese 
                  ? 'Mọi tính năng đều được xây dựng để tăng cường kết nối giữa nghệ sĩ, chủ salon, và khách hàng.'
                  : 'Every feature is built to strengthen connections between artists, salon owners, and clients.'
                }
              </p>
            </motion.div>

            {/* Authentic Representation */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {isVietnamese ? 'Đại Diện Chân Thực' : 'Authentic Representation'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isVietnamese 
                  ? 'Chúng tôi giới thiệu tài năng thực và câu chuyện thực, làm nổi bật nghệ thuật đằng sau mỗi dịch vụ.'
                  : 'We showcase real talent and real stories, highlighting the artistry behind every service.'
                }
              </p>
            </motion.div>

            {/* Fair and Transparent */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {isVietnamese ? 'Công Bằng Và Minh Bạch' : 'Fair and Transparent'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isVietnamese 
                  ? 'Chúng tôi đã xây dựng một nền tảng nơi cả doanh nghiệp và khách hàng đều có thể phát triển với sự rõ ràng và tin tưởng.'
                  : 'We\'ve built a platform where both businesses and customers can thrive with clarity and trust.'
                }
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Our Journey Timeline */}
        <motion.section 
          className="mb-24"
          {...fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            {isVietnamese ? 'Hành Trình Của Chúng Tôi' : 'Our Journey'}
          </h2>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            
            <div className="space-y-16">
              {/* 2014 */}
              <div className="flex items-center justify-between">
                <div className="w-5/12 text-right">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30">
                    <div className="text-6xl font-bold text-purple-500 mb-4">14</div>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                      {isVietnamese ? 'Ý Tưởng Ra Đời' : 'The Idea is Born'}
                    </h3>
                    <p className="text-gray-600">
                      {isVietnamese 
                        ? 'Một tầm nhìn để tạo ra những kết nối có ý nghĩa trong cộng đồng làm đẹp bắt đầu hình thành.'
                        : 'A vision to create meaningful connections within the beauty community begins to take shape.'
                      }
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                <div className="w-5/12"></div>
              </div>

              {/* 2015 */}
              <div className="flex items-center justify-between">
                <div className="w-5/12"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                <div className="w-5/12">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30">
                    <div className="text-6xl font-bold text-purple-500 mb-4">15</div>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                      {isVietnamese ? 'Xây Dựng Đầu Tiên' : 'First Build'}
                    </h3>
                    <p className="text-gray-600">
                      {isVietnamese 
                        ? 'Phát triển nền tảng ban đầu tập trung vào việc hiểu những nhu cầu độc đáo của nghệ sĩ và chủ salon.'
                        : 'Initial platform development focusing on understanding the unique needs of artists and salon owners.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* 2016-2023 */}
              <div className="flex items-center justify-between">
                <div className="w-5/12 text-right">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30">
                    <div className="text-4xl font-bold text-purple-500 mb-4">16-23</div>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                      {isVietnamese ? 'Lặp Lại Và Phát Triển' : 'Iteration and Growth'}
                    </h3>
                    <p className="text-gray-600">
                      {isVietnamese 
                        ? 'Những năm học hỏi, điều chỉnh, và phát triển để phục vụ cộng đồng tốt hơn thông qua cải tiến liên tục.'
                        : 'Years of learning, adjusting, and evolving to better serve our community through continuous improvement.'
                      }
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                <div className="w-5/12"></div>
              </div>

              {/* 2025 */}
              <div className="flex items-center justify-between">
                <div className="w-5/12"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                <div className="w-5/12">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30">
                    <div className="text-6xl font-bold text-purple-500 mb-4">25</div>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                      {isVietnamese ? 'Một Chương Mới' : 'A New Chapter'}
                    </h3>
                    <p className="text-gray-600">
                      {isVietnamese 
                        ? 'Mở rộng tầm nhìn với các tính năng nâng cao, kết nối sâu hơn, và cam kết mới với cộng đồng.'
                        : 'Expanding our vision with enhanced features, deeper connections, and a renewed commitment to our community.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Inspired by Sunshine Section */}
        <motion.section 
          className="mb-24"
          {...fadeInUp}
        >
          <div className="bg-gradient-to-r from-yellow-100 via-yellow-50 to-orange-100 rounded-3xl p-12 border-2 border-yellow-200 shadow-xl">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-serif mb-8 text-yellow-800">
                {isVietnamese ? 'Nguồn Cảm Hứng Sunshine ☀️' : 'Inspired by Sunshine ☀️'}
              </h2>
              <p className="text-lg text-yellow-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                {isVietnamese ? 'Mọi hành trình tuyệt vời đều cần một chút ánh sáng.' : 'Every great journey needs a little light.'}
              </p>
              <div className="prose prose-lg max-w-none text-yellow-800 leading-relaxed">
                {isVietnamese ? (
                  <>
                    <p className="mb-6">Đối với tôi, ánh sáng đó là Sunshine—một nguồn hy vọng, sự rõ ràng, và cảm hứng xuất hiện đúng khi tôi cần nhất.</p>
                    <p className="mb-6">EmviApp ra đời từ nhiều năm kinh nghiệm, đấu tranh, và theo đuổi không ngừng nghỉ, nhưng chính Sunshine đã cho tôi can đảm và tầm nhìn để bắt đầu lại và cuối cùng biến giấc mơ này thành hiện thực.</p>
                    <p className="font-semibold">Cảm ơn Sunshine vì đã xuất hiện trong cuộc đời tôi. Dự án này—và mọi kết nối mà nó tạo ra—sẽ không tồn tại nếu không có bạn.</p>
                  </>
                ) : (
                  <>
                    <p className="mb-6">For me, that light is Sunshine—a source of hope, clarity, and inspiration that appeared just when I needed it most.</p>
                    <p className="mb-6">EmviApp was born from years of experience, struggle, and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and finally bring this dream to life.</p>
                    <p className="font-semibold">Thank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you.</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Thank You EmVi Section */}
        <motion.section 
          className="mb-24"
          {...fadeInUp}
        >
          <div className="bg-gradient-to-r from-purple-100 via-pink-50 to-purple-100 rounded-3xl p-12 border border-purple-200 shadow-xl">
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-center text-purple-800">
              {isVietnamese ? 'Cảm Ơn, EmVi' : 'Thank You, EmVi'}
            </h2>
            <div className="prose prose-xl max-w-none text-purple-700 text-center leading-relaxed">
              {isVietnamese ? (
                <p>Ứng dụng này được đặt tên theo EmVi—người đã hỗ trợ và hy sinh cho tôi, ngay cả khi tôi nghi ngờ bản thân. Bạn đã đứng bên tôi, dù có chuyện gì. Vì tất cả tình yêu thầm lặng, sự khuyến khích, và sức mạnh mà bạn đã cho, điều này dành cho bạn.</p>
              ) : (
                <p>This app is named after EmVi—the person who supported and sacrificed for me, even when I doubted myself. You stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you.</p>
              )}
            </div>
          </div>
        </motion.section>

        {/* Our Values */}
        <motion.section 
          className="mb-24"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-serif mb-16 text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            {isVietnamese ? 'Giá Trị Của Chúng Tôi' : 'Our Values'}
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Community */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                {isVietnamese ? 'Cộng Đồng' : 'Community'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isVietnamese 
                  ? 'Chúng tôi tin vào sức mạnh của việc đến với nhau. Thành công ngọt ngào hơn khi được chia sẻ, và thách thức nhẹ nhàng hơn khi đối mặt cùng nhau.'
                  : 'We believe in the power of coming together. Success is sweeter when shared, and challenges are lighter when faced together.'
                }
              </p>
            </motion.div>

            {/* Excellence */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                {isVietnamese ? 'Xuất Sắc' : 'Excellence'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isVietnamese 
                  ? 'Chúng tôi phấn đấu vì sự xuất sắc trong mọi việc chúng tôi làm, tôn vinh sự cống hiến mà các chuyên gia làm đẹp mang đến nghề của họ.'
                  : 'We strive for excellence in everything we do, honoring the dedication our beauty professionals bring to their craft.'
                }
              </p>
            </motion.div>

            {/* Trust */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                {isVietnamese ? 'Tin Tưởng' : 'Trust'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isVietnamese 
                  ? 'Chúng tôi xây dựng các mối quan hệ dựa trên sự tin tưởng, minh bạch, và đáng tin cậy, tạo ra một nền tảng mà mọi người đều có thể dựa vào.'
                  : 'We build relationships based on trust, transparency, and reliability, creating a platform everyone can depend on.'
                }
              </p>
            </motion.div>

            {/* Innovation */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                {isVietnamese ? 'Đổi Mới' : 'Innovation'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isVietnamese 
                  ? 'Chúng tôi đón nhận tiến bộ và liên tục tìm kiếm những cách mới để giải quyết vấn đề và nâng cao trải nghiệm cho cộng đồng.'
                  : 'We embrace progress and continuously seek new ways to solve problems and enhance experiences for our community.'
                }
              </p>
            </motion.div>

            {/* Celebration */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-2xl">🎉</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                {isVietnamese ? 'Tôn Vinh' : 'Celebration'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isVietnamese 
                  ? 'Chúng tôi tôn vinh vẻ đẹp trong mọi hình thức, nghệ thuật đằng sau nó, và sự tự tin mà nó truyền cảm hứng cho mọi người mà nó chạm đến.'
                  : 'We celebrate beauty in all its forms, the artistry behind it, and the confidence it inspires in everyone it touches.'
                }
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section 
          className="text-center"
          {...fadeInUp}
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              {isVietnamese 
                ? 'Sẵn sàng trở thành một phần của điều gì đó đẹp đẽ?' 
                : 'Ready to be part of something beautiful?'
              }
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {isVietnamese ? 'Tham gia cộng đồng của chúng tôi ngay hôm nay.' : 'Join our community today.'}
            </p>
            <p className="text-2xl font-light mb-8">
              {isVietnamese ? 'Bắt Đầu Hành Trình Của Bạn Với EmviApp.' : 'Start Your Journey with EmviApp.'}
            </p>
            <button className="bg-white text-purple-600 px-12 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              {isVietnamese ? 'Tham Gia Ngay' : 'Join Now'}
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
