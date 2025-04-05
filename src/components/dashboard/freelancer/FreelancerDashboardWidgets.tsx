
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Camera, Calendar, Bell, Search, CheckCircle, DollarSign, Briefcase, ListChecks, Users } from "lucide-react";
import AffiliateReferralCard from "@/components/dashboard/common/AffiliateReferralCard";
import { Progress } from "@/components/ui/progress";

const FreelancerDashboardWidgets = () => {
  const { userProfile } = useAuth();
  
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
    if (userProfile.skills && userProfile.skills.length > 0) completedFields++;
    
    return Math.round((completedFields / totalFields) * 100);
  };
  
  const profileCompletion = getProfileCompletion();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">Freelancer Dashboard</h2>
      
      {/* Growth Opportunity Banner */}
      <Card className="bg-gradient-to-r from-sky-50 to-blue-50 border-sky-100">
        <CardContent className="py-6">
          <div className="flex items-center gap-3 mb-3">
            <DollarSign className="h-6 w-6 text-sky-500" />
            <h3 className="text-lg font-medium text-sky-900">Grow Your Client Base</h3>
          </div>
          <p className="text-sky-700">
            Freelancers who list their services on EmviApp see an average of 40% growth in their client base within 3 months.
            Set up your service menu today!
          </p>
          <div className="mt-4">
            <Button className="bg-sky-600 hover:bg-sky-700" asChild>
              <Link to="/services/setup">Set Up Services</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Service Setup Card */}
      <Card className="border-sky-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-sky-500" />
            Service Menu Setup
          </CardTitle>
          <CardDescription>
            Clients are looking for your services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Service menu completion</span>
              <span className="font-medium">{profileCompletion > 50 ? 20 : 0}%</span>
            </div>
            <Progress value={profileCompletion > 50 ? 20 : 0} className="h-2" />
            
            <p className="text-xs text-muted-foreground mt-2">
              Add your services and pricing to help clients find and book you
            </p>
          </div>
          
          <Button size="sm" className="mt-4 w-full bg-sky-600 hover:bg-sky-700" asChild>
            <Link to="/services/setup">Add Services</Link>
          </Button>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Find Gigs Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Briefcase className="h-5 w-5 text-sky-500" />
              Find Gigs
            </CardTitle>
            <CardDescription>Discover freelance opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Browse gigs and freelance opportunities in your area.
            </p>
            <Button className="w-full" asChild>
              <Link to="/gigs">View Gig Listings</Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Availability Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-sky-500" />
              Your Availability
            </CardTitle>
            <CardDescription>Manage your working hours</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Set your availability to make it easier for clients to book you.
            </p>
            <Button className="w-full" asChild>
              <Link to="/availability">Set Availability</Link>
            </Button>
          </CardContent>
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
              <Camera className="h-5 w-5 text-sky-500" />
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
        
        {/* Client Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-sky-500" />
              Client Management
            </CardTitle>
            <CardDescription>Organize your client relationships</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Track client history, preferences, and communications.
            </p>
            <Button className="w-full" asChild>
              <Link to="/clients">Manage Clients</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FreelancerDashboardWidgets;
