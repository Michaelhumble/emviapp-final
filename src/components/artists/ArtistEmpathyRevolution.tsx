import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Check, Zap, Shield, Target, Heart, TrendingUp } from "lucide-react";

const ArtistEmpathyRevolution = () => {
  const revolutionFeatures = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "AI-Powered Client Matching",
      description: "Our algorithm connects you with clients who value your specific skills and pay premium rates",
      result: "+267% booking quality"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Automated Portfolio Promotion", 
      description: "Your work gets showcased to 50K+ potential clients automatically through our AI discovery engine",
      result: "+189% profile views"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Instant Premium Recognition",
      description: "Get VIP badges, featured placement, and authority status that commands higher prices",
      result: "+156% average booking value"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-purple-900">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            We Know The Struggle—
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Here's The AI Revolution
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            <strong className="text-white">Every frustration you've faced inspired an AI feature we built.</strong> This isn't just another platform—it's your career transformation system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: AI-Powered Solutions */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {revolutionFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-600/50 rounded-2xl p-8 hover:border-yellow-400/50 transition-all duration-300">
                  <div className="flex items-start space-x-6">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="bg-green-500/20 border border-green-500/30 rounded-lg px-4 py-2 inline-block">
                        <span className="text-green-400 font-bold text-sm">
                          ⚡ {feature.result}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Customer Promise */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-md border border-purple-500/30 rounded-3xl p-12 shadow-2xl">
              <div className="text-center space-y-8">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                  <Heart className="h-12 w-12 text-pink-400" />
                </div>
                
                <h3 className="text-4xl font-black text-white">
                  For Our Customers
                </h3>
                
                <p className="text-xl text-purple-100 leading-relaxed">
                  We invest in AI-powered artist discovery—so you always get 
                  <strong className="text-white"> the very best talent, automatically matched to your needs.</strong>
                </p>
                
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                    <Shield className="h-10 w-10 mx-auto mb-3 text-blue-400" />
                    <p className="text-white font-bold">AI-Verified Artists</p>
                    <p className="text-purple-200 text-sm mt-1">Advanced screening system</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                    <Zap className="h-10 w-10 mx-auto mb-3 text-yellow-400" />
                    <p className="text-white font-bold">Instant Matching</p>
                    <p className="text-purple-200 text-sm mt-1">AI finds your perfect artist</p>
                  </div>
                </div>

                {/* Vietnamese section */}
                <div className="bg-pink-500/20 border border-pink-400/30 rounded-2xl p-6 mt-8">
                  <p className="text-pink-200 font-semibold">
                    🇻🇳 Dành cho khách hàng Việt Nam
                  </p>
                  <p className="text-pink-100 text-sm mt-2">
                    AI tự động tìm thợ nail giỏi nhất cho bạn • Giao tiếp tiếng Việt 100%
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ArtistEmpathyRevolution;