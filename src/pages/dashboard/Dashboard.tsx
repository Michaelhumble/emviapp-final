
import { useEffect } from "react";
import { useAuth } from "@/context/auth";
import { Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Map from "@/components/Map";
import { migrateSingleToMultiSalon } from "@/utils/migration/migrateSingleToMultiSalon";

const DashboardPage = () => {
  const { user, userRole, userProfile, loading } = useAuth();

  useEffect(() => {
    // If user exists and is a salon owner, check if we need to migrate
    if (user && userRole === "salon_owner") {
      migrateSingleToMultiSalon(user.id)
        .then((salonId) => {
          if (salonId) {
            console.log("Salon migrated successfully, ID:", salonId);
          }
        })
        .catch((error) => {
          console.error("Error during migration:", error);
        });
    }
  }, [user, userRole]);

  // If still loading, don't redirect yet
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect based on user role
  if (user) {
    if (userRole === "artist") {
      return <Navigate to="/dashboard/artist" replace />;
    } else if (userRole === "salon_owner") {
      return <Navigate to="/dashboard/owner" replace />;
    } else if (userRole === "customer") {
      return <Navigate to="/dashboard/customer" replace />;
    } else if (userRole === "freelancer") {
      return <Navigate to="/dashboard/freelancer" replace />;
    } else if (userRole === "supplier") {
      return <Navigate to="/dashboard/supplier" replace />;
    } else {
      return <Navigate to="/dashboard/other" replace />;
    }
  }

  // Return default dashboard for non-authenticated users
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Welcome to EmviApp</h1>
        
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Discover Beauty Professionals in Los Angeles</CardTitle>
            </CardHeader>
            <CardContent>
              <Map 
                height="500px" 
                className="rounded-lg shadow-lg" 
                zoom={12}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
