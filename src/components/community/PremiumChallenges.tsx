import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Clock, Gift, Star, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PremiumChallenges = () => {
  const [activeChallenge, setActiveChallenge] = useState(0);

  const challenges = [
    {
      id: 1,
      title: "November Nail Art Mastery",
      description: "Create stunning fall-themed nail designs and share your masterpieces with the community.",
      prize: "$500 Professional Kit + Feature Spotlight",
      participants: 347,
      timeLeft: "12 days",
      difficulty: "Intermediate",
      image: "/lovable-uploads/323c0530-2a0b-45ee-9065-646dee476f89.png",
      sponsor: "ProNails Academy",
      entries: 89,
      featured: true,
      progress: 65
    },
    {
      id: 2,
      title: "Client Transformation Challenge",
      description: "Document a complete makeover journey from consultation to final reveal.",
      prize: "$300 Cash + Professional Photoshoot",
      participants: 234,
      timeLeft: "8 days",
      difficulty: "Advanced",
      image: "/lovable-uploads/4bc7eaab-8b8b-4b00-a4bb-6ea3b6deb483.png",
      sponsor: "Beauty Masters Studio",
      entries: 67,
      featured: false,
      progress: 45
    },
    {
      id: 3,
      title: "Quick Tutorial Series",
      description: "Share your best 60-second technique tutorials for fellow beauty professionals.",
      prize: "$200 + 1-Year Premium Membership",
      participants: 189,
      timeLeft: "15 days",
      difficulty: "Beginner",
      image: "/lovable-uploads/565dbac0-48b7-4aaf-b1ad-7c97ca38e1e9.png",
      sponsor: "SkillShare Beauty",
      entries: 45,
      featured: false,
      progress: 30
    }
  ];

  return (
    <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-white">
            <Trophy className="inline-block h-8 w-8 text-yellow-400 mr-2" />
            Premium Challenges
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Exclusive competitions with luxury prizes - showcase your skills and win big
          </p>
        </motion.div>

        {/* Featured Challenge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-8 border border-white/20"
        >
          <div className="flex items-center justify-between mb-6">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-lg px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              Featured Challenge
            </Badge>
            <Badge className="bg-red-500 text-white animate-pulse">
              <Clock className="h-3 w-3 mr-1" />
              {challenges[0].timeLeft} left
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {challenges[0].title}
              </h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                {challenges[0].description}
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-white">
                  <Gift className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold">Prize: {challenges[0].prize}</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <Users className="h-5 w-5 text-blue-400" />
                  <span>{challenges[0].participants} participants • {challenges[0].entries} entries submitted</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <Star className="h-5 w-5 text-purple-400" />
                  <span>Sponsored by {challenges[0].sponsor}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-white/70 mb-2">
                  <span>Challenge Progress</span>
                  <span>{challenges[0].progress}% Complete</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${challenges[0].progress}%` }}
                  />
                </div>
              </div>

              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-2xl">
                Join Challenge Now
              </button>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img 
                  src={challenges[0].image}
                  alt={challenges[0].title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-purple-900 rounded-2xl p-4 font-bold text-lg shadow-2xl">
                ${challenges[0].prize.split(' ')[0].replace('$', '')} Prize!
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Challenges Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {challenges.slice(1).map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 1) * 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <Badge className={`${
                  challenge.difficulty === 'Advanced' ? 'bg-red-500' : 
                  challenge.difficulty === 'Intermediate' ? 'bg-yellow-500' : 'bg-green-500'
                } text-white`}>
                  {challenge.difficulty}
                </Badge>
                <Badge className="bg-white/20 text-white">
                  <Clock className="h-3 w-3 mr-1" />
                  {challenge.timeLeft}
                </Badge>
              </div>

              <div className="aspect-video rounded-xl overflow-hidden mb-4">
                <img 
                  src={challenge.image}
                  alt={challenge.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{challenge.title}</h3>
              <p className="text-white/70 text-sm mb-4">{challenge.description}</p>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-white/80">
                  <Gift className="h-4 w-4 text-yellow-400" />
                  <span>{challenge.prize}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span>{challenge.participants} participants</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl transform hover:scale-105 transition-all duration-300">
                Enter Challenge
              </button>
            </motion.div>
          ))}
        </div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Recent Winners</h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
            <div className="bg-white/10 rounded-full px-4 py-2">
              🏆 Maria won $500 Kit (Oct Challenge)
            </div>
            <div className="bg-white/10 rounded-full px-4 py-2">
              🥈 Jake earned $300 + Photoshoot
            </div>
            <div className="bg-white/10 rounded-full px-4 py-2">
              🥉 Lisa got Premium Membership
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumChallenges;
