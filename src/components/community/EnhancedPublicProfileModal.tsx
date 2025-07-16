import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Star, MapPin, Calendar, Phone, Mail, Instagram, 
  MessageCircle, Bookmark, Share2, UserPlus, Briefcase,
  Award, TrendingUp, Heart, Eye, QrCode, Gift, Crown,
  Camera, Video, ExternalLink, Copy, Check, Zap
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface ProfileData {
  id: string;
  type: 'artist' | 'salon' | 'customer' | 'sponsor';
  name: string;
  avatar?: string;
  banner?: string;
  role?: string;
  location?: string;
  rating?: number;
  reviewCount?: number;
  followers?: number;
  following?: number;
  posts?: number;
  status?: 'online' | 'busy' | 'available' | 'offline';
  verified?: boolean;
  bio?: string;
  specialties?: string[];
  achievements?: string[];
  portfolio?: Array<{
    id: string;
    url: string;
    type: 'image' | 'video';
    title?: string;
    likes?: number;
  }>;
  socialLinks?: {
    instagram?: string;
    tiktok?: string;
    whatsapp?: string;
    website?: string;
  };
  services?: Array<{
    id: string;
    name: string;
    price: number;
    duration: number;
  }>;
  reviews?: Array<{
    id: string;
    rating: number;
    comment: string;
    author: string;
    date: string;
  }>;
  giveaways?: Array<{
    id: string;
    title: string;
    prize: string;
    endDate: string;
    entries: number;
  }>;
}

interface Props {
  profileId: string;
  profileType: string;
  isOpen: boolean;
  onClose: () => void;
}

const EnhancedPublicProfileModal: React.FC<Props> = ({
  profileId,
  profileType,
  isOpen,
  onClose
}) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('portfolio');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const tabs = [
    { key: 'portfolio', label: 'Portfolio', icon: Camera },
    { key: 'reviews', label: 'Reviews', icon: Star },
    { key: 'services', label: 'Services', icon: Briefcase },
    { key: 'achievements', label: 'Achievements', icon: Award }
  ];

  // Fetch profile data
  useEffect(() => {
    if (!isOpen || !profileId) return;

    const fetchProfile = async () => {
      setLoading(true);
      try {
        // Fetch user profile
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', profileId)
          .single();

        if (userError) throw userError;

        // Fetch portfolio images
        const { data: portfolioData } = await supabase
          .from('portfolio_items')
          .select('*')
          .eq('user_id', profileId)
          .order('order');

        // Fetch services for artists/salons
        const { data: servicesData } = await supabase
          .from('artist_services')
          .select('*')
          .eq('user_id', profileId);

        // Mock additional data (in real app, this would come from various tables)
        const mockProfile: ProfileData = {
          id: userData.id,
          type: userData.role as any,
          name: userData.full_name || 'Unknown User',
          avatar: userData.avatar_url,
          banner: userData.avatar_url, // Using avatar as banner fallback
          role: userData.role,
          location: userData.location,
          bio: userData.bio,
          rating: 4.8,
          reviewCount: 156,
          followers: 2340,
          following: 890,
          posts: 234,
          status: Math.random() > 0.5 ? 'online' : 'offline',
          verified: Math.random() > 0.6,
          specialties: userData.specialty ? [userData.specialty] : ['Nails', 'Gel Polish', 'Nail Art'],
          achievements: ['Top Artist 2024', '1000+ Happy Clients', 'Master Certificated'],
          portfolio: portfolioData?.map(item => ({
            id: item.id,
            url: item.image_url,
            type: 'image' as const,
            title: item.title,
            likes: Math.floor(Math.random() * 100) + 10
          })) || [],
          services: servicesData?.map(service => ({
            id: service.id,
            name: service.name,
            price: service.price,
            duration: service.duration || 60
          })) || [],
          socialLinks: {
            instagram: userData.instagram,
            website: userData.website
          },
          reviews: [
            {
              id: '1',
              rating: 5,
              comment: 'Amazing work! Highly recommend 💅',
              author: 'Sarah M.',
              date: '2 days ago'
            },
            {
              id: '2',
              rating: 5,
              comment: 'Perfect nails every time! Love coming here ✨',
              author: 'Emily R.',
              date: '1 week ago'
            }
          ]
        };

        setProfile(mockProfile);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isOpen, profileId]);

  // Handle actions
  const handleFollow = async () => {
    if (!user) {
      toast.error('Please sign in to follow');
      return;
    }
    
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? 'Unfollowed' : 'Following!');
  };

  const handleBookmark = async () => {
    if (!user) {
      toast.error('Please sign in to bookmark');
      return;
    }
    
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Bookmarked!');
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/profile/${profileId}`;
    const shareText = `Check out ${profile?.name} on EmviApp! ✨`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile?.name} | EmviApp`,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleMessage = () => {
    if (!user) {
      toast.error('Please sign in to message');
      return;
    }
    
    // In a full implementation, this would open the messaging modal
    // For now, redirect to messaging page with context
    toast.success('Opening messaging...', {
      description: `Starting conversation with ${profile?.name}`
    });
    
    // Could also open the UniversalMessageModal here
    window.open('/messages', '_blank');
  };

  const handleBook = () => {
    if (!user) {
      toast.error('Please sign in to book');
      return;
    }
    toast.success('Opening booking...');
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'available': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'online': return 'Online Now';
      case 'busy': return 'Busy';
      case 'available': return 'Available';
      default: return 'Offline';
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 60 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-background border border-border rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <motion.div
                className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : profile ? (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="relative">
                {/* Banner */}
                <div className="h-32 bg-gradient-to-br from-primary/20 via-primary/10 to-background relative overflow-hidden">
                  {profile.banner && (
                    <img
                      src={profile.banner}
                      alt="Banner"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/30 transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Profile Info Overlay */}
                <div className="absolute -bottom-16 left-6 flex items-end space-x-4">
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={profile.avatar || `https://images.unsplash.com/photo-1494790108755-2616b332c2a2?w=100&h=100&fit=crop&crop=face`}
                      alt={profile.name}
                      className="w-24 h-24 rounded-full border-4 border-background object-cover"
                    />
                    {/* Status indicator */}
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-background ${getStatusColor(profile.status)}`} />
                    {profile.verified && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Crown size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Header Content */}
              <div className="px-6 pt-20 pb-6 border-b border-border">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
                      {profile.verified && (
                        <Star size={20} className="text-primary" fill="currentColor" />
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        profile.status === 'online' ? 'bg-green-500/10 text-green-600' :
                        profile.status === 'available' ? 'bg-blue-500/10 text-blue-600' :
                        'bg-gray-500/10 text-gray-600'
                      }`}>
                        {getStatusText(profile.status)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      {profile.role && (
                        <span className="capitalize font-medium">{profile.role}</span>
                      )}
                      {profile.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{profile.location}</span>
                        </div>
                      )}
                      {profile.rating && (
                        <div className="flex items-center space-x-1">
                          <Star size={14} fill="currentColor" className="text-yellow-500" />
                          <span>{profile.rating}</span>
                          <span>({profile.reviewCount} reviews)</span>
                        </div>
                      )}
                    </div>

                    {profile.bio && (
                      <p className="text-muted-foreground mb-4">{profile.bio}</p>
                    )}

                    {/* Stats */}
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-foreground">{profile.followers?.toLocaleString()}</div>
                        <div className="text-muted-foreground">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-foreground">{profile.following?.toLocaleString()}</div>
                        <div className="text-muted-foreground">Following</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-foreground">{profile.posts}</div>
                        <div className="text-muted-foreground">Posts</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-2 ml-6">
                    <div className="flex space-x-2">
                      <motion.button
                        onClick={handleFollow}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                          isFollowing
                            ? 'bg-accent text-foreground hover:bg-accent/80'
                            : 'bg-primary text-primary-foreground hover:bg-primary/90'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="flex items-center space-x-2">
                          <UserPlus size={16} />
                          <span>{isFollowing ? 'Following' : 'Follow'}</span>
                        </div>
                      </motion.button>

                      <motion.button
                        onClick={handleMessage}
                        className="px-4 py-2 bg-accent text-foreground rounded-lg font-medium text-sm hover:bg-accent/80 transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MessageCircle size={16} />
                        <span>Message</span>
                      </motion.button>
                    </div>

                    <div className="flex space-x-2">
                      {(profile.type === 'artist' || profile.type === 'salon') && (
                        <motion.button
                          onClick={handleBook}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Book Now
                        </motion.button>
                      )}

                      <motion.button
                        onClick={handleBookmark}
                        className="p-2 bg-accent text-foreground rounded-lg hover:bg-accent/80 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Bookmark size={16} className={isBookmarked ? 'fill-current' : ''} />
                      </motion.button>

                      <motion.button
                        onClick={handleShare}
                        className="p-2 bg-accent text-foreground rounded-lg hover:bg-accent/80 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {copiedLink ? <Check size={16} className="text-green-600" /> : <Share2 size={16} />}
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                {profile.specialties && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {profile.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                )}

                {/* Social Links */}
                {profile.socialLinks && (
                  <div className="flex items-center space-x-4 mt-4">
                    {profile.socialLinks.instagram && (
                      <a
                        href={profile.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Instagram size={20} />
                      </a>
                    )}
                    {profile.socialLinks.whatsapp && (
                      <a
                        href={`https://wa.me/${profile.socialLinks.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-green-600 transition-colors"
                      >
                        <Phone size={20} />
                      </a>
                    )}
                    <button
                      onClick={() => setShowQR(!showQR)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <QrCode size={20} />
                    </button>
                  </div>
                )}
              </div>

              {/* Tabs */}
              <div className="border-b border-border">
                <div className="flex">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm transition-colors border-b-2 ${
                          activeTab === tab.key
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Icon size={16} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'portfolio' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {profile.portfolio?.map((item) => (
                      <motion.div
                        key={item.id}
                        className="relative group aspect-square rounded-lg overflow-hidden bg-accent"
                        whileHover={{ scale: 1.02 }}
                      >
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-center">
                            <Heart size={20} className="mx-auto mb-1" />
                            <span className="text-sm">{item.likes}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {profile.reviews?.map((review) => (
                      <div key={review.id} className="p-4 bg-accent/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{review.author}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={`${
                                    i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'services' && (
                  <div className="space-y-4">
                    {profile.services?.map((service) => (
                      <div key={service.id} className="p-4 bg-accent/30 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-foreground">{service.name}</h3>
                            <p className="text-sm text-muted-foreground">{service.duration} min</p>
                          </div>
                          <span className="font-bold text-primary">${service.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'achievements' && (
                  <div className="space-y-4">
                    {profile.achievements?.map((achievement, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-3 p-4 bg-accent/30 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Award size={20} className="text-yellow-500" />
                        <span className="font-medium text-foreground">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-96">
              <p className="text-muted-foreground">Profile not found</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EnhancedPublicProfileModal;