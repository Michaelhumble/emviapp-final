
import React from "react";
import CustomerWelcomeHeader from "./CustomerWelcomeHeader";
import CustomerBookingsCenter from "./bookings/CustomerBookingsCenter";
import CustomerLoyaltySection from "./loyalty/CustomerLoyaltySection";
import CustomerFavoritesSection from "./favorites/CustomerFavoritesSection";
import RecommendedServicesSection from "./services/RecommendedServicesSection";
import CustomerBrowseCategories from "./categories/CustomerBrowseCategories";

const CustomerDashboard: React.FC = () => {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-6">
      {/* Premium Welcome Header */}
      <CustomerWelcomeHeader />
      
      <div className="space-y-8 md:space-y-12">
        {/* Bookings Panel with Tabs */}
        <CustomerBookingsCenter />
        
        {/* Loyalty & Credits Section */}
        <CustomerLoyaltySection />
        
        {/* Suggested Services */}
        <RecommendedServicesSection />
        
        {/* Browse Categories */}
        <CustomerBrowseCategories />
        
        {/* Favorites Section */}
        <CustomerFavoritesSection />
      </div>
    </div>
  );
};

export default CustomerDashboard;
