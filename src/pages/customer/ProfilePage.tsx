
import React from "react";
import { useAuth } from "@/context/auth";
import Layout from "@/components/layout/Layout";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Edit, Mail, Phone, MapPin } from "lucide-react";
import BeautyJourneyStats from "@/components/customer/journey/BeautyJourneyStats";
import CommunityImpactCard from "@/components/customer/journey/CommunityImpactCard";
import WishlistPanel from "@/components/customer/journey/WishlistPanel";
import ShareJourneyCard from "@/components/customer/journey/ShareJourneyCard";
import FeatureSuggestionWidget from "@/components/customer/journey/FeatureSuggestionWidget";
import CustomizeProfileCard from "@/components/customer/journey/CustomizeProfileCard";

const CustomerProfilePage = () => {
  const { user, userProfile, loading } = useAuth();

  // Redirect if not logged in
  if (!user && !loading) {
    return <Navigate to="/auth/signin" replace />;
  }

  // Show loading state
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your beauty journey and preferences</p>
            
            {/* Zero Payment Messaging */}
            <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium text-center">
                ✨ You'll never pay for core features. All rewards are free. Ultimate VIP is a one-time, optional upgrade only. ✨
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Basic Profile Card */}
              <Card className="border-gray-100 shadow-sm">
                <CardHeader className="text-center pb-2">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 bg-gray-100">
                    {userProfile?.avatar_url ? (
                      <img 
                        src={userProfile.avatar_url} 
                        alt={userProfile.full_name || 'Profile'} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-full h-full p-6 text-gray-300" />
                    )}
                  </div>
                  <CardTitle className="text-xl">{userProfile?.full_name || 'Beauty Lover'}</CardTitle>
                  <p className="text-gray-600">Customer</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {user?.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{user.email}</span>
                    </div>
                  )}
                  
                  {userProfile?.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{userProfile.phone}</span>
                    </div>
                  )}
                  
                  {userProfile?.location && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{userProfile.location}</span>
                    </div>
                  )}
                  
                  <Button className="w-full mt-4" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Customize Profile Card */}
              <CustomizeProfileCard />
            </div>

            {/* Right Column - Journey & Features */}
            <div className="lg:col-span-2 space-y-6">
              {/* Beauty Journey Stats */}
              <BeautyJourneyStats />

              {/* Community Impact & Wishlist */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CommunityImpactCard />
                <WishlistPanel />
              </div>

              {/* Share Journey & Feature Suggestion */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ShareJourneyCard />
                <FeatureSuggestionWidget />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerProfilePage;
