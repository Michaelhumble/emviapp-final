
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SalonFilters } from "@/types/salon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

interface SalonFilterProps {
  filters: SalonFilters;
  updateFilters: (filters: Partial<SalonFilters>) => void;
  resetFilters: () => void;
}

const SalonFilter = ({ filters, updateFilters, resetFilters }: SalonFilterProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>(filters.priceRange);
  const [searchValue, setSearchValue] = useState(filters.searchTerm);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  
  // Calculate how many active filters are set
  useEffect(() => {
    let count = 0;
    if (filters.searchTerm) count++;
    if (filters.location !== 'all') count++;
    if (filters.listingType !== 'all') count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 250000) count++;
    
    setActiveFiltersCount(count);
  }, [filters]);
  
  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  // Update search on input change with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters({ searchTerm: searchValue });
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchValue, updateFilters]);
  
  // Apply price range when slider changes
  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value);
  };
  
  const handlePriceRangeApply = () => {
    updateFilters({ priceRange });
  };
  
  const handleClearSearch = () => {
    setSearchValue('');
    updateFilters({ searchTerm: '' });
  };
  
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search input */}
        <div className="relative flex-grow">
          <Input
            placeholder="Search salons by name, location or features..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10 pr-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          {searchValue && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        {/* Filter dropdowns */}
        <div className="flex gap-3 flex-wrap sm:flex-nowrap">
          <Select
            value={filters.location}
            onValueChange={(value) => updateFilters({ location: value })}
          >
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="denver">Denver</SelectItem>
              <SelectItem value="austin">Austin</SelectItem>
              <SelectItem value="atlanta">Atlanta</SelectItem>
              <SelectItem value="chicago">Chicago</SelectItem>
              <SelectItem value="miami">Miami</SelectItem>
              <SelectItem value="new york">New York</SelectItem>
              <SelectItem value="los angeles">Los Angeles</SelectItem>
            </SelectContent>
          </Select>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full sm:w-[150px]"
              >
                Price Range
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-4">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h4 className="font-medium text-sm">Price Range</h4>
                  <div className="text-sm">
                    {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </div>
                </div>
                
                <Slider
                  min={0}
                  max={250000}
                  step={5000}
                  value={priceRange}
                  onValueChange={handlePriceRangeChange}
                  className="my-6"
                />
                
                <div className="flex justify-end">
                  <Button 
                    size="sm" 
                    onClick={handlePriceRangeApply}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Select
            value={filters.listingType}
            onValueChange={(value) => updateFilters({ listingType: value })}
          >
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Listing Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Listings</SelectItem>
              <SelectItem value="For Sale">For Sale</SelectItem>
              <SelectItem value="Booth Rental">Booth Rental</SelectItem>
              <SelectItem value="Full Salon">Full Salon</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Active filters display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500">Active filters:</span>
          {filters.searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: {filters.searchTerm}
              <button onClick={handleClearSearch}>
                <X className="h-3 w-3 ml-1" />
              </button>
            </Badge>
          )}
          
          {filters.location !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Location: {filters.location}
              <button onClick={() => updateFilters({ location: 'all' })}>
                <X className="h-3 w-3 ml-1" />
              </button>
            </Badge>
          )}
          
          {filters.listingType !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Type: {filters.listingType}
              <button onClick={() => updateFilters({ listingType: 'all' })}>
                <X className="h-3 w-3 ml-1" />
              </button>
            </Badge>
          )}
          
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 250000) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Price: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
              <button onClick={() => updateFilters({ priceRange: [0, 250000] })}>
                <X className="h-3 w-3 ml-1" />
              </button>
            </Badge>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs h-7 px-2"
            onClick={resetFilters}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default SalonFilter;
