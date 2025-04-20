
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const BookingsLoadingState = () => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <Skeleton className="h-6 w-1/3 mb-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-24 rounded-md" />
          <Skeleton className="h-24 rounded-md" />
          <Skeleton className="h-24 rounded-md hidden md:block" />
          <Skeleton className="h-24 rounded-md hidden md:block" />
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingsLoadingState;
