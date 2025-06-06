
import React from "react";
import { motion } from "framer-motion";
import { Crown, Star, Users, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const MemberHallOfFame = () => {
  const featuredCreators = [
    {
      name: "Isabella Martinez",
      role: "Master Colorist",
      avatar: "👸",
      followers: "12.5K",
      posts: 89,
      badge: "Investor's Pick",
      badgeColor: "gold",
      achievements: ["Top Educator", "Community Hero", "VIP Artist"]
    },
    {
      name: "James Thompson",
      role: "Nail Tech Innovator",
      avatar: "👨‍🎨",
      followers: "8.2K",
      posts: 156,
      badge: "Rising Star",
      badgeColor: "purple",
      achievements: ["Trendsetter", "Help Master", "Creative Genius"]
    },
    {
      name: "Sophia Chen",
      role: "Lash Extension Expert",
      avatar: "✨",
      followers: "15.1K",
      posts: 234,
      badge: "Community Queen",
      badgeColor: "pink",
      achievements: ["Most Helpful", "Inspiration Leader", "VIP Member"]
    }
  ];

  const getBadgeGradient = (color: string) => {
    switch (color) {
      case "gold":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case "purple":
        return "bg-gradient-to-r from-purple-500 to-purple-700";
      case "pink":
        return "bg-gradient-to-r from-pink-500 to-pink-700";
      default:
        return "bg-gradient-to-r from-purple-500 to-pink-500";
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="h-8 w-8 text-yellow-500" />
            <span className="text-lg font-semibold text-purple-700 bg-purple-100 px-4 py-1 rounded-full">
              Hall of Fame
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
            Featured Creators of the Week
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Meet the stars who inspire, educate, and elevate our entire community
          </p>

          {/* FOMO Call-out */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded-xl p-4 max-w-md mx-auto"
          >
            <p className="text-lg font-semibold text-orange-800">
              🌟 Want to be here? Level up, help others, and get noticed!
            </p>
          </motion.div>
        </motion.div>

        {/* Featured Creators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredCreators.map((creator, index) => (
            <motion.div
              key={creator.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
              
              {/* Badge */}
              <div className={`absolute top-4 right-4 ${getBadgeGradient(creator.badgeColor)} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                {creator.badge}
              </div>

              {/* Avatar and Basic Info */}
              <div className="text-center mb-6 relative z-10">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-4xl shadow-lg">
                  {creator.avatar}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{creator.name}</h3>
                <p className="text-purple-600 font-medium mb-3">{creator.role}</p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span className="font-bold text-gray-900">{creator.followers}</span>
                    </div>
                    <p className="text-xs text-gray-600">followers</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-bold text-gray-900">{creator.posts}</span>
                    </div>
                    <p className="text-xs text-gray-600">posts</p>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="space-y-2 mb-6">
                {creator.achievements.map((achievement, idx) => (
                  <div
                    key={achievement}
                    className="flex items-center gap-2 bg-purple-50 rounded-lg px-3 py-2"
                  >
                    <Award className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">{achievement}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <Button 
                variant="outline" 
                className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                View Profile
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <span className="text-3xl font-bold text-gray-900">94%</span>
              </div>
              <p className="text-gray-600">Member Satisfaction</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-6 w-6 text-purple-600" />
                <span className="text-3xl font-bold text-gray-900">12.5K</span>
              </div>
              <p className="text-gray-600">Active Members</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-6 w-6 text-yellow-500" />
                <span className="text-3xl font-bold text-gray-900">8.9</span>
              </div>
              <p className="text-gray-600">Avg. Rating</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="h-6 w-6 text-yellow-600" />
                <span className="text-3xl font-bold text-gray-900">567</span>
              </div>
              <p className="text-gray-600">VIP Members</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MemberHallOfFame;
