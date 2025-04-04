
import React from "react";
import { Button } from "@/components/ui/button";
import { FileX } from "lucide-react";

interface JobEmptyStateProps {
  onResetFilters: () => void;
}

const JobEmptyState = ({ onResetFilters }: JobEmptyStateProps) => {
  return (
    <div className="text-center py-16 px-4">
      <div className="mb-4 flex justify-center">
        <div className="bg-gray-100 p-4 rounded-full">
          <FileX className="h-12 w-12 text-gray-400" />
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2">No job listings found</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        We couldn't find any job listings matching your current filters. Try adjusting your search or browse all available jobs.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={onResetFilters} variant="outline">
          Clear filters
        </Button>
        <Button>
          Post a job
        </Button>
      </div>
    </div>
  );
};

export default JobEmptyState;
