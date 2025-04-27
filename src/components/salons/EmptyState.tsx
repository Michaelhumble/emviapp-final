
import { Button } from "@/components/ui/button";

const EmptyState = () => {
  return (
    <div className="col-span-2 py-8 text-center">
      <p className="text-gray-500">No salons match your filters. Try adjusting your criteria.</p>
      <Button variant="outline" className="mt-4">Reset Filters</Button>
    </div>
  );
};

export default EmptyState;
