
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SalonFilterProps {
  searchTerm: string;
  locationFilter: string;
  priceFilter: string;
  setSearchTerm: (value: string) => void;
  setLocationFilter: (value: string) => void;
  setPriceFilter: (value: string) => void;
}

export const SalonFilter = ({ 
  searchTerm, 
  locationFilter, 
  priceFilter, 
  setSearchTerm, 
  setLocationFilter, 
  setPriceFilter 
}: SalonFilterProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="flex-grow">
        <Input
          placeholder="Search by name, location, or keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="w-full md:w-48">
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="tx">Texas</SelectItem>
            <SelectItem value="ca">California</SelectItem>
            <SelectItem value="fl">Florida</SelectItem>
            <SelectItem value="ga">Georgia</SelectItem>
            <SelectItem value="il">Illinois</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full md:w-48">
        <Select value={priceFilter} onValueChange={setPriceFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="under100k">Under $100K</SelectItem>
            <SelectItem value="100k-200k">$100K - $200K</SelectItem>
            <SelectItem value="over200k">Over $200K</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
