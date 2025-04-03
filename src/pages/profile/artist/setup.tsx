
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const ArtistSetup = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth/signin");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-4xl py-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Complete Your Artist Profile</CardTitle>
            <CardDescription>Tell us more about your services and expertise</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Artist profile setup form will go here.</p>
            <Button onClick={() => navigate("/")}>Skip for now</Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ArtistSetup;
