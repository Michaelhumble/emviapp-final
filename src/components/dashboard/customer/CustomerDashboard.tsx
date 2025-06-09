
import React from "react";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomerWelcomeBanner from "./CustomerWelcomeBanner";
import CustomerBookingsSection from "./CustomerBookingsSection";
import CustomerDashboardStats from "./CustomerDashboardStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerBookingHistory from "./bookings/BookingHistory";
import CustomerFavoritesSection from "./favorites/CustomerFavoritesSection";
import CustomerLoyaltySection from "./loyalty/CustomerLoyaltySection";
import NearbyOffersSection from "./offers/NearbyOffersSection";
import BookAgainSection from "./services/BookAgainSection";
import CustomerInbox from "./messages/CustomerInbox";

const CustomerDashboard = () => {
  const { user, userProfile, userRole } = useAuth();
  
  // GIANT DEBUG BANNER AND CONSOLE LOG
  console.log('🚨 RENDERING DASHBOARD FOR ROLE:', userRole, '— USING FILE: CustomerDashboard.tsx (src/components/dashboard/customer/CustomerDashboard.tsx)');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      {/* GIANT DEBUG BANNER */}
      <div className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white py-8 px-6 text-center shadow-xl">
        <h1 className="text-4xl font-black mb-2">👸 CUSTOMER DASHBOARD LOADED</h1>
        <p className="text-xl font-bold">FILE: CustomerDashboard.tsx</p>
        <p className="text-lg">PATH: src/components/dashboard/customer/CustomerDashboard.tsx</p>
        <p className="text-lg">USER ROLE: {userRole} | USER: {user?.email}</p>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <CustomerWelcomeBanner />
          <CustomerDashboardStats />
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="loyalty">Loyalty</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CustomerBookingsSection />
                <NearbyOffersSection />
              </div>
              <BookAgainSection />
            </TabsContent>

            <TabsContent value="bookings">
              <CustomerBookingHistory />
            </TabsContent>

            <TabsContent value="favorites">
              <CustomerFavoritesSection />
            </TabsContent>

            <TabsContent value="loyalty">
              <CustomerLoyaltySection />
            </TabsContent>

            <TabsContent value="messages">
              <CustomerInbox />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
