import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Target, Award, MessageCircle, Shield, TrendingUp, Users } from "lucide-react";

const ArtistSuccessToolkit = () => {
  const aiTools = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Client Discovery Engine",
      description: "Advanced algorithm matches you with premium clients who value your specific skills and are ready to pay top rates",
      results: ["267% booking quality increase", "89% client retention rate", "$3,200 average booking value"],
      badge: "REVOLUTIONARY",
      badgeColor: "from-yellow-400 to-orange-500"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Automated Portfolio Amplification", 
      description: "AI showcases your work to 50K+ potential clients daily, optimizing timing and targeting for maximum impact",
      results: ["189% profile view increase", "156% booking conversion", "Featured in top search results"],
      badge: "GAME-CHANGER",
      badgeColor: "from-green-400 to-blue-500"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Instant Authority System",
      description: "Get VIP badges, featured placement, and premium status that commands higher prices and client respect",
      results: ["Premium badge verification", "Top 1% artist ranking", "156% higher booking rates"],
      badge: "STATUS BOOST",
      badgeColor: "from-purple-400 to-pink-500"
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Smart Communication Hub",
      description: "AI-powered messaging system that pre-qualifies leads and handles initial consultations automatically",
      results: ["85% time savings on admin", "92% lead qualification accuracy", "Instant response capability"],
      badge: "EFFICIENCY",
      badgeColor: "from-cyan-400 to-blue-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-purple-900">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            5 AI-Powered Tools<br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Every Top Artist Uses in 2025
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            The exact AI toolkit that separates 6-figure artists from everyone else
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {aiTools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-600/50 hover:border-yellow-400/50 transition-all duration-300 h-full">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`bg-gradient-to-r ${tool.badgeColor} p-4 rounded-2xl`}>
                      {tool.icon}
                    </div>
                    <Badge className={`bg-gradient-to-r ${tool.badgeColor} text-black border-0 font-bold`}>
                      {tool.badge}
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {tool.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {tool.description}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="text-yellow-400 font-semibold text-sm uppercase tracking-wide">
                      PROVEN RESULTS:
                    </h4>
                    {tool.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-green-300 text-sm font-medium">{result}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Vietnamese Success Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-pink-900/40 to-red-900/40 backdrop-blur-sm border border-pink-500/30 rounded-3xl p-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-black text-white mb-4">
              🇻🇳 Câu Chuyện Thành Công Từ Cộng Đồng Nail Việt
            </h3>
            <p className="text-pink-200 text-lg">
              Minh Anh Nail Spa (Little Saigon) - Từ 0 đến $25K/tháng trong 8 tháng
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-black text-yellow-400 mb-2">8 tháng</div>
              <p className="text-pink-200">Từ lúc bắt đầu dùng AI</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-green-400 mb-2">$25K</div>
              <p className="text-pink-200">Doanh thu hàng tháng</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-blue-400 mb-2">450+</div>
              <p className="text-pink-200">Khách quen thân thiết</p>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-2xl p-6 mt-8 border border-white/20">
            <p className="text-white italic text-lg text-center">
              "AI của EmviApp đã thay đổi hoàn toàn cách tôi kinh doanh. Từ việc tìm khách đến quản lý lịch hẹn, 
              mọi thứ đều tự động. Giờ tôi chỉ tập trung vào làm nail thôi!"
            </p>
            <p className="text-pink-300 text-center mt-4 font-semibold">
              - Minh Anh, Chủ tiệm nail tại Westminster, CA
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ArtistSuccessToolkit;