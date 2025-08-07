import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Instagram, Share2, Trophy, Gift, Star, Heart, 
  TrendingUp, Users, Camera, Video, MessageSquare,
  ExternalLink, Sparkles, Award, Zap
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import { supabaseBypass } from '@/types/supabase-bypass';

interface SocialPlatform {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  connected: boolean;
  followerCount?: number;
  color: string;
  rewardMultiplier: number;
}

interface ShareableContent {
  id: string;
  type: 'achievement' | 'streak' | 'booking' | 'review' | 'challenge';
  title: string;
  description: string;
  imageUrl?: string;
  rewardPoints: number;
  platforms: string[];
}

interface SocialMediaIntegrationProps {
  onRewardEarned?: (points: number, reason: string) => void;
}

const SocialMediaIntegration: React.FC<SocialMediaIntegrationProps> = ({ 
  onRewardEarned 
}) => {
  const { user } = useAuth();
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([]);
  const [shareableContent, setShareableContent] = useState<ShareableContent[]>([]);
  const [autoShareEnabled, setAutoShareEnabled] = useState(false);
  const [totalRewardsEarned, setTotalRewardsEarned] = useState(0);
  const [pendingShares, setPendingShares] = useState<string[]>([]);

  const defaultPlatforms: SocialPlatform[] = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      connected: false,
      color: 'from-purple-500 to-pink-500',
      rewardMultiplier: 2.0
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: Video,
      connected: false,
      color: 'from-black to-red-500',
      rewardMultiplier: 2.5
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Share2,
      connected: false,
      color: 'from-blue-600 to-blue-700',
      rewardMultiplier: 1.5
    }
  ];

  useEffect(() => {
    setPlatforms(defaultPlatforms);
    loadShareableContent();
    loadSocialStats();
  }, []);

  const loadShareableContent = () => {
    // Mock shareable content
    const mockContent: ShareableContent[] = [
      {
        id: '1',
        type: 'achievement',
        title: 'Beauty Enthusiast Badge Unlocked! 🏆',
        description: 'Just earned my 5th booking badge on EmviApp! The journey to beautiful never stops ✨',
        rewardPoints: 50,
        platforms: ['instagram', 'facebook']
      },
      {
        id: '2',
        type: 'streak',
        title: '7-Day Beauty Streak! 🔥',
        description: 'Keeping up my beauty routine with EmviApp! Who else is on their glow-up journey?',
        rewardPoints: 75,
        platforms: ['instagram', 'tiktok']
      },
      {
        id: '3',
        type: 'booking',
        title: 'Amazing Nail Art Experience! 💅',
        description: 'Just had the most incredible nail art session through EmviApp! Check out these results!',
        rewardPoints: 100,
        platforms: ['instagram', 'tiktok', 'facebook']
      }
    ];
    
    setShareableContent(mockContent);
  };

  const loadSocialStats = async () => {
    try {
      // Load user's social sharing stats
      setTotalRewardsEarned(850); // Mock data
    } catch (error) {
      console.error('Error loading social stats:', error);
    }
  };

  const connectPlatform = async (platformId: string) => {
    // Simulate OAuth flow
    toast.info(`Connecting to ${platforms.find(p => p.id === platformId)?.name}...`);
    
    // Mock successful connection
    setTimeout(() => {
      setPlatforms(prev => prev.map(p => 
        p.id === platformId 
          ? { ...p, connected: true, followerCount: Math.floor(Math.random() * 10000) + 100 }
          : p
      ));
      toast.success(`Successfully connected to ${platforms.find(p => p.id === platformId)?.name}!`);
    }, 2000);
  };

  const disconnectPlatform = (platformId: string) => {
    setPlatforms(prev => prev.map(p => 
      p.id === platformId 
        ? { ...p, connected: false, followerCount: undefined }
        : p
    ));
    toast.success('Platform disconnected');
  };

  const shareContent = async (contentId: string, platformId: string) => {
    const content = shareableContent.find(c => c.id === contentId);
    const platform = platforms.find(p => p.id === platformId);
    
    if (!content || !platform || !platform.connected) {
      toast.error('Unable to share content');
      return;
    }

    setPendingShares(prev => [...prev, `${contentId}-${platformId}`]);
    
    try {
      // Mock share API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const rewardPoints = Math.floor(content.rewardPoints * platform.rewardMultiplier);
      
      // Record successful share
      await recordShare(contentId, platformId, rewardPoints);
      
      setTotalRewardsEarned(prev => prev + rewardPoints);
      onRewardEarned?.(rewardPoints, `Shared ${content.title} on ${platform.name}`);
      
      toast.success(`Shared successfully! Earned ${rewardPoints} points! 🎉`);
      
    } catch (error) {
      console.error('Share failed:', error);
      toast.error('Share failed. Please try again.');
    } finally {
      setPendingShares(prev => prev.filter(id => id !== `${contentId}-${platformId}`));
    }
  };

  const recordShare = async (contentId: string, platformId: string, rewardPoints: number) => {
    if (!user?.id) return;
    
    try {
      await supabaseBypass
        .from('social_shares')
        .insert({
          user_id: user.id,
          content_id: contentId,
          platform: platformId,
          reward_points: rewardPoints,
          shared_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Error recording share:', error);
    }
  };

  const shareToAllPlatforms = async (contentId: string) => {
    const content = shareableContent.find(c => c.id === contentId);
    if (!content) return;

    const connectedPlatforms = platforms.filter(p => p.connected && content.platforms.includes(p.id));
    
    for (const platform of connectedPlatforms) {
      await shareContent(contentId, platform.id);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Stagger shares
    }
  };

  const generateShareText = (content: ShareableContent) => {
    const hashtags = '#EmviApp #BeautyTech #GlowUp #BeautyJourney #SelfCare';
    return `${content.description}\n\n${hashtags}`;
  };

  return (
    <div className="space-y-6">
      {/* Social Stats Header */}
      <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-200/30">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Sparkles className="h-5 w-5 mr-2" />
            Social Rewards Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">{totalRewardsEarned}</div>
              <div className="text-sm text-purple-200">Points Earned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {platforms.filter(p => p.connected).length}
              </div>
              <div className="text-sm text-purple-200">Connected</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{shareableContent.length}</div>
              <div className="text-sm text-purple-200">Ready to Share</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Connections */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            <span className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Connected Platforms
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Auto-share achievements</span>
              <Switch
                checked={autoShareEnabled}
                onCheckedChange={setAutoShareEnabled}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {platforms.map((platform) => (
            <div key={platform.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${platform.color}`}>
                  <platform.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{platform.name}</h3>
                  <div className="flex items-center space-x-2">
                    {platform.connected ? (
                      <>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          Connected
                        </Badge>
                        {platform.followerCount && (
                          <span className="text-sm text-gray-300">
                            {platform.followerCount.toLocaleString()} followers
                          </span>
                        )}
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          {platform.rewardMultiplier}x rewards
                        </Badge>
                      </>
                    ) : (
                      <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
                        Not Connected
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <Button
                variant={platform.connected ? "outline" : "default"}
                size="sm"
                onClick={() => platform.connected 
                  ? disconnectPlatform(platform.id)
                  : connectPlatform(platform.id)
                }
                className={platform.connected 
                  ? "border-white/20 text-white hover:bg-white/10"
                  : `bg-gradient-to-r ${platform.color} hover:opacity-90`
                }
              >
                {platform.connected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Shareable Content */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Share2 className="h-5 w-5 mr-2" />
            Ready to Share
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {shareableContent.map((content) => (
            <motion.div
              key={content.id}
              className="p-4 bg-white/5 rounded-lg border border-white/10"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-white mb-1">{content.title}</h3>
                  <p className="text-sm text-gray-300 mb-2">{content.description}</p>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <Gift className="h-3 w-3 mr-1" />
                      {content.rewardPoints} points
                    </Badge>
                    <Badge className={`bg-${content.type === 'achievement' ? 'purple' : content.type === 'streak' ? 'orange' : 'blue'}-500/20 text-${content.type === 'achievement' ? 'purple' : content.type === 'streak' ? 'orange' : 'blue'}-400`}>
                      {content.type}
                    </Badge>
                  </div>
                </div>
                <Button
                  onClick={() => shareToAllPlatforms(content.id)}
                  disabled={platforms.filter(p => p.connected).length === 0}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share All
                </Button>
              </div>

              {/* Platform-specific share buttons */}
              <div className="flex flex-wrap gap-2">
                {content.platforms.map((platformId) => {
                  const platform = platforms.find(p => p.id === platformId);
                  if (!platform) return null;
                  
                  const isPending = pendingShares.includes(`${content.id}-${platformId}`);
                  
                  return (
                    <Button
                      key={platformId}
                      variant="outline"
                      size="sm"
                      disabled={!platform.connected || isPending}
                      onClick={() => shareContent(content.id, platformId)}
                      className={`border-white/20 text-white hover:bg-white/10 ${!platform.connected ? 'opacity-50' : ''}`}
                    >
                      {isPending ? (
                        <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full mr-2" />
                      ) : (
                        <platform.icon className="h-3 w-3 mr-2" />
                      )}
                      {platform.name}
                      {platform.connected && (
                        <Badge className="ml-2 bg-yellow-500/20 text-yellow-400 text-xs">
                          +{Math.floor(content.rewardPoints * platform.rewardMultiplier)}
                        </Badge>
                      )}
                    </Button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Share Templates */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Camera className="h-5 w-5 mr-2" />
            Share Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h4 className="font-medium text-white mb-2">Instagram Story Template</h4>
              <p className="text-sm text-gray-300 mb-3">
                Pre-designed story templates for your achievements
              </p>
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                <ExternalLink className="h-3 w-3 mr-2" />
                Download
              </Button>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h4 className="font-medium text-white mb-2">TikTok Video Ideas</h4>
              <p className="text-sm text-gray-300 mb-3">
                Creative video concepts for your beauty journey
              </p>
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                <ExternalLink className="h-3 w-3 mr-2" />
                View Ideas
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaIntegration;