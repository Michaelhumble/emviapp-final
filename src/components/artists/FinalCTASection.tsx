
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Crown, Calculator, Star, TrendingUp } from "lucide-react";

const FinalCTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-400/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
            Ready to Join the
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Elite? </span>
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Your VIP status and exclusive perks are waiting. The best artists don't wait—they lead.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Artist CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
          >
            <div className="text-center space-y-8">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center shadow-xl">
                <Crown className="h-10 w-10" />
              </div>
              
              <div>
                <h3 className="text-3xl font-playfair font-bold mb-4">For Artists</h3>
                <p className="text-purple-100 text-lg mb-6">
                  Join the exclusive community where talent meets opportunity
                </p>
              </div>

              <div className="space-y-4">
                <Link to="/auth/signup">
                  <Button 
                    size="lg"
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-500 hover:to-orange-500 font-bold text-lg py-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Crown className="mr-2 h-5 w-5" />
                    Apply Now—Free VIP Badge!
                  </Button>
                </Link>
                
                <p className="text-sm text-yellow-200">
                  🔥 Limited: First 50 new artists only
                </p>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full border-2 border-white/30 text-white hover:bg-white/10 font-semibold py-4"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  See How Much You Could Earn
                </Button>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-sm text-purple-200">
                  💰 Average artist earns $3,200/month<br/>
                  ⭐ 94% get booked within 7 days<br/>
                  👑 VIP artists earn 40% more
                </p>
              </div>
            </div>
          </motion.div>

          {/* Customer CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
          >
            <div className="text-center space-y-8">
              <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center shadow-xl">
                <Star className="h-10 w-10" />
              </div>
              
              <div>
                <h3 className="text-3xl font-playfair font-bold mb-4">For Customers</h3>
                <p className="text-purple-100 text-lg mb-6">
                  Experience premium beauty services from verified top talent
                </p>
              </div>

              <div className="space-y-4">
                <Link to="/explore/artists">
                  <Button 
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-lg py-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Star className="mr-2 h-5 w-5" />
                    Book a Top Artist Now
                  </Button>
                </Link>
                
                <Link to="/explore/salons">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="w-full border-2 border-white/30 text-white hover:bg-white/10 font-semibold py-4"
                  >
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Browse Trending Services
                  </Button>
                </Link>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-sm text-purple-200">
                  ✨ Only handpicked, verified artists<br/>
                  🛡️ Safe, secure booking platform<br/>
                  💎 Premium experience guaranteed
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Final FOMO message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-6 border border-red-300/30">
            <p className="text-red-200 font-semibold text-lg">
              ⚡ Don't miss out! 847 artists joined this week
            </p>
            <p className="text-sm text-red-300 mt-2">
              The beauty industry is evolving. Be part of the movement.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
