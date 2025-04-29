
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { SearchIcon } from "lucide-react";

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
  setStatusFilter,
}: FilterSectionProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-5 mb-6">
      <h3 className="text-lg font-semibold mb-4">Filter Listings</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location filter */}
        <div className="relative">
          <Input
            placeholder="Location..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="pl-9"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        
        {/* Price range filter */}
        <div>
          <p className="text-sm font-medium mb-2">Price Range</p>
          <div className="px-2">
            <Slider
              defaultValue={priceRange}
              min={0}
              max={500000}
              step={10000}
              onValueChange={(value) => setPriceRange(value as [number, number])}
            />
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <span>{formatCurrency(priceRange[0])}</span>
              <span>{formatCurrency(priceRange[1])}</span>
            </div>
          </div>
        </div>
        
        {/* Size range filter */}
        <div>
          <p className="text-sm font-medium mb-2">Salon Size (sq ft)</p>
          <div className="px-2">
            <Slider
              defaultValue={sizeRange}
              min={0}
              max={5000}
              step={100}
              onValueChange={(value) => setSizeRange(value as [number, number])}
            />
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <span>{sizeRange[0]} sq ft</span>
              <span>{sizeRange[1]} sq ft</span>
            </div>
          </div>
        </div>
        
        {/* Status filter */}
        <div>
          <p className="text-sm font-medium mb-2">Listing Status</p>
          <Select 
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Listings</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="expired">Expired Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
