
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Store, FileText, Calendar } from "lucide-react";
import AffiliateReferralCard from "@/components/dashboard/common/AffiliateReferralCard";

const SalonOwnerDashboardWidgets = () => {
  const { userProfile } = useAuth();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">Salon Owner Dashboard</h2>
      
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
        
        {/* Bookings Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-indigo-500" />
              Bookings
            </CardTitle>
            <CardDescription>Manage your salon's appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View and manage upcoming appointments and client bookings.
            </p>
            <Button className="w-full" asChild>
              <Link to="/salon/bookings">Manage Bookings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalonOwnerDashboardWidgets;
