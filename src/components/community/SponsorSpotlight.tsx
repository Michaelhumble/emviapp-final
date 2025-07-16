import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, Crown, Gift, TrendingUp, Users, Eye, Calendar,
  ChevronLeft, ChevronRight, ExternalLink, Award, Zap
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  featured: boolean;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  stats: {
    campaigns: number;
    totalPrizes: string;
    participants: number;
    views: number;
  };
  currentGiveaway?: {
    id: string;
    title: string;
    prize: string;
    endDate: string;
    entries: number;
    maxEntries?: number;
  };
  upcomingSpot?: {
    position: number;
    bidAmount: number;
    startDate: string;
  };
}

interface Props {
  onSponsorClick: (sponsor: Sponsor) => void;
  className?: string;
}

const MOCK_SPONSORS: Sponsor[] = [
  {
    id: '1',
    name: 'Luxury Nails Pro',
    logo: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop',
    description: 'Premium nail care products and tools for professionals',
    website: 'https://luxurynailspro.com',
    featured: true,
    tier: 'platinum',
    stats: {
      campaigns: 12,
      totalPrizes: '$50k',
      participants: 2847,
      views: 125000
    },
    currentGiveaway: {
      id: 'g1',
      title: 'Ultimate Nail Art Kit',
      prize: '$500 Professional Kit',
      endDate: '2024-02-15T23:59:59Z',
      entries: 1247,
      maxEntries: 2000
    }
  },
  {
    id: '2',
    name: 'BeautyTech Innovation',
    logo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=100&h=100&fit=crop',
    description: 'Cutting-edge beauty technology and smart devices',
    website: 'https://beautytech.com',
    featured: true,
    tier: 'gold',
    stats: {
      campaigns: 8,
      totalPrizes: '$35k',
      participants: 1923,
      views: 89000
    },
    upcomingSpot: {
      position: 2,
      bidAmount: 15000,
      startDate: '2024-02-20T00:00:00Z'
    }
  },
  {
    id: '3',
    name: 'GlamTools Studio',
    logo: 'https://images.unsplash.com/photo-1583999621102-3ae6eff2d581?w=100&h=100&fit=crop',
    description: 'Professional makeup and styling tools',
    website: 'https://glamtools.com',
    featured: false,
    tier: 'silver',
    stats: {
      campaigns: 5,
      totalPrizes: '$20k',
      participants: 1456,
      views: 67000
    },
    upcomingSpot: {
      position: 5,
      bidAmount: 8500,
      startDate: '2024-03-01T00:00:00Z'
    }
  }
];

const SponsorSpotlight: React.FC<Props> = ({ onSponsorClick, className = '' }) => {
  const { user } = useAuth();
  const [sponsors, setSponsors] = useState<Sponsor[]>(MOCK_SPONSORS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [queueVisible, setQueueVisible] = useState(false);

  const featuredSponsors = sponsors.filter(s => s.featured);
  const queueSponsors = sponsors.filter(s => s.upcomingSpot).sort((a, b) => 
    (a.upcomingSpot?.position || 0) - (b.upcomingSpot?.position || 0)
  );

  // Auto-rotate featured sponsors
  useEffect(() => {
    if (featuredSponsors.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredSponsors.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredSponsors.length]);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'from-purple-500 to-pink-500';
      case 'gold': return 'from-yellow-400 to-orange-500';
      case 'silver': return 'from-gray-400 to-gray-600';
      case 'bronze': return 'from-orange-700 to-red-700';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'platinum': return Crown;
      case 'gold': return Award;
      case 'silver': return Star;
      case 'bronze': return Zap;
      default: return Star;
    }
  };

  const formatTimeLeft = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  const handleSponsorClick = (sponsor: Sponsor) => {
    onSponsorClick(sponsor);
  };

  const handleEnterGiveaway = async (giveawayId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please sign in to enter giveaways');
      return;
    }

    // Simulate giveaway entry
    toast.success('Entered giveaway! Good luck! 🍀');
    
    // Update entry count optimistically
    setSponsors(prev => prev.map(sponsor => ({
      ...sponsor,
      currentGiveaway: sponsor.currentGiveaway?.id === giveawayId ? {
        ...sponsor.currentGiveaway,
        entries: sponsor.currentGiveaway.entries + 1
      } : sponsor.currentGiveaway
    })));
  };

  const currentSponsor = featuredSponsors[currentIndex];

  return (
    <div className={`${className}`}>
      {/* Main Sponsor Spotlight */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground flex items-center space-x-2">
            <Crown className="text-yellow-500" size={24} />
            <span>Sponsor Spotlight</span>
          </h2>
          
          <motion.button
            onClick={() => setQueueVisible(!queueVisible)}
            className="text-sm text-primary hover:text-primary/80 font-medium flex items-center space-x-1 transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-primary/20 rounded-lg px-2 py-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`${queueVisible ? 'Hide' : 'Show'} sponsor queue`}
          >
            <TrendingUp size={16} />
            <span>View Queue ({queueSponsors.length})</span>
          </motion.button>
        </div>

        {currentSponsor && (
          <motion.div
            key={currentSponsor.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-gradient-to-br from-background via-accent/20 to-background border border-border rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => handleSponsorClick(currentSponsor)}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Tier Badge */}
            <div className="absolute top-4 left-4 z-10">
              <motion.div
                className={`px-3 py-1 rounded-full bg-gradient-to-r ${getTierColor(currentSponsor.tier)} text-white text-sm font-bold shadow-lg`}
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.3)",
                    "0 0 30px rgba(59, 130, 246, 0.5)",
                    "0 0 20px rgba(59, 130, 246, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center space-x-1">
                  {React.createElement(getTierIcon(currentSponsor.tier), { size: 14 })}
                  <span className="capitalize">{currentSponsor.tier}</span>
                </div>
              </motion.div>
            </div>

            {/* Live Indicator */}
            <div className="absolute top-4 right-4 z-10">
              <div className="flex items-center space-x-2 px-3 py-1 bg-red-500 rounded-full text-white text-sm font-medium">
                <motion.div
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span>LIVE</span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={currentSponsor.logo}
                  alt={currentSponsor.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <h3 className="text-lg font-bold text-foreground">{currentSponsor.name}</h3>
                  <p className="text-muted-foreground text-sm">{currentSponsor.description}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">{currentSponsor.stats.campaigns}</div>
                  <div className="text-xs text-muted-foreground">Campaigns</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{currentSponsor.stats.totalPrizes}</div>
                  <div className="text-xs text-muted-foreground">Total Prizes</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{currentSponsor.stats.participants.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Participants</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">{currentSponsor.stats.views.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Views</div>
                </div>
              </div>

              {/* Current Giveaway */}
              {currentSponsor.currentGiveaway && (
                <motion.div
                  className="bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-lg p-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground flex items-center space-x-2">
                      <Gift className="text-primary" size={18} />
                      <span>{currentSponsor.currentGiveaway.title}</span>
                    </h4>
                    <span className="text-sm font-medium text-primary">
                      {formatTimeLeft(currentSponsor.currentGiveaway.endDate)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{currentSponsor.currentGiveaway.prize}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{currentSponsor.currentGiveaway.entries.toLocaleString()}</span> entries
                      {currentSponsor.currentGiveaway.maxEntries && (
                        <span> / {currentSponsor.currentGiveaway.maxEntries.toLocaleString()}</span>
                      )}
                    </div>
                    
                    <motion.button
                      onClick={(e) => {
                        handleEnterGiveaway(currentSponsor.currentGiveaway!.id, e);
                        toast.success('🍀 You\'re in the running!', {
                          description: 'Good luck! May the beauty gods smile upon you!'
                        });
                      }}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-lg focus:ring-2 focus:ring-primary/30"
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Enter ${currentSponsor.currentGiveaway!.title} giveaway`}
                    >
                      Enter Now
                    </motion.button>
                  </div>

                  {/* Progress bar */}
                  {currentSponsor.currentGiveaway.maxEntries && (
                    <div className="w-full bg-accent/50 rounded-full h-2 mt-3">
                      <motion.div
                        className="bg-gradient-to-r from-primary to-purple-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${(currentSponsor.currentGiveaway.entries / currentSponsor.currentGiveaway.maxEntries) * 100}%` 
                        }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Navigation */}
            {featuredSponsors.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-2">
                  {featuredSponsors.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex ? 'bg-primary' : 'bg-primary/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Sponsor Queue */}
      <AnimatePresence>
        {queueVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-accent/30 border border-border rounded-xl p-4">
              <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                <TrendingUp size={18} />
                <span>Sponsor Queue</span>
                <span className="text-sm text-muted-foreground">({queueSponsors.length} waiting)</span>
              </h3>
              
              <div className="space-y-3">
                {queueSponsors.map((sponsor, index) => (
                  <motion.div
                    key={sponsor.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer"
                    onClick={() => handleSponsorClick(sponsor)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full font-bold text-sm">
                        #{sponsor.upcomingSpot?.position}
                      </div>
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-foreground">{sponsor.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Bid: ${sponsor.upcomingSpot?.bidAmount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">
                        {new Date(sponsor.upcomingSpot?.startDate || '').toLocaleDateString()}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${getTierColor(sponsor.tier)} text-white`}>
                        {sponsor.tier}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
                <motion.button
                  className="w-full mt-4 p-3 border-2 border-dashed border-primary/30 rounded-lg text-primary hover:bg-primary/5 transition-all duration-300 font-medium hover:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary))" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    toast.success('🚀 Opening sponsor application...', {
                      description: 'Ready to showcase your brand to beauty professionals?'
                    });
                  }}
                  aria-label="Apply for next sponsor spot"
                >
                  + Apply for Next Spot
                </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SponsorSpotlight;