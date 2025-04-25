
// Ensure we use optional chaining for all profile property accesses
// and provide fallbacks for missing properties

import React, { useEffect } from "react";
import { useAuth } from "@/context/auth";
import CustomerHeader from "@/components/dashboard/customer/CustomerWelcomeHeader";
import CustomerDashboardStats from "@/components/dashboard/customer/CustomerDashboardStats";
import CustomerBookingsPanel from "@/components/dashboard/customer/CustomerBookingsPanel";
import CustomerReferralCenter from "@/components/dashboard/customer/CustomerReferralCenter";
import CustomerProfileSection from "@/components/dashboard/customer/CustomerProfileSection";

const CustomerDashboard: React.FC = () => {
  const { userProfile, refreshUserProfile } = useAuth();

  useEffect(() => {
    // Refresh user profile data when dashboard loads
    refreshUserProfile?.();
  }, [refreshUserProfile]);

  // Use optional chaining and provide fallbacks for all properties
  const bookingsCount = userProfile?.bookings_count ?? 0;
  const reviewsCount = userProfile?.reviews_count ?? 0;
  
  // Format last booking date with a fallback
  const formatLastBookingDate = () => {
    const lastBookingDate = userProfile?.last_booking_date;
    if (!lastBookingDate) return "No recent bookings";
    
    try {
      // Try to format the date if it's a valid date string
      return new Date(lastBookingDate).toLocaleDateString();
    } catch {
      return "Date unavailable";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <CustomerHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <CustomerDashboardStats />
        <CustomerBookingsPanel 
          bookingsCount={bookingsCount}
          lastBookingDate={formatLastBookingDate()}
        />
        <CustomerProfileSection />
      </div>
      
      <div className="mt-10">
        <CustomerReferralCenter />
      </div>
    </div>
  );
};

export default CustomerDashboard;
