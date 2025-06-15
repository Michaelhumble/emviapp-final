
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, MapPin, TrendingUp, Instagram, ExternalLink } from 'lucide-react';

const MemberSpotlight = () => {
  const spotlightMember = {
    name: "Isabella Martinez",
    role: "Celebrity Makeup Artist",
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600",
    coverImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200",
    story: "From struggling single mom to red carpet makeup artist. EmviApp didn't just change my career—it saved my family's future.",
    achievements: [
      "Emmy Awards Makeup Team",
      "Celebrity clients include A-list stars",
      "Featured in Vogue & Harper's Bazaar",
      "Owns luxury studio in Beverly Hills"
    ],
    stats: {
      beforeIncome: "$800/month",
      currentIncome: "$120K/month",
      timeframe: "3 years",
      followers: "2.8M"
    },
    instagramHandle: "@isabellamua",
    testimonial: "EmviApp taught me that my dreams weren't too big—I was just thinking too small. The community here doesn't just cheer you on, they show you exactly how to get there."
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-6 py-3 mb-6"
          >
            <Crown className="h-5 w-5 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">Member Spotlight</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair"
          >
            This Month's Success Story
          </motion.h2>
        </div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
          >
            {/* Cover Image */}
            <div className="relative h-64 md:h-80">
              <img
                src={spotlightMember.coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Profile Image */}
              <div className="absolute bottom-6 left-6">
                <img
                  src={spotlightMember.image}
                  alt={spotlightMember.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
              
              {/* Quick Stats */}
              <div className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold">{spotlightMember.stats.followers}</div>
                  <div className="text-sm">Instagram Followers</div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-white font-playfair">
                        {spotlightMember.name}
                      </h3>
                      <p className="text-purple-200 text-lg font-semibold">{spotlightMember.role}</p>
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="h-4 w-4" />
                        {spotlightMember.location}
                      </div>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <a 
                        href="#" 
                        className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all"
                      >
                        <Instagram className="h-4 w-4" />
                        {spotlightMember.instagramHandle}
                      </a>
                    </div>
                  </div>

                  <blockquote className="text-xl text-white leading-relaxed mb-8 italic">
                    "{spotlightMember.testimonial}"
                  </blockquote>

                  <div className="prose text-gray-200 mb-8">
                    <p className="text-lg leading-relaxed">{spotlightMember.story}</p>
                  </div>

                  {/* Achievements */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-white mb-4">Key Achievements</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {spotlightMember.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 bg-white/10 rounded-xl p-3"
                        >
                          <Star className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                          <span className="text-white">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats Sidebar */}
                <div className="space-y-6">
                  <div className="bg-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                      Transformation Stats
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-300 mb-1">Started At</div>
                        <div className="text-2xl font-bold text-red-400">{spotlightMember.stats.beforeIncome}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-gray-300 mb-1">Current Income</div>
                        <div className="text-2xl font-bold text-green-400">{spotlightMember.stats.currentIncome}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-gray-300 mb-1">Timeframe</div>
                        <div className="text-xl font-bold text-purple-400">{spotlightMember.stats.timeframe}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-2xl p-6 border border-yellow-400/30">
                    <h4 className="text-lg font-bold text-yellow-400 mb-3">Want to be featured?</h4>
                    <p className="text-white text-sm mb-4">
                      Share your transformation story and inspire thousands of beauty professionals.
                    </p>
                    <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3 rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all flex items-center justify-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Submit Your Story
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MemberSpotlight;
