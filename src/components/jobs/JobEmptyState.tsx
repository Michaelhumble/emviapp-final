
import React from "react";
import { Button } from "@/components/ui/button";
import { FileX, Search, Tag, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface JobEmptyStateProps {
  onResetFilters: () => void;
  searchTerm?: string;
}

const JobEmptyState = ({ onResetFilters, searchTerm }: JobEmptyStateProps) => {
  const suggestedTags = [
    "Weekly Pay 💰", 
    "Full-Time", 
    "Part-Time", 
    "Housing 🏠", 
    "Bao Lương ✅"
  ];
  
  const suggestedLocations = [
    "New York, NY",
    "Los Angeles, CA",
    "Houston, TX",
    "Chicago, IL",
    "Dallas, TX"
  ];

  return (
    <div className="text-center py-16 px-4">
      <div className="mb-4 flex justify-center">
        <div className="bg-gray-100 p-4 rounded-full">
          <FileX className="h-12 w-12 text-gray-400" />
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2">No job listings found</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {searchTerm 
          ? `We couldn't find any job listings matching "${searchTerm}". Try adjusting your search or browse all available jobs.`
          : "We couldn't find any job listings matching your current filters. Try adjusting your search or browse all available jobs."
        }
      </p>
      
      {/* Suggested tags */}
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-3 flex items-center justify-center">
          <Tag className="h-4 w-4 mr-1" /> Try searching with these tags:
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {suggestedTags.map(tag => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="cursor-pointer hover:bg-gray-100"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Suggested locations */}
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-3 flex items-center justify-center">
          <MapPin className="h-4 w-4 mr-1" /> Popular locations:
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {suggestedLocations.map(location => (
            <Badge 
              key={location} 
              variant="outline" 
              className="cursor-pointer hover:bg-gray-100"
            >
              {location}
            </Badge>
          ))}
        </div>
      </div>
      
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
