
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserProfile as UserProfileType } from "@/types/profile";
import { useAuth } from "@/context/auth";
import { getRoleSpecificSection } from "./utils/profileHelpers";
import { getRoleTheme } from "./utils/themeHelpers";

import ProfileCompletionTracker from "./ProfileCompletionTracker";
import ProfilePublicPreview from "./ProfilePublicPreview";
import ProfileMission from "./ProfileMission";
import ArtistProfileSection from "./ArtistProfileSection";
import SalonProfileSection from "./SalonProfileSection";
import CustomerProfileSection from "./CustomerProfileSection";
import SupplierProfileSection from "./SupplierProfileSection";
import OtherProfileSection from "./OtherProfileSection";

interface ProfileTabsProps {
  userProfile: UserProfileType;
}

const ProfileTabs = ({ userProfile }: ProfileTabsProps) => {
  const { userRole } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const theme = getRoleTheme(userRole);

  // Determine which profile section to show based on user role
  const renderRoleSpecificSection = () => {
    const sectionType = getRoleSpecificSection(userRole);
    
    switch (sectionType) {
      case "artist":
        return <ArtistProfileSection />;
      case "salon":
        return <SalonProfileSection />;
      case "supplier":
        return <SupplierProfileSection />;
      case "customer":
        return <CustomerProfileSection />;
      default:
        return <OtherProfileSection />;
    }
  };

  return (
    <div className="lg:col-span-2">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className={theme.borderColor}>
          <TabsTrigger value="profile" className={theme.hoverColor}>Profile</TabsTrigger>
          <TabsTrigger value="activity" className={theme.hoverColor}>Activity</TabsTrigger>
          <TabsTrigger value="settings" className={theme.hoverColor}>Settings</TabsTrigger>
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
          <Card className={theme.borderColor}>
            <CardHeader>
              <CardTitle className={`font-serif ${theme.textColor}`}>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Your recent activity will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-0">
          <Card className={theme.borderColor}>
            <CardHeader>
              <CardTitle className={`font-serif ${theme.textColor}`}>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Manage your account settings and preferences.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
