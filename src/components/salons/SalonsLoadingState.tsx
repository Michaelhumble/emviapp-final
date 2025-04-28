
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

interface SalonsLoadingStateProps {
  count?: number;
}

const SalonsLoadingState: React.FC<SalonsLoadingStateProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-0">
            {/* Image skeleton */}
            <Skeleton className="h-48 w-full" />
            
            <div className="p-4">
              {/* Title skeleton */}
              <Skeleton className="h-6 w-3/4 mb-2" />
              
              {/* Location skeleton */}
              <Skeleton className="h-4 w-1/2 mb-2" />
              
              {/* Price skeleton */}
              <Skeleton className="h-5 w-1/3 mb-3" />
              
              {/* Description skeleton */}
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              
              {/* Button skeleton */}
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SalonsLoadingState;
