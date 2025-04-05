
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Store, FileText, Calendar, TrendingUp, Globe, Star, Megaphone } from "lucide-react";
import AffiliateReferralCard from "@/components/dashboard/common/AffiliateReferralCard";
import { Progress } from "@/components/ui/progress";

const SalonOwnerDashboardWidgets = () => {
  const { userProfile } = useAuth();
  
  // Mock statistics - would be fetched from backend in a real implementation
  const postViews = 68;
  const localReach = 243;
  const isPremium = false;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">Salon Owner Dashboard</h2>
      
      {/* Post Reach Stats Card */}
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
                      Your offer could be shown to {localReach * 3}+ customers nearby with Premium Visibility.
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="mt-2 bg-white border-amber-200 text-amber-800 hover:bg-amber-50 w-full">
                  <Star className="h-4 w-4 mr-1 text-amber-500" /> 
                  Upgrade Visibility — $25/mo
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Post Jobs Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Plus className="h-5 w-5 text-indigo-500" />
              Post Jobs
            </CardTitle>
            <CardDescription>Find artists for your salon</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Post job listings to find qualified technicians for your salon.
            </p>
            <Button className="w-full" asChild>
              <Link to="/post/job">Post a Job</Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Staff Management Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-indigo-500" />
              Staff
            </CardTitle>
            <CardDescription>Manage your salon team</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add, remove, or update your salon staff members and their roles.
            </p>
            <Button className="w-full" asChild>
              <Link to="/salon/staff">Manage Staff</Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Affiliate Referral Card */}
        <AffiliateReferralCard />
      </div>
      
      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Salon Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Store className="h-5 w-5 text-indigo-500" />
              Salon Profile
            </CardTitle>
            <CardDescription>Manage your salon's public profile</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Update your salon's information, photos, services, and operating hours.
            </p>
            <Button className="w-full" asChild>
              <Link to="/salon/profile">Edit Salon Profile</Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Premium Features Card */}
        <Card className={isPremium ? "border-green-200" : "border-gray-200"}>
          <CardHeader className={isPremium ? "bg-gradient-to-r from-green-50 to-emerald-50" : ""}>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="h-5 w-5 text-indigo-500" />
              {isPremium ? "Premium Features" : "Visibility Options"}
            </CardTitle>
            <CardDescription>
              {isPremium ? "Your premium benefits" : "Enhance your salon's visibility"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isPremium ? (
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Premium visibility to local customers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Locked position in your area</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Targeted customer notifications</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mb-4">
                Boost your salon's visibility with premium features. Show your offers to more customers.
              </p>
            )}
            <Button className={`w-full ${isPremium ? "bg-green-600 hover:bg-green-700" : ""}`} asChild>
              <Link to={isPremium ? "/visibility/stats" : "/visibility/upgrade"}>
                {isPremium ? "View Statistics" : "Upgrade Visibility ($25/mo)"}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalonOwnerDashboardWidgets;
