
import React from "react";
import { motion } from "framer-motion";
import { Heart, ThumbsUp, Star, MessageHeart } from "lucide-react";

const CommunityWallOfThanks = () => {
  const thanksPosts = [
    {
      id: 1,
      author: "Maria G.",
      avatar: "💄",
      message: "Thank you @SophiaC for the amazing color correction tips! My client was over the moon! 💕",
      recipient: "SophiaC",
      reactions: { hearts: 23, thumbs: 45, stars: 12 },
      timeAgo: "2h"
    },
    {
      id: 2,
      author: "James T.",
      avatar: "✂️",
      message: "@IsabellaM your business mindset workshop changed everything for me. Booked solid this month! 🚀",
      recipient: "IsabellaM",
      reactions: { hearts: 67, thumbs: 89, stars: 34 },
      timeAgo: "5h"
    },
    {
      id: 3,
      author: "Priya P.",
      avatar: "💅",
      message: "Huge shoutout to @DavidK for helping me negotiate my first $500 nail set! You're a legend! ⭐",
      recipient: "DavidK",
      reactions: { hearts: 41, thumbs: 76, stars: 28 },
      timeAgo: "1d"
    },
    {
      id: 4,
      author: "Elena V.",
      avatar: "👁️",
      message: "@MarcusR your lash extension technique tutorial was PERFECT! My retention rate doubled! 🙌",
      recipient: "MarcusR",
      reactions: { hearts: 38, thumbs: 52, stars: 19 },
      timeAgo: "1d"
    },
    {
      id: 5,
      author: "Carlos M.",
      avatar: "💇‍♂️",
      message: "Community, you all are amazing! Every question I ask gets answered with so much love ❤️",
      recipient: "Everyone",
      reactions: { hearts: 92, thumbs: 156, stars: 67 },
      timeAgo: "2d"
    },
    {
      id: 6,
      author: "Amy L.",
      avatar: "🌟",
      message: "@EmviTeam thank you for creating this space where we can all grow together! 🌱",
      recipient: "EmviTeam",
      reactions: { hearts: 78, thumbs: 134, stars: 45 },
      timeAgo: "3d"
    }
  ];

  const sunshinesPicks = [
    {
      title: "\"From scared beginner to confident artist\"",
      author: "Jessica M.",
      excerpt: "6 months ago, I was terrified to do anything beyond basic manicures...",
      category: "Growth Story",
      reactions: 234
    },
    {
      title: "\"How this community saved my salon\"",
      author: "Robert K.",
      excerpt: "When COVID hit, I thought it was over. But the support here...",
      category: "Business Recovery",
      reactions: 189
    },
    {
      title: "\"The day I finally believed in myself\"",
      author: "Nina S.",
      excerpt: "It was a simple comment from @IsabellaM that changed everything...",
      category: "Inspiration",
      reactions: 167
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-pink-500" />
            <span className="text-lg font-semibold text-purple-700 bg-purple-100 px-4 py-1 rounded-full">
              Feel-Good Zone
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
            Community Wall of Thanks
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Where gratitude flows and connections grow—see how we lift each other up every day
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Wall of Thanks */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MessageHeart className="h-6 w-6 text-pink-500" />
              Latest Shout-Outs
            </h3>
            
            <div className="space-y-4">
              {thanksPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-xl">
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-gray-900">{post.author}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-500">{post.timeAgo}</span>
                      </div>
                      <p className="text-gray-900 mb-4 leading-relaxed">{post.message}</p>
                      
                      {/* Reactions */}
                      <div className="flex items-center gap-6">
                        <button className="flex items-center gap-1 text-pink-600 hover:text-pink-700 transition-colors">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm font-medium">{post.reactions.hearts}</span>
                        </button>
                        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors">
                          <ThumbsUp className="h-4 w-4" />
                          <span className="text-sm font-medium">{post.reactions.thumbs}</span>
                        </button>
                        <button className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700 transition-colors">
                          <Star className="h-4 w-4" />
                          <span className="text-sm font-medium">{post.reactions.stars}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sunshine's Picks */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6 border border-yellow-200 mb-8"
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">☀️</div>
                <h3 className="text-xl font-bold text-gray-900">Sunshine's Picks</h3>
                <p className="text-sm text-gray-600">AI-curated best posts of the week</p>
              </div>

              <div className="space-y-4">
                {sunshinesPicks.map((pick, index) => (
                  <motion.div
                    key={pick.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-4 hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-semibold">
                        {pick.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Heart className="h-3 w-3" />
                        {pick.reactions}
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{pick.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">By {pick.author}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">{pick.excerpt}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Inspired by Sunshine Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl mb-2">☀️</div>
                <h4 className="font-bold text-gray-900 mb-2">Inspired by Sunshine</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Where beauty meets purpose, and every voice matters
                </p>
                <div className="text-xs text-gray-400">
                  Proudly part of the EmviApp family
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityWallOfThanks;
