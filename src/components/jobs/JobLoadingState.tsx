
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const JobLoadingState = () => {
  return (
    <div className="py-16 flex flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
      <h3 className="text-xl font-medium mb-2">Loading Job Listings</h3>
      <p className="text-gray-500 max-w-md text-center">
        We're fetching the latest job opportunities for you...
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="h-5 bg-gray-200 rounded-full w-3/4 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-full w-1/2 mb-4 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded-full w-1/3 mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded-full w-1/4 mb-4 animate-pulse"></div>
              <div className="h-20 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded-md w-full animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobLoadingState;
