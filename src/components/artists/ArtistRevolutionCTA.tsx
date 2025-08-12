import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Crown, Rocket, Star, TrendingUp, Zap, CheckCircle, Brain } from "lucide-react";

const ArtistRevolutionCTA = () => {
  const guarantees = [
    "AI-powered client discovery within 24 hours",
    "Premium profile optimization included",
    "Vietnamese language support (100%)",
    "30-day money-back guarantee",
    "Free training & onboarding session",
    "VIP badge qualification review"
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-purple-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-20 w-96 h-96 bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-gradient-to-tl from-purple-600/20 to-pink-600/20 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-1/4 text-yellow-500 text-2xl animate-pulse">🚀</div>
      <div className="absolute top-32 right-1/3 text-purple-500 text-xl animate-pulse" style={{ animationDelay: '1s' }}>✨</div>
      <div className="absolute bottom-32 left-1/3 text-pink-500 text-lg animate-pulse" style={{ animationDelay: '2.5s' }}>💫</div>
      <div className="absolute bottom-20 right-1/4 text-blue-500 text-xl animate-pulse" style={{ animationDelay: '3.5s' }}>⭐</div>

      <Container className="relative z-10">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Main CTA Card */}
          <div className="relative">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 rounded-3xl p-1">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl h-full w-full"></div>
            </div>
            
            {/* Content */}
            <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 rounded-3xl p-12 md:p-16 lg:p-20 shadow-2xl text-center backdrop-blur-sm">
              {/* Authority badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap justify-center gap-4 mb-8"
              >
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-0 px-6 py-3 text-lg font-bold">
                  <Rocket className="w-5 h-5 mr-2" />
                  AI REVOLUTION 2025
                </Badge>
                <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white border-0 px-6 py-3 text-lg font-bold">
                  LIMITED SPOTS
                </Badge>
                <Badge className="bg-gradient-to-r from-purple-400 to-pink-500 text-white border-0 px-6 py-3 text-lg font-bold">
                  VIETNAMESE SUPPORT
                </Badge>
              </motion.div>

              {/* Title Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <div className="flex items-center justify-center gap-6 mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Brain className="text-4xl text-black" />
                  </div>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
                    Ready to Join the
                    <br />
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                      AI Beauty Revolution?
                    </span>
                  </h2>
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Crown className="text-4xl text-white" />
                  </div>
                </div>
                
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-8">
                  Join <strong className="text-white">27,000+ beauty professionals</strong> who've transformed their careers with AI-powered discovery. 
                  Average artist sees <strong className="text-yellow-400">312% booking increase</strong> within 90 days.
                </p>

                {/* Gradient underline */}
                <motion.div 
                  className="w-40 h-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 rounded-full mx-auto"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                />
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to="/signup">
                    <Button className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-black font-bold px-12 py-6 rounded-2xl text-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <span className="flex items-center">
                        <Crown className="mr-3 h-6 w-6" />
                        <span>🚀 Start AI Revolution</span>
                        <Zap className="ml-3 h-6 w-6" />
                      </span>
                    </Button>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to="/artists">
                    <Button className="border-2 border-purple-400/50 text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm font-bold px-12 py-6 rounded-2xl text-xl hover:shadow-lg transition-all duration-300">
                      <span className="flex items-center">
                        <Star className="mr-3 h-6 w-6" />
                        <span>🔍 See Success Stories</span>
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Guarantees */}
              <motion.div 
                className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-600/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  What You Get When You Join
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {guarantees.map((guarantee, index) => (
                    <div key={index} className="flex items-center gap-3 text-left">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{guarantee}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Vietnamese Section */}
              <motion.div 
                className="bg-gradient-to-r from-pink-900/50 to-red-900/50 backdrop-blur-sm border border-pink-500/30 rounded-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  Đặc Biệt Dành Cho Cộng Đồng Việt Nam
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-black text-yellow-400 mb-2">15,000+</div>
                    <p className="text-pink-200">Thợ nail Việt đã tham gia</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-green-400 mb-2">100%</div>
                    <p className="text-pink-200">Giao diện tiếng Việt</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-blue-400 mb-2">24/7</div>
                    <p className="text-pink-200">Hỗ trợ khách hàng</p>
                  </div>
                </div>
                <p className="text-pink-100 text-center mt-6 italic">
                  "Tham gia cách mạng AI trong ngành làm đẹp. Đừng để bị bỏ lại phía sau!"
                </p>
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute top-8 left-8 w-4 h-4 bg-yellow-400 rounded-full opacity-60"></div>
              <div className="absolute top-8 right-8 w-3 h-3 bg-purple-400 rounded-full opacity-60"></div>
              <div className="absolute bottom-8 left-8 w-3 h-3 bg-pink-400 rounded-full opacity-60"></div>
              <div className="absolute bottom-8 right-8 w-4 h-4 bg-blue-400 rounded-full opacity-60"></div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ArtistRevolutionCTA;