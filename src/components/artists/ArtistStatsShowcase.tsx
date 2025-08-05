import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { TrendingUp, Users, DollarSign, Star, Award, Calendar } from "lucide-react";

const ArtistStatsShowcase = () => {
  const stats = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      value: "$127M+",
      label: "Total artist earnings on platform",
      subtext: "Average: $47K per top artist annually",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: "27K+",
      label: "Active beauty professionals",
      subtext: "Growing 45% monthly",
      color: "from-green-400 to-blue-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: "312%",
      label: "Average booking increase",
      subtext: "vs traditional platforms",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <Star className="w-8 h-8" />,
      value: "4.9/5",
      label: "Average artist rating",
      subtext: "From 180K+ verified reviews",
      color: "from-cyan-400 to-blue-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-purple-900 relative">
      <Container className="relative z-10">
        {/* Vietnamese Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-pink-900/40 to-red-900/40 backdrop-blur-sm border border-pink-500/30 rounded-3xl p-12 mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Cách Mạng Ngành Nail Việt Nam
            </h2>
            <p className="text-xl text-pink-200 max-w-3xl mx-auto">
              Hơn 15,000 thợ nail người Việt đã tham gia cuộc cách mạng AI
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h4 className="font-bold text-white mb-6 text-2xl flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-400" />
                Thành tựu nổi bật:
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-pink-200">Thu nhập trung bình/tháng:</span>
                  <span className="text-yellow-400 font-bold text-xl">$8,500</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-pink-200">Tăng khách quen:</span>
                  <span className="text-green-400 font-bold text-xl">+285%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-pink-200">Booking tự động:</span>
                  <span className="text-blue-400 font-bold text-xl">89%</span>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h4 className="font-bold text-white mb-6 text-2xl flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-400" />
                Tính năng tiếng Việt:
              </h4>
              <ul className="space-y-3 text-pink-100">
                <li>✅ Lịch hẹn tiếng Việt hoàn toàn</li>
                <li>✅ Hỗ trợ khách hàng 24/7</li>
                <li>✅ Training miễn phí cho team</li>
                <li>✅ Tích hợp với salon management</li>
                <li>✅ Báo cáo doanh thu chi tiết</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Global Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            The Beauty Revolution
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              By The Numbers
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Real data from real artists who've transformed their careers with AI-powered discovery
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className={`bg-gradient-to-r ${stat.color} p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div className="text-5xl font-black text-white mb-2">{stat.value}</div>
              <p className="text-white font-semibold mb-2">{stat.label}</p>
              <p className="text-gray-400 text-sm">{stat.subtext}</p>
            </motion.div>
          ))}
        </div>

        {/* Key Insight Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8 mt-16 border-l-4 border-yellow-500"
        >
          <p className="text-xl text-white leading-relaxed">
            <strong className="text-yellow-400">The artist economy is transforming:</strong> AI-powered discovery is revolutionizing how beauty professionals connect with premium clients. 
            Artists who adapt to this AI-driven approach are seeing unprecedented growth in bookings, earnings, and professional recognition.
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default ArtistStatsShowcase;