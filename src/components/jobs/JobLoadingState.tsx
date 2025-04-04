
import { Skeleton } from "@/components/ui/skeleton";

const JobLoadingState = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="border rounded-lg p-6">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <div className="space-y-2 mb-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="flex gap-2 mb-4">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobLoadingState;
