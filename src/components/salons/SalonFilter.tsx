
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { SalonFilters } from './types';

export interface SalonFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: SalonFilters;
  updateFilters: (filters: Partial<SalonFilters>) => void;
  resetFilters: () => void;
  suggestedKeywords: string[];
}

const SalonFilter = ({
  searchTerm,
  setSearchTerm,
  filters,
  updateFilters,
  resetFilters,
  suggestedKeywords = []
}: SalonFilterProps) => {
  const [priceRange, setPriceRange] = useState<number[]>(filters.priceRange || [0, 1000000]);
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    updateFilters({ priceRange: value });
  };
  
  const handleCategoryChange = (category: string) => {
    updateFilters({ category });
  };
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ location: e.target.value });
  };
  
  const handleFeatureToggle = (feature: string) => {
    const currentFeatures = [...filters.features];
    const index = currentFeatures.indexOf(feature);
    
    if (index > -1) {
      currentFeatures.splice(index, 1);
    } else {
      currentFeatures.push(feature);
    }
    
    updateFilters({ features: currentFeatures });
  };
  
  const handleSortChange = (sortBy: string) => {
    updateFilters({ sortBy });
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleKeywordClick = (keyword: string) => {
    setSearchTerm(keyword);
  };
  
  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div>
        <Label htmlFor="search" className="text-base font-medium mb-2 block">
          Search Salons
        </Label>
        <Input 
          id="search" 
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by salon name, location, etc."
          className="mb-2"
        />
        
        {/* Suggested Keywords */}
        {suggestedKeywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {suggestedKeywords.map((keyword) => (
              <Button 
                key={keyword}
                variant="outline" 
                size="sm"
                onClick={() => handleKeywordClick(keyword)}
                className="text-xs"
              >
                {keyword}
              </Button>
            ))}
          </div>
        )}
      </div>
      
      {/* Price Range Filter */}
      <div>
        <Label className="text-base font-medium mb-2 block">
          Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
        </Label>
        <Slider 
          defaultValue={priceRange} 
          min={0} 
          max={1000000} 
          step={5000}
          onValueChange={handlePriceChange}
          className="mb-2"
        />
      </div>
      
      {/* Categories */}
      <div>
        <Label className="text-base font-medium mb-2 block">
          Salon Type
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {['Nail Salon', 'Hair Salon', 'Day Spa', 'Barbershop'].map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox 
                id={`category-${category}`}
                checked={filters.category === category}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label htmlFor={`category-${category}`} className="text-sm font-normal">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Location */}
      <div>
        <Label htmlFor="location" className="text-base font-medium mb-2 block">
          Location
        </Label>
        <Input 
          id="location"
          value={filters.location}
          onChange={handleLocationChange}
          placeholder="City, state, or zip code"
        />
      </div>
      
      {/* Features */}
      <div>
        <Label className="text-base font-medium mb-2 block">
          Features
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {['Has Housing', 'Wax Room', 'Dining Room', 'Laundry'].map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox 
                id={`feature-${feature}`}
                checked={filters.features.includes(feature)}
                onCheckedChange={() => handleFeatureToggle(feature)}
              />
              <Label htmlFor={`feature-${feature}`} className="text-sm font-normal">
                {feature}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Sort By */}
      <div>
        <Label className="text-base font-medium mb-2 block">
          Sort By
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {['Newest', 'Price: Low to High', 'Price: High to Low'].map((sortOption) => (
            <div key={sortOption} className="flex items-center space-x-2">
              <Checkbox 
                id={`sort-${sortOption}`}
                checked={filters.sortBy === sortOption}
                onCheckedChange={() => handleSortChange(sortOption)}
              />
              <Label htmlFor={`sort-${sortOption}`} className="text-sm font-normal">
                {sortOption}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Reset Button */}
      <Button 
        onClick={resetFilters} 
        variant="outline" 
        className="w-full"
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default SalonFilter;
