
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Settings as SettingsIcon } from "lucide-react";
import Layout from "@/components/layout/Layout";

const Settings = () => {
  const { user, userProfile, loading, isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not signed in
    if (!loading && !isSignedIn) {
      navigate("/sign-in");
    }
    
    document.title = "Account Settings | EmviApp";
  }, [loading, isSignedIn, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          <span>Loading settings...</span>
        </div>
      </Layout>
    );
  }

  if (!isSignedIn || !user) {
    return null; // Will redirect via useEffect
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <SettingsIcon className="h-6 w-6 mr-2 text-primary" />
          <h1 className="text-3xl font-bold">Account Settings</h1>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="mb-8">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Manage your basic account information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Role</label>
                    <p className="text-sm text-gray-500 capitalize">{userProfile?.role || "Not set"}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/profile/edit")}
                >
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
                <CardDescription>
                  Manage your subscription and billing information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    Current Plan: <span className="font-medium">{userProfile?.account_type === "free" ? "Free" : "Premium"}</span>
                  </p>
                  <Button variant="outline">Manage Subscription</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what notifications you receive.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Notification settings will be available soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Password & Security</CardTitle>
                <CardDescription>
                  Update your password and security settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline">Change Password</Button>
              </CardContent>
            </Card>
            
            <Card className="border-red-100">
              <CardHeader className="text-red-700">
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription className="text-red-600">
                  Irreversible account actions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive">Delete Account</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
