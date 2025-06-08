
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, TrendingUp } from 'lucide-react';
import LeaderboardModal from '../modals/LeaderboardModal';

const ArtistLeaderboard = () => {
  const [showModal, setShowModal] = useState(false);

  const topArtists = [
    { rank: 1, name: "You", points: 2847, icon: Crown, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
    { rank: 2, name: "Elite Professional", points: 2634, icon: Medal, color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-200" },
    { rank: 3, name: "Master Artist", points: 2240, icon: Trophy, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" }
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-playfair font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-amber-600" />
            City Leaderboard
          </h2>
          <p className="text-slate-600 font-inter">See how you rank among top artists</p>
        </div>

        <div className="space-y-3 mb-6">
          {topArtists.map((artist, index) => (
            <motion.div
              key={artist.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-xl ${artist.bg} border ${artist.border} ${
                artist.name === "You" ? "ring-2 ring-amber-200" : ""
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                artist.rank === 1 ? "bg-amber-100 text-amber-600" :
                artist.rank === 2 ? "bg-slate-100 text-slate-600" :
                "bg-orange-100 text-orange-600"
              }`}>
                {artist.rank}
              </div>
              <artist.icon className={`h-5 w-5 ${artist.color}`} />
              <div className="flex-1">
                <div className="font-medium text-slate-900">{artist.name}</div>
                <div className="text-sm text-slate-600 flex items-center gap-2">
                  <TrendingUp className="h-3 w-3" />
                  {artist.points.toLocaleString()} points
                </div>
              </div>
              {artist.name === "You" && (
                <div className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">
                  #1 Position!
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600 mb-1">+156</div>
            <div className="text-sm text-slate-600 mb-1">Points this week</div>
            <div className="text-xs text-slate-500">Keep it up to maintain your lead!</div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white py-3 rounded-xl font-inter font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Trophy className="h-4 w-4" />
          View Details
        </motion.button>
      </motion.div>

      <LeaderboardModal 
        open={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
};

export default ArtistLeaderboard;
