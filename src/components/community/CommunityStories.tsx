
import React from 'react';
import { motion } from 'framer-motion';
import CommunityPostingRestriction from './CommunityPostingRestriction';
import CommunityStoryForm from './CommunityStoryForm';

const CommunityStories = () => {
  const stories = [
    {
      id: 1,
      author: "Maria K.",
      avatar: "🌟",
      time: "2h ago",
      story: "Just completed my first bridal makeup for a Vietnamese wedding! The traditional red and gold theme was absolutely stunning. Learned so much about cultural beauty traditions today! ✨",
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      author: "Alex Chen",
      avatar: "💅",
      time: "4h ago", 
      story: "Finally mastered the perfect ombré technique after months of practice! My client was over the moon with her sunset nails. Persistence really pays off in this industry! 🌅",
      likes: 31,
      comments: 12
    },
    {
      id: 3,
      author: "Sofia R.",
      avatar: "✨",
      time: "6h ago",
      story: "Had an emotional moment today - helped a cancer survivor feel beautiful again with a custom wig styling. This is why I love what we do. Beauty heals. 💕",
      likes: 67,
      comments: 23
    }
  ];

  return (
    <div className="bg-gradient-to-b from-purple-50 to-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Community Stories
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Share your beauty journey and connect with fellow professionals through inspiring stories
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Community Guidelines */}
          <CommunityPostingRestriction />
          
          {/* Story Form */}
          <CommunityStoryForm />

          {/* Stories Feed */}
          <div className="space-y-6">
            {stories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-lg">
                    {story.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{story.author}</h4>
                    <p className="text-sm text-gray-500">{story.time}</p>
                  </div>
                </div>
                
                <p className="text-gray-800 mb-4 leading-relaxed">{story.story}</p>
                
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                    ❤️ {story.likes}
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                    💬 {story.comments}
                  </button>
                  <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                    🔗 Share
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityStories;
