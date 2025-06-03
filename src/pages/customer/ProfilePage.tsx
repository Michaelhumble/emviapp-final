
import React, { useState } from "react";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, MapPin, Cake, Edit } from "lucide-react";
import CustomerProfileEditPanel from "./CustomerProfileEditPanel";
import { Badge } from "@/components/ui/badge";

// Import the new beauty journey components
import BeautyJourneyStats from "@/components/customer/journey/BeautyJourneyStats";
import CommunityImpactCard from "@/components/customer/journey/CommunityImpactCard";
import WishlistPanel from "@/components/customer/journey/WishlistPanel";
import ShareJourneyCard from "@/components/customer/journey/ShareJourneyCard";
import FeatureSuggestionWidget from "@/components/customer/journey/FeatureSuggestionWidget";
import CustomizeProfileCard from "@/components/customer/journey/CustomizeProfileCard";

const prettyCommPref = {
  email: "Email",
  sms: "SMS",
  app: "App Notification",
};

const prettyArtistTypes = {
  "studio": "Studio",
  "booth-renter": "Booth Renter",
  "luxury-spa": "Luxury Spa"
};

const ProfilePage: React.FC = () => {
  const { userProfile } = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  if (!userProfile) return null;

  // Prettify fallback
  const getFallback = () => {
    if (userProfile.full_name) {
      return userProfile.full_name[0];
    }
    return <User className="w-6 h-6" />;
  };

  return (
    <>
      <div className="min-h-[90vh] bg-gradient-to-b from-white to-pink-50/40 py-6">
        <div className="max-w-6xl mx-auto px-4">
          {/* Beauty Journey Section - New */}
          <div className="mb-8">
            <BeautyJourneyStats />
          </div>

          {/* Community Impact & Share Journey Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <CommunityImpactCard />
            <ShareJourneyCard />
          </div>

          {/* Main Profile Card - Existing */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1">
              <Card className="rounded-3xl shadow-xl bg-white/95 px-3 sm:px-6 py-7">
                <CardHeader className="flex flex-col items-center justify-center space-y-4 p-0 mb-6">
                  <Avatar className="h-24 w-24 shadow-lg mb-2 border-2 border-emvi-accent">
                    <AvatarImage src={userProfile.avatar_url || undefined} alt="Avatar" />
                    <AvatarFallback className="text-3xl">{getFallback()}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-2xl font-serif font-semibold tracking-tight">
                    {userProfile.full_name}
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600 text-center">
                    {userProfile.email}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {userProfile.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="text-base">{userProfile.location}</span>
                      </div>
                    )}
                    {userProfile.birthday && (
                      <div className="flex items-center gap-2">
                        <Cake className="h-5 w-5 text-pink-400" />
                        <span className="text-base">{userProfile.birthday}</span>
                      </div>
                    )}
                    {(userProfile.favorite_artist_types && userProfile.favorite_artist_types.length > 0) && (
                      <div>
                        <div className="text-[1rem] font-medium mb-1 flex items-center gap-2">
                          <span>🎯</span>Favorite Artist Types
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {userProfile.favorite_artist_types.map((ftype) => (
                            <Badge variant="outline" key={ftype}>{prettyArtistTypes[ftype] || ftype}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {(userProfile.communication_preferences && userProfile.communication_preferences.length > 0) && (
                      <div>
                        <div className="text-[1rem] font-medium mb-1 flex items-center gap-2">
                          <span>💬</span>Communication Preferences
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {userProfile.communication_preferences.map((cpref) => (
                            <Badge key={cpref} variant="secondary">{prettyCommPref[cpref] || cpref}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => setEditOpen(true)} className="flex items-center gap-2 shadow-sm">
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Wishlist and Additional Features */}
            <div className="lg:col-span-2 space-y-6">
              <WishlistPanel />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FeatureSuggestionWidget />
                <CustomizeProfileCard />
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomerProfileEditPanel open={editOpen} onOpenChange={setEditOpen} userProfile={userProfile} />
    </>
  );
};

export default ProfilePage;
