
import React from "react";
import { motion } from "framer-motion";
import { Shield, Users, Heart, Home, Lock, Star, Globe, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const WhyTrustSection: React.FC = () => {
  const { isVietnamese } = useTranslation();
  
  const trustStats = [
    {
      icon: <Shield className="w-8 h-8" />,
      stat: "3,000+",
      title: isVietnamese ? "Tiệm Đã Xác Minh" : "Verified Salons",
      description: isVietnamese ? "Hơn 3,000 tiệm đã xác minh trên toàn nước Mỹ" : "Verified beauty professionals across America",
      gradient: "from-purple-500 to-indigo-600",
      bgGradient: "from-purple-50 to-indigo-50",
      borderColor: "border-purple-400"
    },
    {
      icon: <Users className="w-8 h-8" />,
      stat: "Thousands",
      title: isVietnamese ? "Thợ Đang Hoạt Động" : "Active Artists", 
      description: isVietnamese ? "Hàng ngàn thợ nails đang sử dụng mỗi ngày" : "Thousands of nail technicians using daily",
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-400"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      stat: "100%",
      title: isVietnamese ? "Tạo Bởi Người Trong Nghề" : "Artist-Built",
      description: isVietnamese ? "Tạo bởi người trong nghề — không phải công ty lớn" : "Built by artists, not corporations",
      gradient: "from-pink-500 to-rose-600",
      bgGradient: "from-pink-50 to-rose-50", 
      borderColor: "border-pink-400"
    },
    {
      icon: <Home className="w-8 h-8" />,
      stat: "4 States",
      title: isVietnamese ? "Các Tiểu Bang Tin Dùng" : "Trusted Locations",
      description: isVietnamese ? "Tin dùng ở các tiểu bang lớn như GA, CA, TX" : "Trusted in major states like GA, CA, TX",
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-400"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      stat: "Secure",
      title: isVietnamese ? "Thanh Toán An Toàn" : "Secure Platform",
      description: isVietnamese ? "Thanh toán an toàn. Kết nối thông minh bằng AI" : "Secure payments & AI-powered matching",
      gradient: "from-orange-500 to-amber-600",
      bgGradient: "from-orange-50 to-amber-50",
      borderColor: "border-orange-400"
    }
  ];
  
  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 via-transparent to-pink-100/20"></div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Star className="w-8 h-8 text-yellow-500" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Why Artists & Salons Trust Us
            </h2>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
          {isVietnamese && (
            <h3 className="text-2xl md:text-3xl font-semibold text-purple-600 mb-4">
              Vì sao thợ & tiệm chọn EmviApp
            </h3>
          )}
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're building a community that puts your needs first.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {trustStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className={`bg-gradient-to-br ${stat.bgGradient} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${stat.borderColor} transform hover:-translate-y-1 hover:scale-105`}>
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-full flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                
                {/* Stat */}
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.stat}
                </div>
                
                {/* Title */}
                <div className="text-lg font-semibold text-gray-800 mb-3">
                  {stat.title}
                </div>
                
                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional trust section inspired by blog */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-12 rounded-3xl shadow-2xl">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-yellow-300" />
                <h3 className="text-3xl md:text-4xl font-bold">
                  {isVietnamese ? "Trải Nghiệm AI Ghép Đôi Hoàn Hảo" : "AI Matchmaking Experience"}
                </h3>
                <Sparkles className="w-8 h-8 text-yellow-300" />
              </div>
              <p className="text-xl mb-8 text-purple-100 max-w-4xl mx-auto leading-relaxed">
                {isVietnamese 
                  ? "AI tiên tiến của EmviApp không chỉ kết nối—mà còn tìm đúng người, đúng tiệm, đúng khách cho bạn. Chủ tiệm dễ dàng tuyển chọn thợ giỏi, nghệ sĩ tìm được môi trường mơ ước, khách hàng gặp dịch vụ tuyệt vời—tất cả trong tích tắc."
                  : "EmviApp's advanced AI doesn't just connect—it finds the right people, right shops, right customers for you. Shop owners easily hire skilled workers, artists find their dream environment, customers meet excellent service—all in an instant."
                }
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-yellow-800" />
                  </div>
                  <h4 className="text-lg font-semibold mb-3">
                    {isVietnamese ? "Ghép Đối Công Việc & Khách Hàng Tức Thì" : "Instant Job & Customer Matching"}
                  </h4>
                  <p className="text-purple-100 text-sm">
                    {isVietnamese 
                      ? "Nghệ sĩ tìm được công việc phù hợp hoàn hảo. Khách hàng được ghép với đúng nghệ sĩ và tiệm—mọi lúc, mọi nơi."
                      : "Artists find perfectly suitable jobs. Customers are matched with the right artists and shops—anytime, anywhere."
                    }
                  </p>
                </div>
                
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                  <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-6 h-6 text-green-800" />
                  </div>
                  <h4 className="text-lg font-semibold mb-3">
                    {isVietnamese ? "Ghép Đối Nhân Tài Hoàn Hảo" : "Perfect Talent Matching"}
                  </h4>
                  <p className="text-purple-100 text-sm">
                    {isVietnamese 
                      ? "Tìm những nghệ sĩ và nhân viên tốt nhất cho tiệm của bạn trong vài giây. AI phân tích kỹ năng, kinh nghiệm và tính cách—để bạn xây dựng đội ngũ mơ ước, không chỉ lấp chỗ trống."
                      : "Find the best artists and staff for your shop in seconds. AI analyzes skills, experience and personality—so you build your dream team, not just fill gaps."
                    }
                  </p>
                </div>
                
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                  <div className="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-6 h-6 text-pink-800" />
                  </div>
                  <h4 className="text-lg font-semibold mb-3">
                    {isVietnamese ? "Tìm Kiếm Tiệm & Danh Sách Thông Minh" : "Smart Shop & Listing Discovery"}
                  </h4>
                  <p className="text-purple-100 text-sm">
                    {isVietnamese 
                      ? "Mua, bán, hoặc khám phá các tiệm hàng đầu. AI tìm ra những cơ hội tốt nhất và địa điểm mơ ước—phù hợp cho chủ tiệm, nghệ sĩ và nhà đầu tư."
                      : "Buy, sell, or discover top shops. AI finds the best opportunities and dream locations—perfect for shop owners, artists and investors."
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyTrustSection;
