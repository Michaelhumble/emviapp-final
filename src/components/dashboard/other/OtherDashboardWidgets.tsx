
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Scissors, Sparkles, Store, ShoppingBag, UserCircle, Package, Users } from "lucide-react";
import AffiliateReferralCard from "@/components/dashboard/common/AffiliateReferralCard";

const OtherDashboardWidgets = () => {
  const { userProfile } = useAuth();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">Choose Your Path</h2>
      
      {/* Welcome Guide Banner */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100">
        <CardContent className="py-6">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="h-6 w-6 text-indigo-500" />
            <h3 className="text-lg font-medium text-indigo-900">Welcome to EmviApp!</h3>
          </div>
          <p className="text-indigo-700">
            We noticed you haven't selected a specific role yet. EmviApp is tailored to your needs based on your role.
            Choose the path that best describes you to get the most personalized experience.
          </p>
        </CardContent>
      </Card>
      
      {/* Role Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Artist Card */}
        <Card className="border-pink-200 hover:shadow-md transition-all">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Scissors className="h-5 w-5 text-pink-600" />
              Nail Artist
            </CardTitle>
            <CardDescription className="text-pink-800">
              For nail technicians and artists
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground mb-6">
              Find jobs, connect with salons, showcase your work, and grow your career as a nail technician.
            </p>
            <Button className="w-full bg-pink-600 hover:bg-pink-700" asChild>
              <Link to="/profile/artist/setup">Join as Artist</Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Salon Owner Card */}
        <Card className="border-purple-200 hover:shadow-md transition-all">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Store className="h-5 w-5 text-purple-600" />
              Salon Owner
            </CardTitle>
            <CardDescription className="text-purple-800">
              For salon and shop owners
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground mb-6">
              Post jobs, find skilled technicians, promote your salon, and grow your client base.
            </p>
            <Button className="w-full bg-purple-600 hover:bg-purple-700" asChild>
              <Link to="/profile/salon/setup">Join as Salon Owner</Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Freelancer Card */}
        <Card className="border-sky-200 hover:shadow-md transition-all">
          <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserCircle className="h-5 w-5 text-sky-600" />
              Freelancer
            </CardTitle>
            <CardDescription className="text-sky-800">
              For independent beauty professionals
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground mb-6">
              Book clients, manage your schedule, build your brand, and grow your freelance business.
            </p>
            <Button className="w-full bg-sky-600 hover:bg-sky-700" asChild>
              <Link to="/profile/freelancer/setup">Join as Freelancer</Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Supplier Card */}
        <Card className="border-emerald-200 hover:shadow-md transition-all">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Package className="h-5 w-5 text-emerald-600" />
              Supplier/Vendor
            </CardTitle>
            <CardDescription className="text-emerald-800">
              For beauty suppliers and vendors
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground mb-6">
              Connect with salons, showcase your products, and expand your distribution network.
            </p>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link to="/profile/supplier/setup">Join as Supplier</Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Customer Card */}
        <Card className="border-amber-200 hover:shadow-md transition-all">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-amber-600" />
              Customer
            </CardTitle>
            <CardDescription className="text-amber-800">
              For nail service clients
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground mb-6">
              Find nearby salons, discover talented artists, book appointments, and get exclusive deals.
            </p>
            <Button className="w-full bg-amber-600 hover:bg-amber-700" asChild>
              <Link to="/profile/customer/setup">Join as Customer</Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Affiliate Referral Card */}
        <AffiliateReferralCard />
      </div>
    </div>
  );
};

export default OtherDashboardWidgets;
