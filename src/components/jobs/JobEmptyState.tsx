
import { SearchX, RefreshCw, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
      
      <h3 className="font-playfair text-xl font-semibold mb-2 text-gray-900">
        {searchTerm ? 'No matching job listings found' : 'No job listings available'}
      </h3>
      
      <p className="text-gray-500 max-w-md mb-6 font-inter">
        {searchTerm
          ? `We couldn't find any jobs matching "${searchTerm}" with your current filters.`
          : "There are currently no job listings available. Be the first to post a job opportunity!"}
      </p>
      
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={onClearFilters}
          className="flex items-center font-inter font-medium"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset Filters
        </Button>
        
        <Link to="/post-job">
          <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-inter font-semibold rounded-xl px-6 py-3">
            <Plus className="mr-2 h-4 w-4" />
            Post a Job
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default JobEmptyState;
