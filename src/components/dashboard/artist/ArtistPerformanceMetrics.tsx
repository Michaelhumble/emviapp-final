
import { Card, CardContent } from "@/components/ui/card";
import { Eye, TrendingUp, Users, MousePointer } from "lucide-react";

interface ArtistPerformanceMetricsProps {
  profileViews: number;
}

const ArtistPerformanceMetrics = ({ profileViews }: ArtistPerformanceMetricsProps) => {
  // Mock data - in a real application these would come from props or API
  const growthPercentage = 12;
  
  return (
    <section className="mb-8">
      <h2 className="text-xl font-serif font-semibold mb-4">Profile Performance</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-blue-100 p-2">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                +{growthPercentage}% ↑
              </span>
            </div>
            <h3 className="mt-3 text-2xl font-bold">{profileViews}</h3>
            <p className="text-sm text-gray-600">Profile Views</p>
            <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-pink-100 p-2">
                <MousePointer className="h-5 w-5 text-pink-600" />
              </div>
              <span className="text-xs text-pink-600 bg-pink-100 px-2 py-1 rounded-full">
                +8% ↑
              </span>
            </div>
            <h3 className="mt-3 text-2xl font-bold">87</h3>
            <p className="text-sm text-gray-600">Link Clicks</p>
            <p className="text-xs text-gray-500 mt-1">Instagram & Website</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-purple-100 p-2">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                New
              </span>
            </div>
            <h3 className="mt-3 text-2xl font-bold">16</h3>
            <p className="text-sm text-gray-600">Saved Portfolios</p>
            <p className="text-xs text-gray-500 mt-1">Potential clients</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ArtistPerformanceMetrics;
