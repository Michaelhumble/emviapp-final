
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, CalendarRange, Download, DollarSign, Users, Calendar, TrendingUp } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from "sonner";

// Mock data for revenue
const mockRevenueData = {
  dailyRevenue: 480,
  weeklyRevenue: 3250,
  monthlyRevenue: 12800,
  totalBookings: 42,
  mostBookedService: "Gel Nails Full Set",
  secondMostBooked: "Manicure & Pedicure",
  staffPerformance: [
    { name: "Tina Stylist", bookings: 18, revenue: 1580 },
    { name: "Mark Barber", bookings: 15, revenue: 950 },
    { name: "Laura Nail Tech", bookings: 9, revenue: 720 },
  ]
};

const SalonAnalytics = () => {
  const [dateRange, setDateRange] = useState<"today" | "week" | "month" | "custom">("week");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date | undefined>(new Date());
  const [dateTo, setDateTo] = useState<Date | undefined>(new Date());
  const [calendarSelection, setCalendarSelection] = useState<"from" | "to">("from");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDateRangeChange = (value: string) => {
    setDateRange(value as "today" | "week" | "month" | "custom");
    
    if (value === "custom") {
      setIsCalendarOpen(true);
    }
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    if (calendarSelection === "from") {
      setDateFrom(date);
      setCalendarSelection("to");
    } else {
      setDateTo(date);
      setIsCalendarOpen(false);
      setCalendarSelection("from");
      
      toast.success("Custom date range selected");
    }
  };

  const handleDownloadReport = () => {
    toast.success("Report would be downloaded here");
    // In a real implementation, this would generate and download a report
  };

  const getDateRangeText = () => {
    switch (dateRange) {
      case "today":
        return "Today";
      case "week":
        return "This Week";
      case "month":
        return "This Month";
      case "custom":
        if (dateFrom && dateTo) {
          return `${format(dateFrom, "MMM d")} - ${format(dateTo, "MMM d, yyyy")}`;
        }
        return "Custom Range";
      default:
        return "This Week";
    }
  };

  return (
    <Card className="border-blue-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <BarChart3 className="h-5 w-5 text-blue-500 mr-2" />
          Revenue & Booking Analytics
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={dateRange} onValueChange={handleDateRangeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className={dateRange === "custom" ? "visible" : "hidden"}>
                <CalendarRange className="h-4 w-4 mr-2" />
                {dateFrom && dateTo
                  ? `${format(dateFrom, "MMM d")} - ${format(dateTo, "MMM d")}`
                  : "Select Dates"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="p-2">
                <div className="font-medium mb-2">
                  {calendarSelection === "from" ? "Select start date" : "Select end date"}
                </div>
                <CalendarComponent
                  mode="single"
                  selected={calendarSelection === "from" ? dateFrom : dateTo}
                  onSelect={handleCalendarSelect}
                  initialFocus
                />
              </div>
            </PopoverContent>
          </Popover>
          
          <Button variant="outline" size="icon" onClick={handleDownloadReport}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Key metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 flex flex-col">
                <div className="text-sm text-gray-500 mb-1">Revenue</div>
                <div className="text-2xl font-bold flex items-center">
                  <DollarSign className="h-5 w-5 text-green-500 mr-1" />
                  {formatCurrency(mockRevenueData.weeklyRevenue)}
                </div>
                <div className="text-xs text-gray-500 mt-1">{getDateRangeText()}</div>
                <div className="text-xs text-green-500 mt-2 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  12% increase vs. previous period
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex flex-col">
                <div className="text-sm text-gray-500 mb-1">Bookings</div>
                <div className="text-2xl font-bold flex items-center">
                  <Calendar className="h-5 w-5 text-blue-500 mr-1" />
                  {mockRevenueData.totalBookings}
                </div>
                <div className="text-xs text-gray-500 mt-1">{getDateRangeText()}</div>
                <div className="text-xs text-blue-500 mt-2 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  8% increase vs. previous period
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex flex-col">
                <div className="text-sm text-gray-500 mb-1">Most Booked Service</div>
                <div className="text-lg font-bold line-clamp-1">
                  {mockRevenueData.mostBookedService}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Second: {mockRevenueData.secondMostBooked}
                </div>
                <div className="text-xs text-purple-500 mt-2">
                  18 bookings this period
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Staff performance */}
          <div>
            <h3 className="font-medium mb-3 text-gray-700 flex items-center">
              <Users className="h-4 w-4 mr-2 text-blue-500" />
              Staff Performance
            </h3>
            
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="py-3 px-4 text-left font-medium">Staff Member</th>
                    <th className="py-3 px-4 text-center font-medium">Bookings</th>
                    <th className="py-3 px-4 text-center font-medium">Revenue</th>
                    <th className="py-3 px-4 text-center font-medium">Avg. Per Booking</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRevenueData.staffPerformance.map((staff, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{staff.name}</td>
                      <td className="py-3 px-4 text-center">{staff.bookings}</td>
                      <td className="py-3 px-4 text-center font-medium">{formatCurrency(staff.revenue)}</td>
                      <td className="py-3 px-4 text-center">{formatCurrency(Math.round(staff.revenue / staff.bookings))}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td className="py-3 px-4 font-medium">Total</td>
                    <td className="py-3 px-4 text-center font-medium">
                      {mockRevenueData.staffPerformance.reduce((sum, staff) => sum + staff.bookings, 0)}
                    </td>
                    <td className="py-3 px-4 text-center font-medium">
                      {formatCurrency(mockRevenueData.staffPerformance.reduce((sum, staff) => sum + staff.revenue, 0))}
                    </td>
                    <td className="py-3 px-4 text-center"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonAnalytics;
