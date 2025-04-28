
import React from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SalonFilter from "./SalonFilter";
import { SalonFilters } from "@/hooks/useSalonsData";

interface SalonFilterDrawerProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: SalonFilters;
  updateFilters: (filters: Partial<SalonFilters>) => void;
  resetFilters: () => void;
  suggestedKeywords?: string[];
}

export const SalonFilterDrawer = ({
  searchTerm,
  setSearchTerm,
  filters,
  updateFilters,
  resetFilters,
  suggestedKeywords = [],
}: SalonFilterDrawerProps) => {
  // Count active filters (excluding empty ones)
  const getActiveFilterCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (filters.category) count++;
    if (filters.location) count++;
    if (filters.features && filters.features.length > 0) count++;
    if (filters.priceRange && 
        (filters.priceRange[0] > 0 || filters.priceRange[1] < 500000)) count++;
    
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="relative">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-purple-600 text-white"
            >
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh] overflow-y-auto px-4 py-6">
        <div className="max-w-md mx-auto">
          <h3 className="font-playfair font-semibold text-xl mb-6">Filter Salons</h3>
          <SalonFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filters={filters}
            updateFilters={updateFilters}
            resetFilters={resetFilters}
            suggestedKeywords={suggestedKeywords}
          />
          <div className="mt-4 flex justify-end">
            <Button 
              variant="default"
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={() => document.querySelector('.drawer-close')?.dispatchEvent(new MouseEvent('click'))}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
