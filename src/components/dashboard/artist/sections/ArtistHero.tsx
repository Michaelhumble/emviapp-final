
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram, Globe, Pencil, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useArtistData } from "../context/ArtistDataContext";
import { useAuth } from "@/context/auth";
import VerifiedBadge from "@/components/artist-profile/VerifiedBadge";
import { motion } from "framer-motion";

const ArtistHero: React.FC = () => {
  const { artistProfile } = useArtistData() || {};
  const { userProfile } = useAuth();

  // MOCK: Verified badge
  const isVerified = true;

  const profile = artistProfile || userProfile || {};

  const {
    full_name = "Michael Nguyen",
    specialty = "Nail Design",
    bio = '"Your artistry is your brand. Let\'s grow it."',
    avatar_url = "",
    instagram,
    website,
  } = profile;

  const getInitials = (name?: string) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "A";

  const formattedInstagram = instagram
    ? instagram.startsWith("@")
      ? instagram
      : `@${instagram}`
    : "@https://instagram.com/humbleinsider";

  return (
    <section className="w-full mb-8">
      <motion.div 
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Premium Background with Animated Gradients */}
        <div className="h-64 relative overflow-hidden">
          {/* Multi-layer gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600" />
          <div className="absolute inset-0 bg-gradient-to-tl from-pink-500/30 via-transparent to-blue-500/20" />
          
          {/* Animated gradient overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{ 
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
          />
          
          {/* Glassmorphism particles */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full backdrop-blur-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Edit Profile Button */}
          <motion.div
            className="absolute top-6 right-6 z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button 
              asChild
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-white/30 shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Link to="/profile/edit">
                <Pencil className="h-4 w-4 mr-1.5" />
                Edit Profile
              </Link>
            </Button>
          </motion.div>

          {/* Artist Name with Premium Typography */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="font-playfair font-bold antialiased text-5xl md:text-7xl tracking-wide text-white drop-shadow-2xl flex items-center justify-center gap-3 mb-2">
                {full_name}
                {isVerified && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
                  >
                    <VerifiedBadge />
                  </motion.div>
                )}
              </h1>
              <motion.div
                className="flex items-center justify-center gap-2 text-white/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Sparkles className="h-4 w-4" />
                <span className="text-lg font-medium">Premium Artist</span>
                <Sparkles className="h-4 w-4" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Profile Content with Glassmorphism */}
        <motion.div 
          className="relative bg-white/95 backdrop-blur-xl border-t border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Gradient border effect */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          
          <div className="px-8 pb-8 bg-gradient-to-b from-white/50 to-white/80 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center -mt-16">
              {/* Premium Avatar */}
              <motion.div
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-2xl ring-4 ring-purple-500/20">
                    <AvatarImage 
                      src={avatar_url} 
                      alt={full_name}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100 text-purple-700 text-4xl font-bold">
                      {getInitials(full_name)}
                    </AvatarFallback>
                  </Avatar>
                  {/* Glowing ring animation */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-purple-400/40"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5] 
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  />
                </div>
              </motion.div>
              
              {/* Profile Information */}
              <motion.div 
                className="pt-4 sm:pt-0 flex-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/40">
                  <p className="text-xl text-gray-700 font-medium mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    {specialty}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <motion.a 
                      href={`https://instagram.com/${formattedInstagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-all duration-300 bg-white/80 px-3 py-2 rounded-lg hover:bg-purple-50 hover:scale-105"
                      whileHover={{ y: -2 }}
                    >
                      <Instagram className="h-5 w-5" />
                      <span className="font-medium">{formattedInstagram}</span>
                    </motion.a>
                    
                    {website && (
                      <motion.a 
                        href={website.startsWith('http') ? website : `https://${website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-all duration-300 bg-white/80 px-3 py-2 rounded-lg hover:bg-purple-50 hover:scale-105"
                        whileHover={{ y: -2 }}
                      >
                        <Globe className="h-5 w-5" />
                        <span className="font-medium">Website</span>
                      </motion.a>
                    )}
                  </div>
                  
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <p className="text-gray-700 font-serif italic text-lg leading-relaxed bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">
                      {bio}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ArtistHero;
