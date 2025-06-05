
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Flame, Award, Star, Gift } from "lucide-react";
import { motion } from "framer-motion";

const CustomerGameifiedProgress = () => {
  const level = 7;
  const xp = 1240;
  const nextLevelXp = 1500;
  const progressPercentage = (xp / nextLevelXp) * 100;
  
  const achievements = [
    { 
      icon: Star, 
      title: "Beauty Explorer", 
      description: "Tried 5 different services",
      unlocked: true,
      color: "from-yellow-400 to-orange-500"
    },
    { 
      icon: Award, 
      title: "Review Master", 
      description: "Left 10 helpful reviews",
      unlocked: true,
      color: "from-purple-400 to-pink-500"
    },
    { 
      icon: Trophy, 
      title: "VIP Member", 
      description: "Reached level 5",
      unlocked: true,
      color: "from-blue-400 to-indigo-500"
    },
    { 
      icon: Flame, 
      title: "Streak Master", 
      description: "7-day booking streak",
      unlocked: false,
      color: "from-orange-400 to-red-500"
    }
  ];

  const challenges = [
    { title: "Book 3 services this month", progress: 67, reward: "50 credits", deadline: "8 days left" },
    { title: "Refer 2 friends", progress: 50, reward: "100 credits", deadline: "15 days left" },
    { title: "Leave 5 reviews", progress: 80, reward: "25 credits", deadline: "12 days left" }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          Your Beauty Journey 🎯
        </h2>
        <p className="text-purple-200">
          Level up and unlock exclusive rewards as you explore EmviApp
        </p>
      </div>

      {/* Level Progress */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Level {level}</h3>
                  <p className="text-sm text-gray-600">Beauty Enthusiast</p>
                </div>
              </div>
              
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold px-3 py-1">
                {xp} XP
              </Badge>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress to Level {level + 1}</span>
                <span className="font-medium text-gray-800">{xp} / {nextLevelXp} XP</span>
              </div>
              <Progress 
                value={progressPercentage} 
                className="h-3 bg-gray-200 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-pink-500"
              />
            </div>
            
            <p className="text-sm text-center text-gray-600">
              <span className="font-semibold text-purple-600">{nextLevelXp - xp} XP</span> until next level!
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-600" />
              Achievements
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`relative p-4 rounded-xl text-center transition-all duration-300 ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200' 
                      : 'bg-gray-50 border-2 border-gray-200 opacity-60'
                  }`}
                >
                  {achievement.unlocked && (
                    <div className="absolute -top-2 -right-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                  )}
                  
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                    achievement.unlocked 
                      ? `bg-gradient-to-br ${achievement.color}` 
                      : 'bg-gray-300'
                  }`}>
                    <achievement.icon className={`h-6 w-6 ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">
                    {achievement.title}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Active Challenges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-600" />
              Active Challenges
            </h3>
            
            <div className="space-y-4">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                  className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{challenge.title}</h4>
                    <div className="flex items-center gap-2">
                      <Gift className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-700">{challenge.reward}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Progress 
                      value={challenge.progress} 
                      className="h-2 bg-orange-200 [&>div]:bg-gradient-to-r [&>div]:from-orange-400 [&>div]:to-yellow-400"
                    />
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">{challenge.progress}% complete</span>
                      <span className="text-orange-600 font-medium">{challenge.deadline}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CustomerGameifiedProgress;
