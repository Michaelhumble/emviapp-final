
import { Card, CardContent } from "@/components/ui/card";
import { AreaChart, Eye, Users } from "lucide-react";

interface PostReachStatsCardProps {
  postViews: number;
  localReach: number;
  isPremium: boolean;
  loading?: boolean;
}

const PostReachStatsCard = ({ 
  postViews, 
  localReach, 
  isPremium,
  loading = false
}: PostReachStatsCardProps) => {
  if (loading) {
    return (
      <Card className="border-gray-100">
        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-gray-200 h-8 w-8 rounded-full"></div>
                  <div className="bg-gray-200 h-5 w-32 rounded"></div>
                </div>
                <div className="bg-gray-200 h-8 w-16 mt-1 rounded"></div>
                <div className="bg-gray-200 h-4 w-full mt-2 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border-gray-100">
      <CardContent className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="rounded-full bg-blue-100 p-2">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-700">Post Views</h3>
            </div>
            <p className="text-2xl font-bold">{postViews}</p>
            <p className="text-xs text-gray-500">
              {isPremium 
                ? "Premium visibility active" 
                : "Boost for more visibility"}
            </p>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="rounded-full bg-indigo-100 p-2">
                <Users className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-700">Local Reach</h3>
            </div>
            <p className="text-2xl font-bold">{localReach}</p>
            <p className="text-xs text-gray-500">Local professionals reached</p>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="rounded-full bg-purple-100 p-2">
                <AreaChart className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-700">Conversion</h3>
            </div>
            <p className="text-2xl font-bold">
              {postViews > 0 
                ? `${Math.round((localReach / postViews) * 100)}%` 
                : "0%"}
            </p>
            <p className="text-xs text-gray-500">
              Of viewers engage with posts
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostReachStatsCard;
