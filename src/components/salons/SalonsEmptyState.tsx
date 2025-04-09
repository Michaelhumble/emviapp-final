
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

interface SalonsEmptyStateProps {
  resetFilters: () => void;
}

const SalonsEmptyState: React.FC<SalonsEmptyStateProps> = ({ resetFilters }) => {
  return (
    <div className="col-span-1 md:col-span-3 py-12 text-center">
      <div className="bg-gray-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="h-7 w-7 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium mb-2">No salons found</h3>
      <p className="text-gray-600 mb-4 max-w-md mx-auto">
        We couldn't find any salons matching your search criteria. Try adjusting your filters or search terms.
      </p>
      <Button variant="outline" onClick={resetFilters}>
        Clear Filters
      </Button>
    </div>
  );
};

export default SalonsEmptyState;
