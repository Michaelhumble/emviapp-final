
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Star, TrendingUp } from 'lucide-react';
import LeaderboardModal from '../modals/LeaderboardModal';

const ArtistLeaderboard = () => {
  const [showModal, setShowModal] = useState(false);

  const topArtists = [
    { rank: 1, name: "Minh Thư", points: 2847, trend: "+127" },
    { rank: 2, name: "Lan Anh", points: 2634, trend: "+89" },
    { rank: 3, name: "You", points: 2240, trend: "+156" }
  ];

  const handleViewDetails = () => {
    setShowModal(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Bảng Xếp Hạng 🏆
          </h2>
          <p className="text-gray-600 font-inter">Top artists in your city</p>
        </div>

        <div className="space-y-4 mb-6">
          {topArtists.map((artist) => (
            <motion.div
              key={artist.rank}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: artist.rank * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-2xl ${
                artist.name === "You" 
                  ? "bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200" 
                  : "bg-gray-50"
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                artist.rank === 1 ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white" :
                artist.rank === 2 ? "bg-gradient-to-r from-gray-300 to-gray-400 text-white" :
                artist.rank === 3 ? "bg-gradient-to-r from-orange-400 to-orange-500 text-white" :
                "bg-blue-100 text-blue-600"
              }`}>
                {artist.rank === 1 ? <Crown className="h-5 w-5" /> : artist.rank}
              </div>
              
              <div className="flex-1">
                <div className="font-medium text-gray-900">{artist.name}</div>
                <div className="text-sm text-gray-600 flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {artist.points} points
                </div>
              </div>
              
              <div className="flex items-center gap-1 text-emerald-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">{artist.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleViewDetails}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white py-3 rounded-2xl font-inter font-medium shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Xem Chi Tiết
        </motion.button>

        {/* Your Position */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">#3</div>
            <div className="text-sm text-gray-600">Your Position</div>
            <div className="text-xs text-purple-600 mt-1">
              🔥 Only 394 points to reach #2!
            </div>
          </div>
        </div>
      </motion.div>

      <LeaderboardModal 
        open={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
};

export default ArtistLeaderboard;
