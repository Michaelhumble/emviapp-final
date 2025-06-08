
import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Users, Gift, Crown } from 'lucide-react';

const ArtistViralShare = () => {
  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Grow Your Empire</h2>
        <p className="text-gray-600 font-inter">Share your profile and earn rewards</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Referral Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-playfair font-bold text-gray-900">Referral Progress</h3>
              <p className="text-sm text-gray-600 font-inter">3 of 5 friends invited</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm font-inter mb-2">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-900">60%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ delay: 0.5, duration: 1 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              />
            </div>
          </div>

          <div className="text-sm text-gray-600 font-inter mb-4">
            Invite 2 more friends to unlock <strong>Pro features</strong> for free!
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-inter font-medium"
          >
            Invite Friends
          </motion.button>
        </motion.div>

        {/* Share Profile */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Share2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-playfair font-bold text-gray-900">Share Your Profile</h3>
              <p className="text-sm text-gray-600 font-inter">Get discovered by new clients</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 mb-4 border border-blue-200">
            <div className="text-sm text-gray-600 font-inter mb-2">Your profile link:</div>
            <div className="text-sm font-mono bg-gray-50 p-2 rounded border text-gray-700 truncate">
              emviapp.com/artist/sarah-johnson
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-inter font-medium text-sm"
            >
              Copy Link
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-gray-50 text-blue-600 py-2 px-4 rounded-lg font-inter font-medium text-sm border border-blue-200"
            >
              Share Now
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Upgrade Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-100 rounded-2xl p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Crown className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-playfair font-bold text-gray-900 mb-1">Upgrade to Pro</h3>
              <p className="text-sm text-gray-600 font-inter">
                Get premium features, priority booking, and advanced analytics
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-inter font-medium"
          >
            Upgrade Now
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ArtistViralShare;
