
import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Users, Heart, Home, Lock, Star, Globe, Sparkles, TrendingUp } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

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
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime = Date.now();
      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setCount(Math.floor(easeOutQuart * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const WhyTrustSection: React.FC = () => {
  const { isVietnamese } = useTranslation();
  
  const trustStats = [
    {
      icon: <Shield className="w-10 h-10" />,
      stat: "3000",
      suffix: "+",
      title: isVietnamese ? "Tiệm Đã Xác Minh" : "Verified Salons",
      description: isVietnamese ? "Hơn 3,000 tiệm đã xác minh trên toàn nước Mỹ" : "Verified beauty professionals across America",
      gradient: "from-purple-500 via-purple-600 to-indigo-700",
      iconBg: "from-purple-400 to-purple-600",
      glowColor: "purple-500/30",
      borderGlow: "purple-400/40"
    },
    {
      icon: <Users className="w-10 h-10" />,
      stat: "15000",
      suffix: "+",
      title: isVietnamese ? "Thợ Đang Hoạt Động" : "Active Artists", 
      description: isVietnamese ? "Hàng ngàn thợ nails đang sử dụng mỗi ngày" : "Thousands of nail technicians using daily",
      gradient: "from-blue-500 via-blue-600 to-cyan-700",
      iconBg: "from-blue-400 to-blue-600",
      glowColor: "blue-500/30",
      borderGlow: "blue-400/40"
    },
    {
      icon: <Heart className="w-10 h-10" />,
      stat: "100",
      suffix: "%",
      title: isVietnamese ? "Tạo Bởi Người Trong Nghề" : "Artist-Built",
      description: isVietnamese ? "Tạo bởi người trong nghề — không phải công ty lớn" : "Built by artists, not corporations",
      gradient: "from-pink-500 via-rose-600 to-red-700",
      iconBg: "from-pink-400 to-pink-600",
      glowColor: "pink-500/30",
      borderGlow: "pink-400/40"
    },
    {
      icon: <Home className="w-10 h-10" />,
      stat: "4",
      suffix: " States",
      title: isVietnamese ? "Các Tiểu Bang Tin Dùng" : "Trusted Locations",
      description: isVietnamese ? "Tin dùng ở các tiểu bang lớn như GA, CA, TX" : "Trusted in major states like GA, CA, TX",
      gradient: "from-green-500 via-emerald-600 to-teal-700",
      iconBg: "from-green-400 to-green-600",
      glowColor: "green-500/30",
      borderGlow: "green-400/40"
    },
    {
      icon: <Lock className="w-10 h-10" />,
      stat: "100",
      suffix: "%",
      title: isVietnamese ? "Thanh Toán An Toàn" : "Secure Platform",
      description: isVietnamese ? "Thanh toán an toàn. Kết nối thông minh bằng AI" : "Secure payments & AI-powered matching",
      gradient: "from-orange-500 via-amber-600 to-yellow-700",
      iconBg: "from-orange-400 to-orange-600",
      glowColor: "orange-500/30",
      borderGlow: "orange-400/40"
    }
  ];
  
  return (
    <section className="py-32 bg-gradient-to-br from-slate-50 via-white to-purple-50/30 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-300/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-50 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-40 animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-4 mb-8 bg-gradient-to-r from-purple-100/80 to-pink-100/80 backdrop-blur-sm px-8 py-4 rounded-full border border-purple-200/50">
            <Star className="w-8 h-8 text-yellow-500 animate-pulse" />
            <span className="text-lg font-semibold text-purple-800">Trusted by Thousands</span>
            <Star className="w-8 h-8 text-yellow-500 animate-pulse" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent tracking-tight mb-6 leading-tight">
            Why Artists & Salons Trust Us
          </h2>
          
          {isVietnamese && (
            <h3 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Vì sao thợ & tiệm chọn EmviApp
            </h3>
          )}
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            We're building a community that puts your needs first.
          </p>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-24"
        >
          {trustStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-3xl opacity-20 group-hover:opacity-40 blur-xl transition-all duration-500`}></div>
              
              {/* Glass Card */}
              <div className="relative bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl group-hover:shadow-3xl transition-all duration-500 overflow-hidden">
                
                {/* Floating Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
                
                {/* Enhanced Icon */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${stat.iconBg} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    {stat.icon}
                  </div>
                  
                  {/* Icon Glow */}
                  <div className={`absolute inset-0 w-20 h-20 bg-gradient-to-br ${stat.iconBg} rounded-2xl opacity-40 blur-lg group-hover:opacity-60 transition-all duration-500`}></div>
                </div>
                
                {/* Animated Stat Number */}
                <div className="mb-4">
                  <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent leading-none`}>
                    {stat.stat === "3000" && <><AnimatedCounter end={3000} />{stat.suffix}</>}
                    {stat.stat === "15000" && <><AnimatedCounter end={15000} />{stat.suffix}</>}
                    {stat.stat === "100" && <><AnimatedCounter end={100} />{stat.suffix}</>}
                    {stat.stat === "4" && <><AnimatedCounter end={4} />{stat.suffix}</>}
                  </div>
                </div>
                
                {/* Enhanced Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-900 transition-colors duration-300">
                  {stat.title}
                </h3>
                
                {/* Enhanced Description */}
                <p className="text-gray-600 leading-relaxed text-sm group-hover:text-gray-700 transition-colors duration-300">
                  {stat.description}
                </p>

                {/* Trending Indicator */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-green-500 text-white p-2 rounded-full shadow-lg">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced AI Matchmaking Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          {/* Background Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
          
          <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-pink-700 text-white p-12 md:p-16 rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 border border-white/20 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 border border-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            
            <div className="relative text-center">
              <div className="inline-flex items-center gap-4 mb-8 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full border border-white/20">
                <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
                <span className="text-lg font-semibold">AI-Powered Platform</span>
                <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
              </div>
              
              <h3 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                {isVietnamese ? "Trải Nghiệm AI Ghép Đôi Hoàn Hảo" : "AI Matchmaking Experience"}
              </h3>
              
              <p className="text-xl md:text-2xl mb-12 text-purple-100 max-w-5xl mx-auto leading-relaxed font-light">
                {isVietnamese 
                  ? "AI tiên tiến của EmviApp không chỉ kết nối—mà còn tìm đúng người, đúng tiệm, đúng khách cho bạn. Chủ tiệm dễ dàng tuyển chọn thợ giỏi, nghệ sĩ tìm được môi trường mơ ước, khách hàng gặp dịch vụ tuyệt vời—tất cả trong tích tắc."
                  : "EmviApp's advanced AI doesn't just connect—it finds the right people, right shops, right customers for you. Shop owners easily hire skilled workers, artists find their dream environment, customers meet excellent service—all in an instant."
                }
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Users className="w-8 h-8" />,
                    title: isVietnamese ? "Ghép Đối Công Việc & Khách Hàng Tức Thì" : "Instant Job & Customer Matching",
                    description: isVietnamese 
                      ? "Nghệ sĩ tìm được công việc phù hợp hoàn hảo. Khách hàng được ghép với đúng nghệ sĩ và tiệm—mọi lúc, mọi nơi."
                      : "Artists find perfectly suitable jobs. Customers are matched with the right artists and shops—anytime, anywhere.",
                    color: "from-yellow-400 to-orange-500"
                  },
                  {
                    icon: <Globe className="w-8 h-8" />,
                    title: isVietnamese ? "Ghép Đối Nhân Tài Hoàn Hảo" : "Perfect Talent Matching",
                    description: isVietnamese 
                      ? "Tìm những nghệ sĩ và nhân viên tốt nhất cho tiệm của bạn trong vài giây. AI phân tích kỹ năng, kinh nghiệm và tính cách—để bạn xây dựng đội ngũ mơ ước, không chỉ lấp chỗ trống."
                      : "Find the best artists and staff for your shop in seconds. AI analyzes skills, experience and personality—so you build your dream team, not just fill gaps.",
                    color: "from-green-400 to-emerald-500"
                  },
                  {
                    icon: <Heart className="w-8 h-8" />,
                    title: isVietnamese ? "Tìm Kiếm Tiệm & Danh Sách Thông Minh" : "Smart Shop & Listing Discovery",
                    description: isVietnamese 
                      ? "Mua, bán, hoặc khám phá các tiệm hàng đầu. AI tìm ra những cơ hội tốt nhất và địa điểm mơ ước—phù hợp cho chủ tiệm, nghệ sĩ và nhà đầu tư."
                      : "Buy, sell, or discover top shops. AI finds the best opportunities and dream locations—perfect for shop owners, artists and investors.",
                    color: "from-pink-400 to-rose-500"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="group bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-500"
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-4 group-hover:text-yellow-300 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-purple-100 leading-relaxed group-hover:text-white transition-colors duration-300">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyTrustSection;
