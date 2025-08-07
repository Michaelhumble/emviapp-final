import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search, MapPin, Star, Clock, Zap, TrendingUp, Filter, 
  Heart, Eye, Sparkles, Calendar, ChevronRight, Map
} from 'lucide-react';
import { toast } from 'sonner';
import { supabaseBypass } from '@/types/supabase-bypass';

interface Provider {
  id: string;
  full_name: string;
  avatar_url: string;
  bio: string;
  specialty: string;
  location: string;
  rating: number;
  reviews_count: number;
  is_online: boolean;
  instant_book: boolean;
  trending_score: number;
  distance: number;
  price_range: string;
  next_available: string;
}

interface TrendingOffer {
  id: string;
  title: string;
  provider: Provider;
  original_price: number;
  discounted_price: number;
  discount_percentage: number;
  expires_at: string;
  popularity_score: number;
}

interface AIProviderDiscoveryProps {
  onProviderSelect?: (provider: Provider) => void;
  onViewMap?: () => void;
}

const AIProviderDiscovery: React.FC<AIProviderDiscoveryProps> = ({ 
  onProviderSelect, 
  onViewMap 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [trendingOffers, setTrendingOffers] = useState<TrendingOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'online' | 'instant' | 'trending'>('all');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  useEffect(() => {
    loadProviders();
    loadTrendingOffers();
    generateAISuggestions();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      debounceSearch();
    }
  }, [searchQuery, activeFilter]);

  const loadProviders = async () => {
    setLoading(true);
    try {
      // Mock data for now - replace with actual Supabase query
      const mockProviders: Provider[] = [
        {
          id: '1',
          full_name: 'Maya Chen',
          avatar_url: '',
          bio: 'Expert nail artist specializing in intricate designs',
          specialty: 'Nail Art',
          location: 'Beverly Hills, CA',
          rating: 4.9,
          reviews_count: 156,
          is_online: true,
          instant_book: true,
          trending_score: 95,
          distance: 0.8,
          price_range: '$60-120',
          next_available: '2024-01-15T14:00:00Z'
        },
        {
          id: '2',
          full_name: 'Sophia Rodriguez',
          avatar_url: '',
          bio: 'Celebrity makeup artist and beauty influencer',
          specialty: 'Makeup',
          location: 'West Hollywood, CA',
          rating: 4.8,
          reviews_count: 203,
          is_online: false,
          instant_book: false,
          trending_score: 88,
          distance: 1.2,
          price_range: '$80-200',
          next_available: '2024-01-16T10:00:00Z'
        }
      ];
      
      setProviders(mockProviders);
    } catch (error) {
      console.error('Error loading providers:', error);
      toast.error('Failed to load providers');
    } finally {
      setLoading(false);
    }
  };

  const loadTrendingOffers = async () => {
    try {
      // Mock trending offers
      const mockOffers: TrendingOffer[] = [
        {
          id: '1',
          title: 'New Year Glow Package',
          provider: providers[0] || {} as Provider,
          original_price: 150,
          discounted_price: 99,
          discount_percentage: 34,
          expires_at: '2024-01-31T23:59:59Z',
          popularity_score: 92
        }
      ];
      
      setTrendingOffers(mockOffers);
    } catch (error) {
      console.error('Error loading trending offers:', error);
    }
  };

  const generateAISuggestions = () => {
    const suggestions = [
      'Nail art for date night',
      'Quick 30-min touch up',
      'Trending Korean glass skin',
      'Bold holiday makeup',
      'Natural everyday look'
    ];
    setAiSuggestions(suggestions);
  };

  const debounceSearch = () => {
    // Implement debounced search logic
    console.log('Searching for:', searchQuery);
  };

  const handleProviderClick = (provider: Provider) => {
    onProviderSelect?.(provider);
    toast.success(`Selected ${provider.full_name}`);
  };

  const handleBookInstant = (provider: Provider) => {
    toast.success(`Instant booking with ${provider.full_name}!`);
  };

  const filteredProviders = providers.filter(provider => {
    switch (activeFilter) {
      case 'online':
        return provider.is_online;
      case 'instant':
        return provider.instant_book;
      case 'trending':
        return provider.trending_score > 85;
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6">
      {/* AI-Powered Search */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-200/20">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Sparkles className="h-5 w-5 mr-2" />
            AI Beauty Discovery
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tell me what you're looking for..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-300"
            />
            <Button
              onClick={onViewMap}
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
            >
              <Map className="h-4 w-4" />
            </Button>
          </div>

          {/* AI Suggestions */}
          <div className="flex flex-wrap gap-2">
            {aiSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery(suggestion)}
                className="text-xs bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                {suggestion}
              </Button>
            ))}
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'All', icon: Filter },
              { key: 'online', label: 'Online Now', icon: Zap },
              { key: 'instant', label: 'Instant Book', icon: Clock },
              { key: 'trending', label: 'Trending', icon: TrendingUp }
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={activeFilter === key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveFilter(key as typeof activeFilter)}
                className={`flex items-center space-x-1 ${
                  activeFilter === key
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'bg-white/10 hover:bg-white/20 border-white/20'
                } text-white`}
              >
                <Icon className="h-3 w-3" />
                <span className="text-xs">{label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trending Offers */}
      {trendingOffers.length > 0 && (
        <Card className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-200/30">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <TrendingUp className="h-5 w-5 mr-2" />
              🔥 Trending Offers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {trendingOffers.map((offer) => (
              <motion.div
                key={offer.id}
                className="bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{offer.title}</h4>
                    <p className="text-sm text-gray-300">by {offer.provider.full_name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-lg font-bold text-green-400">
                        ${offer.discounted_price}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ${offer.original_price}
                      </span>
                      <Badge className="bg-red-500 text-white">
                        {offer.discount_percentage}% OFF
                      </Badge>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Provider Results */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredProviders.map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                onClick={() => handleProviderClick(provider)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={provider.avatar_url} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                          {provider.full_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {provider.is_online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-white flex items-center">
                            {provider.full_name}
                            {provider.instant_book && (
                              <Badge className="ml-2 bg-blue-500 text-white text-xs">
                                <Zap className="h-3 w-3 mr-1" />
                                Instant
                              </Badge>
                            )}
                          </h3>
                          <p className="text-sm text-gray-300">{provider.specialty}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-white ml-1">
                                {provider.rating} ({provider.reviews_count})
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-300">
                              <MapPin className="h-3 w-3 mr-1" />
                              {provider.distance}mi away
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-white font-medium">{provider.price_range}</div>
                          {provider.instant_book && (
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBookInstant(provider);
                              }}
                              className="mt-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                            >
                              <Zap className="h-3 w-3 mr-1" />
                              Book Now
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="text-white mt-2">Discovering amazing providers...</p>
        </div>
      )}
    </div>
  );
};

export default AIProviderDiscovery;