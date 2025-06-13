
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, TrendingUp, Crown, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PremiumFeedCardProps {
  post: {
    id: string;
    author: {
      name: string;
      avatar: string;
      level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
      verified: boolean;
    };
    content: string;
    image?: string;
    likes: number;
    comments: number;
    shares: number;
    isTrending?: boolean;
    timeAgo: string;
  };
}

const PremiumFeedCard = ({ post }: PremiumFeedCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const levelColors = {
    Bronze: 'from-orange-400 to-orange-600',
    Silver: 'from-gray-400 to-gray-600',
    Gold: 'from-yellow-400 to-yellow-600',
    Platinum: 'from-purple-400 to-purple-600',
    Diamond: 'from-blue-400 to-cyan-400'
  };

  const levelIcons = {
    Bronze: '🥉',
    Silver: '🥈', 
    Gold: '🥇',
    Platinum: '💎',
    Diamond: '⭐'
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
      transition={{ duration: 0.3 }}
      className="relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-6"
    >
      {/* Trending Badge */}
      {post.isTrending && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
            <TrendingUp className="h-3 w-3 mr-1" />
            Trending Now 🔥
          </Badge>
        </div>
      )}

      <div className="p-6">
        {/* Author Section - No headshot, just icon */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${levelColors[post.author.level]} flex items-center justify-center text-2xl shadow-lg`}>
              {levelIcons[post.author.level]}
            </div>
            {post.author.verified && (
              <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
              <Badge variant="outline" className={`text-xs bg-gradient-to-r ${levelColors[post.author.level]} text-white border-0`}>
                {post.author.level}
              </Badge>
            </div>
            <p className="text-sm text-gray-500">{post.timeAgo}</p>
          </div>
        </div>

        {/* Content */}
        <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>

        {/* Image */}
        {post.image && (
          <div className="mb-4 rounded-2xl overflow-hidden">
            <img 
              src={post.image} 
              alt="Post content"
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* Engagement Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={`flex items-center gap-2 transition-colors ${isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="font-medium">{likeCount}</span>
            </motion.button>
            
            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">{post.comments}</span>
            </button>
            
            <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
              <Share2 className="h-5 w-5" />
              <span className="font-medium">{post.shares}</span>
            </button>
          </div>

          {post.isTrending && (
            <div className="flex items-center gap-1 text-orange-500">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Hot Post</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumFeedCard;
