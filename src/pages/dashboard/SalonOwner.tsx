
import { useEffect } from "react";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { Building2, Users, Calendar, Star, PlusCircle, ChevronRight, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { navigateToRoleDashboard } from "@/utils/navigation";
import { useNavigate } from "react-router-dom";
import DashboardRouteProtection from "@/components/dashboard/DashboardRouteProtection";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import { Sparkles } from "lucide-react";

const SalonOwnerDashboard = () => {
  const { userProfile, userRole } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // For testing only - show that the page loaded correctly
    console.log("[SalonOwner] Dashboard loaded for role:", userRole);
  }, [userRole]);

  // Get the salon name from profile or fallback to "Your Salon"
  const salonName = userProfile?.business_name || userProfile?.full_name || "Your Salon";
  
  return (
    <DashboardRouteProtection 
      allowedRoles={['salon_owner', 'owner', 'salon']}
      dashboardType="Salon Owner"
    >
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <RoleDashboardLayout>
          {/* Welcome Banner */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-2xl md:text-3xl font-serif mb-2 md:mb-0">
                Welcome back, <span className="font-semibold">{salonName}</span>
              </h1>
              <Button 
                onClick={() => navigate('/profile/edit')}
                variant="outline" 
                className="text-sm"
              >
                Edit Business Profile <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <p className="text-gray-600">Let's grow your salon business today.</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/50 backdrop-blur-sm border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Applicants</div>
                    <div className="text-2xl font-bold">0</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/50 backdrop-blur-sm border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Appointments</div>
                    <div className="text-2xl font-bold">0</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/50 backdrop-blur-sm border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-amber-100 text-amber-600">
                    <Star className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Reviews</div>
                    <div className="text-2xl font-bold">0</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/50 backdrop-blur-sm border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-emerald-100 text-emerald-600">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Staff</div>
                    <div className="text-2xl font-bold">0</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button 
                onClick={() => navigate('/post/job')}
                className="h-auto py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                <div className="flex items-center">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Post a Job</div>
                    <div className="text-xs opacity-90">Find nail technicians & staff</div>
                  </div>
                </div>
              </Button>
              
              <Button 
                onClick={() => navigate('/posting/salon')}
                variant="outline"
                className="h-auto py-4 border-blue-200 hover:border-blue-300 text-blue-700"
              >
                <div className="flex items-center">
                  <Building2 className="mr-2 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Post a Booth</div>
                    <div className="text-xs">Rent out available space</div>
                  </div>
                </div>
              </Button>
              
              <Button 
                variant="outline"
                className="h-auto py-4 border-amber-200 hover:border-amber-300 text-amber-700"
                onClick={() => toast.info("Coming soon! This feature is under development.")}
              >
                <div className="flex items-center">
                  <Sparkles className="mr-2 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Boost Your Salon</div>
                    <div className="text-xs">Increase visibility</div>
                  </div>
                </div>
              </Button>
            </div>
          </div>
          
          {/* Referral Card */}
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border border-blue-100">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold mb-1">Refer Another Salon, Get 50 Credits</h3>
                    <p className="text-sm text-gray-600 mb-2">Share your referral link to earn rewards</p>
                    <div className="bg-white/70 rounded p-2 text-sm font-mono border border-blue-100">
                      https://emviapp.com/refer?code={userProfile?.id?.substring(0, 8) || 'YOUR_CODE'}
                    </div>
                  </div>
                  <Button 
                    className="mt-4 md:mt-0 bg-gradient-to-r from-purple-500 to-blue-500"
                    onClick={() => {
                      navigator.clipboard.writeText(`https://emviapp.com/refer?code=${userProfile?.id?.substring(0, 8) || 'YOUR_CODE'}`);
                      toast.success("Referral link copied to clipboard!");
                    }}
                  >
                    Copy Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Coming Soon Features */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="bg-white/50 backdrop-blur-sm border border-gray-100">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Client Appointment System</h3>
                  <p className="text-sm text-gray-600">Manage your bookings and client appointments</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/50 backdrop-blur-sm border border-gray-100">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Staff Management</h3>
                  <p className="text-sm text-gray-600">Track commissions, schedule staff, manage performance</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/50 backdrop-blur-sm border border-gray-100">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">List Your Salon For Sale</h3>
                  <p className="text-sm text-gray-600">Reach qualified buyers for your salon business</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </RoleDashboardLayout>
      </div>
    </DashboardRouteProtection>
  );
};

export default SalonOwnerDashboard;
