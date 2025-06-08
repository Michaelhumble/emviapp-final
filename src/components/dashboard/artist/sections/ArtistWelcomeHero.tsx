
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, TrendingUp, Calendar } from 'lucide-react';

const ArtistWelcomeHero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm mb-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Welcome Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100"
            >
              <Crown className="h-6 w-6 text-yellow-600" />
            </motion.div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-playfair font-bold text-gray-900">
                Good morning, Sarah! 👋
              </h1>
              <p className="text-gray-600 font-inter">You're building something beautiful</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-2 rounded-lg border border-blue-100"
            >
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-inter font-medium text-blue-800">Pro Artist</span>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-2 rounded-lg border border-emerald-100"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-inter font-medium text-emerald-800">Top 5% in LA</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Streak Counter */}
        <div className="lg:text-right">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100"
          >
            <div className="text-center lg:text-right">
              <div className="text-3xl lg:text-4xl font-playfair font-bold text-gray-900 mb-1">
                12
              </div>
              <div className="text-sm font-inter text-gray-600 mb-2">Day Streak</div>
              <div className="flex justify-center lg:justify-end gap-1">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < 5 ? 'bg-purple-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Calendar className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-inter font-medium text-gray-700">Add Slot</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <TrendingUp className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-inter font-medium text-gray-700">Share Profile</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Star className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-inter font-medium text-gray-700">Portfolio</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Crown className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-inter font-medium text-gray-700">Upgrade</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistWelcomeHero;
