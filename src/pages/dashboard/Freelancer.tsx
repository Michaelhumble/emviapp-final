
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Users, Briefcase, Camera, Bell, Settings, Edit2, Globe } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const FreelancerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!user) {
      navigate("/auth/signin");
      return;
    }
    
    const fetchUserProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();
          
        if (error) throw error;
        
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching freelancer profile:", error);
        toast.error("Failed to load your profile data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [user, navigate]);
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-center h-96">
            <div className="animate-pulse flex flex-col items-center space-y-4">
              <div className="rounded-full bg-gray-200 h-24 w-24"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-32 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const initials = profileData?.full_name
    ? profileData.full_name.split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "FL";

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar / Profile Summary */}
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="text-center">
                <div className="flex justify-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileData?.avatar_url || ""} />
                    <AvatarFallback className="text-xl bg-primary/10">{initials}</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="mt-4 text-xl">{profileData?.full_name}</CardTitle>
                <CardDescription className="flex items-center justify-center gap-1">
                  <Badge variant="outline">{profileData?.specialty || "Freelancer"}</Badge>
                  {profileData?.location && (
                    <span className="text-sm text-muted-foreground">{profileData.location}</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Bio */}
                {profileData?.bio && (
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-muted-foreground">About</h3>
                    <p className="text-sm">{profileData.bio}</p>
                  </div>
                )}
                
                {/* Social Links */}
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">Connect</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {profileData?.instagram && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => window.open(`https://instagram.com/${profileData.instagram}`, '_blank')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                        Instagram
                      </Button>
                    )}
                    {profileData?.website && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => window.open(profileData.website, '_blank')}
                      >
                        <Globe className="mr-2 h-4 w-4" /> Website
                      </Button>
                    )}
                  </div>
                </div>
                
                {/* Actions */}
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => navigate("/profile/freelancer/setup")}
                >
                  <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="portfolio">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="jobs">Job Applications</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>
              
              <TabsContent value="portfolio" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Camera className="mr-2 h-5 w-5" /> Your Portfolio
                    </CardTitle>
                    <CardDescription>
                      Showcase your work to attract clients
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-md bg-muted/50">
                      <p className="text-muted-foreground mb-4">Upload photos of your work to build your portfolio</p>
                      <Button>Add Photos</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="bookings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CalendarDays className="mr-2 h-5 w-5" /> Bookings
                    </CardTitle>
                    <CardDescription>
                      Manage your upcoming appointments
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center h-48 text-center">
                    <p className="text-muted-foreground mb-2">No bookings yet</p>
                    <p className="text-sm text-muted-foreground">
                      Complete your profile and add portfolio items to attract clients
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="jobs" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="mr-2 h-5 w-5" /> Job Applications
                    </CardTitle>
                    <CardDescription>
                      Track your job applications and opportunities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center h-48">
                    <Button onClick={() => navigate("/jobs")}>Browse Open Jobs</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="insights" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="mr-2 h-5 w-5" /> Profile Insights
                    </CardTitle>
                    <CardDescription>
                      See how your profile is performing
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardDescription>Profile Views</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">0</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardDescription>Total Bookings</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">0</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FreelancerDashboard;
