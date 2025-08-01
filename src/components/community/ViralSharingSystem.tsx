import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Share2, ExternalLink, Copy, CheckCircle, TrendingUp, Users, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface ViralSharingSystemProps {
  post: any;
  onShare: (platform: string) => void;
  className?: string;
}

const ViralSharingSystem: React.FC<ViralSharingSystemProps> = ({
  post,
  onShare,
  className = ''
}) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareAnimation, setShareAnimation] = useState(false);

  const platforms = [
    {
      name: 'Facebook',
      icon: '📘',
      color: 'bg-blue-600',
      url: `https://facebook.com/sharer/sharer.php?u=`,
      description: 'Share with friends'
    },
    {
      name: 'Twitter',
      icon: '🐦',
      color: 'bg-black',
      url: `https://twitter.com/intent/tweet?url=`,
      description: 'Tweet to followers'
    },
    {
      name: 'Instagram',
      icon: '📷',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      url: null, // Instagram requires different handling
      description: 'Story or post'
    },
    {
      name: 'TikTok',
      icon: '🎵',
      color: 'bg-black',
      url: null, // TikTok requires different handling
      description: 'Create video'
    },
    {
      name: 'Pinterest',
      icon: '📌',
      color: 'bg-red-500',
      url: `https://pinterest.com/pin/create/button/?url=`,
      description: 'Pin to board'
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      color: 'bg-green-500',
      url: `https://wa.me/?text=`,
      description: 'Send to contacts'
    }
  ];

  const generateShareUrl = () => {
    const baseUrl = 'https://emvi.app';
    return `${baseUrl}/community/post/${post.id}`;
  };

  const generateShareContent = (platform: string) => {
    const url = generateShareUrl();
    const title = `Check out this amazing ${post.category} post on EmviApp!`;
    const content = post.content.length > 100 ? 
      post.content.substring(0, 100) + '...' : post.content;
    
    return {
      url,
      title,
      content: `${title}\n\n"${content}"\n\n${url}\n\n#BeautyApp #EmviApp #${post.category}`
    };
  };

  const handlePlatformShare = async (platform: any) => {
    const shareData = generateShareContent(platform.name);
    
    setShareAnimation(true);
    setTimeout(() => setShareAnimation(false), 1000);

    if (platform.url) {
      const shareUrl = platform.name === 'Pinterest' 
        ? `${platform.url}${encodeURIComponent(shareData.url)}&description=${encodeURIComponent(shareData.content)}`
        : `${platform.url}${encodeURIComponent(shareData.content)}`;
      
      window.open(shareUrl, '_blank', 'width=600,height=400');
    } else {
      // Handle special cases for Instagram/TikTok
      if (platform.name === 'Instagram') {
        // Copy content for Instagram
        navigator.clipboard.writeText(shareData.content);
        toast.success('Content copied! Paste in Instagram');
      } else if (platform.name === 'TikTok') {
        navigator.clipboard.writeText(shareData.content);
        toast.success('Content copied! Create TikTok video');
      }
    }

    onShare(platform.name);
    setShowShareMenu(false);
    
    // Track viral metrics
    trackViralMetrics(platform.name);
  };

  const handleCopyLink = async () => {
    const shareData = generateShareContent('Copy');
    
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const trackViralMetrics = (platform: string) => {
    // In a real app, this would send analytics data
    console.log(`Shared to ${platform}:`, {
      postId: post.id,
      platform,
      timestamp: new Date().toISOString(),
      userId: 'current-user-id'
    });
  };

  const getViralScore = () => {
    const totalShares = post.shares_count || 0;
    const totalLikes = post.likes_count || 0;
    const totalComments = post.comments_count || 0;
    
    return Math.min(Math.round((totalShares * 3 + totalLikes + totalComments) / 10), 100);
  };

  const getViralBadge = () => {
    const score = getViralScore();
    if (score >= 80) return { label: 'VIRAL', color: 'bg-red-500 text-white' };
    if (score >= 60) return { label: 'TRENDING', color: 'bg-orange-500 text-white' };
    if (score >= 40) return { label: 'POPULAR', color: 'bg-purple-500 text-white' };
    if (score >= 20) return { label: 'RISING', color: 'bg-blue-500 text-white' };
    return { label: 'NEW', color: 'bg-gray-500 text-white' };
  };

  const viralBadge = getViralBadge();

  return (
    <div className={`relative ${className}`}>
      {/* Share Button */}
      <motion.div
        animate={shareAnimation ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="gap-2 text-gray-600 hover:text-green-500 transition-colors relative"
        >
          <Share2 className="h-5 w-5" />
          <span className="text-sm font-medium">
            {post.shares_count || 0}
          </span>
          
          {/* Viral Badge */}
          {getViralScore() >= 40 && (
            <Badge className={`ml-1 text-xs ${viralBadge.color} animate-pulse`}>
              {viralBadge.label}
            </Badge>
          )}
        </Button>
      </motion.div>

      {/* Share Menu */}
      <AnimatePresence>
        {showShareMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-0 mb-2 z-50"
          >
            <Card className="bg-white/95 backdrop-blur-lg border-0 shadow-2xl min-w-[280px]">
              <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Share this post</h4>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${viralBadge.color}`}>
                      {viralBadge.label}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      Viral Score: {getViralScore()}%
                    </span>
                  </div>
                </div>

                {/* Platform Grid */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {platforms.map((platform, index) => (
                    <motion.button
                      key={platform.name}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePlatformShare(platform)}
                      className="p-3 rounded-lg border hover:bg-gray-50 transition-colors text-center"
                    >
                      <div className="text-2xl mb-1">{platform.icon}</div>
                      <div className="text-xs font-medium text-gray-700">{platform.name}</div>
                      <div className="text-xs text-gray-500">{platform.description}</div>
                    </motion.button>
                  ))}
                </div>

                {/* Copy Link */}
                <div className="border-t pt-3">
                  <Button
                    variant="outline"
                    onClick={handleCopyLink}
                    className="w-full gap-2 justify-start"
                    disabled={copied}
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-green-600">Link copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy link</span>
                      </>
                    )}
                  </Button>
                </div>

                {/* Viral Metrics */}
                {getViralScore() >= 20 && (
                  <div className="border-t mt-3 pt-3">
                    <h5 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Viral Metrics
                    </h5>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-sm font-semibold text-purple-600">{post.shares_count || 0}</div>
                        <div className="text-xs text-gray-500">Shares</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-red-600">{post.likes_count || 0}</div>
                        <div className="text-xs text-gray-500">Likes</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-blue-600">{getViralScore()}%</div>
                        <div className="text-xs text-gray-500">Viral Score</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Powered by EmviApp */}
                <div className="border-t mt-3 pt-3 text-center">
                  <div className="text-xs text-gray-500">
                    Powered by <span className="font-semibold text-purple-600">EmviApp</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {showShareMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
};

export default ViralSharingSystem;