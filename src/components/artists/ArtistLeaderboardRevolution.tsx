import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Crown, TrendingUp, Star, Zap, DollarSign, Calendar } from "lucide-react";

// Import generated avatars
import sofiaChenAvatar from "@/assets/avatars/sofia-chen-realistic.jpg";
import mariaRodriguezAvatar from "@/assets/avatars/maria-rodriguez-realistic.jpg";
import jessicaKimAvatar from "@/assets/avatars/jessica-kim-realistic.jpg";
import minhAnhNguyenAvatar from "@/assets/avatars/minh-anh-nguyen-realistic.jpg";

const topRevolutionArtists = [
  {
    id: 1,
    name: "Sofia Chen",
    specialty: "AI Nail Artist",
    location: "San Francisco, CA",
    image: sofiaChenAvatar,
    badge: "AI PIONEER",
    earnings: "$47K this month",
    rating: 4.98,
    clients: 342,
    achievement: "🚀 First to hit $500K annually",
    tier: "LEGEND"
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    specialty: "Hair Revolution Expert", 
    location: "Miami, FL",
    image: mariaRodriguezAvatar,
    badge: "TOP 0.1%",
    earnings: "$38K this month",
    rating: 4.96,
    clients: 289,
    achievement: "⚡ 98% rebooking rate",
    tier: "ELITE"
  },
  {
    id: 3,
    name: "Jessica Kim",
    specialty: "Makeup AI Specialist",
    location: "Los Angeles, CA", 
    image: jessicaKimAvatar,
    badge: "FEATURED",
    earnings: "$34K this month",
    rating: 4.94,
    clients: 256,
    achievement: "🎯 300+ premium bookings",
    tier: "RISING"
  },
  {
    id: 4,
    name: "Minh Anh Nguyen",
    specialty: "Nail Tech (Vietnamese)",
    location: "Westminster, CA",
    image: minhAnhNguyenAvatar,
    badge: "CỘNG ĐỒNG VIỆT",
    earnings: "$31K this month", 
    rating: 4.97,
    clients: 234,
    achievement: "Top Vietnamese artist",
    tier: "COMMUNITY"
  }
];

const ArtistLeaderboardRevolution = () => {
  const [currentSpotlight, setCurrentSpotlight] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSpotlight((prev) => (prev + 1) % topRevolutionArtists.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getTierColor = (tier: string) => {
    switch(tier) {
      case 'LEGEND': return 'from-yellow-400 to-orange-500';
      case 'ELITE': return 'from-purple-400 to-pink-500';
      case 'RISING': return 'from-green-400 to-blue-500';
      case 'COMMUNITY': return 'from-red-400 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

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
            AI Revolution Leaders
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Hall of Fame 2025
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Meet the artists who've mastered AI-powered success and are earning $30K-$50K+ monthly
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Spotlight Artist */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-gray-600/50">
              <div className="text-center mb-8">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-0 font-bold mb-4">
                  🏆 SPOTLIGHT ARTIST
                </Badge>
                <h3 className="text-2xl font-black text-white">
                  This Month's AI Champion
                </h3>
              </div>
              
              {topRevolutionArtists.map((artist, index) => (
                <motion.div
                  key={artist.id}
                  className={`${index === currentSpotlight ? 'block' : 'hidden'}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: index === currentSpotlight ? 1 : 0, scale: index === currentSpotlight ? 1 : 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <img 
                        src={artist.image} 
                        alt={artist.name}
                        className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-yellow-400/50 shadow-2xl"
                      />
                      <motion.div 
                        className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full p-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <Crown className="h-6 w-6 text-black" />
                      </motion.div>
                    </div>
                    
                    <div>
                      <h4 className="text-3xl font-bold text-white mb-2">{artist.name}</h4>
                      <p className="text-yellow-400 font-semibold mb-1">{artist.specialty}</p>
                      <p className="text-gray-400 text-sm">{artist.location}</p>
                    </div>
                    
                    <Badge className={`bg-gradient-to-r ${getTierColor(artist.tier)} text-black border-0 font-bold px-4 py-2`}>
                      {artist.badge}
                    </Badge>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                        <DollarSign className="h-6 w-6 text-green-400 mx-auto mb-2" />
                        <p className="text-white font-bold text-lg">{artist.earnings}</p>
                        <p className="text-gray-400 text-sm">Monthly Revenue</p>
                      </div>
                      <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                        <Star className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                        <p className="text-white font-bold text-lg">{artist.rating}</p>
                        <p className="text-gray-400 text-sm">Average Rating</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-2xl p-4">
                      <p className="text-purple-200 font-semibold">{artist.achievement}</p>
                      <p className="text-purple-300 text-sm mt-1">{artist.clients} happy clients served</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <div className="flex justify-center mt-6 space-x-2">
                {topRevolutionArtists.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSpotlight(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSpotlight 
                        ? 'bg-yellow-400 scale-125' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Full Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                🏆 Top AI Artists This Month
              </h3>
              <p className="text-gray-400">Real earnings, real success stories</p>
            </div>
            
            {topRevolutionArtists.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center space-x-4 p-6 rounded-2xl transition-all duration-300 ${
                  index === currentSpotlight 
                    ? 'bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border border-yellow-500/30 scale-105' 
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="relative">
                    <span className={`absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' :
                      index === 2 ? 'bg-orange-600' : 'bg-purple-600'
                    }`}>
                      {index + 1}
                    </span>
                    <img 
                      src={artist.image} 
                      alt={artist.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-bold text-white">{artist.name}</h4>
                      <Badge className={`bg-gradient-to-r ${getTierColor(artist.tier)} text-black text-xs font-bold`}>
                        {artist.tier}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">{artist.specialty}</p>
                    <div className="flex items-center space-x-3 text-xs">
                      <span className="text-green-400 font-semibold">{artist.earnings}</span>
                      <span className="text-yellow-400">★ {artist.rating}</span>
                      <span className="text-blue-400">{artist.clients} clients</span>
                    </div>
                  </div>
                  
                  {index === currentSpotlight && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TrendingUp className="h-6 w-6 text-yellow-400" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
            
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-6 border border-gray-600 text-center">
              <p className="text-white font-semibold mb-2">🚀 Join the Revolution</p>
              <p className="text-gray-300 text-sm">Average artist sees 312% booking increase within 3 months</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ArtistLeaderboardRevolution;