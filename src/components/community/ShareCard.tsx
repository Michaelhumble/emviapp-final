import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Crown } from 'lucide-react';

interface ShareCardProps {
  post: {
    user: {
      name: string;
      avatar: string;
      location: string;
    };
    content: string;
    type: string;
    image?: string;
  };
  onDownload?: () => void;
}

const ShareCard = ({ post, onDownload }: ShareCardProps) => {
  const getTypeEmoji = (type: string) => {
    switch (type) {
      case 'celebration': return '🎉';
      case 'milestone': return '💎';
      case 'journey': return '🚀';
      default: return '✨';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'celebration': return 'from-green-400 to-blue-500';
      case 'milestone': return 'from-purple-400 to-pink-500';
      case 'journey': return 'from-orange-400 to-red-500';
      default: return 'from-primary to-primary/80';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-[400px] h-[600px] bg-gradient-to-br from-background via-background/95 to-primary/10 border border-border rounded-3xl overflow-hidden shadow-2xl"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-2xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="text-center">
          <motion.div
            className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${getTypeColor(post.type)} rounded-full text-white font-bold text-sm mb-6`}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="mr-2 text-lg">{getTypeEmoji(post.type)}</span>
            {post.type === 'celebration' ? 'WIN' : 
             post.type === 'milestone' ? 'MILESTONE' : 
             post.type === 'journey' ? 'JOURNEY' : 'SUCCESS'}
          </motion.div>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <img 
              src={post.user.avatar} 
              alt={post.user.name}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-primary/20"
            />
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Crown className="w-6 h-6 text-yellow-500" />
            </motion.div>
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground">{post.user.name}</h3>
            <p className="text-muted-foreground text-sm">{post.user.location}</p>
          </div>
        </div>

        {/* Post Content */}
        <div className="flex-1 flex items-center justify-center">
          <blockquote className="text-center">
            <p className="text-lg leading-relaxed text-foreground font-medium italic">
              "{post.content.length > 120 ? post.content.substring(0, 120) + '...' : post.content}"
            </p>
          </blockquote>
        </div>

        {/* EmviApp Branding */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary via-primary/90 to-accent px-6 py-3 rounded-full">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white font-bold text-sm">Made with EmviApp</span>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Join the beauty community</p>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-16 right-8 w-3 h-3 bg-yellow-400/60 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6] 
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-24 left-8 w-2 h-2 bg-pink-400/60 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4] 
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </div>
    </motion.div>
  );
};

export default ShareCard;