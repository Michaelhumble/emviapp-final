
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Target, Users, MapPin, Zap } from 'lucide-react';

const leaderboardData = [
  { rank: 1, name: "Sarah K.", score: 2847, city: "Los Angeles", badge: "👑" },
  { rank: 2, name: "Maria L.", score: 2693, city: "Los Angeles", badge: "🥈" },
  { rank: 3, name: "You", score: 2531, city: "Los Angeles", badge: "🥉", isUser: true },
  { rank: 4, name: "Jessica M.", score: 2489, city: "Los Angeles", badge: "⭐" },
  { rank: 5, name: "Amy R.", score: 2376, city: "Los Angeles", badge: "💎" },
];

const ArtistLiveLeaderboard = () => {
  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500"
            >
              <Trophy className="h-5 w-5 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-lg font-bold">LA Beauty Leaderboard 🏆</CardTitle>
              <p className="text-sm text-gray-600">You're #3 in Los Angeles! Keep climbing!</p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress to Next Rank */}
        <div className="p-4 bg-white/80 rounded-xl border border-emerald-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Next Rank Progress</span>
            <span className="text-sm text-emerald-600 font-semibold">162 points to #2!</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full w-3/4"></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">💡 Invite 3 more artists to reach #2</p>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-2">
          {leaderboardData.map((artist, index) => (
            <motion.div
              key={artist.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                artist.isUser 
                  ? 'bg-gradient-to-r from-emerald-100 to-teal-100 border-2 border-emerald-300' 
                  : 'bg-white/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{artist.badge}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${artist.isUser ? 'text-emerald-700' : 'text-gray-900'}`}>
                      {artist.name}
                    </span>
                    {artist.isUser && <Zap className="h-4 w-4 text-yellow-500" />}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="h-3 w-3" />
                    <span>{artist.city}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-emerald-600">{artist.score.toLocaleString()}</span>
                <p className="text-xs text-gray-500">points</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
            <Users className="h-4 w-4 mr-2" />
            Invite Artists
          </Button>
          <Button variant="outline" className="border-emerald-300 text-emerald-600 hover:bg-emerald-50">
            <Target className="h-4 w-4 mr-2" />
            View Full Board
          </Button>
        </div>

        {/* Weekly Challenge */}
        <div className="text-center p-3 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg">
          <p className="text-sm font-semibold text-emerald-700 mb-1">
            🎯 Weekly Challenge: Invite 5 Artists
          </p>
          <p className="text-xs text-gray-600">
            Winner gets $100 bonus + Premium badge!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistLiveLeaderboard;
