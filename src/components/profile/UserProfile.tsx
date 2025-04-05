
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Edit, Instagram, Link as LinkIcon, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

import UserProfileBanner from "./UserProfileBanner";
import ProfileCompletionTracker from "./ProfileCompletionTracker";
import ProfileMission from "./ProfileMission";
import ProfilePublicPreview from "./ProfilePublicPreview";
import ProfileAISupport from "./ProfileAISupport";
import ArtistProfileSection from "./ArtistProfileSection";
import SalonProfileSection from "./SalonProfileSection";
import CustomerProfileSection from "./CustomerProfileSection";
import SupplierProfileSection from "./SupplierProfileSection";
import OtherProfileSection from "./OtherProfileSection";

const UserProfile = () => {
  const { userProfile, userRole } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  if (!userProfile) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
      </div>
    );
  }

  // Format date from ISO string
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get role display text
  const getRoleDisplay = (role?: string | null) => {
    if (!role) return "Member";
    
    switch(role) {
      case "artist":
        return "Nail Artist";
      case "nail technician/artist":
        return "Nail Technician/Artist";
      case "salon":
        return "Salon Business";
      case "owner":
        return "Salon Owner";
      case "supplier":
      case "beauty supplier":
        return "Beauty Supplier";
      case "vendor":
        return "Vendor";
      case "freelancer":
        return "Freelance Artist";
      case "renter":
        return "Booth Renter";
      case "customer":
        return "Beauty Enthusiast";
      default:
        return role.charAt(0).toUpperCase() + role.slice(1);
    }
  };

  // Determine which profile section to show based on user role
  const renderRoleSpecificSection = () => {
    if (userRole === "artist" || userRole === "nail technician/artist" || userRole === "renter") {
      return <ArtistProfileSection />;
    }
    
    if (userRole === "salon" || userRole === "owner") {
      return <SalonProfileSection />;
    }
    
    if (userRole === "vendor" || userRole === "supplier" || userRole === "beauty supplier") {
      return <SupplierProfileSection />;
    }
    
    if (userRole === "customer") {
      return <CustomerProfileSection />;
    }
    
    return <OtherProfileSection />;
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <UserProfileBanner />
      
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-gray-100 shadow-sm overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-purple-100/50 to-pink-100/50 pt-8 px-6 pb-6 relative">
                <div className="absolute top-4 right-4">
                  <Link to="/profile/edit">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-white mb-3">
                    {userProfile.avatar_url ? (
                      <img 
                        src={userProfile.avatar_url} 
                        alt={userProfile.full_name} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400">
                        {userProfile.full_name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-serif font-medium text-center">{userProfile.full_name}</h2>
                  
                  <div className="mt-1 mb-2">
                    <Badge variant="secondary" className="font-normal bg-white/80">
                      {getRoleDisplay(userProfile.role)}
                    </Badge>
                  </div>
                  
                  {userProfile.specialty && (
                    <p className="text-sm text-gray-600 text-center">{userProfile.specialty}</p>
                  )}
                </div>
              </div>
              
              <CardContent className="p-5">
                <div className="space-y-4">
                  {userProfile.location && (
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{userProfile.location}</span>
                    </div>
                  )}
                  
                  {userProfile.email && (
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{userProfile.email}</span>
                    </div>
                  )}
                  
                  {userProfile.phone && (
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{userProfile.phone}</span>
                    </div>
                  )}
                  
                  {userProfile.instagram && (
                    <div className="flex items-center text-sm">
                      <Instagram className="h-4 w-4 text-gray-400 mr-2" />
                      <a 
                        href={`https://instagram.com/${userProfile.instagram.replace('@', '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        @{userProfile.instagram.replace('@', '')}
                      </a>
                    </div>
                  )}
                  
                  {userProfile.website && (
                    <div className="flex items-center text-sm">
                      <LinkIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <a 
                        href={userProfile.website.startsWith('http') ? userProfile.website : `https://${userProfile.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline truncate max-w-[200px]"
                      >
                        {userProfile.website}
                      </a>
                    </div>
                  )}
                  
                  {userProfile.created_at && (
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span>Joined {formatDate(userProfile.created_at)}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  <Button className="w-full" asChild>
                    <Link to="/profile/edit">Edit Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <ProfileAISupport />
          </div>
          
          {/* Right Column */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="mt-0">
                <div className="space-y-6">
                  <ProfileCompletionTracker />
                  
                  <ProfilePublicPreview />
                  
                  <ProfileMission />
                  
                  <Separator className="my-8" />
                  
                  {renderRoleSpecificSection()}
                </div>
              </TabsContent>
              
              <TabsContent value="activity" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Your recent activity will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif">Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Manage your account settings and preferences.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className="mt-10 text-center text-sm text-gray-500">
          <p>The more you complete, the more EmviApp works for you.</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
