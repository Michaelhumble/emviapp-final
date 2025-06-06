
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, TrendingUp, Crown, Star } from "lucide-react";

const risingStars = [
  {
    id: 1,
    name: "Sophia Martinez",
    specialty: "VIP Nail Tech",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
    bookings: 15,
    timeAgo: "2 mins ago"
  },
  {
    id: 2,
    name: "Alex Chen",
    specialty: "Hair Colorist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    bookings: 12,
    timeAgo: "5 mins ago"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    specialty: "Makeup Artist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
    bookings: 18,
    timeAgo: "8 mins ago"
  }
];

const liveUpdates = [
  "Sophia just joined as a VIP Nail Tech",
  "5 bookings in the last 10 minutes",
  "Emma earned her Top Artist badge",
  "New VIP member: Alex Chen",
  "12 artists got booked today"
];

const LeaderboardSection = () => {
  const [currentUpdate, setCurrentUpdate] = useState(0);
  const [recentBookings, setRecentBookings] = useState(147);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentUpdate((prev) => (prev + 1) % liveUpdates.length);
      if (Math.random() > 0.6) {
        setRecentBookings(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Live join ticker */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-semibold">LIVE UPDATES</span>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.p
                key={currentUpdate}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-medium"
              >
                {liveUpdates[currentUpdate]}
              </motion.p>
            </AnimatePresence>
          </div>

          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
            Live Leaderboard & 
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Gamification</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
          >
            <div className="flex items-center space-x-3 mb-8">
              <Trophy className="h-8 w-8 text-yellow-400" />
              <h3 className="text-2xl font-bold">This Week's Rising Stars</h3>
            </div>

            <div className="space-y-4">
              {risingStars.map((star, index) => (
                <motion.div
                  key={star.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={star.image}
                      alt={star.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
                    />
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{star.name}</h4>
                    <p className="text-purple-200">{star.specialty}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm">{star.bookings} bookings</span>
                      <span className="text-xs text-gray-300">• {star.timeAgo}</span>
                    </div>
                  </div>
                  
                  <TrendingUp className="h-6 w-6 text-green-400" />
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300">
                <Crown className="inline mr-2 h-5 w-5" />
                Want to be next? Join now!
              </button>
            </motion.div>
          </motion.div>

          {/* Live stats and badges */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Live bookings counter */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center">Live Booking Activity</h3>
              
              <div className="text-center space-y-4">
                <motion.div
                  className="text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
                  key={recentBookings}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  {recentBookings}
                </motion.div>
                <p className="text-xl text-gray-300">Bookings Today</p>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white/5 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-yellow-400">24</div>
                    <div className="text-sm text-gray-300">New VIPs</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-green-400">$12.5K</div>
                    <div className="text-sm text-gray-300">Earned Today</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement badges */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center">Unlock Top Artist Badge</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span>Complete your profile</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span>Get 5 five-star reviews</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-black text-sm font-bold">3</span>
                  </div>
                  <span>Complete 10 bookings <span className="text-yellow-400">(7/10)</span></span>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                  See All Badges
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;
