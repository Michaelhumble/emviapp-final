import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/auth";
import { Loader2, Edit, Shield, Award, Calendar, MapPin, Globe, Phone, Mail, Instagram, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Import our components
import UserAvatar from "@/components/profile/UserAvatar";
import AccountInfo from "@/components/profile/AccountInfo";
import ProfileForm from "@/components/profile/ProfileForm";
import SubscriptionProfile from "@/components/profile/SubscriptionProfile";
import SubscriptionBadge from "@/components/subscription/SubscriptionBadge";

const Profile = () => {
  const { user, loading: authLoading, userRole, userProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    document.title = "My Profile | EmviApp";
    
    // Set loading to false once we have userProfile or if auth loading is complete
    if (!authLoading) {
      setLoading(false);
    }
  }, [authLoading, userProfile]);
  
  const getRoleColor = (role?: string | null) => {
    if (!role) return "bg-gray-100 text-gray-600";
    
    switch(role) {
      case 'artist':
      case 'nail technician/artist':
        return "bg-purple-100 text-purple-600";
      case 'salon':
      case 'owner':
        return "bg-blue-100 text-blue-600";
      case 'customer':
        return "bg-green-100 text-green-600";
      case 'freelancer':
        return "bg-amber-100 text-amber-600";
      case 'supplier':
      case 'vendor':
      case 'beauty supplier':
        return "bg-indigo-100 text-indigo-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  
  if (authLoading || loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }
  
  if (!user && !authLoading) {
    return <Navigate to="/auth/signin" replace />;
  }
  
  return (
    <Layout>
      <div className="relative">
        {/* Profile Banner */}
        <div className="h-48 bg-gradient-to-r from-primary/80 via-primary to-primary/80 relative">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 mix-blend-overlay"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto -mt-20">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between p-6 pt-8 md:pt-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  <div className="relative">
                    {userProfile?.avatar_url ? (
                      <img 
                        src={userProfile.avatar_url} 
                        alt={userProfile.full_name} 
                        className="h-28 w-28 rounded-full border-4 border-white shadow-md object-cover"
                      />
                    ) : (
                      <div className="h-28 w-28 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary border-4 border-white shadow-md">
                        {userProfile?.full_name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}
                    <div className={`absolute bottom-1 right-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(userRole || userProfile?.role)}`}>
                      {userRole || userProfile?.role || 'User'}
                    </div>
                  </div>
                  <div className="md:ml-2 text-center md:text-left">
                    <h1 className="text-2xl font-bold">
                      {userProfile?.full_name || 'Profile'}
                    </h1>
                    <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                      <SubscriptionBadge />
                      {userProfile?.specialty && (
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                          <Award className="mr-1 h-3 w-3" />
                          {userProfile.specialty}
                        </span>
                      )}
                      {userProfile?.location && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                          <MapPin className="mr-1 h-3 w-3" />
                          {userProfile.location}
                        </span>
                      )}
                      {userProfile?.created_at && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                          <Calendar className="mr-1 h-3 w-3" />
                          Joined {new Date(userProfile.created_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex justify-center md:justify-end">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                    <TabsList>
                      <TabsTrigger value="profile">Profile</TabsTrigger>
                      <TabsTrigger value="subscription">Subscription</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsContent value="profile" className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="md:col-span-1">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Contact Information</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {userProfile?.email && (
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>{userProfile.email}</span>
                              </div>
                            )}
                            {userProfile?.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{userProfile.phone}</span>
                              </div>
                            )}
                            {userProfile?.website && (
                              <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                <a href={userProfile.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                  {userProfile.website.replace(/^https?:\/\//, '')}
                                </a>
                              </div>
                            )}
                            {userProfile?.instagram && (
                              <div className="flex items-center gap-2">
                                <Instagram className="h-4 w-4 text-muted-foreground" />
                                <a href={`https://instagram.com/${userProfile.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                  {userProfile.instagram}
                                </a>
                              </div>
                            )}
                          </CardContent>
                          <CardFooter>
                            <Button 
                              variant="outline" 
                              className="w-full" 
                              onClick={() => navigate('/profile/edit')}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Profile
                            </Button>
                          </CardFooter>
                        </Card>
                        
                        <Card className="mt-6">
                          <CardHeader>
                            <CardTitle className="text-lg">About</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">
                              {userProfile?.bio || 'No bio information added yet.'}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="md:col-span-2">
                        {userProfile?.role === 'artist' || userRole === 'artist' || userProfile?.role === 'nail technician/artist' || userRole === 'nail technician/artist' ? (
                          <Card>
                            <CardHeader>
                              <CardTitle>Artist Portfolio</CardTitle>
                              <CardDescription>Showcase your work and skills</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="bg-gray-50 border border-dashed border-gray-200 rounded-md p-8 text-center">
                                <ExternalLink className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium">Create Your Portfolio</h3>
                                <p className="text-gray-500 mb-4">
                                  Showcase your best work and attract more clients
                                </p>
                                <Button>Get Started</Button>
                              </div>
                            </CardContent>
                          </Card>
                        ) : userProfile?.role === 'salon' || userRole === 'salon' || userProfile?.role === 'owner' || userRole === 'owner' ? (
                          <Card>
                            <CardHeader>
                              <CardTitle>Salon Management</CardTitle>
                              <CardDescription>Manage your salon and staff</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="bg-gray-50 border border-dashed border-gray-200 rounded-md p-8 text-center">
                                <ExternalLink className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium">Configure Your Salon Profile</h3>
                                <p className="text-gray-500 mb-4">
                                  Add details about your salon and services offered
                                </p>
                                <Button>Set Up Salon</Button>
                              </div>
                            </CardContent>
                          </Card>
                        ) : (
                          <Card>
                            <CardHeader>
                              <CardTitle>Activity</CardTitle>
                              <CardDescription>Your recent interactions</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="bg-gray-50 border border-dashed border-gray-200 rounded-md p-8 text-center">
                                <p className="text-gray-500">
                                  No recent activity to display
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Profile Visibility</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Your profile is public</span>
                                <Button variant="outline" size="sm">Manage</Button>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Account Security</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Last login: Today</span>
                                <Button variant="outline" size="sm">Security Settings</Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="subscription" className="p-6">
                    <SubscriptionProfile />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
