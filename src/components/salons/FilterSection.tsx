
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

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

const FilterSection = ({
  locationFilter,
  setLocationFilter,
  priceRange,
  setPriceRange,
  sizeRange,
  setSizeRange,
  statusFilter,
  setStatusFilter
}: FilterSectionProps) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-medium mb-4">Smart Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="text-sm text-gray-600 block mb-1">Location</label>
          <Input 
            placeholder="Any location..." 
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="text-sm text-gray-600 block mb-1">Price Range</label>
          <div className="flex items-center gap-2">
            <span className="text-xs">${priceRange[0].toLocaleString()}</span>
            <Slider 
              defaultValue={[0, 500000]} 
              max={500000} 
              step={10000}
              onValueChange={(value) => setPriceRange([value[0], value[1]])}
              className="flex-1" 
            />
            <span className="text-xs">${priceRange[1].toLocaleString()}</span>
          </div>
        </div>
        
        <div>
          <label className="text-sm text-gray-600 block mb-1">Size (sqft)</label>
          <div className="flex items-center gap-2">
            <span className="text-xs">{sizeRange[0]}</span>
            <Slider 
              defaultValue={[0, 5000]} 
              max={5000} 
              step={100}
              onValueChange={(value) => setSizeRange([value[0], value[1]])}
              className="flex-1" 
            />
            <span className="text-xs">{sizeRange[1]}</span>
          </div>
        </div>
        
        <div>
          <label className="text-sm text-gray-600 block mb-1">Status</label>
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
