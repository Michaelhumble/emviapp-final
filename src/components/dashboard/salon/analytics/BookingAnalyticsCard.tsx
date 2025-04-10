
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, BarChart, Users, Scissors, ArrowUpRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBookings } from "../bookings/hooks/useBookings";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, subDays, format } from "date-fns";

const BookingAnalyticsCard: React.FC = () => {
  const { bookings } = useBookings();
  const [dateRange, setDateRange] = useState<"week" | "month" | "30days">("week");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const analytics = useMemo(() => {
    const now = new Date();
    
    // Define date range based on selection
    let startDate: Date, endDate: Date;
    
    if (dateRange === "week") {
      startDate = startOfWeek(now, { weekStartsOn: 1 });
      endDate = endOfWeek(now, { weekStartsOn: 1 });
    } else if (dateRange === "month") {
      startDate = startOfMonth(now);
      endDate = endOfMonth(now);
    } else { // 30 days
      startDate = subDays(now, 30);
      endDate = now;
    }
    
    // Filter bookings in the selected date range
    const filteredBookings = bookings.filter(booking => {
      if (!booking.date) return false;
      const bookingDate = new Date(booking.date);
      return bookingDate >= startDate && bookingDate <= endDate;
    });
    
    // Get total revenue
    const totalRevenue = filteredBookings.reduce((sum, booking) => {
      return sum + (booking.servicePrice || 0);
    }, 0);
    
    // Get most popular service
    const serviceCount: Record<string, number> = {};
    filteredBookings.forEach(booking => {
      const serviceName = booking.serviceName || "Unknown";
      serviceCount[serviceName] = (serviceCount[serviceName] || 0) + 1;
    });
    
    let mostPopularService = "None";
    let maxCount = 0;
    
    Object.entries(serviceCount).forEach(([service, count]) => {
      if (count > maxCount) {
        mostPopularService = service;
        maxCount = count;
      }
    });
    
    // Get most booked staff
    const staffCount: Record<string, number> = {};
    filteredBookings.forEach(booking => {
      if (booking.assignedStaffName) {
        staffCount[booking.assignedStaffName] = (staffCount[booking.assignedStaffName] || 0) + 1;
      }
    });
    
    let mostBookedStaff = "None";
    maxCount = 0;
    
    Object.entries(staffCount).forEach(([staff, count]) => {
      if (count > maxCount) {
        mostBookedStaff = staff;
        maxCount = count;
      }
    });
    
    return {
      totalBookings: filteredBookings.length,
      totalRevenue,
      mostPopularService,
      mostBookedStaff
    };
  }, [bookings, dateRange]);

  const getRangeText = () => {
    const now = new Date();
    
    if (dateRange === "week") {
      const start = startOfWeek(now, { weekStartsOn: 1 });
      const end = endOfWeek(now, { weekStartsOn: 1 });
      return `${format(start, "MMM d")} - ${format(end, "MMM d")}`;
    } else if (dateRange === "month") {
      return format(now, "MMMM yyyy");
    } else {
      const start = subDays(now, 30);
      return `${format(start, "MMM d")} - ${format(now, "MMM d")}`;
    }
  };

  return (
    <Card className="border-blue-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <BarChart className="h-5 w-5 text-blue-500 mr-2" />
          Booking Analytics
        </CardTitle>
        
        <Select value={dateRange} onValueChange={(value) => setDateRange(value as "week" | "month" | "30days")}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          Showing data for: <span className="font-medium">{getRangeText()}</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm font-medium">Total Bookings</span>
            </div>
            <div className="text-2xl font-bold">{analytics.totalBookings}</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <ArrowUpRight className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm font-medium">Estimated Revenue</span>
            </div>
            <div className="text-2xl font-bold">{formatCurrency(analytics.totalRevenue)}</div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Scissors className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-sm font-medium">Popular Service</span>
            </div>
            <div className="text-lg font-bold truncate">{analytics.mostPopularService}</div>
          </div>
          
          <div className="bg-amber-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Users className="h-5 w-5 text-amber-500 mr-2" />
              <span className="text-sm font-medium">Most Booked Staff</span>
            </div>
            <div className="text-lg font-bold truncate">{analytics.mostBookedStaff}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingAnalyticsCard;
