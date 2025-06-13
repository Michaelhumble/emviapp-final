import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Gift, Timer, Users, Sparkles, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const PremiumChallenges = () => {
  const weeklyChallenge = {
    title: "Holiday Glam Transformation",
    description: "Create stunning holiday looks and win exclusive prizes from our premium sponsors",
    prize: "$2,500 Professional Kit + Feature Opportunity",
    sponsor: "Luxury Beauty Co.",
    participants: 1247,
    maxParticipants: 2000,
    timeLeft: "3 days",
    difficulty: "Intermediate",
    submissions: 892
  };

  const challenges = [
    {
      id: 1,
      title: "Signature Style Challenge",
      prize: "$500 Gift Card",
      participants: 456,
      timeLeft: "5 days",
      difficulty: "Beginner",
      sponsored: false
    },
    {
      id: 2,
      title: "Color Correction Masters",
      prize: "Professional Training Course",
      participants: 234,
      timeLeft: "1 week",
      difficulty: "Advanced",
      sponsored: true
    },
    {
      id: 3,
      title: "Client Transformation Story",
      prize: "$1,000 Cash Prize",
      participants: 678,
      timeLeft: "2 weeks",
      difficulty: "All Levels",
      sponsored: true
    }
  ];

  return (
    <div className="py-12 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-white">
            Weekly <span className="text-yellow-400">Premium</span> Challenges
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Compete with the best, win incredible prizes, and get featured by top beauty brands
          </p>
        </motion.div>

        {/* Featured Challenge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 border-0 shadow-2xl overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge className="bg-white text-red-600 font-bold animate-pulse">
                <Crown className="h-3 w-3 mr-1" />
                FEATURED
              </Badge>
            </div>
            
            <CardContent className="p-8 text-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">{weeklyChallenge.title}</h3>
                  <p className="text-lg mb-6 text-white/90">{weeklyChallenge.description}</p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Gift className="h-5 w-5 text-yellow-200" />
                      <span className="font-semibold">{weeklyChallenge.prize}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-yellow-200" />
                      <span>{weeklyChallenge.participants} participants</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Timer className="h-5 w-5 text-yellow-200" />
                      <span className="font-semibold text-yellow-200">{weeklyChallenge.timeLeft} left!</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Challenge Progress</span>
                      <span className="text-sm">{Math.round((weeklyChallenge.participants / weeklyChallenge.maxParticipants) * 100)}%</span>
                    </div>
                    <Progress 
                      value={(weeklyChallenge.participants / weeklyChallenge.maxParticipants) * 100} 
                      className="h-3 bg-white/20"
                    />
                  </div>

                  <Button className="bg-white text-red-600 hover:bg-gray-100 font-bold px-8 py-3 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Join Challenge
                  </Button>
                </div>

                <div className="hidden md:block">
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
                    <h4 className="text-xl font-bold mb-4 text-center">Sponsored by</h4>
                    <div className="text-center">
                      <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Sparkles className="h-12 w-12 text-yellow-300" />
                      </div>
                      <p className="font-bold text-lg">{weeklyChallenge.sponsor}</p>
                    </div>
                    
                    <div className="mt-6 space-y-2">
                      <div className="flex justify-between">
                        <span>Submissions:</span>
                        <span className="font-bold">{weeklyChallenge.submissions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Difficulty:</span>
                        <Badge className="bg-yellow-500 text-white">{weeklyChallenge.difficulty}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Other Challenges */}
        <div className="grid md:grid-cols-3 gap-6">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
                {challenge.sponsored && (
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 text-center">
                    <Badge className="bg-white text-purple-600 text-xs">
                      SPONSORED
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-6 text-white">
                  <h4 className="text-lg font-bold mb-3">{challenge.title}</h4>
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-400" />
                        Prize:
                      </span>
                      <span className="font-semibold">{challenge.prize}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-400" />
                        Participants:
                      </span>
                      <span>{challenge.participants}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Timer className="h-4 w-4 text-red-400" />
                        Time Left:
                      </span>
                      <span className="font-semibold text-yellow-400">{challenge.timeLeft}</span>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full border-white/30 text-white hover:bg-white hover:text-gray-900 rounded-full"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumChallenges;
