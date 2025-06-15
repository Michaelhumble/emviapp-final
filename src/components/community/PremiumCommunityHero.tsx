
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Users, Zap } from 'lucide-react';

const PremiumCommunityHero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-rose-800 to-pink-900 min-h-[60vh]">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-6 py-3 mb-8"
          >
            <Heart className="h-5 w-5 text-yellow-400" />
            <span className="text-yellow-400 font-medium">Where Beauty Dreams Come True</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            The Most
            <span className="bg-gradient-to-r from-pink-300 to-yellow-300 bg-clip-text text-transparent">
              {" "}Inspiring{" "}
            </span>
            Beauty Community
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-pink-100 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Join 15,000+ beauty professionals sharing breakthrough moments, 
            viral transformations, and building their dream careers together.
          </motion.p>

          {/* Live Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {[
              { icon: Users, number: '15.2K', label: 'Active Members', gradient: 'from-pink-400 to-rose-400' },
              { icon: Sparkles, number: '2.8M', label: 'Monthly Views', gradient: 'from-purple-400 to-pink-400' },
              { icon: Heart, number: '89K', label: 'Success Stories', gradient: 'from-yellow-400 to-orange-400' },
              { icon: Zap, number: '24/7', label: 'Support & Love', gradient: 'from-blue-400 to-purple-400' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.gradient} flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-pink-200 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105">
              <Sparkles className="mr-2 h-5 w-5 inline" />
              Share Your Story
            </button>
            
            <button className="border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300">
              Join Community
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PremiumCommunityHero;
