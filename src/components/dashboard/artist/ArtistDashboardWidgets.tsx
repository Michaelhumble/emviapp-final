
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Scissors, Calendar, Bell, Search, Sparkles, TrendingUp } from "lucide-react";
import AffiliateReferralCard from "@/components/dashboard/common/AffiliateReferralCard";

const ArtistDashboardWidgets = () => {
  const { userProfile } = useAuth();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">Artist Dashboard</h2>
      
      {/* Motivational Message Banner */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100">
        <CardContent className="py-6">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="h-6 w-6 text-indigo-500" />
            <h3 className="text-lg font-medium text-indigo-900">Your Artistry Matters!</h3>
          </div>
          <p className="text-indigo-700">
            Your talent deserves to be seen. Complete your profile and showcase your best work to connect with clients looking for your unique style.
          </p>
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-green-700">
                Profile views: {userProfile?.profile_views || 0} this week
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Find Jobs Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Search className="h-5 w-5 text-indigo-500" />
              Find Jobs
            </CardTitle>
            <CardDescription>Discover local job opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Browse jobs from salons in your area seeking experienced nail technicians.
            </p>
            <Button className="w-full" asChild>
              <Link to="/jobs">View Job Listings</Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Post Your Job CTA Card */}
        <Card className="border-indigo-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-lg">
              <PlusCircle className="h-5 w-5 text-indigo-600" />
              Post Your Job
            </CardTitle>
            <CardDescription className="font-medium text-indigo-700">
              First-time post only $5!
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Looking for a new opportunity? Post your job request and get seen by salon owners in your area.
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700" asChild>
              <Link to="/post/job">Post a Job Request</Link>
            </Button>
          </CardFooter>
        </Card>
        
        {/* Affiliate Referral Card */}
        <AffiliateReferralCard />
      </div>
      
      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Portfolio Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Scissors className="h-5 w-5 text-indigo-500" />
              Portfolio
            </CardTitle>
            <CardDescription>Showcase your best work</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Upload photos of your best work to attract new clients and opportunities.
            </p>
            <Button className="w-full" asChild>
              <Link to="/portfolio">Manage Portfolio</Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Notifications Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell className="h-5 w-5 text-indigo-500" />
              Notifications
            </CardTitle>
            <CardDescription>Stay updated on important events</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Receive alerts for new job opportunities, booking requests, and more.
            </p>
            <Button className="w-full" asChild>
              <Link to="/notifications">View Notifications</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArtistDashboardWidgets;
