
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DashboardStats } from "../types/ArtistDashboardTypes";

interface PerformanceMetricsProps {
  stats: DashboardStats | null;
}

const PerformanceMetrics = ({ stats }: PerformanceMetricsProps) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Performance</CardTitle>
        <CardDescription>
          Your client satisfaction metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-full">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Rating</span>
                <span className="text-sm font-medium">
                  {stats?.average_rating?.toFixed(1) || "N/A"} / 5.0
                </span>
              </div>
              <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${((stats?.average_rating || 0) / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-full">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Repeat Clients</span>
                <span className="text-sm font-medium">
                  {stats?.repeat_client_percentage || 0}%
                </span>
              </div>
              <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${stats?.repeat_client_percentage || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
