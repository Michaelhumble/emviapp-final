
import { useEffect } from "react";
import { useAuth } from "@/context/auth";
import { Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Map from "@/components/Map";
import ReliableAuthGuard from "@/components/auth/ReliableAuthGuard";

const DashboardPage = () => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
        </div>
      </Layout>
    );
  }

  // Redirect based on user role
  if (user && userRole) {
    return <Navigate to={`/dashboard/${userRole}`} replace />;
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
