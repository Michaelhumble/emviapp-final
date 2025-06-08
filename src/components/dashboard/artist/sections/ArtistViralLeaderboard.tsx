
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Users, Crown, Medal, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ArtistViralLeaderboard = () => {
  const leaderboardData = [
    {
      rank: 1,
      name: "You",
      avatar: "/lovable-uploads/749e5584-caa4-4229-84a2-93589c7455c2.png",
      score: 2847,
      badge: "🥇",
      isUser: true,
      change: "+24",
      tier: "Diamond Elite"
    },
    {
      rank: 2,
      name: "Sarah K.",
      avatar: "/lovable-uploads/63331551-d921-46f4-98dc-8404b611ddd3.png",
      score: 2791,
      badge: "🥈",
      isUser: false,
      change: "+12",
      tier: "Diamond"
    },
    {
      rank: 3,
      name: "Maria R.",
      avatar: "/lovable-uploads/b13a3b43-f6e1-4746-9992-03f6e8fac6bf.png",
      score: 2654,
      badge: "🥉",
      isUser: false,
      change: "+8",
      tier: "Platinum"
    },
    {
      rank: 4,
      name: "Jessica C.",
      avatar: "/lovable-uploads/b4f117ee-b209-43be-8e30-ecbf1d025c93.png",
      score: 2598,
      badge: "4️⃣",
      isUser: false,
      change: "+5",
      tier: "Gold"
    },
    {
      rank: 5,
      name: "Alex P.",
      avatar: "/lovable-uploads/1763ca30-ecb0-409f-8bb0-11b851ea743f.png",
      score: 2543,
      badge: "5️⃣",
      isUser: false,
      change: "+3",
      tier: "Gold"
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Diamond Elite': return 'text-cyan-300 bg-cyan-500/20 border-cyan-400/30';
      case 'Diamond': return 'text-blue-300 bg-blue-500/20 border-blue-400/30';
      case 'Platinum': return 'text-purple-300 bg-purple-500/20 border-purple-400/30';
      case 'Gold': return 'text-yellow-300 bg-yellow-500/20 border-yellow-400/30';
      default: return 'text-gray-300 bg-gray-500/20 border-gray-400/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 lg:h-6 lg:w-6 text-yellow-400" />
          <h3 className="text-lg lg:text-xl font-bold text-white">City Leaderboard</h3>
        </div>
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          <TrendingUp className="h-3 w-3 mr-1" />
          Live
        </Badge>
      </div>

      <Card className="border-0 shadow-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border border-yellow-500/20">
        <div className="p-4 lg:p-6">
          {/* Header Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-2xl lg:text-3xl font-bold text-yellow-400">🥇</div>
              <div className="text-xs lg:text-sm text-gray-300 font-medium">#1 in City</div>
            </motion.div>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-2xl lg:text-3xl font-bold text-purple-400">156</div>
              <div className="text-xs lg:text-sm text-gray-300 font-medium">Points Ahead</div>
            </motion.div>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-2xl lg:text-3xl font-bold text-green-400">+24</div>
              <div className="text-xs lg:text-sm text-gray-300 font-medium">This Week</div>
            </motion.div>
          </div>

          {/* Leaderboard List */}
          <div className="space-y-3">
            {leaderboardData.map((artist, index) => (
              <motion.div
                key={artist.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                  artist.isUser 
                    ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400/50 shadow-lg' 
                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                }`}
              >
                <div className="text-lg lg:text-xl">{artist.badge}</div>
                
                <div className="relative">
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 ${
                      artist.isUser ? 'border-yellow-400' : 'border-white/20'
                    }`}
                  />
                  {artist.isUser && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-1 -right-1"
                    >
                      <Crown className="h-4 w-4 text-yellow-400" />
                    </motion.div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className={`font-semibold ${
                      artist.isUser ? 'text-yellow-100' : 'text-white'
                    }`}>
                      {artist.name}
                    </div>
                    {artist.isUser && (
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-gray-400">
                      {artist.score.toLocaleString()} points
                    </div>
                    <Badge className={`text-xs ${getTierColor(artist.tier)}`}>
                      {artist.tier}
                    </Badge>
                  </div>
                </div>
                
                <div className="text-right">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-sm font-bold text-green-400"
                  >
                    {artist.change}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-6 space-y-3">
            <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium shadow-lg">
              <Users className="h-4 w-4 mr-2" />
              Invite Friends to Climb Higher!
            </Button>
            <div className="text-center">
              <p className="text-xs text-yellow-200 font-medium">
                🔥 Get 100 points for each friend who joins EmviApp!
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Diamond Elite artists earn 10x more on average ✨
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ArtistViralLeaderboard;
