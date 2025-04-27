
import { Card, CardContent } from "@/components/ui/card";

interface SalonsLoadingStateProps {
  count?: number;
}

const SalonsLoadingState = ({ count = 6 }: SalonsLoadingStateProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="aspect-video bg-gray-200 animate-pulse" />
          <CardContent className="p-4">
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3 mb-4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-3" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
            <div className="flex gap-2 mt-4">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default SalonsLoadingState;
