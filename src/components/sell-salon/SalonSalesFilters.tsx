
import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SortOption = "newest" | "lowest_price" | "highest_price" | "featured_first";
type BusinessTypeFilter = "all" | "Hair" | "Nails" | "Spa" | "Barbershop" | "Other";

interface FilterState {
  searchTerm: string;
  businessType: BusinessTypeFilter;
  priceRange: {
    min: string;
    max: string;
  };
  sortBy: SortOption;
}

interface SalonSalesFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
}

export const SalonSalesFilters = ({ filters, onFilterChange }: SalonSalesFiltersProps) => {
  const businessTypes = [
    { value: "all", label: "All Business Types" },
    { value: "Hair", label: "Hair Salon" },
    { value: "Nails", label: "Nail Salon" },
    { value: "Spa", label: "Spa" },
    { value: "Barbershop", label: "Barbershop" },
    { value: "Other", label: "Other" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "lowest_price", label: "Lowest Price" },
    { value: "highest_price", label: "Highest Price" },
    { value: "featured_first", label: "Featured First" },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ searchTerm: e.target.value });
  };

  const handleBusinessTypeChange = (value: string) => {
    onFilterChange({ businessType: value as BusinessTypeFilter });
  };

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      priceRange: {
        ...filters.priceRange,
        min: e.target.value,
      },
    });
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      priceRange: {
        ...filters.priceRange,
        max: e.target.value,
      },
    });
  };

  const handleSortChange = (value: string) => {
    onFilterChange({ sortBy: value as SortOption });
  };

  const getCurrentSortLabel = () => {
    return sortOptions.find(option => option.value === filters.sortBy)?.label || "Sort By";
  };

  return (
    <div className="mb-8 bg-white rounded-xl shadow-sm p-4 sticky top-20 z-10 border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Box */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by city, name or description..."
            className="pl-10"
            value={filters.searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Business Type Filter */}
        <div>
          <Select value={filters.businessType} onValueChange={handleBusinessTypeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Business Type" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {businessTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="flex space-x-2">
          <Input
            type="number"
            placeholder="Min $"
            value={filters.priceRange.min}
            onChange={handlePriceMinChange}
            className="w-1/2"
            min="0"
          />
          <Input
            type="number"
            placeholder="Max $"
            value={filters.priceRange.max}
            onChange={handlePriceMaxChange}
            className="w-1/2"
            min="0"
          />
        </div>

        {/* Sort Options */}
        <div>
          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
