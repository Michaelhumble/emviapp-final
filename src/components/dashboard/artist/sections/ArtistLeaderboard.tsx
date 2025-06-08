
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Star, TrendingUp } from 'lucide-react';

const ArtistLeaderboard = () => {
  const leaderboard = [
    { rank: 1, name: "You", points: 2847, trend: "up", badge: "crown", location: "Los Angeles" },
    { rank: 2, name: "Jessica M.", points: 2756, trend: "same", badge: "fire", location: "Los Angeles" },
    { rank: 3, name: "Maria S.", points: 2634, trend: "down", badge: "star", location: "Los Angeles" },
    { rank: 4, name: "Sarah K.", points: 2598, trend: "up", badge: null, location: "Los Angeles" },
    { rank: 5, name: "Emily R.", points: 2543, trend: "up", badge: null, location: "Los Angeles" }
  ];

  const getBadgeIcon = (badge: string | null) => {
    switch (badge) {
      case 'crown': return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'fire': return <Star className="h-4 w-4 text-orange-500" />;
      case 'star': return <Trophy className="h-4 w-4 text-purple-500" />;
      default: return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '→';
    }
  };

  return (
    <div className="lg:block hidden mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">City Leaderboard</h2>
        <p className="text-gray-600 font-inter">Top artists in Los Angeles</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="space-y-0">
          {leaderboard.map((artist, index) => (
            <motion.div
              key={artist.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`p-4 border-b border-gray-50 last:border-b-0 transition-all duration-300 ${
                artist.rank === 1 
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-100' 
                  : 'hover:bg-gray-50/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm font-inter ${
                      artist.rank === 1 
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {artist.rank}
                  </motion.div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`font-inter font-semibold ${artist.rank === 1 ? 'text-yellow-800' : 'text-gray-900'}`}>
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
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-bold text-gray-900 font-inter">{artist.points.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 font-inter">points</div>
                  </div>
                  <div className="text-lg">
                    {getTrendIcon(artist.trend)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="font-playfair font-bold text-gray-900 mb-1">🔥 Climb to #1!</div>
            <div className="text-sm text-gray-600 font-inter">Invite 2 friends to gain 200 points</div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg font-inter font-medium"
          >
            Invite Now
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ArtistLeaderboard;
