
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Crown, TrendingUp, Calendar } from "lucide-react";

const topArtists = [
  {
    id: 1,
    name: "Sofia Chen",
    specialty: "Nail Artist",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    badge: "VIP",
    status: "Trending",
    bookings: "127 this month"
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    specialty: "Hair Stylist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    badge: "Top Performer",
    status: "Booked Out",
    bookings: "98% rating"
  },
  {
    id: 3,
    name: "Jessica Kim",
    specialty: "Makeup Artist",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    badge: "Rising Star",
    status: "Available",
    bookings: "Next: Tomorrow"
  }
];

const ArtistHeroSection = () => {
  const [currentArtist, setCurrentArtist] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentArtist((prev) => (prev + 1) % topArtists.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-20 md:py-32 overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-200/30 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Headlines and CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-4xl md:text-6xl font-playfair font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Meet the Most 
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> In-Demand Artists </span>
                in Beauty
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-700 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Your VIP Experience Starts Here.
              </motion.p>
              
              <motion.p 
                className="text-lg text-gray-600 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Join the only platform built to help you get seen, get booked, and get paid—without the struggle.
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
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <Crown className="mr-2 h-5 w-5" />
                  Become a Featured Artist
                </Button>
              </Link>
              
              <Link to="/explore/artists">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Star className="mr-2 h-5 w-5" />
                  Book Top Talent
                </Button>
              </Link>
            </motion.div>

            {/* Free VIP Badge CTA */}
            <motion.div 
              className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-amber-100 rounded-full p-2">
                  <Crown className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-amber-800">Limited Time: Free VIP Badge!</p>
                  <p className="text-sm text-amber-700">First 50 new artists get instant VIP status</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Top Artists Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
              <h3 className="text-2xl font-playfair font-bold text-center mb-8 text-gray-800">
                🏆 Top Artists This Week
              </h3>
              
              <div className="space-y-6">
                {topArtists.map((artist, index) => (
                  <motion.div
                    key={artist.id}
                    className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-500 ${
                      index === currentArtist 
                        ? 'bg-gradient-to-r from-purple-100 to-pink-100 shadow-lg scale-105' 
                        : 'bg-gray-50 hover:bg-gray-100'
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
                        className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg"
                      />
                      {index === currentArtist && (
                        <motion.div 
                          className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Crown className="h-4 w-4 text-white" />
                        </motion.div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900">{artist.name}</h4>
                        <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                          {artist.badge}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{artist.specialty}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          artist.status === 'Trending' ? 'bg-green-100 text-green-700' :
                          artist.status === 'Booked Out' ? 'bg-red-100 text-red-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {artist.status}
                        </span>
                        <span className="text-xs text-gray-500">{artist.bookings}</span>
                      </div>
                    </div>
                    
                    {index === currentArtist && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <TrendingUp className="h-6 w-6 text-purple-600" />
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
                        ? 'bg-purple-600 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
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

export default ArtistHeroSection;
