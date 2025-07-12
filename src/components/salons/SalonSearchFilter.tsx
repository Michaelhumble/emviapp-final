import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, DollarSign, X, Filter } from 'lucide-react';

interface SalonSearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  selectedPriceRange: string;
  onPriceRangeChange: (range: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
  isSticky?: boolean;
}

const SalonSearchFilter: React.FC<SalonSearchFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedLocation,
  onLocationChange,
  selectedPriceRange,
  onPriceRangeChange,
  selectedCategory,
  onCategoryChange,
  selectedTags,
  onTagToggle,
  onClearFilters,
  isSticky = false
}) => {
  const popularTags = [
    'Recently Renovated',
    'High Revenue',
    'Shopping Center', 
    'Prime Location',
    'Celebrity Clientele',
    'High Tips',
    'Established Clientele',
    'Near Schools',
    'Tourist Area',
    'Parking Available'
  ];

  const hasActiveFilters = 
    searchQuery !== '' || 
    selectedLocation !== 'all' || 
    selectedPriceRange !== 'all' ||
    selectedCategory !== 'all' ||
    selectedTags.length > 0;

  return (
    <div className={`bg-white/95 backdrop-blur-sm border-b border-gray-200 ${isSticky ? 'md:sticky md:top-0 z-40 md:shadow-lg' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {/* Main Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search salon name, location, features..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-12 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          {/* Location Filter */}
          <div className="lg:w-48">
            <Select value={selectedLocation} onValueChange={onLocationChange}>
              <SelectTrigger className="h-12 border-gray-300 focus:border-purple-500">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="ca">California</SelectItem>
                <SelectItem value="tx">Texas</SelectItem>
                <SelectItem value="fl">Florida</SelectItem>
                <SelectItem value="ny">New York</SelectItem>
                <SelectItem value="ga">Georgia</SelectItem>
                <SelectItem value="ar">Arkansas</SelectItem>
                <SelectItem value="nv">Nevada</SelectItem>
                <SelectItem value="az">Arizona</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Filter */}
          <div className="lg:w-48">
            <Select value={selectedPriceRange} onValueChange={onPriceRangeChange}>
              <SelectTrigger className="h-12 border-gray-300 focus:border-purple-500">
                <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                <SelectValue placeholder="All Prices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-200k">Under $200K</SelectItem>
                <SelectItem value="200k-500k">$200K - $500K</SelectItem>
                <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                <SelectItem value="over-1m">Over $1M</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Filter */}
          <div className="lg:w-48">
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="h-12 border-gray-300 focus:border-purple-500">
                <Filter className="h-4 w-4 mr-2 text-gray-400" />
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="nail-tech">Nail Salons</SelectItem>
                <SelectItem value="full-service">Full Service</SelectItem>
                <SelectItem value="luxury-spa">Luxury Spa</SelectItem>
                <SelectItem value="beauty-bar">Beauty Bar</SelectItem>
                <SelectItem value="wellness-spa">Wellness Spa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="h-12 px-6 border-gray-300 hover:bg-gray-50"
            >
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>

        {/* Popular Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-600 mr-2 py-1">Popular:</span>
          {popularTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "secondary"}
              className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                selectedTags.includes(tag) 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              onClick={() => onTagToggle(tag)}
            >
              {tag}
              {selectedTags.includes(tag) && <X className="h-3 w-3 ml-1" />}
            </Badge>
          ))}
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">Active filters:</span>
              {searchQuery && (
                <Badge variant="outline" className="gap-1">
                  Search: "{searchQuery}"
                  <X className="h-3 w-3 cursor-pointer" onClick={() => onSearchChange('')} />
                </Badge>
              )}
              {selectedLocation !== 'all' && (
                <Badge variant="outline" className="gap-1">
                  Location: {selectedLocation.toUpperCase()}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => onLocationChange('all')} />
                </Badge>
              )}
              {selectedPriceRange !== 'all' && (
                <Badge variant="outline" className="gap-1">
                  Price: {selectedPriceRange}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => onPriceRangeChange('all')} />
                </Badge>
              )}
              {selectedCategory !== 'all' && (
                <Badge variant="outline" className="gap-1">
                  Category: {selectedCategory}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => onCategoryChange('all')} />
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalonSearchFilter;