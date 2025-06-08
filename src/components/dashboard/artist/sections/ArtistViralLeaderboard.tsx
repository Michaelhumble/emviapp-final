
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Zap, Users, Share2 } from 'lucide-react';

const ArtistViralLeaderboard = () => {
  const leaderboard = [
    { rank: 1, name: "You", points: 2847, trend: "up", badge: "crown", city: "Los Angeles" },
    { rank: 2, name: "Jessica M.", points: 2756, trend: "same", badge: "fire", city: "Los Angeles" },
    { rank: 3, name: "Maria S.", points: 2634, trend: "down", badge: "star", city: "Los Angeles" },
    { rank: 4, name: "Sarah K.", points: 2598, trend: "up", badge: null, city: "Los Angeles" },
    { rank: 5, name: "Emily R.", points: 2543, trend: "up", badge: null, city: "Los Angeles" }
  ];

  const getBadgeIcon = (badge: string | null) => {
    switch (badge) {
      case 'crown': return <Crown className="h-4 w-4 text-yellow-400" />;
      case 'fire': return <Zap className="h-4 w-4 text-orange-400" />;
      case 'star': return <Trophy className="h-4 w-4 text-purple-400" />;
      default: return null;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30"
          >
            <Trophy className="h-6 w-6 text-yellow-400" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-white">City Leaderboard</h2>
            <p className="text-sm text-gray-400">Top artists in Los Angeles</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {leaderboard.map((artist, index) => (
          <motion.div
            key={artist.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`p-4 rounded-xl border transition-all duration-300 ${
              artist.rank === 1 
                ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30 shadow-lg' 
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    artist.rank === 1 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white' 
                      : 'bg-white/10 text-white'
                  }`}
                >
                  {artist.rank}
                </motion.div>
                
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${artist.rank === 1 ? 'text-yellow-300' : 'text-white'}`}>
                    {artist.name}
                  </span>
                  {artist.badge && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {getBadgeIcon(artist.badge)}
                    </motion.div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-bold text-white">{artist.points.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">points</div>
                </div>
                <motion.div
                  animate={{ y: artist.trend === 'up' ? [-2, 0] : artist.trend === 'down' ? [2, 0] : [0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                  className={`text-xs font-medium ${getTrendColor(artist.trend)}`}
                >
                  {artist.trend === 'up' ? '↗️' : artist.trend === 'down' ? '↘️' : '→'}
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FOMO Action Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-semibold">🔥 Climb to #1!</div>
            <div className="text-sm text-purple-200">Invite 2 friends to gain 200 points</div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg"
          >
            <Share2 className="h-4 w-4" />
            <span>Invite</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ArtistViralLeaderboard;
