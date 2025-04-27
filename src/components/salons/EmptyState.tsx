
import { Button } from "@/components/ui/button";
import { Search, RefreshCw } from "lucide-react";

interface EmptyStateProps {
  resetFilters: () => void;
}

const EmptyState = ({ resetFilters }: EmptyStateProps) => {
  return (
    <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <Search className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="font-playfair text-xl font-semibold mb-2">No salons found</h3>
      <p className="text-gray-600 max-w-md mb-6">
        We couldn't find any salons matching your current filters. Try adjusting your search criteria or browse all listings.
      </p>
      <Button onClick={resetFilters} className="flex items-center">
        <RefreshCw className="h-4 w-4 mr-2" />
        Reset Filters
      </Button>
    </div>
  );
};

export default EmptyState;
