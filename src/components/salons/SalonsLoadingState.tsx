
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface SalonsLoadingStateProps {
  count?: number;
}

const SalonsLoadingState: React.FC<SalonsLoadingStateProps> = ({ count = 6 }) => {
  return (
    <>
      {Array(count).fill(0).map((_, i) => (
        <Card key={i} className="overflow-hidden border border-gray-100">
          <CardContent className="p-0">
            <div className="h-48 bg-gray-100 animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-5 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2" />
              <div className="h-8 bg-gray-100 rounded animate-pulse mt-4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default SalonsLoadingState;
