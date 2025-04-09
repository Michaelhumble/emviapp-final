
import React, { useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { Building2, FileText, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import DashboardRouteProtection from "@/components/dashboard/DashboardRouteProtection";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";

const SalonOwnerDashboard = () => {
  const { userProfile, userRole } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Salon Owner Dashboard | EmviApp";
    console.log("[SalonOwner] Dashboard loaded for role:", userRole);
  }, [userRole]);

  const displayName = userProfile?.business_name || userProfile?.full_name || userProfile?.email || "Salon Owner";

  return (
    <DashboardRouteProtection 
      allowedRoles={['salon_owner', 'owner', 'salon']}
      dashboardType="Salon Owner"
    >
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <RoleDashboardLayout>
          {/* Welcome Banner */}
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-serif text-blue-800">
                  Welcome, {displayName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-600">Welcome to your Salon Dashboard</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Action Buttons */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button 
                onClick={() => navigate('/post/job')}
                className="h-auto py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                <div className="flex flex-col items-center justify-center">
                  <Building2 className="mb-2 h-6 w-6" />
                  <span>Post a Job</span>
                </div>
              </Button>
              
              <Button 
                onClick={() => navigate('/posting')}
                variant="outline"
                className="h-auto py-6 border-blue-200 hover:border-blue-300 text-blue-700"
              >
                <div className="flex flex-col items-center justify-center">
                  <FileText className="mb-2 h-6 w-6" />
                  <span>My Listings</span>
                </div>
              </Button>
              
              <Button 
                onClick={() => navigate('/profile/edit')}
                variant="outline"
                className="h-auto py-6 border-purple-200 hover:border-purple-300 text-purple-700"
              >
                <div className="flex flex-col items-center justify-center">
                  <Edit className="mb-2 h-6 w-6" />
                  <span>Edit Salon Profile</span>
                </div>
              </Button>
            </div>
          </div>
          
          {/* Additional Dashboard Content */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Salon Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Manage your salon business, post jobs for nail technicians, and grow your client base.
                </p>
              </CardContent>
            </Card>
          </div>
        </RoleDashboardLayout>
      </div>
    </DashboardRouteProtection>
  );
};

export default SalonOwnerDashboard;
