
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, MessageCircle, Sparkles, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const CommunityHeroSection = () => {
  const [onlineCount, setOnlineCount] = useState(2847);
  const [newMembers, setNewMembers] = useState([
    { name: "Sophia Chen", role: "VIP Nail Tech", avatar: "👩‍🎨" },
    { name: "Marcus Rivera", role: "Hair Artist", avatar: "👨‍🎨" },
    { name: "Elena Vasquez", role: "Lash Specialist", avatar: "💄" },
    { name: "David Kim", role: "Salon Owner", avatar: "👑" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => prev + Math.floor(Math.random() * 5));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-300/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-300/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-300/20 rounded-full animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="h-8 w-8 text-yellow-500" />
            <span className="text-lg font-semibold text-purple-700 bg-purple-100 px-4 py-1 rounded-full">
              Beauty Billionaires' Club
            </span>
            <Crown className="h-8 w-8 text-yellow-500" />
          </div>

          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-gray-900 mb-6">
            The #1 Beauty Community
          </h1>
          <h2 className="text-3xl md:text-4xl font-playfair text-purple-700 mb-4">
            Built for You. Powered by Love, Talent, and AI.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Connect. Share. Get Inspired. Grow together—with exclusive rewards for every member.
          </p>

          {/* Live Online Counter */}
          <motion.div
            key={onlineCount}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-green-800">
                {onlineCount.toLocaleString()} members online
              </span>
            </div>

            {/* Animated member avatars */}
            <div className="flex -space-x-2">
              <AnimatePresence>
                {newMembers.slice(0, 4).map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ scale: 0, x: 20 }}
                    animate={{ scale: 1, x: 0 }}
                    exit={{ scale: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="w-12 h-12 bg-white rounded-full border-3 border-purple-300 flex items-center justify-center text-lg shadow-lg"
                    title={`${member.name} - ${member.role}`}
                  >
                    {member.avatar}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 px-8 py-3 text-lg font-semibold rounded-full shadow-xl"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Join the Conversation
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg font-semibold rounded-full"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Suggest a Feature
            </Button>
          </div>
        </motion.div>

        {/* Recent Member Join Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-purple-100"
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              🔥 Who Just Joined the Club
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {newMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center"
                >
                  <div className="text-3xl mb-2">{member.avatar}</div>
                  <p className="font-semibold text-gray-900 text-sm">{member.name}</p>
                  <p className="text-xs text-purple-600">{member.role}</p>
                  <div className="flex items-center justify-center mt-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-500 ml-1">VIP</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityHeroSection;
