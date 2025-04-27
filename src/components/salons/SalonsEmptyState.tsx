
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

interface SalonsEmptyStateProps {
  resetFilters: () => void;
}

const SalonsEmptyState: React.FC<SalonsEmptyStateProps> = ({ resetFilters }) => {
  return (
    <div className="col-span-1 md:col-span-3 py-12 text-center">
      <div className="bg-gray-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Search className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-medium mb-3">No salons found</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        We couldn't find any salons matching your search criteria.
      </p>
      <Button 
        variant="outline" 
        onClick={resetFilters}
        className="px-6 py-2"
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default SalonsEmptyState;
