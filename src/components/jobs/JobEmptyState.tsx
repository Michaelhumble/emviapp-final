
import { Button } from "@/components/ui/button";

interface JobEmptyStateProps {
  onResetFilters: () => void;
}

const JobEmptyState = ({ onResetFilters }: JobEmptyStateProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <h3 className="text-xl font-medium mb-2">No jobs found.</h3>
      <p className="text-gray-600 mb-4">Try adjusting your search criteria or check back later for new opportunities.</p>
      <Button variant="outline" onClick={onResetFilters}>Reset Filters</Button>
    </div>
  );
};

export default JobEmptyState;
