
import { SearchX, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobEmptyStateProps {
  searchTerm?: string;
  onClearFilters: () => void;
}

const JobEmptyState = ({ searchTerm, onClearFilters }: JobEmptyStateProps) => {
  return (
    <div className="py-16 flex flex-col items-center justify-center text-center">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <SearchX className="h-10 w-10 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-medium mb-2">
        {searchTerm ? 'No matching job listings found' : 'No job listings available'}
      </h3>
      
      <p className="text-gray-500 max-w-md mb-6">
        {searchTerm
          ? `We couldn't find any jobs matching "${searchTerm}" with your current filters.`
          : "There are currently no job listings available. Please check back later or try different filters."}
      </p>
      
      <Button 
        variant="outline" 
        onClick={onClearFilters}
        className="flex items-center"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Reset Filters
      </Button>
    </div>
  );
};

export default JobEmptyState;
