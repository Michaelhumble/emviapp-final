
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalFounderCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-indigo-50/30 via-purple-50/20 to-pink-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/30 via-transparent to-pink-100/30"></div>
      <div className="absolute top-10 left-20 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 right-20 w-80 h-80 bg-gradient-to-tl from-purple-400/10 to-pink-400/10 rounded-full filter blur-3xl"></div>
      
      {/* Floating sparkles */}
      <div className="absolute top-20 left-1/4 text-indigo-500 text-2xl animate-pulse">🚀</div>
      <div className="absolute top-32 right-1/3 text-purple-500 text-xl animate-pulse" style={{ animationDelay: '1s' }}>✨</div>
      <div className="absolute bottom-32 left-1/3 text-pink-500 text-lg animate-pulse" style={{ animationDelay: '2.5s' }}>💫</div>
      <div className="absolute bottom-20 right-1/4 text-violet-500 text-xl animate-pulse" style={{ animationDelay: '3.5s' }}>⭐</div>

      <div className="container mx-auto px-4 relative z-10">
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
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-1">
              <div className="bg-white rounded-3xl h-full w-full"></div>
            </div>
            
            {/* Content */}
            <div className="relative bg-white rounded-3xl p-12 md:p-16 lg:p-20 shadow-2xl text-center">
              {/* Title Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-3xl">🌟</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
                    Ready to Transform Your Beauty Career?
                  </h2>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-3xl">🚀</span>
                  </div>
                </div>
                
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-8">
                  Join thousands of artists, salon owners, and beauty enthusiasts who've found success with EmviApp.
                </p>

                {/* Gradient underline */}
                <motion.div 
                  className="w-32 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mx-auto"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                />
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col md:flex-row items-center justify-center gap-6"
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
                  <a href="http://emviapp-final.lovable.app/auth/signup?redirect=%2F">
                    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold px-12 py-6 rounded-2xl text-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                      <span className="flex items-center">
                        <span className="mr-3">🚀 Get Started Free</span>
                        <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                      </span>
                    </div>
                  </a>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to="/salons">
                    <div className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 font-bold px-12 py-6 rounded-2xl text-xl hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <span className="flex items-center">
                        <span>🔍 Explore Services</span>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Additional trust signals */}
              <motion.div 
                className="mt-12 pt-8 border-t border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex flex-wrap items-center justify-center gap-8 text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>100% Free to Start</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>No Credit Card Required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Trusted by 50,000+ Professionals</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute top-8 left-8 w-4 h-4 bg-indigo-400 rounded-full opacity-60"></div>
              <div className="absolute top-8 right-8 w-3 h-3 bg-purple-400 rounded-full opacity-60"></div>
              <div className="absolute bottom-8 left-8 w-3 h-3 bg-pink-400 rounded-full opacity-60"></div>
              <div className="absolute bottom-8 right-8 w-4 h-4 bg-violet-400 rounded-full opacity-60"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalFounderCTA;
