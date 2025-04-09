
import React from "react";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Heart, Star, Users, Award, Search, MapPin, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPersonalizedGreeting } from "@/utils/navigation";
import CustomerWelcomeBanner from "./CustomerWelcomeBanner";
import CustomerDashboardHeader from "./CustomerDashboardHeader";
import CustomerDashboardWidgets from "./CustomerDashboardWidgets";
import CustomerBookingsSection from "./bookings/CustomerBookingsSection";
import CustomerProfileSection from "./CustomerProfileSection";
import CustomerMetricsSection from "./CustomerMetricsSection";
import CustomerReferralCenter from "./CustomerReferralCenter";
import InviteSalonSection from "./InviteSalonSection";

const CustomerDashboard = () => {
  const { userProfile } = useAuth();
  const userName = userProfile?.full_name || "Beauty Enthusiast";
  
  return (
    <div className="space-y-6">
      {/* Customer-specific Welcome Banner */}
      <CustomerWelcomeBanner />
      
      {/* Customer Dashboard Header with navigation options */}
      <CustomerDashboardHeader />
      
      {/* Customer-specific Dashboard Widgets */}
      <CustomerDashboardWidgets />
      
      {/* Bookings Section - Main component for customer */}
      <CustomerBookingsSection />
      
      {/* Near You Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 text-rose-500 mr-2" />
            Beauty Services Near You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Luxury Nail Salon {item}</h3>
                    <p className="text-sm text-gray-500">2.{item} miles away</p>
                  </div>
                  <span className="flex items-center text-amber-500 text-sm">
                    <Star className="h-3 w-3 mr-1 fill-amber-500" /> 4.{item + 5}
                  </span>
                </div>
                <p className="text-sm mb-3">Manicure, Pedicure, Nail Art</p>
                <Button variant="outline" size="sm" className="w-full">View Details</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Favorites Section - Customer specific */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="h-5 w-5 text-rose-500 mr-2" />
            Your Favorites
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <Star className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-medium">Favorite Artists</h3>
                  <p className="text-sm text-gray-500">Artists you've saved</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            
            <div className="border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <Award className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-medium">Saved Salons</h3>
                  <p className="text-sm text-gray-500">Salons you love</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Customer Profile Section */}
      <CustomerProfileSection />
      
      {/* Customer Metrics Section */}
      <CustomerMetricsSection />
      
      {/* Customer Referral Center */}
      <CustomerReferralCenter />
      
      {/* Invite Salon Section */}
      <InviteSalonSection />
      
      {/* Upcoming Events Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 text-indigo-500 mr-2" />
            Beauty Events & Promotions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center mr-3">
                  <CalendarDays className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <h3 className="font-medium">Nail Art Workshop</h3>
                  <p className="text-sm text-gray-500">Next Saturday, 2:00 PM</p>
                </div>
              </div>
              <p className="text-sm mb-3">Learn the latest nail art trends from professional nail artists.</p>
              <Button variant="outline" size="sm">More Info</Button>
            </div>
            
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                  <Star className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-medium">20% Off Premium Pedicures</h3>
                  <p className="text-sm text-gray-500">Ends in 3 days</p>
                </div>
              </div>
              <p className="text-sm mb-3">Limited-time offer at Luxury Nail Spa. Book now to secure your spot.</p>
              <Button variant="outline" size="sm">Book Now</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDashboard;
