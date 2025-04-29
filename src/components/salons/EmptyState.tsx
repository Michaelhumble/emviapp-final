
import { Button } from "@/components/ui/button";
import { SearchXIcon } from "lucide-react";

interface EmptyStateProps {
  resetFilters: () => void;
}

const EmptyState = ({ resetFilters }: EmptyStateProps) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
      <div className="bg-white p-3 rounded-full mb-4 shadow-sm">
        <SearchXIcon className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium mb-2">No matching listings found</h3>
      <p className="text-gray-500 text-center mb-6 max-w-md">
        We couldn't find any salon listings that match your current filters.
        Try adjusting your search criteria or reset all filters.
      </p>
      <Button 
        variant="outline"
        onClick={resetFilters}
      >
        Reset All Filters
      </Button>
    </div>
  );
};

export default EmptyState;
