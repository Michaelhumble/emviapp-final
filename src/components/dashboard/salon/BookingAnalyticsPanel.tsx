
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, CreditCard, DollarSign, TrendingDown, TrendingUp, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { BookingAnalytics } from "@/hooks/useOwnerDashboardData";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface BookingAnalyticsPanelProps {
  data: BookingAnalytics;
  isLoading: boolean;
}

export function BookingAnalyticsPanel({ data, isLoading }: BookingAnalyticsPanelProps) {
  // Prepare chart data
  const bookingStatusData = [
    { name: "Completed", value: data.completedBookings, color: "#10b981" },
    { name: "Pending", value: data.pendingBookings, color: "#f59e0b" },
    { name: "Cancelled", value: data.cancelledBookings, color: "#ef4444" },
  ];

  // Mock data for month-by-month chart (this would ideally come from the database)
  const monthlyBookingData = [
    { name: "Jan", bookings: 5 },
    { name: "Feb", bookings: 8 },
    { name: "Mar", bookings: 12 },
    { name: "Apr", bookings: 10 },
    { name: "May", bookings: 15 },
    { name: "Jun", bookings: 20 },
  ];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
          <Skeleton className="h-64 mt-6" />
        </CardContent>
      </Card>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Booking Analytics
        </CardTitle>
        <CardDescription>
          Overview of your salon's booking performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-50 p-4 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                    <h3 className="text-2xl font-bold mt-1">{data.totalBookings}</h3>
                  </div>
                  <div className="bg-slate-100 p-2 rounded-full">
                    <Users className="h-4 w-4 text-slate-600" />
                  </div>
                </div>
                
                <div className="mt-3 flex items-center">
                  {data.periodComparison.percentChange > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : data.periodComparison.percentChange < 0 ? (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  ) : (
                    <span className="h-4 w-4 mr-1" />
                  )}
                  
                  <span className={`text-xs font-medium ${
                    data.periodComparison.percentChange > 0 
                      ? 'text-green-500' 
                      : data.periodComparison.percentChange < 0 
                        ? 'text-red-500' 
                        : 'text-slate-500'
                  }`}>
                    {Math.abs(data.periodComparison.percentChange).toFixed(1)}% from previous period
                  </span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-slate-50 p-4 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                    <h3 className="text-2xl font-bold mt-1">
                      {data.totalBookings > 0 
                        ? Math.round((data.completedBookings / data.totalBookings) * 100) 
                        : 0}%
                    </h3>
                  </div>
                  <div className="bg-slate-100 p-2 rounded-full">
                    <Calendar className="h-4 w-4 text-slate-600" />
                  </div>
                </div>
                
                <div className="mt-3">
                  <span className="text-xs font-medium text-slate-500">
                    {data.completedBookings} of {data.totalBookings} bookings completed
                  </span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-slate-50 p-4 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <h3 className="text-2xl font-bold mt-1">{formatCurrency(data.totalRevenue)}</h3>
                  </div>
                  <div className="bg-slate-100 p-2 rounded-full">
                    <DollarSign className="h-4 w-4 text-slate-600" />
                  </div>
                </div>
                
                <div className="mt-3">
                  <span className="text-xs font-medium text-slate-500">
                    {formatCurrency(data.totalRevenue / Math.max(data.completedBookings, 1))} avg. per booking
                  </span>
                </div>
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="trends">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyBookingData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`${value} bookings`, "Bookings"]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke="#8884d8"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="status">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={bookingStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {bookingStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} bookings`, "Count"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bookingStatusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} bookings`, "Count"]} />
                    <Bar dataKey="value" fill="#8884d8">
                      {bookingStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
