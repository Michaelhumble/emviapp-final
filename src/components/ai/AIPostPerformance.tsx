
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const AIPostPerformance = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/5 pb-2">
        <CardTitle className="text-base flex items-center">
          <TrendingUp className="h-4 w-4 mr-2 text-primary" />
          Performance Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="space-y-2">
          <p className="text-sm">
            Track the performance of your posts, listings, and profile views.
          </p>
          <div className="h-24 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-xs text-gray-500">Analytics data loading...</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIPostPerformance;
