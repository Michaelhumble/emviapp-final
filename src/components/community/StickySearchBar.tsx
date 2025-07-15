import React, { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import CommunitySearch from './CommunitySearch';

interface StickySearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: any) => void;
  currentFilter: string;
  scrolled: boolean;
}

const StickySearchBar: React.FC<StickySearchBarProps> = ({
  onSearch,
  onFilterChange,
  currentFilter,
  scrolled
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const quickFilters = [
    { id: 'all', label: 'For You', trending: true },
    { id: 'trending', label: 'Trending', trending: true },
    { id: 'recent', label: 'Recent', trending: false },
    { id: 'nails', label: 'Nails', trending: false },
    { id: 'hair', label: 'Hair', trending: false },
    { id: 'makeup', label: 'Makeup', trending: false },
  ];

  const trendingTags = [
    '#nail-art-2024',
    '#lash-extensions',
    '#hair-color-trends',
    '#skincare-routine',
    '#makeup-transformation'
  ];

  const recentSearches = [
    'nail art inspiration',
    'hair color trends',
    'lash extensions tips',
    'skincare routine'
  ];

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <motion.div
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100' 
          : 'bg-transparent'
      }`}
      initial={false}
      animate={{ y: 0 }}
    >
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <CommunitySearch
              onSearch={(query, results) => handleSearchChange(query)}
              placeholder="Search posts, users, hashtags..."
            />
          </div>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={`min-w-[44px] ${showFilters ? 'bg-purple-50 border-purple-200' : ''}`}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Filters Row */}
        <motion.div
          className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {quickFilters.map((filter) => (
            <Badge
              key={filter.id}
              variant={currentFilter === filter.id ? "default" : "outline"}
              className={`cursor-pointer whitespace-nowrap px-3 py-2 min-h-[36px] flex items-center gap-2 touch-manipulation transition-all duration-200 ${
                currentFilter === filter.id 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                  : 'hover:bg-purple-50 hover:border-purple-200'
              }`}
              onClick={() => onFilterChange(filter.id)}
            >
              {filter.trending && <TrendingUp className="h-3 w-3" />}
              {filter.label}
            </Badge>
          ))}
        </motion.div>

        {/* Advanced Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <Card className="mt-3 border-0 shadow-sm bg-gray-50/50">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Post Type Filter */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Post Type
                      </label>
                      <Select>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="All types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="story">Stories</SelectItem>
                          <SelectItem value="tip">Pro Tips</SelectItem>
                          <SelectItem value="showcase">Showcases</SelectItem>
                          <SelectItem value="question">Questions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Time Filter */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Time Range
                      </label>
                      <Select>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="All time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Time</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sort By */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Sort By
                      </label>
                      <Select>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Relevance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relevance">Relevance</SelectItem>
                          <SelectItem value="recent">Most Recent</SelectItem>
                          <SelectItem value="popular">Most Popular</SelectItem>
                          <SelectItem value="trending">Trending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Trending Hashtags */}
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium text-gray-700">Trending Hashtags</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {trendingTags.map((tag) => (
                        <Button
                          key={tag}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSearchChange(tag)}
                          className="text-xs bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Recent Searches</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((search) => (
                          <Button
                            key={search}
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSearchChange(search)}
                            className="text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                          >
                            {search}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default StickySearchBar;