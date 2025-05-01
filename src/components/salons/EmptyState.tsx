
import React from "react";
import { Button } from "@/components/ui/button";
import { Search, RefreshCcw } from "lucide-react";

interface EmptyStateProps {
  resetFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ resetFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="bg-purple-50 rounded-full p-5 mb-4">
        <Search className="h-8 w-8 text-purple-400" />
      </div>
      
      <h3 className="font-playfair text-xl font-semibold mb-2">No salons found</h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        We couldn't find any salons matching your current filters. Try adjusting your search criteria or reset filters to see all available options.
      </p>
      
      <Button 
        onClick={resetFilters}
        variant="outline"
        className="flex items-center border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800"
      >
        <RefreshCcw className="h-4 w-4 mr-2" />
        Reset Filters
      </Button>
    </div>
  );
};

export default EmptyState;
