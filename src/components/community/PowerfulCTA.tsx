
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ArrowRight, Star } from 'lucide-react';

const PowerfulCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-6 py-3 mb-8"
          >
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="text-yellow-400 font-medium">Your Story Starts Here</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Ready to Write Your
            <span className="bg-gradient-to-r from-pink-300 to-yellow-300 bg-clip-text text-transparent">
              {" "}Success Story?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-pink-100 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Join thousands of beauty professionals who've transformed their careers, 
            built their dreams, and found their tribe. Your breakthrough moment is waiting.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <button className="group bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white px-12 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
              <Heart className="h-6 w-6" />
              Share Your Story
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-12 py-5 rounded-full text-xl font-bold transition-all duration-300 flex items-center gap-3">
              <Sparkles className="h-6 w-6" />
              Join Community
            </button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-pink-200 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 border-2 border-white"
                    style={{
                      backgroundImage: `url(https://images.unsplash.com/photo-${1494790108755 + i}-2616b69c3ad8?q=80&w=40&auto=format&fit=crop)`
                    }}
                  />
                ))}
              </div>
              <span>15,000+ members and growing</span>
            </div>
            
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2">4.9/5 community rating</span>
            </div>
          </motion.div>

          {/* Trust Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 pt-8 border-t border-white/20"
          >
            <p className="text-pink-200 text-lg">
              Trusted by beauty professionals nationwide • Safe, supportive, and inspiring
            </p>
            
            <div className="mt-4">
              <span className="text-sm font-medium bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Inspired by Sunshine ☀️
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PowerfulCTA;
