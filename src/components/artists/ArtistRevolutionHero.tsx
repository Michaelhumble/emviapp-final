import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Crown, TrendingUp, Star, Rocket, Zap, Target, Users } from "lucide-react";

const topArtists = [
  {
    id: 1,
    name: "Sofia Chen",
    specialty: "Nail Artist",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    badge: "AI PIONEER",
    status: "🔥 Viral",
    earnings: "$12K this month"
  },
  {
    id: 2,
    name: "Maria Rodriguez", 
    specialty: "Hair Stylist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    badge: "TOP 1%",
    status: "🚀 Scaling",
    earnings: "300+ bookings"
  },
  {
    id: 3,
    name: "Jessica Kim",
    specialty: "Makeup Artist", 
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    badge: "FEATURED",
    status: "⚡ Booked Out",
    earnings: "98% 5-star rating"
  }
];

const ArtistRevolutionHero = () => {
  const [currentArtist, setCurrentArtist] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentArtist((prev) => (prev + 1) % topArtists.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-black via-gray-900 to-purple-900 py-20 md:py-32 overflow-hidden">
      {/* Hero background with overlay */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Revolutionary Headlines */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-white"
          >
            {/* Authority badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-0 px-4 py-2 text-sm font-bold">
                <Rocket className="w-4 h-4 mr-2" />
                ARTIST REVOLUTION
              </Badge>
              <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white border-0 px-4 py-2 text-sm font-bold">
                2025 EDITION
              </Badge>
            </div>

            <div className="space-y-6">
              <motion.h1 
                className="text-4xl md:text-7xl font-black leading-none"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                The $50K+ Artist
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Revolution
                </span>
              </motion.h1>
              
              <motion.h2 
                className="text-xl md:text-3xl font-bold text-blue-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                How Top Artists Are Earning 6-Figures With AI-Powered Discovery
              </motion.h2>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <strong className="text-white">27,000+ beauty professionals</strong> are already using EmviApp's AI system to get discovered by premium clients. 
                Join the platform where artists earn <strong className="text-yellow-400">3x more</strong> than traditional booking methods.
              </motion.p>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link to="/auth/signup">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-black font-bold px-8 py-6 text-lg shadow-xl"
                >
                  <Crown className="mr-2 h-5 w-5" />
                  Join The Revolution
                </Button>
              </Link>
              
              <Link to="/explore/artists">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold"
                >
                  <Star className="mr-2 h-5 w-5" />
                  See Success Stories
                </Button>
              </Link>
            </motion.div>

            {/* Vietnamese CTA */}
            <motion.div 
              className="bg-gradient-to-r from-pink-900/50 to-red-900/50 backdrop-blur-sm border border-pink-500/30 rounded-xl p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-pink-500/20 rounded-full p-2">
                  <Users className="h-5 w-5 text-pink-400" />
                </div>
                <div>
                  <p className="font-bold text-pink-200">Dành cho cộng đồng Việt Nam</p>
                  <p className="text-sm text-pink-300">15,000+ thợ nail Việt đã tham gia • Interface tiếng Việt 100%</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Revolutionary Artist Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-gray-600/50">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-white mb-2">
                  🏆 AI-Powered Success Leaders
                </h3>
                <p className="text-gray-400">Real artists, real results</p>
              </div>
              
              <div className="space-y-6">
                {topArtists.map((artist, index) => (
                  <motion.div
                    key={artist.id}
                    className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-500 ${
                      index === currentArtist 
                        ? 'bg-gradient-to-r from-yellow-900/40 to-orange-900/40 shadow-lg scale-105 border border-yellow-500/30' 
                        : 'bg-gray-800/50 hover:bg-gray-700/50'
                    }`}
                    animate={{
                      scale: index === currentArtist ? 1.05 : 1,
                      opacity: index === currentArtist ? 1 : 0.7
                    }}
                  >
                    <div className="relative">
                      <img 
                        src={artist.image} 
                        alt={artist.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400/50 shadow-lg"
                      />
                      {index === currentArtist && (
                        <motion.div 
                          className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full p-1"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Crown className="h-4 w-4 text-black" />
                        </motion.div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-bold text-white">{artist.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                          index === currentArtist 
                            ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30'
                            : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        }`}>
                          {artist.badge}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-1">{artist.specialty}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full border border-green-500/30">
                          {artist.status}
                        </span>
                        <span className="text-xs text-gray-500">{artist.earnings}</span>
                      </div>
                    </div>
                    
                    {index === currentArtist && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <TrendingUp className="h-6 w-6 text-yellow-400" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center mt-6 space-x-2">
                {topArtists.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentArtist(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentArtist 
                        ? 'bg-yellow-400 scale-125' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArtistRevolutionHero;