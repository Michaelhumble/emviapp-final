
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, Share, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LiveCommunityFeed = () => {
  const feedItems = [
    {
      id: 1,
      type: "question",
      author: "Ashley Park",
      role: "Nail Artist",
      timeAgo: "2 minutes ago",
      content: "Has anyone tried the new gel system from OPI? Looking for honest reviews before investing $300+",
      engagement: { likes: 12, replies: 8, shares: 2 },
      verified: true
    },
    {
      id: 2,
      type: "achievement",
      author: "Carmen Silva",
      role: "Salon Owner",
      timeAgo: "15 minutes ago",
      content: "Just hit $50K revenue this month! Thank you to everyone who helped me with pricing strategies. From barely breaking even to this - community support changes everything! 🙌",
      engagement: { likes: 89, replies: 24, shares: 15 },
      verified: true
    },
    {
      id: 3,
      type: "tip",
      author: "Maya Johnson",
      role: "Hair Colorist",
      timeAgo: "1 hour ago",
      content: "Pro tip: Always do a strand test 48 hours before any chemical service. Saved me from a lawsuit this week when client had unexpected sensitivity.",
      engagement: { likes: 156, replies: 31, shares: 47 },
      verified: true
    },
    {
      id: 4,
      type: "celebration",
      author: "Lisa Chen",
      role: "Esthetician",
      timeAgo: "3 hours ago",
      content: "6 months ago I was working at a chain spa making $12/hour. Today I opened my own practice! Dreams do come true with the right support system.",
      engagement: { likes: 234, replies: 67, shares: 28 },
      verified: true
    }
  ];

  const getTypeColor = (type: string) => {
    switch(type) {
      case "question": return "bg-blue-100 text-blue-700";
      case "achievement": return "bg-green-100 text-green-700";
      case "tip": return "bg-purple-100 text-purple-700";
      case "celebration": return "bg-pink-100 text-pink-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case "question": return "Question";
      case "achievement": return "Achievement";
      case "tip": return "Pro Tip";
      case "celebration": return "Celebration";
      default: return "Post";
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-['Playfair_Display']">
              Live Community Feed
            </h2>
            <p className="text-xl text-gray-600 font-['Inter']">
              Real conversations happening right now in our community
            </p>
          </div>

          <div className="space-y-6">
            {feedItems.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {item.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-bold text-gray-900 font-['Inter']">{item.author}</h3>
                            {item.verified && (
                              <Award className="h-4 w-4 text-blue-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500 font-['Inter']">{item.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                          {getTypeLabel(item.type)}
                        </span>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Clock className="h-3 w-3 mr-1" />
                          {item.timeAgo}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed font-['Inter']">
                      {item.content}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors group">
                          <Heart className="h-4 w-4 group-hover:fill-current" />
                          <span className="text-sm font-medium">{item.engagement.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                          <MessageSquare className="h-4 w-4" />
                          <span className="text-sm font-medium">{item.engagement.replies}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                          <Share className="h-4 w-4" />
                          <span className="text-sm font-medium">{item.engagement.shares}</span>
                        </button>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Start a Conversation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveCommunityFeed;
