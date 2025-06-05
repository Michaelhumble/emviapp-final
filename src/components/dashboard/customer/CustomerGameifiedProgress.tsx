
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Crown, Gem, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";

const CustomerGameifiedProgress = () => {
  const currentLevel = 7;
  const currentXP = 2840;
  const nextLevelXP = 3500;
  const progressPercent = (currentXP / nextLevelXP) * 100;
  
  const achievements = [
    { 
      icon: Star, 
      title: "First Booking", 
      description: "Completed your first beauty session",
      unlocked: true,
      rarity: "common"
    },
    { 
      icon: Crown, 
      title: "VIP Status", 
      description: "Reached VIP membership level",
      unlocked: true,
      rarity: "rare"
    },
    { 
      icon: Gem, 
      title: "Beauty Influencer", 
      description: "Referred 20+ friends to EmviApp",
      unlocked: true,
      rarity: "epic"
    },
    { 
      icon: Trophy, 
      title: "Perfect Reviews", 
      description: "Received 50 five-star reviews",
      unlocked: false,
      rarity: "legendary"
    }
  ];
  
  const nextMilestones = [
    { target: "5 more bookings", reward: "Free premium service", icon: Target },
    { target: "10 more friends", reward: "500 bonus credits", icon: Star },
    { target: "Level 10", reward: "Exclusive VIP events access", icon: Crown }
  ];
  
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "from-gray-400 to-gray-600";
      case "rare": return "from-blue-400 to-blue-600";
      case "epic": return "from-purple-400 to-purple-600";
      case "legendary": return "from-yellow-400 to-orange-500";
      default: return "from-gray-400 to-gray-600";
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              Your Beauty Journey 🌟
            </h3>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg px-4 py-2">
              Level {currentLevel}
            </Badge>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 font-medium">Progress to Level {currentLevel + 1}</span>
              <span className="text-gray-800 font-bold">{currentXP} / {nextLevelXP} XP</span>
            </div>
            <Progress value={progressPercent} className="h-3 bg-gray-200">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </Progress>
          </div>
          
          {/* XP Sources */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { action: "Book a service", xp: "+50 XP", color: "bg-blue-50 text-blue-700" },
              { action: "Leave a review", xp: "+25 XP", color: "bg-green-50 text-green-700" },
              { action: "Refer a friend", xp: "+100 XP", color: "bg-purple-50 text-purple-700" }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`${item.color} rounded-lg p-3 text-center`}
              >
                <div className="font-semibold text-sm">{item.action}</div>
                <div className="font-bold">{item.xp}</div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Gem className="h-5 w-5 text-purple-500" />
            Achievements Unlocked
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-4 rounded-xl border-2 ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-r from-white to-gray-50 border-purple-200' 
                    : 'bg-gray-100 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${getRarityColor(achievement.rarity)}`}>
                    <achievement.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{achievement.title}</h4>
                    <p className="text-gray-600 text-sm">{achievement.description}</p>
                    <Badge className={`mt-2 bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white border-0 text-xs`}>
                      {achievement.rarity.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                {achievement.unlocked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <Star className="h-3 w-3 text-white fill-current" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Milestones */}
      <Card className="border-0 bg-gradient-to-r from-purple-50 to-pink-50 shadow-xl rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            What's Next? 🎯
          </h3>
          
          <div className="space-y-3">
            {nextMilestones.map((milestone, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-purple-100"
              >
                <div className="flex items-center gap-3">
                  <milestone.icon className="h-5 w-5 text-purple-500" />
                  <span className="font-medium text-gray-800">{milestone.target}</span>
                </div>
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-orange-900 border-0">
                  {milestone.reward}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerGameifiedProgress;
