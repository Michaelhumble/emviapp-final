
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Scissors, Calendar, Bell, Search } from "lucide-react";
import AffiliateReferralCard from "@/components/dashboard/common/AffiliateReferralCard";

const ArtistDashboardWidgets = () => {
  const { userProfile } = useAuth();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">Artist Dashboard</h2>
      
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
        
        {/* Bookings Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-indigo-500" />
              Bookings
            </CardTitle>
            <CardDescription>Manage your upcoming appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View, accept, or reschedule your upcoming client appointments.
            </p>
            <Button className="w-full" asChild>
              <Link to="/bookings">Manage Bookings</Link>
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
