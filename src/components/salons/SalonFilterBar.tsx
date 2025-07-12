import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, X, MapPin, DollarSign } from 'lucide-react';

interface SalonFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  selectedPriceRange: string;
  onPriceRangeChange: (range: string) => void;
  onClearFilters: () => void;
  className?: string;
}

const SalonFilterBar: React.FC<SalonFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedLocation,
  onLocationChange,
  selectedPriceRange,
  onPriceRangeChange,
  onClearFilters,
  className = ""
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const popularSearches = [
    "High Revenue",
    "Recently Renovated", 
    "Prime Location",
    "Established Clientele",
    "Luxury Equipment",
    "Shopping Center"
  ];

  const locations = [
    { value: "all", label: "All Locations" },
    { value: "california", label: "California" },
    { value: "texas", label: "Texas" },
    { value: "florida", label: "Florida" },
    { value: "new-york", label: "New York" },
    { value: "nevada", label: "Nevada" }
  ];

  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "under-200k", label: "Under $200K" },
    { value: "200k-500k", label: "$200K - $500K" },
    { value: "500k-1m", label: "$500K - $1M" },
    { value: "over-1m", label: "Over $1M" }
  ];

  const hasActiveFilters = searchQuery || selectedLocation !== "all" || selectedPriceRange !== "all";

  return (
    <div className={`sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Main Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search by salon name, city, or features..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          {/* Location Filter */}
          <div className="w-full md:w-48">
            <Select value={selectedLocation} onValueChange={onLocationChange}>
              <SelectTrigger className="h-12">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Filter */}
          <div className="w-full md:w-48">
            <Select value={selectedPriceRange} onValueChange={onPriceRangeChange}>
              <SelectTrigger className="h-12">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filter Toggle & Clear */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="h-12"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="lg"
                onClick={onClearFilters}
                className="h-12"
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Popular Searches */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-500 mr-2">Popular:</span>
          {popularSearches.map((search) => (
            <Badge
              key={search}
              variant="outline"
              className="cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onSearchChange(search)}
            >
              {search}
            </Badge>
          ))}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500 mr-2">Active filters:</span>
            
            {searchQuery && (
              <Badge className="bg-purple-100 text-purple-800">
                Search: "{searchQuery}"
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => onSearchChange("")}
                />
              </Badge>
            )}
            
            {selectedLocation !== "all" && (
              <Badge className="bg-blue-100 text-blue-800">
                Location: {locations.find(l => l.value === selectedLocation)?.label}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => onLocationChange("all")}
                />
              </Badge>
            )}
            
            {selectedPriceRange !== "all" && (
              <Badge className="bg-green-100 text-green-800">
                Price: {priceRanges.find(p => p.value === selectedPriceRange)?.label}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => onPriceRangeChange("all")}
                />
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalonFilterBar;