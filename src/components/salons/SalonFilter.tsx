
import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { SalonFilters } from "@/hooks/useSalonsData";

export interface SalonFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filters: SalonFilters;
  updateFilters: (filters: Partial<SalonFilters>) => void;
  resetFilters: () => void;
  suggestedKeywords: string[];
}

export const SalonFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  filters,
  updateFilters,
  resetFilters,
  suggestedKeywords
}: SalonFilterProps) => {
  const [showFilters, setShowFilters] = useState(false);

  // Locations for dropdown
  const locations = [
    { value: "all", label: "All Locations" },
    { value: "new-york", label: "New York, NY" },
    { value: "los-angeles", label: "Los Angeles, CA" },
    { value: "chicago", label: "Chicago, IL" },
    { value: "houston", label: "Houston, TX" },
    { value: "denver", label: "Denver, CO" },
    { value: "miami", label: "Miami, FL" },
    { value: "seattle", label: "Seattle, WA" },
    { value: "dallas", label: "Dallas, TX" },
    { value: "atlanta", label: "Atlanta, GA" }
  ];

  // Handle location filter changes
  const handleLocationChange = (value: string) => {
    updateFilters({ location: value });
  };

  // Handle price range changes
  const handlePriceRangeChange = (value: [number, number]) => {
    updateFilters({ priceRange: value });
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-4 mb-6 transition-all">
      <div className="space-y-4">
        {/* Search and filter toggle */}
        <div className="flex flex-col md:flex-row gap-4 mb-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by salon name, location, or features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button 
            variant="default" 
            className="bg-purple-600 hover:bg-purple-700 md:w-auto"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
        </div>
        
        {/* Advanced filters */}
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border rounded-lg p-4 mb-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Advanced Filters</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Location</label>
                <Select value={filters.location} onValueChange={handleLocationChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Locations" />
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
              
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Price Range</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs">${filters.priceRange[0].toLocaleString()}</span>
                  <Slider 
                    value={filters.priceRange}
                    max={500000} 
                    step={10000}
                    onValueChange={(value) => handlePriceRangeChange([value[0], value[1]])}
                    className="flex-1" 
                  />
                  <span className="text-xs">${filters.priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center justify-between">
                <label htmlFor="has-housing" className="text-sm text-gray-600">Has Housing</label>
                <input 
                  type="checkbox" 
                  id="has-housing" 
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                  checked={filters.hasHousing}
                  onChange={(e) => updateFilters({ hasHousing: e.target.checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="show-expired" className="text-sm text-gray-600">Show Expired</label>
                <input 
                  type="checkbox" 
                  id="show-expired" 
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                  checked={filters.showExpired}
                  onChange={(e) => updateFilters({ showExpired: e.target.checked })}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                size="sm"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
          </motion.div>
        )}
        
        {/* Popular tags */}
        <div className="flex flex-wrap gap-2">
          {suggestedKeywords.slice(0, 8).map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setSearchTerm(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalonFilter;
