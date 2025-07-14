import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, MapPin, Clock, Users, TrendingUp, X, Sliders } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface SearchFilters {
  query: string;
  category: string;
  postType: string;
  userType: string;
  location: string;
  timeRange: string;
  popularity: number[];
  tags: string[];
}

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filters: SearchFilters) => void;
  initialQuery?: string;
}

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'nails', label: 'Nails 💅' },
  { value: 'hair', label: 'Hair 💇‍♀️' },
  { value: 'makeup', label: 'Makeup 💄' },
  { value: 'skincare', label: 'Skincare ✨' },
  { value: 'lashes', label: 'Lashes 👁️' },
  { value: 'brows', label: 'Brows 🎯' },
  { value: 'massage', label: 'Massage 💆‍♀️' },
  { value: 'tattoo', label: 'Tattoo 🎨' },
  { value: 'barber', label: 'Barber ✂️' },
];

const postTypes = [
  { value: 'all', label: 'All Posts' },
  { value: 'story', label: '📸 Stories' },
  { value: 'tip', label: '💡 Pro Tips' },
  { value: 'showcase', label: '✨ Showcases' },
  { value: 'question', label: '❓ Questions' },
  { value: 'poll', label: '📊 Polls' },
];

const userTypes = [
  { value: 'all', label: 'All Users' },
  { value: 'artist', label: '🎨 Artists' },
  { value: 'salon_owner', label: '🏪 Salon Owners' },
  { value: 'customer', label: '👤 Customers' },
  { value: 'student', label: '📚 Students' },
];

const timeRanges = [
  { value: 'all', label: 'All Time' },
  { value: '1h', label: 'Last Hour' },
  { value: '24h', label: 'Last 24 Hours' },
  { value: '7d', label: 'Last Week' },
  { value: '30d', label: 'Last Month' },
  { value: '90d', label: 'Last 3 Months' },
];

const popularTags = [
  'nail-art', 'hair-color', 'makeup-transformation', 'skincare-routine',
  'lash-extensions', 'brow-shaping', 'massage-therapy', 'tattoo-design',
  'beard-styling', 'hair-cutting', 'color-theory', 'client-experience'
];

const popularLocations = [
  'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX',
  'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA',
  'Dallas, TX', 'San Jose, CA', 'Austin, TX', 'Jacksonville, FL'
];

const AdvancedSearchModal = ({ isOpen, onClose, onSearch, initialQuery = '' }: AdvancedSearchModalProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: initialQuery,
    category: 'all',
    postType: 'all',
    userType: 'all',
    location: '',
    timeRange: 'all',
    popularity: [0],
    tags: [],
  });

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setFilters(prev => ({ ...prev, query: initialQuery }));
  }, [initialQuery]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const addTag = (tag: string) => {
    if (!filters.tags.includes(tag)) {
      handleFilterChange('tags', [...filters.tags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    handleFilterChange('tags', filters.tags.filter(t => t !== tag));
  };

  const handleSearch = () => {
    onSearch(filters);
    onClose();
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      category: 'all',
      postType: 'all',
      userType: 'all',
      location: '',
      timeRange: 'all',
      popularity: [0],
      tags: [],
    });
  };

  const hasActiveFilters = filters.category !== 'all' || 
                          filters.postType !== 'all' || 
                          filters.userType !== 'all' || 
                          filters.location !== '' || 
                          filters.timeRange !== 'all' || 
                          filters.popularity[0] > 0 || 
                          filters.tags.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-purple-600" />
            Advanced Search
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search Query */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Search Term</label>
            <Input
              placeholder="What are you looking for?"
              value={filters.query}
              onChange={(e) => handleFilterChange('query', e.target.value)}
              className="text-base"
            />
          </div>

          {/* Quick Search Tags */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Popular Tags</label>
            <div className="flex flex-wrap gap-2">
              {popularTags.map(tag => (
                <Badge
                  key={tag}
                  variant={filters.tags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    filters.tags.includes(tag)
                      ? 'bg-purple-500 text-white'
                      : 'hover:bg-purple-50'
                  }`}
                  onClick={() => filters.tags.includes(tag) ? removeTag(tag) : addTag(tag)}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Selected Tags */}
          {filters.tags.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Selected Tags</label>
              <div className="flex flex-wrap gap-2">
                {filters.tags.map(tag => (
                  <Badge
                    key={tag}
                    className="bg-purple-500 text-white pr-1"
                  >
                    #{tag}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTag(tag)}
                      className="h-4 w-4 ml-1 p-0 hover:bg-purple-600"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Toggle Advanced Filters */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full"
          >
            <Sliders className="h-4 w-4 mr-2" />
            {showFilters ? 'Hide' : 'Show'} Advanced Filters
            {hasActiveFilters && (
              <Badge className="ml-2 bg-purple-500 text-white">
                {[filters.category !== 'all', filters.postType !== 'all', filters.userType !== 'all', 
                  filters.location !== '', filters.timeRange !== 'all', filters.popularity[0] > 0]
                  .filter(Boolean).length}
              </Badge>
            )}
          </Button>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Post Type Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Post Type</label>
                <Select value={filters.postType} onValueChange={(value) => handleFilterChange('postType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {postTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* User Type Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">User Type</label>
                <Select value={filters.userType} onValueChange={(value) => handleFilterChange('userType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {userTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Location
                </label>
                <Input
                  placeholder="Enter city, state, or zip code"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                />
                <div className="flex flex-wrap gap-1 mt-2">
                  {popularLocations.slice(0, 6).map(location => (
                    <Badge
                      key={location}
                      variant="outline"
                      className="cursor-pointer text-xs hover:bg-purple-50"
                      onClick={() => handleFilterChange('location', location)}
                    >
                      {location}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Time Range Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Time Range
                </label>
                <Select value={filters.timeRange} onValueChange={(value) => handleFilterChange('timeRange', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeRanges.map(range => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Popularity Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  Minimum Popularity
                </label>
                <div className="px-3">
                  <Slider
                    value={filters.popularity}
                    onValueChange={(value) => handleFilterChange('popularity', value)}
                    max={1000}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0 likes</span>
                    <span className="font-medium">{filters.popularity[0]}+ likes</span>
                    <span>1000+ likes</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleSearch}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedSearchModal;