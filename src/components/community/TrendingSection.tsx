import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Crown, Star, Flame } from 'lucide-react';

export const TrendingSection: React.FC = () => {
  const trendingTopics = [
    { tag: '#NailArt', posts: '2.4k', icon: Star, color: 'text-pink-400' },
    { tag: '#BeautyTips', posts: '1.8k', icon: Crown, color: 'text-purple-400' },
    { tag: '#MakeupTutorial', posts: '3.2k', icon: Flame, color: 'text-orange-400' },
    { tag: '#SkinCare', posts: '1.5k', icon: TrendingUp, color: 'text-blue-400' },
  ];

  const suggestedUsers = [
    { name: 'Sarah Beauty', handle: '@sarahbeauty', followers: '12.5k', verified: true },
    { name: 'Nail Artist Pro', handle: '@nailpro', followers: '8.9k', verified: false },
    { name: 'Makeup Guru', handle: '@makeupguru', followers: '15.2k', verified: true },
  ];

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 space-y-6">
      {/* Trending Topics */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-orange-400" />
          <h3 className="text-white font-semibold">Trending Now</h3>
        </div>
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <motion.div
              key={topic.tag}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-3 bg-gray-800 rounded-xl cursor-pointer hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <topic.icon className={`w-4 h-4 ${topic.color}`} />
                <div>
                  <p className="text-white font-medium text-sm">{topic.tag}</p>
                  <p className="text-gray-400 text-xs">{topic.posts} posts</p>
                </div>
              </div>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium"
              >
                Follow
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Suggested Users */}
      <div>
        <h3 className="text-white font-semibold mb-4">Suggested for You</h3>
        <div className="space-y-3">
          {suggestedUsers.map((user, index) => (
            <motion.div
              key={user.handle}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <p className="text-white font-medium text-sm">{user.name}</p>
                    {user.verified && (
                      <Crown className="w-3 h-3 text-blue-400" />
                    )}
                  </div>
                  <p className="text-gray-400 text-xs">{user.handle}</p>
                  <p className="text-gray-500 text-xs">{user.followers} followers</p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="bg-white text-black px-4 py-1 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors"
              >
                Follow
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};