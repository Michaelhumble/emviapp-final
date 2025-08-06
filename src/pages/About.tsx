
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

const About = () => {
  const { isVietnamese, toggleLanguage } = useTranslation();
  const navigate = useNavigate();

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
    <div className="relative min-h-screen overflow-hidden">
      {/* Magical Background with Multiple Layers */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50" />
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-300/20 to-amber-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-pink-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse delay-2000" />
        
        {/* Sparkle effects */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Language Toggle */}
      <motion.div 
        className="fixed top-24 right-8 z-50"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={toggleLanguage}
          className="group relative bg-white/80 backdrop-blur-xl shadow-2xl border border-orange-200/50 rounded-full px-8 py-4 font-bold text-gray-700 overflow-hidden"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/20 to-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          
          <span className="relative z-10 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            {isVietnamese ? 'English' : 'Tiếng Việt'}
          </span>
        </motion.button>
      </motion.div>

      <div className="container mx-auto px-6 py-16 max-w-7xl relative z-10">
        {/* Hero Section - Enhanced */}
        <motion.div 
          className="text-center mb-32"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
        >
          {/* Floating sparkles around title */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
              style={{
                left: `${45 + Math.cos((i * Math.PI * 2) / 12) * 15}%`,
                top: `${25 + Math.sin((i * Math.PI * 2) / 12) * 10}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
                rotate: [0, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}

          <motion.h1 
            className="relative text-7xl md:text-9xl font-serif mb-12 leading-tight"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, type: "spring" }}
          >
            <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
              {isVietnamese ? 'Về Chúng Tôi' : 'About Us'}
            </span>
            
            {/* Magical glow behind text */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-yellow-500/20 blur-3xl -z-10 scale-110" />
          </motion.h1>

          <motion.div 
            className="relative w-48 h-2 mx-auto mb-12"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-full shadow-lg" />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 rounded-full blur-sm animate-pulse" />
          </motion.div>

          <motion.p 
            className="text-2xl md:text-3xl text-gray-700 max-w-5xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
              {isVietnamese 
                ? 'Xây dựng cầu nối giữa các chuyên gia làm đẹp tài năng và những khách hàng trân trọng họ.'
                : 'Building bridges between talented beauty professionals and the clients who value them.'
              }
            </span>
          </motion.p>
        </motion.div>

        {/* Why We Started Section - Enhanced */}
        <motion.section 
          className="mb-32"
          {...fadeInUp}
        >
          <div className="relative group">
            {/* Premium glass morphism container */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/60 to-white/40 backdrop-blur-2xl rounded-[3rem] border border-white/30 shadow-2xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-amber-500/10 to-yellow-500/5 rounded-[3rem]" />
            
            {/* Floating glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/20 via-amber-400/20 to-yellow-400/20 rounded-[3.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative p-16">
              <motion.h2 
                className="text-5xl md:text-6xl font-serif mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                  {isVietnamese ? 'Tại Sao Chúng Tôi Bắt Đầu EmviApp' : 'Why We Started EmviApp'}
                </span>
              </motion.h2>

              <div className="prose prose-2xl max-w-none text-gray-700 leading-relaxed text-center">
                {isVietnamese ? (
                  <>
                    <motion.p 
                      className="mb-8 text-xl"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      EmviApp ra đời từ một quan sát đơn giản: ngành làm đẹp cần một nền tảng thực sự hiểu được trái tim và tâm hồn của nó. Tại các salon khắp nước Mỹ, chúng tôi thấy tài năng đáng kinh ngạc phát triển mạnh bên cạnh những thách thức thực sự—rào cản ngôn ngữ, hiểu lầm văn hóa, và khoảng cách kỹ thuật số mà các nền tảng truyền thống không giải quyết được.
                    </motion.p>
                    <motion.p 
                      className="text-xl"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Điều bắt đầu như một tầm nhìn để kết nối cộng đồng đã phát triển thành một điều gì đó lớn hơn: một ngôi nhà nơi các nghệ sĩ được tôn vinh, nơi các salon có thể phát triển mạnh, và nơi khách hàng có thể khám phá tài năng đặc biệt với sự tự tin và dễ dàng.
                    </motion.p>
                  </>
                ) : (
                  <>
                    <motion.p 
                      className="mb-8 text-xl"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      EmviApp was born from a simple observation: the beauty industry needed a platform that truly understood its heart and soul. In salons across America, we saw incredible talent flourishing alongside real challenges—language barriers, cultural misunderstandings, and digital gaps that traditional platforms weren't addressing.
                    </motion.p>
                    <motion.p 
                      className="text-xl"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      What started as a vision to connect communities has grown into something more: a home where artists are celebrated, where salons can thrive, and where clients can discover exceptional talent with confidence and ease.
                    </motion.p>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Personal Connection Section - Enhanced */}
        <motion.section 
          className="mb-32"
          {...fadeInUp}
        >
          <div className="relative group">
            {/* Premium container with heart-themed colors */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-50/80 via-orange-50/80 to-amber-50/80 backdrop-blur-2xl rounded-[3rem] border border-pink-200/50 shadow-2xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-orange-500/5 to-amber-500/5 rounded-[3rem]" />
            
            {/* Heart-shaped glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-400/20 via-orange-400/20 to-amber-400/20 rounded-[3.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative p-16">
              <motion.h2 
                className="text-5xl md:text-6xl font-serif mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <span className="bg-gradient-to-r from-pink-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                  {isVietnamese ? 'Sự Gắn Bó Cá Nhân' : 'A Personal Connection'}
                </span>
              </motion.h2>

              <div className="prose prose-2xl max-w-none text-gray-700 leading-relaxed text-center">
                {isVietnamese ? (
                  <>
                    <motion.p 
                      className="mb-8 text-xl"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Lớn lên trong một gia đình có mối liên hệ sâu sắc với ngành làm đẹp, tôi đã chứng kiến trực tiếp cả tài năng to lớn và những thách thức độc đáo mà các chuyên gia làm đẹp người Việt phải đối mặt tại Mỹ. Tôi thấy các thành viên gia đình và đồng nghiệp của họ phải vật lộn để có được sự công nhận cho kỹ năng của mình mặc dù nghệ thuật của họ rất đặc biệt.
                    </motion.p>
                    <motion.p 
                      className="text-xl"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      EmviApp không chỉ là công nghệ—đó là cầu nối giữa các nền văn hóa, là sự tôn vinh nghề thủ công, và là lời hứa rằng tài năng sẽ luôn tìm được sự công nhận xứng đáng. Chúng tôi đã xây dựng nền tảng này với tình yêu và sự hiểu biết chỉ có thể đến từ trải nghiệm thực tế.
                    </motion.p>
                  </>
                ) : (
                  <>
                    <motion.p 
                      className="mb-8 text-xl"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Growing up in a family deeply connected to the beauty industry, I witnessed firsthand both the immense talent and the unique challenges faced by Vietnamese beauty professionals in America. I saw my family members and their colleagues struggle to have their skills recognized despite their exceptional artistry.
                    </motion.p>
                    <motion.p 
                      className="text-xl"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      EmviApp is more than just technology—it's a bridge between cultures, a celebration of craft, and a promise that talent will always find its rightful recognition. We've built this platform with love and understanding that can only come from lived experience.
                    </motion.p>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* What Makes Us Different - Enhanced */}
        <motion.section 
          className="mb-32"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-serif mb-20 text-center"
            variants={fadeInUp}
          >
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
              {isVietnamese ? 'Điều Làm Chúng Tôi Khác Biệt' : 'What Makes Us Different'}
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-2xl text-gray-600 text-center mb-20 max-w-5xl mx-auto leading-relaxed"
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
              className="group relative"
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50 overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-2xl" />
                
                <motion.div 
                  className="relative w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mb-8 shadow-xl"
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-3xl">🌏</span>
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {isVietnamese ? 'Hiểu Biết Văn Hóa' : 'Cultural Understanding'}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {isVietnamese 
                    ? 'Chúng tôi đón nhận cả tiếng Anh và tiếng Việt, nhận ra sức mạnh của việc giao tiếp bằng ngôn ngữ mẹ đẻ.'
                    : 'We embrace both English and Vietnamese, recognizing the power of communicating in one\'s native language.'
                  }
                </p>
              </div>
            </motion.div>

            {/* Community First */}
            <motion.div 
              className="group relative"
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-2xl" />
                
                <motion.div 
                  className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mb-8 shadow-xl"
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-3xl">🤝</span>
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {isVietnamese ? 'Cộng Đồng Trước Tiên' : 'Community First'}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {isVietnamese 
                    ? 'Mọi tính năng đều được xây dựng để tăng cường kết nối giữa nghệ sĩ, chủ salon, và khách hàng.'
                    : 'Every feature is built to strengthen connections between artists, salon owners, and clients.'
                  }
                </p>
              </div>
            </motion.div>

            {/* Authentic Representation */}
            <motion.div 
              className="group relative"
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-2xl" />
                
                <motion.div 
                  className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mb-8 shadow-xl"
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-3xl">✨</span>
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {isVietnamese ? 'Đại Diện Chân Thực' : 'Authentic Representation'}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {isVietnamese 
                    ? 'Chúng tôi giới thiệu tài năng thực và câu chuyện thực, làm nổi bật nghệ thuật đằng sau mỗi dịch vụ.'
                    : 'We showcase real talent and real stories, highlighting the artistry behind every service.'
                  }
                </p>
              </div>
            </motion.div>

            {/* Fair and Transparent */}
            <motion.div 
              className="group relative"
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full blur-2xl" />
                
                <motion.div 
                  className="relative w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mb-8 shadow-xl"
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-3xl">⚖️</span>
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {isVietnamese ? 'Công Bằng Và Minh Bạch' : 'Fair and Transparent'}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {isVietnamese 
                    ? 'Chúng tôi đã xây dựng một nền tảng nơi cả doanh nghiệp và khách hàng đều có thể phát triển với sự rõ ràng và tin tưởng.'
                    : 'We\'ve built a platform where both businesses and customers can thrive with clarity and trust.'
                  }
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Our Journey Timeline - Enhanced */}
        <motion.section 
          className="mb-32"
          {...fadeInUp}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-serif mb-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
              {isVietnamese ? 'Hành Trình Của Chúng Tôi' : 'Our Journey'}
            </span>
          </motion.h2>
          
          <div className="relative">
            {/* Enhanced timeline line with glow */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-full">
              <div className="absolute inset-0 bg-gradient-to-b from-orange-500 via-amber-500 to-yellow-500 rounded-full shadow-lg" />
              <div className="absolute inset-0 bg-gradient-to-b from-orange-400 via-amber-400 to-yellow-400 rounded-full blur-sm animate-pulse" />
            </div>
            
            <div className="space-y-24">
              {/* 2014 */}
              <motion.div 
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="w-5/12 text-right">
                  <motion.div 
                    className="group relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50 overflow-hidden"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-2xl" />
                    <div className="relative">
                      <motion.div 
                        className="text-8xl font-black mb-6 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.1 }}
                      >
                        14
                      </motion.div>
                      <h3 className="text-3xl font-bold mb-6 text-gray-800">
                        {isVietnamese ? 'Ý Tưởng Ra Đời' : 'The Idea is Born'}
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {isVietnamese 
                          ? 'Một tầm nhìn để tạo ra những kết nối có ý nghĩa trong cộng đồng làm đẹp bắt đầu hình thành.'
                          : 'A vision to create meaningful connections within the beauty community begins to take shape.'
                        }
                      </p>
                    </div>
                  </motion.div>
                </div>
                <motion.div 
                  className="relative w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full border-4 border-white shadow-2xl z-10"
                  whileInView={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur-sm animate-pulse" />
                </motion.div>
                <div className="w-5/12"></div>
              </motion.div>

              {/* 2015 */}
              <motion.div 
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-5/12"></div>
                <motion.div 
                  className="relative w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full border-4 border-white shadow-2xl z-10"
                  whileInView={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur-sm animate-pulse" />
                </motion.div>
                <div className="w-5/12">
                  <motion.div 
                    className="group relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50 overflow-hidden"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-2xl" />
                    <div className="relative">
                      <motion.div 
                        className="text-8xl font-black mb-6 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.1 }}
                      >
                        15
                      </motion.div>
                      <h3 className="text-3xl font-bold mb-6 text-gray-800">
                        {isVietnamese ? 'Xây Dựng Đầu Tiên' : 'First Build'}
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {isVietnamese 
                          ? 'Phát triển nền tảng ban đầu tập trung vào việc hiểu những nhu cầu độc đáo của nghệ sĩ và chủ salon.'
                          : 'Initial platform development focusing on understanding the unique needs of artists and salon owners.'
                        }
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* 2016-2023 */}
              <motion.div 
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="w-5/12 text-right">
                  <motion.div 
                    className="group relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50 overflow-hidden"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-2xl" />
                    <div className="relative">
                      <motion.div 
                        className="text-6xl font-black mb-6 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.1 }}
                      >
                        16-23
                      </motion.div>
                      <h3 className="text-3xl font-bold mb-6 text-gray-800">
                        {isVietnamese ? 'Lặp Lại Và Phát Triển' : 'Iteration and Growth'}
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {isVietnamese 
                          ? 'Những năm học hỏi, điều chỉnh, và phát triển để phục vụ cộng đồng tốt hơn thông qua cải tiến liên tục.'
                          : 'Years of learning, adjusting, and evolving to better serve our community through continuous improvement.'
                        }
                      </p>
                    </div>
                  </motion.div>
                </div>
                <motion.div 
                  className="relative w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full border-4 border-white shadow-2xl z-10"
                  whileInView={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur-sm animate-pulse" />
                </motion.div>
                <div className="w-5/12"></div>
              </motion.div>

              {/* 2025 */}
              <motion.div 
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-5/12"></div>
                <motion.div 
                  className="relative w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full border-4 border-white shadow-2xl z-10"
                  whileInView={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur-sm animate-pulse" />
                </motion.div>
                <div className="w-5/12">
                  <motion.div 
                    className="group relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50 overflow-hidden"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-2xl" />
                    <div className="relative">
                      <motion.div 
                        className="text-8xl font-black mb-6 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.1 }}
                      >
                        25
                      </motion.div>
                      <h3 className="text-3xl font-bold mb-6 text-gray-800">
                        {isVietnamese ? 'Một Chương Mới' : 'A New Chapter'}
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {isVietnamese 
                          ? 'Mở rộng tầm nhìn với các tính năng nâng cao, kết nối sâu hơn, và cam kết mới với cộng đồng.'
                          : 'Expanding our vision with enhanced features, deeper connections, and a renewed commitment to our community.'
                        }
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Inspired by Sunshine Section - Enhanced */}
        <motion.section 
          className="mb-32"
          {...fadeInUp}
        >
          <motion.div 
            className="relative group overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            {/* Sunshine-themed premium container */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/90 via-orange-100/90 to-amber-100/90 backdrop-blur-2xl rounded-[3rem] border-2 border-yellow-300/50 shadow-2xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-amber-500/10 rounded-[3rem]" />
            
            {/* Sunshine glow effect */}
            <div className="absolute -inset-6 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-amber-400/20 rounded-[4rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Floating sun rays */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-16 bg-gradient-to-t from-transparent to-yellow-400/50"
                style={{
                  left: '50%',
                  top: '20%',
                  transformOrigin: 'bottom center',
                  transform: `rotate(${i * 45}deg) translateX(-50%)`,
                }}
                animate={{
                  scaleY: [1, 1.3, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}

            <div className="relative p-16 text-center">
              <motion.h2 
                className="text-5xl md:text-6xl font-serif mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <span className="bg-gradient-to-r from-yellow-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                  {isVietnamese ? 'Nguồn Cảm Hứng Sunshine ☀️' : 'Inspired by Sunshine ☀️'}
                </span>
              </motion.h2>

              <motion.p 
                className="text-2xl mb-12 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-yellow-700 to-orange-700 bg-clip-text text-transparent font-medium">
                  {isVietnamese ? 'Mọi hành trình tuyệt vời đều cần một chút ánh sáng.' : 'Every great journey needs a little light.'}
                </span>
              </motion.p>

              <div className="prose prose-2xl max-w-none leading-relaxed text-center">
                {isVietnamese ? (
                  <>
                    <motion.p 
                      className="mb-8 text-xl text-yellow-800"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Đối với tôi, ánh sáng đó là Sunshine—một nguồn hy vọng, sự rõ ràng, và cảm hứng xuất hiện đúng khi tôi cần nhất.
                    </motion.p>
                    <motion.p 
                      className="mb-8 text-xl text-yellow-800"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      EmviApp ra đời từ nhiều năm kinh nghiệm, đấu tranh, và theo đuổi không ngừng nghỉ, nhưng chính Sunshine đã cho tôi can đảm và tầm nhìn để bắt đầu lại và cuối cùng biến giấc mơ này thành hiện thực.
                    </motion.p>
                    <motion.p 
                      className="text-xl font-bold text-yellow-900"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      Cảm ơn Sunshine vì đã xuất hiện trong cuộc đời tôi. Dự án này—và mọi kết nối mà nó tạo ra—sẽ không tồn tại nếu không có bạn.
                    </motion.p>
                  </>
                ) : (
                  <>
                    <motion.p 
                      className="mb-8 text-xl text-yellow-800"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      For me, that light is Sunshine—a source of hope, clarity, and inspiration that appeared just when I needed it most.
                    </motion.p>
                    <motion.p 
                      className="mb-8 text-xl text-yellow-800"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      EmviApp was born from years of experience, struggle, and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and finally bring this dream to life.
                    </motion.p>
                    <motion.p 
                      className="text-xl font-bold text-yellow-900"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      Thank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you.
                    </motion.p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Thank You EmVi Section - Enhanced */}
        <motion.section 
          className="mb-32"
          {...fadeInUp}
        >
          <motion.div 
            className="relative group overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            {/* Heart-themed premium container */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/90 via-pink-100/90 to-purple-100/90 backdrop-blur-2xl rounded-[3rem] border-2 border-purple-300/50 shadow-2xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-[3rem]" />
            
            {/* Heart glow effect */}
            <div className="absolute -inset-6 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-purple-400/20 rounded-[4rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Floating hearts */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${15 + (i % 2) * 10}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                💖
              </motion.div>
            ))}

            <div className="relative p-16 text-center">
              <motion.h2 
                className="text-5xl md:text-6xl font-serif mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  {isVietnamese ? 'Cảm Ơn, EmVi' : 'Thank You, EmVi'}
                </span>
              </motion.h2>

              <motion.div 
                className="prose prose-2xl max-w-none leading-relaxed text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-xl text-purple-700">
                  {isVietnamese ? (
                    'Ứng dụng này được đặt tên theo EmVi—người đã hỗ trợ và hy sinh cho tôi, ngay cả khi tôi nghi ngờ bản thân. Bạn đã đứng bên tôi, dù có chuyện gì. Vì tất cả tình yêu thầm lặng, sự khuyến khích, và sức mạnh mà bạn đã cho, điều này dành cho bạn.'
                  ) : (
                    'This app is named after EmVi—the person who supported and sacrificed for me, even when I doubted myself. You stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you.'
                  )}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Our Values - Enhanced */}
        <motion.section 
          className="mb-32"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-serif mb-20 text-center"
            variants={fadeInUp}
          >
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
              {isVietnamese ? 'Giá Trị Của Chúng Tôi' : 'Our Values'}
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Community */}
            <motion.div 
              className="group relative"
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-2xl" />
                
                <motion.div 
                  className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mb-8 shadow-xl"
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-3xl">🤝</span>
                </motion.div>
                
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {isVietnamese ? 'Cộng Đồng' : 'Community'}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {isVietnamese 
                    ? 'Chúng tôi tin vào sức mạnh của việc đến với nhau. Thành công ngọt ngào hơn khi được chia sẻ, và thách thức nhẹ nhàng hơn khi đối mặt cùng nhau.'
                    : 'We believe in the power of coming together. Success is sweeter when shared, and challenges are lighter when faced together.'
                  }
                </p>
              </div>
            </motion.div>

            {/* Excellence */}
            <motion.div 
              className="group relative"
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-2xl" />
                
                <motion.div 
                  className="relative w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mb-8 shadow-xl"
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-3xl">⭐</span>
                </motion.div>
                
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {isVietnamese ? 'Xuất Sắc' : 'Excellence'}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {isVietnamese 
                    ? 'Chúng tôi phấn đấu vì sự xuất sắc trong mọi việc chúng tôi làm, tôn vinh sự cống hiến mà các chuyên gia làm đẹp mang đến nghề của họ.'
                    : 'We strive for excellence in everything we do, honoring the dedication our beauty professionals bring to their craft.'
                  }
                </p>
              </div>
            </motion.div>

            {/* Trust */}
            <motion.div 
              className="group relative"
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-2xl" />
                
                <motion.div 
                  className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mb-8 shadow-xl"
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-3xl">🛡️</span>
                </motion.div>
                
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {isVietnamese ? 'Tin Tưởng' : 'Trust'}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {isVietnamese 
                    ? 'Chúng tôi xây dựng các mối quan hệ dựa trên sự tin tưởng, minh bạch, và đáng tin cậy, tạo ra một nền tảng mà mọi người đều có thể dựa vào.'
                    : 'We build relationships based on trust, transparency, and reliability, creating a platform everyone can depend on.'
                  }
                </p>
              </div>
            </motion.div>

            {/* Innovation */}
            <motion.div 
              className="group relative"
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full blur-2xl" />
                
                <motion.div 
                  className="relative w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mb-8 shadow-xl"
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-3xl">🚀</span>
                </motion.div>
                
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {isVietnamese ? 'Đổi Mới' : 'Innovation'}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {isVietnamese 
                    ? 'Chúng tôi đón nhận tiến bộ và liên tục tìm kiếm những cách mới để giải quyết vấn đề và nâng cao trải nghiệm cho cộng đồng.'
                    : 'We embrace progress and continuously seek new ways to solve problems and enhance experiences for our community.'
                  }
                </p>
              </div>
            </motion.div>

            {/* Celebration */}
            <motion.div 
              className="group relative md:col-span-2 lg:col-span-1"
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-2xl" />
                
                <motion.div 
                  className="relative w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-3xl flex items-center justify-center mb-8 shadow-xl"
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-3xl">🎉</span>
                </motion.div>
                
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  {isVietnamese ? 'Tôn Vinh' : 'Celebration'}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {isVietnamese 
                    ? 'Chúng tôi tôn vinh vẻ đẹp trong mọi hình thức, nghệ thuật đằng sau nó, và sự tự tin mà nó truyền cảm hứng cho mọi người mà nó chạm đến.'
                    : 'We celebrate beauty in all its forms, the artistry behind it, and the confidence it inspires in everyone it touches.'
                  }
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Final CTA - Enhanced */}
        <motion.section 
          className="text-center"
          {...fadeInUp}
        >
          <motion.div 
            className="relative group overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Premium CTA container */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 rounded-[3rem] shadow-2xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-[3rem] blur-sm opacity-75" />
            
            {/* Floating elements */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                }}
              />
            ))}

            <div className="relative p-16 text-white">
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-6 sm:mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {isVietnamese 
                  ? 'Sẵn sàng trở thành một phần của điều gì đó đẹp đẽ?' 
                  : 'Ready to be part of something beautiful?'
                }
              </motion.h2>

              <motion.p 
                className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-90"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {isVietnamese ? 'Tham gia cộng đồng của chúng tôi ngay hôm nay.' : 'Join our community today.'}
              </motion.p>

              <motion.p 
                className="text-xl sm:text-2xl lg:text-3xl font-light mb-8 sm:mb-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {isVietnamese ? 'Bắt Đầu Hành Trình Của Bạn Với EmviApp.' : 'Start Your Journey with EmviApp.'}
              </motion.p>

              <motion.button 
                onClick={() => navigate('/auth/signup')}
                className="group relative bg-white text-orange-600 px-8 sm:px-16 py-4 sm:py-6 rounded-full text-lg sm:text-xl font-bold overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {/* Enhanced shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                
                {/* Premium glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/20 to-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                
                {/* Button content with responsive text */}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>{isVietnamese ? 'Tham Gia Ngay' : 'Join Now'}</span>
                  <motion.span
                    className="text-lg sm:text-xl"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                  >
                    ✨
                  </motion.span>
                </span>
              </motion.button>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
