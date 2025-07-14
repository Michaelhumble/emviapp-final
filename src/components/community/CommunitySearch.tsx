import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, Hash, X, MapPin } from 'lucide-react';

interface CommunitySearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

const CommunitySearch = ({ isOpen, onClose, onSearch }: CommunitySearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('all');

  const searchFilters = [
    { id: 'all', label: 'All' },
    { id: 'posts', label: 'Posts' },
    { id: 'people', label: 'People' },
    { id: 'hashtags', label: 'Hashtags' },
    { id: 'locations', label: 'Locations' },
  ];

  const trendingSearches = [
    { query: 'nail art 2024', type: 'hashtag', count: 234 },
    { query: 'hair transformation', type: 'hashtag', count: 189 },
    { query: 'makeup tutorial', type: 'hashtag', count: 156 },
    { query: 'skincare routine', type: 'hashtag', count: 143 },
    { query: 'lash extensions', type: 'hashtag', count: 98 },
  ];

  const recentSearches = [
    'purple hair color',
    'nail salon near me',
    'makeup artist',
    'hair styling tips',
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleTrendingClick = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg mx-4 max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-4 pb-2">
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Community
          </DialogTitle>
        </DialogHeader>

        <div className="px-4 space-y-4">
          {/* Search Input */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search posts, people, hashtags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
                autoFocus
              />
            </div>
            <Button onClick={handleSearch} size="sm">
              Search
            </Button>
          </div>

          {/* Search Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {searchFilters.map((filter) => (
              <Badge
                key={filter.id}
                variant={searchFilter === filter.id ? "default" : "outline"}
                className={`cursor-pointer whitespace-nowrap ${
                  searchFilter === filter.id 
                    ? 'bg-purple-500 text-white' 
                    : 'hover:bg-purple-50'
                }`}
                onClick={() => setSearchFilter(filter.id)}
              >
                {filter.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Search Results/Suggestions */}
        <div className="flex-1 overflow-y-auto">
          {searchQuery ? (
            // Search Results
            <div className="p-4 space-y-4">
              <div className="text-sm text-gray-600">
                Search results for "{searchQuery}"
              </div>
              {/* This would be populated with actual search results */}
              <div className="text-center text-gray-500 py-8">
                Start typing to see results...
              </div>
            </div>
          ) : (
            // Trending & Recent
            <div className="space-y-6">
              {/* Trending Searches */}
              <div className="px-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                  <span className="font-semibold text-gray-800">Trending</span>
                </div>
                <div className="space-y-2">
                  {trendingSearches.map((trend, index) => (
                    <button
                      key={index}
                      onClick={() => handleTrendingClick(trend.query)}
                      className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <Hash className="h-4 w-4 text-purple-500" />
                        <span className="text-gray-800">{trend.query}</span>
                      </div>
                      <span className="text-xs text-gray-500">{trend.count} posts</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="px-4 border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-800">Recent</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs text-gray-500"
                    >
                      Clear all
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {recentSearches.map((recent, index) => (
                      <button
                        key={index}
                        onClick={() => handleTrendingClick(recent)}
                        className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <Search className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700">{recent}</span>
                        </div>
                        <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="px-4 border-t pt-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTrendingClick('near me')}
                    className="justify-start"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Near Me
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTrendingClick('trending')}
                    className="justify-start"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Trending
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommunitySearch;