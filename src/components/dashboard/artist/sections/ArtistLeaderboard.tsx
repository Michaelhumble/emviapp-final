
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Users, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/auth';

const ArtistLeaderboard = () => {
  const { userProfile } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const topArtists = [
    { rank: 1, name: "Top Artist", points: 2847, bookings: 156, isCurrentUser: false },
    { rank: 2, name: "Elite Pro", points: 2634, bookings: 142, isCurrentUser: false },
    { rank: 3, name: "You", points: 2240, bookings: 127, isCurrentUser: true },
    { rank: 4, name: "Rising Star", points: 2156, bookings: 118, isCurrentUser: false },
    { rank: 5, name: "Master Artist", points: 1998, bookings: 103, isCurrentUser: false }
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
            Artist Leaderboard
          </h2>
          <p className="text-gray-600 font-inter">See how you rank among top artists</p>
        </div>

        <div className="space-y-3 mb-6">
          {topArtists.slice(0, 5).map((artist) => (
            <motion.div
              key={artist.rank}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: artist.rank * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                artist.isCurrentUser 
                  ? "bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200" 
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                artist.rank === 1 ? "bg-yellow-100 text-yellow-600" :
                artist.rank === 2 ? "bg-gray-100 text-gray-600" :
                artist.rank === 3 ? "bg-orange-100 text-orange-600" :
                "bg-blue-100 text-blue-600"
              }`}>
                {artist.rank}
              </div>
              
              <div className="flex-1">
                <div className={`font-medium ${artist.isCurrentUser ? 'text-purple-900' : 'text-gray-900'}`}>
                  {artist.name}
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {artist.points} points
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {artist.bookings} bookings
                  </span>
                </div>
              </div>
              
              {artist.isCurrentUser && (
                <div className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                  You
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Your Stats */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-4 border border-purple-100 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">#3</div>
            <div className="text-sm text-gray-600">Your Current Rank</div>
            <div className="text-xs text-purple-600 mt-1">+2 spots this month!</div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleViewDetails}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white py-3 rounded-2xl font-inter font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          View Details
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </motion.div>

      {/* Leaderboard Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Full Artist Leaderboard
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              {topArtists.map((artist) => (
                <div key={artist.rank} className={`flex items-center gap-4 p-4 rounded-xl ${
                  artist.isCurrentUser ? "bg-purple-50 border-2 border-purple-200" : "bg-gray-50"
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    artist.rank === 1 ? "bg-yellow-100 text-yellow-600" :
                    artist.rank === 2 ? "bg-gray-100 text-gray-600" :
                    artist.rank === 3 ? "bg-orange-100 text-orange-600" :
                    "bg-blue-100 text-blue-600"
                  }`}>
                    {artist.rank}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{artist.name}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      {artist.points} points
                      <Users className="h-3 w-3 ml-2" />
                      {artist.bookings} bookings
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ArtistLeaderboard;
