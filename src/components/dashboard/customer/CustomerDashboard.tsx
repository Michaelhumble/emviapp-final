
import React from 'react';
import { Container } from "@/components/ui/container";
import DashboardGreeting from "@/components/dashboard/common/DashboardGreeting";
import CustomerDashboardWidgets from "./CustomerDashboardWidgets";
import CustomerDashboardStats from "./CustomerDashboardStats";
import CustomerDashboardHeader from "./CustomerDashboardHeader";
import { useCustomerDashboard } from "@/hooks/useCustomerDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Search, Heart, Star } from "lucide-react";

const CustomerDashboard = () => {
  const { bookings, favorites, loading } = useCustomerDashboard();

  if (loading) {
    return (
      <Container className="py-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8 max-w-6xl mx-auto">
      <CustomerDashboardHeader />
      
      <div className="space-y-8">
        {/* Stats Overview */}
        <CustomerDashboardStats />
        
        {/* Main Dashboard Widgets */}
        <CustomerDashboardWidgets />
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
            <CardContent className="p-0">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Search className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Find Artists</h3>
                  <p className="text-sm text-gray-600">Discover talented nail artists near you</p>
                </div>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Browse Artists
              </Button>
            </CardContent>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 border-pink-100">
            <CardContent className="p-0">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-pink-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Book Appointment</h3>
                  <p className="text-sm text-gray-600">Schedule your next beauty session</p>
                </div>
              </div>
              <Button variant="outline" className="w-full border-pink-300 text-pink-600 hover:bg-pink-50">
                Book Now
              </Button>
            </CardContent>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
            <CardContent className="p-0">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <Heart className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">My Favorites</h3>
                  <p className="text-sm text-gray-600">View your saved artists and salons</p>
                </div>
              </div>
              <Button variant="outline" className="w-full border-amber-300 text-amber-600 hover:bg-amber-50">
                View Favorites
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-purple-600" />
              Recent Activity
            </h3>
            {bookings.length > 0 ? (
              <div className="space-y-3">
                {bookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{booking.service?.title || 'Service'}</p>
                      <p className="text-sm text-gray-600">
                        {booking.date_requested} • {booking.status}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No recent activity yet. Book your first appointment to get started!</p>
                <Button className="mt-4">Find Artists</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default CustomerDashboard;
