
import React from "react";
import { Button } from "@/components/ui/button";
import { Search, RefreshCcw } from "lucide-react";

interface SalonsEmptyStateProps {
  resetFilters: () => void;
}

const SalonsEmptyState: React.FC<SalonsEmptyStateProps> = ({ resetFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-gray-100 rounded-full p-4 mb-4">
        <Search className="h-8 w-8 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">No salons found</h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        We couldn't find any salons matching your current filters. Try adjusting your search criteria or reset filters to see all available options.
      </p>
      
      <Button 
        onClick={resetFilters}
        variant="outline"
        className="flex items-center"
      >
        <RefreshCcw className="h-4 w-4 mr-2" />
        Reset Filters
      </Button>
    </div>
  );
};

export default SalonsEmptyState;
