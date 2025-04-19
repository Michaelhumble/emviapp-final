
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, Users, DollarSign } from "lucide-react";

const SalonDashboardOverview = () => {
  // Dummy data for demonstration
  const todaysBookings = 5;
  const weeklyRevenue = 2450;
  const dummyStaff = [
    { id: 1, name: "Jessica Kim", bookings: 12, revenue: 1230 },
    { id: 2, name: "Michael Chen", bookings: 8, revenue: 780 },
    { id: 3, name: "Sarah Johnson", bookings: 7, revenue: 640 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-playfair text-emvi-dark">Salon Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-muted shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium font-inter">Today's Bookings</CardTitle>
            <CalendarClock className="h-4 w-4 text-emvi-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysBookings}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {todaysBookings > 0 ? "Appointments scheduled" : "No appointments today"}
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-muted shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium font-inter">Weekly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-emvi-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${weeklyRevenue}</div>
            <p className="text-xs text-muted-foreground mt-1">
              For the current week
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-muted shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium font-inter">Top Staff</CardTitle>
            <Users className="h-4 w-4 text-emvi-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dummyStaff.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active team members
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Top Staff Table */}
      <Card className="border-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-playfair">Top Performing Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="font-inter border-b">
                  <th className="text-left py-3 px-2">Staff Member</th>
                  <th className="text-center py-3 px-2">Bookings</th>
                  <th className="text-right py-3 px-2">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {dummyStaff.map((staff) => (
                  <tr key={staff.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2">{staff.name}</td>
                    <td className="text-center py-3 px-2">{staff.bookings}</td>
                    <td className="text-right py-3 px-2">${staff.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonDashboardOverview;
