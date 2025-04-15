
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Scissors, Calendar, Bell, Search, Sparkles, TrendingUp, Camera, BookOpen, Award } from "lucide-react";
import AffiliateReferralCard from "@/components/dashboard/common/AffiliateReferralCard";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const ArtistDashboardWidgets = () => {
  const { userProfile, user } = useAuth();
  const [profileViews, setProfileViews] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [portfolioCount, setPortfolioCount] = useState(0);
  const [referralCount, setReferralCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Calculate profile completion percentage
  const getProfileCompletion = () => {
    if (!userProfile) return 30;
    
    let totalFields = 8;
    let completedFields = 0;
    
    if (userProfile.full_name) completedFields++;
    if (userProfile.bio) completedFields++;
    if (userProfile.specialty) completedFields++;
    if (userProfile.avatar_url) completedFields++;
    if (userProfile.instagram) completedFields++;
    if (userProfile.phone) completedFields++;
    if (userProfile.location) completedFields++;
    if (userProfile.portfolio_urls && userProfile.portfolio_urls.length > 0) completedFields++;
    
    return Math.round((completedFields / totalFields) * 100);
  };
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.id) return;
      
      setLoading(true);
      try {
        // Fetch profile views (using mock for now, as this might be tracked in analytics)
        setProfileViews(userProfile?.profile_views || Math.floor(Math.random() * 30) + 5);
        
        // Fetch portfolio items count
        if (userProfile?.portfolio_urls) {
          setPortfolioCount(userProfile.portfolio_urls.length);
        } else {
          const { data: portfolioData } = await supabase
            .from('portfolio_items')
            .select('id')
            .eq('user_id', user.id);
          
          setPortfolioCount(portfolioData?.length || 0);
        }
        
        // Fetch booking count
        const { count: bookingCountResult } = await supabase
          .from('bookings')
          .select('id', { count: 'exact', head: true })
          .eq('recipient_id', user.id);
        
        setBookingCount(bookingCountResult || 0);
        
        // Fetch referral count
        const { data: referralData } = await supabase
          .rpc('get_user_referral_stats', { user_id: user.id });
        
        if (referralData) {
          setReferralCount(Array.isArray(referralData) 
            ? referralData[0]?.referral_count || 0 
            : referralData.referral_count || 0);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user?.id, userProfile]);
  
  const profileCompletion = getProfileCompletion();
  
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
                Profile views: {loading ? "..." : profileViews} this week
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Profile Completion Card */}
      {profileCompletion < 100 && (
        <Card className="border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              Complete Your Profile
            </CardTitle>
            <CardDescription>
              Artists with complete profiles get up to 3x more client views
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Profile completion</span>
                <span className="font-medium">{profileCompletion}%</span>
              </div>
              <Progress value={profileCompletion} className="h-2" />
              
              <p className="text-xs text-muted-foreground mt-2">
                {profileCompletion < 50 
                  ? "Add your bio, specialty, and upload a profile photo" 
                  : "Add your skills and social links to complete your profile"}
              </p>
            </div>
            
            <Button size="sm" className="mt-4 w-full" asChild>
              <Link to="/profile/edit">Complete Profile</Link>
            </Button>
          </CardContent>
        </Card>
      )}
      
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
              <Camera className="h-5 w-5 text-indigo-500" />
              Portfolio
            </CardTitle>
            <CardDescription>
              {loading ? "Loading..." : `${portfolioCount} items in your portfolio`}
            </CardDescription>
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
        
        {/* Learning Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-indigo-500" />
              Learning Center
            </CardTitle>
            <CardDescription>
              {loading ? "Loading..." : `${bookingCount} bookings received`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Access tutorials, webinars, and resources to help grow your career.
            </p>
            <Button className="w-full" asChild>
              <Link to="/resources">Browse Resources</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArtistDashboardWidgets;
