
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { MapPin, DollarSign, SquareStack, Clock } from 'lucide-react';

interface FilterSectionProps {
  locationFilter: string;
  setLocationFilter: (value: string) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  sizeRange: [number, number];
  setSizeRange: (value: [number, number]) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  locationFilter,
  setLocationFilter,
  priceRange,
  setPriceRange,
  sizeRange,
  setSizeRange,
  statusFilter,
  setStatusFilter
}) => {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="font-medium text-lg mb-4">Filter Listings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location filter */}
        <div className="space-y-2">
          <Label className="flex items-center text-sm font-medium">
            <MapPin className="h-4 w-4 mr-1.5 text-gray-500" />
            Location
          </Label>
          <Input
            placeholder="City or state..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="h-9"
          />
        </div>
        
        {/* Price range filter */}
        <div className="space-y-2">
          <Label className="flex items-center text-sm font-medium">
            <DollarSign className="h-4 w-4 mr-1.5 text-gray-500" />
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </Label>
          <Slider
            defaultValue={[0, 500000]}
            min={0}
            max={500000}
            step={10000}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="py-2"
          />
        </div>
        
        {/* Size range filter */}
        <div className="space-y-2">
          <Label className="flex items-center text-sm font-medium">
            <SquareStack className="h-4 w-4 mr-1.5 text-gray-500" />
            Size (sq ft): {sizeRange[0]} - {sizeRange[1]}
          </Label>
          <Slider
            defaultValue={[0, 5000]}
            min={0}
            max={5000}
            step={100}
            value={sizeRange}
            onValueChange={(value) => setSizeRange(value as [number, number])}
            className="py-2"
          />
        </div>
        
        {/* Listing status filter */}
        <div className="space-y-2">
          <Label className="flex items-center text-sm font-medium">
            <Clock className="h-4 w-4 mr-1.5 text-gray-500" />
            Status
          </Label>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active Listings</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
