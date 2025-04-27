
import { Button } from "@/components/ui/button";

export interface EmptyStateProps {
  resetFilters: () => void;
}

const EmptyState = ({ resetFilters }: EmptyStateProps) => {
  return (
    <div className="col-span-2 py-8 text-center">
      <p className="text-gray-500">No salons match your filters. Try adjusting your criteria.</p>
      <Button variant="outline" className="mt-4" onClick={resetFilters}>Reset Filters</Button>
    </div>
  );
};

export default EmptyState;
