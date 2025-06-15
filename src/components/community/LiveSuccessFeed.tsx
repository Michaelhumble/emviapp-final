
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Sparkles, TrendingUp, Award } from 'lucide-react';

const LiveSuccessFeed = () => {
  const posts = [
    {
      id: 1,
      author: {
        name: "Jessica Williams",
        role: "Brow Artist",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b69c3ad8?q=80&w=150&auto=format&fit=crop",
        verified: true
      },
      content: "Just hit $10K this month! 🎉 A year ago I was doing brows in my kitchen. To everyone starting out - your dreams ARE possible! EmviApp family, thank you for believing in me! 💕",
      image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1926&auto=format&fit=crop",
      likes: 1247,
      comments: 89,
      shares: 34,
      timeAgo: "2 hours ago",
      trending: true
    },
    {
      id: 2,
      author: {
        name: "Marcus Thompson",
        role: "Barber",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
        verified: true
      },
      content: "My client transformation went VIRAL on TikTok! 2.3M views and counting 🔥 Sometimes one cut changes everything. Shoutout to my EmviApp mentors who pushed me to post it!",
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1926&auto=format&fit=crop",
      likes: 892,
      comments: 156,
      shares: 67,
      timeAgo: "5 hours ago",
      trending: true
    },
    {
      id: 3,
      author: {
        name: "Priya Patel",
        role: "Esthetician",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
        verified: false
      },
      content: "6 months ago I was too scared to charge more than $40 for facials. Today I booked my first $200 signature treatment! Confidence is everything 💪✨",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1926&auto=format&fit=crop",
      likes: 634,
      comments: 78,
      shares: 23,
      timeAgo: "8 hours ago",
      trending: false
    },
    {
      id: 4,
      author: {
        name: "Taylor Kim",
        role: "Hair Stylist",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
        verified: true
      },
      content: "From salon employee to opening my own space! The key? This community taught me business isn't just about talent - it's about believing you deserve success 🏆",
      image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1926&auto=format&fit=crop",
      likes: 1456,
      comments: 203,
      shares: 89,
      timeAgo: "12 hours ago",
      trending: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium text-sm">LIVE SUCCESS FEED</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Real Stories,
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {" "}Real Impact
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what's happening right now in our community. Every celebration, every breakthrough, every moment of growth.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Post Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                        {post.author.verified && (
                          <Award className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{post.author.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    {post.trending && (
                      <div className="flex items-center gap-1 bg-red-100 text-red-600 px-2 py-1 rounded-full">
                        <TrendingUp className="h-3 w-3" />
                        <span className="text-xs font-medium">Trending</span>
                      </div>
                    )}
                    <span>{post.timeAgo}</span>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-6 pb-4">
                <p className="text-gray-800 leading-relaxed mb-4">{post.content}</p>
                
                {post.image && (
                  <div className="rounded-xl overflow-hidden">
                    <img 
                      src={post.image} 
                      alt="Post content"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Engagement */}
              <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                    <Heart className="h-5 w-5" />
                    <span className="font-medium">{post.likes.toLocaleString()}</span>
                  </button>
                  
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">{post.comments}</span>
                  </button>
                  
                  <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
                    <Share2 className="h-5 w-5" />
                    <span className="font-medium">{post.shares}</span>
                  </button>
                </div>

                <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                  View Thread
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Sparkles className="mr-2 h-5 w-5 inline" />
            Load More Stories
          </button>
        </div>
      </div>
    </section>
  );
};

export default LiveSuccessFeed;
