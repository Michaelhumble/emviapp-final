
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const ArtistProfileLoading: React.FC = () => {
  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile header loading state */}
        <div className="w-full md:w-1/3">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <Skeleton className="h-32 w-32 rounded-full mb-4" />
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-32 mb-6" />
                <div className="space-y-2 w-full">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content loading state */}
        <div className="w-full md:w-2/3">
          <Skeleton className="h-8 w-40 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {Array(4).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-md" />
            ))}
          </div>
          
          <Skeleton className="h-8 w-40 mb-4" />
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfileLoading;
