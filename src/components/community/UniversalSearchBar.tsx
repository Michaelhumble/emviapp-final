import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Building, Briefcase, Star, MapPin, Clock, Filter, Zap, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';

interface SearchResult {
  id: string;
  type: 'artist' | 'salon' | 'customer' | 'job' | 'sponsor';
  name: string;
  avatar?: string;
  role?: string;
  location?: string;
  rating?: number;
  tags?: string[];
  status?: 'online' | 'busy' | 'available' | 'offline';
  verified?: boolean;
  specialties?: string[];
}

interface TrendingHashtag {
  tag: string;
  count: number;
  trending: boolean;
}

interface Props {
  onResultClick: (result: SearchResult) => void;
  className?: string;
}

const TRENDING_HASHTAGS: TrendingHashtag[] = [
  { tag: 'Nails', count: 1247, trending: true },
  { tag: 'Hair', count: 892, trending: true },
  { tag: 'Hot Salons', count: 634, trending: false },
  { tag: 'VIP Artists', count: 445, trending: true },
  { tag: 'Brand Giveaways', count: 289, trending: false },
  { tag: 'Makeup', count: 567, trending: true },
  { tag: 'Skincare', count: 423, trending: false },
  { tag: 'Extensions', count: 356, trending: true }
];

const UniversalSearchBar: React.FC<Props> = ({ onResultClick, className = '' }) => {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filters = [
    { key: 'all', label: 'All', icon: Search },
    { key: 'artists', label: 'Artists', icon: User },
    { key: 'salons', label: 'Salons', icon: Building },
    { key: 'jobs', label: 'Jobs', icon: Briefcase },
    { key: 'sponsors', label: 'Sponsors', icon: Star }
  ];

  // Simulated search with real-time suggestions
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    try {
      // Search users (artists, customers, salons)
      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, role, location, specialty')
        .or(`full_name.ilike.%${searchQuery}%,specialty.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`)
        .limit(10);

      if (usersError) throw usersError;

      // Search jobs
      const { data: jobs, error: jobsError } = await supabase
        .from('jobs')
        .select('id, title, location, category')
        .or(`title.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`)
        .eq('status', 'active')
        .limit(5);

      if (jobsError) throw jobsError;

      // Transform results
      const searchResults: SearchResult[] = [
        ...(users || []).map(user => ({
          id: user.id,
          type: user.role === 'salon' ? 'salon' as const : 'artist' as const,
          name: user.full_name || 'Unknown User',
          avatar: user.avatar_url,
          role: user.role,
          location: user.location,
          rating: Math.random() * 2 + 3, // Mock rating 3-5
          status: Math.random() > 0.5 ? 'online' as const : 'offline' as const,
          verified: Math.random() > 0.7,
          specialties: user.specialty ? [user.specialty] : []
        })),
        ...(jobs || []).map(job => ({
          id: job.id,
          type: 'job' as const,
          name: job.title,
          location: job.location,
          tags: [job.category]
        }))
      ];

      // Filter based on selected filter
      const filteredResults = selectedFilter === 'all' 
        ? searchResults 
        : searchResults.filter(result => {
            if (selectedFilter === 'artists') return result.type === 'artist';
            if (selectedFilter === 'salons') return result.type === 'salon';
            if (selectedFilter === 'jobs') return result.type === 'job';
            if (selectedFilter === 'sponsors') return result.type === 'sponsor';
            return true;
          });

      setResults(filteredResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, selectedFilter]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (result: SearchResult) => {
    onResultClick(result);
    setIsExpanded(false);
    setQuery('');
  };

  const handleHashtagClick = (hashtag: string) => {
    setQuery(hashtag);
    inputRef.current?.focus();
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'available': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'artist': return User;
      case 'salon': return Building;
      case 'job': return Briefcase;
      case 'sponsor': return Star;
      default: return User;
    }
  };

  return (
    <div ref={searchRef} className={`relative z-50 ${className}`}>
      {/* Trending Hashtags Bar */}
      <motion.div 
        className="flex items-center space-x-2 mb-4 overflow-x-auto scrollbar-hide"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-1 text-sm text-muted-foreground whitespace-nowrap">
          <TrendingUp size={16} />
          <span className="font-medium">Trending:</span>
        </div>
        {TRENDING_HASHTAGS.map((hashtag, index) => (
          <motion.button
            key={hashtag.tag}
            onClick={() => handleHashtagClick(hashtag.tag)}
            className={`
              px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap
              transition-all duration-200 hover:scale-105
              ${hashtag.trending 
                ? 'bg-gradient-to-r from-primary/20 to-purple-500/20 text-primary border border-primary/30' 
                : 'bg-accent/50 text-foreground hover:bg-accent'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            #{hashtag.tag}
            {hashtag.trending && (
              <motion.span
                className="ml-1 text-xs"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🔥
              </motion.span>
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className="relative"
        animate={{
          scale: isExpanded ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative">
          <Search 
            size={20} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="Search artists, salons, jobs, sponsors..."
            className="
              w-full pl-12 pr-16 py-4 rounded-xl border border-border
              bg-background/80 backdrop-blur-sm
              text-foreground placeholder-muted-foreground
              focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
              transition-all duration-300
              text-lg
            "
          />
          
          {/* Filter Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-md hover:bg-accent transition-colors"
          >
            <Filter size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center space-x-2 mt-3"
            >
              {filters.map((filter) => {
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedFilter(filter.key)}
                    className={`
                      flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium
                      transition-all duration-200
                      ${selectedFilter === filter.key
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-accent/50 text-foreground hover:bg-accent'
                      }
                    `}
                  >
                    <Icon size={16} />
                    <span>{filter.label}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Results Dropdown */}
        <AnimatePresence>
          {isExpanded && (query || selectedFilter !== 'all') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-xl overflow-hidden z-50"
            >
              {isLoading ? (
                <div className="p-6 text-center">
                  <motion.div
                    className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full mx-auto"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="text-sm text-muted-foreground mt-2">Searching...</p>
                </div>
              ) : results.length === 0 && query ? (
                <div className="p-6 text-center">
                  <p className="text-muted-foreground">No results found for "{query}"</p>
                  <p className="text-xs text-muted-foreground mt-1">Try different keywords or filters</p>
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto">
                  {results.map((result, index) => {
                    const TypeIcon = getTypeIcon(result.type);
                    return (
                      <motion.button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="w-full p-4 hover:bg-accent/50 transition-colors duration-200 text-left border-b border-border/50 last:border-b-0"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-center space-x-3">
                          {/* Avatar or Icon */}
                          <div className="relative">
                            {result.avatar ? (
                              <img
                                src={result.avatar}
                                alt={result.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                                <TypeIcon size={20} className="text-muted-foreground" />
                              </div>
                            )}
                            
                            {/* Status indicator */}
                            {result.status && (
                              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(result.status)}`} />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-foreground truncate">{result.name}</h3>
                              {result.verified && (
                                <motion.div
                                  className="text-primary"
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <Star size={16} fill="currentColor" />
                                </motion.div>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              {result.role && (
                                <span className="capitalize">{result.role}</span>
                              )}
                              {result.location && (
                                <>
                                  <span>•</span>
                                  <div className="flex items-center space-x-1">
                                    <MapPin size={12} />
                                    <span>{result.location}</span>
                                  </div>
                                </>
                              )}
                              {result.rating && (
                                <>
                                  <span>•</span>
                                  <div className="flex items-center space-x-1">
                                    <Star size={12} fill="currentColor" className="text-yellow-500" />
                                    <span>{result.rating.toFixed(1)}</span>
                                  </div>
                                </>
                              )}
                            </div>

                            {/* Tags/Specialties */}
                            {(result.specialties || result.tags) && (
                              <div className="flex items-center space-x-1 mt-1">
                                {(result.specialties || result.tags)?.slice(0, 3).map((tag, tagIndex) => (
                                  <span key={tagIndex} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Status badges */}
                          <div className="flex flex-col items-end space-y-1">
                            {result.status === 'online' && (
                              <span className="px-2 py-1 bg-green-500/10 text-green-600 text-xs rounded-full font-medium">
                                Online Now
                              </span>
                            )}
                            {result.status === 'available' && (
                              <span className="px-2 py-1 bg-blue-500/10 text-blue-600 text-xs rounded-full font-medium">
                                Available
                              </span>
                            )}
                            {result.type === 'job' && (
                              <span className="px-2 py-1 bg-purple-500/10 text-purple-600 text-xs rounded-full font-medium">
                                Hiring
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default UniversalSearchBar;