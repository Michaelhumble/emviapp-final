
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Users, Zap, Crown, Medal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ArtistLiveLeaderboard = () => {
  const leaderboardData = [
    {
      rank: 1,
      name: "You",
      avatar: "/lovable-uploads/749e5584-caa4-4229-84a2-93589c7455c2.png",
      score: 2847,
      badge: "🥇",
      isUser: true,
      change: "+24"
    },
    {
      rank: 2,
      name: "Sarah K.",
      avatar: "/lovable-uploads/63331551-d921-46f4-98dc-8404b611ddd3.png",
      score: 2791,
      badge: "🥈",
      isUser: false,
      change: "+12"
    },
    {
      rank: 3,
      name: "Maria R.",
      avatar: "/lovable-uploads/b13a3b43-f6e1-4746-9992-03f6e8fac6bf.png",
      score: 2654,
      badge: "🥉",
      isUser: false,
      change: "+8"
    },
    {
      rank: 4,
      name: "Jessica C.",
      avatar: "/lovable-uploads/b4f117ee-b209-43be-8e30-ecbf1d025c93.png",
      score: 2598,
      badge: "4️⃣",
      isUser: false,
      change: "+5"
    },
    {
      rank: 5,
      name: "Alex P.",
      avatar: "/lovable-uploads/1763ca30-ecb0-409f-8bb0-11b851ea743f.png",
      score: 2543,
      badge: "5️⃣",
      isUser: false,
      change: "+3"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-600" />
          <h3 className="text-lg font-bold text-gray-800">City Leaderboard 🏆</h3>
        </div>
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <TrendingUp className="h-3 w-3 mr-1" />
          Live
        </Badge>
      </div>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="p-5">
          {/* Header Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">🥇</div>
              <div className="text-xs text-gray-600 font-medium">You're #1!</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">156</div>
              <div className="text-xs text-gray-600 font-medium">Points ahead</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">+24</div>
              <div className="text-xs text-gray-600 font-medium">This week</div>
            </div>
          </div>

          {/* Leaderboard List */}
          <div className="space-y-3">
            {leaderboardData.map((artist, index) => (
              <motion.div
                key={artist.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  artist.isUser 
                    ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              >
                <div className="text-lg">{artist.badge}</div>
                
                <img
                  src={artist.avatar}
                  alt={artist.name}
                  className={`w-10 h-10 rounded-full border-2 ${
                    artist.isUser ? 'border-yellow-400' : 'border-gray-200'
                  }`}
                />
                
                <div className="flex-1">
                  <div className={`font-semibold ${
                    artist.isUser ? 'text-yellow-800' : 'text-gray-800'
                  }`}>
                    {artist.name}
                    {artist.isUser && <Crown className="h-4 w-4 inline ml-1 text-yellow-600" />}
                  </div>
                  <div className="text-xs text-gray-600">
                    {artist.score.toLocaleString()} points
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">
                    {artist.change}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-6 text-center">
            <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium">
              <Users className="h-4 w-4 mr-2" />
              Invite Friends to Climb Higher!
            </Button>
            <p className="text-xs text-gray-600 mt-2">
              Get 100 points for each friend who joins! 🚀
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ArtistLiveLeaderboard;
