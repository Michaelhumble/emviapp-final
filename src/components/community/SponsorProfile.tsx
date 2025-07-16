import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Gift, 
  Trophy, 
  Users, 
  ExternalLink, 
  Share2, 
  Heart,
  Eye,
  Calendar,
  Award,
  Zap,
  Crown
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface SponsorData {
  id: string;
  brand_name: string;
  logo_url: string;
  banner_url?: string;
  description: string;
  website_url?: string;
  social_links?: {
    instagram?: string;
    tiktok?: string;
    facebook?: string;
  };
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  total_giveaways: number;
  total_value_given: number;
  followers_count: number;
  created_at: string;
}

interface Giveaway {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  prize_value: number;
  entries_count: number;
  end_date: string;
  status: 'active' | 'ended' | 'upcoming';
  requirements: string[];
}

interface SponsorProfileProps {
  sponsorId: string;
  isOpen: boolean;
  onClose: () => void;
}

const SponsorProfile: React.FC<SponsorProfileProps> = ({ sponsorId, isOpen, onClose }) => {
  const { user } = useAuth();
  const [sponsor, setSponsor] = useState<SponsorData | null>(null);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'giveaways' | 'products'>('overview');

  useEffect(() => {
    if (isOpen && sponsorId) {
      fetchSponsorData();
      fetchGiveaways();
    }
  }, [isOpen, sponsorId]);

  const fetchSponsorData = async () => {
    try {
      setLoading(true);
      
      // For demo purposes, using mock data
      // In production, this would fetch from your sponsors table
      const mockSponsor: SponsorData = {
        id: sponsorId,
        brand_name: "Beauty Pro Supplies",
        logo_url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
        banner_url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=300&fit=crop",
        description: "Premium beauty supplies for professionals. Trusted by 10,000+ artists worldwide.",
        website_url: "https://beautyprosupp.com",
        social_links: {
          instagram: "@beautyprosupplies",
          tiktok: "@beautypro"
        },
        tier: "gold",
        total_giveaways: 24,
        total_value_given: 50000,
        followers_count: 15420,
        created_at: new Date().toISOString()
      };

      setSponsor(mockSponsor);
    } catch (error) {
      console.error('Error fetching sponsor data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGiveaways = async () => {
    try {
      // Mock giveaways data
      const mockGiveaways: Giveaway[] = [
        {
          id: '1',
          title: 'Ultimate Makeup Kit Giveaway',
          description: 'Win a complete professional makeup kit worth $500',
          image_url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop',
          prize_value: 500,
          entries_count: 1247,
          end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active',
          requirements: ['Follow us', 'Share this post', 'Tag 3 friends']
        },
        {
          id: '2',
          title: 'Nail Art Starter Pack',
          description: 'Perfect for beginners - everything you need to start',
          image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop',
          prize_value: 200,
          entries_count: 892,
          end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active',
          requirements: ['Follow us', 'Like this post']
        }
      ];

      setGiveaways(mockGiveaways);
    } catch (error) {
      console.error('Error fetching giveaways:', error);
    }
  };

  const handleFollow = async () => {
    if (!user) return;
    
    try {
      // In production, this would update the follow relationship
      setFollowing(!following);
      
      // Show success message
      console.log(following ? 'Unfollowed sponsor' : 'Following sponsor');
    } catch (error) {
      console.error('Error updating follow status:', error);
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/sponsor/${sponsorId}`;
    const shareText = `Check out ${sponsor?.brand_name} on EmviApp! Amazing giveaways and prizes! 🎁`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${sponsor?.brand_name} - EmviApp`,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      // Show toast notification
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'text-amber-600 bg-amber-100';
      case 'silver': return 'text-gray-600 bg-gray-100';
      case 'gold': return 'text-yellow-600 bg-yellow-100';
      case 'platinum': return 'text-purple-600 bg-purple-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'bronze': return <Award className="w-4 h-4" />;
      case 'silver': return <Star className="w-4 h-4" />;
      case 'gold': return <Trophy className="w-4 h-4" />;
      case 'platinum': return <Crown className="w-4 h-4" />;
      default: return <Award className="w-4 h-4" />;
    }
  };

  const formatTimeLeft = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffMs = end.getTime() - now.getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (days > 0) return `${days} days left`;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    if (hours > 0) return `${hours} hours left`;
    return 'Ending soon';
  };

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl h-[80vh] overflow-hidden">
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-gray-200 rounded" />
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full" />
              <div className="space-y-2 flex-1">
                <div className="h-6 bg-gray-200 rounded w-48" />
                <div className="h-4 bg-gray-200 rounded w-32" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!sponsor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-hidden p-0">
        <div className="flex flex-col h-full">
          {/* Banner */}
          <div className="relative h-32 overflow-hidden">
            {sponsor.banner_url ? (
              <img
                src={sponsor.banner_url}
                alt={sponsor.brand_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-primary/20 to-purple-500/20" />
            )}
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Profile Header */}
            <div className="relative px-6 pb-6">
              <div className="flex items-start justify-between -mt-10 mb-4">
                <div className="flex items-end space-x-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-background bg-background">
                    <img
                      src={sponsor.logo_url}
                      alt={sponsor.brand_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="pb-2">
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-2xl font-bold">{sponsor.brand_name}</h1>
                      <Badge className={getTierColor(sponsor.tier)}>
                        {getTierIcon(sponsor.tier)}
                        <span className="ml-1 capitalize">{sponsor.tier}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{sponsor.followers_count.toLocaleString()} followers</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Gift className="w-4 h-4" />
                        <span>{sponsor.total_giveaways} giveaways</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Trophy className="w-4 h-4" />
                        <span>${sponsor.total_value_given.toLocaleString()} given</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button
                    variant={following ? "outline" : "default"}
                    onClick={handleFollow}
                    className="min-w-24"
                  >
                    {following ? 'Following' : 'Follow'}
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">{sponsor.description}</p>

              {/* Links */}
              <div className="flex items-center space-x-4 mb-6">
                {sponsor.website_url && (
                  <a
                    href={sponsor.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-primary hover:underline text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Website</span>
                  </a>
                )}
                {sponsor.social_links?.instagram && (
                  <a
                    href={`https://instagram.com/${sponsor.social_links.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    {sponsor.social_links.instagram}
                  </a>
                )}
              </div>

              {/* Tabs */}
              <div className="flex space-x-1 mb-6">
                {[
                  { key: 'overview', label: 'Overview' },
                  { key: 'giveaways', label: 'Giveaways' },
                  { key: 'products', label: 'Products' }
                ].map((tab) => (
                  <Button
                    key={tab.key}
                    variant={activeTab === tab.key ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveTab(tab.key as any)}
                  >
                    {tab.label}
                  </Button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      {/* Stats Cards */}
                      <div className="grid grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-primary">{sponsor.total_giveaways}</div>
                            <div className="text-sm text-muted-foreground">Total Giveaways</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-green-600">
                              ${sponsor.total_value_given.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">Value Given</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-purple-600">
                              {sponsor.followers_count.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">Followers</div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Recent Activity */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                              <span className="text-sm">New giveaway launched: Ultimate Makeup Kit</span>
                              <span className="text-xs text-muted-foreground">2 days ago</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full" />
                              <span className="text-sm">1,000 new followers this month</span>
                              <span className="text-xs text-muted-foreground">1 week ago</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {activeTab === 'giveaways' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {giveaways.map((giveaway) => (
                        <motion.div
                          key={giveaway.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                            <div className="relative">
                              {giveaway.image_url && (
                                <img
                                  src={giveaway.image_url}
                                  alt={giveaway.title}
                                  className="w-full h-32 object-cover"
                                />
                              )}
                              <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                ${giveaway.prize_value}
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-semibold mb-2">{giveaway.title}</h3>
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                {giveaway.description}
                              </p>
                              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                                <div className="flex items-center space-x-1">
                                  <Users className="w-3 h-3" />
                                  <span>{giveaway.entries_count} entries</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>{formatTimeLeft(giveaway.end_date)}</span>
                                </div>
                              </div>
                              <Button size="sm" className="w-full">
                                <Gift className="w-4 h-4 mr-2" />
                                Enter Giveaway
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'products' && (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                          <Zap className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Products Coming Soon</h3>
                        <p className="text-muted-foreground">
                          {sponsor.brand_name} will be showcasing their amazing products here soon!
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SponsorProfile;