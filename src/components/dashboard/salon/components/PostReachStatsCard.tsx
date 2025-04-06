
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TrendingUp, Megaphone, Star } from "lucide-react";

interface PostReachStatsCardProps {
  postViews: number;
  localReach: number;
  isPremium: boolean;
}

const PostReachStatsCard = ({ postViews, localReach, isPremium }: PostReachStatsCardProps) => {
  return (
    <Card className="bg-white border">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-indigo-500" />
          Post & Offer Reach
        </CardTitle>
        <CardDescription>How your salon is performing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Post Views</span>
              <span className="text-sm font-medium">{postViews}</span>
            </div>
            <Progress value={postViews > 100 ? 100 : postViews} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Local Customer Reach</span>
              <span className="text-sm font-medium">{localReach}</span>
            </div>
            <Progress value={localReach > 300 ? 100 : (localReach / 3)} className="h-2" />
          </div>
          
          {!isPremium && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-lg mt-2 border border-amber-100">
              <div className="flex items-start gap-2">
                <Megaphone className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">
                    Unlock Premium Visibility
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    Your salon could be shown to {localReach * 3}+ customers nearby with Premium Visibility.
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="mt-2 bg-white border-amber-200 text-amber-800 hover:bg-amber-50 w-full" asChild>
                <Link to="/visibility/upgrade">
                  <Star className="h-4 w-4 mr-1 text-amber-500" /> 
                  Upgrade Visibility — $25/mo
                </Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostReachStatsCard;
