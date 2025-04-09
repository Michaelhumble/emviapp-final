
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SimpleProfileForm from "@/components/profile/SimpleProfileForm";

const ProfileEditor = () => {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Wait for auth to load
    if (!authLoading) {
      setLoading(false);
    }
    
    document.title = "Edit Profile | EmviApp";
  }, [authLoading]);
  
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
        </div>
      </Layout>
    );
  }
  
  if (!user && !authLoading) {
    return <Navigate to="/auth/signin" replace />;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Edit Profile</h1>
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <SimpleProfileForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileEditor;
